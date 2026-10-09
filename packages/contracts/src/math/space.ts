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
import { MathObjectFields, makeSharedMathShapes } from "#contracts/math/object";
import { spaceResolutionIssues } from "#contracts/math/resolution";
import { hasCoplanarArea } from "#contracts/math/vector";

const SpaceShapes = makeSharedMathShapes(SpacePointSchema, sameSpacePoint);

const SpaceShapeSchema = Schema.TupleWithRest(
  Schema.Tuple([SpacePointSchema, SpacePointSchema, SpacePointSchema]),
  [SpacePointSchema]
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
  SpaceShapes.line,
  SpaceShapes.point,
  SpacePolygonObjectSchema,
  SpaceShapes.polyline,
  SpaceShapes.ray,
  SpaceShapes.segment,
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
export const SpaceLabelAnchorSchema = SpaceShapes.labelAnchor;
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
