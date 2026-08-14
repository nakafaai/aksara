import type { BinaryLike } from "node:crypto";

import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeQuranSnapshot,
  makeQuranSnapshot,
  verifyQuranSnapshotHash,
} from "#contracts/quran/snapshot/hash";
import { QuranSnapshotFactsSchema } from "#contracts/quran/snapshot/spec";

const failures = vi.hoisted(() => ({ hash: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Creates a real hash whose update call supports deterministic failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Intercepts update while preserving every other real hash method. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                failures.hash &&
                String(data).startsWith(
                  "nakafa.aksara.localized-quran-snapshot\n"
                )
              ) {
                throw new TypeError("injected Quran snapshot hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const facts = Schema.decodeUnknownSync(QuranSnapshotFactsSchema)({
  activeAppLocales: ["en", "id"],
  attributionCount: 1,
  chunkCount: 1085,
  projectionCount: 1428,
  projectionDigest: digest,
  provenanceDigest: digest,
  provenanceStatus: "blocked",
  runtimeCount: 1200,
  runtimeDigest: digest,
  searchCount: 228,
  searchDigest: digest,
  sourceBytes: 11_506_941,
  sourceDigest: digest,
  sourceFileCount: 118,
  surahCount: 114,
  tafsirLocales: ["id"],
  verseCount: 6236,
});

describe("Quran snapshot hashing", () => {
  it("creates and verifies one reproducible snapshot identity", async () => {
    const first = await Effect.runPromise(makeQuranSnapshot(facts));
    const second = await Effect.runPromise(makeQuranSnapshot(facts));
    expect(JSON.parse(canonicalizeQuranSnapshot(facts))).toMatchObject(facts);
    expect(first.snapshotId).toBe(second.snapshotId);
    await expect(
      Effect.runPromise(verifyQuranSnapshotHash(first))
    ).resolves.toBe(first.snapshotId);
  });

  it("maps Node hashing failures to the typed contract error", async () => {
    failures.hash = true;
    const error = await Effect.runPromise(
      makeQuranSnapshot(facts).pipe(Effect.flip)
    );
    failures.hash = false;
    expect(error._tag).toBe("QuranSnapshotHashError");
  });
});
