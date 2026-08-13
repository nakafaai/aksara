import type { ReleasePolicy } from "@nakafa/aksara-contracts/release/policy";
import { Effect } from "effect";

import {
  PreparedReleaseBaseIdentityError,
  PreparedReleaseIdentityError,
} from "#publisher/preparation/errors";
import type { PrepareContentReleaseInput } from "#publisher/preparation/spec";

/** Validates the complete current base lineage before any source is replayed. */
export const prepareReleaseBase = Effect.fn(
  "AksaraPublisher.prepareReleaseBase"
)(function* <E, R>(input: PrepareContentReleaseInput<E, R>) {
  let basePolicy: ReleasePolicy | null;
  if (input.baseActiveAppLocales === null) {
    if (input.baseEditorialReviewDigest !== null) {
      return yield* new PreparedReleaseBaseIdentityError({
        baseManifestHash: input.baseManifestHash,
        baseReleaseId: input.baseReleaseId,
        hasBaseActiveAppLocales: false,
        hasBaseEditorialReviewDigest: true,
        hasSnapshotBase: input.previousSnapshots !== null,
      });
    }
    basePolicy = null;
  } else {
    if (input.baseEditorialReviewDigest === null) {
      return yield* new PreparedReleaseBaseIdentityError({
        baseManifestHash: input.baseManifestHash,
        baseReleaseId: input.baseReleaseId,
        hasBaseActiveAppLocales: true,
        hasBaseEditorialReviewDigest: false,
        hasSnapshotBase: input.previousSnapshots !== null,
      });
    }
    basePolicy = {
      activeAppLocales: input.baseActiveAppLocales,
      editorialReviewDigest: input.baseEditorialReviewDigest,
    };
  }
  const hasBaseRelease = input.baseReleaseId !== null;
  if (
    hasBaseRelease !== (input.baseManifestHash !== null) ||
    hasBaseRelease !== (basePolicy !== null) ||
    hasBaseRelease !== (input.previousSnapshots !== null)
  ) {
    return yield* new PreparedReleaseBaseIdentityError({
      baseManifestHash: input.baseManifestHash,
      baseReleaseId: input.baseReleaseId,
      hasBaseActiveAppLocales: input.baseActiveAppLocales !== null,
      hasBaseEditorialReviewDigest: input.baseEditorialReviewDigest !== null,
      hasSnapshotBase: input.previousSnapshots !== null,
    });
  }
  if (input.baseReleaseId === input.releaseId) {
    return yield* new PreparedReleaseIdentityError({
      baseReleaseId: input.baseReleaseId,
      releaseId: input.releaseId,
    });
  }
  return basePolicy;
});
