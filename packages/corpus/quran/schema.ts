import {
  QuranMeaningfulTextSchema,
  QuranSurahMetadataSchema,
  QuranTafsirLocaleSchema,
  QuranTextSchema,
  QuranTranslationSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import { Schema } from "effect";

import { localizedSourceMapSchema } from "#corpus/locale/source";

/** Exact authored contract for one Quran verse. */
export const QuranVerseSchema = Schema.Struct({
  meta: Schema.Struct({
    hizbQuarter: Schema.Int.pipe(Schema.positive()),
    juz: Schema.Int.pipe(Schema.positive()),
    manzil: Schema.Int.pipe(Schema.positive()),
    page: Schema.Int.pipe(Schema.positive()),
    ruku: Schema.Int.pipe(Schema.positive()),
    sajda: Schema.NullOr(Schema.Literal("obligatory", "recommended")),
  }),
  number: Schema.Struct({
    inQuran: Schema.Int.pipe(Schema.positive()),
    inSurah: Schema.Int.pipe(Schema.positive()),
  }),
  tafsir: Schema.Record({
    key: QuranTafsirLocaleSchema,
    value: Schema.Struct({
      footnotes: Schema.NullOr(Schema.String),
      text: QuranMeaningfulTextSchema,
    }),
  }),
  text: QuranTextSchema,
  translation: localizedSourceMapSchema(QuranTranslationSchema),
});
export type QuranVerse = typeof QuranVerseSchema.Type;

/** Exact authored contract for one independently publishable Quran surah. */
export const QuranSurahSchema = Schema.Struct({
  ...QuranSurahMetadataSchema.fields,
  verses: Schema.Array(QuranVerseSchema),
});
export type QuranSurah = typeof QuranSurahSchema.Type;
