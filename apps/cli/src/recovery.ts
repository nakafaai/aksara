import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseManifest,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import { Effect, Schema } from "effect";

/** Checked-out Git source differs from the immutable pending provenance. */
export class RecoveryRevisionMismatchError extends Schema.TaggedError<RecoveryRevisionMismatchError>()(
  "RecoveryRevisionMismatchError",
  { actual: GitCommitShaSchema, expected: GitCommitShaSchema }
) {}

/** Rebuilt source differs from the immutable signed pending manifest. */
export class RecoveryManifestMismatchError extends Schema.TaggedError<RecoveryManifestMismatchError>()(
  "RecoveryManifestMismatchError",
  {
    actual: Sha256HashSchema,
    expected: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
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

/** Requires rebuilt source state to equal the signed pending manifest hash. */
export const validateRecoveryManifest = Effect.fn(
  "AksaraCli.validateRecoveryManifest"
)(function* (expected: SignedContentRelease, actual: ContentReleaseManifest) {
  const actualHash = yield* hashContentReleaseManifest(actual);
  if (actualHash === expected.manifestHash) {
    return;
  }
  return yield* new RecoveryManifestMismatchError({
    actual: actualHash,
    expected: expected.manifestHash,
    releaseId: expected.manifest.releaseId,
  });
});
