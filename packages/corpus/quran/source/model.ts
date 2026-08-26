import type { QuranSurahMetadataSchema } from "@nakafa/aksara-contracts/quran/spec";
import type { Schema } from "effect";

import type { LocalizedSourceMap } from "#corpus/locale/source";

/** Exact translation fields parsed from one official source verse. */
export interface Translation {
  readonly footnotes: string;
  readonly text: string;
}

export interface Tafsir {
  readonly footnotes: null | string;
  readonly text: string;
}

export interface VerseMetadata {
  readonly hizbQuarter: number;
  readonly juz: number;
  readonly manzil: number;
  readonly page: number;
  readonly ruku: number;
  readonly sajda: null | "obligatory" | "recommended";
}

export interface Verse {
  readonly meta: VerseMetadata;
  readonly number: {
    readonly inQuran: number;
    readonly inSurah: number;
  };
  readonly tafsir: { readonly id: Tafsir };
  readonly text: { readonly arabic: string };
  readonly translation: LocalizedSourceMap<Translation>;
}

/** Encoded metadata emitted before the corpus schema applies its brands. */
type QuranSurahMetadata = Schema.Codec.Encoded<typeof QuranSurahMetadataSchema>;

export type SurahMetadata = QuranSurahMetadata & {
  readonly start: number;
};

export type Surah = QuranSurahMetadata & {
  readonly verses: readonly Verse[];
};

export interface Marker {
  readonly index: number;
  readonly position: number;
}

export interface ParsedMetadata {
  readonly hizbQuarters: readonly Marker[];
  readonly juzs: readonly Marker[];
  readonly manzils: readonly Marker[];
  readonly pages: readonly Marker[];
  readonly rukus: readonly Marker[];
  readonly sajdas: ReadonlyMap<number, "obligatory" | "recommended">;
  readonly surahs: readonly SurahMetadata[];
}

export interface RawSources {
  readonly arabic: string;
  readonly metadata: string;
  readonly tafsir: readonly string[];
  readonly translations: LocalizedSourceMap<string>;
}
