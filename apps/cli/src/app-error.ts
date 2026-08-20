import { Schema } from "effect";

/** Nakafa process or authenticated renderer discovery failed. */
export class NakafaAppError extends Schema.TaggedError<NakafaAppError>()(
  "NakafaAppError",
  {
    reason: Schema.Literals([
      "auth",
      "body",
      "cache",
      "child-env",
      "contract",
      "exit",
      "json",
      "network",
      "origin",
      "redirect",
      "start",
      "status",
      "timeout",
    ]),
    retryable: Schema.Boolean,
    status: Schema.optional(Schema.Finite.pipe(Schema.check(Schema.isInt()))),
  }
) {}

/** Creates one sanitized failure without retaining response or process data. */
export function makeNakafaAppError(
  reason: NakafaAppError["reason"],
  retryable: boolean,
  status?: number
) {
  return new NakafaAppError({ reason, retryable, status });
}
