import { describe, expect, it } from "vitest";

import {
  ACTIVE_APP_LOCALES,
  INDONESIAN_APP_LOCALE_CODE,
  makeAppLocale,
} from "#contracts/locale";
import {
  quranReadingSourceIds,
  quranTafsirSourceId,
  quranTranslationProvenanceScope,
  quranTranslationSourceForScope,
  quranTranslationSourceId,
} from "#contracts/quran/identity";

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
