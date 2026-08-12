import { Schema } from "effect";

/** Stable locale codes supported by the current Aksara contract. */
export const AppLocaleCodeSchema = Schema.Literal("en", "id", "de");
export type AppLocaleCode = typeof AppLocaleCodeSchema.Type;

/** Application locale used for Nakafa-owned interface and explanation copy. */
export const AppLocaleSchema = AppLocaleCodeSchema.pipe(
  Schema.brand("@NakafaAI/AksaraAppLocale")
);
export type AppLocale = typeof AppLocaleSchema.Type;

/** Language delivered by content whose language may differ from the app shell. */
export const DeliveryLanguageSchema = AppLocaleCodeSchema.pipe(
  Schema.brand("@NakafaAI/AksaraDeliveryLanguage")
);
export type DeliveryLanguage = typeof DeliveryLanguageSchema.Type;

/** Locale identity of one immutable compiled content artifact. */
export const ArtifactLocaleSchema = AppLocaleCodeSchema.pipe(
  Schema.brand("@NakafaAI/AksaraArtifactLocale")
);
export type ArtifactLocale = typeof ArtifactLocaleSchema.Type;

/** Canonical locale order used by every active-locale subset. */
export const APP_LOCALE_CODES = AppLocaleCodeSchema.literals;

/** Checks a nonempty locale subset for uniqueness and canonical order. */
function hasCanonicalActiveAppLocales(locales: readonly AppLocale[]) {
  let previousIndex = -1;
  for (const locale of locales) {
    const index = APP_LOCALE_CODES.indexOf(locale);
    if (index <= previousIndex) {
      return false;
    }
    previousIndex = index;
  }
  return true;
}

/** Nonempty unique active locale subset in canonical contract order. */
export const ActiveAppLocaleListSchema = Schema.NonEmptyArray(
  AppLocaleSchema
).pipe(
  Schema.filter(hasCanonicalActiveAppLocales, {
    message: () =>
      "Active app locales must be unique and follow en, id, de order.",
  })
);
export type ActiveAppLocaleList = typeof ActiveAppLocaleListSchema.Type;

/** Locale codes accepted by immutable pre-0.12 signed snapshots. */
export const HistoricalAppLocaleSchema = Schema.Literal("en", "id");
export type HistoricalAppLocale = typeof HistoricalAppLocaleSchema.Type;

/** Checks the exact immutable locale list used before contract 0.12. */
function hasHistoricalAppLocales(locales: readonly HistoricalAppLocale[]) {
  return (
    locales.length === HistoricalAppLocaleSchema.literals.length &&
    locales.every(
      (locale, index) => locale === HistoricalAppLocaleSchema.literals[index]
    )
  );
}

/** Exact ordered locale list required by historical signed decoders. */
export const HistoricalAppLocaleListSchema = Schema.Array(
  HistoricalAppLocaleSchema
).pipe(
  Schema.filter(hasHistoricalAppLocales, {
    message: () => "Historical app locales must be exactly en and id.",
  })
);
export type HistoricalAppLocaleList = typeof HistoricalAppLocaleListSchema.Type;
