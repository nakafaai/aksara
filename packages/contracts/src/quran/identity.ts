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

/** Selects the one pinned translation source for an application locale. */
export function quranTranslationSourceId(appLocale: AppLocaleCode) {
  return QURAN_TRANSLATION_BY_LOCALE[appLocale].sourceId;
}

/** Selects the one provenance scope for an application locale. */
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

/** Selects the signed Arabic and localized translation reading sources. */
export function quranReadingSourceIds(appLocale: AppLocaleCode) {
  return ["tanzil-text", quranTranslationSourceId(appLocale)] as const;
}
