import { describe, expect, it } from "@nakafa/testing/effect";
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
function updateCatalog(
  record: TryoutCatalogRecord,
  fields: Readonly<Record<string, unknown>>
) {
  return makeTryoutCatalogRecord(
    Schema.decodeSync(TryoutCatalogRowSchema)({
      ...record.row,
      ...fields,
    })
  );
}

/** Rebinds one valid placement to the English assessed-language section. */
function englishPlacement(record: TryoutPlacementRecord) {
  const root =
    "question-bank/tryout/indonesia/snbt/english-language/set-1/question-1";
  return makeTryoutPlacementRecord(
    Schema.decodeSync(TryoutPlacementSchema)({
      ...record.row,
      answerContentKey: `${root}/answer`,
      deliveryLanguage: "en",
      questionArtifactLocale: "en",
      questionContentKey: `${root}/question`,
      questionSourcePath: `packages/corpus/${root}`,
      sectionKey: "english-language",
    })
  );
}

/** Returns one typed current try-out locale closure failure. */
function reject(input: {
  readonly activeAppLocales?: typeof activeAppLocales;
  readonly catalog?: readonly TryoutCatalogRecord[];
  readonly placements?: readonly TryoutPlacementRecord[];
}) {
  return Effect.runPromise(
    verifyTryoutLocaleClosure({
      activeAppLocales: input.activeAppLocales ?? activeAppLocales,
      catalog: Stream.fromIterable(input.catalog ?? catalog),
      placements: Stream.fromIterable(input.placements ?? placements),
    }).pipe(Effect.flip)
  );
}

describe("try-out locale closure", () => {
  it("accepts one catalog and placement row per active app locale", async () => {
    await expect(
      Effect.runPromise(
        verifyTryoutLocaleClosure({
          activeAppLocales,
          catalog: Stream.fromIterable(catalog),
          placements: Stream.fromIterable(placements),
        })
      )
    ).resolves.toBeUndefined();
  });

  it("accepts complete German rows independent of canonical stream order", async () => {
    const germanAppLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "id",
      "de",
    ]);
    const germanRows = makeTryoutTestRows([
      AppLocaleSchema.make("de"),
      AppLocaleSchema.make("en"),
      AppLocaleSchema.make("id"),
    ]);

    await expect(
      Effect.runPromise(
        verifyTryoutLocaleClosure({
          activeAppLocales: germanAppLocales,
          catalog: Stream.fromIterable(germanRows.catalog),
          placements: Stream.fromIterable(germanRows.placements),
        })
      )
    ).resolves.toBeUndefined();
  });

  it("rejects missing German catalog and placement rows", async () => {
    const germanLocales = Schema.decodeSync(ActiveAppLocaleListSchema)([
      "en",
      "de",
    ]);
    const error = await reject({ activeAppLocales: germanLocales });

    expect(error).toBeInstanceOf(TryoutClosureError);
    expect(error.code).toBe("inactive-locale");
    expect(error.actual).toBe("id");
    expect(error.expected).toBe('["en","de"]');
  });

  it("rejects duplicate catalog and placement locale rows", async () => {
    const [firstCatalog] = catalog;
    const [firstPlacement] = placements;
    if (!(firstCatalog && firstPlacement)) {
      throw new Error("Expected current try-out closure fixtures.");
    }
    const [catalogError, placementError] = await Promise.all([
      reject({ catalog: [firstCatalog, ...catalog] }),
      reject({ placements: [firstPlacement, ...placements] }),
    ]);

    expect(catalogError).toBeInstanceOf(TryoutClosureError);
    expect(catalogError.code).toBe("duplicate-locale");
    expect(placementError).toBeInstanceOf(TryoutClosureError);
    expect(placementError.code).toBe("duplicate-locale");
  });

  it("rejects empty catalog and placement streams", async () => {
    const [catalogError, placementError] = await Promise.all([
      reject({ catalog: [] }),
      reject({ placements: [] }),
    ]);

    expect(catalogError).toBeInstanceOf(TryoutClosureError);
    expect(catalogError.code).toBe("missing-locale");
    expect(catalogError.identity).toBe("empty");
    expect(placementError).toBeInstanceOf(TryoutClosureError);
    expect(placementError.code).toBe("missing-locale");
    expect(placementError.identity).toBe("empty");
  });

  it("rejects a nonempty hierarchy missing one active locale", async () => {
    const error = await reject({ catalog: catalog.slice(1) });

    expect(error.code).toBe("missing-locale");
    expect(error.identity).not.toBe("empty");
  });

  it("rejects locale-neutral catalog fact drift", async () => {
    const countryIndex = catalog.findIndex(
      ({ row }) => row.kind === "country" && row.appLocale === "id"
    );
    const country = catalog[countryIndex];
    if (!country) {
      throw new Error("Expected an Indonesian country fixture.");
    }
    const changed = [...catalog];
    changed[countryIndex] = updateCatalog(country, { countryCode: "DE" });

    const error = await reject({ catalog: changed });
    expect(error.code).toBe("fact-mismatch");
  });

  it("rejects placements whose catalog section is absent", async () => {
    const withoutSections = catalog.filter(({ row }) => row.kind !== "section");
    const error = await reject({ catalog: withoutSections });

    expect(error.code).toBe("missing-section");
  });

  it("reuses assessed-language prompt facts across app locales", async () => {
    const assessedCatalog = catalog.map((record) =>
      record.row.kind === "section"
        ? updateCatalog(record, {
            questionSourcePath:
              "packages/corpus/question-bank/tryout/indonesia/snbt/english-language/set-1",
            sectionKey: "english-language",
          })
        : record
    );
    const assessedPlacements = placements.map(englishPlacement);

    await expect(
      Effect.runPromise(
        verifyTryoutLocaleClosure({
          activeAppLocales,
          catalog: Stream.fromIterable(assessedCatalog),
          placements: Stream.fromIterable(assessedPlacements),
        })
      )
    ).resolves.toBeUndefined();

    const changed = assessedPlacements.map((record) =>
      record.row.appLocale === "id"
        ? makeTryoutPlacementRecord(
            Schema.decodeSync(TryoutPlacementSchema)({
              ...record.row,
              questionArtifactHash: `sha256:${"b".repeat(64)}`,
            })
          )
        : record
    );
    const error = await reject({
      catalog: assessedCatalog,
      placements: changed,
    });
    expect(error.code).toBe("assessed-language");
  });

  it("rejects declared section counts that do not match placements", async () => {
    const changed = catalog.map((record) =>
      record.row.kind === "section"
        ? updateCatalog(record, { questionCount: 2 })
        : record
    );
    const error = await reject({ catalog: changed });

    expect(error.code).toBe("question-count");
    expect(error.actual).toBe("1");
    expect(error.expected).toBe("2");
  });

  it("rejects a localized section with no placements", async () => {
    const unused = catalog
      .filter(({ row }) => row.kind === "section")
      .map((record) =>
        updateCatalog(record, {
          questionSourcePath:
            "packages/corpus/question-bank/tryout/indonesia/snbt/unused/set-1",
          sectionKey: "unused",
        })
      );
    const error = await reject({ catalog: [...catalog, ...unused] });

    expect(error.code).toBe("question-count");
    expect(error.actual).toBe("0");
  });
});
