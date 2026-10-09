import { expect, layer } from "@effect/vitest";
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
import { Array as Arr, Effect, Option, Schema, Stream } from "effect";
import { streamQuranRows } from "#corpus/quran/projection";
import {
  quranTestSourcesLayer,
  testQuranRegistry,
} from "#corpus/test/quran/sources";

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

/** Finds the first search row of one locale, or undefined when that locale has none. */
function findLocaleSearch(rows: readonly QuranSearchRow[], appLocale: string) {
  return Option.getOrUndefined(
    Arr.findFirst(rows, (row) => row.appLocale === appLocale)
  );
}

layer(quranTestSourcesLayer)("Quran projection", (it) => {
  it.effect(
    "emits the complete bounded runtime and locale search snapshot",
    () =>
      Effect.gen(function* () {
        const source = yield* testQuranRegistry;
        const rows = yield* Stream.runCollect(streamQuranRows(source));
        const surahs = Arr.filter(rows, ({ kind }) => kind === "quran-surah");
        const attributions = Arr.filter(
          rows,
          ({ kind }) => kind === "quran-attribution"
        );
        const chunks = Arr.filter(rows, isChunk);
        const searches = Arr.filter(rows, isSearch);
        const verseCount = Arr.reduce(
          chunks,
          0,
          (count, { verses }) => count + verses.length
        );
        const firstChunks = Arr.take(chunks, 2);
        const firstSearches = Arr.take(searches, 2);

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
        const openingSearches = Arr.filter(
          searches,
          ({ surahNumber }) => surahNumber === 1
        );
        expect(findLocaleSearch(openingSearches, "en")?.text).toContain(
          "The Opening"
        );
        expect(findLocaleSearch(openingSearches, "id")?.text).toContain(
          "Pembuka"
        );
        expect(findLocaleSearch(openingSearches, "de")?.text).toContain(
          "Die Eröffnende"
        );
        expect(
          Arr.every(
            Arr.filter(openingSearches, ({ appLocale }) => appLocale !== "en"),
            ({ text }) => !text.includes("The Opening")
          )
        ).toBe(true);
        expect(
          Arr.every(
            chunks,
            ({ verses }) =>
              verses.length <= QURAN_CHUNK_SIZE &&
              Arr.every(verses, ({ tafsir }) => {
                const [indonesian] = tafsir;
                return (
                  indonesian?.appLocale === "id" &&
                  typeof indonesian.text === "string"
                );
              })
          )
        ).toBe(true);
      }),
    30_000
  );

  it.effect(
    "derives stable graph identities with locale-specific assets",
    () =>
      Effect.gen(function* () {
        const source = yield* testQuranRegistry;
        const searches = yield* streamQuranRows(source).pipe(
          Stream.filter(isSearch),
          Stream.take(2),
          Stream.runCollect
        );
        const [english, indonesian] = searches;
        if (!(english && indonesian)) {
          return yield* Effect.die("Expected both Quran search locale rows.");
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
      }),
    30_000
  );

  it.effect(
    "projects active German search and runtime rows",
    () =>
      Effect.gen(function* () {
        const source = yield* testQuranRegistry;
        const rows = yield* streamQuranRows(source, ACTIVE_APP_LOCALES).pipe(
          Stream.runCollect
        );
        const attribution = Option.getOrUndefined(
          Arr.findFirst(rows, ({ kind }) => kind === "quran-attribution")
        );
        const firstChunk = Option.getOrUndefined(Arr.findFirst(rows, isChunk));
        const searches = Arr.filter(rows, isSearch);

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
        expect(findLocaleSearch(searches, "de")).toMatchObject({
          graph: { assetId: "asset:de:quran:quran-surah:1" },
          route: "quran/1",
        });
      }),
    30_000
  );

  it.effect(
    "omits Indonesian Tafsir when it is outside the selected locale policy",
    () =>
      Effect.gen(function* () {
        const source = yield* testQuranRegistry;
        const germanOnly = yield* Schema.decodeEffect(
          ActiveAppLocaleListSchema
        )(["de"]);
        const [chunk] = yield* streamQuranRows(source, germanOnly).pipe(
          Stream.filter(isChunk),
          Stream.take(1),
          Stream.runCollect
        );

        expect(chunk?.verses[0]?.tafsir).toEqual([]);
      }),
    30_000
  );

  it.effect(
    "preserves non-null Tafsir footnotes in Indonesian search text",
    () =>
      Effect.gen(function* () {
        const source = yield* testQuranRegistry;
        const [quranSource] = yield* source.pipe(
          Stream.take(1),
          Stream.runCollect
        );
        const firstVerse = quranSource?.verses[0];
        if (!(quranSource && firstVerse)) {
          return yield* Effect.die("Expected one reviewed Quran verse.");
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
            ...Arr.drop(quranSource.verses, 1),
          ],
        };
        const searches = yield* streamQuranRows(Stream.succeed(surah)).pipe(
          Stream.filter(isSearch),
          Stream.runCollect
        );

        expect(findLocaleSearch(searches, "id")?.text).toContain(
          "Catatan tafsir."
        );
      })
  );
});
