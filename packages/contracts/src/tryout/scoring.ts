import { Effect, Schema } from "effect";

import type { AppLocale } from "#contracts/locale";
import type {
  TryoutCatalogRow,
  TryoutSection,
  TryoutSet,
} from "#contracts/tryout/catalog";
import {
  tryoutCatalogIdentity,
  tryoutCatalogNodeIdentity,
  tryoutPlacementIdentity,
} from "#contracts/tryout/identity";
import type { TryoutPlacement } from "#contracts/tryout/placement";
import type { TryoutScoring } from "#contracts/tryout/spec";

/**
 * A signed try-out row cannot be scored as published. `strategy` means a set
 * disagrees with its exam's strategy, `marks` means a section of a penalized
 * set lacks marks or a section of another set has them, and `rubric` means a
 * rubric placement sits in a set that does not sum raw points.
 */
export class TryoutScoringError extends Schema.TaggedError<TryoutScoringError>()(
  "TryoutScoringError",
  {
    code: Schema.Literals(["marks", "rubric", "strategy"]),
    identity: Schema.String,
  }
) {}

/** Exam strategies, sets, and sections gathered while a catalog is read. */
export interface TryoutScoringFacts {
  readonly exams: Map<string, TryoutScoring>;
  readonly sections: TryoutSection[];
  readonly sets: Map<string, TryoutSet>;
}

/** Locale-specific set reference shared by sections and placements. */
interface TryoutSetReference {
  readonly appLocale: AppLocale;
  readonly countryKey: string;
  readonly examKey: string;
  readonly setKey: string;
  readonly trackKey: string;
}

/** Creates empty scoring facts for one snapshot verification pass. */
export function makeTryoutScoringFacts(): TryoutScoringFacts {
  return { exams: new Map(), sections: [], sets: new Map() };
}

/** Records the scoring facts carried by one localized catalog row. */
export function recordTryoutScoringFacts(
  facts: TryoutScoringFacts,
  row: TryoutCatalogRow
) {
  if (row.kind === "exam") {
    facts.exams.set(tryoutCatalogIdentity(row), row.scoringStrategy);
  }
  if (row.kind === "set") {
    facts.sets.set(tryoutCatalogIdentity(row), row);
  }
  if (row.kind === "section") {
    facts.sections.push(row);
  }
}

/** Returns the strategy of the set that owns one section or placement. */
function setStrategy(facts: TryoutScoringFacts, row: TryoutSetReference) {
  const identity = tryoutCatalogNodeIdentity({
    appLocale: row.appLocale,
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: "set",
    setKey: row.setKey,
    trackKey: row.trackKey,
  });
  return facts.sets.get(identity)?.scoringStrategy;
}

/** Requires one set to score with the strategy its exam declares. */
function validateSetStrategy(facts: TryoutScoringFacts, row: TryoutSet) {
  const exam = tryoutCatalogNodeIdentity({
    appLocale: row.appLocale,
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: "exam",
  });
  if (facts.exams.get(exam) === row.scoringStrategy) {
    return Effect.void;
  }
  return Effect.fail(
    new TryoutScoringError({
      code: "strategy",
      identity: tryoutCatalogIdentity(row),
    })
  );
}

/** Requires marks on exactly the sections of penalized sets. */
function validateSectionMarks(facts: TryoutScoringFacts, row: TryoutSection) {
  const penalized = setStrategy(facts, row) === "penalized";
  if (penalized === (row.marks !== undefined)) {
    return Effect.void;
  }
  return Effect.fail(
    new TryoutScoringError({
      code: "marks",
      identity: tryoutCatalogIdentity(row),
    })
  );
}

/**
 * Requires every set to repeat its exam's strategy and marks on exactly the
 * sections of penalized sets, once the complete catalog has been recorded.
 */
export const validateTryoutScoringFacts = Effect.fn(
  "AksaraContracts.validateTryoutScoringFacts"
)(function* (facts: TryoutScoringFacts) {
  yield* Effect.forEach(
    facts.sets.values(),
    (row) => validateSetStrategy(facts, row),
    { discard: true }
  );
  yield* Effect.forEach(
    facts.sections,
    (row) => validateSectionMarks(facts, row),
    { discard: true }
  );
});

/**
 * Requires one rubric placement to belong to a raw-scored set, because a
 * rubric awards points per criterion instead of a correct or wrong outcome.
 */
export function validateTryoutPlacementScoring(
  facts: TryoutScoringFacts,
  row: TryoutPlacement
) {
  if (row.response.kind !== "rubric" || setStrategy(facts, row) === "raw") {
    return Effect.void;
  }
  return Effect.fail(
    new TryoutScoringError({
      code: "rubric",
      identity: tryoutPlacementIdentity(row),
    })
  );
}
