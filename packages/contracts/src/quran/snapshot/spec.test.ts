import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_SNAPSHOT_FORMAT,
  QuranSnapshotFactsSchema,
  QuranSnapshotSchema,
} from "#contracts/quran/snapshot/spec";

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const facts = {
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
  sourceBytes: 1,
  sourceDigest: digest,
  sourceFileCount: 118,
  surahCount: 114,
  tafsirLocales: ["id"],
  verseCount: 6236,
};

describe("Quran snapshot contract", () => {
  it("accepts complete source and projection evidence", () => {
    const decoded = Schema.decodeUnknownSync(QuranSnapshotFactsSchema)(facts);
    const snapshot = Schema.decodeUnknownSync(QuranSnapshotSchema)({
      ...facts,
      format: QURAN_SNAPSHOT_FORMAT,
      snapshotId: digest,
    });
    expect(decoded.activeAppLocales).toEqual(["en", "id"]);
    expect(snapshot.format).toBe("localized-quran-snapshot");

    const englishOnly = {
      ...facts,
      activeAppLocales: ["en"],
      projectionCount: 1314,
      searchCount: 114,
      sourceFileCount: 3,
      tafsirLocales: [],
    };
    expect(
      Schema.decodeUnknownSync(QuranSnapshotFactsSchema)(englishOnly)
        .activeAppLocales
    ).toEqual(["en"]);
  });

  it("rejects missing locale sources and incoherent projection counts", () => {
    for (const change of [
      { sourceFileCount: 4 },
      { searchCount: 114 },
      { runtimeCount: 1199 },
      { projectionCount: 1427 },
      { tafsirLocales: [] },
    ]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(QuranSnapshotFactsSchema)({
            ...facts,
            ...change,
          })
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownEither(QuranSnapshotFactsSchema)({
          ...facts,
          sourceFileCount: 4,
        })
      )
    ).toContain("Expected complete active-locale Quran source counts.");
    expect(
      String(
        Schema.decodeUnknownEither(QuranSnapshotFactsSchema)({
          ...facts,
          runtimeCount: 1199,
        })
      )
    ).toContain(
      "Expected Quran runtime and search counts to cover every projection."
    );
    expect(
      String(
        Schema.decodeUnknownEither(QuranSnapshotSchema)({
          ...facts,
          format: QURAN_SNAPSHOT_FORMAT,
          snapshotId: digest,
          sourceFileCount: 4,
        })
      )
    ).toContain("Expected complete active-locale Quran source counts.");
    expect(
      String(
        Schema.decodeUnknownEither(QuranSnapshotSchema)({
          ...facts,
          format: QURAN_SNAPSHOT_FORMAT,
          projectionCount: 1427,
          snapshotId: digest,
        })
      )
    ).toContain(
      "Expected Quran runtime and search counts to cover every projection."
    );
  });
});
