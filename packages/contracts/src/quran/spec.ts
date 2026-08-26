import { Schema } from "effect";

/** Tafsir locale whose complete reviewed source may enter runtime rows. */
export const QuranTafsirLocaleSchema = Schema.Literal("id");

/** App locales whose official Tafsir edition remains an external link. */
export const QuranExternalTafsirLocaleSchema = Schema.Literals(["en", "de"]);

/** Exact number of reviewed surahs in the authored Quran source. */
export const QURAN_SURAH_COUNT = 114;

/** Exact number of reviewed verses in the authored Quran source. */
export const QURAN_VERSE_COUNT = 6236;

/** One visible source-attribution row required before Quran runtime content. */
export const QURAN_ATTRIBUTION_COUNT = 1;

/** Maximum verses stored in one independently verifiable runtime chunk. */
export const QURAN_CHUNK_SIZE = 6;

/** Non-empty Quran text shared by authored and published row contracts. */
export const QuranMeaningfulTextSchema = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(/\S/u, {
      description:
        "Authored Quran text containing at least one visible character.",
      identifier: "QuranText",
      message: "Quran text cannot be empty.",
    })
  )
);

/** Valid Quran surah number in canonical order. */
export const QuranSurahNumberSchema = Schema.Int.pipe(
  Schema.check(Schema.isBetween({ maximum: QURAN_SURAH_COUNT, minimum: 1 }))
);

/** Verbatim Tanzil Arabic text without compatibility fields. */
export const QuranTextSchema = Schema.Struct({
  arabic: QuranMeaningfulTextSchema,
});

/** One verbatim QuranEnc translation and its unmodified footnotes. */
export const QuranTranslationSchema = Schema.Struct({
  footnotes: Schema.String,
  text: QuranMeaningfulTextSchema,
});

/** Shared authored and published metadata for one reviewed Quran surah. */
export const QuranSurahMetadataSchema = Schema.Struct({
  name: Schema.Struct({
    arabic: QuranMeaningfulTextSchema,
    translation: QuranMeaningfulTextSchema,
    transliteration: QuranMeaningfulTextSchema,
  }),
  number: QuranSurahNumberSchema,
  numberOfVerses: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  revelation: Schema.Struct({
    order: QuranSurahNumberSchema,
    place: Schema.Literals(["Meccan", "Medinan"]),
  }),
});

/** Immutable metadata row for one reviewed Quran surah. */
export const QuranSurahRowSchema = Schema.Struct({
  kind: Schema.Literal("quran-surah"),
  ...QuranSurahMetadataSchema.fields,
});
export type QuranSurahRow = typeof QuranSurahRowSchema.Type;
