import { Array as Arr, Schema } from "effect";
import {
  DecimalSchema,
  TextKeySchema,
  ToleranceSchema,
} from "#contracts/assessment/answer";
import { hasDistinctIds, LocalIdSchema } from "#contracts/assessment/identity";
import { isWithinRecordLimit } from "#contracts/assessment/record";
import { LatexSchema, PlainTextSchema } from "#contracts/assessment/scalar";
import { Sha256HashSchema } from "#contracts/ids";
import {
  PlanePointSchema,
  PositiveMeasureSchema,
  samePlanePoint,
} from "#contracts/math/base";

const DISTINCT_MESSAGE = "Expected no part to be named twice.";

/** Each key names the interaction of the item version that it answers. */
const KeyFields = { interaction: LocalIdSchema };

/** The options that are correct. */
const ChoiceKeySchema = Schema.Struct({
  ...KeyFields,
  correct: Schema.NonEmptyArray(LocalIdSchema).check(
    Schema.makeFilter(hasDistinctIds, { message: DISTINCT_MESSAGE })
  ),
  kind: Schema.Literal("choice"),
});

/** The column of each statement. */
const MatrixKeySchema = Schema.Struct({
  ...KeyFields,
  answers: Schema.NonEmptyArray(
    Schema.Struct({ column: LocalIdSchema, statement: LocalIdSchema })
  ).check(
    Schema.makeFilter(
      (answers) =>
        hasDistinctIds(Arr.map(answers, ({ statement }) => statement)),
      { message: "Expected one column for each statement." }
    )
  ),
  kind: Schema.Literal("matrix"),
});

/** The correct pairs, each from a source to a target. */
const MatchKeySchema = Schema.Struct({
  ...KeyFields,
  kind: Schema.Literal("match"),
  pairs: Schema.NonEmptyArray(
    Schema.Struct({ source: LocalIdSchema, target: LocalIdSchema })
  ).check(
    Schema.makeFilter(
      (pairs) =>
        hasDistinctIds(
          Arr.map(pairs, ({ source, target }) => `${source} ${target}`)
        ),
      { message: "Expected no pair to be named twice." }
    )
  ),
});

/** The correct order of the items. */
const OrderKeySchema = Schema.Struct({
  ...KeyFields,
  kind: Schema.Literal("order"),
  sequence: Schema.NonEmptyArray(LocalIdSchema).check(
    Schema.makeFilter(hasDistinctIds, { message: DISTINCT_MESSAGE })
  ),
});

/** The option that is correct. */
const InlineChoiceKeySchema = Schema.Struct({
  ...KeyFields,
  correct: LocalIdSchema,
  kind: Schema.Literal("inlineChoice"),
});

/**
 * The accepted texts with their normalization, graded by `matchesAnswerKey`
 * of `assessment/answer`, the one grammar and matcher of typed answers.
 */
const TextEntryKeySchema = Schema.Struct({
  ...KeyFields,
  accepted: TextKeySchema,
  kind: Schema.Literal("textEntry"),
});

/** The exact value and the tolerance around it. */
const NumericEntryKeySchema = Schema.Struct({
  ...KeyFields,
  kind: Schema.Literal("numericEntry"),
  tolerance: Schema.optionalKey(ToleranceSchema),
  value: DecimalSchema,
}).check(
  Schema.makeFilter(
    ({ tolerance, value }) => tolerance?.kind !== "relative" || value !== "0",
    { message: "A relative tolerance cannot measure distance from zero." }
  )
);

/** The expression that the answer must be equivalent to. */
const MathEntryKeySchema = Schema.Struct({
  ...KeyFields,
  expression: LatexSchema,
  kind: Schema.Literal("mathEntry"),
});

/** The areas that are correct. */
const HotspotKeySchema = Schema.Struct({
  ...KeyFields,
  correct: Schema.NonEmptyArray(LocalIdSchema).check(
    Schema.makeFilter(hasDistinctIds, { message: DISTINCT_MESSAGE })
  ),
  kind: Schema.Literal("hotspot"),
});

/** The choice of each gap. */
const GapMatchKeySchema = Schema.Struct({
  ...KeyFields,
  kind: Schema.Literal("gapMatch"),
  pairs: Schema.NonEmptyArray(
    Schema.Struct({ choice: LocalIdSchema, gap: LocalIdSchema })
  ).check(
    Schema.makeFilter(
      (pairs) => hasDistinctIds(Arr.map(pairs, ({ gap }) => gap)),
      { message: "Expected one choice for each gap." }
    )
  ),
});

/** A line through two different points. */
const LineSchema = Schema.Struct({
  through: Schema.Tuple([PlanePointSchema, PlanePointSchema]),
}).check(
  Schema.makeFilter(({ through: [from, to] }) => !samePlanePoint(from, to), {
    message: "Expected a line through two different points.",
  })
);

/**
 * The points or the lines that are correct, and how far a placed point may be
 * from one, in the units of the plane.
 */
const GraphPointKeySchema = Schema.Struct({
  ...KeyFields,
  kind: Schema.Literal("graphPoint"),
  target: Schema.Union([
    Schema.Struct({
      kind: Schema.Literal("points"),
      points: Schema.NonEmptyArray(PlanePointSchema),
    }),
    Schema.Struct({
      kind: Schema.Literal("lines"),
      lines: Schema.NonEmptyArray(LineSchema),
    }),
  ]),
  tolerance: PositiveMeasureSchema,
});

/**
 * The rubric descriptors: for each criterion, what earns each level. They are
 * for a grader and are never shown to a learner before the key is released.
 */
const ExtendedTextKeySchema = Schema.Struct({
  ...KeyFields,
  criteria: Schema.NonEmptyArray(
    Schema.Struct({
      criterion: LocalIdSchema,
      levels: Schema.NonEmptyArray(
        Schema.Struct({ descriptor: PlainTextSchema, level: LocalIdSchema })
      ).check(
        Schema.makeFilter(
          (levels) => hasDistinctIds(Arr.map(levels, ({ level }) => level)),
          { message: DISTINCT_MESSAGE }
        )
      ),
    })
  ).check(
    Schema.makeFilter(
      (criteria) =>
        hasDistinctIds(Arr.map(criteria, ({ criterion }) => criterion)),
      { message: DISTINCT_MESSAGE }
    )
  ),
  kind: Schema.Literal("extendedText"),
});

/** The answer to one interaction. */
export const InteractionKeySchema = Schema.Union([
  ChoiceKeySchema,
  MatrixKeySchema,
  MatchKeySchema,
  OrderKeySchema,
  InlineChoiceKeySchema,
  TextEntryKeySchema,
  NumericEntryKeySchema,
  MathEntryKeySchema,
  HotspotKeySchema,
  GapMatchKeySchema,
  GraphPointKeySchema,
  ExtendedTextKeySchema,
]);
export type InteractionKey = typeof InteractionKeySchema.Type;

/**
 * The answer key of one item version: its own schema and its own artifact,
 * delivered only to a reader who is entitled to it. The prompt of the item
 * carries no key. `version` is the hash of the item version it belongs to. Its
 * size is limited by `assessment/record`.
 */
export const ItemKeySchema = Schema.Struct({
  answers: Schema.NonEmptyArray(InteractionKeySchema).check(
    Schema.makeFilter(
      (answers) =>
        hasDistinctIds(Arr.map(answers, ({ interaction }) => interaction)),
      { message: "Expected one answer for each interaction." }
    )
  ),
  version: Sha256HashSchema,
}).check(isWithinRecordLimit);
export type ItemKey = typeof ItemKeySchema.Type;
