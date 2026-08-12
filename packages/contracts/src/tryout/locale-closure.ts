import { Effect, Schema, Stream } from "effect";

import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import { tryoutCatalogV2LogicalIdentity } from "#contracts/tryout/catalog-hash";
import type { TryoutCatalogV2Record } from "#contracts/tryout/catalog-v2";
import { tryoutPlacementV2LogicalIdentity } from "#contracts/tryout/identity";
import type { TryoutPlacementV2Record } from "#contracts/tryout/placement";

/** A current try-out snapshot does not close over its active app locales. */
export class TryoutLocaleClosureError extends Schema.TaggedError<TryoutLocaleClosureError>()(
  "TryoutLocaleClosureError",
  {
    actual: Schema.Array(Schema.String),
    expected: Schema.Array(Schema.String),
    identity: Schema.String,
    scope: Schema.Literal("catalog", "placement"),
  }
) {}

interface LocaleClosureState {
  readonly localesByIdentity: Map<string, Set<AppLocale>>;
}

/** Adds one locale identity or reports a duplicate placement policy row. */
function addLocale(
  state: LocaleClosureState,
  identity: string,
  appLocale: AppLocale,
  scope: "catalog" | "placement"
) {
  const locales = state.localesByIdentity.get(identity) ?? new Set<AppLocale>();
  if (locales.has(appLocale)) {
    return Effect.fail(
      new TryoutLocaleClosureError({
        actual: [...locales],
        expected: [],
        identity,
        scope,
      })
    );
  }
  locales.add(appLocale);
  state.localesByIdentity.set(identity, locales);
  return Effect.succeed(state);
}

/** Confirms every logical row has exactly the active application locales. */
function validateClosure(
  state: LocaleClosureState,
  activeAppLocales: ActiveAppLocaleList,
  scope: "catalog" | "placement"
) {
  if (state.localesByIdentity.size === 0) {
    return Effect.fail(
      new TryoutLocaleClosureError({
        actual: [],
        expected: [...activeAppLocales],
        identity: "empty",
        scope,
      })
    );
  }
  return Effect.forEach(
    state.localesByIdentity,
    ([identity, locales]) => {
      const actual = [...locales].sort();
      const expected = [...activeAppLocales].sort();
      if (JSON.stringify(actual) === JSON.stringify(expected)) {
        return Effect.void;
      }
      return Effect.fail(
        new TryoutLocaleClosureError({ actual, expected, identity, scope })
      );
    },
    { discard: true }
  );
}

/** Verifies current catalog and placement coverage for every active locale. */
export const verifyTryoutV2LocaleClosure = Effect.fn(
  "AksaraContracts.verifyTryoutV2LocaleClosure"
)(function* <
  CatalogError,
  CatalogContext,
  PlacementError,
  PlacementContext,
>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly catalog: Stream.Stream<
    TryoutCatalogV2Record,
    CatalogError,
    CatalogContext
  >;
  readonly placements: Stream.Stream<
    TryoutPlacementV2Record,
    PlacementError,
    PlacementContext
  >;
}) {
  const catalogState = yield* input.catalog.pipe(
    Stream.runFoldEffect(
      { localesByIdentity: new Map() } satisfies LocaleClosureState,
      (state, { row }) =>
        addLocale(
          state,
          tryoutCatalogV2LogicalIdentity(row),
          row.appLocale,
          "catalog"
        )
    )
  );
  const placementState = yield* input.placements.pipe(
    Stream.runFoldEffect(
      { localesByIdentity: new Map() } satisfies LocaleClosureState,
      (state, { row }) =>
        addLocale(
          state,
          tryoutPlacementV2LogicalIdentity(row),
          row.appLocale,
          "placement"
        )
    )
  );
  yield* validateClosure(catalogState, input.activeAppLocales, "catalog");
  yield* validateClosure(placementState, input.activeAppLocales, "placement");
});
