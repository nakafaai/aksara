import { Schema } from "effect";
import {
  appLocaleLiteral,
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
} from "#contracts/locale";
import { QuranMeaningfulTextSchema } from "#contracts/quran/text";

/** Tafsir locale whose complete reviewed source may enter runtime rows. */
export const QuranTafsirLocaleSchema = Schema.Literal(
  INDONESIAN_APP_LOCALE_CODE
);

/** App locales whose official Tafsir edition remains an external link. */
export const QuranExternalTafsirLocaleSchema = Schema.Literals([
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
]);

/** Exact number of reviewed surahs in the authored Quran source. */
export const QURAN_SURAH_COUNT = 114;

/** Exact number of reviewed verses in the authored Quran source. */
export const QURAN_VERSE_COUNT = 6236;

/** One visible source-attribution row required before Quran runtime content. */
export const QURAN_ATTRIBUTION_COUNT = 1;

/** Maximum verses stored in one independently verifiable runtime chunk. */
export const QURAN_CHUNK_SIZE = 6;

/** Valid Quran surah number in canonical order. */
export const QuranSurahNumberSchema = Schema.Int.pipe(
  Schema.check(Schema.isBetween({ maximum: QURAN_SURAH_COUNT, minimum: 1 }))
);

/** Shared authored and published metadata for one reviewed Quran surah. */
export const QuranSurahMetadataSchema = Schema.Struct({
  name: Schema.Struct({
    arabic: QuranMeaningfulTextSchema,
    meaning: Schema.Struct({
      appLocale: appLocaleLiteral(ENGLISH_APP_LOCALE_CODE),
      text: QuranMeaningfulTextSchema,
    }),
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
