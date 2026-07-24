import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_CHUNK_SIZE,
  QURAN_LOCALES,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
  QuranChunkRowSchema,
  QuranMeaningfulTextSchema,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
  QuranSnapshotRowSchema,
  QuranSurahRowSchema,
} from "#contracts/quran/spec";

const hash = `sha256:${"a".repeat(64)}`;

/** Builds one structurally valid technical verse sample. */
function verse(inSurah = 1, inQuran = 1) {
  return {
    meta: {
      hizbQuarter: 1,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: null,
    },
    number: { inQuran, inSurah },
    tafsir: { id: { footnotes: null, text: "Tafsir" } },
    text: { arabic: "نص" },
    translation: {
      en: { footnotes: "", text: "Text" },
      id: { footnotes: "", text: "Teks" },
    },
  };
}

/** Builds one bounded chunk for schema validation. */
function chunk() {
  return {
    firstQuranNumber: 1,
    firstVerse: 1,
    kind: "quran-chunk",
    lastVerse: 2,
    surahNumber: 1,
    verses: [verse(), verse(2, 2)],
  };
}

describe("Quran contracts", () => {
  it("locks the complete reviewed projection vocabulary", () => {
    const decodedVerse = Schema.decodeUnknownSync(QuranRuntimeVerseSchema)(
      verse()
    );
    const surah = Schema.decodeUnknownSync(QuranSurahRowSchema)({
      kind: "quran-surah",
      name: {
        arabic: "الفاتحة",
        translation: "The Opening",
        transliteration: "Al-Faatiha",
      },
      number: 1,
      numberOfVerses: 7,
      revelation: { order: 5, place: "Meccan" },
    });
    const search = Schema.decodeUnknownSync(QuranSearchRowSchema)({
      graph: {
        alignmentId: "alignment:quran:quran-surah:1",
        assetId: "asset:en:quran:quran-surah:1",
        conceptId: "concept:quran:surah:1",
        learningObjectId: "lo:quran-surah:1",
        lensId: "lens:quran",
      },
      kind: "quran-search",
      locale: "en",
      route: "quran/1",
      surahNumber: 1,
      text: "Al-Faatiha The Opening",
      title: "1. Al-Faatiha",
    });
    const row = Schema.decodeUnknownSync(QuranSnapshotRowSchema)({
      payload: search,
      rowHash: hash,
      snapshotId: hash,
    });

    expect(decodedVerse.number.inQuran).toBe(1);
    expect(surah.numberOfVerses).toBe(7);
    expect(row.payload.kind).toBe("quran-search");
    expect({
      attributions: QURAN_ATTRIBUTION_COUNT,
      chunkSize: QURAN_CHUNK_SIZE,
      locales: QURAN_LOCALES,
      searches: QURAN_SEARCH_COUNT,
      surahs: QURAN_SURAH_COUNT,
      tafsirLocales: QURAN_TAFSIR_LOCALES,
      verses: QURAN_VERSE_COUNT,
    }).toEqual({
      attributions: 1,
      chunkSize: 6,
      locales: ["en", "id"],
      searches: 228,
      surahs: 114,
      tafsirLocales: ["id"],
      verses: 6236,
    });
  });

  it("accepts contiguous chunks and rejects drifted bounds or numbering", () => {
    const valid = Schema.decodeUnknownSync(QuranChunkRowSchema)(chunk());
    const decode = Schema.decodeUnknownEither(QuranChunkRowSchema);
    const driftedBounds = decode({ ...chunk(), lastVerse: 3 });
    const driftedVerse = decode({
      ...chunk(),
      verses: [verse(), verse(3, 2)],
    });
    const oversized = decode({
      ...chunk(),
      lastVerse: 7,
      verses: Array.from({ length: 7 }, (_, index) =>
        verse(index + 1, index + 1)
      ),
    });
    if (driftedBounds._tag === "Right") {
      throw new Error("Expected drifted Quran chunk bounds to fail.");
    }

    expect(valid.verses).toHaveLength(2);
    expect(String(driftedBounds.left)).toContain(
      "Expected one contiguous Quran runtime chunk."
    );
    expect(driftedVerse._tag).toBe("Left");
    expect(oversized._tag).toBe("Left");
  });

  it("reports authored text failures and rejects removed compatibility fields", () => {
    const emptyText = Schema.decodeUnknownEither(QuranMeaningfulTextSchema)("");
    const compatibility = Schema.decodeUnknownEither(QuranRuntimeVerseSchema)(
      {
        ...verse(),
        audio: {
          primary: "http://example.com/primary.mp3",
        },
      },
      { onExcessProperty: "error" }
    );
    if (emptyText._tag === "Right" || compatibility._tag === "Right") {
      throw new Error("Expected invalid Quran source values to fail.");
    }

    expect(String(emptyText.left)).toContain("Quran text cannot be empty.");
    expect(String(compatibility.left)).toContain("audio");
  });
});
