import { Schema } from "effect";

import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  APP_LOCALE_CODES,
  AppLocaleSchema,
} from "#contracts/locale";
import { QuranSourceAttributionSchema } from "#contracts/quran/source";
import {
  QURAN_CHUNK_SIZE,
  QURAN_SURAH_COUNT,
  QuranMeaningfulTextSchema,
  QuranSurahRowSchema,
  QuranTafsirLocaleSchema,
  QuranTextSchema,
  QuranTranslationSchema,
} from "#contracts/quran/spec";

/** Official source identities accepted by the current Quran protocol. */
export const QuranSourceIdV3Schema = Schema.Literal(
  "tanzil-text",
  "tanzil-metadata",
  "quranenc-english",
  "quranenc-indonesian",
  "quranenc-german",
  "quranenc-tafsir"
);
export type QuranSourceIdV3 = typeof QuranSourceIdV3Schema.Type;

/** Derives the exact official source identities required by active locales. */
export function quranV3SourceIds(
  activeAppLocales: ActiveAppLocaleList
): readonly QuranSourceIdV3[] {
  const sourceIds: QuranSourceIdV3[] = ["tanzil-text", "tanzil-metadata"];
  if (activeAppLocales.includes(AppLocaleSchema.make("en"))) {
    sourceIds.push("quranenc-english");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("id"))) {
    sourceIds.push("quranenc-indonesian");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("de"))) {
    sourceIds.push("quranenc-german");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("id"))) {
    sourceIds.push("quranenc-tafsir");
  }
  return sourceIds;
}

/** Counts exact source files required by the current active locale set. */
export function quranV3SourceFileCount(activeAppLocales: ActiveAppLocaleList) {
  const sourceIds = quranV3SourceIds(activeAppLocales);
  return sourceIds.reduce(
    (count, sourceId) =>
      count + (sourceId === "quranenc-tafsir" ? QURAN_SURAH_COUNT : 1),
    0
  );
}

/** Public current source attribution including the pinned German source. */
export const QuranSourceAttributionV3Schema = Schema.Struct({
  ...QuranSourceAttributionSchema.fields,
  id: QuranSourceIdV3Schema,
});
export type QuranSourceAttributionV3 =
  typeof QuranSourceAttributionV3Schema.Type;

/** Checks source identities for uniqueness and protocol order. */
function hasCanonicalSources(sources: readonly QuranSourceAttributionV3[]) {
  return sources.every((source, index) => {
    const previous = sources[index - 1];
    return (
      previous === undefined ||
      QuranSourceIdV3Schema.literals.indexOf(previous.id) <
        QuranSourceIdV3Schema.literals.indexOf(source.id)
    );
  });
}

/** Current visible attribution row with an active source subset. */
export const QuranAttributionV3RowSchema = Schema.Struct({
  kind: Schema.Literal("quran-attribution"),
  sources: Schema.NonEmptyArray(QuranSourceAttributionV3Schema),
}).pipe(
  Schema.filter(({ sources }) => hasCanonicalSources(sources), {
    message: () => "Expected unique Quran sources in canonical order.",
  })
);

/** One current locale-indexed QuranEnc translation. */
export const QuranTranslationV3Schema = Schema.Struct({
  appLocale: AppLocaleSchema,
  value: QuranTranslationSchema,
});
export type QuranTranslationV3 = typeof QuranTranslationV3Schema.Type;

/** Checks translation entries for unique canonical app-locale order. */
function hasCanonicalTranslations(translations: readonly QuranTranslationV3[]) {
  return translations.every((translation, index) => {
    const previous = translations[index - 1];
    return (
      previous === undefined ||
      APP_LOCALE_CODES.indexOf(previous.appLocale) <
        APP_LOCALE_CODES.indexOf(translation.appLocale)
    );
  });
}

const QuranTranslationV3ListSchema = Schema.NonEmptyArray(
  QuranTranslationV3Schema
).pipe(
  Schema.filter(hasCanonicalTranslations, {
    message: () =>
      "Quran translations must use unique canonical app-locale order.",
  })
);

/** Current optional Tafsir entry, available only for reviewed locales. */
const QuranRuntimeTafsirV3Schema = Schema.Struct({
  appLocale: QuranTafsirLocaleSchema,
  footnotes: Schema.NullOr(Schema.String),
  text: QuranMeaningfulTextSchema,
});

/** One exact current verse with explicit translation locale entries. */
export const QuranRuntimeVerseV3Schema = Schema.Struct({
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
  tafsir: Schema.Array(QuranRuntimeTafsirV3Schema).pipe(Schema.maxItems(1)),
  text: QuranTextSchema,
  translations: QuranTranslationV3ListSchema,
});
export type QuranRuntimeVerseV3 = typeof QuranRuntimeVerseV3Schema.Type;

/** Checks one current chunk's bounds against every ordered verse. */
function hasCoherentChunk(input: {
  readonly firstQuranNumber: number;
  readonly firstVerse: number;
  readonly lastVerse: number;
  readonly verses: readonly QuranRuntimeVerseV3[];
}) {
  if (input.lastVerse - input.firstVerse + 1 !== input.verses.length) {
    return false;
  }
  return input.verses.every(
    (verse, index) =>
      verse.number.inSurah === input.firstVerse + index &&
      verse.number.inQuran === input.firstQuranNumber + index
  );
}

/** Current bounded runtime row containing ordered verses. */
export const QuranChunkV3RowSchema = Schema.Struct({
  firstQuranNumber: Schema.Int.pipe(Schema.positive()),
  firstVerse: Schema.Int.pipe(Schema.positive()),
  kind: Schema.Literal("quran-chunk"),
  lastVerse: Schema.Int.pipe(Schema.positive()),
  surahNumber: Schema.Int.pipe(Schema.between(1, QURAN_SURAH_COUNT)),
  verses: Schema.NonEmptyArray(QuranRuntimeVerseV3Schema).pipe(
    Schema.maxItems(QURAN_CHUNK_SIZE)
  ),
}).pipe(
  Schema.filter(hasCoherentChunk, {
    message: () => "Expected one contiguous Quran runtime chunk.",
  })
);

/** One current locale-specific Quran route and search document. */
export const QuranSearchV3RowSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  graph: LearningGraphIdentitySchema,
  kind: Schema.Literal("quran-search"),
  route: PublicPathSchema,
  surahNumber: Schema.Int.pipe(Schema.between(1, QURAN_SURAH_COUNT)),
  text: QuranMeaningfulTextSchema,
  title: QuranMeaningfulTextSchema,
});

/** Complete current structured Quran row vocabulary. */
export const QuranV3RowPayloadSchema = Schema.Union(
  QuranAttributionV3RowSchema,
  QuranSurahRowSchema,
  QuranChunkV3RowSchema,
  QuranSearchV3RowSchema
);
export type QuranV3RowPayload = typeof QuranV3RowPayloadSchema.Type;

/** One content-addressed current row bound to its snapshot identity. */
export const QuranSnapshotV3RowSchema = Schema.Struct({
  payload: QuranV3RowPayloadSchema,
  rowHash: Sha256HashSchema,
  snapshotId: Sha256HashSchema,
});
export type QuranSnapshotV3Row = typeof QuranSnapshotV3RowSchema.Type;
