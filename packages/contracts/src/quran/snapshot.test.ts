import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotInputSchema,
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
  it("locks source counts while deriving coherent projection inventory", () => {
    const decoded = Schema.decodeUnknownSync(QuranSnapshotManifestSchema)(
      manifest()
    );
    const alternateChunking = Schema.decodeUnknownSync(
      QuranSnapshotManifestSchema
    )({
      ...manifest(),
      chunkCount: 1086,
      projectionCount: 1428,
      runtimeCount: 1200,
    });
    const decode = Schema.decodeUnknownEither(QuranSnapshotManifestSchema);
    const countError = decode({ ...manifest(), surahCount: 113 });
    const projectionError = decode({ ...manifest(), runtimeCount: 1198 });
    const tafsirError = decode({
      ...manifest(),
      tafsirLocales: ["id", "id"],
    });
    const { snapshotId: _snapshotId, ...input } = manifest();
    const decodeInput = Schema.decodeUnknownEither(QuranSnapshotInputSchema);
    const inputCountError = decodeInput({ ...input, verseCount: 6235 });
    const inputProjectionError = decodeInput({
      ...input,
      projectionCount: 1426,
    });
    if (
      countError._tag === "Right" ||
      projectionError._tag === "Right" ||
      tafsirError._tag === "Right" ||
      inputCountError._tag === "Right" ||
      inputProjectionError._tag === "Right"
    ) {
      throw new Error("Expected incomplete Quran snapshot counts to fail.");
    }

    expect(decoded.snapshotId).toBe(secondHash);
    expect(alternateChunking.chunkCount).toBe(1086);
    expect(String(countError.left)).toContain(
      "Expected the complete reviewed Quran snapshot counts."
    );
    expect(String(projectionError.left)).toContain(
      "Expected Quran runtime and search counts to cover every projection."
    );
    expect(String(tafsirError.left)).toContain(
      "Tafsir locales must match the reviewed corpus contract."
    );
    expect(String(inputCountError.left)).toContain(
      "Expected the complete reviewed Quran snapshot counts."
    );
    expect(String(inputProjectionError.left)).toContain(
      "Expected Quran runtime and search counts to cover every projection."
    );
  });
});
