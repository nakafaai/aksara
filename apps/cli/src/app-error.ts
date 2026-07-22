import { Schema } from "effect";

/** Nakafa process or authenticated renderer discovery failed. */
export class NakafaAppError extends Schema.TaggedError<NakafaAppError>()(
  "NakafaAppError",
  {
    reason: Schema.Literal(
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
      "timeout"
    ),
    retryable: Schema.Boolean,
    status: Schema.optional(Schema.Number.pipe(Schema.int())),
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
