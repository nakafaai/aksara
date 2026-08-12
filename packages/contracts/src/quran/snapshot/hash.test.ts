import type { BinaryLike } from "node:crypto";

import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeQuranSnapshotIdentity,
  canonicalizeQuranSnapshotV3Identity,
  hashQuranSnapshot,
  hashQuranSnapshotV3,
} from "#contracts/quran/snapshot/hash";
import {
  QURAN_SNAPSHOT_FORMAT,
  QURAN_SNAPSHOT_V3_FORMAT,
  QuranSnapshotManifestSchema,
  QuranSnapshotV3InputSchema,
} from "#contracts/quran/snapshot/spec";
import { reverseObjectKeys } from "#contracts/test/order";

const failures = vi.hoisted((): { domain: string | null } => ({
  domain: null,
}));
const firstHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into one selected snapshot domain. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting explicit test state. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).startsWith(`${failures.domain}\n`)) {
                throw new TypeError("injected snapshot hash failure");
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

/** Builds one complete fixed-count snapshot manifest. */
function manifest() {
  return QuranSnapshotManifestSchema.make({
    attributionCount: 1,
    chunkCount: 1085,
    format: QURAN_SNAPSHOT_FORMAT,
    locales: ["en", "id"],
    projectionCount: 1428,
    projectionDigest: firstHash,
    provenanceDigest: firstHash,
    provenanceStatus: "blocked",
    runtimeCount: 1200,
    runtimeDigest: firstHash,
    searchCount: 228,
    searchDigest: firstHash,
    snapshotId: secondHash,
    sourceBytes: 11_506_941,
    sourceDigest: firstHash,
    sourceFileCount: 118,
    surahCount: 114,
    tafsirLocales: ["id"],
    verseCount: 6236,
  });
}

/** Builds one complete current Quran snapshot input. */
function manifestV3() {
  const {
    locales: _locales,
    snapshotId: _snapshotId,
    ...historical
  } = manifest();
  return Schema.decodeUnknownSync(QuranSnapshotV3InputSchema)({
    ...historical,
    activeAppLocales: ["en", "id", "de"],
    editorialReviewDigest: firstHash,
    format: QURAN_SNAPSHOT_V3_FORMAT,
    projectionCount: 1542,
    searchCount: 342,
    sourceFileCount: 119,
  });
}

describe("Quran snapshot hashing", () => {
  it("hashes the canonical snapshot identity", async () => {
    const value = manifest();
    const { snapshotId: _snapshotId, ...identity } = value;
    const reordered = reverseObjectKeys(identity);
    const [snapshotId, reorderedSnapshotId] = await Effect.runPromise(
      Effect.all([hashQuranSnapshot(identity), hashQuranSnapshot(reordered)])
    );

    expect(Object.keys(reordered)[0]).toBe("verseCount");
    expect(canonicalizeQuranSnapshotIdentity(identity)).toBe(
      canonicalizeQuranSnapshotIdentity(reordered)
    );
    expect(snapshotId).toBe(reorderedSnapshotId);
    expect(snapshotId).not.toBe(value.snapshotId);
  });

  it("maps snapshot hashing failures", async () => {
    const value = manifest();
    const { snapshotId: _snapshotId, ...identity } = value;
    failures.domain = "nakafa.aksara.quran-snapshot.v2";
    const snapshotError = await Effect.runPromise(
      hashQuranSnapshot(identity).pipe(Effect.flip)
    );
    failures.domain = null;

    expect(snapshotError.scope).toBe("snapshot");
  });

  it("binds active locales and review identity in v3", async () => {
    const value = manifestV3();
    const hash = await Effect.runPromise(hashQuranSnapshotV3(value));
    expect(JSON.parse(canonicalizeQuranSnapshotV3Identity(value))).toEqual(
      value
    );
    expect(hash).not.toBe(
      await Effect.runPromise(
        hashQuranSnapshot(
          (({ snapshotId: _snapshotId, ...identity }) => identity)(manifest())
        )
      )
    );
  });

  it("maps v3 snapshot hashing failures", async () => {
    failures.domain = "nakafa.aksara.quran-snapshot.v3";
    const error = await Effect.runPromise(
      hashQuranSnapshotV3(manifestV3()).pipe(Effect.flip)
    );
    failures.domain = null;

    expect(error.scope).toBe("snapshot");
  });
});
