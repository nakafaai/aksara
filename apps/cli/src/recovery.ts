import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";

/** Checked-out Git source differs from the immutable candidate provenance. */
export class RecoveryRevisionMismatchError extends Schema.TaggedError<RecoveryRevisionMismatchError>()(
  "RecoveryRevisionMismatchError",
  { actual: GitCommitShaSchema, expected: GitCommitShaSchema }
) {}

/** Requires the current clean checkout to equal stored Git provenance. */
export function validateRecoveryRevision(
  expected: GitCommitSha,
  actual: GitCommitSha
) {
  if (actual === expected) {
    return Effect.void;
  }
  return Effect.fail(new RecoveryRevisionMismatchError({ actual, expected }));
}
