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
  readonly translation: {
    readonly en: Translation;
    readonly id: Translation;
  };
}

export interface SurahMetadata {
  readonly name: {
    readonly arabic: string;
    readonly translation: string;
    readonly transliteration: string;
  };
  readonly number: number;
  readonly numberOfVerses: number;
  readonly revelation: {
    readonly order: number;
    readonly place: "Meccan" | "Medinan";
  };
  readonly start: number;
}

export interface Surah extends Omit<SurahMetadata, "start"> {
  readonly verses: readonly Verse[];
}

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
  readonly english: string;
  readonly indonesian: string;
  readonly metadata: string;
  readonly tafsir: readonly string[];
}
