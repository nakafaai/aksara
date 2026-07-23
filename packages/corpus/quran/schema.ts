import { Schema } from "effect";

const MeaningfulTextSchema = Schema.String.pipe(
  Schema.pattern(/\S/u, {
    description:
      "Authored Quran text containing at least one visible character.",
    identifier: "QuranText",
    message: () => "Quran text cannot be empty.",
  })
);

const AudioUrlSchema = Schema.String.pipe(
  Schema.pattern(/^https:\/\/\S+$/u, {
    description: "Reviewed HTTPS Quran audio URL.",
    identifier: "QuranAudioUrl",
    message: () => "Quran audio must use a non-empty HTTPS URL.",
  })
);

const PositiveIntegerSchema = Schema.Int.pipe(Schema.positive());

/** Locales with complete Quran name and translation fields. */
export const QURAN_LOCALES = ["en", "id"] as const;

/** Locales whose complete Quran Tafsir corpus is safe to expose. */
export const QURAN_TAFSIR_LOCALES = ["id"] as const;

/** Number of reviewed surah sources in the complete Quran corpus. */
export const QURAN_SURAH_COUNT = 114;

/** Number of reviewed verses in the complete Quran corpus. */
export const QURAN_VERSE_COUNT = 6236;

/** Valid Quran surah number in canonical Quran order. */
export const QuranSurahNumberSchema = Schema.Int.pipe(
  Schema.between(1, QURAN_SURAH_COUNT)
);

const LocalizedTextSchema = Schema.Struct({
  en: MeaningfulTextSchema,
  id: MeaningfulTextSchema,
});

const QuranTextSchema = Schema.Struct({
  arab: MeaningfulTextSchema,
  transliteration: Schema.Struct({
    en: MeaningfulTextSchema,
  }),
});

const QuranAudioSchema = Schema.Struct({
  primary: AudioUrlSchema,
  secondary: Schema.Tuple(AudioUrlSchema, AudioUrlSchema),
});

const QuranTafsirSchema = Schema.Struct({
  id: Schema.Struct({
    long: MeaningfulTextSchema,
    short: MeaningfulTextSchema,
  }),
});

/** Exact authored contract for one Quran verse. */
export const QuranVerseSchema = Schema.Struct({
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
  tafsir: QuranTafsirSchema,
  text: QuranTextSchema,
  translation: LocalizedTextSchema,
});
export type QuranVerse = typeof QuranVerseSchema.Type;

const PreBismillahSchema = Schema.Struct({
  audio: QuranAudioSchema,
  text: QuranTextSchema,
  translation: LocalizedTextSchema,
});

/** Exact authored contract for one independently publishable Quran surah. */
export const QuranSurahSchema = Schema.Struct({
  name: Schema.Struct({
    long: MeaningfulTextSchema,
    short: MeaningfulTextSchema,
    translation: LocalizedTextSchema,
    transliteration: LocalizedTextSchema,
  }),
  number: QuranSurahNumberSchema,
  numberOfVerses: PositiveIntegerSchema,
  preBismillah: Schema.NullOr(PreBismillahSchema),
  revelation: Schema.Struct({
    arab: MeaningfulTextSchema,
    en: MeaningfulTextSchema,
    id: MeaningfulTextSchema,
  }),
  sequence: QuranSurahNumberSchema,
  tafsir: Schema.Struct({
    id: MeaningfulTextSchema,
  }),
  verses: Schema.Array(QuranVerseSchema),
});
export type QuranSurah = typeof QuranSurahSchema.Type;
