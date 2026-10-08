import {
  Effect,
  MutableHashMap,
  type MutableHashSet,
  Option,
  Stream,
} from "effect";

import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import type { TryoutCatalogRecord } from "#contracts/tryout/catalog";
import {
  addLocale,
  type LocalesByIdentity,
  TryoutClosureError,
  validateLocales,
} from "#contracts/tryout/closure/accounting";
import {
  canonicalizeAssessedLanguagePlacementFacts,
  canonicalizeLocaleNeutralPlacementFacts,
} from "#contracts/tryout/closure/placement";
import {
  canonicalizeTryoutCatalogFacts,
  tryoutCatalogLogicalIdentity,
  tryoutSectionLogicalIdentity,
} from "#contracts/tryout/hash/catalog";
import { tryoutPlacementLogicalIdentity } from "#contracts/tryout/identity";
import type { TryoutPlacementRecord } from "#contracts/tryout/placement";
import {
  makeTryoutScoringFacts,
  recordTryoutScoringFacts,
  type TryoutScoringFacts,
  validateTryoutPlacementScoring,
  validateTryoutScoringFacts,
} from "#contracts/tryout/scoring";

/** Creates the catalog facts that one stream of catalog rows shares while it folds. */
function catalogClosureState(): {
  factsByIdentity: MutableHashMap.MutableHashMap<string, string>;
  localesByIdentity: LocalesByIdentity;
  scoring: TryoutScoringFacts;
  sections: MutableHashMap.MutableHashMap<string, number>;
} {
  return {
    factsByIdentity: MutableHashMap.empty<string, string>(),
    localesByIdentity: MutableHashMap.empty<
      string,
      MutableHashSet.MutableHashSet<AppLocale>
    >(),
    scoring: makeTryoutScoringFacts(),
    sections: MutableHashMap.empty<string, number>(),
  };
}

type CatalogClosureState = ReturnType<typeof catalogClosureState>;

/** Creates the placement facts that one stream of placements shares while it folds. */
function placementClosureState(): {
  assessedFacts: MutableHashMap.MutableHashMap<string, string>;
  countsBySectionLocale: MutableHashMap.MutableHashMap<string, number>;
  factsByIdentity: MutableHashMap.MutableHashMap<string, string>;
  localesByIdentity: LocalesByIdentity;
} {
  return {
    assessedFacts: MutableHashMap.empty<string, string>(),
    countsBySectionLocale: MutableHashMap.empty<string, number>(),
    factsByIdentity: MutableHashMap.empty<string, string>(),
    localesByIdentity: MutableHashMap.empty<
      string,
      MutableHashSet.MutableHashSet<AppLocale>
    >(),
  };
}

type PlacementClosureState = ReturnType<typeof placementClosureState>;

/** Adds one catalog row and compares its locale-neutral facts. */
function addCatalogRow(
  state: CatalogClosureState,
  activeAppLocales: ActiveAppLocaleList,
  row: TryoutCatalogRecord["row"]
) {
  const identity = tryoutCatalogLogicalIdentity(row);
  const facts = canonicalizeTryoutCatalogFacts(row);
  const expectedFacts = Option.getOrUndefined(
    MutableHashMap.get(state.factsByIdentity, identity)
  );
  if (expectedFacts !== undefined && expectedFacts !== facts) {
    return Effect.fail(
      new TryoutClosureError({
        actual: facts,
        code: "fact-mismatch",
        expected: expectedFacts,
        identity,
      })
    );
  }
  MutableHashMap.set(state.factsByIdentity, identity, facts);
  recordTryoutScoringFacts(state.scoring, row);
  if (row.kind === "section") {
    MutableHashMap.set(state.sections, identity, row.questionCount);
  }
  return addLocale(
    state.localesByIdentity,
    activeAppLocales,
    identity,
    row.appLocale
  ).pipe(Effect.as(state));
}

/** Adds one placement after binding it to a real catalog section. */
function addPlacement(
  state: PlacementClosureState,
  catalog: CatalogClosureState,
  activeAppLocales: ActiveAppLocaleList,
  row: TryoutPlacementRecord["row"]
) {
  const identity = tryoutPlacementLogicalIdentity(row);
  const sectionIdentity = tryoutSectionLogicalIdentity(row);
  if (!MutableHashMap.has(catalog.sections, sectionIdentity)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: "missing",
        code: "missing-section",
        expected: "catalog section",
        identity: sectionIdentity,
      })
    );
  }
  const facts = canonicalizeLocaleNeutralPlacementFacts(row);
  const expectedFacts = Option.getOrUndefined(
    MutableHashMap.get(state.factsByIdentity, identity)
  );
  if (expectedFacts !== undefined && expectedFacts !== facts) {
    return Effect.fail(
      new TryoutClosureError({
        actual: facts,
        code: "fact-mismatch",
        expected: expectedFacts,
        identity,
      })
    );
  }
  MutableHashMap.set(state.factsByIdentity, identity, facts);
  if (row.languagePolicy.kind === "fixed") {
    const assessedFacts = canonicalizeAssessedLanguagePlacementFacts(row);
    const expectedAssessedFacts = Option.getOrUndefined(
      MutableHashMap.get(state.assessedFacts, identity)
    );
    if (
      expectedAssessedFacts !== undefined &&
      expectedAssessedFacts !== assessedFacts
    ) {
      return Effect.fail(
        new TryoutClosureError({
          actual: assessedFacts,
          code: "assessed-language",
          expected: expectedAssessedFacts,
          identity,
        })
      );
    }
    MutableHashMap.set(state.assessedFacts, identity, assessedFacts);
  }
  const sectionLocaleIdentity = `${sectionIdentity}\0${row.appLocale}`;
  const count = Option.getOrElse(
    MutableHashMap.get(state.countsBySectionLocale, sectionLocaleIdentity),
    () => 0
  );
  MutableHashMap.set(
    state.countsBySectionLocale,
    sectionLocaleIdentity,
    count + 1
  );
  return validateTryoutPlacementScoring(catalog.scoring, row).pipe(
    Effect.andThen(
      addLocale(
        state.localesByIdentity,
        activeAppLocales,
        identity,
        row.appLocale
      )
    ),
    Effect.as(state)
  );
}

/** Confirms each localized section owns its declared question inventory. */
function validateQuestionCounts(
  catalog: CatalogClosureState,
  placements: PlacementClosureState,
  activeAppLocales: ActiveAppLocaleList
) {
  return Effect.forEach(
    catalog.sections,
    ([identity, questionCount]) =>
      Effect.forEach(
        activeAppLocales,
        (appLocale) => {
          const actual = Option.getOrElse(
            MutableHashMap.get(
              placements.countsBySectionLocale,
              `${identity}\0${appLocale}`
            ),
            () => 0
          );
          if (actual === questionCount) {
            return Effect.void;
          }
          return Effect.fail(
            new TryoutClosureError({
              actual: String(actual),
              code: "question-count",
              expected: String(questionCount),
              identity: `${identity}\0${appLocale}`,
            })
          );
        },
        { discard: true }
      ),
    { discard: true }
  );
}

/**
 * Verifies catalog facts, language policy, inventory, and scoring across app
 * locales in one pass over each stream.
 */
export const verifyTryoutLocaleClosure = Effect.fn(
  "AksaraContracts.verifyTryoutLocaleClosure"
)(function* <
  CatalogError,
  CatalogContext,
  PlacementError,
  PlacementContext,
>(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly catalog: Stream.Stream<
    TryoutCatalogRecord,
    CatalogError,
    CatalogContext
  >;
  readonly placements: Stream.Stream<
    TryoutPlacementRecord,
    PlacementError,
    PlacementContext
  >;
}) {
  const catalog = yield* input.catalog.pipe(
    Stream.runFoldEffect(catalogClosureState, (state, record) =>
      addCatalogRow(state, input.activeAppLocales, record.row)
    )
  );
  yield* validateLocales(catalog.localesByIdentity, input.activeAppLocales);
  yield* validateTryoutScoringFacts(catalog.scoring);

  const placements = yield* input.placements.pipe(
    Stream.runFoldEffect(placementClosureState, (state, record) =>
      addPlacement(state, catalog, input.activeAppLocales, record.row)
    )
  );
  yield* validateLocales(placements.localesByIdentity, input.activeAppLocales);
  yield* validateQuestionCounts(catalog, placements, input.activeAppLocales);
});
