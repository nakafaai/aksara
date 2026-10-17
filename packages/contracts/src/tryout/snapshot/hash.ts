import { Array as Arr, Effect, Record as Rec } from "effect";
import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  canonicalizeTryoutSnapshot,
  TRYOUT_SNAPSHOT_DOMAIN,
  TRYOUT_SNAPSHOT_ROWS_DOMAIN,
} from "#contracts/tryout/snapshot/canonical";
import {
  TRYOUT_SNAPSHOT_FORMAT,
  type TryoutSnapshotFacts,
  TryoutSnapshotSchema,
} from "#contracts/tryout/snapshot/spec";

/** Creates one complete content-addressed try-out snapshot. */
export const makeTryoutSnapshot = Effect.fn(
  "AksaraContracts.makeTryoutSnapshot"
)(function* (input: TryoutSnapshotFacts) {
  const snapshotId = yield* hashTryoutCanonical(
    TRYOUT_SNAPSHOT_DOMAIN,
    canonicalizeTryoutSnapshot(input)
  );
  return TryoutSnapshotSchema.make({
    ...input,
    format: TRYOUT_SNAPSHOT_FORMAT,
    snapshotId,
  });
});

/** Returns exact structured row evidence authenticated by a snapshot. */
export const tryoutSnapshotRowEvidence = Effect.fn(
  "AksaraContracts.tryoutSnapshotRowEvidence"
)(function* (input: TryoutSnapshotFacts) {
  const rowDigest = yield* hashTryoutCanonical(
    TRYOUT_SNAPSHOT_ROWS_DOMAIN,
    `${input.catalogDigest}\n${input.placementDigest}`
  );
  return {
    rowCount:
      Arr.reduce(Rec.values(input.counts), 0, (total, count) => total + count) +
      input.placementCount,
    rowDigest,
  };
});
