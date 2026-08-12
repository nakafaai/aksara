import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
  DeliveryLanguageSchema,
  HistoricalAppLocaleListSchema,
} from "#contracts/locale";

describe("locale", () => {
  it("decodes distinct branded app and delivery language values", () => {
    expect(Schema.decodeUnknownSync(AppLocaleSchema)("de")).toBe("de");
    expect(Schema.decodeUnknownSync(DeliveryLanguageSchema)("de")).toBe("de");
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
      expect(
        Schema.decodeUnknownSync(ActiveAppLocaleListSchema)(locales)
      ).toEqual(locales);
    }
  });

  it("rejects empty, duplicate, and unordered active locale lists", () => {
    for (const locales of [
      [],
      ["en", "en"],
      ["id", "en"],
      ["de", "id"],
    ] as const) {
      const result = Schema.decodeUnknownEither(ActiveAppLocaleListSchema)(
        locales
      );
      expect(Either.isLeft(result)).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownEither(ActiveAppLocaleListSchema)(["en", "en"])
      )
    ).toContain(
      "Active app locales must be unique and follow en, id, de order."
    );
  });

  it("keeps the historical decoder fixed to en and id", () => {
    expect(
      Schema.decodeUnknownSync(HistoricalAppLocaleListSchema)(["en", "id"])
    ).toEqual(["en", "id"]);
    for (const locales of [["en"], ["id", "en"], ["en", "id", "de"]] as const) {
      const result = Schema.decodeUnknownEither(HistoricalAppLocaleListSchema)(
        locales
      );
      expect(Either.isLeft(result)).toBe(true);
    }
    expect(
      String(Schema.decodeUnknownEither(HistoricalAppLocaleListSchema)(["en"]))
    ).toContain("Historical app locales must be exactly en and id.");
  });
});
