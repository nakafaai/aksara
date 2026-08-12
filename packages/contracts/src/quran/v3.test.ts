import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { ActiveAppLocaleListSchema } from "#contracts/locale";
import {
  QuranAttributionV3RowSchema,
  QuranChunkV3RowSchema,
  type QuranV3RowPayload,
  quranV3SourceFileCount,
  quranV3SourceIds,
} from "#contracts/quran/v3";
import { quranV3RepresentativePayloads } from "#contracts/test/quran-v3";

const payloads: readonly QuranV3RowPayload[] = quranV3RepresentativePayloads();

/** Decodes one exact canonical active locale list for source policy tests. */
function locales(input: readonly ("en" | "id" | "de")[]) {
  return Schema.decodeUnknownSync(ActiveAppLocaleListSchema)(input);
}

/** Formats one expected current Quran row schema failure. */
function formatFailure<A, I>(schema: Schema.Schema<A, I>, input: unknown) {
  const result = Schema.decodeUnknownEither(schema)(input);
  if (Either.isRight(result)) {
    throw new Error("Expected current Quran row decoding to fail.");
  }
  return ParseResult.TreeFormatter.formatErrorSync(result.left);
}

describe("Quran v3 row contract", () => {
  it("derives official source identities and file counts from active locales", () => {
    const english = locales(["en"]);
    const indonesian = locales(["id"]);
    const german = locales(["de"]);
    const complete = locales(["en", "id", "de"]);

    expect(quranV3SourceIds(english)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "quranenc-english",
    ]);
    expect(quranV3SourceIds(indonesian)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "quranenc-indonesian",
      "quranenc-tafsir",
    ]);
    expect(quranV3SourceIds(german)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "quranenc-german",
    ]);
    expect(quranV3SourceIds(complete)).toHaveLength(6);
    expect([
      quranV3SourceFileCount(english),
      quranV3SourceFileCount(indonesian),
      quranV3SourceFileCount(german),
      quranV3SourceFileCount(complete),
    ]).toEqual([3, 117, 3, 119]);
  });

  it("reports source order, translation order, and chunk continuity failures", () => {
    const attribution = payloads.find(
      (payload) => payload.kind === "quran-attribution"
    );
    const chunk = payloads.find((payload) => payload.kind === "quran-chunk");
    if (
      !(
        attribution?.kind === "quran-attribution" &&
        chunk?.kind === "quran-chunk"
      )
    ) {
      throw new Error("Expected current Quran attribution and chunk fixtures.");
    }
    const lastSource = attribution.sources.at(-1);
    const [firstVerse] = chunk.verses;
    if (!(lastSource && firstVerse)) {
      throw new Error("Expected nonempty current Quran row fixtures.");
    }

    expect(
      formatFailure(QuranAttributionV3RowSchema, {
        ...attribution,
        sources: [...attribution.sources, lastSource],
      })
    ).toContain("Expected unique Quran sources in canonical order.");
    expect(
      formatFailure(QuranChunkV3RowSchema, {
        ...chunk,
        verses: [
          {
            ...firstVerse,
            translations: [...firstVerse.translations].reverse(),
          },
          ...chunk.verses.slice(1),
        ],
      })
    ).toContain(
      "Quran translations must use unique canonical app-locale order."
    );
    expect(
      formatFailure(QuranChunkV3RowSchema, {
        ...chunk,
        lastVerse: chunk.lastVerse + 1,
      })
    ).toContain("Expected one contiguous Quran runtime chunk.");
    expect(
      formatFailure(QuranChunkV3RowSchema, {
        ...chunk,
        verses: [
          {
            ...firstVerse,
            number: {
              ...firstVerse.number,
              inQuran: firstVerse.number.inQuran + 1,
            },
          },
          ...chunk.verses.slice(1),
        ],
      })
    ).toContain("Expected one contiguous Quran runtime chunk.");
  });
});
