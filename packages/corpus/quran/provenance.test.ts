import { makeQuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { quranProvenanceRecords } from "#corpus/quran/provenance";

describe("Quran provenance records", () => {
  it("keeps every independently reviewed source chain explicit", async () => {
    const manifest = await Effect.runPromise(
      makeQuranProvenanceManifest(quranProvenanceRecords)
    );

    expect(quranProvenanceRecords).toHaveLength(16);
    expect(new Set(quranProvenanceRecords.map(({ scope }) => scope))).toEqual(
      new Set([
        "arabic-text",
        "audio",
        "english-translation",
        "indonesian-tafsir",
        "indonesian-translation",
        "metadata",
        "transliteration",
      ])
    );
    expect(manifest.status).toBe("blocked");
    expect(
      quranProvenanceRecords.every(
        ({ retrievedOn }) => retrievedOn === "2026-07-23"
      )
    ).toBe(true);
  });
});
