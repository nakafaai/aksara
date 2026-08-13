import { Effect, Schema, Stream } from "effect";

import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import type { TryoutCatalogRecord } from "#contracts/tryout/catalog";
import {
  canonicalizeTryoutCatalogFacts,
  tryoutCatalogLogicalIdentity,
  tryoutSectionLogicalIdentity,
} from "#contracts/tryout/catalog-hash";
import { tryoutPlacementLogicalIdentity } from "#contracts/tryout/identity";
import {
  ENGLISH_LANGUAGE_SECTION_KEY,
  INDONESIAN_LANGUAGE_SECTION_KEY,
} from "#contracts/tryout/language";
import type { TryoutPlacementRecord } from "#contracts/tryout/placement";

/** A try-out snapshot is incomplete or inconsistent across app locales. */
export class TryoutClosureError extends Schema.TaggedError<TryoutClosureError>()(
  "TryoutClosureError",
  {
    actual: Schema.String,
    code: Schema.Literal(
      "assessed-language",
      "duplicate-locale",
      "fact-mismatch",
      "inactive-locale",
      "missing-locale",
      "missing-section",
      "question-count"
    ),
    expected: Schema.String,
    identity: Schema.String,
  }
) {}

interface CatalogClosureState {
  readonly factsByIdentity: Map<string, string>;
  readonly localesByIdentity: Map<string, Set<AppLocale>>;
  readonly sections: Map<string, number>;
}

interface PlacementClosureState {
  readonly assessedFacts: Map<string, string>;
  readonly countsBySectionLocale: Map<string, number>;
  readonly localesByIdentity: Map<string, Set<AppLocale>>;
}

/** Serializes locale sets through the active list's signed canonical order. */
function localeSetIdentity(
  locales: ReadonlySet<AppLocale>,
  activeAppLocales: ActiveAppLocaleList
) {
  return JSON.stringify(
    activeAppLocales.filter((locale) => locales.has(locale))
  );
}

/** Adds one active locale to a logical identity without duplicates. */
function addLocale(
  localesByIdentity: Map<string, Set<AppLocale>>,
  activeAppLocales: ActiveAppLocaleList,
  identity: string,
  appLocale: AppLocale
) {
  if (!activeAppLocales.includes(appLocale)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: appLocale,
        code: "inactive-locale",
        expected: JSON.stringify(activeAppLocales),
        identity,
      })
    );
  }
  const locales = localesByIdentity.get(identity) ?? new Set<AppLocale>();
  if (locales.has(appLocale)) {
    return Effect.fail(
      new TryoutClosureError({
        actual: appLocale,
        code: "duplicate-locale",
        expected: "one row per active app locale",
        identity,
      })
    );
  }
  locales.add(appLocale);
  localesByIdentity.set(identity, locales);
  return Effect.void;
}

/** Confirms every logical row closes over the exact active locale list. */
function validateLocales(
  localesByIdentity: Map<string, Set<AppLocale>>,
  activeAppLocales: ActiveAppLocaleList
) {
  if (localesByIdentity.size === 0) {
    return Effect.fail(
      new TryoutClosureError({
        actual: "[]",
        code: "missing-locale",
        expected: JSON.stringify(activeAppLocales),
        identity: "empty",
      })
    );
  }
  return Effect.forEach(
    localesByIdentity,
    ([identity, locales]) => {
      const actual = localeSetIdentity(locales, activeAppLocales);
      const expected = JSON.stringify(activeAppLocales);
      if (actual === expected) {
        return Effect.void;
      }
      return Effect.fail(
        new TryoutClosureError({
          actual,
          code: "missing-locale",
          expected,
          identity,
        })
      );
    },
    { discard: true }
  );
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

/** Serializes assessed prompt facts that must be reused across app locales. */
function assessedLanguageFacts(row: TryoutPlacementRecord["row"]) {
  return JSON.stringify({
    choices: row.choices,
    deliveryLanguage: row.deliveryLanguage,
    questionArtifactHash: row.questionArtifactHash,
    questionArtifactLocale: row.questionArtifactLocale,
    questionContentKey: row.questionContentKey,
  });
}

/** Checks whether one section owns byte-identical assessed-language content. */
function isAssessedLanguageSection(sectionKey: string) {
  return (
    sectionKey === ENGLISH_LANGUAGE_SECTION_KEY ||
    sectionKey === INDONESIAN_LANGUAGE_SECTION_KEY
  );
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
  if (isAssessedLanguageSection(row.sectionKey)) {
    const facts = assessedLanguageFacts(row);
    const expectedFacts = state.assessedFacts.get(identity);
    if (expectedFacts !== undefined && expectedFacts !== facts) {
      return Effect.fail(
        new TryoutClosureError({
          actual: facts,
          code: "assessed-language",
          expected: expectedFacts,
          identity,
        })
      );
    }
    state.assessedFacts.set(identity, facts);
  }
  const sectionLocaleIdentity = `${sectionIdentity}\0${row.appLocale}`;
  state.countsBySectionLocale.set(
    sectionLocaleIdentity,
    (state.countsBySectionLocale.get(sectionLocaleIdentity) ?? 0) + 1
  );
  return addLocale(
    state.localesByIdentity,
    activeAppLocales,
    identity,
    row.appLocale
  ).pipe(Effect.as(state));
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

/** Verifies catalog facts, language policy, and inventory across app locales. */
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
      {
        factsByIdentity: new Map(),
        localesByIdentity: new Map(),
        sections: new Map(),
      } satisfies CatalogClosureState,
      (state, record) =>
        addCatalogRow(state, input.activeAppLocales, record.row)
    )
  );
  yield* validateLocales(catalog.localesByIdentity, input.activeAppLocales);

  const placements = yield* input.placements.pipe(
    Stream.runFoldEffect(
      {
        assessedFacts: new Map(),
        countsBySectionLocale: new Map(),
        localesByIdentity: new Map(),
      } satisfies PlacementClosureState,
      (state, record) =>
        addPlacement(state, catalog, input.activeAppLocales, record.row)
    )
  );
  yield* validateLocales(placements.localesByIdentity, input.activeAppLocales);
  yield* validateQuestionCounts(catalog, placements, input.activeAppLocales);
});
