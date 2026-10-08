import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";

import { materialGraph } from "#contracts/test/graph";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import { JsonTextSchema } from "#contracts/text/json";
import {
  type TryoutCatalogRow,
  TryoutCatalogRowSchema,
  type TryoutSection,
} from "#contracts/tryout/catalog";
import {
  canonicalizeTryoutCatalog,
  canonicalizeTryoutCatalogFacts,
  compareTryoutCatalog,
  digestTryoutCatalog,
  makeTryoutCatalogRecord,
} from "#contracts/tryout/hash/catalog";
import { tryoutCatalogIdentity } from "#contracts/tryout/identity";

const rows: readonly TryoutCatalogRow[] = makeTryoutTestRows().catalog.map(
  ({ row }) => row
);

const countryRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryCode: "ZZ",
  countryKey: "test-country",
  description: "Deskripsi é",
  graph: materialGraph("en", "tryout", "catalog", "country"),
  kind: "country",
  order: 1,
  publicPath: "try-out/test-country",
  sourceRevision: "2026-08-12",
  title: "Negara uji é",
});
const examRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryKey: "test-country",
  examKey: "test-exam",
  graph: materialGraph("en", "tryout", "catalog", "exam"),
  kind: "exam",
  order: 1,
  publicPath: "try-out/test-country/test-exam",
  scoringStrategy: "irt",
  sourceRevision: "2026-08-12",
  title: "Ujian uji é",
});
const trackRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryKey: "test-country",
  examKey: "test-exam",
  graph: materialGraph("en", "tryout", "catalog", "track"),
  kind: "track",
  order: 1,
  publicPath: "try-out/test-country/test-exam/test-track",
  questionCount: 2,
  sectionCount: 2,
  setCount: 2,
  sourceRevision: "2026-08-12",
  title: "Trek uji é",
  trackKey: "test-track",
  trackKind: "year",
  visibleSectionCount: 2,
});
const entrySetRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryKey: "test-country",
  examKey: "test-exam",
  graph: materialGraph("en", "tryout", "catalog", "set"),
  internalEntrySectionKey: "test-section",
  kind: "set",
  order: 1,
  publicPath: "try-out/test-country/test-exam/test-track/test-set",
  questionCount: 1,
  scoringStrategy: "irt",
  sectionCount: 1,
  setKey: "test-set",
  sourceRevision: "2026-08-12",
  title: "Set 1 é",
  trackKey: "test-track",
  visibleSectionCount: 0,
});
const openSetRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryKey: "test-country",
  examKey: "test-exam",
  graph: materialGraph("en", "tryout", "catalog", "set"),
  kind: "set",
  order: 2,
  publicPath: "try-out/test-country/test-exam/test-track/test-set-2",
  questionCount: 2,
  scoringStrategy: "irt",
  sectionCount: 2,
  setKey: "test-set-2",
  sourceRevision: "2026-08-12",
  title: "Set 2",
  trackKey: "test-track",
  visibleSectionCount: 2,
});
const entrySectionRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryKey: "test-country",
  examKey: "test-exam",
  graph: materialGraph("en", "tryout", "catalog", "section"),
  kind: "section",
  order: 1,
  questionCount: 1,
  questionSourcePath:
    "packages/corpus/question-bank/tryout/test-country/test-exam/test-track/test-set",
  sectionKey: "test-section",
  setKey: "test-set",
  sourceRevision: "2026-08-12",
  timeLimitSeconds: 60,
  title: "Kuantitatif é",
  trackKey: "test-track",
  visibility: "internal-entry",
});
const markedSectionRow = Schema.decodeSync(TryoutCatalogRowSchema)({
  appLocale: "en",
  countryKey: "test-country",
  examKey: "test-exam",
  graph: materialGraph("en", "tryout", "catalog", "section"),
  kind: "section",
  marks: { blank: 0, correct: 4, wrong: -1 },
  order: 2,
  publicPath: "try-out/test-country/test-exam/test-track/test-set-2/general",
  questionCount: 1,
  questionSourcePath:
    "packages/corpus/question-bank/tryout/test-country/test-exam/test-track/test-set-2",
  sectionKey: "general",
  setKey: "test-set-2",
  sourceRevision: "2026-08-12",
  timeLimitSeconds: 90,
  title: "Umum é",
  trackKey: "test-track",
  visibility: "visible",
});

describe("try-out catalog identity and hashing", () => {
  it.effect("canonicalizes and digests signed catalog rows", () =>
    Effect.gen(function* () {
      const records = rows.map(makeTryoutCatalogRecord).reverse();
      records.sort((left, right) => compareTryoutCatalog(left.row, right.row));
      const first = yield* Effect.fromNullishOr(rows[0]);
      const summary = yield* digestTryoutCatalog(Stream.fromIterable(records));
      const chunked = yield* digestTryoutCatalog(
        Stream.fromIterable(records).pipe(Stream.rechunk(3))
      );

      expect(records.map(({ row }) => tryoutCatalogIdentity(row))).toEqual([
        "de\u0000country\u0000indonesia\u0000\u0000\u0000\u0000",
        "de\u0000exam\u0000indonesia\u0000snbt\u0000\u0000\u0000",
        "de\u0000section\u0000indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge",
        "de\u0000set\u0000indonesia\u0000snbt\u00002027\u0000set-1\u0000",
        "de\u0000track\u0000indonesia\u0000snbt\u00002027\u0000\u0000",
        "en\u0000country\u0000indonesia\u0000\u0000\u0000\u0000",
        "en\u0000exam\u0000indonesia\u0000snbt\u0000\u0000\u0000",
        "en\u0000section\u0000indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge",
        "en\u0000set\u0000indonesia\u0000snbt\u00002027\u0000set-1\u0000",
        "en\u0000track\u0000indonesia\u0000snbt\u00002027\u0000\u0000",
        "id\u0000country\u0000indonesia\u0000\u0000\u0000\u0000",
        "id\u0000exam\u0000indonesia\u0000snbt\u0000\u0000\u0000",
        "id\u0000section\u0000indonesia\u0000snbt\u00002027\u0000set-1\u0000quantitative-knowledge",
        "id\u0000set\u0000indonesia\u0000snbt\u00002027\u0000set-1\u0000",
        "id\u0000track\u0000indonesia\u0000snbt\u00002027\u0000\u0000",
      ]);
      expect(
        yield* Schema.decodeEffect(JsonTextSchema)(
          canonicalizeTryoutCatalog(first)
        )
      ).toEqual(first);
      expect(summary).toEqual({
        count: 15,
        digest:
          "sha256:fdff06d2385b467397d6b7e7ed8651504debeacd6b652cd5e4a55da9ecc773b0",
      });
      expect(chunked).toEqual(summary);
    })
  );

  it.effect("keeps unmarked section bytes and binds penalized marks", () =>
    Effect.gen(function* () {
      const section = yield* Effect.fromNullishOr(
        rows.find(
          (row): row is TryoutSection =>
            row.kind === "section" && row.appLocale === "en"
        )
      );
      const marked: TryoutSection = {
        ...section,
        marks: { blank: 0, correct: 4, wrong: -1 },
      };
      const marks = '"marks":{"blank":0,"correct":4,"wrong":-1}';

      expect(makeTryoutCatalogRecord(section).rowHash).toBe(
        "sha256:334369fe2e8fd6bd39a069c89d88a1c1b6dbbc389c9a907073a7f6ba23f0ea3a"
      );
      expect(canonicalizeTryoutCatalog(marked)).toContain(
        `"kind":"section",${marks},"order":1`
      );
      expect(
        yield* Schema.decodeEffect(JsonTextSchema)(
          canonicalizeTryoutCatalog(marked)
        )
      ).toEqual(marked);
      expect(canonicalizeTryoutCatalogFacts(marked)).toContain(
        `"examKey":"snbt",${marks},"questionCount":1`
      );
      expect(makeTryoutCatalogRecord(marked).rowHash).not.toBe(
        makeTryoutCatalogRecord(section).rowHash
      );
    })
  );

  it("pins the full canonical bytes of every catalog kind", () => {
    expect(canonicalizeTryoutCatalog(countryRow)).toBe(
      '{"appLocale":"en","description":"Deskripsi é","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:country","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:country","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:country","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Negara uji é","countryCode":"ZZ","countryKey":"test-country","kind":"country","order":1,"publicPath":"try-out/test-country"}'
    );
    expect(canonicalizeTryoutCatalog(examRow)).toBe(
      '{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:exam","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:exam","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:exam","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Ujian uji é","countryKey":"test-country","examKey":"test-exam","kind":"exam","order":1,"publicPath":"try-out/test-country/test-exam","scoringStrategy":"irt"}'
    );
    expect(canonicalizeTryoutCatalog(trackRow)).toBe(
      '{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:track","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:track","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:track","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Trek uji é","countryKey":"test-country","examKey":"test-exam","kind":"track","order":1,"publicPath":"try-out/test-country/test-exam/test-track","questionCount":2,"sectionCount":2,"setCount":2,"trackKey":"test-track","trackKind":"year","visibleSectionCount":2}'
    );
    expect(canonicalizeTryoutCatalog(entrySetRow)).toBe(
      '{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:set","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:set","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:set","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Set 1 é","countryKey":"test-country","examKey":"test-exam","internalEntrySectionKey":"test-section","kind":"set","order":1,"publicPath":"try-out/test-country/test-exam/test-track/test-set","questionCount":1,"scoringStrategy":"irt","sectionCount":1,"setKey":"test-set","trackKey":"test-track","visibleSectionCount":0}'
    );
    expect(canonicalizeTryoutCatalog(openSetRow)).toBe(
      '{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:set","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:set","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:set","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Set 2","countryKey":"test-country","examKey":"test-exam","kind":"set","order":2,"publicPath":"try-out/test-country/test-exam/test-track/test-set-2","questionCount":2,"scoringStrategy":"irt","sectionCount":2,"setKey":"test-set-2","trackKey":"test-track","visibleSectionCount":2}'
    );
    expect(canonicalizeTryoutCatalog(entrySectionRow)).toBe(
      '{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:section","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:section","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:section","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Kuantitatif é","countryKey":"test-country","examKey":"test-exam","kind":"section","order":1,"questionCount":1,"questionSourcePath":"packages/corpus/question-bank/tryout/test-country/test-exam/test-track/test-set","sectionKey":"test-section","setKey":"test-set","timeLimitSeconds":60,"trackKey":"test-track","visibility":"internal-entry"}'
    );
    expect(canonicalizeTryoutCatalog(markedSectionRow)).toBe(
      '{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:section","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:section","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:section","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Umum é","countryKey":"test-country","examKey":"test-exam","kind":"section","marks":{"blank":0,"correct":4,"wrong":-1},"order":2,"publicPath":"try-out/test-country/test-exam/test-track/test-set-2/general","questionCount":1,"questionSourcePath":"packages/corpus/question-bank/tryout/test-country/test-exam/test-track/test-set-2","sectionKey":"general","setKey":"test-set-2","timeLimitSeconds":90,"trackKey":"test-track","visibility":"visible"}'
    );
  });

  it("pins the locale-neutral facts of every catalog kind", () => {
    expect(canonicalizeTryoutCatalogFacts(countryRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:country","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:country","lensId":"lens:material:lesson:tryout"},"kind":"country","order":1,"sourceRevision":"2026-08-12","countryCode":"ZZ","countryKey":"test-country"}'
    );
    expect(canonicalizeTryoutCatalogFacts(examRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:exam","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:exam","lensId":"lens:material:lesson:tryout"},"kind":"exam","order":1,"sourceRevision":"2026-08-12","countryKey":"test-country","examKey":"test-exam","scoringStrategy":"irt"}'
    );
    expect(canonicalizeTryoutCatalogFacts(trackRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:track","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:track","lensId":"lens:material:lesson:tryout"},"kind":"track","order":1,"sourceRevision":"2026-08-12","countryKey":"test-country","examKey":"test-exam","questionCount":2,"sectionCount":2,"setCount":2,"trackKey":"test-track","trackKind":"year","visibleSectionCount":2}'
    );
    expect(canonicalizeTryoutCatalogFacts(entrySetRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:set","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:set","lensId":"lens:material:lesson:tryout"},"kind":"set","order":1,"sourceRevision":"2026-08-12","countryKey":"test-country","examKey":"test-exam","internalEntrySectionKey":"test-section","questionCount":1,"scoringStrategy":"irt","sectionCount":1,"setKey":"test-set","trackKey":"test-track","visibleSectionCount":0}'
    );
    expect(canonicalizeTryoutCatalogFacts(openSetRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:set","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:set","lensId":"lens:material:lesson:tryout"},"kind":"set","order":2,"sourceRevision":"2026-08-12","countryKey":"test-country","examKey":"test-exam","questionCount":2,"scoringStrategy":"irt","sectionCount":2,"setKey":"test-set-2","trackKey":"test-track","visibleSectionCount":2}'
    );
    expect(canonicalizeTryoutCatalogFacts(entrySectionRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:section","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:section","lensId":"lens:material:lesson:tryout"},"kind":"section","order":1,"sourceRevision":"2026-08-12","countryKey":"test-country","examKey":"test-exam","questionCount":1,"questionSourcePath":"packages/corpus/question-bank/tryout/test-country/test-exam/test-track/test-set","sectionKey":"test-section","setKey":"test-set","timeLimitSeconds":60,"trackKey":"test-track","visibility":"internal-entry"}'
    );
    expect(canonicalizeTryoutCatalogFacts(markedSectionRow)).toBe(
      '{"graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:section","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:section","lensId":"lens:material:lesson:tryout"},"kind":"section","order":2,"sourceRevision":"2026-08-12","countryKey":"test-country","examKey":"test-exam","marks":{"blank":0,"correct":4,"wrong":-1},"questionCount":1,"questionSourcePath":"packages/corpus/question-bank/tryout/test-country/test-exam/test-track/test-set-2","sectionKey":"general","setKey":"test-set-2","timeLimitSeconds":90,"trackKey":"test-track","visibility":"visible"}'
    );
  });

  it.effect(
    "sorts shuffled literal rows by identity and pins the digest under two chunkings",
    () =>
      Effect.gen(function* () {
        const records = [
          markedSectionRow,
          trackRow,
          countryRow,
          openSetRow,
          examRow,
          entrySectionRow,
          entrySetRow,
        ].map(makeTryoutCatalogRecord);
        records.sort((left, right) =>
          compareTryoutCatalog(left.row, right.row)
        );
        const single = yield* digestTryoutCatalog(
          Stream.fromIterable(records).pipe(Stream.rechunk(1))
        );
        const triple = yield* digestTryoutCatalog(
          Stream.fromIterable(records).pipe(Stream.rechunk(3))
        );

        expect(records.map(({ row }) => tryoutCatalogIdentity(row))).toEqual([
          "en\u0000country\u0000test-country\u0000\u0000\u0000\u0000",
          "en\u0000exam\u0000test-country\u0000test-exam\u0000\u0000\u0000",
          "en\u0000section\u0000test-country\u0000test-exam\u0000test-track\u0000test-set\u0000test-section",
          "en\u0000section\u0000test-country\u0000test-exam\u0000test-track\u0000test-set-2\u0000general",
          "en\u0000set\u0000test-country\u0000test-exam\u0000test-track\u0000test-set\u0000",
          "en\u0000set\u0000test-country\u0000test-exam\u0000test-track\u0000test-set-2\u0000",
          "en\u0000track\u0000test-country\u0000test-exam\u0000test-track\u0000\u0000",
        ]);
        expect(single).toEqual({
          count: 7,
          digest:
            "sha256:a2d7c7c6cb32ec90fb858192642e6364cfb0ab4df0e0d72916fd6f926cea3ad2",
        });
        expect(triple).toEqual(single);
      })
  );
});
