import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";

import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "#contracts/locale";
import { makeTryoutTestRows } from "#contracts/test/tryout";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRowSchema,
} from "#contracts/tryout/catalog";
import { makeTryoutCatalogRecord } from "#contracts/tryout/catalog-hash";
import {
  TryoutClosureError,
  verifyTryoutLocaleClosure,
} from "#contracts/tryout/locale-closure";
import {
  type TryoutPlacementRecord,
  TryoutPlacementSchema,
} from "#contracts/tryout/placement";
import { makeTryoutPlacementRecord } from "#contracts/tryout/placement-hash";

const activeAppLocales = ACTIVE_APP_LOCALES;
const { catalog, placements } = makeTryoutTestRows();

/** Rebuilds one valid catalog record after a test-owned field change. */
const updateCatalog = Effect.fn("AksaraContracts.test.updateTryoutCatalog")(
  function* (
    record: TryoutCatalogRecord,
    fields: Readonly<Record<string, unknown>>
  ) {
    const row = yield* Schema.decodeEffect(TryoutCatalogRowSchema)({
      ...record.row,
      ...fields,
    });
    return makeTryoutCatalogRecord(row);
  }
);

/** Rebinds one valid placement to the English assessed-language section. */
const englishPlacement = Effect.fn(
  "AksaraContracts.test.makeEnglishTryoutPlacement"
)(function* (record: TryoutPlacementRecord) {
  const root =
    "question-bank/tryout/indonesia/snbt/english-language/set-1/question-1";
  const row = yield* Schema.decodeEffect(TryoutPlacementSchema)({
    ...record.row,
    answerContentKey: `${root}/answer`,
    deliveryLanguage: "en",
    languagePolicy: { kind: "fixed", language: "en" },
    questionArtifactLocale: "en",
    questionContentKey: `${root}/question`,
    questionSourcePath: `packages/corpus/${root}`,
    sectionKey: "english-language",
  });
  return makeTryoutPlacementRecord(row);
});

/** Returns one typed current try-out locale closure failure. */
const rejectClosure = Effect.fn("AksaraContracts.test.rejectTryoutClosure")(
  function* (input: {
    readonly activeAppLocales?: typeof activeAppLocales;
    readonly catalog?: readonly TryoutCatalogRecord[];
    readonly placements?: readonly TryoutPlacementRecord[];
  }) {
    return yield* verifyTryoutLocaleClosure({
      activeAppLocales: input.activeAppLocales ?? activeAppLocales,
      catalog: Stream.fromIterable(input.catalog ?? catalog),
      placements: Stream.fromIterable(input.placements ?? placements),
    }).pipe(Effect.flip);
  }
);

describe("try-out locale closure", () => {
  it.effect("accepts one catalog and placement row per active app locale", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyTryoutLocaleClosure({
          activeAppLocales,
          catalog: Stream.fromIterable(catalog),
          placements: Stream.fromIterable(placements),
        })
      ).toBeUndefined();
    })
  );

  it.effect(
    "accepts complete German rows independent of canonical stream order",
    () =>
      Effect.gen(function* () {
        const germanAppLocales = yield* Schema.decodeEffect(
          ActiveAppLocaleListSchema
        )(["en", "id", "de"]);
        const germanRows = makeTryoutTestRows([
          AppLocaleSchema.make("de"),
          AppLocaleSchema.make("en"),
          AppLocaleSchema.make("id"),
        ]);

        expect(
          yield* verifyTryoutLocaleClosure({
            activeAppLocales: germanAppLocales,
            catalog: Stream.fromIterable(germanRows.catalog),
            placements: Stream.fromIterable(germanRows.placements),
          })
        ).toBeUndefined();
      })
  );

  it.effect("rejects missing German catalog and placement rows", () =>
    Effect.gen(function* () {
      const germanLocales = yield* Schema.decodeEffect(
        ActiveAppLocaleListSchema
      )(["en", "de"]);
      const error = yield* rejectClosure({
        activeAppLocales: germanLocales,
      });

      expect(error).toBeInstanceOf(TryoutClosureError);
      expect(error.code).toBe("inactive-locale");
      expect(error.actual).toBe("id");
      expect(error.expected).toBe('["en","de"]');
    })
  );

  it.effect("rejects duplicate catalog and placement locale rows", () =>
    Effect.gen(function* () {
      const firstCatalog = yield* Effect.fromNullishOr(catalog[0]);
      const firstPlacement = yield* Effect.fromNullishOr(placements[0]);
      const [catalogError, placementError] = yield* Effect.all(
        [
          rejectClosure({ catalog: [firstCatalog, ...catalog] }),
          rejectClosure({ placements: [firstPlacement, ...placements] }),
        ],
        { concurrency: "unbounded" }
      );

      expect(catalogError).toBeInstanceOf(TryoutClosureError);
      expect(catalogError.code).toBe("duplicate-locale");
      expect(placementError).toBeInstanceOf(TryoutClosureError);
      expect(placementError.code).toBe("duplicate-locale");
    })
  );

  it.effect("rejects empty catalog and placement streams", () =>
    Effect.gen(function* () {
      const [catalogError, placementError] = yield* Effect.all(
        [rejectClosure({ catalog: [] }), rejectClosure({ placements: [] })],
        { concurrency: "unbounded" }
      );

      expect(catalogError).toBeInstanceOf(TryoutClosureError);
      expect(catalogError.code).toBe("missing-locale");
      expect(catalogError.identity).toBe("empty");
      expect(placementError).toBeInstanceOf(TryoutClosureError);
      expect(placementError.code).toBe("missing-locale");
      expect(placementError.identity).toBe("empty");
    })
  );

  it.effect("rejects a nonempty hierarchy missing one active locale", () =>
    Effect.gen(function* () {
      const error = yield* rejectClosure({ catalog: catalog.slice(1) });

      expect(error.code).toBe("missing-locale");
      expect(error.identity).not.toBe("empty");
    })
  );

  it.effect("rejects locale-neutral catalog fact drift", () =>
    Effect.gen(function* () {
      const countryIndex = catalog.findIndex(
        ({ row }) => row.kind === "country" && row.appLocale === "id"
      );
      const country = yield* Effect.fromNullishOr(catalog[countryIndex]);
      const changed = [...catalog];
      changed[countryIndex] = yield* updateCatalog(country, {
        countryCode: "DE",
      });

      const error = yield* rejectClosure({ catalog: changed });
      expect(error.code).toBe("fact-mismatch");
    })
  );

  it.effect("rejects placements whose catalog section is absent", () =>
    Effect.gen(function* () {
      const withoutSections = catalog.filter(
        ({ row }) => row.kind !== "section"
      );
      const error = yield* rejectClosure({ catalog: withoutSections });

      expect(error.code).toBe("missing-section");
    })
  );

  it.effect("reuses assessed-language prompt facts across app locales", () =>
    Effect.gen(function* () {
      const assessedCatalog = yield* Effect.forEach(catalog, (record) =>
        record.row.kind === "section"
          ? updateCatalog(record, {
              questionSourcePath:
                "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1",
              sectionKey: "english-language",
            })
          : Effect.succeed(record)
      );
      const assessedPlacements = yield* Effect.forEach(
        placements,
        englishPlacement
      );

      expect(
        yield* verifyTryoutLocaleClosure({
          activeAppLocales,
          catalog: Stream.fromIterable(assessedCatalog),
          placements: Stream.fromIterable(assessedPlacements),
        })
      ).toBeUndefined();

      const changed = yield* Effect.forEach(assessedPlacements, (record) =>
        record.row.appLocale === "id"
          ? Schema.decodeEffect(TryoutPlacementSchema)({
              ...record.row,
              questionArtifactHash: `sha256:${"b".repeat(64)}`,
            }).pipe(Effect.map(makeTryoutPlacementRecord))
          : Effect.succeed(record)
      );
      const error = yield* rejectClosure({
        catalog: assessedCatalog,
        placements: changed,
      });
      expect(error.code).toBe("assessed-language");
    })
  );

  it.effect(
    "rejects declared section counts that do not match placements",
    () =>
      Effect.gen(function* () {
        const changed = yield* Effect.forEach(catalog, (record) =>
          record.row.kind === "section"
            ? updateCatalog(record, { questionCount: 2 })
            : Effect.succeed(record)
        );
        const error = yield* rejectClosure({ catalog: changed });

        expect(error.code).toBe("question-count");
        expect(error.actual).toBe("1");
        expect(error.expected).toBe("2");
      })
  );

  it.effect("rejects a localized section with no placements", () =>
    Effect.gen(function* () {
      const unused = yield* Effect.forEach(
        catalog.filter(({ row }) => row.kind === "section"),
        (record) =>
          updateCatalog(record, {
            questionSourcePath:
              "packages/corpus/question-bank/tryout/indonesia/snbt/unused/set-1",
            sectionKey: "unused",
          })
      );
      const error = yield* rejectClosure({ catalog: [...catalog, ...unused] });

      expect(error.code).toBe("question-count");
      expect(error.actual).toBe("0");
    })
  );
});
