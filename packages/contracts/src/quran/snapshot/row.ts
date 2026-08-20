import { Schema } from "effect";

import { LearningGraphIdentitySchema } from "#contracts/graph/spec";
import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { APP_LOCALE_CODES, AppLocaleSchema } from "#contracts/locale";
import { QuranAttributionRowSchema } from "#contracts/quran/source";
import {
  QURAN_CHUNK_SIZE,
  QuranMeaningfulTextSchema,
  QuranSurahNumberSchema,
  QuranSurahRowSchema,
  QuranTafsirLocaleSchema,
  QuranTextSchema,
  QuranTranslationSchema,
} from "#contracts/quran/spec";

/** One locale-indexed QuranEnc translation. */
export const QuranLocalizedTranslationSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  value: QuranTranslationSchema,
});
export type QuranLocalizedTranslation =
  typeof QuranLocalizedTranslationSchema.Type;

/** Checks translation entries for unique canonical app-locale order. */
function hasCanonicalTranslations(
  translations: readonly QuranLocalizedTranslation[]
) {
  return translations.every((translation, index) => {
    const previous = translations[index - 1];
    return (
      previous === undefined ||
      APP_LOCALE_CODES.indexOf(previous.appLocale) <
        APP_LOCALE_CODES.indexOf(translation.appLocale)
    );
  });
}

const QuranTranslationListSchema = Schema.NonEmptyArray(
  QuranLocalizedTranslationSchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalTranslations, {
      message: "Quran translations must use unique canonical app-locale order.",
    })
  )
);

/** Optional Tafsir entry available only for reviewed locales. */
const QuranRuntimeTafsirSchema = Schema.Struct({
  appLocale: QuranTafsirLocaleSchema,
  footnotes: Schema.NullOr(Schema.String),
  text: QuranMeaningfulTextSchema,
});

/** One exact verse with explicit translation locale entries. */
export const QuranRuntimeVerseSchema = Schema.Struct({
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
  tafsir: Schema.Array(QuranRuntimeTafsirSchema).pipe(
    Schema.check(Schema.isMaxLength(1))
  ),
  text: QuranTextSchema,
  translations: QuranTranslationListSchema,
});
export type QuranRuntimeVerse = typeof QuranRuntimeVerseSchema.Type;

/** Checks one chunk's declared bounds against every ordered verse. */
function hasCoherentChunk(input: {
  readonly firstQuranNumber: number;
  readonly firstVerse: number;
  readonly lastVerse: number;
  readonly verses: readonly QuranRuntimeVerse[];
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

/** Immutable bounded runtime row containing ordered verses. */
export const QuranChunkRowSchema = Schema.Struct({
  firstQuranNumber: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  firstVerse: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  kind: Schema.Literal("quran-chunk"),
  lastVerse: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  surahNumber: QuranSurahNumberSchema,
  verses: Schema.NonEmptyArray(QuranRuntimeVerseSchema).pipe(
    Schema.check(Schema.isMaxLength(QURAN_CHUNK_SIZE))
  ),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentChunk, {
      message: "Expected one contiguous Quran runtime chunk.",
    })
  )
);

/** One locale-specific Quran route and full-text search document. */
export const QuranSearchRowSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  graph: LearningGraphIdentitySchema,
  kind: Schema.Literal("quran-search"),
  route: PublicPathSchema,
  surahNumber: QuranSurahNumberSchema,
  text: QuranMeaningfulTextSchema,
  title: QuranMeaningfulTextSchema,
});

/** Complete structured Quran row vocabulary. */
export const QuranRowPayloadSchema = Schema.Union([
  QuranAttributionRowSchema,
  QuranSurahRowSchema,
  QuranChunkRowSchema,
  QuranSearchRowSchema,
]);
export type QuranRowPayload = typeof QuranRowPayloadSchema.Type;

/** One content-addressed row bound to an immutable Quran snapshot. */
export const QuranSnapshotRowSchema = Schema.Struct({
  payload: QuranRowPayloadSchema,
  rowHash: Sha256HashSchema,
  snapshotId: Sha256HashSchema,
});
export type QuranSnapshotRow = typeof QuranSnapshotRowSchema.Type;
