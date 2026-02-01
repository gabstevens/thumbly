export interface VotePayload {
  surveyId: string;
  optionIndex: number;
  metadata?: Record<string, any>;
}

export interface ThumblyDriver {
  submitVote(payload: VotePayload): Promise<void>;
  validate?(optionIndex: number): void;
}

interface BaseThumblyConfig {
  surveyId: string;
  disablePersistence?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface ThumblyConfigWithDriver extends BaseThumblyConfig {
  driver: ThumblyDriver;
  supabaseUrl?: never;
  supabaseKey?: never;
}

export interface ThumblyConfigWithSupabase extends BaseThumblyConfig {
  driver?: never;
  supabaseUrl: string;
  supabaseKey: string;
}

export type ThumblyConfig = ThumblyConfigWithDriver | ThumblyConfigWithSupabase;
