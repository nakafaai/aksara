import { Schema } from "effect";

import {
  hasUniquePositions,
  MathAxisRangeSchema,
  MathViewPaddingSchema,
  mathVisualIdentityIssues,
  PositiveMeasureSchema,
  SpacePointSchema,
  sameSpacePoint,
} from "#contracts/math/base";
import { spaceBoundsIssues } from "#contracts/math/bounds";
import {
  MATH_LINE_MESSAGE,
  MATH_POLYLINE_MESSAGE,
  MATH_RAY_MESSAGE,
  MATH_SEGMENT_MESSAGE,
  MathObjectFields,
  mathLabelAnchorFields,
} from "#contracts/math/object";
import { spaceResolutionIssues } from "#contracts/math/resolution";
import { hasCoplanarArea } from "#contracts/math/vector";

const SpacePointObjectSchema = Schema.Struct({
  ...MathObjectFields,
  at: SpacePointSchema,
  kind: Schema.Literal("point"),
});

const SpacePathSchema = Schema.TupleWithRest(
  Schema.Tuple([SpacePointSchema, SpacePointSchema]),
  [SpacePointSchema]
);

const SpaceShapeSchema = Schema.TupleWithRest(
  Schema.Tuple([SpacePointSchema, SpacePointSchema, SpacePointSchema]),
  [SpacePointSchema]
);

const SpaceLineObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("line"),
  through: Schema.Tuple([SpacePointSchema, SpacePointSchema]),
}).pipe(
  Schema.check(
    Schema.makeFilter(({ through: [from, to] }) => !sameSpacePoint(from, to), {
      message: MATH_LINE_MESSAGE,
    })
  )
);

const SpaceRayObjectSchema = Schema.Struct({
  ...MathObjectFields,
  from: SpacePointSchema,
  kind: Schema.Literal("ray"),
  through: SpacePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ from, through }) => !sameSpacePoint(from, through), {
      message: MATH_RAY_MESSAGE,
    })
  )
);

const SpaceSegmentObjectSchema = Schema.Struct({
  ...MathObjectFields,
  from: SpacePointSchema,
  kind: Schema.Literal("segment"),
  to: SpacePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ from, to }) => !sameSpacePoint(from, to), {
      message: MATH_SEGMENT_MESSAGE,
    })
  )
);

const SpacePolylineObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("polyline"),
  vertices: SpacePathSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ vertices }) => hasUniquePositions(vertices, sameSpacePoint),
      { message: MATH_POLYLINE_MESSAGE }
    )
  )
);

const SpacePolygonObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("polygon"),
  vertices: SpaceShapeSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ vertices }) =>
        hasUniquePositions(vertices, sameSpacePoint) &&
        hasCoplanarArea(vertices),
      {
        message:
          "Expected unique, coplanar vertices forming a non-degenerate polygon.",
      }
    )
  )
);

/**
 * Axis-aligned cuboid whose length spans x, height spans y, and width spans z.
 */
const SpaceCuboidObjectSchema = Schema.Struct({
  ...MathObjectFields,
  center: SpacePointSchema,
  kind: Schema.Literal("cuboid"),
  size: Schema.Struct({
    height: PositiveMeasureSchema,
    length: PositiveMeasureSchema,
    width: PositiveMeasureSchema,
  }),
});

/** Mathematical objects supported by a Cartesian space scene. */
export const SpaceMathObjectSchema = Schema.Union([
  SpaceCuboidObjectSchema,
  SpaceLineObjectSchema,
  SpacePointObjectSchema,
  SpacePolygonObjectSchema,
  SpacePolylineObjectSchema,
  SpaceRayObjectSchema,
  SpaceSegmentObjectSchema,
]);
export type SpaceMathObject = typeof SpaceMathObjectSchema.Type;

/** Exact Cartesian frame presented behind a space construction. */
export const SpaceMathFrameSchema = Schema.Struct({
  kind: Schema.Literal("cartesian"),
  x: MathAxisRangeSchema,
  y: MathAxisRangeSchema,
  z: MathAxisRangeSchema,
});
export type SpaceMathFrame = typeof SpaceMathFrameSchema.Type;

const SpaceFitViewSchema = Schema.Struct({
  kind: Schema.Literal("fit"),
  padding: Schema.optionalKey(MathViewPaddingSchema),
});

const SpaceIsometricViewSchema = Schema.Struct({
  kind: Schema.Literal("isometric"),
  target: Schema.optionalKey(SpacePointSchema),
});

const SpaceCameraViewSchema = Schema.Struct({
  kind: Schema.Literal("camera"),
  position: SpacePointSchema,
  target: SpacePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ position, target }) => !sameSpacePoint(position, target),
      { message: "Expected distinct camera position and target." }
    )
  )
);

/** Minimal semantic views supported by one space scene. */
export const SpaceMathViewSchema = Schema.Union([
  SpaceCameraViewSchema,
  SpaceFitViewSchema,
  SpaceIsometricViewSchema,
]);
export type SpaceMathView = typeof SpaceMathViewSchema.Type;

/** One coordinate anchor resolved against a separate rich-label map. */
export const SpaceLabelAnchorSchema = Schema.Struct(
  mathLabelAnchorFields(SpacePointSchema)
);
export type SpaceLabelAnchor = typeof SpaceLabelAnchorSchema.Type;

/** Complete stable space visual before rich labels are attached. */
export const SpaceMathVisualSchema = Schema.Struct({
  frame: SpaceMathFrameSchema,
  labels: Schema.optionalKey(Schema.Array(SpaceLabelAnchorSchema)),
  objects: Schema.NonEmptyArray(SpaceMathObjectSchema),
  space: Schema.Literal("space"),
  view: SpaceMathViewSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ frame, labels = [], objects, view }) => [
      ...mathVisualIdentityIssues(objects, labels),
      ...spaceBoundsIssues(frame, objects, labels, view),
      ...spaceResolutionIssues(frame, objects, labels, view),
    ])
  )
);
