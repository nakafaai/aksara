import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  ActiveAppLocaleListSchema,
  HistoricalAppLocaleListSchema,
} from "#contracts/locale";

/** Immutable wire format used before app and delivery language separation. */
export const TRYOUT_SNAPSHOT_FORMAT = "tryout-v1";

/** Current wire format with active locales and editorial review identity. */
export const TRYOUT_SNAPSHOT_V2_FORMAT = "tryout-v2";

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
  format: Schema.Literal(TRYOUT_SNAPSHOT_FORMAT),
  locales: HistoricalAppLocaleListSchema,
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

const SnapshotV2Fields = {
  activeAppLocales: ActiveAppLocaleListSchema,
  catalogDigest: Sha256HashSchema,
  counts: TryoutCatalogCountsSchema,
  editorialReviewDigest: Sha256HashSchema,
  format: Schema.Literal(TRYOUT_SNAPSHOT_V2_FORMAT),
  placementCount: NonNegativeCountSchema,
  placementDigest: Sha256HashSchema,
  routeCount: NonNegativeCountSchema,
};

/** Canonical v2 snapshot facts authenticated by the global release. */
export const TryoutSnapshotV2InputSchema = Schema.Struct(SnapshotV2Fields);
export type TryoutSnapshotV2Input = typeof TryoutSnapshotV2InputSchema.Type;

/** Content-addressed v2 try-out snapshot selected by one release. */
export const TryoutSnapshotV2Schema = Schema.Struct({
  ...SnapshotV2Fields,
  snapshotId: Sha256HashSchema,
});
export type TryoutSnapshotV2 = typeof TryoutSnapshotV2Schema.Type;

/** Historical and current try-out snapshot decoder for retained consumers. */
export const TryoutSnapshotWireSchema = Schema.Union(
  TryoutSnapshotSchema,
  TryoutSnapshotV2Schema
);
export type TryoutSnapshotWire = typeof TryoutSnapshotWireSchema.Type;
