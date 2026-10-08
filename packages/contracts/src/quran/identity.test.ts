import { describe, expect, it } from "@effect/vitest";

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
    expect(ACTIVE_APP_LOCALES.map(quranNameSourceId)).toEqual([
      "tanzil-metadata",
      "kemenag-names",
      "bubenheim-names",
    ]);
    expect(ACTIVE_APP_LOCALES.map(quranNameProvenanceScope)).toEqual([
      "en-surah-name",
      "id-surah-name",
      "de-surah-name",
    ]);
  });

  it("pins the translation and surah-name source of each provenance scope", () => {
    expect(
      (["en-translation", "id-translation", "de-translation"] as const).map(
        quranTranslationSourceForScope
      )
    ).toEqual(["quranenc-english", "quranenc-indonesian", "quranenc-german"]);
    expect(
      (["en-surah-name", "id-surah-name", "de-surah-name"] as const).map(
        quranNameSourceForScope
      )
    ).toEqual(["tanzil-metadata", "kemenag-names", "bubenheim-names"]);
  });

  it("pins the reading sources of each active locale", () => {
    expect(ACTIVE_APP_LOCALES.map(quranReadingSourceIds)).toEqual([
      ["tanzil-text", "quranenc-english"],
      ["tanzil-text", "quranenc-indonesian"],
      ["tanzil-text", "quranenc-german"],
    ]);
  });
});

describe("Quran source identity", () => {
  it("derives every translation source and provenance scope from one map", () => {
    expect(
      ACTIVE_APP_LOCALES.map((appLocale) => ({
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
      ACTIVE_APP_LOCALES.map((appLocale) =>
        quranTranslationSourceForScope(
          quranTranslationProvenanceScope(appLocale)
        )
      )
    ).toEqual(["quranenc-english", "quranenc-indonesian", "quranenc-german"]);
    expect(ACTIVE_APP_LOCALES.map(quranTafsirSourceId)).toEqual([
      "mokhtasar-english",
      "quranenc-tafsir",
      "mokhtasar-german",
    ]);
  });
});
