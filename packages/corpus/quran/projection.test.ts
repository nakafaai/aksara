import {
  QURAN_CHUNK_SIZE,
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
import { streamQuranRegistry } from "#corpus/quran/registry";

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
    const attributions = rows.filter(
      ({ kind }) => kind === "quran-attribution"
    );
    const chunks = rows.filter(isChunk);
    const searches = rows.filter(isSearch);
    const verseCount = chunks.reduce(
      (count, { verses }) => count + verses.length,
      0
    );
    const firstChunks = chunks.slice(0, 2);
    const firstSearches = searches.slice(0, 2);

    expect(rows).toHaveLength(
      attributions.length + surahs.length + chunks.length + searches.length
    );
    expect(attributions).toHaveLength(1);
    expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
    expect(searches).toHaveLength(QURAN_SEARCH_COUNT);
    expect(verseCount).toBe(QURAN_VERSE_COUNT);
    expect(firstChunks).toMatchObject([
      { firstVerse: 1, lastVerse: 6, surahNumber: 1 },
      { firstVerse: 7, lastVerse: 7, surahNumber: 1 },
    ]);
    expect(firstSearches).toMatchObject([
      {
        locale: "en",
        route: "quran/1",
        title: "1. Al-Faatiha",
      },
      {
        locale: "id",
        route: "quran/1",
        title: "1. Al-Faatiha",
      },
    ]);
    expect(
      chunks.every(
        ({ verses }) =>
          verses.length <= QURAN_CHUNK_SIZE &&
          verses.every(
            ({ tafsir }) =>
              Object.keys(tafsir.id).length === 2 &&
              typeof tafsir.id.text === "string"
          )
      )
    ).toBe(true);
  }, 30_000);

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

  it("preserves non-null Tafsir footnotes in Indonesian search text", async () => {
    const [source] = Chunk.toReadonlyArray(
      await Effect.runPromise(
        streamQuranRegistry().pipe(Stream.take(1), Stream.runCollect)
      )
    );
    const firstVerse = source?.verses[0];
    if (!(source && firstVerse)) {
      throw new Error("Expected one reviewed Quran verse.");
    }
    const surah = {
      ...source,
      verses: [
        {
          ...firstVerse,
          tafsir: {
            id: { ...firstVerse.tafsir.id, footnotes: "Catatan tafsir." },
          },
        },
        ...source.verses.slice(1),
      ],
    };
    const searches = Chunk.toReadonlyArray(
      await Effect.runPromise(
        streamQuranRows(() => Stream.succeed(surah)).pipe(
          Stream.filter(isSearch),
          Stream.runCollect
        )
      )
    );

    expect(searches.find(({ locale }) => locale === "id")?.text).toContain(
      "Catatan tafsir."
    );
  });
});
