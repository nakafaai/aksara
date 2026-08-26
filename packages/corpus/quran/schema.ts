import { QuranTranslationSchema } from "@nakafa/aksara-contracts/quran/notes";
import {
  QuranSurahMetadataSchema,
  QuranTafsirLocaleSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import {
  QuranMeaningfulTextSchema,
  QuranTextSchema,
} from "@nakafa/aksara-contracts/quran/text";
import { Schema } from "effect";

import { localizedSourceMapSchema } from "#corpus/locale/source";

/** Exact authored contract for one Quran verse. */
export const QuranVerseSchema = Schema.Struct({
  meta: Schema.Struct({
    hizbQuarter: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
    juz: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
    manzil: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
    page: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
    ruku: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
    sajda: Schema.NullOr(Schema.Literals(["obligatory", "recommended"])),
  }),
  number: Schema.Struct({
    inQuran: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
    inSurah: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  }),
  tafsir: Schema.Record(
    QuranTafsirLocaleSchema,
    Schema.Struct({
      footnotes: Schema.NullOr(Schema.String),
      text: QuranMeaningfulTextSchema,
    })
  ),
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
