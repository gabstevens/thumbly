import { ThumblyDriver, VotePayload } from "./types";

export class SupabaseDriver implements ThumblyDriver {
  constructor(
    private url: string,
    private anonKey: string,
  ) {}

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
        throw new Error(`Transient error: ${response.status}`);
      }
      throw new Error(`Permanent error: ${response.status}`);
    }
  }

  validate(optionIndex: number): void {
    if (!Number.isInteger(optionIndex) || optionIndex < 1 || optionIndex > 5) {
      throw new Error("SupabaseDriver: 'optionIndex' must be an integer between 1 and 5.");
    }
  }
}

export class FetchDriver implements ThumblyDriver {
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
        throw new Error(`Transient error: ${response.status}`);
      }
      throw new Error(`Permanent error: ${response.status}`);
    }
  }
}

export class CustomDriver implements ThumblyDriver {
  constructor(private fn: (payload: VotePayload) => Promise<void>) {}

  async submitVote(payload: VotePayload): Promise<void> {
    await this.fn(payload);
  }
}
