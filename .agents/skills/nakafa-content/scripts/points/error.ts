import { Schema } from "effect";

/**
 * Typed failure for the standalone points gate.
 *
 * Every failure names a machine-readable reason so the CLI boundary maps it to
 * a stable process exit code without parsing message text.
 */
export class PointsCheckError extends Schema.TaggedError<PointsCheckError>()(
  "PointsCheckError",
  {
    detail: Schema.String,
    reason: Schema.Literals([
      "empty-targets",
      "invalid-arguments",
      "unknown-base",
      "unparseable-document",
      "unreadable-entry",
    ]),
  }
) {}

export type PointsFailureReason = PointsCheckError["reason"];
