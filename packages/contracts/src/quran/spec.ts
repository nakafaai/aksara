import { Schema } from "effect";
import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";

/** Complete locale order encoded into every Quran snapshot. */
export const QURAN_LOCALES = ["en", "id"] as const;

/** Tafsir locales whose complete authored source may enter runtime rows. */
export const QURAN_TAFSIR_LOCALES = ["id"] as const;

/** Exact number of reviewed surahs in the authored Quran source. */
export const QURAN_SURAH_COUNT = 114;

/** Exact number of reviewed verses in the authored Quran source. */
export const QURAN_VERSE_COUNT = 6236;

/** Exact number of deterministic six-verse runtime chunks. */
export const QURAN_CHUNK_COUNT = 1085;

/** Exact number of locale-specific Quran search rows. */
export const QURAN_SEARCH_COUNT = 228;

/** Exact number of rows in one complete Quran snapshot. */
export const QURAN_ROW_COUNT =
  QURAN_SURAH_COUNT + QURAN_CHUNK_COUNT + QURAN_SEARCH_COUNT;

/** Maximum verses stored in one independently verifiable runtime chunk. */
export const QURAN_CHUNK_SIZE = 6;

const MeaningfulTextSchema = Schema.String.pipe(Schema.pattern(/\S/u));
const PositiveIntegerSchema = Schema.Int.pipe(Schema.positive());

/** Valid Quran surah number in canonical order. */
export const QuranSurahNumberSchema = Schema.Int.pipe(
  Schema.between(1, QURAN_SURAH_COUNT)
);

/** Valid Quran locale with complete names and translations. */
export const QuranLocaleSchema = Schema.Literal(...QURAN_LOCALES);

/** Exact locale-indexed text used by the Quran runtime. */
export const QuranLocalizedTextSchema = Schema.Struct({
  en: MeaningfulTextSchema,
  id: MeaningfulTextSchema,
});

/** Reviewed Quran text plus its complete English transliteration. */
export const QuranTextSchema = Schema.Struct({
  arab: MeaningfulTextSchema,
  transliteration: Schema.Struct({ en: MeaningfulTextSchema }),
});

/** Reviewed primary and alternate Quran audio sources. */
export const QuranAudioSchema = Schema.Struct({
  primary: Schema.String.pipe(Schema.pattern(/^https:\/\/\S+$/u)),
  secondary: Schema.Tuple(
    Schema.String.pipe(Schema.pattern(/^https:\/\/\S+$/u)),
    Schema.String.pipe(Schema.pattern(/^https:\/\/\S+$/u))
  ),
});

/** Runtime-safe Quran Tafsir excludes the authoring-only long text. */
export const QuranRuntimeTafsirSchema = Schema.Struct({
  id: Schema.Struct({ short: MeaningfulTextSchema }),
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

/** Immutable metadata row for one reviewed Quran surah. */
export const QuranSurahRowSchema = Schema.Struct({
  kind: Schema.Literal("quran-surah"),
  name: Schema.Struct({
    long: MeaningfulTextSchema,
    short: MeaningfulTextSchema,
    translation: QuranLocalizedTextSchema,
    transliteration: QuranLocalizedTextSchema,
  }),
  number: QuranSurahNumberSchema,
  numberOfVerses: PositiveIntegerSchema,
  preBismillah: Schema.NullOr(QuranPreBismillahSchema),
  revelation: Schema.Struct({
    arab: MeaningfulTextSchema,
    en: MeaningfulTextSchema,
    id: MeaningfulTextSchema,
  }),
  sequence: QuranSurahNumberSchema,
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
  description: MeaningfulTextSchema,
  graph: LearningGraphIdentitySchema,
  kind: Schema.Literal("quran-search"),
  locale: QuranLocaleSchema,
  route: PublicPathSchema,
  surahNumber: QuranSurahNumberSchema,
  text: MeaningfulTextSchema,
  title: MeaningfulTextSchema,
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
