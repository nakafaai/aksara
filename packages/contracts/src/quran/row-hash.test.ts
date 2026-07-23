import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  bindQuranRow,
  canonicalizeQuranRow,
  hashQuranRow,
} from "#contracts/quran/row-hash";
import type {
  QuranChunkRow,
  QuranSearchRow,
  QuranSurahRow,
} from "#contracts/quran/spec";
import { reverseObjectKeys } from "#contracts/test/order";
import { quranTestPayloads } from "#contracts/test/quran";

const failures = vi.hoisted(() => ({ rowHash: false }));
const snapshotId = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic failure into the Quran row hash domain. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting the explicit test state. */
        get(target, property) {
          if (property === "update" && failures.rowHash) {
            return (_data: BinaryLike) => {
              throw new TypeError("injected Quran row hash failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Requires the technical projection to contain all three Quran row kinds. */
function representativeRows() {
  const payloads = quranTestPayloads();
  const surah = payloads.find(
    (payload): payload is QuranSurahRow =>
      payload.kind === "quran-surah" && payload.number === 2
  );
  const chunk = payloads.find(
    (payload): payload is QuranChunkRow => payload.kind === "quran-chunk"
  );
  const search = payloads.find(
    (payload): payload is QuranSearchRow => payload.kind === "quran-search"
  );
  if (!(surah && chunk && search)) {
    throw new Error("Expected all technical Quran row kinds.");
  }
  return [surah, chunk, search] as const;
}

afterEach(() => {
  failures.rowHash = false;
});

describe("Quran row hashing", () => {
  it("authenticates and binds one canonical structured row", async () => {
    const [surah] = representativeRows();
    const bound = await Effect.runPromise(bindQuranRow(snapshotId, surah));

    expect(canonicalizeQuranRow(surah)).toBe(JSON.stringify(surah));
    expect(bound).toMatchObject({ payload: surah, snapshotId });
  });

  it("ignores observable insertion order for every row kind", async () => {
    const canonicalRows = representativeRows();
    const reorderedRows = canonicalRows.map(reverseObjectKeys);
    const canonicalHashes = await Effect.runPromise(
      Effect.forEach(canonicalRows, hashQuranRow)
    );
    const reorderedHashes = await Effect.runPromise(
      Effect.forEach(reorderedRows, hashQuranRow)
    );

    expect(reorderedRows.map((row) => JSON.stringify(row))).not.toEqual(
      canonicalRows.map((row) => JSON.stringify(row))
    );
    expect(reorderedRows.map(canonicalizeQuranRow)).toEqual(
      canonicalRows.map(canonicalizeQuranRow)
    );
    expect(reorderedHashes).toEqual(canonicalHashes);
  });

  it("maps Node hashing failures into the typed row error", async () => {
    const [surah] = representativeRows();
    failures.rowHash = true;
    const error = await Effect.runPromise(
      hashQuranRow(surah).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ _tag: "QuranHashError", scope: "row" });
  });
});
