import { Effect, Stream } from "effect";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { digestQuranRows } from "#contracts/quran/row-digest";
import { bindQuranRow } from "#contracts/quran/row-hash";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "#contracts/quran/snapshot";
import { hashQuranSnapshot } from "#contracts/quran/snapshot-hash";
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
function quranVerse(inSurah: number, inQuran: number) {
  return QuranRuntimeVerseSchema.make({
    audio: {
      primary: "https://example.test/primary.mp3",
      secondary: [
        "https://example.test/secondary.mp3",
        "https://example.test/alternate.mp3",
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
    tafsir: { id: { short: "Tafsir teknis" } },
    text: { arab: "نص", transliteration: { en: "Technical text" } },
    translation: { en: "Technical text", id: "Teks teknis" },
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
  let inQuran = 1;
  for (const [index, numberOfVerses] of quranVerseCounts().entries()) {
    const surahNumber = index + 1;
    rows.push(
      QuranSurahRowSchema.make({
        kind: "quran-surah",
        name: {
          long: `Test Surah ${surahNumber}`,
          short: `S${surahNumber}`,
          translation: { en: "Test name", id: "Nama uji" },
          transliteration: { en: "Test name", id: "Nama uji" },
        },
        number: surahNumber,
        numberOfVerses,
        preBismillah:
          surahNumber === 2
            ? {
                audio: quranVerse(1, inQuran).audio,
                text: quranVerse(1, inQuran).text,
                translation: quranVerse(1, inQuran).translation,
              }
            : null,
        revelation: { arab: "وحي", en: "Test", id: "Uji" },
        sequence: surahNumber,
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
          description: "Test-only Quran description",
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
      sourceBytes: 19_376_634,
      sourceDigest: sourceHash,
      surahCount: 114,
      tafsirLocales: ["id"],
      verseCount: 6236,
    } as const;
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
