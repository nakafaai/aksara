import { Array as Arr, Schema } from "effect";

import { NonNegativeIntSchema } from "#contracts/assessment/scalar";
import { PositiveMeasureSchema, SpacePointSchema } from "#contracts/math/base";
import {
  type RichSlot,
  TextSchema,
  TripleSchema,
} from "#contracts/visual/card";

/** The named sizes of a label in a three-dimensional scene. */
const FONT_SIZES = [
  "marker",
  "compact",
  "annotation",
  "reading",
  "display",
  "diagram",
] as const;

/** The size of a label: a named size, or a measure in scene units. */
const FontSizeSchema = Schema.Union([
  Schema.Literals(FONT_SIZES),
  PositiveMeasureSchema,
]);

/**
 * The width of a line on screen. Zero is a width: the renderer draws no stroke,
 * so a series with `showPoints` shows its points alone, as the answer to TKA
 * compulsory mathematics set 3, question 8, shows its two fixed points.
 */
const LineWidthSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** Whether the first or last point of a line belongs to it. */
const EndpointStateSchema = Schema.Literals(["open", "closed"]);

/** A label on a line: rich text at one of its points, nudged by an offset, at an optional size. */
function lineLabel<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    anchorX: Schema.optionalKey(Schema.Literals(["center", "left", "right"])),
    at: Schema.optionalKey(NonNegativeIntSchema),
    fontSize: Schema.optionalKey(FontSizeSchema),
    offset: Schema.optionalKey(TripleSchema),
    text: rich,
  });
}

/** The stroke, markers, and labels every drawn line may carry. */
function strokeFields<E>(rich: RichSlot<E>) {
  return {
    color: Schema.optionalKey(TextSchema),
    cone: Schema.optionalKey(
      Schema.Struct({
        position: Schema.Literals(["start", "end", "both"]),
        size: Schema.optionalKey(PositiveMeasureSchema),
      })
    ),
    curvePoints: Schema.optionalKey(Schema.Int.check(Schema.isGreaterThan(1))),
    endpoints: Schema.optionalKey(
      Schema.Struct({
        end: Schema.optionalKey(EndpointStateSchema),
        start: Schema.optionalKey(EndpointStateSchema),
      })
    ),
    labels: Schema.optionalKey(Schema.NonEmptyArray(lineLabel(rich))),
    lineWidth: Schema.optionalKey(LineWidthSchema),
    pointIndices: Schema.optionalKey(
      Schema.NonEmptyArray(NonNegativeIntSchema)
    ),
    showPoints: Schema.optionalKey(Schema.Boolean),
  };
}

/** The indices and label places of a line drawn through its points. */
const IndexedLineSchema = Schema.Struct({
  labels: Schema.optionalKey(
    Schema.Array(
      Schema.Struct({ at: Schema.optionalKey(NonNegativeIntSchema) })
    )
  ),
  pointIndices: Schema.optionalKey(Schema.Array(NonNegativeIntSchema)),
  points: Schema.Array(Schema.Unknown),
});
type IndexedLine = typeof IndexedLineSchema.Type;

/** Checks that every index of a line names one of its points. */
function hasIndexedPoints(line: IndexedLine) {
  const count = line.points.length;
  return (
    Arr.every(line.pointIndices ?? [], (index) => index < count) &&
    Arr.every(line.labels ?? [], ({ at }) => at === undefined || at < count)
  );
}

/** A line or curve through its points. */
function pointLine<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...strokeFields(rich),
    points: Schema.NonEmptyArray(SpacePointSchema),
    smooth: Schema.optionalKey(Schema.Boolean),
  }).check(
    Schema.makeFilter(hasIndexedPoints, {
      message: "Expected every point index to name a point of the line.",
    })
  );
}

/** A nonzero finite number, such as the amplitude of a curve. */
const NonZeroSchema = Schema.Finite.check(
  Schema.makeFilter((value) => value !== 0, {
    message: "Expected a nonzero finite number.",
  })
);

/**
 * One curve `y = amplitude · f(frequency · x + phase) + shift` over its domain,
 * where `f` is the sine, the cosine, or the tangent. The renderer computes its
 * points on a grid of `samples`, at least 200.
 */
const CurveSchema = Schema.Struct({
  amplitude: NonZeroSchema,
  domain: Schema.Tuple([Schema.Finite, Schema.Finite]).check(
    Schema.makeFilter(([from, to]) => from < to, {
      message: "Expected a domain whose start is below its end.",
    })
  ),
  frequency: NonZeroSchema,
  kind: Schema.Literals(["sin", "cos", "tan"]),
  phase: Schema.Finite,
  samples: Schema.optionalKey(
    Schema.Int.check(Schema.isGreaterThanOrEqualTo(200))
  ),
  shift: Schema.Finite,
});

/** The radius and the turn of a circle part, in degrees. */
const CircleTurnFields = {
  radius: PositiveMeasureSchema,
  startDegrees: Schema.Finite,
  sweepDegrees: Schema.Finite,
};

/** An arc or a segment of a circle, with one optional label along it. */
function circleArc<E>(
  rich: RichSlot<E>,
  kind: "circle-arc" | "circle-segment"
) {
  return Schema.Struct({
    ...CircleTurnFields,
    color: TextSchema,
    kind: Schema.Literal(kind),
    label: Schema.optionalKey(
      Schema.Struct({
        ...lineLabel(rich).fields,
        progress: Schema.optionalKey(Schema.Finite),
      }).mapFields(({ at: _at, ...fields }) => fields)
    ),
    lineWidth: Schema.optionalKey(LineWidthSchema),
    segments: Schema.optionalKey(Schema.Int.check(Schema.isGreaterThan(0))),
  });
}

/**
 * One line of a `LineEquation` scene: a line through points, a curve by its
 * formula, a cuboid, or a part of a circle.
 */
export function sceneLine<E>(rich: RichSlot<E>) {
  const stroke = strokeFields(rich);
  return Schema.Union([
    pointLine(rich),
    Schema.Struct({ ...stroke, curve: CurveSchema }),
    Schema.Struct({
      center: Schema.optionalKey(SpacePointSchema),
      color: stroke.color,
      height: PositiveMeasureSchema,
      kind: Schema.Literal("cuboid"),
      length: PositiveMeasureSchema,
      lineWidth: stroke.lineWidth,
      showPoints: stroke.showPoints,
      width: PositiveMeasureSchema,
    }),
    Schema.Struct({
      ...stroke,
      kind: Schema.Literal("circle-outline"),
      radius: PositiveMeasureSchema,
    }),
    Schema.Struct({
      ...stroke,
      ...CircleTurnFields,
      kind: Schema.Literal("circle-chord"),
    }),
    Schema.Struct({
      ...stroke,
      degrees: Schema.Finite,
      kind: Schema.Literal("circle-radius"),
      radius: PositiveMeasureSchema,
    }),
    circleArc(rich, "circle-arc"),
    circleArc(rich, "circle-segment"),
  ]);
}
