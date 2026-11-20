import { Array as Arr, BigDecimal, HashSet, Schema } from "effect";

import {
  DecimalSchema,
  PositiveDecimalSchema,
} from "#contracts/assessment/answer";
import { hasDistinctIds, LocalIdSchema } from "#contracts/assessment/identity";
import { PlainTextSchema } from "#contracts/assessment/scalar";

/** Where a graph meets the x-axis, and whether it crosses there or touches and turns back. */
const ZeroFeatureSchema = Schema.Struct({
  contact: Schema.Literals(["cross", "touch"]),
  kind: Schema.Literal("zero"),
  x: DecimalSchema,
});

/** Where a graph crosses the y-axis. */
const InterceptFeatureSchema = Schema.Struct({
  kind: Schema.Literal("yIntercept"),
  y: DecimalSchema,
});

/** A turning point: a local maximum or minimum. */
const ExtremumFeatureSchema = Schema.Struct({
  kind: Schema.Literal("extremum"),
  turn: Schema.Literals(["maximum", "minimum"]),
  x: DecimalSchema,
  y: DecimalSchema,
});

/**
 * A line the graph comes ever closer to: vertical at an x, or `y = slope * x +
 * intercept`, which is horizontal when the slope is zero and oblique otherwise.
 */
const AsymptoteFeatureSchema = Schema.Struct({
  kind: Schema.Literal("asymptote"),
  line: Schema.Union([
    Schema.Struct({ kind: Schema.Literal("vertical"), x: DecimalSchema }),
    Schema.Struct({
      intercept: DecimalSchema,
      kind: Schema.Literal("sloped"),
      slope: DecimalSchema,
    }),
  ]),
});

/** Whether `from` lies left of `to`, exactly; an open end, written null, is unbounded. */
function isOrdered(from: string | null, to: string | null) {
  return (
    from === null ||
    to === null ||
    BigDecimal.isLessThan(
      BigDecimal.fromStringUnsafe(from),
      BigDecimal.fromStringUnsafe(to)
    )
  );
}

/** A stretch where the graph only rises or only falls; a null end is unbounded. */
const IntervalFeatureSchema = Schema.Struct({
  direction: Schema.Literals(["falling", "rising"]),
  from: Schema.NullOr(DecimalSchema),
  kind: Schema.Literal("interval"),
  to: Schema.NullOr(DecimalSchema),
}).check(
  Schema.makeFilter(({ from, to }) => isOrdered(from, to), {
    message: "Expected an interval whose start lies left of its end.",
  })
);

/** Where the graph goes at one side: up or down without bound, or towards a value. */
const EndFeatureSchema = Schema.Struct({
  kind: Schema.Literal("end"),
  limit: Schema.Union([
    Schema.Literals(["negativeInfinity", "positiveInfinity"]),
    DecimalSchema,
  ]),
  side: Schema.Literals(["left", "right"]),
});

/** One key feature of a graph, in the units of the plane. */
export const SketchFeatureSchema = Schema.Union([
  ZeroFeatureSchema,
  InterceptFeatureSchema,
  ExtremumFeatureSchema,
  AsymptoteFeatureSchema,
  IntervalFeatureSchema,
  EndFeatureSchema,
]);
export type SketchFeature = typeof SketchFeatureSchema.Type;

/**
 * How far a drawn feature may lie from the key's and still earn its
 * criterion, in the units of the plane, for each kind of feature the key
 * holds. A zero, an intercept, an extremum and an interval's ends are judged
 * along the axis they lie on; an asymptote by its distance across the frame;
 * an end only when it tends towards a value.
 */
const SketchTolerancesSchema = Schema.Struct({
  asymptote: Schema.optionalKey(PositiveDecimalSchema),
  end: Schema.optionalKey(PositiveDecimalSchema),
  extremum: Schema.optionalKey(PositiveDecimalSchema),
  interval: Schema.optionalKey(PositiveDecimalSchema),
  yIntercept: Schema.optionalKey(PositiveDecimalSchema),
  zero: Schema.optionalKey(PositiveDecimalSchema),
});

/**
 * One criterion of a sketch's rubric. Its points are the levels of the rubric
 * rule with the same `criterion`; the key says how it is checked and what the
 * learner reads when it is earned or missed, in a teacher's voice. A `feature`
 * check is graded by code from the drawn strokes and marks. `requires` names
 * criteria that must be earned first, written before this one, such as the
 * shape of the graph before any of its points.
 */
const SketchCriterionSchema = Schema.Struct({
  check: Schema.Struct({
    feature: SketchFeatureSchema,
    kind: Schema.Literal("feature"),
  }),
  criterion: LocalIdSchema,
  feedback: Schema.Struct({ earned: PlainTextSchema, missed: PlainTextSchema }),
  requires: Schema.optionalKey(Schema.NonEmptyArray(LocalIdSchema)),
});
type SketchCriterion = typeof SketchCriterionSchema.Type;

/** Checks that each criterion requires only criteria written before it, so no chain of requirements loops. */
function requiresEarlier(criteria: readonly SketchCriterion[]) {
  return Arr.every(criteria, ({ requires }, index) => {
    const earlier = HashSet.fromIterable(
      Arr.map(Arr.take(criteria, index), ({ criterion }) => criterion)
    );
    return Arr.every(requires ?? [], (id) => HashSet.has(earlier, id));
  });
}

/** Checks that the key has a tolerance for every kind of feature that a criterion checks, apart from an end towards infinity. */
function hasTolerances({
  criteria,
  tolerances,
}: {
  readonly criteria: readonly SketchCriterion[];
  readonly tolerances: typeof SketchTolerancesSchema.Type;
}) {
  return Arr.every(
    criteria,
    ({ check: { feature } }) =>
      isUnbounded(feature) || tolerances[feature.kind] !== undefined
  );
}

/** Whether a feature is an end that goes up or down without bound, which no distance measures. */
function isUnbounded(feature: SketchFeature) {
  return (
    feature.kind === "end" &&
    (feature.limit === "negativeInfinity" ||
      feature.limit === "positiveInfinity")
  );
}

/**
 * The key of a sketch: the features its graph must show, each a criterion of
 * the item's rubric, and the tolerances they are judged with. A grader reads
 * the features of the learner's strokes exactly, never from pixels, and awards
 * a criterion only when every criterion it requires is earned.
 */
export const SketchKeySchema = Schema.Struct({
  criteria: Schema.NonEmptyArray(SketchCriterionSchema).check(
    Schema.makeFilter(
      (criteria) =>
        hasDistinctIds(Arr.map(criteria, ({ criterion }) => criterion)),
      { message: "Expected no criterion to be named twice." }
    ),
    Schema.makeFilter(requiresEarlier, {
      message: "Expected each criterion to require only criteria before it.",
    })
  ),
  interaction: LocalIdSchema,
  kind: Schema.Literal("sketch"),
  tolerances: SketchTolerancesSchema,
}).check(
  Schema.makeFilter(hasTolerances, {
    message: "Expected a tolerance for every kind of feature the key checks.",
  })
);
