import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { isHttpsUrl } from "#contracts/text/syntax";

/** Exact official Quran source identities in visible attribution order. */
export const QuranSourceIdSchema = Schema.Literal(
  "tanzil-text",
  "tanzil-metadata",
  "quranenc-english",
  "quranenc-indonesian",
  "quranenc-tafsir"
);
export type QuranSourceId = typeof QuranSourceIdSchema.Type;

/** Complete ordered official source set required by the Quran corpus. */
export const QURAN_SOURCE_IDS = QuranSourceIdSchema.literals;

/** Exact number of official data files covered by the source bundle digest. */
export const QURAN_SOURCE_FILE_COUNT = 118;

const HttpsUrlSchema = Schema.String.pipe(
  Schema.filter(isHttpsUrl, {
    message: () => "Quran source links must use HTTPS.",
  })
);

const RetrievedAtSchema = Schema.String.pipe(
  Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/u, {
    message: () => "Expected an exact UTC Quran source retrieval time.",
  })
);

/** Content identity of one pinned official source or legal evidence artifact. */
export const QuranSourceArtifactSchema = Schema.Struct({
  byteCount: Schema.Int.pipe(Schema.positive()),
  digest: Sha256HashSchema,
  fileCount: Schema.Int.pipe(Schema.positive()),
});
export type QuranSourceArtifact = typeof QuranSourceArtifactSchema.Type;

/** Public source attribution with exact version and pinned evidence identity. */
export const QuranSourceAttributionSchema = Schema.Struct({
  artifact: QuranSourceArtifactSchema,
  id: QuranSourceIdSchema,
  notice: Schema.NonEmptyTrimmedString,
  publisher: Schema.NonEmptyTrimmedString,
  retrievedAt: RetrievedAtSchema,
  sourceUrl: HttpsUrlSchema,
  terms: Schema.Struct({
    artifact: QuranSourceArtifactSchema,
    url: HttpsUrlSchema,
  }),
  title: Schema.NonEmptyTrimmedString,
  updateUrl: HttpsUrlSchema,
  version: Schema.NonEmptyTrimmedString,
});
export type QuranSourceAttribution = typeof QuranSourceAttributionSchema.Type;

/** Checks complete unique source coverage in canonical display order. */
function hasCanonicalSources(sources: readonly QuranSourceAttribution[]) {
  return (
    sources.length === QURAN_SOURCE_IDS.length &&
    sources.every(({ id }, index) => id === QURAN_SOURCE_IDS[index])
  );
}

/** Visible runtime row required wherever Quran content is published. */
export const QuranAttributionRowSchema = Schema.Struct({
  kind: Schema.Literal("quran-attribution"),
  sources: Schema.NonEmptyArray(QuranSourceAttributionSchema),
}).pipe(
  Schema.filter(({ sources }) => hasCanonicalSources(sources), {
    message: () =>
      "Expected every official Quran source in canonical attribution order.",
  })
);
export type QuranAttributionRow = typeof QuranAttributionRowSchema.Type;
