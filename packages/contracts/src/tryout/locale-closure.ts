import { Effect, Stream } from "effect";

import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import type { TryoutCatalogRecord } from "#contracts/tryout/catalog";
import {
  canonicalizeTryoutCatalogFacts,
  tryoutCatalogLogicalIdentity,
  tryoutSectionLogicalIdentity,
} from "#contracts/tryout/catalog-hash";
import { tryoutPlacementLogicalIdentity } from "#contracts/tryout/identity";
import {
  addLocale,
  TryoutClosureError,
  validateLocales,
} from "#contracts/tryout/locales";
import type { TryoutPlacementRecord } from "#contracts/tryout/placement";
import {
  canonicalizeAssessedLanguagePlacementFacts,
  canonicalizeLocaleNeutralPlacementFacts,
} from "#contracts/tryout/placement-closure";
import {
  makeTryoutScoringFacts,
  recordTryoutScoringFacts,
  type TryoutScoringFacts,
  validateTryoutPlacementScoring,
  validateTryoutScoringFacts,
} from "#contracts/tryout/scoring";

interface CatalogClosureState {
  readonly factsByIdentity: Map<string, string>;
  readonly localesByIdentity: Map<string, Set<AppLocale>>;
  readonly scoring: TryoutScoringFacts;
  readonly sections: Map<string, number>;
}

interface PlacementClosureState {
  readonly assessedFacts: Map<string, string>;
  readonly countsBySectionLocale: Map<string, number>;
  readonly factsByIdentity: Map<string, string>;
  readonly localesByIdentity: Map<string, Set<AppLocale>>;
}

/** Adds one catalog row and compares its locale-neutral facts. */
function addCatalogRow(
  state: CatalogClosureState,
  activeAppLocales: ActiveAppLocaleList,
  row: TryoutCatalogRecord["row"]
) {
  const identity = tryoutCatalogLogicalIdentity(row);
  const facts = canonicalizeTryoutCatalogFacts(row);
  const expectedFacts = state.factsByIdentity.get(identity);
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
  state.factsByIdentity.set(identity, facts);
  recordTryoutScoringFacts(state.scoring, row);
  if (row.kind === "section") {
    state.sections.set(identity, row.questionCount);
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
  if (!catalog.sections.has(sectionIdentity)) {
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
  const expectedFacts = state.factsByIdentity.get(identity);
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
  state.factsByIdentity.set(identity, facts);
  if (row.languagePolicy.kind === "fixed") {
    const assessedFacts = canonicalizeAssessedLanguagePlacementFacts(row);
    const expectedAssessedFacts = state.assessedFacts.get(identity);
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
    state.assessedFacts.set(identity, assessedFacts);
  }
  const sectionLocaleIdentity = `${sectionIdentity}\0${row.appLocale}`;
  state.countsBySectionLocale.set(
    sectionLocaleIdentity,
    (state.countsBySectionLocale.get(sectionLocaleIdentity) ?? 0) + 1
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
          const actual =
            placements.countsBySectionLocale.get(`${identity}\0${appLocale}`) ??
            0;
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
    Stream.runFoldEffect(
      () =>
        ({
          factsByIdentity: new Map(),
          localesByIdentity: new Map(),
          scoring: makeTryoutScoringFacts(),
          sections: new Map(),
        }) satisfies CatalogClosureState,
      (state, record) =>
        addCatalogRow(state, input.activeAppLocales, record.row)
    )
  );
  yield* validateLocales(catalog.localesByIdentity, input.activeAppLocales);
  yield* validateTryoutScoringFacts(catalog.scoring);

  const placements = yield* input.placements.pipe(
    Stream.runFoldEffect(
      () =>
        ({
          assessedFacts: new Map(),
          countsBySectionLocale: new Map(),
          factsByIdentity: new Map(),
          localesByIdentity: new Map(),
        }) satisfies PlacementClosureState,
      (state, record) =>
        addPlacement(state, catalog, input.activeAppLocales, record.row)
    )
  );
  yield* validateLocales(placements.localesByIdentity, input.activeAppLocales);
  yield* validateQuestionCounts(catalog, placements, input.activeAppLocales);
});
