import { ThumblyDriver, VotePayload } from "./types";
import { TransientError, PermanentError, ValidationError } from "./errors";

/**
 * Driver for the official Thumbly backend (Supabase).
 * Enforces a 1-5 option index range matching the default schema.
 */
export class SupabaseDriver implements ThumblyDriver {
  /**
   * @param url - Your Supabase project URL.
   * @param anonKey - Your Supabase project anonymous key.
   */
  constructor(
    private url: string,
    private anonKey: string,
  ) {}

  /**
   * Submits a vote via the `submit_vote` RPC function.
   * Implements retry-friendly error messages for transient failures.
   */
  async submitVote({ surveyId, optionIndex }: VotePayload): Promise<void> {
    const endpoint = `${this.url}/rest/v1/rpc/submit_vote`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: this.anonKey,
        Authorization: `Bearer ${this.anonKey}`,
      },
      body: JSON.stringify({ survey_id: surveyId, option_index: optionIndex }),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status >= 500) {
        throw new TransientError(`Server error: ${response.status}`, response.status);
      }
      throw new PermanentError(`Request failed: ${response.status}`, response.status);
    }
  }

  /**
   * Validates that the index is an integer between 1 and 5.
   * @throws {ValidationError} If index is out of range.
   */
  validate(optionIndex: number): void {
    if (!Number.isInteger(optionIndex) || optionIndex < 1 || optionIndex > 5) {
      throw new ValidationError("SupabaseDriver: 'optionIndex' must be an integer between 1 and 5.");
    }
  }
}

/**
 * A generic driver that sends a POST request to any URL.
 * Ideal for custom API routes or third-party backends.
 */
export class FetchDriver implements ThumblyDriver {
  /**
   * @param url - The endpoint to POST the {@link VotePayload} to.
   * @param headers - Optional custom headers to include in the request.
   */
  constructor(
    private url: string,
    private headers: Record<string, string> = {},
  ) {}

  async submitVote(payload: VotePayload): Promise<void> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status >= 500) {
        throw new TransientError(`Server error: ${response.status}`, response.status);
      }
      throw new PermanentError(`Request failed: ${response.status}`, response.status);
    }
  }
}

/**
 * An adapter for functional voting logic.
 * Useful for prototyping or wrapping existing SDKs.
 * 
 * @example
 * ```ts
 * const driver = new CustomDriver({
 *   submitVote: async (p) => console.log('Vote:', p),
 *   validate: (i) => { if (i < 0) throw new ValidationError('Bad index') }
 * });
 * ```
 */
export class CustomDriver implements ThumblyDriver {
  constructor(
    private config: {
      /** Function to execute when a vote is submitted. */
      submitVote: (payload: VotePayload) => Promise<void>;
      /** Optional function to validate the option index. */
      validate?: (optionIndex: number) => void;
    },
  ) {}

  async submitVote(payload: VotePayload): Promise<void> {
    await this.config.submitVote(payload);
  }

  validate(optionIndex: number): void {
    this.config.validate?.(optionIndex);
  }
}
