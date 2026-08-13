import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import {
  hasRequiredQuranSources,
  QuranAttributionRowSchema,
  QuranSourceAttributionSchema,
  quranSourceFileCount,
  quranSourceIds,
} from "#contracts/quran/source";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Builds one complete test attribution for a required source identity. */
function source(id: ReturnType<typeof quranSourceIds>[number]) {
  return QuranSourceAttributionSchema.make({
    artifact: { byteCount: 1, digest: hash, fileCount: 1 },
    copy: [
      {
        appLocale: AppLocaleSchema.make("en"),
        notice: "Technical English attribution notice.",
        title: "Technical English source",
      },
      {
        appLocale: AppLocaleSchema.make("id"),
        notice: "Catatan atribusi teknis bahasa Indonesia.",
        title: "Sumber teknis bahasa Indonesia",
      },
      {
        appLocale: AppLocaleSchema.make("de"),
        notice: "Technischer deutscher Quellenhinweis.",
        title: "Technische deutsche Quelle",
      },
    ],
    id,
    publisher: "Technical publisher",
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.test/source/${id}`,
    terms: {
      artifact: { byteCount: 1, digest: hash, fileCount: 1 },
      url: `https://example.test/terms/${id}`,
    },
    updateUrl: `https://example.test/update/${id}`,
    version: "test-source",
  });
}

describe("Quran source contracts", () => {
  it("derives exact source coverage from active application locales", () => {
    const active = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
      "en",
      "id",
      "de",
    ]);
    const sources = quranSourceIds(active).map(source);
    const row = Schema.decodeUnknownSync(QuranAttributionRowSchema)({
      activeAppLocales: active,
      kind: "quran-attribution",
      sources,
    });
    expect(row.sources.map(({ id }) => id)).toEqual(quranSourceIds(active));
    expect(quranSourceFileCount(active)).toBe(119);
    expect(hasRequiredQuranSources(row.sources, active)).toBe(true);
    expect(hasRequiredQuranSources(row.sources.slice(0, -1), active)).toBe(
      false
    );
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources: [...sources].reverse(),
        })
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources: sources.map((item) => ({
            ...item,
            copy: item.copy.slice(0, -1),
          })),
        })
      )
    ).toBe(true);
  });

  it("rejects imprecise retrieval metadata and insecure evidence", () => {
    const base = source("tanzil-text");
    const retrieval = Schema.decodeUnknownEither(QuranSourceAttributionSchema)({
      ...base,
      retrievedAt: "2026-07-24",
    });
    const sourceUrl = Schema.decodeUnknownEither(QuranSourceAttributionSchema)({
      ...base,
      sourceUrl: "http://example.test/source",
    });

    expect(Either.isLeft(retrieval) ? String(retrieval.left) : "").toContain(
      "Expected an exact UTC Quran source retrieval time."
    );
    expect(Either.isLeft(sourceUrl) ? String(sourceUrl.left) : "").toContain(
      "Quran source links must use HTTPS."
    );
  });
});
