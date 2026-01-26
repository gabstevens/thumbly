import { ThumblyConfig, ThumblyDriver, VotePayload } from "./types";
import { SupabaseDriver } from "./drivers";

const STORAGE_KEY_PREFIX = "thumbly:voted:";

export class ThumblyClient {
  private driver: ThumblyDriver;
  private surveyId: string;
  private disablePersistence: boolean;

  constructor(config: ThumblyConfig) {
    this.surveyId = config.surveyId;
    this.disablePersistence = config.disablePersistence ?? false;

    if (config.driver) {
      this.driver = config.driver;
    } else if (config.supabaseUrl) {
      this.driver = new SupabaseDriver(config.supabaseUrl, config.supabaseKey!);
    } else {
      throw new Error("ThumblyClient: You must provide either a 'driver' instance or 'supabaseUrl' and 'supabaseKey'.");
    }
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
