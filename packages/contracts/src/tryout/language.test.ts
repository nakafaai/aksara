import { describe, expect, expectTypeOf, it } from "vitest";

import {
  type AppLocale,
  AppLocaleSchema,
  type ArtifactLocale,
  type DeliveryLanguage,
} from "#contracts/locale";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
  deliveryLanguageForSection,
  ENGLISH_LANGUAGE_SECTION_KEY,
  INDONESIAN_LANGUAGE_SECTION_KEY,
  questionArtifactLocaleForSection,
  questionArtifactLocalesForSection,
} from "#contracts/tryout/language";

describe("try-out language", () => {
  it("keeps app, delivery, and artifact locale types distinct", () => {
    expectTypeOf<AppLocale>().not.toEqualTypeOf<DeliveryLanguage>();
    expectTypeOf<AppLocale>().not.toEqualTypeOf<ArtifactLocale>();
    expectTypeOf<DeliveryLanguage>().not.toEqualTypeOf<ArtifactLocale>();
  });

  it("preserves assessed English and Indonesian section language", () => {
    const german = AppLocaleSchema.make("de");
    expect(
      deliveryLanguageForSection(
        TryoutKeySchema.make(ENGLISH_LANGUAGE_SECTION_KEY),
        german
      )
    ).toBe("en");
    expect(
      deliveryLanguageForSection(
        TryoutKeySchema.make(INDONESIAN_LANGUAGE_SECTION_KEY),
        german
      )
    ).toBe("id");
  });

  it("uses the app locale for every other section", () => {
    expect(
      deliveryLanguageForSection(
        TryoutKeySchema.make("mathematical-reasoning"),
        AppLocaleSchema.make("de")
      )
    ).toBe("de");
  });

  it("derives the immutable question artifact locale without exchanging brands", () => {
    expect(
      questionArtifactLocaleForSection(
        TryoutKeySchema.make(ENGLISH_LANGUAGE_SECTION_KEY),
        AppLocaleSchema.make("de")
      )
    ).toBe("en");
  });

  it("deduplicates assessed prompt and choice locales across app locales", () => {
    expect(
      questionArtifactLocalesForSection(
        TryoutKeySchema.make(ENGLISH_LANGUAGE_SECTION_KEY)
      )
    ).toEqual(["en"]);
    expect(
      questionArtifactLocalesForSection(
        TryoutKeySchema.make("mathematical-reasoning")
      )
    ).toEqual(["en", "id", "de"]);
  });
});
