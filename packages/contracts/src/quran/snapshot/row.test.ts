import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  ActiveAppLocaleListSchema,
  type AppLocaleCode,
} from "#contracts/locale";
import {
  QuranChunkRowSchema,
  type QuranRowPayload,
} from "#contracts/quran/snapshot/row";
import {
  QuranAttributionRowSchema,
  quranSourceFileCount,
  quranSourceIds,
} from "#contracts/quran/source";
import { quranRepresentativePayloads } from "#contracts/test/quran";

const payloads: readonly QuranRowPayload[] = quranRepresentativePayloads();

/** Decodes one exact canonical active locale list for source policy tests. */
function locales(input: readonly AppLocaleCode[]) {
  return Schema.decodeUnknownSync(ActiveAppLocaleListSchema)(input);
}

/** Formats one expected current Quran row schema failure. */
function formatFailure<A, I>(schema: Schema.Codec<A, I>, input: unknown) {
  const result = Schema.decodeUnknownExit(schema)(input);
  if (Exit.isSuccess(result)) {
    throw new Error("Expected current Quran row decoding to fail.");
  }
  return String(result.cause);
}

describe("Quran snapshot row contract", () => {
  it("derives official source identities and file counts from active locales", () => {
    const english = locales(["en"]);
    const indonesian = locales(["id"]);
    const german = locales(["de"]);
    const complete = locales(["en", "id", "de"]);

    expect(quranSourceIds(english)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "quranenc-english",
      "mokhtasar-english",
    ]);
    expect(quranSourceIds(indonesian)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "kemenag-names",
      "quranenc-indonesian",
      "quranenc-tafsir",
    ]);
    expect(quranSourceIds(german)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "bubenheim-names",
      "quranenc-german",
      "mokhtasar-german",
    ]);
    expect(quranSourceIds(complete)).toHaveLength(10);
    expect([
      quranSourceFileCount(english),
      quranSourceFileCount(indonesian),
      quranSourceFileCount(german),
      quranSourceFileCount(complete),
    ]).toEqual([3, 118, 4, 121]);
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
      formatFailure(QuranAttributionRowSchema, {
        ...attribution,
        sources: [...attribution.sources, lastSource],
      })
    ).toContain("Expected unique Quran sources in canonical order.");
    expect(
      formatFailure(QuranChunkRowSchema, {
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
      formatFailure(QuranChunkRowSchema, {
        ...chunk,
        lastVerse: chunk.lastVerse + 1,
      })
    ).toContain("Expected one contiguous Quran runtime chunk.");
    expect(
      formatFailure(QuranChunkRowSchema, {
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
