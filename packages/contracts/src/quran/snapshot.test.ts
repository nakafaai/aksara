import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotManifestSchema,
} from "#contracts/quran/snapshot";

const firstHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

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
  it("accepts only the complete fixed projection manifest", () => {
    const decoded = Schema.decodeUnknownSync(QuranSnapshotManifestSchema)(
      manifest()
    );
    const decode = Schema.decodeUnknownEither(QuranSnapshotManifestSchema);
    const countError = decode({ ...manifest(), surahCount: 113 });
    const projectionError = decode({ ...manifest(), runtimeCount: 1198 });
    if (countError._tag === "Right" || projectionError._tag === "Right") {
      throw new Error("Expected incomplete Quran snapshot counts to fail.");
    }

    expect(decoded.snapshotId).toBe(secondHash);
    expect(String(countError.left)).toContain(
      "Expected the complete reviewed Quran snapshot counts."
    );
    expect(String(projectionError.left)).toContain(
      "Expected Quran runtime and search counts to cover every projection."
    );
  });
});
