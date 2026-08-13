import {
  ACTIVE_APP_LOCALES,
  type AppLocale,
  type ArtifactLocale,
  ArtifactLocaleSchema,
  type DeliveryLanguage,
  DeliveryLanguageSchema,
} from "#contracts/locale";
import type { TryoutKey } from "#contracts/tryout/key";

/** Stable section key whose prompt and choices assess English. */
export const ENGLISH_LANGUAGE_SECTION_KEY = "english-language";

/** Stable section key whose prompt and choices assess Indonesian. */
export const INDONESIAN_LANGUAGE_SECTION_KEY = "indonesian-language";

/** Derives delivered question language from stable section identity. */
export function deliveryLanguageForSection(
  sectionKey: TryoutKey,
  appLocale: AppLocale
): DeliveryLanguage {
  if (sectionKey === ENGLISH_LANGUAGE_SECTION_KEY) {
    return DeliveryLanguageSchema.make("en");
  }
  if (sectionKey === INDONESIAN_LANGUAGE_SECTION_KEY) {
    return DeliveryLanguageSchema.make("id");
  }
  return DeliveryLanguageSchema.make(appLocale);
}

/** Derives the immutable question artifact locale from section language policy. */
export function questionArtifactLocaleForSection(
  sectionKey: TryoutKey,
  appLocale: AppLocale
): ArtifactLocale {
  return ArtifactLocaleSchema.make(
    deliveryLanguageForSection(sectionKey, appLocale)
  );
}

/** Lists the unique prompt and choice locales required by one current section. */
export function questionArtifactLocalesForSection(sectionKey: TryoutKey) {
  return Object.freeze([
    ...new Set(
      ACTIVE_APP_LOCALES.map((appLocale) =>
        questionArtifactLocaleForSection(sectionKey, appLocale)
      )
    ),
  ]);
}
