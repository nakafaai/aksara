import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  CANDIDATE_APP_LOCALE_CODES,
  CANDIDATE_APP_LOCALES,
  CandidateAppLocaleListSchema,
  hasCandidateAppLocales,
  isActiveAppLocale,
} from "#corpus/locale/lifecycle";
import { AUTHORING_APP_LOCALES } from "#corpus/locale/source";

describe("locale lifecycle", () => {
  it("keeps authoring, candidate, and active lifecycle states explicit", () => {
    expect(AUTHORING_APP_LOCALES).toEqual(["en", "id", "de"]);
    expect(CANDIDATE_APP_LOCALES).toEqual(["de"]);
    expect(CANDIDATE_APP_LOCALE_CODES).toEqual(["de"]);
    expect(hasCandidateAppLocales()).toBe(true);
    expect(
      AUTHORING_APP_LOCALES.filter((appLocale) =>
        CANDIDATE_APP_LOCALES.includes(appLocale)
      )
    ).toEqual(CANDIDATE_APP_LOCALES);
    expect(
      CANDIDATE_APP_LOCALES.some((candidate) => isActiveAppLocale(candidate))
    ).toBe(false);
    expect(isActiveAppLocale(AppLocaleSchema.make("en"))).toBe(true);
    expect(isActiveAppLocale(AppLocaleSchema.make("de"))).toBe(false);
  });

  it("accepts the exact candidate set and rejects noncanonical lists", () => {
    expect(
      Schema.decodeUnknownSync(CandidateAppLocaleListSchema)([
        ...CANDIDATE_APP_LOCALES,
      ])
    ).toEqual(CANDIDATE_APP_LOCALES);
    expect(() =>
      Schema.decodeUnknownSync(CandidateAppLocaleListSchema)([
        ...CANDIDATE_APP_LOCALES,
        "en",
      ])
    ).toThrow();
    if (CANDIDATE_APP_LOCALES.length > 0) {
      const wrongMember = CANDIDATE_APP_LOCALES.map((appLocale, index) =>
        index === 0 ? AppLocaleSchema.make("en") : appLocale
      );
      expect(() =>
        Schema.decodeUnknownSync(CandidateAppLocaleListSchema)(wrongMember)
      ).toThrow();
    }
  });
});
