import {
  type AppLocale,
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
