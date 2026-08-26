import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import {
  hasRequiredQuranSources,
  QuranAttributionRowSchema,
  QuranSourceAttributionSchema,
  QuranTafsirAccessSchema,
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

/** Builds test-only Tafsir access in canonical locale order. */
function tafsirAccess() {
  return [
    QuranTafsirAccessSchema.make({
      appLocale: AppLocaleSchema.make("en"),
      kind: "external",
      notice: "Technical English Tafsir notice.",
      sourceId: "mokhtasar-english",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: AppLocaleSchema.make("id"),
      kind: "embedded",
      notice: "Catatan teknis tafsir Indonesia.",
      sourceId: "quranenc-tafsir",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: AppLocaleSchema.make("de"),
      kind: "external",
      notice: "Technischer deutscher Tafsirhinweis.",
      sourceId: "mokhtasar-german",
    }),
  ] as const;
}

describe("Quran source contracts", () => {
  it("derives exact source coverage from active application locales", () => {
    const active = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "id",
      "de",
    ]);
    const sources = quranSourceIds(active).map(source);
    const access = tafsirAccess();
    const row = Schema.decodeUnknownSync(QuranAttributionRowSchema)({
      activeAppLocales: active,
      kind: "quran-attribution",
      sources,
      tafsirAccess: access,
    });
    expect(row.sources.map(({ id }) => id)).toEqual(quranSourceIds(active));
    expect(quranSourceFileCount(active)).toBe(119);
    expect(hasRequiredQuranSources(row.sources, active)).toBe(true);
    expect(hasRequiredQuranSources(row.sources.slice(0, -1), active)).toBe(
      false
    );
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources: [...sources].reverse(),
          tafsirAccess: access,
        })
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources: sources.map((item) => ({
            ...item,
            copy: item.copy.slice(0, -1),
          })),
          tafsirAccess: access,
        })
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources,
          tafsirAccess: [...access].reverse(),
        })
      )
    ).toBe(true);
  });

  it("rejects imprecise retrieval metadata and insecure evidence", () => {
    const base = source("tanzil-text");
    const [englishAccess] = tafsirAccess();
    if (englishAccess.kind !== "external") {
      throw new Error("Expected technical English Tafsir to use a link.");
    }
    const retrieval = Schema.decodeExit(QuranSourceAttributionSchema)({
      ...base,
      retrievedAt: "2026-07-24",
    });
    const sourceUrl = Schema.decodeExit(QuranSourceAttributionSchema)({
      ...base,
      sourceUrl: "http://example.test/source",
    });
    const externalId = Schema.decodeExit(QuranTafsirAccessSchema)({
      ...englishAccess,
      appLocale: AppLocaleSchema.make("id"),
    });
    const insecureTafsir = Schema.decodeExit(QuranTafsirAccessSchema)({
      ...englishAccess,
      sourceId: "mokhtasar-german",
    });

    expect(Exit.isFailure(retrieval) ? String(retrieval.cause) : "").toContain(
      "Expected an exact UTC Quran source retrieval time."
    );
    expect(Exit.isFailure(sourceUrl) ? String(sourceUrl.cause) : "").toContain(
      "Quran source links must use HTTPS."
    );
    expect(
      Exit.isFailure(externalId) ? String(externalId.cause) : ""
    ).toContain("Expected each external Tafsir locale to bind its source.");
    expect(
      Exit.isFailure(insecureTafsir) ? String(insecureTafsir.cause) : ""
    ).toContain("Expected each external Tafsir locale to bind its source.");
  });
});
