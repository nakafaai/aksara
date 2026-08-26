import { describe, expect, it } from "vitest";

import {
  authoringQuranSourceAttribution,
  quranSourceAttributions,
} from "#corpus/quran/attribution/source";

describe("Quran attribution sources", () => {
  it("owns every authoring source in canonical order", () => {
    expect(quranSourceAttributions.map(({ id }) => id)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "quranenc-english",
      "quranenc-indonesian",
      "quranenc-german",
      "quranenc-tafsir",
      "mokhtasar-english",
      "mokhtasar-german",
    ]);
    expect(authoringQuranSourceAttribution("quranenc-german")).toMatchObject({
      id: "quranenc-german",
      version: "v1.1.4-xml.1",
    });
    expect(authoringQuranSourceAttribution("mokhtasar-english")).toMatchObject({
      artifact: {
        digest:
          "sha256:48da8b01b00a20a536b11924a9d78466744b789f3f5039cf0747b3f1362eb7b8",
      },
      id: "mokhtasar-english",
      publisher: "Dar al-Mukhtasar",
      version: "catalog-v7",
    });
  });
});
