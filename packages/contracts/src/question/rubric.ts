import { Schema, Struct } from "effect";

import {
  ACTIVE_APP_LOCALE_CODES,
  ActiveAppLocaleCodeSchema,
} from "#contracts/locale";
import {
  canonicalQuestionAnswer,
  canonicalQuestionAnswerStructure,
  type QuestionAnswer,
  QuestionAnswerSchema,
} from "#contracts/question/answer";
import { QuestionResponseLabelSchema } from "#contracts/question/label";

const CRITERION_KEY_PATTERN = /^criterion-[1-9]\d*$/u;
const LEVEL_KEY_PATTERN = /^level-[1-9]\d*$/u;
const PositiveOrderSchema = Schema.Int.check(Schema.isGreaterThan(0));
const LevelPointsSchema = Schema.Int.check(Schema.isGreaterThanOrEqualTo(0));

/**
 * One learner-facing rubric label written for every active app locale. A
 * learner reads it after the attempt in the app locale, even when the prompt
 * is delivered in a fixed assessed language, so every rubric copy carries all
 * locales.
 */
export const QuestionRubricLabelSchema = Schema.Record(
  ActiveAppLocaleCodeSchema,
  QuestionResponseLabelSchema
);
export type QuestionRubricLabel = typeof QuestionRubricLabelSchema.Type;

/** Scale facts shared by authored and frozen rubric criteria. */
interface RubricScale {
  readonly finalAnswer?: QuestionAnswer;
  readonly levels: readonly { readonly points: number }[];
}

/**
 * Checks one criterion scale: two or more levels whose points start at zero
 * and strictly ascend, and exactly two levels when a deterministic final
 * answer decides between them.
 */
function hasOrderedScale(criterion: RubricScale) {
  let previous = -1;
  for (const { points } of criterion.levels) {
    if (points <= previous) {
      return false;
    }
    previous = points;
  }
  const [lowest] = criterion.levels;
  const levelCount = criterion.levels.length;
  return (
    lowest?.points === 0 &&
    (criterion.finalAnswer === undefined ? levelCount >= 2 : levelCount === 2)
  );
}

const ORDERED_SCALE_MESSAGE =
  "Rubric criteria need two or more levels whose points start at zero and strictly ascend, and exactly two levels when a final answer decides them.";

/** One frozen scoring level of a rubric criterion. */
const QuestionRubricLevelSchema = Schema.Struct({
  label: QuestionRubricLabelSchema,
  levelKey: Schema.String.check(Schema.isPattern(LEVEL_KEY_PATTERN)),
  order: PositiveOrderSchema,
  points: LevelPointsSchema,
});

/** One frozen rubric criterion with its ordered level scale. */
const QuestionRubricCriterionSchema = Schema.Struct({
  criterionKey: Schema.String.check(Schema.isPattern(CRITERION_KEY_PATTERN)),
  finalAnswer: Schema.optionalKey(QuestionAnswerSchema),
  label: QuestionRubricLabelSchema,
  levels: Schema.Array(QuestionRubricLevelSchema),
  order: PositiveOrderSchema,
}).check(
  Schema.makeFilter(hasOrderedScale, { message: ORDERED_SCALE_MESSAGE })
);
type QuestionRubricCriterion = typeof QuestionRubricCriterionSchema.Type;

/** Checks one or more criteria and the stable keys derived from their order. */
function hasCanonicalCriteria(criteria: readonly QuestionRubricCriterion[]) {
  return (
    criteria.length > 0 &&
    criteria.every(
      ({ criterionKey, levels, order }, index) =>
        order === index + 1 &&
        criterionKey === `criterion-${order}` &&
        levels.every(
          (level, levelIndex) =>
            level.order === levelIndex + 1 &&
            level.levelKey === `level-${level.order}`
        )
    )
  );
}

/**
 * Frozen open-response rubric. A criterion without a final answer maps onto
 * one Effect `Decision.rate` decision keyed by `criterionKey`: its level keys
 * are the rating scale from lowest to highest, a rating answer's probabilities
 * are keyed by them, and the chosen level's points are earned. A criterion with
 * a final answer is graded deterministically instead: a matching final answer
 * earns its upper level and any other answer its lower level. Every lowest
 * level is worth zero points, so an unanswered criterion earns nothing.
 */
export const QuestionRubricResponseSchema = Schema.Struct({
  criteria: Schema.Array(QuestionRubricCriterionSchema).check(
    Schema.makeFilter(hasCanonicalCriteria, {
      message: "Rubric criteria and levels require canonical keys and order.",
    })
  ),
  kind: Schema.Literal("rubric"),
});
export type QuestionRubricResponse = typeof QuestionRubricResponseSchema.Type;

/** One authored scoring level before its stable key is derived. */
const QuestionRubricLevelSourceSchema = Schema.Struct({
  label: QuestionRubricLabelSchema,
  points: LevelPointsSchema,
}).mapFields(Struct.map(Schema.mutableKey));

/** One authored criterion before its stable key and order are derived. */
const QuestionRubricCriterionSourceSchema = Schema.Struct({
  finalAnswer: Schema.optionalKey(QuestionAnswerSchema),
  label: QuestionRubricLabelSchema,
  levels: Schema.Array(QuestionRubricLevelSourceSchema).pipe(Schema.mutable),
})
  .mapFields(Struct.map(Schema.mutableKey))
  .check(
    Schema.makeFilter(hasOrderedScale, { message: ORDERED_SCALE_MESSAGE })
  );

/** One rubric authored in array order without duplicated runtime keys. */
export const QuestionRubricResponseSourceSchema = Schema.Struct({
  criteria: Schema.Array(QuestionRubricCriterionSourceSchema).pipe(
    Schema.mutable,
    Schema.check(
      Schema.makeFilter((criteria) => criteria.length > 0, {
        message: "Expected at least one rubric criterion.",
      })
    )
  ),
  kind: Schema.Literal("rubric"),
}).mapFields(Struct.map(Schema.mutableKey));
export type QuestionRubricResponseSource =
  typeof QuestionRubricResponseSourceSchema.Type;

/** Derives stable criterion and level keys once from authored array order. */
export function freezeQuestionRubric(source: QuestionRubricResponseSource) {
  return QuestionRubricResponseSchema.make({
    criteria: source.criteria.map((criterion, index) => ({
      criterionKey: `criterion-${index + 1}`,
      ...(criterion.finalAnswer === undefined
        ? {}
        : { finalAnswer: criterion.finalAnswer }),
      label: criterion.label,
      levels: criterion.levels.map(({ label, points }, levelIndex) => ({
        label,
        levelKey: `level-${levelIndex + 1}`,
        order: levelIndex + 1,
        points,
      })),
      order: index + 1,
    })),
    kind: "rubric",
  });
}

/** Returns one label in the canonical active app locale order. */
function canonicalRubricLabel(label: QuestionRubricLabel) {
  return Object.fromEntries(
    ACTIVE_APP_LOCALE_CODES.map((locale) => [locale, label[locale]])
  );
}

/** Serializes criteria in stable field order with one answer encoding. */
function canonicalRubricCriteria(
  rubric: QuestionRubricResponse,
  canonicalAnswer: (answer: QuestionAnswer) => object
) {
  return rubric.criteria.map(
    ({ criterionKey, finalAnswer, label, levels, order }) => ({
      criterionKey,
      ...(finalAnswer === undefined
        ? {}
        : { finalAnswer: canonicalAnswer(finalAnswer) }),
      label: canonicalRubricLabel(label),
      levels: levels.map((level) => ({
        label: canonicalRubricLabel(level.label),
        levelKey: level.levelKey,
        order: level.order,
        points: level.points,
      })),
      order,
    })
  );
}

/**
 * Returns the rubric facts shared by every delivery language: keys, order,
 * points, labels in every active app locale, and final-answer rules without
 * accepted text written in one delivery language.
 */
export function canonicalQuestionRubricStructure(
  rubric: QuestionRubricResponse
) {
  return {
    criteria: canonicalRubricCriteria(rubric, canonicalQuestionAnswerStructure),
    kind: rubric.kind,
  };
}

/** Returns every rubric fact, accepted final-answer text included. */
export function canonicalQuestionRubric(rubric: QuestionRubricResponse) {
  return {
    criteria: canonicalRubricCriteria(rubric, canonicalQuestionAnswer),
    kind: rubric.kind,
  };
}

/** Returns the rubric total: the sum of every criterion's highest level. */
export function questionRubricPoints(rubric: QuestionRubricResponse) {
  return rubric.criteria.reduce(
    (total, { levels }) =>
      total +
      levels.reduce((highest, { points }) => Math.max(highest, points), 0),
    0
  );
}
