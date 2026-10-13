import { Array as Arr, Match, Schema } from "effect";

import { hasUniqueIds, LocalIdSchema } from "#contracts/assessment/identity";
import type { Interaction } from "#contracts/assessment/interaction";
import {
  LocalizedTextSchema,
  NonNegativeIntSchema,
  PlainTextSchema,
  PositiveIntSchema,
} from "#contracts/assessment/scalar";

/**
 * All or nothing: category 1 for a fully correct answer and 0 for any other,
 * so k is 1. It is `match_correct` of QTI response processing.
 *
 * Scoring is data. The outcome of an interaction is a score category from 0 to
 * k, where k is the most points its rule can award, so a partial score can
 * enter an IRT model through GPCM later.
 */
export const AllOrNothingRuleSchema = Schema.Struct({
  kind: Schema.Literal("allOrNothing"),
});

/**
 * Points for each correct part, an optional penalty for each wrong part, and a
 * floor that the score never falls below. Because an outcome is a category
 * from 0, the floor is zero or more. It is `map_response` of QTI response
 * processing: a `qti-mapping` whose map entries are the correct parts, whose
 * `default-value` is the negative of the penalty, and whose `lower-bound` is
 * the floor.
 */
export const PerPartRuleSchema = Schema.Struct({
  floor: NonNegativeIntSchema,
  kind: Schema.Literal("perPart"),
  penaltyPerWrongPart: Schema.optionalKey(PositiveIntSchema),
  pointsPerPart: PositiveIntSchema,
});

const RubricLevelSchema = Schema.Struct({
  id: LocalIdSchema,
  label: PlainTextSchema,
  points: NonNegativeIntSchema,
});

/** Checks that each level is worth more than the one below it. */
function hasAscendingPoints(
  levels: readonly (typeof RubricLevelSchema.Type)[]
) {
  return Arr.every(
    Arr.zip(levels, Arr.drop(levels, 1)),
    ([lower, higher]) => lower.points < higher.points
  );
}

const RubricCriterionSchema = Schema.Struct({
  id: LocalIdSchema,
  label: PlainTextSchema,
  levels: Schema.Array(RubricLevelSchema).check(
    Schema.isMinLength(2),
    Schema.makeFilter(hasUniqueIds, {
      message: "Expected each level to have its own identifier.",
    }),
    Schema.makeFilter(hasAscendingPoints, {
      message: "Expected the points of the levels to ascend.",
    })
  ),
});

/**
 * Criteria, each with ordered levels and the points of each level. The learner
 * sees the criteria and the level reached; what earns a level is a descriptor
 * in the key. It is the rule of `qti-extended-text-interaction`, whose
 * scoring QTI leaves to a person: `qti-rubric-block` with `use="scoring"`.
 */
export const RubricRuleSchema = Schema.Struct({
  criteria: Schema.NonEmptyArray(RubricCriterionSchema).check(
    Schema.makeFilter(hasUniqueIds, {
      message: "Expected each criterion to have its own identifier.",
    })
  ),
  kind: Schema.Literal("rubric"),
});

/** The rule that scores one interaction. */
export const ScoringRuleSchema = Schema.Union([
  AllOrNothingRuleSchema,
  PerPartRuleSchema,
  RubricRuleSchema,
]);
export type ScoringRule = typeof ScoringRuleSchema.Type;

/**
 * A rule that an exam profile can set for every interaction of a kind. A
 * rubric is never a default: its criteria belong to one item.
 */
export const DefaultRuleSchema = Schema.Union([
  AllOrNothingRuleSchema,
  PerPartRuleSchema,
]);

/** A rule that one item sets for one of its interactions, instead of the default. */
export const ScoringOverrideSchema = Schema.Struct({
  interaction: LocalIdSchema,
  rule: ScoringRuleSchema,
});
export type ScoringOverride = typeof ScoringOverrideSchema.Type;

/** Returns the points of the highest level of a criterion. */
function highestPoints(criterion: typeof RubricCriterionSchema.Type) {
  return Arr.reduce(criterion.levels, 0, (highest, { points }) =>
    Math.max(highest, points)
  );
}

/**
 * Returns k, the most points a rule can award, which is the top score
 * category. `parts` is the number of parts the key defines for the
 * interaction, and only a per-part rule reads it.
 */
export function scoreCeiling(rule: ScoringRule, parts: number) {
  return Match.value(rule).pipe(
    Match.discriminatorsExhaustive("kind")({
      allOrNothing: () => 1,
      perPart: ({ pointsPerPart }) => pointsPerPart * parts,
      rubric: ({ criteria }) =>
        Arr.reduce(
          criteria,
          0,
          (total, criterion) => total + highestPoints(criterion)
        ),
    })
  );
}

/**
 * Checks that a rule can score an interaction. A rubric scores an extended
 * text and nothing else, and an extended text takes no other rule. A field with
 * one part is the single case of a per-part rule: one part is one point.
 */
export function supportsRule(interaction: Interaction, rule: ScoringRule) {
  return (interaction.kind === "extendedText") === (rule.kind === "rubric");
}

/**
 * Whole marks that a penalized exam awards for a correct, a wrong, and a blank
 * answer, such as +4, -1, and 0. A wrong answer costs marks, a blank never
 * scores below a wrong answer, and a correct answer scores above a blank.
 */
export const MarksSchema = Schema.Struct({
  blank: Schema.Int,
  correct: Schema.Int.check(Schema.isGreaterThan(0)),
  wrong: Schema.Int.check(Schema.isLessThan(0)),
}).check(
  Schema.makeFilter(
    ({ blank, correct, wrong }) => wrong <= blank && blank < correct,
    {
      message:
        "Expected wrong marks at or below blank marks, and blank marks below correct marks.",
    }
  )
);

/**
 * How an exam turns outcomes into a score. `irt` estimates ability from the
 * outcomes, `raw` sums points, `penalized` adds marks for each outcome, and
 * `composite` combines section scores by a formula that is written out for
 * the reader in every language.
 */
export const ScoringStrategySchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("irt") }),
  Schema.Struct({ kind: Schema.Literal("raw") }),
  Schema.Struct({ kind: Schema.Literal("penalized"), marks: MarksSchema }),
  Schema.Struct({
    formula: LocalizedTextSchema,
    kind: Schema.Literal("composite"),
  }),
]);
export type ScoringStrategy = typeof ScoringStrategySchema.Type;

/** The range of a reported score, such as 400 to 1600. */
export const ScoreScaleSchema = Schema.Struct({
  maximum: Schema.Finite,
  minimum: Schema.Finite,
}).check(
  Schema.makeFilter(({ maximum, minimum }) => minimum < maximum, {
    message: "Expected a scale whose minimum is below its maximum.",
  })
);
