import { Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { isHttpsUrl } from "#contracts/text/syntax";

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
const QuranAudioUrlSchema = Schema.String.pipe(
  Schema.filter(isHttpsUrl, {
    description: "Reviewed HTTPS Quran audio URL.",
    identifier: "QuranAudioUrl",
    message: () => "Quran audio must use a non-empty HTTPS URL.",
  })
);

/** Valid Quran surah number in canonical order. */
export const QuranSurahNumberSchema = Schema.Int.pipe(
  Schema.between(1, QURAN_SURAH_COUNT)
);

/** Valid Quran locale with complete names and translations. */
export const QuranLocaleSchema = ContentLocaleSchema;

/** Exact locale-indexed text used by the Quran runtime. */
export const QuranLocalizedTextSchema = Schema.Record({
  key: QuranLocaleSchema,
  value: QuranMeaningfulTextSchema,
});

/** Reviewed Quran text plus its complete English transliteration. */
export const QuranTextSchema = Schema.Struct({
  arab: QuranMeaningfulTextSchema,
  transliteration: Schema.Struct({ en: QuranMeaningfulTextSchema }),
});

/** Reviewed primary and alternate Quran audio sources. */
export const QuranAudioSchema = Schema.Struct({
  primary: QuranAudioUrlSchema,
  secondary: Schema.Tuple(QuranAudioUrlSchema, QuranAudioUrlSchema),
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

/** Runtime-safe Tafsir text for every enabled locale, without long source text. */
export const QuranRuntimeTafsirSchema = Schema.Record({
  key: QuranTafsirLocaleSchema,
  value: Schema.Struct({ short: QuranMeaningfulTextSchema }),
});

/** One exact verse value stored inside a bounded Quran runtime chunk. */
export const QuranRuntimeVerseSchema = Schema.Struct({
  audio: QuranAudioSchema,
  meta: Schema.Struct({
    hizbQuarter: PositiveIntegerSchema,
    juz: PositiveIntegerSchema,
    manzil: PositiveIntegerSchema,
    page: PositiveIntegerSchema,
    ruku: PositiveIntegerSchema,
    sajda: Schema.Struct({
      obligatory: Schema.Boolean,
      recommended: Schema.Boolean,
    }),
  }),
  number: Schema.Struct({
    inQuran: PositiveIntegerSchema,
    inSurah: PositiveIntegerSchema,
  }),
  tafsir: QuranRuntimeTafsirSchema,
  text: QuranTextSchema,
  translation: QuranLocalizedTextSchema,
});
export type QuranRuntimeVerse = typeof QuranRuntimeVerseSchema.Type;

const QuranPreBismillahSchema = Schema.Struct({
  audio: QuranAudioSchema,
  text: QuranTextSchema,
  translation: QuranLocalizedTextSchema,
});

/** Shared authored and published metadata for one reviewed Quran surah. */
export const QuranSurahMetadataSchema = Schema.Struct({
  name: Schema.Struct({
    long: QuranMeaningfulTextSchema,
    short: QuranMeaningfulTextSchema,
    translation: QuranLocalizedTextSchema,
    transliteration: QuranLocalizedTextSchema,
  }),
  number: QuranSurahNumberSchema,
  numberOfVerses: PositiveIntegerSchema,
  preBismillah: Schema.NullOr(QuranPreBismillahSchema),
  revelation: Schema.Struct({ arab: QuranMeaningfulTextSchema }).pipe(
    Schema.extend(QuranLocalizedTextSchema)
  ),
  sequence: QuranSurahNumberSchema,
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
  description: QuranMeaningfulTextSchema,
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
