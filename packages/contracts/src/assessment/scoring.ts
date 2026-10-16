import { Array as Arr, Match, Option, Schema } from "effect";

import { hasUniqueIds, LocalIdSchema } from "#contracts/assessment/identity";
import {
  canSitInText,
  type InteractionKind,
} from "#contracts/assessment/interaction";
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
 * from 0 to k, the floor is zero or more and at most k. A field has one part,
 * so an item version and an exam profile check the floor of a field themselves
 * (`supportsRule`); the key counts the parts of every other kind, so the check
 * of those waits for the key. It is `map_response` of QTI response processing:
 * a `qti-mapping` whose map entries are the correct parts, whose
 * `default-value` is the negative of the penalty, and whose `lower-bound` is
 * the floor.
 */
export const PerPartRuleSchema = Schema.Struct({
  floor: NonNegativeIntSchema,
  kind: Schema.Literal("perPart"),
  penaltyPerWrongPart: Schema.optionalKey(PositiveIntSchema),
  pointsPerPart: PositiveIntSchema,
});

/** One band of a wrong-parts table: the points that an answer keeps with up to `wrong` wrong parts. */
const WrongPartsBandSchema = Schema.Struct({
  points: PositiveIntSchema,
  wrong: NonNegativeIntSchema,
});

/** Checks that the bands rise in wrong parts and fall in points, so each band is a step. */
function hasWrongPartsSteps(
  bands: readonly (typeof WrongPartsBandSchema.Type)[]
) {
  return Arr.every(
    Arr.zip(bands, Arr.drop(bands, 1)),
    ([lower, higher]) =>
      lower.wrong < higher.wrong && lower.points > higher.points
  );
}

/**
 * Points by the number of wrong parts, such as the AKM rule of a complex
 * multiple choice with more than five statements and more than two options: 2
 * points with no wrong part, 1 point with one or two, and 0 with more. An answer
 * scores the points of the first band whose `wrong` is at least its number of
 * wrong parts, and 0 when no band holds it. The parts are the ones the per-part
 * rule counts, as the key defines them for each kind.
 *
 * It corresponds to no standard response processing template of QTI 3.
 * `match_correct` gives 1 or 0 for the whole interaction. `map_response` maps
 * each response value and sums the results. With one value for the correct parts
 * and one for the wrong parts, each wrong part moves the score by the same step,
 * and clamping the sum to its bounds flattens only its two ends. The table 2, 1,
 * 1, 0 for 0 to 3 wrong parts has a flat step in the middle, so no sum over the
 * parts gives it. Section 3.4.2 of the QTI 3 Best Practices and Implementation
 * Guide says that a composite item needs general response processing, not a
 * standard template. A table over the wrong parts is that kind of score, so it
 * corresponds to the general response processing of that section.
 */
export const WrongPartsRuleSchema = Schema.Struct({
  bands: Schema.NonEmptyArray(WrongPartsBandSchema).check(
    Schema.makeFilter(hasWrongPartsSteps, {
      message: "Expected the bands to rise in wrong parts and fall in points.",
    })
  ),
  kind: Schema.Literal("wrongParts"),
});
export type WrongPartsRule = typeof WrongPartsRuleSchema.Type;

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
  WrongPartsRuleSchema,
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
  WrongPartsRuleSchema,
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
      wrongParts: ({ bands }) => Arr.headNonEmpty(bands).points,
    })
  );
}

/**
 * Returns the points that a wrong-parts table gives an answer with this many
 * wrong parts: the points of the first band that holds it, or 0 when none does.
 * It reads the table alone, never a learner's answer: grading an answer is the
 * work of Nakafa's engine.
 */
export function pointsForWrongParts(rule: WrongPartsRule, wrongParts: number) {
  return Arr.findFirst(rule.bands, ({ wrong }) => wrong >= wrongParts).pipe(
    Option.map(({ points }) => points),
    Option.getOrElse(() => 0)
  );
}

/**
 * Checks that a rule can score a field, which has one part. The floor of a
 * per-part rule is at most the points of that part. A wrong-parts table has one
 * band, for no wrong part, because a field has one part: any other band would
 * award points for a wrong answer.
 */
function fitsField(rule: ScoringRule) {
  if (rule.kind === "perPart") {
    return rule.floor <= scoreCeiling(rule, 1);
  }
  if (rule.kind === "wrongParts") {
    return rule.bands.length === 1 && Arr.headNonEmpty(rule.bands).wrong === 0;
  }
  return true;
}

/**
 * Checks that a rule can score an interaction of this kind. A rubric scores an
 * extended text and nothing else, and an extended text takes no other rule. A
 * field has one part, worth the points of its rule: one point, or more when
 * the item is worth more. The floor of a rule per part is at most those
 * points, and a wrong-parts table has one band for no wrong part. Every other
 * kind has the parts that its key counts, so the key checks the floor of a rule
 * for those.
 */
export function supportsRule(kind: InteractionKind, rule: ScoringRule) {
  return (
    (kind === "extendedText") === (rule.kind === "rubric") &&
    (!canSitInText(kind) || fitsField(rule))
  );
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
