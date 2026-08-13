import { Effect } from "effect";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import {
  QuranChunkRowSchema,
  type QuranRowPayload,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
} from "#contracts/quran/snapshot/row";
import { bindQuranRow } from "#contracts/quran/snapshot/row-hash";
import {
  QuranAttributionRowSchema,
  QuranSourceAttributionSchema,
  quranSourceIds,
} from "#contracts/quran/source";
import { QURAN_SURAH_COUNT, QuranSurahRowSchema } from "#contracts/quran/spec";

const sourceHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const snapshotId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const english = AppLocaleSchema.make("en");
const indonesian = AppLocaleSchema.make("id");
const activeAppLocales = ActiveAppLocaleListSchema.make([english, indonesian]);

/** Builds one technical verse at exact local and global positions. */
export function quranVerse(inSurah: number, inQuran: number) {
  return QuranRuntimeVerseSchema.make({
    meta: {
      hizbQuarter: 1,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: null,
    },
    number: { inQuran, inSurah },
    tafsir: [
      {
        appLocale: "id",
        footnotes: null,
        text: "Tafsir teknis",
      },
    ],
    text: { arabic: "نص" },
    translations: [
      {
        appLocale: english,
        value: { footnotes: "", text: "Technical text" },
      },
      {
        appLocale: indonesian,
        value: { footnotes: "", text: "Teks teknis" },
      },
    ],
  });
}

/** Builds the complete technical attribution row in canonical source order. */
export function quranAttribution() {
  const sources = quranSourceIds(activeAppLocales).map((id) =>
    QuranSourceAttributionSchema.make({
      artifact: {
        byteCount: 1,
        digest: sourceHash,
        fileCount: id === "quranenc-tafsir" ? QURAN_SURAH_COUNT : 1,
      },
      copy: [
        {
          appLocale: activeAppLocales[0],
          notice: `Technical ${activeAppLocales[0]} notice for ${id}.`,
          title: `Technical ${activeAppLocales[0]} source ${id}.`,
        },
        ...activeAppLocales.slice(1).map((appLocale) => ({
          appLocale,
          notice: `Technical ${appLocale} notice for ${id}.`,
          title: `Technical ${appLocale} source ${id}.`,
        })),
      ],
      id,
      publisher: `Technical publisher for ${id}.`,
      retrievedAt: "2026-07-24T17:57:50Z",
      sourceUrl: `https://example.test/source/${id}`,
      terms: {
        artifact: {
          byteCount: 1,
          digest: sourceHash,
          fileCount: 1,
        },
        url: `https://example.test/terms/${id}`,
      },
      updateUrl: `https://example.test/update/${id}`,
      version: "test-source",
    })
  );
  const [first, ...rest] = sources;
  if (first === undefined) {
    throw new Error("Expected technical Quran source identities.");
  }
  return QuranAttributionRowSchema.make({
    activeAppLocales,
    kind: "quran-attribution",
    sources: [first, ...rest],
  });
}

/** Returns technical counts matching the fixed Quran totals. */
function quranVerseCounts() {
  return Array.from({ length: QURAN_SURAH_COUNT }, (_, index) => {
    const chunks = index === QURAN_SURAH_COUNT - 1 ? 68 : 9;
    if (index < 54) {
      return chunks * 6 - 5;
    }
    if (index === 54) {
      return chunks * 6 - 4;
    }
    return chunks * 6;
  });
}

/** Builds a complete technical Quran projection without authored claims. */
export function quranTestPayloads() {
  const rows: QuranRowPayload[] = [quranAttribution()];
  let inQuran = 1;
  for (const [index, numberOfVerses] of quranVerseCounts().entries()) {
    const surahNumber = index + 1;
    rows.push(
      QuranSurahRowSchema.make({
        kind: "quran-surah",
        name: {
          arabic: `سورة ${surahNumber}`,
          translation: `Test Surah ${surahNumber}`,
          transliteration: `Test-Surah-${surahNumber}`,
        },
        number: surahNumber,
        numberOfVerses,
        revelation: { order: surahNumber, place: "Meccan" },
      })
    );
    for (let firstVerse = 1; firstVerse <= numberOfVerses; firstVerse += 6) {
      const lastVerse = Math.min(firstVerse + 5, numberOfVerses);
      const verses = Array.from(
        { length: lastVerse - firstVerse + 1 },
        (_, offset) => quranVerse(firstVerse + offset, inQuran + offset)
      );
      const [first, ...rest] = verses;
      if (first === undefined) {
        continue;
      }
      rows.push(
        QuranChunkRowSchema.make({
          firstQuranNumber: inQuran,
          firstVerse,
          kind: "quran-chunk",
          lastVerse,
          surahNumber,
          verses: [first, ...rest],
        })
      );
      inQuran += verses.length;
    }
  }
  for (
    let surahNumber = 1;
    surahNumber <= QURAN_SURAH_COUNT;
    surahNumber += 1
  ) {
    for (const appLocale of activeAppLocales) {
      rows.push(
        QuranSearchRowSchema.make({
          appLocale,
          graph: {
            alignmentId: `alignment:quran:quran-surah:${surahNumber}`,
            assetId: `asset:${appLocale}:quran:quran-surah:${surahNumber}`,
            conceptId: `concept:quran:surah:${surahNumber}`,
            learningObjectId: `lo:quran-surah:${surahNumber}`,
            lensId: "lens:quran",
          },
          kind: "quran-search",
          route: PublicPathSchema.make(`quran/${surahNumber}`),
          surahNumber,
          text: "Test-only Quran search text",
          title: "Test-only Quran title",
        })
      );
    }
  }
  return rows;
}

/** Returns one small current payload for each Quran row kind. */
export function quranRepresentativePayloads() {
  return [
    quranAttribution(),
    QuranSurahRowSchema.make({
      kind: "quran-surah",
      name: {
        arabic: "سورة 1",
        translation: "Test Surah 1",
        transliteration: "Test-Surah-1",
      },
      number: 1,
      numberOfVerses: 2,
      revelation: { order: 1, place: "Meccan" },
    }),
    QuranChunkRowSchema.make({
      firstQuranNumber: 1,
      firstVerse: 1,
      kind: "quran-chunk",
      lastVerse: 2,
      surahNumber: 1,
      verses: [quranVerse(1, 1), quranVerse(2, 2)],
    }),
    QuranSearchRowSchema.make({
      appLocale: english,
      graph: {
        alignmentId: "alignment:quran:quran-surah:1",
        assetId: "asset:en:quran:quran-surah:1",
        conceptId: "concept:quran:surah:1",
        learningObjectId: "lo:quran-surah:1",
        lensId: "lens:quran",
      },
      kind: "quran-search",
      route: PublicPathSchema.make("quran/1"),
      surahNumber: 1,
      text: "Test-only Quran search text",
      title: "Test-only Quran title",
    }),
  ] satisfies readonly QuranRowPayload[];
}

/** Binds the complete technical Quran projection to current rows. */
export const makeQuranTestRecords = Effect.fn(
  "AksaraContracts.makeQuranTestRecords"
)(function* () {
  return yield* Effect.forEach(quranTestPayloads(), (payload) =>
    bindQuranRow(snapshotId, payload)
  );
});
