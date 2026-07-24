import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { QuranAttributionRowSchema } from "#contracts/quran/source";

/** Complete locale order encoded into every Quran snapshot. */
export const QURAN_LOCALES = ContentLocaleSchema.literals;

/** Tafsir locale whose complete reviewed source may enter runtime rows. */
export const QuranTafsirLocaleSchema = Schema.Literal("id");

/** Tafsir locales whose complete authored source may enter runtime rows. */
export const QURAN_TAFSIR_LOCALES = QuranTafsirLocaleSchema.literals;

/** Exact number of reviewed surahs in the authored Quran source. */
export const QURAN_SURAH_COUNT = 114;

/** Exact number of reviewed verses in the authored Quran source. */
export const QURAN_VERSE_COUNT = 6236;

/** Exact number of locale-specific Quran search rows. */
export const QURAN_SEARCH_COUNT = QURAN_SURAH_COUNT * QURAN_LOCALES.length;

/** One visible source-attribution row required before Quran runtime content. */
export const QURAN_ATTRIBUTION_COUNT = 1;

/** Maximum verses stored in one independently verifiable runtime chunk. */
export const QURAN_CHUNK_SIZE = 6;

/** Non-empty Quran text shared by authored and published row contracts. */
export const QuranMeaningfulTextSchema = Schema.String.pipe(
  Schema.pattern(/\S/u, {
    description:
      "Authored Quran text containing at least one visible character.",
    identifier: "QuranText",
    message: () => "Quran text cannot be empty.",
  })
);

const PositiveIntegerSchema = Schema.Int.pipe(Schema.positive());

/** Valid Quran surah number in canonical order. */
export const QuranSurahNumberSchema = Schema.Int.pipe(
  Schema.between(1, QURAN_SURAH_COUNT)
);

/** Valid Quran locale with complete names and translations. */
export const QuranLocaleSchema = ContentLocaleSchema;

/** Verbatim Tanzil Arabic text without compatibility fields. */
export const QuranTextSchema = Schema.Struct({
  arabic: QuranMeaningfulTextSchema,
});

/** One verbatim QuranEnc translation and its unmodified footnotes. */
export const QuranTranslationSchema = Schema.Struct({
  footnotes: Schema.String,
  text: QuranMeaningfulTextSchema,
});

/** Exact locale-indexed QuranEnc translations used by the runtime. */
export const QuranLocalizedTranslationSchema = Schema.Record({
  key: QuranLocaleSchema,
  value: QuranTranslationSchema,
});

/** Checks the complete ordered Tafsir capability enabled for publication. */
function hasExactTafsirLocales(
  locales: readonly (typeof QuranTafsirLocaleSchema.Type)[]
) {
  return (
    locales.length === QURAN_TAFSIR_LOCALES.length &&
    locales.every((locale, index) => locale === QURAN_TAFSIR_LOCALES[index])
  );
}

/** Complete ordered Tafsir locale capability carried by Quran snapshots. */
export const QuranTafsirLocaleListSchema = Schema.Array(
  QuranTafsirLocaleSchema
).pipe(
  Schema.filter(hasExactTafsirLocales, {
    message: () => "Tafsir locales must match the reviewed corpus contract.",
  })
);

/** Complete verbatim Al-Mukhtasar Tafsir for every enabled locale. */
export const QuranRuntimeTafsirSchema = Schema.Record({
  key: QuranTafsirLocaleSchema,
  value: Schema.Struct({
    footnotes: Schema.NullOr(Schema.String),
    text: QuranMeaningfulTextSchema,
  }),
});

/** One exact verse value stored inside a bounded Quran runtime chunk. */
export const QuranRuntimeVerseSchema = Schema.Struct({
  meta: Schema.Struct({
    hizbQuarter: PositiveIntegerSchema,
    juz: PositiveIntegerSchema,
    manzil: PositiveIntegerSchema,
    page: PositiveIntegerSchema,
    ruku: PositiveIntegerSchema,
    sajda: Schema.NullOr(Schema.Literal("obligatory", "recommended")),
  }),
  number: Schema.Struct({
    inQuran: PositiveIntegerSchema,
    inSurah: PositiveIntegerSchema,
  }),
  tafsir: QuranRuntimeTafsirSchema,
  text: QuranTextSchema,
  translation: QuranLocalizedTranslationSchema,
});
export type QuranRuntimeVerse = typeof QuranRuntimeVerseSchema.Type;

/** Shared authored and published metadata for one reviewed Quran surah. */
export const QuranSurahMetadataSchema = Schema.Struct({
  name: Schema.Struct({
    arabic: QuranMeaningfulTextSchema,
    translation: QuranMeaningfulTextSchema,
    transliteration: QuranMeaningfulTextSchema,
  }),
  number: QuranSurahNumberSchema,
  numberOfVerses: PositiveIntegerSchema,
  revelation: Schema.Struct({
    order: QuranSurahNumberSchema,
    place: Schema.Literal("Meccan", "Medinan"),
  }),
});

/** Immutable metadata row for one reviewed Quran surah. */
export const QuranSurahRowSchema = Schema.Struct({
  kind: Schema.Literal("quran-surah"),
  ...QuranSurahMetadataSchema.fields,
});
export type QuranSurahRow = typeof QuranSurahRowSchema.Type;

/** Checks one chunk's declared bounds against every ordered verse. */
function hasCoherentChunk(input: {
  readonly firstQuranNumber: number;
  readonly firstVerse: number;
  readonly lastVerse: number;
  readonly verses: readonly QuranRuntimeVerse[];
}) {
  if (input.lastVerse - input.firstVerse + 1 !== input.verses.length) {
    return false;
  }
  return input.verses.every(
    (verse, index) =>
      verse.number.inSurah === input.firstVerse + index &&
      verse.number.inQuran === input.firstQuranNumber + index
  );
}

/** Immutable bounded runtime row containing at most six ordered verses. */
export const QuranChunkRowSchema = Schema.Struct({
  firstQuranNumber: PositiveIntegerSchema,
  firstVerse: PositiveIntegerSchema,
  kind: Schema.Literal("quran-chunk"),
  lastVerse: PositiveIntegerSchema,
  surahNumber: QuranSurahNumberSchema,
  verses: Schema.NonEmptyArray(QuranRuntimeVerseSchema).pipe(
    Schema.maxItems(QURAN_CHUNK_SIZE)
  ),
}).pipe(
  Schema.filter(hasCoherentChunk, {
    message: () => "Expected one contiguous Quran runtime chunk.",
  })
);
export type QuranChunkRow = typeof QuranChunkRowSchema.Type;

/** One locale-specific Quran route and full-text search document. */
export const QuranSearchRowSchema = Schema.Struct({
  graph: LearningGraphIdentitySchema,
  kind: Schema.Literal("quran-search"),
  locale: QuranLocaleSchema,
  route: PublicPathSchema,
  surahNumber: QuranSurahNumberSchema,
  text: QuranMeaningfulTextSchema,
  title: QuranMeaningfulTextSchema,
});
export type QuranSearchRow = typeof QuranSearchRowSchema.Type;

/** Complete structured row vocabulary covered by a Quran snapshot digest. */
export const QuranRowPayloadSchema = Schema.Union(
  QuranAttributionRowSchema,
  QuranSurahRowSchema,
  QuranChunkRowSchema,
  QuranSearchRowSchema
);
export type QuranRowPayload = typeof QuranRowPayloadSchema.Type;

/** One content-addressed row bound to an immutable Quran snapshot. */
export const QuranSnapshotRowSchema = Schema.Struct({
  payload: QuranRowPayloadSchema,
  rowHash: Sha256HashSchema,
  snapshotId: Sha256HashSchema,
});
export type QuranSnapshotRow = typeof QuranSnapshotRowSchema.Type;
