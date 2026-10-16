import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  ActiveAppLocaleListSchema,
  ActiveAppLocaleSchema,
  AppLocaleSchema,
  ArtifactLocaleSchema,
  activeAppLocaleCode,
  artifactLocaleCode,
  ContentLanguageSchema,
  DeliveryLanguageSchema,
} from "#contracts/locale";

describe("locale", () => {
  it("decodes distinct branded app and delivery language values", () => {
    expect(Schema.decodeSync(AppLocaleSchema)("de")).toBe("de");
    expect(Schema.decodeSync(DeliveryLanguageSchema)("de")).toBe("de");
    expect(activeAppLocaleCode(ActiveAppLocaleSchema.make("en"))).toBe("en");
    expect(artifactLocaleCode(ArtifactLocaleSchema.make("de"))).toBe("de");
  });

  it("accepts a well-formed canonical tag of any language as a content language", () => {
    for (const tag of ["ar", "id", "de-CH", "zh-Hant-TW", "sr-Latn"]) {
      expect(Schema.decodeSync(ContentLanguageSchema)(tag)).toBe(tag);
    }
  });

  it("refuses a tag that Intl rejects, and names the canonical form of a tag that Intl rewrites", () => {
    for (const tag of ["", "x", "en_US"]) {
      expect(
        Exit.isFailure(Schema.decodeExit(ContentLanguageSchema)(tag))
      ).toBe(true);
    }
    expect(String(Schema.decodeExit(ContentLanguageSchema)("en_US"))).toContain(
      "Expected a well-formed BCP 47 language tag."
    );
    for (const { canonical, tag } of [
      { canonical: "ar", tag: "AR" },
      { canonical: "he", tag: "iw" },
    ]) {
      expect(String(Schema.decodeExit(ContentLanguageSchema)(tag))).toContain(
        `Expected the canonical language tag "${canonical}".`
      );
    }
  });

  it("keeps the delivery language of the try-outs to the app locales", () => {
    expect(
      Exit.isFailure(Schema.decodeUnknownExit(DeliveryLanguageSchema)("ar"))
    ).toBe(true);
  });

  it("accepts nonempty canonical active locale subsets", () => {
    for (const locales of [
      ["en"],
      ["id"],
      ["de"],
      ["en", "id"],
      ["en", "de"],
      ["id", "de"],
      ["en", "id", "de"],
    ] as const) {
      expect(Schema.decodeSync(ActiveAppLocaleListSchema)(locales)).toEqual(
        locales
      );
    }
  });

  it("rejects empty, duplicate, and unordered active locale lists", () => {
    for (const locales of [
      [],
      ["en", "en"],
      ["id", "en"],
      ["de", "id"],
    ] as const) {
      const result = Schema.decodeUnknownExit(ActiveAppLocaleListSchema)(
        locales
      );
      expect(Exit.isFailure(result)).toBe(true);
    }
    expect(
      String(Schema.decodeExit(ActiveAppLocaleListSchema)(["en", "en"]))
    ).toContain(
      "Active app locales must be unique and follow en, id, de order."
    );
  });
});
