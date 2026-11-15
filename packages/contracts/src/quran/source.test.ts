import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";

import {
  ActiveAppLocaleListSchema,
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
import {
  quranSourceAttribution,
  quranTafsirAccess,
} from "#contracts/test/attribution";

describe("Quran source ids golden vectors", () => {
  it("pins the ordered source identities of the active and single-locale sets", () => {
    const active = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "id",
      "de",
    ]);
    const en = Schema.decodeSync(ActiveAppLocaleListSchema)(["en"]);
    const id = Schema.decodeSync(ActiveAppLocaleListSchema)(["id"]);

    expect(quranSourceIds(active)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "kemenag-names",
      "bubenheim-names",
      "quranenc-english",
      "quranenc-indonesian",
      "quranenc-german",
      "quranenc-tafsir",
      "mokhtasar-english",
      "mokhtasar-german",
    ]);
    expect(quranSourceIds(en)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "quranenc-english",
      "mokhtasar-english",
    ]);
    expect(quranSourceIds(id)).toEqual([
      "tanzil-text",
      "tanzil-metadata",
      "kemenag-names",
      "quranenc-indonesian",
      "quranenc-tafsir",
    ]);
    expect(quranSourceFileCount(en)).toBe(3);
    expect(quranSourceFileCount(id)).toBe(118);
  });
});

describe("Quran source contracts", () => {
  it("preserves exact source kinds and Tafsir pairs in inferred types", () => {
    const embedded = quranSourceAttribution("tanzil-text");
    const external = quranSourceAttribution("mokhtasar-english");
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
      "ms",
    ]);
    const sources = Arr.map(quranSourceIds(active), quranSourceAttribution);
    const access = quranTafsirAccess();
    const row = Schema.decodeSync(QuranAttributionRowSchema)({
      activeAppLocales: active,
      kind: "quran-attribution",
      sources,
      tafsirAccess: access,
    });
    expect(Arr.map(row.sources, ({ id }) => id)).toEqual(
      quranSourceIds(active)
    );
    // Arabic and metadata, one XML per en/id/de translation and 114 Malay
    // responses, the id/de/ms name records, and 114 Indonesian Tafsir responses.
    expect(quranSourceFileCount(active)).toBe(2 + 3 + 114 + 3 + 114);
    expect(hasRequiredQuranSources(row.sources, active)).toBe(true);
    expect(hasRequiredQuranSources(Arr.dropRight(row.sources, 1), active)).toBe(
      false
    );
    expect(
      Exit.isFailure(
        Schema.decodeExit(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources: Arr.reverse(sources),
          tafsirAccess: access,
        })
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources: Arr.map(sources, (item) => ({
            ...item,
            copy: Arr.dropRight(item.copy, 1),
          })),
          tafsirAccess: access,
        })
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeExit(QuranAttributionRowSchema)({
          activeAppLocales: active,
          kind: "quran-attribution",
          sources,
          tafsirAccess: Arr.reverse(access),
        })
      )
    ).toBe(true);
  });

  it("rejects imprecise retrieval metadata and insecure evidence", () => {
    const base = quranSourceAttribution("tanzil-text");
    const external = quranSourceAttribution("mokhtasar-english");
    const [englishAccess] = quranTafsirAccess();
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
