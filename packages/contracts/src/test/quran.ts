import { Effect, Stream } from "effect";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { digestQuranRows } from "#contracts/quran/row-digest";
import { bindQuranRow } from "#contracts/quran/row-hash";
import { hashQuranSnapshot } from "#contracts/quran/snapshot/hash";
import {
  QURAN_SNAPSHOT_FORMAT,
  type QuranSnapshotInput,
  QuranSnapshotManifestSchema,
} from "#contracts/quran/snapshot/spec";
import {
  QURAN_SOURCE_IDS,
  QuranAttributionRowSchema,
  QuranSourceAttributionSchema,
} from "#contracts/quran/source";
import {
  QURAN_LOCALES,
  QuranChunkRowSchema,
  type QuranRowPayload,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
  QuranSurahRowSchema,
} from "#contracts/quran/spec";

const sourceHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

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
    tafsir: { id: { footnotes: null, text: "Tafsir teknis" } },
    text: { arabic: "نص" },
    translation: {
      en: { footnotes: "", text: "Technical text" },
      id: { footnotes: "", text: "Teks teknis" },
    },
  });
}

/** Builds the complete technical attribution row in canonical source order. */
export function quranAttribution() {
  const sources = QURAN_SOURCE_IDS.map((id) =>
    QuranSourceAttributionSchema.make({
      artifact: {
        byteCount: 1,
        digest: sourceHash,
        fileCount: 1,
      },
      id,
      notice: `Technical notice for ${id}.`,
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
      title: `Technical source ${id}.`,
      updateUrl: `https://example.test/update/${id}`,
      version: "test-v1",
    })
  );
  const [first, ...rest] = sources;
  if (!first) {
    throw new Error("Expected technical Quran source identities.");
  }
  return QuranAttributionRowSchema.make({
    kind: "quran-attribution",
    sources: [first, ...rest],
  });
}

/** Returns technical counts matching all fixed Quran snapshot totals. */
function quranVerseCounts() {
  return Array.from({ length: 114 }, (_, index) => {
    const chunks = index === 113 ? 68 : 9;
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
  const rows: QuranRowPayload[] = [];
  rows.push(quranAttribution());
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
  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    for (const locale of QURAN_LOCALES) {
      rows.push(
        QuranSearchRowSchema.make({
          graph: {
            alignmentId: `alignment:quran:quran-surah:${surahNumber}`,
            assetId: `asset:${locale}:quran:quran-surah:${surahNumber}`,
            conceptId: `concept:quran:surah:${surahNumber}`,
            learningObjectId: `lo:quran-surah:${surahNumber}`,
            lensId: "lens:quran",
          },
          kind: "quran-search",
          locale,
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

/** Prepares a complete technical Quran manifest and bound records. */
export const makeQuranTestData = Effect.fn("AksaraContracts.makeQuranTestData")(
  function* () {
    const payloads = quranTestPayloads();
    const unbound = yield* Effect.forEach(payloads, (payload) =>
      bindQuranRow(sourceHash, payload)
    );
    const summary = yield* digestQuranRows(Stream.fromIterable(unbound));
    const identity = {
      attributionCount: 1,
      chunkCount: 1085,
      format: QURAN_SNAPSHOT_FORMAT,
      locales: ["en", "id"],
      projectionCount: summary.projectionCount,
      projectionDigest: summary.projectionDigest,
      provenanceDigest: sourceHash,
      provenanceStatus: "blocked",
      runtimeCount: summary.runtimeCount,
      runtimeDigest: summary.runtimeDigest,
      searchCount: summary.searchCount,
      searchDigest: summary.searchDigest,
      sourceBytes: 11_506_941,
      sourceDigest: sourceHash,
      sourceFileCount: 118,
      surahCount: 114,
      tafsirLocales: ["id"],
      verseCount: 6236,
    } satisfies QuranSnapshotInput;
    const snapshotId = yield* hashQuranSnapshot(identity);
    const manifest = QuranSnapshotManifestSchema.make({
      ...identity,
      snapshotId,
    });
    const records = yield* Effect.forEach(payloads, (payload) =>
      bindQuranRow(snapshotId, payload)
    );
    return { manifest, records };
  }
);
