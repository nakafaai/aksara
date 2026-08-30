import { describe, expect, expectTypeOf, it } from "vitest";

import {
  type AppLocale,
  AppLocaleSchema,
  type ArtifactLocale,
  type DeliveryLanguage,
  DeliveryLanguageSchema,
} from "#contracts/locale";
import {
  canonicalAssessmentLanguagePolicy,
  deliveryLanguageForPolicy,
  questionArtifactLocaleForPolicy,
  questionArtifactLocalesForPolicy,
} from "#contracts/tryout/language";

describe("try-out language", () => {
  const english = DeliveryLanguageSchema.make("en");
  const indonesian = DeliveryLanguageSchema.make("id");

  it("keeps app, delivery, and artifact locale types distinct", () => {
    expectTypeOf<AppLocale>().not.toEqualTypeOf<DeliveryLanguage>();
    expectTypeOf<AppLocale>().not.toEqualTypeOf<ArtifactLocale>();
    expectTypeOf<DeliveryLanguage>().not.toEqualTypeOf<ArtifactLocale>();
  });

  it("preserves a source-owned assessed language", () => {
    const german = AppLocaleSchema.make("de");
    expect(
      deliveryLanguageForPolicy({ kind: "fixed", language: english }, german)
    ).toBe("en");
    expect(
      deliveryLanguageForPolicy({ kind: "fixed", language: indonesian }, german)
    ).toBe("id");
  });

  it("uses the app locale only when the source policy declares it", () => {
    expect(
      deliveryLanguageForPolicy(
        { kind: "app-locale" },
        AppLocaleSchema.make("de")
      )
    ).toBe("de");
  });

  it("derives the immutable question artifact locale without exchanging brands", () => {
    expect(
      questionArtifactLocaleForPolicy(
        { kind: "fixed", language: english },
        AppLocaleSchema.make("de")
      )
    ).toBe("en");
  });

  it("deduplicates source-required item locales across app locales", () => {
    expect(
      questionArtifactLocalesForPolicy({ kind: "fixed", language: english })
    ).toEqual(["en"]);
    expect(questionArtifactLocalesForPolicy({ kind: "app-locale" })).toEqual([
      "en",
      "id",
      "de",
    ]);
  });

  it("canonically orders both policy variants", () => {
    expect(canonicalAssessmentLanguagePolicy({ kind: "app-locale" })).toEqual({
      kind: "app-locale",
    });
    expect(
      canonicalAssessmentLanguagePolicy({ kind: "fixed", language: english })
    ).toEqual({ kind: "fixed", language: "en" });
  });
});
