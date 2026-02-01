/**
 * The data structure sent to a driver when a vote is submitted.
 */
export interface VotePayload {
  /** The unique identifier of the survey. */
  surveyId: string;
  /** The index of the selected option (typically 1-based). */
  optionIndex: number;
  /** Optional arbitrary data to attach to the vote. */
  metadata?: Record<string, any>;
}

/**
 * Interface for network drivers that handle the actual submission of votes.
 */
export interface ThumblyDriver {
  /**
   * Submits a vote payload to the backend.
   * @param payload - The vote data to submit.
   * @throws {Error} Should throw for network or server errors.
   */
  submitVote(payload: VotePayload): Promise<void>;

  /**
   * Optional method to validate the option index before submission.
   * @param optionIndex - The index to validate.
   * @throws {Error} Should throw if the index is invalid for this driver's backend.
   */
  validate?(optionIndex: number): void;
}

/**
 * Configuration options for initializing a {@link ThumblyClient}.
 */
export type ThumblyConfig = {
  /** Unique ID for the survey. */
  surveyId: string;
  /**
   * If true, the client will not check or set localStorage to track votes.
   * @default false
   */
  disablePersistence?: boolean;
  /** Callback triggered after a successful vote submission. */
  onSuccess?: () => void;
  /** Callback triggered if the vote submission fails after all retries. */
  onError?: (error: Error) => void;
} & (
  /** Use a pre-configured or custom driver instance. */
  | { driver: ThumblyDriver }
  /** Automatically use the built-in {@link SupabaseDriver}. */
  | { supabase: { url: string; key: string } }
);