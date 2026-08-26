import { Effect } from "effect";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
  makeAppLocale,
} from "#contracts/locale";
import {
  QuranChunkRowSchema,
  type QuranRowPayload,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
} from "#contracts/quran/snapshot/row";
import { bindQuranRow } from "#contracts/quran/snapshot/row/hash";
import {
  QuranAttributionRowSchema,
  QuranEmbeddedSourceAttributionSchema,
  QuranExternalSourceAttributionSchema,
  QuranTafsirAccessSchema,
  quranSourceIds,
} from "#contracts/quran/source";
import { QURAN_SURAH_COUNT, QuranSurahRowSchema } from "#contracts/quran/spec";

const sourceHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const snapshotId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const english = makeAppLocale(ENGLISH_APP_LOCALE_CODE);
const indonesian = makeAppLocale(INDONESIAN_APP_LOCALE_CODE);
const german = makeAppLocale(GERMAN_APP_LOCALE_CODE);

/** Builds one honest technical source attribution for signed-row tests. */
function quranSourceAttribution(id: ReturnType<typeof quranSourceIds>[number]) {
  const common = {
    copy: [
      {
        appLocale: ACTIVE_APP_LOCALES[0],
        notice: `Technical ${ACTIVE_APP_LOCALES[0]} notice for ${id}.`,
        title: `Technical ${ACTIVE_APP_LOCALES[0]} source ${id}.`,
      },
      ...ACTIVE_APP_LOCALES.slice(1).map((appLocale) => ({
        appLocale,
        notice: `Technical ${appLocale} notice for ${id}.`,
        title: `Technical ${appLocale} source ${id}.`,
      })),
    ],
    publisher: `Technical publisher for ${id}.`,
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.test/source/${id}`,
    updateUrl: `https://example.test/update/${id}`,
    version: "test-source",
  } as const;
  if (id === "mokhtasar-english" || id === "mokhtasar-german") {
    return QuranExternalSourceAttributionSchema.make({
      ...common,
      id,
      kind: "external",
      terms: {
        access: "link-only",
        url: `https://example.test/terms/${id}`,
      },
    });
  }
  return QuranEmbeddedSourceAttributionSchema.make({
    ...common,
    artifact: {
      byteCount: 1,
      digest: sourceHash,
      fileCount: id === "quranenc-tafsir" ? QURAN_SURAH_COUNT : 1,
    },
    id,
    kind: "embedded",
    terms: {
      artifact: {
        byteCount: 1,
        digest: sourceHash,
        fileCount: 1,
      },
      url: `https://example.test/terms/${id}`,
    },
  });
}

/** Builds complete test-only Tafsir access in canonical locale order. */
function quranTafsirAccess() {
  return [
    QuranTafsirAccessSchema.make({
      appLocale: english,
      kind: "external",
      notice: "Technical English external Tafsir notice.",
      sourceId: "mokhtasar-english",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: indonesian,
      kind: "embedded",
      notice: "Catatan teknis tafsir Indonesia.",
      sourceId: "quranenc-tafsir",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: german,
      kind: "external",
      notice: "Technischer deutscher externer Tafsirhinweis.",
      sourceId: "mokhtasar-german",
    }),
  ] as const;
}

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
      {
        appLocale: german,
        value: { footnotes: "", text: "Technischer Text" },
      },
    ],
  });
}

/** Builds the complete technical attribution row in canonical source order. */
export function quranAttribution() {
  const sources = quranSourceIds(ACTIVE_APP_LOCALES).map(
    quranSourceAttribution
  );
  const [first, ...rest] = sources;
  if (first === undefined) {
    throw new Error("Expected technical Quran source identities.");
  }
  return QuranAttributionRowSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    kind: "quran-attribution",
    sources: [first, ...rest],
    tafsirAccess: quranTafsirAccess(),
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
          meaning: {
            appLocale: english,
            text: `Test Surah ${surahNumber}`,
          },
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
    for (const appLocale of ACTIVE_APP_LOCALES) {
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
        meaning: { appLocale: english, text: "Test Surah 1" },
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
