import { describe, expect, it } from "vitest";

import { quranProvenanceRecords } from "#corpus/quran/provenance";

describe("Quran provenance records", () => {
  it("keeps every independently reviewed source scope explicit", () => {
    expect(quranProvenanceRecords).toHaveLength(7);
    expect(quranProvenanceRecords.map(({ scope }) => scope)).toEqual([
      "arabic-text",
      "metadata",
      "english-translation",
      "transliteration",
      "audio",
      "indonesian-translation",
      "indonesian-tafsir",
    ]);
    expect(
      quranProvenanceRecords.filter(({ status }) => status === "blocked")
    ).toHaveLength(6);
    expect(
      quranProvenanceRecords.every(
        ({ retrievedOn }) => retrievedOn === "2026-07-24"
      )
    ).toBe(true);
  });
});
