import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  QURAN_CHUNK_COUNT,
  QURAN_CHUNK_SIZE,
  QURAN_LOCALES,
  QURAN_ROW_COUNT,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
  QuranChunkRowSchema,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
  QuranSnapshotRowSchema,
  QuranSurahRowSchema,
} from "#contracts/quran/spec";

const hash = `sha256:${"a".repeat(64)}`;

/** Builds one structurally valid technical verse sample. */
function verse(inSurah = 1, inQuran = 1) {
  return {
    audio: {
      primary: "https://example.com/primary.mp3",
      secondary: [
        "https://example.com/secondary.mp3",
        "https://example.com/alternate.mp3",
      ],
    },
    meta: {
      hizbQuarter: 1,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: { obligatory: false, recommended: false },
    },
    number: { inQuran, inSurah },
    tafsir: { id: { short: "Ringkas" } },
    text: { arab: "نص", transliteration: { en: "Text" } },
    translation: { en: "Text", id: "Teks" },
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
        long: "الفاتحة",
        short: "الفاتحة",
        translation: { en: "The Opening", id: "Pembukaan" },
        transliteration: { en: "Al-Faatiha", id: "Al-Fatihah" },
      },
      number: 1,
      numberOfVerses: 7,
      preBismillah: null,
      revelation: { arab: "مكية", en: "Meccan", id: "Makkiyah" },
      sequence: 5,
    });
    const search = Schema.decodeUnknownSync(QuranSearchRowSchema)({
      description: "The Opening",
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
      chunkSize: QURAN_CHUNK_SIZE,
      chunks: QURAN_CHUNK_COUNT,
      locales: QURAN_LOCALES,
      rows: QURAN_ROW_COUNT,
      searches: QURAN_SEARCH_COUNT,
      surahs: QURAN_SURAH_COUNT,
      tafsirLocales: QURAN_TAFSIR_LOCALES,
      verses: QURAN_VERSE_COUNT,
    }).toEqual({
      chunkSize: 6,
      chunks: 1085,
      locales: ["en", "id"],
      rows: 1427,
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
});
