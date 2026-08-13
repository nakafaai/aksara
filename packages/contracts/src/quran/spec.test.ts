import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  QuranChunkRowSchema,
  QuranRuntimeVerseSchema,
} from "#contracts/quran/snapshot/row";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_CHUNK_SIZE,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
  QuranMeaningfulTextSchema,
} from "#contracts/quran/spec";
import { quranVerse } from "#contracts/test/quran";

/** Builds one minimal contiguous Quran chunk for contract tests. */
function chunk() {
  return {
    firstQuranNumber: 1,
    firstVerse: 1,
    kind: "quran-chunk",
    lastVerse: 2,
    surahNumber: 1,
    verses: [quranVerse(1, 1), quranVerse(2, 2)],
  } as const;
}

describe("Quran base contracts", () => {
  it("locks stable corpus counts and accepts contiguous chunks", () => {
    const decoded = Schema.decodeUnknownSync(QuranChunkRowSchema)(chunk());
    expect(decoded.verses).toHaveLength(2);
    expect({
      attributionCount: QURAN_ATTRIBUTION_COUNT,
      chunkSize: QURAN_CHUNK_SIZE,
      surahCount: QURAN_SURAH_COUNT,
      verseCount: QURAN_VERSE_COUNT,
    }).toEqual({
      attributionCount: 1,
      chunkSize: 6,
      surahCount: 114,
      verseCount: 6236,
    });
  });

  it("rejects drifted chunk bounds, oversized chunks, and empty text", () => {
    const drifted = Schema.decodeUnknownEither(QuranChunkRowSchema)({
      ...chunk(),
      lastVerse: 3,
    });
    const oversized = Schema.decodeUnknownEither(QuranChunkRowSchema)({
      ...chunk(),
      lastVerse: 7,
      verses: Array.from({ length: 7 }, (_, index) =>
        quranVerse(index + 1, index + 1)
      ),
    });
    const compatibility = Schema.decodeUnknownEither(QuranRuntimeVerseSchema)(
      { ...quranVerse(1, 1), audio: {} },
      { onExcessProperty: "error" }
    );
    expect(Either.isLeft(drifted)).toBe(true);
    expect(Either.isLeft(oversized)).toBe(true);
    expect(Either.isLeft(compatibility)).toBe(true);
    const emptyText = Schema.decodeUnknownEither(QuranMeaningfulTextSchema)("");
    expect(Either.isLeft(emptyText) ? String(emptyText.left) : "").toContain(
      "Quran text cannot be empty."
    );
  });
});
