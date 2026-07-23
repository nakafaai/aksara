import type { BinaryLike } from "node:crypto";

import { Effect, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import {
  bindQuranRow,
  canonicalizeQuranRow,
  digestQuranRows,
  hashQuranRow,
} from "#contracts/quran/row-hash";
import {
  QURAN_LOCALES,
  QuranChunkRowSchema,
  type QuranRowPayload,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
  QuranSurahRowSchema,
} from "#contracts/quran/spec";

const failures = vi.hoisted(
  (): {
    domain: string | null;
    stage: "digest" | "first-update" | "later-update" | null;
  } => ({ domain: null, stage: null })
);
const firstHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into one selected Quran hash domain. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      let domain = "";
      let updates = 0;
      return new Proxy(hash, {
        /** Preserves native binding while intercepting explicit test state. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              const value = String(data);
              if (updates === 0) {
                const delimiter = value.indexOf("\n");
                domain = delimiter === -1 ? value : value.slice(0, delimiter);
              }
              const selected = failures.domain === domain;
              const first = failures.stage === "first-update" && updates === 0;
              const later = failures.stage === "later-update" && updates > 0;
              if (selected && (first || later)) {
                throw new TypeError("injected Quran hash update failure");
              }
              updates += 1;
              target.update(data);
              return receiver;
            };
          }
          if (
            property === "digest" &&
            failures.stage === "digest" &&
            failures.domain === domain
          ) {
            return () => {
              throw new TypeError("injected Quran digest failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Builds one technical verse at an exact local and global position. */
function verse(inSurah: number, inQuran: number) {
  return QuranRuntimeVerseSchema.make({
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
  });
}

/** Returns technical verse counts satisfying every fixed projection count. */
function verseCounts() {
  return Array.from({ length: 114 }, (_, index) => {
    const chunks = index === 113 ? 68 : 9;
    let remainder = 0;
    if (index < 54) {
      remainder = 5;
    } else if (index === 54) {
      remainder = 4;
    }
    return chunks * 6 - remainder;
  });
}

/** Builds one complete deterministic technical projection for digest tests. */
function projection() {
  const rows: QuranRowPayload[] = [];
  let inQuran = 1;
  for (const [index, numberOfVerses] of verseCounts().entries()) {
    const surahNumber = index + 1;
    rows.push(
      QuranSurahRowSchema.make({
        kind: "quran-surah",
        name: {
          long: `Surah ${surahNumber}`,
          short: `S${surahNumber}`,
          translation: { en: "Name", id: "Nama" },
          transliteration: { en: "Name", id: "Nama" },
        },
        number: surahNumber,
        numberOfVerses,
        preBismillah: null,
        revelation: { arab: "وحي", en: "Revelation", id: "Wahyu" },
        sequence: surahNumber,
      })
    );
    for (let firstVerse = 1; firstVerse <= numberOfVerses; firstVerse += 6) {
      const lastVerse = Math.min(firstVerse + 5, numberOfVerses);
      const firstChunkVerse = verse(firstVerse, inQuran);
      const remainingVerses = Array.from(
        { length: lastVerse - firstVerse },
        (_, verseIndex) =>
          verse(firstVerse + verseIndex + 1, inQuran + verseIndex + 1)
      );
      rows.push(
        QuranChunkRowSchema.make({
          firstQuranNumber: inQuran,
          firstVerse,
          kind: "quran-chunk",
          lastVerse,
          surahNumber,
          verses: [firstChunkVerse, ...remainingVerses],
        })
      );
      inQuran += remainingVerses.length + 1;
    }
  }
  for (let surahNumber = 1; surahNumber <= 114; surahNumber += 1) {
    for (const locale of QURAN_LOCALES) {
      rows.push(
        QuranSearchRowSchema.make({
          description: "Description",
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
          text: "Search text",
          title: "Search title",
        })
      );
    }
  }
  return rows;
}

/** Hashes technical payloads into the input accepted by the digest stream. */
function hashedRows(payloads = projection()) {
  return Stream.fromIterable(payloads).pipe(
    Stream.mapEffect((payload) =>
      hashQuranRow(payload).pipe(
        Effect.map((rowHash) => ({ payload, rowHash }))
      )
    )
  );
}

describe("Quran row hashing", () => {
  it("authenticates and digests the complete deterministic row order", async () => {
    const payloads = projection();
    const [first] = payloads;
    if (first === undefined) {
      throw new Error("Expected a complete generated Quran projection.");
    }
    const bound = await Effect.runPromise(bindQuranRow(firstHash, first));
    const summary = await Effect.runPromise(
      digestQuranRows(hashedRows(payloads))
    );

    expect(canonicalizeQuranRow(first)).toBe(JSON.stringify(first));
    expect(bound.payload).toEqual(first);
    expect(summary).toMatchObject({
      projectionCount: 1427,
      runtimeCount: 1199,
      searchCount: 228,
    });
  });

  it("rejects tampered hashes, duplicate order, and incomplete streams", async () => {
    const payloads = projection();
    const [first, second] = payloads;
    if (!(first && second)) {
      throw new Error("Expected at least two generated Quran rows.");
    }
    const firstRow = await Effect.runPromise(
      hashQuranRow(first).pipe(
        Effect.map((rowHash) => ({ payload: first, rowHash }))
      )
    );
    const errors = await Promise.all([
      Effect.runPromise(
        digestQuranRows(
          Stream.make({ payload: first, rowHash: secondHash })
        ).pipe(Effect.flip)
      ),
      Effect.runPromise(
        digestQuranRows(Stream.make(firstRow, firstRow)).pipe(Effect.flip)
      ),
      Effect.runPromise(
        digestQuranRows(hashedRows([second])).pipe(Effect.flip)
      ),
      Effect.runPromise(
        digestQuranRows(Stream.make(firstRow)).pipe(Effect.flip)
      ),
    ]);

    expect(errors.map(({ _tag }) => _tag)).toEqual([
      "QuranRowIntegrityError",
      "QuranRowOrderError",
      "QuranRowOrderError",
      "QuranRowOrderError",
    ]);
  });

  it("maps row hashing, state update, and finalization failures", async () => {
    const payloads = projection();
    const [first] = payloads;
    if (first === undefined) {
      throw new Error("Expected a generated Quran row.");
    }
    failures.domain = "nakafa.aksara.quran-row.v1";
    failures.stage = "first-update";
    const rowError = await Effect.runPromise(
      hashQuranRow(first).pipe(Effect.flip)
    );
    failures.domain = "nakafa.aksara.quran-runtime.v1";
    const stateError = await Effect.runPromise(
      digestQuranRows(Stream.empty).pipe(Effect.flip)
    );
    failures.domain = "nakafa.aksara.quran-projection.v1";
    failures.stage = "later-update";
    const updateError = await Effect.runPromise(
      digestQuranRows(hashedRows([first])).pipe(Effect.flip)
    );
    failures.stage = "digest";
    const digestError = await Effect.runPromise(
      digestQuranRows(hashedRows(payloads)).pipe(Effect.flip)
    );
    failures.domain = null;
    failures.stage = null;

    expect(rowError).toMatchObject({ _tag: "QuranHashError", scope: "row" });
    expect([stateError._tag, updateError._tag, digestError._tag]).toEqual([
      "QuranHashError",
      "QuranHashError",
      "QuranHashError",
    ]);
  });
});
