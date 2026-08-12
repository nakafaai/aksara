import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  QURAN_SNAPSHOT_V3_FORMAT,
  QuranSnapshotInputSchema,
  QuranSnapshotManifestSchema,
  QuranSnapshotV3InputSchema,
  QuranSnapshotV3ManifestSchema,
  QuranSnapshotWireSchema,
} from "#contracts/quran/snapshot/spec";

const firstHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const secondHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const SNAPSHOT_COUNT_ERROR_PATTERN =
  /Expected (?:the complete reviewed Quran snapshot counts|Quran runtime and search counts to cover every projection)\./u;

/** Builds the complete fixed-count snapshot manifest. */
function manifest() {
  return {
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
      projectionCount: 1429,
      runtimeCount: 1201,
    });
    const decode = Schema.decodeUnknownEither(QuranSnapshotManifestSchema);
    const countError = decode({ ...manifest(), surahCount: 113 });
    const projectionError = decode({ ...manifest(), runtimeCount: 1199 });
    const tafsirError = decode({
      ...manifest(),
      tafsirLocales: ["id", "id"],
    });
    const { snapshotId: _snapshotId, ...input } = manifest();
    const decodeInput = Schema.decodeUnknownEither(QuranSnapshotInputSchema);
    const inputCountError = decodeInput({ ...input, verseCount: 6235 });
    const inputProjectionError = decodeInput({
      ...input,
      projectionCount: 1427,
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

  it("accepts current active locales and review identity", () => {
    const { locales: _locales, ...historical } = manifest();
    const current = Schema.decodeUnknownSync(QuranSnapshotV3ManifestSchema)({
      ...historical,
      activeAppLocales: ["en", "id", "de"],
      editorialReviewDigest: firstHash,
      format: QURAN_SNAPSHOT_V3_FORMAT,
      projectionCount: 1542,
      searchCount: 342,
      sourceFileCount: 119,
    });
    expect(current.activeAppLocales).toEqual(["en", "id", "de"]);
    expect(Schema.decodeUnknownSync(QuranSnapshotWireSchema)(current)).toEqual(
      current
    );
  });

  it("keeps Tafsir unavailable when Indonesian is inactive", () => {
    const { locales: _locales, ...historical } = manifest();
    const current = Schema.decodeUnknownSync(QuranSnapshotV3ManifestSchema)({
      ...historical,
      activeAppLocales: ["de"],
      editorialReviewDigest: firstHash,
      format: QURAN_SNAPSHOT_V3_FORMAT,
      projectionCount: 1314,
      searchCount: 114,
      sourceFileCount: 3,
      tafsirLocales: [],
    });

    expect(current.tafsirLocales).toEqual([]);
  });

  it("rejects incomplete and incoherent v3 inputs and manifests", () => {
    const { locales: _locales, snapshotId, ...historical } = manifest();
    const current = {
      ...historical,
      activeAppLocales: ["en", "id", "de"],
      editorialReviewDigest: firstHash,
      format: QURAN_SNAPSHOT_V3_FORMAT,
      projectionCount: 1542,
      searchCount: 342,
      sourceFileCount: 119,
    } as const;
    const cases = [
      Schema.decodeUnknownEither(QuranSnapshotV3InputSchema)({
        ...current,
        verseCount: 6235,
      }),
      Schema.decodeUnknownEither(QuranSnapshotV3InputSchema)({
        ...current,
        projectionCount: 1427,
      }),
      Schema.decodeUnknownEither(QuranSnapshotV3ManifestSchema)({
        ...current,
        snapshotId,
        verseCount: 6235,
      }),
      Schema.decodeUnknownEither(QuranSnapshotV3ManifestSchema)({
        ...current,
        projectionCount: 1427,
        snapshotId,
      }),
    ];

    for (const result of cases) {
      expect(Either.isLeft(result)).toBe(true);
      expect(String(result)).toMatch(SNAPSHOT_COUNT_ERROR_PATTERN);
    }
  });
});
