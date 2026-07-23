import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  type TryoutSnapshotInput,
  TryoutSnapshotSchema,
} from "#contracts/tryout/spec";

const SNAPSHOT_DOMAIN = "nakafa.aksara.tryout-snapshot.v1";
const ROWS_DOMAIN = "nakafa.aksara.tryout-rows.v1";

/** Serializes snapshot facts without their content-addressed identity. */
export function canonicalizeTryoutSnapshot(input: TryoutSnapshotInput) {
  return JSON.stringify({
    catalogDigest: input.catalogDigest,
    counts: {
      country: input.counts.country,
      exam: input.counts.exam,
      section: input.counts.section,
      set: input.counts.set,
      track: input.counts.track,
    },
    format: input.format,
    locales: input.locales,
    placementCount: input.placementCount,
    placementDigest: input.placementDigest,
    routeCount: input.routeCount,
  });
}

/** Creates the content-addressed identity selected by a global release. */
export function makeTryoutSnapshot(input: TryoutSnapshotInput) {
  return TryoutSnapshotSchema.make({
    ...input,
    snapshotId: hashTryoutCanonical(
      SNAPSHOT_DOMAIN,
      canonicalizeTryoutSnapshot(input)
    ),
  });
}

/** Derives the signed aggregate evidence for all hierarchy and placement rows. */
export function tryoutSnapshotRowEvidence(input: TryoutSnapshotInput) {
  const catalogCount = Object.values(input.counts).reduce(
    (total, count) => total + count,
    0
  );
  return {
    rowCount: catalogCount + input.placementCount,
    rowDigest: hashTryoutCanonical(
      ROWS_DOMAIN,
      JSON.stringify({
        catalogCount,
        catalogDigest: input.catalogDigest,
        placementCount: input.placementCount,
        placementDigest: input.placementDigest,
      })
    ),
  };
}
