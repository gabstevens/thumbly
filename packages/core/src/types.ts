export interface VotePayload {
  surveyId: string;
  optionIndex: number;
  metadata?: Record<string, any>;
}

export interface ThumblyDriver {
  submitVote(payload: VotePayload): Promise<void>;
  validate?(optionIndex: number): void;
}

export type ThumblyConfig = {
  surveyId: string;
  disablePersistence?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} & (
  | { driver: ThumblyDriver }
  | { supabase: { url: string; key: string } }
);
