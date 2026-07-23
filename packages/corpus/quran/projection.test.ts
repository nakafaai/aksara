import {
  QURAN_CHUNK_COUNT,
  QURAN_ROW_COUNT,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
  type QuranChunkRow,
  type QuranRowPayload,
  type QuranSearchRow,
} from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { streamQuranRows } from "#corpus/quran/projection";

/** Narrows one structured snapshot row to a runtime verse chunk. */
function isChunk(row: QuranRowPayload): row is QuranChunkRow {
  return row.kind === "quran-chunk";
}

/** Narrows one structured snapshot row to a locale-specific search row. */
function isSearch(row: QuranRowPayload): row is QuranSearchRow {
  return row.kind === "quran-search";
}

describe("Quran projection", () => {
  it("emits the complete bounded runtime and locale search snapshot", async () => {
    const rows = Chunk.toReadonlyArray(
      await Effect.runPromise(Stream.runCollect(streamQuranRows()))
    );
    const surahs = rows.filter(({ kind }) => kind === "quran-surah");
    const chunks = rows.filter(isChunk);
    const searches = rows.filter(isSearch);
    const verseCount = chunks.reduce(
      (count, { verses }) => count + verses.length,
      0
    );
    const firstChunks = chunks.slice(0, 2);
    const firstSearches = searches.slice(0, 2);

    expect(rows).toHaveLength(QURAN_ROW_COUNT);
    expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
    expect(chunks).toHaveLength(QURAN_CHUNK_COUNT);
    expect(searches).toHaveLength(QURAN_SEARCH_COUNT);
    expect(verseCount).toBe(QURAN_VERSE_COUNT);
    expect(firstChunks).toMatchObject([
      { firstVerse: 1, lastVerse: 6, surahNumber: 1 },
      { firstVerse: 7, lastVerse: 7, surahNumber: 1 },
    ]);
    expect(firstSearches).toMatchObject([
      {
        description: "The Opening",
        locale: "en",
        route: "quran/1",
        title: "1. Al-Faatiha",
      },
      {
        description: "Pembukaan",
        locale: "id",
        route: "quran/1",
        title: "1. Al-Fatihah",
      },
    ]);
    expect(
      chunks.every(
        ({ verses }) =>
          verses.length <= 6 &&
          verses.every(
            ({ tafsir }) =>
              Object.keys(tafsir.id).length === 1 &&
              typeof tafsir.id.short === "string"
          )
      )
    ).toBe(true);
  });

  it("derives stable graph identities with locale-specific assets", async () => {
    const searches = Chunk.toReadonlyArray(
      await Effect.runPromise(
        streamQuranRows().pipe(
          Stream.filter(isSearch),
          Stream.take(2),
          Stream.runCollect
        )
      )
    );
    const [english, indonesian] = searches;
    if (!(english && indonesian)) {
      throw new Error("Expected both Quran search locale rows.");
    }

    expect(english.graph).toEqual({
      alignmentId: "alignment:quran:quran-surah:1",
      assetId: "asset:en:quran:quran-surah:1",
      conceptId: "concept:quran:surah:1",
      learningObjectId: "lo:quran-surah:1",
      lensId: "lens:quran",
    });
    expect(indonesian.graph).toEqual({
      ...english.graph,
      assetId: "asset:id:quran:quran-surah:1",
    });
  });
});
