/**
 * Base class for all Thumbly-related errors.
 */
export class ThumblyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ThumblyError";
    Object.setPrototypeOf(this, ThumblyError.prototype);
  }
}

/**
 * Errors that are potentially recoverable (e.g., rate limits, server hiccups).
 * The client will attempt to retry these using exponential backoff.
 */
export class TransientError extends ThumblyError {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "TransientError";
    Object.setPrototypeOf(this, TransientError.prototype);
  }
}

/**
 * Errors that are NOT recoverable (e.g., 404, 403, 400).
 * The client will NOT attempt to retry these.
 */
export class PermanentError extends ThumblyError {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "PermanentError";
    Object.setPrototypeOf(this, PermanentError.prototype);
  }
}

/**
 * Specific error for invalid client-side configuration or input.
 */
export class ValidationError extends PermanentError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
