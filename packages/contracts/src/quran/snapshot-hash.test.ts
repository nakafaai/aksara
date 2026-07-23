import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "#contracts/quran/snapshot";
import {
  canonicalizeQuranSigningInput,
  canonicalizeQuranSnapshotIdentity,
  canonicalizeQuranSnapshotManifest,
  hashQuranSnapshot,
  hashQuranSnapshotManifest,
} from "#contracts/quran/snapshot-hash";

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
    chunkCount: 1085,
    format: QURAN_SNAPSHOT_FORMAT,
    locales: ["en", "id"],
    projectionCount: 1427,
    projectionDigest: firstHash,
    provenanceDigest: firstHash,
    provenanceStatus: "blocked",
    runtimeCount: 1199,
    runtimeDigest: firstHash,
    searchCount: 228,
    searchDigest: firstHash,
    snapshotId: secondHash,
    sourceBytes: 19_376_634,
    sourceDigest: firstHash,
    surahCount: 114,
    tafsirLocales: ["id"],
    verseCount: 6236,
  });
}

describe("Quran snapshot hashing", () => {
  it("hashes canonical snapshot identities, manifests, and signatures", async () => {
    const value = manifest();
    const { snapshotId: _snapshotId, ...identity } = value;
    const snapshotId = await Effect.runPromise(hashQuranSnapshot(identity));
    const manifestHash = await Effect.runPromise(
      hashQuranSnapshotManifest(value)
    );

    expect(canonicalizeQuranSnapshotIdentity(identity)).toBe(
      JSON.stringify(identity)
    );
    expect(canonicalizeQuranSnapshotManifest(value)).toBe(
      JSON.stringify(value)
    );
    expect(canonicalizeQuranSigningInput(manifestHash, value)).toContain(
      manifestHash
    );
    expect(snapshotId).not.toBe(manifestHash);
  });

  it("maps snapshot and manifest hashing failures", async () => {
    const value = manifest();
    const { snapshotId: _snapshotId, ...identity } = value;
    failures.domain = "nakafa.aksara.quran-snapshot.v1";
    const snapshotError = await Effect.runPromise(
      hashQuranSnapshot(identity).pipe(Effect.flip)
    );
    failures.domain = "nakafa.aksara.quran-manifest.v1";
    const manifestError = await Effect.runPromise(
      hashQuranSnapshotManifest(value).pipe(Effect.flip)
    );
    failures.domain = null;

    expect([snapshotError.scope, manifestError.scope]).toEqual([
      "snapshot",
      "manifest",
    ]);
  });
});
