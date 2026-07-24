import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  QURAN_SOURCE_FILE_COUNT,
  QURAN_SOURCE_IDS,
  QuranAttributionRowSchema,
  QuranSourceAttributionSchema,
} from "#contracts/quran/source";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Builds one complete technical official-source attribution. */
function source(id: (typeof QURAN_SOURCE_IDS)[number]) {
  return {
    artifact: { byteCount: 1, digest: hash, fileCount: 1 },
    id,
    notice: "Technical attribution notice.",
    publisher: "Technical publisher",
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.test/source/${id}`,
    terms: {
      artifact: { byteCount: 1, digest: hash, fileCount: 1 },
      url: `https://example.test/terms/${id}`,
    },
    title: "Technical Quran source",
    updateUrl: `https://example.test/update/${id}`,
    version: "test-v1",
  };
}

describe("Quran source contracts", () => {
  it("locks exact source coverage and visible attribution order", () => {
    const sources = QURAN_SOURCE_IDS.map((id) =>
      QuranSourceAttributionSchema.make(source(id))
    );
    const [first, ...rest] = sources;
    if (!first) {
      throw new Error("Expected Quran source identities.");
    }
    const row = Schema.decodeUnknownSync(QuranAttributionRowSchema)({
      kind: "quran-attribution",
      sources: [first, ...rest],
    });
    const reversed = Schema.decodeUnknownEither(QuranAttributionRowSchema)({
      kind: "quran-attribution",
      sources: [...sources].reverse(),
    });

    expect(row.sources.map(({ id }) => id)).toEqual(QURAN_SOURCE_IDS);
    expect(QURAN_SOURCE_FILE_COUNT).toBe(118);
    expect(Either.isLeft(reversed)).toBe(true);
    if (Either.isLeft(reversed)) {
      expect(String(reversed.left)).toContain(
        "Expected every official Quran source in canonical attribution order."
      );
    }
  });

  it("rejects imprecise retrieval metadata and non-HTTPS evidence", () => {
    const imprecise = Schema.decodeUnknownEither(QuranSourceAttributionSchema)({
      ...source("tanzil-text"),
      retrievedAt: "2026-07-24",
    });
    const insecure = Schema.decodeUnknownEither(QuranSourceAttributionSchema)({
      ...source("tanzil-text"),
      sourceUrl: "http://example.test/source",
    });
    if (Either.isRight(imprecise) || Either.isRight(insecure)) {
      throw new Error("Expected precise secure Quran source evidence.");
    }

    expect(String(imprecise.left)).toContain(
      "Expected an exact UTC Quran source retrieval time."
    );
    expect(String(insecure.left)).toContain(
      "Quran source links must use HTTPS."
    );
  });
});
