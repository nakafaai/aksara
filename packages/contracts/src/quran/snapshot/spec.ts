import { Schema } from "effect";

import { ContentLocaleListSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
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

const SnapshotFields = {
  attributionCount: CountSchema,
  chunkCount: CountSchema,
  format: Schema.Literal(QURAN_SNAPSHOT_FORMAT),
  locales: ContentLocaleListSchema,
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
export const QuranSnapshotInputSchema = Schema.Struct(SnapshotFields).pipe(
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
  ...SnapshotFields,
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
