import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  ActiveAppLocaleListSchema,
  HistoricalAppLocaleListSchema,
} from "#contracts/locale";
import { QURAN_SOURCE_FILE_COUNT } from "#contracts/quran/source";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
  QuranTafsirLocaleListSchema,
} from "#contracts/quran/spec";

/** Wire format for the official-source Quran snapshot. */
export const QURAN_SNAPSHOT_FORMAT = "quran-snapshot-v2";

/** Current Quran wire format with active locales and review identity. */
export const QURAN_SNAPSHOT_V3_FORMAT = "quran-snapshot-v3";

const CountSchema = Schema.Int.pipe(Schema.nonNegative());
const SourceBytesSchema = Schema.Int.pipe(Schema.positive());

/** Production publication status derived from reviewed provenance records. */
export const QuranProvenanceStatusSchema = Schema.Literal(
  "approved",
  "blocked"
);
export type QuranProvenanceStatus = typeof QuranProvenanceStatusSchema.Type;

/** Checks source-owned corpus counts that do not depend on chunk policy. */
function hasCompleteSnapshotCounts(input: {
  readonly attributionCount: number;
  readonly searchCount: number;
  readonly sourceFileCount: number;
  readonly surahCount: number;
  readonly verseCount: number;
}) {
  return (
    input.attributionCount === QURAN_ATTRIBUTION_COUNT &&
    input.surahCount === QURAN_SURAH_COUNT &&
    input.verseCount === QURAN_VERSE_COUNT &&
    input.searchCount === QURAN_SEARCH_COUNT &&
    input.sourceFileCount === QURAN_SOURCE_FILE_COUNT
  );
}

/** Checks runtime and search arithmetic for one complete projection inventory. */
function hasCoherentProjectionCounts(input: {
  readonly chunkCount: number;
  readonly attributionCount: number;
  readonly projectionCount: number;
  readonly runtimeCount: number;
  readonly searchCount: number;
  readonly surahCount: number;
}) {
  return (
    input.runtimeCount ===
      input.attributionCount + input.surahCount + input.chunkCount &&
    input.projectionCount === input.runtimeCount + input.searchCount
  );
}

const SnapshotV2Fields = {
  attributionCount: CountSchema,
  chunkCount: CountSchema,
  format: Schema.Literal(QURAN_SNAPSHOT_FORMAT),
  locales: HistoricalAppLocaleListSchema,
  projectionCount: CountSchema,
  projectionDigest: Sha256HashSchema,
  provenanceDigest: Sha256HashSchema,
  provenanceStatus: QuranProvenanceStatusSchema,
  runtimeCount: CountSchema,
  runtimeDigest: Sha256HashSchema,
  searchCount: CountSchema,
  searchDigest: Sha256HashSchema,
  sourceBytes: SourceBytesSchema,
  sourceDigest: Sha256HashSchema,
  sourceFileCount: CountSchema,
  surahCount: CountSchema,
  tafsirLocales: QuranTafsirLocaleListSchema,
  verseCount: CountSchema,
};

/** Immutable Quran snapshot identity before its content hash is attached. */
export const QuranSnapshotInputSchema = Schema.Struct(SnapshotV2Fields).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected the complete reviewed Quran snapshot counts.",
  }),
  Schema.filter(hasCoherentProjectionCounts, {
    message: () =>
      "Expected Quran runtime and search counts to cover every projection.",
  })
);
export type QuranSnapshotInput = typeof QuranSnapshotInputSchema.Type;

/** Immutable identity and completeness proof for one Quran snapshot. */
export const QuranSnapshotManifestSchema = Schema.Struct({
  ...SnapshotV2Fields,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected the complete reviewed Quran snapshot counts.",
  }),
  Schema.filter(hasCoherentProjectionCounts, {
    message: () =>
      "Expected Quran runtime and search counts to cover every projection.",
  })
);
export type QuranSnapshotManifest = typeof QuranSnapshotManifestSchema.Type;

const SnapshotV3Fields = {
  activeAppLocales: ActiveAppLocaleListSchema,
  attributionCount: CountSchema,
  chunkCount: CountSchema,
  editorialReviewDigest: Sha256HashSchema,
  format: Schema.Literal(QURAN_SNAPSHOT_V3_FORMAT),
  projectionCount: CountSchema,
  projectionDigest: Sha256HashSchema,
  provenanceDigest: Sha256HashSchema,
  provenanceStatus: QuranProvenanceStatusSchema,
  runtimeCount: CountSchema,
  runtimeDigest: Sha256HashSchema,
  searchCount: CountSchema,
  searchDigest: Sha256HashSchema,
  sourceBytes: SourceBytesSchema,
  sourceDigest: Sha256HashSchema,
  sourceFileCount: CountSchema,
  surahCount: CountSchema,
  tafsirLocales: QuranTafsirLocaleListSchema,
  verseCount: CountSchema,
};

/** Immutable v3 Quran facts before content-addressed identity. */
export const QuranSnapshotV3InputSchema = Schema.Struct(SnapshotV3Fields).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected the complete reviewed Quran snapshot counts.",
  }),
  Schema.filter(hasCoherentProjectionCounts, {
    message: () =>
      "Expected Quran runtime and search counts to cover every projection.",
  })
);
export type QuranSnapshotV3Input = typeof QuranSnapshotV3InputSchema.Type;

/** Immutable v3 identity and completeness proof for one Quran snapshot. */
export const QuranSnapshotV3ManifestSchema = Schema.Struct({
  ...SnapshotV3Fields,
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected the complete reviewed Quran snapshot counts.",
  }),
  Schema.filter(hasCoherentProjectionCounts, {
    message: () =>
      "Expected Quran runtime and search counts to cover every projection.",
  })
);
export type QuranSnapshotV3Manifest = typeof QuranSnapshotV3ManifestSchema.Type;

/** Historical and current Quran snapshot decoder for retained consumers. */
export const QuranSnapshotWireSchema = Schema.Union(
  QuranSnapshotManifestSchema,
  QuranSnapshotV3ManifestSchema
);
export type QuranSnapshotWire = typeof QuranSnapshotWireSchema.Type;
