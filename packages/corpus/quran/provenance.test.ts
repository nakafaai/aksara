import { makeQuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { quranProvenanceRecords } from "#corpus/quran/provenance";

describe("Quran provenance records", () => {
  it("keeps every independently reviewed source chain explicit", async () => {
    const manifest = await Effect.runPromise(
      makeQuranProvenanceManifest(quranProvenanceRecords)
    );

    expect(quranProvenanceRecords).toHaveLength(5);
    expect(new Set(quranProvenanceRecords.map(({ scope }) => scope))).toEqual(
      new Set([
        "arabic-text",
        "en-translation",
        "id-tafsir",
        "id-translation",
        "metadata",
      ])
    );
    expect(manifest.status).toBe("approved");
    expect(
      quranProvenanceRecords.every(
        ({ attribution }) => attribution.retrievedAt === "2026-07-24T17:57:50Z"
      )
    ).toBe(true);
  });
});
