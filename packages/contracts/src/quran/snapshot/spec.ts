import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "#contracts/locale";
import { quranSourceFileCount } from "#contracts/quran/source";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "#contracts/quran/spec";

/** Semantic wire identity of the current localized Quran snapshot. */
export const QURAN_SNAPSHOT_FORMAT = "localized-quran-snapshot";

const CountSchema = Schema.Int.pipe(Schema.nonNegative());
const SourceBytesSchema = Schema.Int.pipe(Schema.positive());

/** Production publication status derived from reviewed provenance records. */
export const QuranProvenanceStatusSchema = Schema.Literal(
  "approved",
  "blocked"
);
export type QuranProvenanceStatus = typeof QuranProvenanceStatusSchema.Type;

const QuranSnapshotFactFields = {
  activeAppLocales: ActiveAppLocaleListSchema,
  attributionCount: CountSchema,
  chunkCount: CountSchema,
  editorialReviewDigest: Sha256HashSchema,
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
  tafsirLocales: Schema.Array(Schema.Literal("id")).pipe(Schema.maxItems(1)),
  verseCount: CountSchema,
};

/** Checks source, translation, and Tafsir counts against active locales. */
function hasCompleteSnapshotCounts(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly attributionCount: number;
  readonly searchCount: number;
  readonly sourceFileCount: number;
  readonly surahCount: number;
  readonly tafsirLocales: readonly "id"[];
  readonly verseCount: number;
}) {
  const hasIndonesian = input.activeAppLocales.includes(
    AppLocaleSchema.make("id")
  );
  return (
    input.attributionCount === QURAN_ATTRIBUTION_COUNT &&
    input.surahCount === QURAN_SURAH_COUNT &&
    input.verseCount === QURAN_VERSE_COUNT &&
    input.searchCount === QURAN_SURAH_COUNT * input.activeAppLocales.length &&
    input.sourceFileCount === quranSourceFileCount(input.activeAppLocales) &&
    JSON.stringify(input.tafsirLocales) ===
      JSON.stringify(hasIndonesian ? ["id"] : [])
  );
}

/** Checks runtime and search arithmetic for complete projection inventory. */
function hasCoherentProjectionCounts(input: {
  readonly attributionCount: number;
  readonly chunkCount: number;
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

/** Immutable current Quran facts before content-addressed identity. */
export const QuranSnapshotFactsSchema = Schema.Struct(
  QuranSnapshotFactFields
).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected complete active-locale Quran source counts.",
  }),
  Schema.filter(hasCoherentProjectionCounts, {
    message: () =>
      "Expected Quran runtime and search counts to cover every projection.",
  })
);
export type QuranSnapshotFacts = typeof QuranSnapshotFactsSchema.Type;

/** Immutable identity and completeness proof for one Quran snapshot. */
export const QuranSnapshotSchema = Schema.Struct({
  ...QuranSnapshotFactFields,
  format: Schema.Literal(QURAN_SNAPSHOT_FORMAT),
  snapshotId: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected complete active-locale Quran source counts.",
  }),
  Schema.filter(hasCoherentProjectionCounts, {
    message: () =>
      "Expected Quran runtime and search counts to cover every projection.",
  })
);
export type QuranSnapshot = typeof QuranSnapshotSchema.Type;
