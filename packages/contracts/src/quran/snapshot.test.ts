import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  changesQuranSnapshot,
  EMPTY_QURAN_PROJECTION_DIGEST,
  hasCoherentQuranReleaseState,
  inheritQuranSnapshot,
  QURAN_SNAPSHOT_FORMAT,
  QuranReleaseStateSchema,
  QuranSnapshotManifestSchema,
  replaceQuranSnapshot,
  restoreQuranSnapshot,
  SignedQuranSnapshotSchema,
} from "#contracts/quran/snapshot";

const firstHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const signature = "A".repeat(86);

/** Builds the complete fixed-count snapshot manifest. */
function manifest() {
  return {
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
  };
}

describe("Quran snapshot", () => {
  it("accepts only the complete fixed projection and signed envelope", () => {
    const decoded = Schema.decodeUnknownSync(QuranSnapshotManifestSchema)(
      manifest()
    );
    const signed = Schema.decodeUnknownSync(SignedQuranSnapshotSchema)({
      keyId: "quran-test",
      manifest: decoded,
      manifestHash: firstHash,
      signature,
    });
    const decode = Schema.decodeUnknownEither(QuranSnapshotManifestSchema);
    const countError = decode({ ...manifest(), surahCount: 113 });
    const projectionError = decode({ ...manifest(), runtimeCount: 1198 });
    if (countError._tag === "Right" || projectionError._tag === "Right") {
      throw new Error("Expected incomplete Quran snapshot counts to fail.");
    }

    expect(signed.manifest.snapshotId).toBe(secondHash);
    expect(String(countError.left)).toContain(
      "Expected the complete reviewed Quran snapshot counts."
    );
    expect(String(projectionError.left)).toContain(
      "Expected Quran runtime and search counts to cover every projection."
    );
  });

  it("distinguishes inherited and complete replacement release states", () => {
    const snapshot = Schema.decodeUnknownSync(QuranSnapshotManifestSchema)(
      manifest()
    );
    const inherited = inheritQuranSnapshot(firstHash);
    const changed = replaceQuranSnapshot(firstHash, snapshot);
    const restored = restoreQuranSnapshot(secondHash, firstHash);
    const decode = Schema.decodeUnknownEither(QuranReleaseStateSchema);
    const invalid = decode({ ...inherited, projectionCount: 1 });
    if (invalid._tag === "Right") {
      throw new Error("Expected an incoherent Quran release to fail.");
    }

    expect(changesQuranSnapshot(inherited)).toBe(false);
    expect(hasCoherentQuranReleaseState(inherited)).toBe(true);
    expect(changesQuranSnapshot(changed)).toBe(true);
    expect(hasCoherentQuranReleaseState(changed)).toBe(true);
    expect(hasCoherentQuranReleaseState(restored)).toBe(true);
    expect(String(invalid.left)).toContain(
      "Expected a coherent Quran snapshot release transition."
    );
    expect(
      hasCoherentQuranReleaseState({ ...inherited, projectionCount: 1 })
    ).toBe(false);
    expect(
      hasCoherentQuranReleaseState({ ...changed, resultSnapshotId: null })
    ).toBe(false);
    expect(
      hasCoherentQuranReleaseState({ ...changed, projectionCount: 0 })
    ).toBe(false);
    expect(
      hasCoherentQuranReleaseState({
        ...restored,
        baseSnapshotId: firstHash,
      })
    ).toBe(false);
    expect(
      hasCoherentQuranReleaseState({
        ...restored,
        projectionDigest: secondHash,
      })
    ).toBe(false);
    expect(inherited.projectionDigest).toBe(EMPTY_QURAN_PROJECTION_DIGEST);
  });
});
