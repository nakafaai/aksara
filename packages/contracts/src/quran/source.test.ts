import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
  makeAppLocale,
} from "#contracts/locale";
import type {
  QuranEmbeddedSourceId,
  QuranExternalSourceId,
} from "#contracts/quran/identity";
import {
  hasRequiredQuranSources,
  QuranAttributionRowSchema,
  QuranEmbeddedSourceAttributionSchema,
  QuranExternalSourceAttributionSchema,
  QuranSourceAttributionSchema,
  QuranTafsirAccessSchema,
  quranSourceFileCount,
  quranSourceIds,
} from "#contracts/quran/source";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Builds one complete test attribution for a required source identity. */
function source(id: ReturnType<typeof quranSourceIds>[number]) {
  const common = {
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
    publisher: "Technical publisher",
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.test/source/${id}`,
    updateUrl: `https://example.test/update/${id}`,
    version: "test-source",
  } as const;
  if (id === "mokhtasar-english" || id === "mokhtasar-german") {
    return QuranExternalSourceAttributionSchema.make({
      ...common,
      id,
      kind: "external",
      terms: {
        access: "link-only",
        url: `https://example.test/terms/${id}`,
      },
    });
  }
  return QuranEmbeddedSourceAttributionSchema.make({
    ...common,
    artifact: { byteCount: 1, digest: hash, fileCount: 1 },
    id,
    kind: "embedded",
    terms: {
      artifact: { byteCount: 1, digest: hash, fileCount: 1 },
      url: `https://example.test/terms/${id}`,
    },
  });
}

/** Builds test-only Tafsir access in canonical locale order. */
function tafsirAccess() {
  const english = makeAppLocale(ENGLISH_APP_LOCALE_CODE);
  const indonesian = makeAppLocale(INDONESIAN_APP_LOCALE_CODE);
  const german = makeAppLocale(GERMAN_APP_LOCALE_CODE);
  return [
    QuranTafsirAccessSchema.make({
      appLocale: english,
      kind: "external",
      notice: "Technical English Tafsir notice.",
      sourceId: "mokhtasar-english",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: indonesian,
      kind: "embedded",
      notice: "Catatan teknis tafsir Indonesia.",
      sourceId: "quranenc-tafsir",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: german,
      kind: "external",
      notice: "Technischer deutscher Tafsirhinweis.",
      sourceId: "mokhtasar-german",
    }),
  ] as const;
}

describe("Quran source contracts", () => {
  it("preserves exact source kinds and Tafsir pairs in inferred types", () => {
    const embedded = source("tanzil-text");
    const external = source("mokhtasar-english");
    const [englishSchema, indonesianSchema, germanSchema] =
      QuranTafsirAccessSchema.members;
    const englishLocale = makeAppLocale(ENGLISH_APP_LOCALE_CODE);
    const indonesianLocale = makeAppLocale(INDONESIAN_APP_LOCALE_CODE);
    const germanLocale = makeAppLocale(GERMAN_APP_LOCALE_CODE);
    const english = englishSchema.make({
      appLocale: englishLocale,
      kind: "external",
      notice: "Technical English Tafsir notice.",
      sourceId: "mokhtasar-english",
    });
    const indonesian = indonesianSchema.make({
      appLocale: indonesianLocale,
      kind: "embedded",
      notice: "Catatan teknis tafsir Indonesia.",
      sourceId: "quranenc-tafsir",
    });
    const german = germanSchema.make({
      appLocale: germanLocale,
      kind: "external",
      notice: "Technischer deutscher Tafsirhinweis.",
      sourceId: "mokhtasar-german",
    });

    if (embedded.kind === "embedded" && external.kind === "external") {
      expectTypeOf(embedded.id).toEqualTypeOf<QuranEmbeddedSourceId>();
      expectTypeOf(external.id).toEqualTypeOf<QuranExternalSourceId>();
    }
    expectTypeOf(english.appLocale).toEqualTypeOf<typeof englishLocale>();
    expectTypeOf(english.sourceId).toEqualTypeOf<"mokhtasar-english">();
    expectTypeOf(indonesian.appLocale).toEqualTypeOf<typeof indonesianLocale>();
    expectTypeOf(indonesian.sourceId).toEqualTypeOf<"quranenc-tafsir">();
    expectTypeOf(german.appLocale).toEqualTypeOf<typeof germanLocale>();
    expectTypeOf(german.sourceId).toEqualTypeOf<"mokhtasar-german">();
  });

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
    expect(quranSourceFileCount(active)).toBe(121);
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
    const external = source("mokhtasar-english");
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
    const invalidLocaleAccess: unknown = {
      ...englishAccess,
      appLocale: INDONESIAN_APP_LOCALE_CODE,
    };
    const externalId = Schema.decodeUnknownExit(QuranTafsirAccessSchema)(
      invalidLocaleAccess
    );
    const insecureTafsir = Schema.decodeUnknownExit(QuranTafsirAccessSchema)({
      ...englishAccess,
      sourceId: "mokhtasar-german",
    });
    const embeddedExternalId = Schema.decodeUnknownExit(
      QuranEmbeddedSourceAttributionSchema
    )({ ...base, id: "mokhtasar-english" });
    const externalEmbeddedId = Schema.decodeUnknownExit(
      QuranExternalSourceAttributionSchema
    )({ ...external, id: "quranenc-tafsir" });

    expect(Exit.isFailure(retrieval) ? String(retrieval.cause) : "").toContain(
      "Expected an exact UTC Quran source retrieval time."
    );
    expect(Exit.isFailure(sourceUrl) ? String(sourceUrl.cause) : "").toContain(
      "Quran source links must use HTTPS."
    );
    expect(Exit.isFailure(externalId)).toBe(true);
    expect(Exit.isFailure(insecureTafsir)).toBe(true);
    expect(Exit.isFailure(embeddedExternalId)).toBe(true);
    expect(Exit.isFailure(externalEmbeddedId)).toBe(true);
  });
});
