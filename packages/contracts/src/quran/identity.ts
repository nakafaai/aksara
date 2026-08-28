import { Match, Schema } from "effect";

import {
  type AppLocaleCode,
  AppLocaleCodeSchema,
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
} from "#contracts/locale";

/** Official source identities whose bytes are pinned inside Aksara. */
export const QuranEmbeddedSourceIdSchema = Schema.Literals([
  "tanzil-text",
  "tanzil-metadata",
  "kemenag-names",
  "bubenheim-names",
  "quranenc-english",
  "quranenc-indonesian",
  "quranenc-german",
  "quranenc-tafsir",
]);
export type QuranEmbeddedSourceId = typeof QuranEmbeddedSourceIdSchema.Type;

/** Official source identities that Aksara may link to but not republish. */
export const QuranExternalSourceIdSchema = Schema.Literals([
  "mokhtasar-english",
  "mokhtasar-german",
]);
export type QuranExternalSourceId = typeof QuranExternalSourceIdSchema.Type;

/** Exact official Quran source identities in visible attribution order. */
export const QuranSourceIdSchema = Schema.Literals([
  ...QuranEmbeddedSourceIdSchema.literals,
  ...QuranExternalSourceIdSchema.literals,
]);
export type QuranSourceId = typeof QuranSourceIdSchema.Type;

/** Canonical order of every official source supported by the contract. */
export const QURAN_SOURCE_IDS = QuranSourceIdSchema.literals;

/** Locale-specific translation field in Quran source provenance. */
export const QuranTranslationProvenanceScopeSchema = Schema.TemplateLiteral([
  AppLocaleCodeSchema,
  "-translation",
]);
export type QuranTranslationProvenanceScope =
  typeof QuranTranslationProvenanceScopeSchema.Type;

/** Locale-specific surah-name field in Quran source provenance. */
export const QuranNameProvenanceScopeSchema = Schema.TemplateLiteral([
  AppLocaleCodeSchema,
  "-surah-name",
]);
export type QuranNameProvenanceScope =
  typeof QuranNameProvenanceScopeSchema.Type;

interface QuranNameBinding {
  readonly scope: QuranNameProvenanceScope;
  readonly sourceId: QuranEmbeddedSourceId;
}

const QURAN_NAME_BY_LOCALE = {
  [ENGLISH_APP_LOCALE_CODE]: {
    scope: "en-surah-name",
    sourceId: "tanzil-metadata",
  },
  [GERMAN_APP_LOCALE_CODE]: {
    scope: "de-surah-name",
    sourceId: "bubenheim-names",
  },
  [INDONESIAN_APP_LOCALE_CODE]: {
    scope: "id-surah-name",
    sourceId: "kemenag-names",
  },
} as const satisfies Record<AppLocaleCode, QuranNameBinding>;

interface QuranTranslationBinding {
  readonly scope: QuranTranslationProvenanceScope;
  readonly sourceId: QuranEmbeddedSourceId;
}

const QURAN_TRANSLATION_BY_LOCALE = {
  [ENGLISH_APP_LOCALE_CODE]: {
    scope: "en-translation",
    sourceId: "quranenc-english",
  },
  [GERMAN_APP_LOCALE_CODE]: {
    scope: "de-translation",
    sourceId: "quranenc-german",
  },
  [INDONESIAN_APP_LOCALE_CODE]: {
    scope: "id-translation",
    sourceId: "quranenc-indonesian",
  },
} as const satisfies Record<AppLocaleCode, QuranTranslationBinding>;

interface QuranTafsirBinding {
  readonly sourceId: QuranSourceId;
}

const QURAN_TAFSIR_BY_LOCALE = {
  [ENGLISH_APP_LOCALE_CODE]: { sourceId: "mokhtasar-english" },
  [GERMAN_APP_LOCALE_CODE]: { sourceId: "mokhtasar-german" },
  [INDONESIAN_APP_LOCALE_CODE]: { sourceId: "quranenc-tafsir" },
} as const satisfies Record<AppLocaleCode, QuranTafsirBinding>;

/** Selects the reviewed surah-name source for an application locale. */
export function quranNameSourceId(
  appLocale: typeof ENGLISH_APP_LOCALE_CODE
): (typeof QURAN_NAME_BY_LOCALE)[typeof ENGLISH_APP_LOCALE_CODE]["sourceId"];
/** Narrows the Indonesian surah-name source identity. */
export function quranNameSourceId(
  appLocale: typeof INDONESIAN_APP_LOCALE_CODE
): (typeof QURAN_NAME_BY_LOCALE)[typeof INDONESIAN_APP_LOCALE_CODE]["sourceId"];
/** Narrows the German surah-name source identity. */
export function quranNameSourceId(
  appLocale: typeof GERMAN_APP_LOCALE_CODE
): (typeof QURAN_NAME_BY_LOCALE)[typeof GERMAN_APP_LOCALE_CODE]["sourceId"];
/** Selects a surah-name source from a dynamic supported locale. */
export function quranNameSourceId(
  appLocale: AppLocaleCode
): QuranEmbeddedSourceId;
/** Resolves the selected surah-name source identity. */
export function quranNameSourceId(appLocale: AppLocaleCode) {
  return QURAN_NAME_BY_LOCALE[appLocale].sourceId;
}

/** Selects the surah-name provenance scope for an application locale. */
export function quranNameProvenanceScope(
  appLocale: typeof ENGLISH_APP_LOCALE_CODE
): (typeof QURAN_NAME_BY_LOCALE)[typeof ENGLISH_APP_LOCALE_CODE]["scope"];
/** Narrows the Indonesian surah-name provenance scope. */
export function quranNameProvenanceScope(
  appLocale: typeof INDONESIAN_APP_LOCALE_CODE
): (typeof QURAN_NAME_BY_LOCALE)[typeof INDONESIAN_APP_LOCALE_CODE]["scope"];
/** Narrows the German surah-name provenance scope. */
export function quranNameProvenanceScope(
  appLocale: typeof GERMAN_APP_LOCALE_CODE
): (typeof QURAN_NAME_BY_LOCALE)[typeof GERMAN_APP_LOCALE_CODE]["scope"];
/** Selects a surah-name provenance scope from a dynamic locale. */
export function quranNameProvenanceScope(
  appLocale: AppLocaleCode
): QuranNameProvenanceScope;
/** Resolves the selected surah-name provenance scope. */
export function quranNameProvenanceScope(appLocale: AppLocaleCode) {
  return QURAN_NAME_BY_LOCALE[appLocale].scope;
}

/** Selects the one pinned translation source for an application locale. */
export function quranTranslationSourceId(
  appLocale: typeof ENGLISH_APP_LOCALE_CODE
): (typeof QURAN_TRANSLATION_BY_LOCALE)[typeof ENGLISH_APP_LOCALE_CODE]["sourceId"];
/** Narrows the Indonesian translation source identity. */
export function quranTranslationSourceId(
  appLocale: typeof INDONESIAN_APP_LOCALE_CODE
): (typeof QURAN_TRANSLATION_BY_LOCALE)[typeof INDONESIAN_APP_LOCALE_CODE]["sourceId"];
/** Narrows the German translation source identity. */
export function quranTranslationSourceId(
  appLocale: typeof GERMAN_APP_LOCALE_CODE
): (typeof QURAN_TRANSLATION_BY_LOCALE)[typeof GERMAN_APP_LOCALE_CODE]["sourceId"];
/** Selects a translation source from a dynamic supported locale. */
export function quranTranslationSourceId(
  appLocale: AppLocaleCode
): QuranEmbeddedSourceId;
/** Resolves the selected translation source identity. */
export function quranTranslationSourceId(appLocale: AppLocaleCode) {
  return QURAN_TRANSLATION_BY_LOCALE[appLocale].sourceId;
}

/** Selects the one signed Tafsir source or access record for a locale. */
export function quranTafsirSourceId(
  appLocale: typeof ENGLISH_APP_LOCALE_CODE
): (typeof QURAN_TAFSIR_BY_LOCALE)[typeof ENGLISH_APP_LOCALE_CODE]["sourceId"];
/** Narrows the Indonesian Tafsir source identity. */
export function quranTafsirSourceId(
  appLocale: typeof INDONESIAN_APP_LOCALE_CODE
): (typeof QURAN_TAFSIR_BY_LOCALE)[typeof INDONESIAN_APP_LOCALE_CODE]["sourceId"];
/** Narrows the German Tafsir source identity. */
export function quranTafsirSourceId(
  appLocale: typeof GERMAN_APP_LOCALE_CODE
): (typeof QURAN_TAFSIR_BY_LOCALE)[typeof GERMAN_APP_LOCALE_CODE]["sourceId"];
/** Selects a Tafsir source from a dynamic supported locale. */
export function quranTafsirSourceId(appLocale: AppLocaleCode): QuranSourceId;
/** Resolves the selected Tafsir source identity. */
export function quranTafsirSourceId(appLocale: AppLocaleCode) {
  return QURAN_TAFSIR_BY_LOCALE[appLocale].sourceId;
}

/** Selects the one provenance scope for an application locale. */
export function quranTranslationProvenanceScope(
  appLocale: typeof ENGLISH_APP_LOCALE_CODE
): (typeof QURAN_TRANSLATION_BY_LOCALE)[typeof ENGLISH_APP_LOCALE_CODE]["scope"];
/** Narrows the Indonesian translation provenance scope. */
export function quranTranslationProvenanceScope(
  appLocale: typeof INDONESIAN_APP_LOCALE_CODE
): (typeof QURAN_TRANSLATION_BY_LOCALE)[typeof INDONESIAN_APP_LOCALE_CODE]["scope"];
/** Narrows the German translation provenance scope. */
export function quranTranslationProvenanceScope(
  appLocale: typeof GERMAN_APP_LOCALE_CODE
): (typeof QURAN_TRANSLATION_BY_LOCALE)[typeof GERMAN_APP_LOCALE_CODE]["scope"];
/** Selects a translation provenance scope from a dynamic locale. */
export function quranTranslationProvenanceScope(
  appLocale: AppLocaleCode
): QuranTranslationProvenanceScope;
/** Resolves the selected translation provenance scope. */
export function quranTranslationProvenanceScope(appLocale: AppLocaleCode) {
  return QURAN_TRANSLATION_BY_LOCALE[appLocale].scope;
}

/** Resolves a translation provenance scope through the canonical locale map. */
export function quranTranslationSourceForScope(
  scope: QuranTranslationProvenanceScope
) {
  return Match.value(scope).pipe(
    Match.when("en-translation", () =>
      quranTranslationSourceId(ENGLISH_APP_LOCALE_CODE)
    ),
    Match.when("id-translation", () =>
      quranTranslationSourceId(INDONESIAN_APP_LOCALE_CODE)
    ),
    Match.when("de-translation", () =>
      quranTranslationSourceId(GERMAN_APP_LOCALE_CODE)
    ),
    Match.exhaustive
  );
}

/** Resolves a surah-name provenance scope through the canonical locale map. */
export function quranNameSourceForScope(scope: QuranNameProvenanceScope) {
  return Match.value(scope).pipe(
    Match.when("en-surah-name", () =>
      quranNameSourceId(ENGLISH_APP_LOCALE_CODE)
    ),
    Match.when("id-surah-name", () =>
      quranNameSourceId(INDONESIAN_APP_LOCALE_CODE)
    ),
    Match.when("de-surah-name", () =>
      quranNameSourceId(GERMAN_APP_LOCALE_CODE)
    ),
    Match.exhaustive
  );
}

/** Selects the signed Arabic and localized translation reading sources. */
export function quranReadingSourceIds(appLocale: AppLocaleCode) {
  return ["tanzil-text", quranTranslationSourceId(appLocale)] as const;
}
