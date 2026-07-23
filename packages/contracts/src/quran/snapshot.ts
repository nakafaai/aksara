import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_CHUNK_COUNT,
  QURAN_LOCALES,
  QURAN_ROW_COUNT,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
} from "#contracts/quran/spec";

/** Wire format for the first immutable structured Quran snapshot. */
export const QURAN_SNAPSHOT_FORMAT = "quran-snapshot-v1" as const;

const CountSchema = Schema.Int.pipe(Schema.nonNegative());
const SourceBytesSchema = Schema.Int.pipe(Schema.positive());

/** Production publication status derived from reviewed provenance records. */
export const QuranProvenanceStatusSchema = Schema.Literal(
  "approved",
  "blocked"
);
export type QuranProvenanceStatus = typeof QuranProvenanceStatusSchema.Type;

/** Checks fixed corpus counts and the aggregate projection count. */
function hasCompleteSnapshotCounts(input: {
  readonly chunkCount: number;
  readonly projectionCount: number;
  readonly searchCount: number;
  readonly surahCount: number;
  readonly verseCount: number;
}) {
  return (
    input.surahCount === QURAN_SURAH_COUNT &&
    input.verseCount === QURAN_VERSE_COUNT &&
    input.chunkCount === QURAN_CHUNK_COUNT &&
    input.searchCount === QURAN_SEARCH_COUNT &&
    input.projectionCount === QURAN_ROW_COUNT
  );
}

/** Immutable identity and completeness proof for one Quran snapshot. */
export const QuranSnapshotManifestSchema = Schema.Struct({
  chunkCount: CountSchema,
  format: Schema.Literal(QURAN_SNAPSHOT_FORMAT),
  locales: Schema.Tuple(
    Schema.Literal(QURAN_LOCALES[0]),
    Schema.Literal(QURAN_LOCALES[1])
  ),
  projectionCount: CountSchema,
  projectionDigest: Sha256HashSchema,
  provenanceDigest: Sha256HashSchema,
  provenanceStatus: QuranProvenanceStatusSchema,
  runtimeCount: CountSchema,
  runtimeDigest: Sha256HashSchema,
  searchCount: CountSchema,
  searchDigest: Sha256HashSchema,
  snapshotId: Sha256HashSchema,
  sourceBytes: SourceBytesSchema,
  sourceDigest: Sha256HashSchema,
  surahCount: CountSchema,
  tafsirLocales: Schema.Tuple(Schema.Literal(QURAN_TAFSIR_LOCALES[0])),
  verseCount: CountSchema,
}).pipe(
  Schema.filter(hasCompleteSnapshotCounts, {
    message: () => "Expected the complete reviewed Quran snapshot counts.",
  }),
  Schema.filter(
    (manifest) =>
      manifest.runtimeCount === manifest.surahCount + manifest.chunkCount &&
      manifest.projectionCount === manifest.runtimeCount + manifest.searchCount,
    {
      message: () =>
        "Expected Quran runtime and search counts to cover every projection.",
    }
  )
);
export type QuranSnapshotManifest = typeof QuranSnapshotManifestSchema.Type;
