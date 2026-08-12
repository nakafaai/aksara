import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";

import { ActiveAppLocaleListSchema } from "#contracts/locale";
import { makeTryoutV2TestRows } from "#contracts/test/tryout-v2";
import type { TryoutCatalogV2Record } from "#contracts/tryout/catalog-v2";
import { verifyTryoutV2LocaleClosure } from "#contracts/tryout/locale-closure";
import type { TryoutPlacementV2Record } from "#contracts/tryout/placement";

const activeAppLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
  "en",
  "id",
]);
const { catalog, placements } = makeTryoutV2TestRows();

/** Returns one typed current try-out locale closure failure. */
function reject(input: {
  readonly activeAppLocales?: typeof activeAppLocales;
  readonly catalog?: readonly TryoutCatalogV2Record[];
  readonly placements?: readonly TryoutPlacementV2Record[];
}) {
  return Effect.runPromise(
    verifyTryoutV2LocaleClosure({
      activeAppLocales: input.activeAppLocales ?? activeAppLocales,
      catalog: Stream.fromIterable(input.catalog ?? catalog),
      placements: Stream.fromIterable(input.placements ?? placements),
    }).pipe(Effect.flip)
  );
}

describe("try-out v2 locale closure", () => {
  it("accepts one catalog and placement row per active app locale", async () => {
    await expect(
      Effect.runPromise(
        verifyTryoutV2LocaleClosure({
          activeAppLocales,
          catalog: Stream.fromIterable(catalog),
          placements: Stream.fromIterable(placements),
        })
      )
    ).resolves.toBeUndefined();
  });

  it("rejects missing German catalog and placement rows", async () => {
    const germanLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
      "en",
      "de",
    ]);
    const error = await reject({ activeAppLocales: germanLocales });

    expect(error).toMatchObject({
      _tag: "TryoutLocaleClosureError",
      actual: ["en", "id"],
      expected: ["de", "en"],
      scope: "catalog",
    });
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

    expect(catalogError).toMatchObject({
      _tag: "TryoutLocaleClosureError",
      scope: "catalog",
    });
    expect(placementError).toMatchObject({
      _tag: "TryoutLocaleClosureError",
      scope: "placement",
    });
  });

  it("rejects empty catalog and placement streams", async () => {
    const [catalogError, placementError] = await Promise.all([
      reject({ catalog: [] }),
      reject({ placements: [] }),
    ]);

    expect(catalogError).toMatchObject({
      _tag: "TryoutLocaleClosureError",
      identity: "empty",
      scope: "catalog",
    });
    expect(placementError).toMatchObject({
      _tag: "TryoutLocaleClosureError",
      identity: "empty",
      scope: "placement",
    });
  });
});
