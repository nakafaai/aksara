import {
  QuranMeaningfulTextSchema,
  QuranRuntimeVerseSchema,
  QuranSurahMetadataSchema,
  QuranTafsirLocaleSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import { Schema } from "effect";

const AuthoredQuranTafsirSchema = Schema.Record({
  key: QuranTafsirLocaleSchema,
  value: Schema.Struct({
    long: QuranMeaningfulTextSchema,
    short: QuranMeaningfulTextSchema,
  }),
});

/** Exact authored contract for one Quran verse. */
export const QuranVerseSchema = Schema.Struct({
  ...QuranRuntimeVerseSchema.fields,
  tafsir: AuthoredQuranTafsirSchema,
});
export type QuranVerse = typeof QuranVerseSchema.Type;

/** Exact authored contract for one independently publishable Quran surah. */
export const QuranSurahSchema = Schema.Struct({
  ...QuranSurahMetadataSchema.fields,
  tafsir: Schema.Record({
    key: QuranTafsirLocaleSchema,
    value: QuranMeaningfulTextSchema,
  }),
  verses: Schema.Array(QuranVerseSchema),
});
export type QuranSurah = typeof QuranSurahSchema.Type;
