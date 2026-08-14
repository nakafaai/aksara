import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  TRYOUT_SNAPSHOT_FORMAT,
  type TryoutSnapshot,
  type TryoutSnapshotFacts,
  TryoutSnapshotSchema,
} from "#contracts/tryout/snapshot/spec";

const SNAPSHOT_DOMAIN = "nakafa.aksara.localized-tryout-snapshot";
const ROWS_DOMAIN = "nakafa.aksara.tryout-rows";

/** Serializes snapshot facts without content-addressed identity. */
export function canonicalizeTryoutSnapshot(input: TryoutSnapshotFacts) {
  return JSON.stringify({
    activeAppLocales: input.activeAppLocales,
    catalogDigest: input.catalogDigest,
    counts: input.counts,
    format: TRYOUT_SNAPSHOT_FORMAT,
    placementCount: input.placementCount,
    placementDigest: input.placementDigest,
    routeCount: input.routeCount,
  });
}

/** Creates one complete content-addressed try-out snapshot. */
export function makeTryoutSnapshot(input: TryoutSnapshotFacts): TryoutSnapshot {
  return TryoutSnapshotSchema.make({
    ...input,
    format: TRYOUT_SNAPSHOT_FORMAT,
    snapshotId: hashTryoutCanonical(
      SNAPSHOT_DOMAIN,
      canonicalizeTryoutSnapshot(input)
    ),
  });
}

/** Returns exact structured row evidence authenticated by a snapshot. */
export function tryoutSnapshotRowEvidence(input: TryoutSnapshotFacts) {
  return {
    rowCount:
      Object.values(input.counts).reduce((total, count) => total + count, 0) +
      input.placementCount,
    rowDigest: hashTryoutCanonical(
      ROWS_DOMAIN,
      `${input.catalogDigest}\n${input.placementDigest}`
    ),
  };
}
