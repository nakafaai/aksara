import { Schema } from "effect";

import {
  hasUniqueKeys,
  hasUniquePositions,
  MathAppearanceSchema,
  MathAxisRangeSchema,
  MathFeatureVisibilitySchema,
  MathLabelPlacementSchema,
  MathViewPaddingSchema,
  MathVisualKeySchema,
  PositiveMeasureSchema,
  SpacePointSchema,
  sameSpacePoint,
} from "#contracts/math/base";
import { hasCoplanarArea } from "#contracts/math/vector";

const ObjectFields = {
  appearance: MathAppearanceSchema,
  id: MathVisualKeySchema,
};

const SpacePointObjectSchema = Schema.Struct({
  ...ObjectFields,
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
  ...ObjectFields,
  kind: Schema.Literal("line"),
  through: Schema.Tuple([SpacePointSchema, SpacePointSchema]),
}).pipe(
  Schema.check(
    Schema.makeFilter(({ through: [from, to] }) => !sameSpacePoint(from, to), {
      message: "Expected a line through two distinct positions.",
    })
  )
);

const SpaceRayObjectSchema = Schema.Struct({
  ...ObjectFields,
  from: SpacePointSchema,
  kind: Schema.Literal("ray"),
  through: SpacePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ from, through }) => !sameSpacePoint(from, through), {
      message: "Expected a ray through a position distinct from its start.",
    })
  )
);

const SpaceSegmentObjectSchema = Schema.Struct({
  ...ObjectFields,
  from: SpacePointSchema,
  kind: Schema.Literal("segment"),
  to: SpacePointSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ from, to }) => !sameSpacePoint(from, to), {
      message: "Expected a segment with distinct ends.",
    })
  )
);

const SpacePolylineObjectSchema = Schema.Struct({
  ...ObjectFields,
  kind: Schema.Literal("polyline"),
  vertices: SpacePathSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ vertices }) => hasUniquePositions(vertices, sameSpacePoint),
      { message: "Expected unique polyline vertices." }
    )
  )
);

const SpacePolygonObjectSchema = Schema.Struct({
  ...ObjectFields,
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

const SpaceSplineObjectSchema = Schema.Struct({
  ...ObjectFields,
  kind: Schema.Literal("spline"),
  samples: SpaceShapeSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ samples }) => hasUniquePositions(samples, sameSpacePoint),
      { message: "Expected at least three unique spline samples." }
    )
  )
);

const SpaceClosedSplineObjectSchema = Schema.Struct({
  ...ObjectFields,
  kind: Schema.Literal("closed-spline"),
  samples: SpaceShapeSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ samples }) => hasUniquePositions(samples, sameSpacePoint),
      {
        message:
          "Expected unique closed-spline samples without a repeated closing sample.",
      }
    )
  )
);

/**
 * Axis-aligned cuboid whose length spans x, height spans y, and width spans z.
 */
const SpaceCuboidObjectSchema = Schema.Struct({
  ...ObjectFields,
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
  SpaceClosedSplineObjectSchema,
  SpaceCuboidObjectSchema,
  SpaceLineObjectSchema,
  SpacePointObjectSchema,
  SpacePolygonObjectSchema,
  SpacePolylineObjectSchema,
  SpaceRayObjectSchema,
  SpaceSegmentObjectSchema,
  SpaceSplineObjectSchema,
]);

/** Exact Cartesian frame presented behind a space construction. */
export const SpaceMathFrameSchema = Schema.Struct({
  axes: MathFeatureVisibilitySchema,
  grid: MathFeatureVisibilitySchema,
  kind: Schema.Literal("cartesian"),
  x: MathAxisRangeSchema,
  y: MathAxisRangeSchema,
  z: MathAxisRangeSchema,
});

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

/** One coordinate anchor resolved against a separate rich-label map. */
export const SpaceLabelAnchorSchema = Schema.Struct({
  at: SpacePointSchema,
  key: MathVisualKeySchema,
  placement: Schema.optionalKey(MathLabelPlacementSchema),
});

/** Complete stable space visual before rich labels are attached. */
export const SpaceMathVisualSchema = Schema.Struct({
  frame: SpaceMathFrameSchema,
  labels: Schema.optionalKey(Schema.Array(SpaceLabelAnchorSchema)),
  objects: Schema.NonEmptyArray(SpaceMathObjectSchema),
  space: Schema.Literal("space"),
  view: SpaceMathViewSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ objects }) => hasUniqueKeys(objects, ({ id }) => id), {
      message: "Expected unique mathematical object ids.",
    })
  ),
  Schema.check(
    Schema.makeFilter(
      ({ labels = [] }) => hasUniqueKeys(labels, ({ key }) => key),
      { message: "Expected unique mathematical label keys." }
    )
  )
);
