import { Array as Arr, Schema, Struct } from "effect";

import { ActiveAppLocaleCodeSchema } from "#contracts/locale";
import {
  canonicalQuestionAnswerKey,
  canonicalQuestionAnswerKeyStructure,
  type QuestionAnswerKey,
  QuestionAnswerKeySchema,
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

/**
 * Checks one criterion scale: two or more levels whose points strictly
 * ascend. A final-answer criterion has exactly two levels and its lower level
 * is worth zero, because a wrong result earns nothing. The criterion holds the
 * scale facts shared by authored, frozen, and label-free rubric criteria.
 */
function hasOrderedScale(criterion: {
  readonly finalAnswer?: QuestionAnswerKey;
  readonly levels: readonly Pick<
    typeof QuestionRubricLevelSchema.Type,
    "points"
  >[];
}) {
  let previous = -1;
  for (const { points } of criterion.levels) {
    if (points <= previous) {
      return false;
    }
    previous = points;
  }
  if (criterion.finalAnswer === undefined) {
    return criterion.levels.length >= 2;
  }
  const [lower] = criterion.levels;
  return criterion.levels.length === 2 && lower?.points === 0;
}

const ORDERED_SCALE_MESSAGE =
  "Rubric criteria need two or more levels whose points strictly ascend, and a final-answer criterion needs exactly a zero level and one higher level.";

/**
 * Checks one or more criteria and the stable keys derived from their order. A
 * labeled criterion is a scale criterion with labels, so both kinds pass here.
 */
function hasCanonicalCriteria(
  criteria: readonly (typeof QuestionRubricCriterionScaleSchema.Type)[]
) {
  return (
    criteria.length > 0 &&
    Arr.every(
      criteria,
      ({ criterionKey, levels, order }, index) =>
        order === index + 1 &&
        criterionKey === `criterion-${order}` &&
        Arr.every(
          levels,
          (level, levelIndex) =>
            level.order === levelIndex + 1 &&
            level.levelKey === `level-${level.order}`
        )
    )
  );
}

const CANONICAL_CRITERIA_MESSAGE =
  "Rubric criteria and levels require canonical keys and order.";

const LevelScaleFields = {
  levelKey: Schema.String.check(Schema.isPattern(LEVEL_KEY_PATTERN)),
  order: PositiveOrderSchema,
  points: LevelPointsSchema,
};
const CriterionScaleFields = {
  criterionKey: Schema.String.check(Schema.isPattern(CRITERION_KEY_PATTERN)),
  finalAnswer: Schema.optionalKey(QuestionAnswerKeySchema),
  order: PositiveOrderSchema,
};

/** One label-free rubric criterion with its ordered level scale. */
const QuestionRubricCriterionScaleSchema = Schema.Struct({
  ...CriterionScaleFields,
  levels: Schema.Array(Schema.Struct(LevelScaleFields)),
}).check(
  Schema.makeFilter(hasOrderedScale, { message: ORDERED_SCALE_MESSAGE })
);

/**
 * Locale-neutral rubric scale that grading reads: ordered criteria with
 * stable keys, ordered levels with points, and optional final-answer keys. It
 * ignores labels, so content written in one language, such as a School
 * tenant's rubric, validates its scale here and owns its own labels. A judged
 * criterion maps onto one Effect `Decision.rate` decision keyed by
 * `criterionKey`: its level keys are the rating scale from lowest to highest,
 * a rating answer's probabilities are keyed by them, and the chosen level's
 * points are earned. A final-answer criterion is graded with
 * `matchesAnswerKey` instead: a match earns its upper level and any other
 * answer its zero level. A blank answer earns zero on every criterion.
 */
export const QuestionRubricScaleSchema = Schema.Struct({
  criteria: Schema.Array(QuestionRubricCriterionScaleSchema).check(
    Schema.makeFilter(hasCanonicalCriteria, {
      message: CANONICAL_CRITERIA_MESSAGE,
    })
  ),
  kind: Schema.Literal("rubric"),
});
export type QuestionRubricScale = typeof QuestionRubricScaleSchema.Type;

/** One frozen scoring level of a rubric criterion. */
const QuestionRubricLevelSchema = Schema.Struct({
  ...LevelScaleFields,
  label: QuestionRubricLabelSchema,
});

/** One frozen rubric criterion with its ordered level scale. */
const QuestionRubricCriterionSchema = Schema.Struct({
  ...CriterionScaleFields,
  label: QuestionRubricLabelSchema,
  levels: Schema.Array(QuestionRubricLevelSchema),
}).check(
  Schema.makeFilter(hasOrderedScale, { message: ORDERED_SCALE_MESSAGE })
);

/**
 * Frozen open-response rubric of Aksara content: the rubric scale with every
 * criterion and level labeled in every active app locale.
 */
export const QuestionRubricResponseSchema = Schema.Struct({
  criteria: Schema.Array(QuestionRubricCriterionSchema).check(
    Schema.makeFilter(hasCanonicalCriteria, {
      message: CANONICAL_CRITERIA_MESSAGE,
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
  finalAnswer: Schema.optionalKey(QuestionAnswerKeySchema),
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
    criteria: Arr.map(source.criteria, (criterion, index) => ({
      criterionKey: `criterion-${index + 1}`,
      ...(criterion.finalAnswer === undefined
        ? {}
        : { finalAnswer: criterion.finalAnswer }),
      label: criterion.label,
      levels: Arr.map(criterion.levels, ({ label, points }, levelIndex) => ({
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

/** Returns one label with every active app locale in alphabetical order. */
function canonicalRubricLabel(label: QuestionRubricLabel): QuestionRubricLabel {
  return { de: label.de, en: label.en, id: label.id };
}

/** Serializes criteria in stable field order with one answer-key encoding. */
function canonicalRubricCriteria<Key>(
  rubric: QuestionRubricResponse,
  canonicalKey: (key: QuestionAnswerKey) => Key
) {
  return Arr.map(
    rubric.criteria,
    ({ criterionKey, finalAnswer, label, levels, order }) => ({
      criterionKey,
      ...(finalAnswer === undefined
        ? {}
        : { finalAnswer: canonicalKey(finalAnswer) }),
      label: canonicalRubricLabel(label),
      levels: Arr.map(levels, (level) => ({
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
    criteria: canonicalRubricCriteria(
      rubric,
      canonicalQuestionAnswerKeyStructure
    ),
    kind: rubric.kind,
  };
}

/** Returns every rubric fact, accepted final-answer text included. */
export function canonicalQuestionRubric(rubric: QuestionRubricResponse) {
  return {
    criteria: canonicalRubricCriteria(rubric, canonicalQuestionAnswerKey),
    kind: rubric.kind,
  };
}

/** Returns the rubric total: the sum of every criterion's highest level. */
export function questionRubricPoints(rubric: QuestionRubricScale) {
  return Arr.reduce(
    rubric.criteria,
    0,
    (total, { levels }) =>
      total +
      Arr.reduce(levels, 0, (highest, { points }) => Math.max(highest, points))
  );
}
