import { ThumblyConfig, ThumblyDriver, VotePayload } from "./types";
import { SupabaseDriver } from "./drivers";

const STORAGE_KEY_PREFIX = "thumbly:voted:";

export class ThumblyClient {
  private driver: ThumblyDriver;
  private surveyId: string;
  private disablePersistence: boolean;
  private onSuccess?: () => void;
  private onError?: (error: Error) => void;

  constructor(config: ThumblyConfig) {
    const { surveyId, disablePersistence = false, onSuccess, onError } = config;

    this.surveyId = surveyId;
    this.disablePersistence = disablePersistence;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.driver = this.initializeDriver(config);
  }

  private initializeDriver(config: ThumblyConfig): ThumblyDriver {
    if ("driver" in config && config.driver) {
      return config.driver;
    }

    if ("supabase" in config && config.supabase?.url && config.supabase?.key) {
      return new SupabaseDriver(config.supabase.url, config.supabase.key);
    }

    throw new Error(
      "ThumblyClient: Invalid configuration. You must provide either a 'driver' instance or a 'supabase' object with 'url' and 'key'.",
    );
  }

  hasVoted(): boolean {
    if (this.disablePersistence) return false;
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(`${STORAGE_KEY_PREFIX}${this.surveyId}`);
  }

  private markAsVoted() {
    if (this.disablePersistence) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${this.surveyId}`, "true");
    }
  }

  async vote(optionIndex: number, metadata?: any): Promise<void> {
    try {
      this.driver.validate?.(optionIndex);

      if (this.hasVoted()) {
        console.warn("User has already voted for this survey.");
        return;
      }

      const payload: VotePayload = {
        surveyId: this.surveyId,
        optionIndex,
        metadata,
      };

      await this.retryWithBackoff(() => this.driver.submitVote(payload));
      this.markAsVoted();
      this.onSuccess?.();
    } catch (error: any) {
      this.onError?.(error);
      throw error;
    }
  }

  private async retryWithBackoff(fn: () => Promise<void>, retries = 3, delay = 500): Promise<void> {
    try {
      await fn();
    } catch (error: any) {
      if (retries > 0 && error.message.includes("Transient")) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retryWithBackoff(fn, retries - 1, delay * 2);
      }
      throw error;
    }
  }
}
