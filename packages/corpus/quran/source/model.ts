import { QuranTranslationSchema } from "@nakafa/aksara-contracts/quran/notes";
import { QuranSurahMetadataSchema } from "@nakafa/aksara-contracts/quran/spec";
import { Schema } from "effect";

import { localizedSourceMapSchema } from "#corpus/locale/source";

const TafsirSchema = Schema.Struct({
  footnotes: Schema.NullOr(Schema.String),
  text: Schema.String,
});
export type Tafsir = typeof TafsirSchema.Type;

const SajdaSchema = Schema.Literals(["obligatory", "recommended"]);

const VerseMetadataSchema = Schema.Struct({
  hizbQuarter: Schema.Finite,
  juz: Schema.Finite,
  manzil: Schema.Finite,
  page: Schema.Finite,
  ruku: Schema.Finite,
  sajda: Schema.NullOr(SajdaSchema),
});
export type VerseMetadata = typeof VerseMetadataSchema.Type;

const VerseSchema = Schema.Struct({
  meta: VerseMetadataSchema,
  number: Schema.Struct({
    inQuran: Schema.Finite,
    inSurah: Schema.Finite,
  }),
  tafsir: Schema.Struct({ id: TafsirSchema }),
  text: Schema.Struct({ arabic: Schema.String }),
  translation: localizedSourceMapSchema(QuranTranslationSchema),
});
export type Verse = typeof VerseSchema.Type;

/** Encoded metadata emitted before the corpus schema applies its brands. */
type QuranSurahMetadata = Schema.Codec.Encoded<typeof QuranSurahMetadataSchema>;

const SurahMetadataSchema = Schema.Struct({
  ...QuranSurahMetadataSchema.fields,
  start: Schema.Finite,
});
export type SurahMetadata = Schema.Codec.Encoded<typeof SurahMetadataSchema>;

const SurahVersesSchema = Schema.Struct({
  verses: Schema.Array(VerseSchema),
});
export type Surah = QuranSurahMetadata & typeof SurahVersesSchema.Type;

const MarkerSchema = Schema.Struct({
  index: Schema.Finite,
  position: Schema.Finite,
});
export type Marker = typeof MarkerSchema.Type;

const ParsedMetadataSchema = Schema.Struct({
  hizbQuarters: Schema.Array(MarkerSchema),
  juzs: Schema.Array(MarkerSchema),
  manzils: Schema.Array(MarkerSchema),
  pages: Schema.Array(MarkerSchema),
  rukus: Schema.Array(MarkerSchema),
  sajdas: Schema.HashMap(Schema.Finite, SajdaSchema),
  surahs: Schema.Array(Schema.toEncoded(SurahMetadataSchema)),
});
export type ParsedMetadata = typeof ParsedMetadataSchema.Type;

export const RawSourcesSchema = Schema.Struct({
  arabic: Schema.String,
  metadata: Schema.String,
  tafsir: Schema.Array(Schema.String),
  translations: localizedSourceMapSchema(Schema.String),
});
export type RawSources = typeof RawSourcesSchema.Type;
