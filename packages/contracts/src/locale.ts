import { Schema } from "effect";

/** Stable locale codes supported by the current Aksara contract. */
export const AppLocaleCodeSchema = Schema.Literals(["en", "id", "de"]);
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

/** Source-controlled application locale codes included by this corpus. */
export const ActiveAppLocaleCodeSchema = Schema.Literals(["en", "id"]);
export type ActiveAppLocaleCode = typeof ActiveAppLocaleCodeSchema.Type;

/** Source-controlled codes used to index the currently complete corpus. */
export const ACTIVE_APP_LOCALE_CODES = ActiveAppLocaleCodeSchema.literals;

/** Application locale currently required from every authored scope. */
export const ActiveAppLocaleSchema = ActiveAppLocaleCodeSchema.pipe(
  Schema.brand("@NakafaAI/AksaraAppLocale")
);
export type ActiveAppLocale = typeof ActiveAppLocaleSchema.Type;

/** Returns the plain source-map key for one validated active app locale. */
export function activeAppLocaleCode(appLocale: ActiveAppLocale) {
  return Schema.encodeSync(ActiveAppLocaleSchema)(appLocale);
}

/** Returns the plain source-map key for one validated artifact locale. */
export function artifactLocaleCode(artifactLocale: ArtifactLocale) {
  return Schema.encodeSync(ArtifactLocaleSchema)(artifactLocale);
}

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
  Schema.check(
    Schema.makeFilter(hasCanonicalActiveAppLocales, {
      message: "Active app locales must be unique and follow en, id, de order.",
    })
  )
);
export type ActiveAppLocaleList = typeof ActiveAppLocaleListSchema.Type;

/** Source-controlled application locales included by the current corpus. */
export const ACTIVE_APP_LOCALES = Schema.decodeSync(
  Schema.NonEmptyArray(ActiveAppLocaleSchema)
)(ACTIVE_APP_LOCALE_CODES);
