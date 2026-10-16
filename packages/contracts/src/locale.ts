import { Array as Arr, Option, Schema } from "effect";

import { hasCanonicalOrder } from "#contracts/canonical";

/** Stable locale codes supported by the current Aksara contract. */
export const AppLocaleCodeSchema = Schema.Literals(["en", "id", "de"]);
export type AppLocaleCode = typeof AppLocaleCodeSchema.Type;

export const [
  ENGLISH_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
] = AppLocaleCodeSchema.literals;

const APP_LOCALE_BRAND = "@NakafaAI/AksaraAppLocale";

/** Application locale used for Nakafa-owned interface and explanation copy. */
export const AppLocaleSchema = AppLocaleCodeSchema.pipe(
  Schema.brand(APP_LOCALE_BRAND)
);
export type AppLocale = typeof AppLocaleSchema.Type;

/** Narrows one canonical locale code while preserving application identity. */
export function appLocaleLiteral<const Code extends AppLocaleCode>(code: Code) {
  return Schema.Literal(code).pipe(Schema.brand(APP_LOCALE_BRAND));
}

/** Constructs one application locale without widening its literal identity. */
export function makeAppLocale<const Code extends AppLocaleCode>(code: Code) {
  return appLocaleLiteral(code).make(code);
}

/** Language delivered by content whose language may differ from the app shell. */
export const DeliveryLanguageSchema = AppLocaleCodeSchema.pipe(
  Schema.brand("@NakafaAI/AksaraDeliveryLanguage")
);
export type DeliveryLanguage = typeof DeliveryLanguageSchema.Type;

const CONTENT_LANGUAGE_BRAND = "@NakafaAI/AksaraContentLanguage";

/** Intl's canonical form of one language tag, or nothing when Intl rejects the tag. */
const canonicalLanguageTag = Option.liftThrowable((tag: string) =>
  Intl.getCanonicalLocales(tag)
);

/**
 * Explains why a string is not a content language. Intl must accept it, and it
 * must already be the one canonical form that Intl writes for it. A tag that
 * Intl rewrites names that form, so the author can correct it.
 */
function contentLanguageIssue(tag: string) {
  return Option.match(Option.flatMap(canonicalLanguageTag(tag), Arr.head), {
    onNone: () => "Expected a well-formed BCP 47 language tag.",
    onSome: (canonical) =>
      canonical === tag
        ? undefined
        : `Expected the canonical language tag "${canonical}".`,
  });
}

/**
 * A language of one assessment text, as a BCP 47 tag in its canonical form, such
 * as `ar`, `de-CH`, or `zh-Hant-TW`. Unlike `DeliveryLanguageSchema`, it is not
 * limited to the app locales, so a school can write in any language. The
 * direction of a text is not stored: the renderer takes it from the script of
 * each text.
 */
export const ContentLanguageSchema = Schema.String.pipe(
  Schema.check(Schema.makeFilter(contentLanguageIssue)),
  Schema.brand(CONTENT_LANGUAGE_BRAND)
);
export type ContentLanguage = typeof ContentLanguageSchema.Type;

/** Locale identity of one immutable compiled content artifact. */
export const ArtifactLocaleSchema = AppLocaleCodeSchema.pipe(
  Schema.brand("@NakafaAI/AksaraArtifactLocale")
);
export type ArtifactLocale = typeof ArtifactLocaleSchema.Type;

/** Canonical locale order used by every active-locale subset. */
export const APP_LOCALE_CODES = AppLocaleCodeSchema.literals;

/** Source-controlled application locale codes included by this corpus. */
export const ActiveAppLocaleCodeSchema = AppLocaleCodeSchema;
export type ActiveAppLocaleCode = typeof ActiveAppLocaleCodeSchema.Type;

/** Source-controlled codes used to index the currently complete corpus. */
export const ACTIVE_APP_LOCALE_CODES = ActiveAppLocaleCodeSchema.literals;

/** Application locale currently required from every authored scope. */
export const ActiveAppLocaleSchema = ActiveAppLocaleCodeSchema.pipe(
  Schema.brand(APP_LOCALE_BRAND)
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
  return hasCanonicalOrder(APP_LOCALE_CODES, locales);
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
