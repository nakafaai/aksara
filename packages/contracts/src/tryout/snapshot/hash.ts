import { hashTryoutCanonical } from "#contracts/tryout/canonical";
import {
  type TryoutSnapshotInput,
  TryoutSnapshotSchema,
  type TryoutSnapshotV2Input,
  TryoutSnapshotV2Schema,
} from "#contracts/tryout/snapshot/spec";

const SNAPSHOT_DOMAIN = "nakafa.aksara.tryout-snapshot.v1";
const ROWS_DOMAIN = "nakafa.aksara.tryout-rows.v1";
const SNAPSHOT_V2_DOMAIN = "nakafa.aksara.tryout-snapshot.v2";
const ROWS_V2_DOMAIN = "nakafa.aksara.tryout-rows.v2";

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

/** Serializes v2 snapshot facts without content-addressed identity. */
export function canonicalizeTryoutSnapshotV2(input: TryoutSnapshotV2Input) {
  return JSON.stringify({
    activeAppLocales: input.activeAppLocales,
    catalogDigest: input.catalogDigest,
    counts: {
      country: input.counts.country,
      exam: input.counts.exam,
      section: input.counts.section,
      set: input.counts.set,
      track: input.counts.track,
    },
    editorialReviewDigest: input.editorialReviewDigest,
    format: input.format,
    placementCount: input.placementCount,
    placementDigest: input.placementDigest,
    routeCount: input.routeCount,
  });
}

/** Creates the current try-out snapshot content-addressed identity. */
export function makeTryoutSnapshotV2(input: TryoutSnapshotV2Input) {
  return TryoutSnapshotV2Schema.make({
    ...input,
    snapshotId: hashTryoutCanonical(
      SNAPSHOT_V2_DOMAIN,
      canonicalizeTryoutSnapshotV2(input)
    ),
  });
}

/** Derives aggregate row evidence for one current try-out snapshot. */
export function tryoutSnapshotV2RowEvidence(input: TryoutSnapshotV2Input) {
  const catalogCount = Object.values(input.counts).reduce(
    (total, count) => total + count,
    0
  );
  return {
    rowCount: catalogCount + input.placementCount,
    rowDigest: hashTryoutCanonical(
      ROWS_V2_DOMAIN,
      JSON.stringify({
        catalogCount,
        catalogDigest: input.catalogDigest,
        placementCount: input.placementCount,
        placementDigest: input.placementDigest,
      })
    ),
  };
}
