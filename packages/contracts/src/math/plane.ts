import { Schema } from "effect";

import {
  ArcStartDegreesSchema,
  ArcSweepDegreesSchema,
  GEOMETRY_TOLERANCE,
  hasUniquePositions,
  MathAppearanceSchema,
  MathAxisRangeSchema,
  MathFeatureVisibilitySchema,
  MathLabelPlacementSchema,
  MathViewPaddingSchema,
  MathVisualKeySchema,
  mathVisualIdentityIssues,
  type PlanePoint,
  PlanePointSchema,
  PositiveMeasureSchema,
  samePlanePoint,
} from "#contracts/math/base";
import { planeBoundsIssues } from "#contracts/math/bounds";
import { planeResolutionIssues } from "#contracts/math/resolution";

const ObjectFields = {
  appearance: MathAppearanceSchema,
  id: MathVisualKeySchema,
};

/** Checks a plane polygon has non-zero signed area. */
function hasPlaneArea(
  vertices: readonly [PlanePoint, PlanePoint, PlanePoint, ...PlanePoint[]]
) {
  const offsets = normalizedPlaneOffsets(vertices);
  let twiceArea = 0;
  let termMagnitude = 0;
  let previous: PlanePoint = { x: 0, y: 0 };
  for (const current of offsets.slice(1)) {
    const positive = previous.x * current.y;
    const negative = previous.y * current.x;
    twiceArea += positive - negative;
    termMagnitude += Math.abs(positive) + Math.abs(negative);
    previous = current;
  }
  return Math.abs(twiceArea) > GEOMETRY_TOLERANCE * Math.max(1, termMagnitude);
}

/** Translates before scaling so polygon area is independent of its location. */
function normalizedPlaneOffsets(
  vertices: readonly [PlanePoint, PlanePoint, PlanePoint, ...PlanePoint[]]
) {
  const [origin] = vertices;
  let offsets = vertices.map(({ x, y }) => ({
    x: x - origin.x,
    y: y - origin.y,
  }));
  if (offsets.some(({ x, y }) => !(Number.isFinite(x) && Number.isFinite(y)))) {
    let sourceScale = 1;
    for (const { x, y } of vertices) {
      sourceScale = Math.max(sourceScale, Math.abs(x), Math.abs(y));
    }
    offsets = vertices.map(({ x, y }) => ({
      x: x / sourceScale - origin.x / sourceScale,
      y: y / sourceScale - origin.y / sourceScale,
    }));
  }
  let extent = 0;
  for (const { x, y } of offsets) {
    extent = Math.max(extent, Math.abs(x), Math.abs(y));
  }
  const divisor = Math.max(extent, Number.MIN_VALUE);
  return offsets.map(({ x, y }) => ({ x: x / divisor, y: y / divisor }));
}

const PlanePointObjectSchema = Schema.Struct({
  ...ObjectFields,
  at: PlanePointSchema,
  kind: Schema.Literal("point"),
});

const PlanePathSchema = Schema.TupleWithRest(
  Schema.Tuple([PlanePointSchema, PlanePointSchema]),
  [PlanePointSchema]
);

const PlaneShapeSchema = Schema.TupleWithRest(
  Schema.Tuple([PlanePointSchema, PlanePointSchema, PlanePointSchema]),
  [PlanePointSchema]
);

const PlaneLineObjectSchema = Schema.Struct({
  ...ObjectFields,
  kind: Schema.Literal("line"),
  through: Schema.Tuple([PlanePointSchema, PlanePointSchema]),
}).pipe(
  Schema.check(
    Schema.makeFilter(({ through: [from, to] }) => !samePlanePoint(from, to), {
      message: "Expected a line through two distinct positions.",
    })
  )
);

const PlaneRayObjectSchema = Schema.Struct({
  ...ObjectFields,
  from: PlanePointSchema,
  kind: Schema.Literal("ray"),
  through: PlanePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ from, through }) => !samePlanePoint(from, through), {
      message: "Expected a ray through a position distinct from its start.",
    })
  )
);

const PlaneSegmentObjectSchema = Schema.Struct({
  ...ObjectFields,
  from: PlanePointSchema,
  kind: Schema.Literal("segment"),
  to: PlanePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ from, to }) => !samePlanePoint(from, to), {
      message: "Expected a segment with distinct ends.",
    })
  )
);

const PlanePolylineObjectSchema = Schema.Struct({
  ...ObjectFields,
  kind: Schema.Literal("polyline"),
  vertices: PlanePathSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ vertices }) => hasUniquePositions(vertices, samePlanePoint),
      { message: "Expected unique polyline vertices." }
    )
  )
);

const PlanePolygonObjectSchema = Schema.Struct({
  ...ObjectFields,
  kind: Schema.Literal("polygon"),
  vertices: PlaneShapeSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ vertices }) =>
        hasUniquePositions(vertices, samePlanePoint) && hasPlaneArea(vertices),
      { message: "Expected unique vertices forming a non-degenerate polygon." }
    )
  )
);

const PlaneCircleObjectSchema = Schema.Struct({
  ...ObjectFields,
  center: PlanePointSchema,
  kind: Schema.Literal("circle"),
  radius: PositiveMeasureSchema,
});

const PlaneArcObjectSchema = Schema.Struct({
  ...ObjectFields,
  center: PlanePointSchema,
  kind: Schema.Literal("arc"),
  radius: PositiveMeasureSchema,
  startDegrees: ArcStartDegreesSchema,
  sweepDegrees: ArcSweepDegreesSchema,
});

const PlaneQuadraticObjectSchema = Schema.Struct({
  ...ObjectFields,
  coefficients: Schema.Struct({
    a: Schema.Finite.pipe(
      Schema.check(
        Schema.makeFilter((value) => value !== 0, {
          message: "Expected a non-zero quadratic coefficient.",
        })
      )
    ),
    b: Schema.Finite,
    c: Schema.Finite,
  }),
  domain: MathAxisRangeSchema,
  inputAxis: Schema.Literals(["x", "y"]),
  kind: Schema.Literal("quadratic"),
});

/** Mathematical objects supported by a Cartesian plane scene. */
export const PlaneMathObjectSchema = Schema.Union([
  PlaneArcObjectSchema,
  PlaneCircleObjectSchema,
  PlaneLineObjectSchema,
  PlanePointObjectSchema,
  PlanePolygonObjectSchema,
  PlanePolylineObjectSchema,
  PlaneQuadraticObjectSchema,
  PlaneRayObjectSchema,
  PlaneSegmentObjectSchema,
]);
export type PlaneMathObject = typeof PlaneMathObjectSchema.Type;

/** Exact Cartesian frame presented behind a plane construction. */
export const PlaneMathFrameSchema = Schema.Struct({
  axes: MathFeatureVisibilitySchema,
  grid: MathFeatureVisibilitySchema,
  kind: Schema.Literal("cartesian"),
  x: MathAxisRangeSchema,
  y: MathAxisRangeSchema,
});
export type PlaneMathFrame = typeof PlaneMathFrameSchema.Type;

/** Plane visuals use semantic fit instead of renderer camera parameters. */
export const PlaneMathViewSchema = Schema.Struct({
  kind: Schema.Literal("fit"),
  padding: Schema.optionalKey(MathViewPaddingSchema),
});
export type PlaneMathView = typeof PlaneMathViewSchema.Type;

/** One coordinate anchor resolved against a separate rich-label map. */
export const PlaneLabelAnchorSchema = Schema.Struct({
  at: PlanePointSchema,
  key: MathVisualKeySchema,
  placement: Schema.optionalKey(MathLabelPlacementSchema),
});
export type PlaneLabelAnchor = typeof PlaneLabelAnchorSchema.Type;

/** Complete stable plane visual before rich labels are attached. */
export const PlaneMathVisualSchema = Schema.Struct({
  frame: PlaneMathFrameSchema,
  labels: Schema.optionalKey(Schema.Array(PlaneLabelAnchorSchema)),
  objects: Schema.NonEmptyArray(PlaneMathObjectSchema),
  space: Schema.Literal("plane"),
  view: PlaneMathViewSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ frame, labels = [], objects, view }) => [
      ...mathVisualIdentityIssues(objects, labels),
      ...planeBoundsIssues(frame, objects, labels),
      ...planeResolutionIssues(frame, objects, view),
    ])
  )
);
