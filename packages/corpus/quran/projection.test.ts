import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import type { QuranRowPayload } from "@nakafa/aksara-contracts/quran/snapshot/row";
import {
  QURAN_CHUNK_SIZE,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema, Stream } from "effect";
import { streamQuranRows } from "#corpus/quran/projection";
import { testQuranRegistry } from "#corpus/test/quran";

/** Replays the verified Quran fixture for each projection assertion. */
const source = testQuranRegistry;

type QuranChunkRow = Extract<QuranRowPayload, { readonly kind: "quran-chunk" }>;
type QuranSearchRow = Extract<
  QuranRowPayload,
  { readonly kind: "quran-search" }
>;

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
    const rows = await Effect.runPromise(
      Stream.runCollect(streamQuranRows(source))
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
    expect(attributions[0]).toMatchObject({
      activeAppLocales: ["en", "id", "de"],
      sources: expect.arrayContaining([
        expect.objectContaining({
          copy: [
            expect.objectContaining({
              appLocale: "en",
              title: "Tanzil Quran Text (Uthmani)",
            }),
            expect.objectContaining({
              appLocale: "id",
              title: "Teks Al-Qur'an Tanzil (Utsmani)",
            }),
            expect.objectContaining({
              appLocale: "de",
              title: "Tanzil-Qurantext in uthmanischer Schrift",
            }),
          ],
          id: "tanzil-text",
        }),
      ]),
      tafsirAccess: [
        {
          appLocale: "en",
          kind: "external",
          sourceId: "mokhtasar-english",
        },
        {
          appLocale: "id",
          kind: "embedded",
          sourceId: "quranenc-tafsir",
        },
        {
          appLocale: "de",
          kind: "external",
          sourceId: "mokhtasar-german",
        },
      ],
    });
    expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
    expect(searches).toHaveLength(
      QURAN_SURAH_COUNT * ACTIVE_APP_LOCALES.length
    );
    expect(verseCount).toBe(QURAN_VERSE_COUNT);
    expect(firstChunks).toMatchObject([
      { firstVerse: 1, lastVerse: 6, surahNumber: 1 },
      { firstVerse: 7, lastVerse: 7, surahNumber: 1 },
    ]);
    expect(firstSearches).toMatchObject([
      {
        appLocale: "en",
        route: "quran/1",
        title: "1. Al-Faatiha",
      },
      {
        appLocale: "id",
        route: "quran/1",
        title: "1. Al-Faatiha",
      },
    ]);
    const openingSearches = searches.filter(
      ({ surahNumber }) => surahNumber === 1
    );
    expect(
      openingSearches.find(({ appLocale }) => appLocale === "en")?.text
    ).toContain("The Opening");
    expect(
      openingSearches
        .filter(({ appLocale }) => appLocale !== "en")
        .every(({ text }) => !text.includes("The Opening"))
    ).toBe(true);
    expect(
      chunks.every(
        ({ verses }) =>
          verses.length <= QURAN_CHUNK_SIZE &&
          verses.every(({ tafsir }) => {
            const [indonesian] = tafsir;
            return (
              indonesian?.appLocale === "id" &&
              typeof indonesian.text === "string"
            );
          })
      )
    ).toBe(true);
  }, 30_000);

  it("derives stable graph identities with locale-specific assets", async () => {
    const searches = await Effect.runPromise(
      streamQuranRows(source).pipe(
        Stream.filter(isSearch),
        Stream.take(2),
        Stream.runCollect
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
  }, 30_000);

  it("projects active German search and runtime rows", async () => {
    const rows = await Effect.runPromise(
      streamQuranRows(source, ACTIVE_APP_LOCALES).pipe(Stream.runCollect)
    );
    const attribution = rows.find(({ kind }) => kind === "quran-attribution");
    const firstChunk = rows.find(isChunk);
    const searches = rows.filter(isSearch);

    expect(attribution).toMatchObject({
      activeAppLocales: ["en", "id", "de"],
      sources: expect.arrayContaining([
        expect.objectContaining({ id: "quranenc-german" }),
      ]),
      tafsirAccess: expect.arrayContaining([
        expect.objectContaining({ appLocale: "de", kind: "external" }),
      ]),
    });
    expect(firstChunk?.verses[0]?.translations).toEqual(
      expect.arrayContaining([
        {
          appLocale: "de",
          value: {
            footnotes: "",
            text: "Im Namen Allahs, des Allerbarmers, des Barmherzigen.",
          },
        },
      ])
    );
    expect(searches).toHaveLength(QURAN_SURAH_COUNT * 3);
    expect(searches.find(({ appLocale }) => appLocale === "de")).toMatchObject({
      graph: { assetId: "asset:de:quran:quran-surah:1" },
      route: "quran/1",
    });
  }, 30_000);

  it("omits Indonesian Tafsir when it is outside the selected locale policy", async () => {
    const germanOnly = Schema.decodeSync(ActiveAppLocaleListSchema)(["de"]);
    const [chunk] = await Effect.runPromise(
      streamQuranRows(source, germanOnly).pipe(
        Stream.filter(isChunk),
        Stream.take(1),
        Stream.runCollect
      )
    );

    expect(chunk?.verses[0]?.tafsir).toEqual([]);
  }, 30_000);

  it("preserves non-null Tafsir footnotes in Indonesian search text", async () => {
    const [quranSource] = await Effect.runPromise(
      testQuranRegistry.pipe(Stream.take(1), Stream.runCollect)
    );
    const firstVerse = quranSource?.verses[0];
    if (!(quranSource && firstVerse)) {
      throw new Error("Expected one reviewed Quran verse.");
    }
    const surah = {
      ...quranSource,
      verses: [
        {
          ...firstVerse,
          tafsir: {
            id: { ...firstVerse.tafsir.id, footnotes: "Catatan tafsir." },
          },
        },
        ...quranSource.verses.slice(1),
      ],
    };
    const searches = await Effect.runPromise(
      streamQuranRows(Stream.succeed(surah)).pipe(
        Stream.filter(isSearch),
        Stream.runCollect
      )
    );

    expect(
      searches.find(({ appLocale }) => appLocale === "id")?.text
    ).toContain("Catatan tafsir.");
  });
});
