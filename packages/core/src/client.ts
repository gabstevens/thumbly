import { ThumblyConfig, ThumblyDriver, VotePayload } from "./types";
import { SupabaseDriver } from "./drivers";
import { TransientError, ValidationError } from "./errors";

const STORAGE_KEY_PREFIX = "thumbly:voted:";

/**
 * The main entry point for Thumbly's headless logic.
 * Handles state, persistence, and network retries.
 *
 * @example
 * ```ts
 * const client = new ThumblyClient({
 *   surveyId: "...",
 *   supabase: { url: "...", key: "..." }
 * });
 *
 * await client.vote(1);
 * ```
 */
export class ThumblyClient {
  private driver: ThumblyDriver;
  private surveyId: string;
  private disablePersistence: boolean;
  private onSuccess?: () => void;
  private onError?: (error: Error) => void;

  /**
   * Initializes a new Thumbly client.
   * @param config - Configuration object.
   * @throws {ValidationError} If configuration is invalid.
   */
  constructor(config: ThumblyConfig) {
    const { surveyId, disablePersistence = false, onSuccess, onError } = config;

    this.surveyId = surveyId;
    this.disablePersistence = disablePersistence;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.driver = this.initializeDriver(config);
  }

  /**
   * Helper to determine which driver to instantiate based on configuration.
   */
  private initializeDriver(config: ThumblyConfig): ThumblyDriver {
    if ("driver" in config && config.driver) {
      return config.driver;
    }

    if ("supabase" in config && config.supabase?.url && config.supabase?.key) {
      return new SupabaseDriver(config.supabase.url, config.supabase.key);
    }

    throw new ValidationError(
      "ThumblyClient: Invalid configuration. You must provide either a 'driver' instance or a 'supabase' object with 'url' and 'key'.",
    );
  }

  /**
   * Checks if the user has already voted for this survey in the current browser.
   * @returns true if a vote is recorded in localStorage.
   */
  hasVoted(): boolean {
    if (this.disablePersistence) return false;
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(`${STORAGE_KEY_PREFIX}${this.surveyId}`);
  }

  /**
   * Records that a vote has been cast in localStorage.
   */
  private markAsVoted() {
    if (this.disablePersistence) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${this.surveyId}`, "true");
    }
  }

  /**
   * Submits a vote for the specified option.
   *
   * @template TMetadata - The type of the metadata object.
   * @param optionIndex - The index of the selected option.
   * @param metadata - Optional contextual data (e.g., page URL).
   * @throws {Error} If validation fails or submission fails after retries.
   */
  async vote<TMetadata = Record<string, unknown>>(optionIndex: number, metadata?: TMetadata): Promise<void> {
    try {
      this.driver.validate?.(optionIndex);

      if (this.hasVoted()) {
        console.warn("User has already voted for this survey.");
        return;
      }

      const payload: VotePayload<TMetadata> = {
        surveyId: this.surveyId,
        optionIndex,
        metadata,
      };

      await this.retryWithBackoff(() => this.driver.submitVote(payload));
      this.markAsVoted();
      this.onSuccess?.();
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.onError?.(err);
      throw err;
    }
  }

  /**
   * Internal helper to retry failed requests with exponential backoff.
   * Only retries on instances of {@link TransientError}.
   */
  private async retryWithBackoff(fn: () => Promise<void>, retries = 3, delay = 500): Promise<void> {
    try {
      await fn();
    } catch (error: unknown) {
      if (retries > 0 && error instanceof TransientError) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retryWithBackoff(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  }
}
