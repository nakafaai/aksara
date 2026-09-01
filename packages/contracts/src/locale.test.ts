import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  ActiveAppLocaleListSchema,
  ActiveAppLocaleSchema,
  AppLocaleSchema,
  ArtifactLocaleSchema,
  activeAppLocaleCode,
  artifactLocaleCode,
  DeliveryLanguageSchema,
} from "#contracts/locale";

describe("locale", () => {
  it("decodes distinct branded app and delivery language values", () => {
    expect(Schema.decodeSync(AppLocaleSchema)("de")).toBe("de");
    expect(Schema.decodeSync(DeliveryLanguageSchema)("de")).toBe("de");
    expect(activeAppLocaleCode(ActiveAppLocaleSchema.make("en"))).toBe("en");
    expect(artifactLocaleCode(ArtifactLocaleSchema.make("de"))).toBe("de");
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
