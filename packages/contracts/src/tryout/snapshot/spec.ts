import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";

/** Semantic wire identity of the current localized try-out snapshot. */
export const TRYOUT_SNAPSHOT_FORMAT = "localized-tryout-snapshot";

const NonNegativeCountSchema = Schema.Int.pipe(Schema.nonNegative());

/** Signed per-kind hierarchy counts for one immutable try-out snapshot. */
export const TryoutCatalogCountsSchema = Schema.Struct({
  country: NonNegativeCountSchema,
  exam: NonNegativeCountSchema,
  section: NonNegativeCountSchema,
  set: NonNegativeCountSchema,
  track: NonNegativeCountSchema,
});
export type TryoutCatalogCounts = typeof TryoutCatalogCountsSchema.Type;

const TryoutSnapshotFactFields = {
  activeAppLocales: ActiveAppLocaleListSchema,
  catalogDigest: Sha256HashSchema,
  counts: TryoutCatalogCountsSchema,
  editorialReviewDigest: Sha256HashSchema,
  placementCount: NonNegativeCountSchema,
  placementDigest: Sha256HashSchema,
  routeCount: NonNegativeCountSchema,
};

/** Canonical snapshot facts authenticated by the global content release. */
export const TryoutSnapshotFactsSchema = Schema.Struct(
  TryoutSnapshotFactFields
);
export type TryoutSnapshotFacts = typeof TryoutSnapshotFactsSchema.Type;

/** Content-addressed try-out snapshot selected by one global release. */
export const TryoutSnapshotSchema = Schema.Struct({
  ...TryoutSnapshotFactFields,
  format: Schema.Literal(TRYOUT_SNAPSHOT_FORMAT),
  snapshotId: Sha256HashSchema,
});
export type TryoutSnapshot = typeof TryoutSnapshotSchema.Type;
