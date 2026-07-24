import {
  QuranRuntimeVerseSchema,
  QuranSurahMetadataSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import { Schema } from "effect";

/** Exact authored contract for one Quran verse. */
export const QuranVerseSchema = QuranRuntimeVerseSchema;
export type QuranVerse = typeof QuranVerseSchema.Type;

/** Exact authored contract for one independently publishable Quran surah. */
export const QuranSurahSchema = Schema.Struct({
  ...QuranSurahMetadataSchema.fields,
  verses: Schema.Array(QuranVerseSchema),
});
export type QuranSurah = typeof QuranSurahSchema.Type;
