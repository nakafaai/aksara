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
    ]);
    expect(authoringQuranSourceAttribution("quranenc-german")).toMatchObject({
      id: "quranenc-german",
      version: "v1.1.4-xml.1",
    });
  });
});
