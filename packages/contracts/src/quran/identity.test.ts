import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";

import {
  ACTIVE_APP_LOCALES,
  INDONESIAN_APP_LOCALE_CODE,
  makeAppLocale,
} from "#contracts/locale";
import {
  quranNameProvenanceScope,
  quranNameSourceForScope,
  quranNameSourceId,
  quranReadingSourceIds,
  quranTafsirSourceId,
  quranTranslationProvenanceScope,
  quranTranslationSourceForScope,
  quranTranslationSourceId,
} from "#contracts/quran/identity";

describe("Quran source mapping golden identities", () => {
  it("pins the surah-name source and provenance scope of each active locale", () => {
    expect(Arr.map(ACTIVE_APP_LOCALES, quranNameSourceId)).toEqual([
      "tanzil-metadata",
      "kemenag-names",
      "bubenheim-names",
    ]);
    expect(Arr.map(ACTIVE_APP_LOCALES, quranNameProvenanceScope)).toEqual([
      "en-surah-name",
      "id-surah-name",
      "de-surah-name",
    ]);
  });

  it("pins the translation and surah-name source of each provenance scope", () => {
    expect(
      Arr.map(
        ["en-translation", "id-translation", "de-translation"] as const,
        quranTranslationSourceForScope
      )
    ).toEqual(["quranenc-english", "quranenc-indonesian", "quranenc-german"]);
    expect(
      Arr.map(
        ["en-surah-name", "id-surah-name", "de-surah-name"] as const,
        quranNameSourceForScope
      )
    ).toEqual(["tanzil-metadata", "kemenag-names", "bubenheim-names"]);
  });

  it("pins the reading sources of each active locale", () => {
    expect(Arr.map(ACTIVE_APP_LOCALES, quranReadingSourceIds)).toEqual([
      ["tanzil-text", "quranenc-english"],
      ["tanzil-text", "quranenc-indonesian"],
      ["tanzil-text", "quranenc-german"],
    ]);
  });
});

describe("Quran source identity", () => {
  it("derives every translation source and provenance scope from one map", () => {
    expect(
      Arr.map(ACTIVE_APP_LOCALES, (appLocale) => ({
        scope: quranTranslationProvenanceScope(appLocale),
        sourceId: quranTranslationSourceId(appLocale),
      }))
    ).toEqual([
      { scope: "en-translation", sourceId: "quranenc-english" },
      { scope: "id-translation", sourceId: "quranenc-indonesian" },
      { scope: "de-translation", sourceId: "quranenc-german" },
    ]);
    expect(
      quranReadingSourceIds(makeAppLocale(INDONESIAN_APP_LOCALE_CODE))
    ).toEqual(["tanzil-text", "quranenc-indonesian"]);
    expect(
      Arr.map(ACTIVE_APP_LOCALES, (appLocale) =>
        quranTranslationSourceForScope(
          quranTranslationProvenanceScope(appLocale)
        )
      )
    ).toEqual(["quranenc-english", "quranenc-indonesian", "quranenc-german"]);
    expect(Arr.map(ACTIVE_APP_LOCALES, quranTafsirSourceId)).toEqual([
      "mokhtasar-english",
      "quranenc-tafsir",
      "mokhtasar-german",
    ]);
  });
});
