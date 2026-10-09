import { Array as Arr, Record as Rec } from "effect";
import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  canonicalizeTryoutSnapshot,
  TRYOUT_SNAPSHOT_DOMAIN,
  TRYOUT_SNAPSHOT_ROWS_DOMAIN,
} from "#contracts/tryout/snapshot/canonical";
import {
  TRYOUT_SNAPSHOT_FORMAT,
  type TryoutSnapshot,
  type TryoutSnapshotFacts,
  TryoutSnapshotSchema,
} from "#contracts/tryout/snapshot/spec";

/** Creates one complete content-addressed try-out snapshot. */
export function makeTryoutSnapshot(input: TryoutSnapshotFacts): TryoutSnapshot {
  return TryoutSnapshotSchema.make({
    ...input,
    format: TRYOUT_SNAPSHOT_FORMAT,
    snapshotId: hashTryoutCanonical(
      TRYOUT_SNAPSHOT_DOMAIN,
      canonicalizeTryoutSnapshot(input)
    ),
  });
}

/** Returns exact structured row evidence authenticated by a snapshot. */
export function tryoutSnapshotRowEvidence(input: TryoutSnapshotFacts) {
  return {
    rowCount:
      Arr.reduce(Rec.values(input.counts), 0, (total, count) => total + count) +
      input.placementCount,
    rowDigest: hashTryoutCanonical(
      TRYOUT_SNAPSHOT_ROWS_DOMAIN,
      `${input.catalogDigest}\n${input.placementDigest}`
    ),
  };
}
