import { Schema } from "effect";
import { ContentLocaleListSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";

const NonNegativeCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Signed per-kind hierarchy counts for one immutable try-out snapshot. */
export const TryoutCatalogCountsSchema = Schema.Struct({
  country: NonNegativeCountSchema,
  exam: NonNegativeCountSchema,
  section: NonNegativeCountSchema,
  set: NonNegativeCountSchema,
  track: NonNegativeCountSchema,
});
export type TryoutCatalogCounts = typeof TryoutCatalogCountsSchema.Type;

const SnapshotFields = {
  catalogDigest: Sha256HashSchema,
  counts: TryoutCatalogCountsSchema,
  format: Schema.Literal("tryout-v1"),
  locales: ContentLocaleListSchema,
  placementCount: NonNegativeCountSchema,
  placementDigest: Sha256HashSchema,
  routeCount: NonNegativeCountSchema,
};

/** Canonical snapshot facts authenticated by the global content release. */
export const TryoutSnapshotInputSchema = Schema.Struct(SnapshotFields);
export type TryoutSnapshotInput = typeof TryoutSnapshotInputSchema.Type;

/** Content-addressed try-out snapshot selected by one global release. */
export const TryoutSnapshotSchema = Schema.Struct({
  ...SnapshotFields,
  snapshotId: Sha256HashSchema,
});
export type TryoutSnapshot = typeof TryoutSnapshotSchema.Type;
