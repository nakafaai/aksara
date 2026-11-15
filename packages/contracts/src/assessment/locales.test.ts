import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Option } from "effect";

import type { CatalogRow } from "#contracts/assessment/catalog";
import { catalogLocaleBreach } from "#contracts/assessment/locales";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  ActiveAppLocaleSchema,
} from "#contracts/locale";
import { makeAssessmentTestRecords } from "#contracts/test/assessment/snapshot";

const unwritten = ActiveAppLocaleListSchema.make([
  ActiveAppLocaleSchema.make("en"),
  ActiveAppLocaleSchema.make("id"),
  ActiveAppLocaleSchema.make("de"),
]);

/** The catalog of the test snapshot, served in every active locale. */
const fullCatalog = Effect.map(makeAssessmentTestRecords(), (records) =>
  Arr.flatMap(records, ({ row }) => (row.kind === "catalog" ? [row.row] : []))
);

/** Serves every node of a catalog without Malay, as a set not yet written in it. */
function withoutMalay(rows: readonly CatalogRow[]): readonly CatalogRow[] {
  return Arr.map(
    Arr.filter(rows, ({ appLocale }) => appLocale !== "ms"),
    (row) => ({ ...row, appLocales: unwritten })
  );
}

/** Whether a catalog is served where each of its nodes is. */
function isServed(rows: readonly CatalogRow[]) {
  return Option.isNone(catalogLocaleBreach(rows, ACTIVE_APP_LOCALES));
}

describe("catalog locales", () => {
  it.effect(
    "serves each node exactly in the locales of the sets beneath it",
    () =>
      Effect.gen(function* () {
        const rows = yield* fullCatalog;

        assert.isTrue(isServed(rows));
        assert.isTrue(isServed(withoutMalay(rows)));
      })
  );

  it.effect(
    "refuses a node served where no set beneath it is, or missing a row of a locale it serves",
    () =>
      Effect.gen(function* () {
        const rows = yield* fullCatalog;
        const partial = withoutMalay(rows);

        assert.isFalse(
          isServed([
            ...Arr.map(partial, (row) =>
              row.kind === "country"
                ? { ...row, appLocales: ACTIVE_APP_LOCALES }
                : row
            ),
            ...Arr.filter(
              rows,
              (row) => row.kind === "country" && row.appLocale === "ms"
            ),
          ])
        );
        assert.isFalse(
          isServed(
            Arr.filter(
              rows,
              (row) => !(row.kind === "track" && row.appLocale === "ms")
            )
          )
        );
        assert.isFalse(
          isServed(
            Arr.map(partial, (row) =>
              row.kind === "country" && row.appLocale === "en"
                ? { ...row, appLocale: ActiveAppLocaleSchema.make("ms") }
                : row
            )
          )
        );
        assert.isFalse(
          isServed(
            Arr.filter(rows, ({ kind }) => kind !== "set" && kind !== "section")
          )
        );
        assert.isTrue(Option.isSome(catalogLocaleBreach(rows, unwritten)));
      })
  );
});
