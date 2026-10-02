import { Schema } from "effect";
import type { PlatformError } from "effect/PlatformError";

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

/** Maps a platform failure on one path to the typed unreadable-entry failure. */
export function unreadable(path: string) {
  return (error: PlatformError) =>
    new PointsCheckError({
      detail: `Cannot read ${path}: ${error.message}`,
      reason: "unreadable-entry",
    });
}
