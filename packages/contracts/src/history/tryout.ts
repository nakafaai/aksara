import { Schema } from "effect";

import { HistoricalAppLocaleListSchema } from "#contracts/history/locale";
import { HistoricalSha256HashSchema } from "#contracts/history/primitives";

const NonNegativeCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

const HistoricalTryoutCatalogCountsSchema = Schema.Struct({
  country: NonNegativeCountSchema,
  exam: NonNegativeCountSchema,
  section: NonNegativeCountSchema,
  set: NonNegativeCountSchema,
  track: NonNegativeCountSchema,
});

const HistoricalTryoutSnapshotFields = {
  catalogDigest: HistoricalSha256HashSchema,
  counts: HistoricalTryoutCatalogCountsSchema,
  format: Schema.Literal("tryout-v1"),
  locales: HistoricalAppLocaleListSchema,
  placementCount: NonNegativeCountSchema,
  placementDigest: HistoricalSha256HashSchema,
  routeCount: NonNegativeCountSchema,
};

/** Exact immutable try-out snapshot accepted only by the history reader. */
export const HistoricalTryoutSnapshotSchema = Schema.Struct({
  ...HistoricalTryoutSnapshotFields,
  snapshotId: HistoricalSha256HashSchema,
});
export type HistoricalTryoutSnapshot =
  typeof HistoricalTryoutSnapshotSchema.Type;

/** Reconstructs the exact facts covered by a stored snapshot identity. */
export function canonicalizeHistoricalTryoutSnapshot(
  snapshot: HistoricalTryoutSnapshot
) {
  return JSON.stringify({
    catalogDigest: snapshot.catalogDigest,
    counts: {
      country: snapshot.counts.country,
      exam: snapshot.counts.exam,
      section: snapshot.counts.section,
      set: snapshot.counts.set,
      track: snapshot.counts.track,
    },
    format: snapshot.format,
    locales: snapshot.locales,
    placementCount: snapshot.placementCount,
    placementDigest: snapshot.placementDigest,
    routeCount: snapshot.routeCount,
  });
}

/** Private immutable hash domain used only to authenticate stored bytes. */
export const HISTORICAL_TRYOUT_SNAPSHOT_DOMAIN =
  "nakafa.aksara.tryout-snapshot.v1";
