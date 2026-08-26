import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Schema } from "effect";

import { quranTafsirAccessFor } from "#corpus/quran/access";

describe("Quran Tafsir access", () => {
  it("selects one signed access record for every active locale", () => {
    expect(quranTafsirAccessFor(ACTIVE_APP_LOCALES)).toMatchObject([
      {
        appLocale: "en",
        kind: "external",
        sourceId: "mokhtasar-english",
      },
      {
        appLocale: "id",
        kind: "embedded",
        sourceId: "quranenc-tafsir",
      },
      {
        appLocale: "de",
        kind: "external",
        sourceId: "mokhtasar-german",
      },
    ]);
  });

  it("preserves a selected locale subset without fallback records", () => {
    const selected = Schema.decodeSync(ActiveAppLocaleListSchema)(["de"]);

    expect(quranTafsirAccessFor(selected)).toMatchObject([
      { appLocale: "de", kind: "external" },
    ]);
  });
});
