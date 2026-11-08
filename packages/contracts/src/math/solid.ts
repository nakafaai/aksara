import { Schema } from "effect";

import {
  hasUniquePositions,
  MathAxisRangeSchema,
  type SpacePoint,
  SpacePointSchema,
  sameSpacePoint,
} from "#contracts/math/base";
import { FormulaTextSchema } from "#contracts/math/formula/field";
import { MathObjectFields } from "#contracts/math/object";
import { hasCoplanarArea } from "#contracts/math/vector";

type Face = typeof SpaceFaceSchema.Type;

/** Whether a face has unique corners that lie in one plane and enclose area. */
function flatFace(base: Face) {
  return hasUniquePositions(base, sameSpacePoint) && hasCoplanarArea(base);
}

/** Whether a point stands off the plane of a flat face. */
function offPlane(base: Face, point: SpacePoint) {
  return !hasCoplanarArea([...base, point]);
}

/** A base face: three or more coplanar corners of one simple polygon. */
export const SpaceFaceSchema = Schema.TupleWithRest(
  Schema.Tuple([SpacePointSchema, SpacePointSchema, SpacePointSchema]),
  [SpacePointSchema]
);

/** A space curve traced by x(t), y(t), and z(t), such as a helix. */
const SpaceParametricObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("parametric"),
  parameter: MathAxisRangeSchema,
  x: FormulaTextSchema,
  y: FormulaTextSchema,
  z: FormulaTextSchema,
});

/** The surface z = f(x, y), over its domain or, without one, the frame. */
const SpaceFunctionObjectSchema = Schema.Struct({
  ...MathObjectFields,
  domain: Schema.optionalKey(
    Schema.Struct({ x: MathAxisRangeSchema, y: MathAxisRangeSchema })
  ),
  formula: FormulaTextSchema,
  kind: Schema.Literal("function"),
});

/** A surface traced by x(u, v), y(u, v), and z(u, v), such as a sphere or torus. */
const SpaceSurfaceObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("surface"),
  u: MathAxisRangeSchema,
  v: MathAxisRangeSchema,
  x: FormulaTextSchema,
  y: FormulaTextSchema,
  z: FormulaTextSchema,
});

/**
 * The solid a profile sweeps as it turns around one axis. The formula gives
 * the radius at each coordinate along that axis and is written in that
 * axis's variable, so a cone about x is `r x / h` and a sphere `sqrt(4 - y^2)`.
 */
const SpaceRevolutionObjectSchema = Schema.Struct({
  ...MathObjectFields,
  axis: Schema.Literals(["x", "y", "z"]),
  domain: MathAxisRangeSchema,
  formula: FormulaTextSchema,
  kind: Schema.Literal("revolution"),
});

/** A prism: its base face moved along an offset that leaves the base's plane. */
const SpacePrismObjectSchema = Schema.Struct({
  ...MathObjectFields,
  base: SpaceFaceSchema,
  kind: Schema.Literal("prism"),
  offset: SpacePointSchema,
}).check(
  Schema.makeFilter(({ base, offset }) => {
    const [first] = base;
    const lifted = {
      x: first.x + offset.x,
      y: first.y + offset.y,
      z: first.z + offset.z,
    };
    return (
      (flatFace(base) && offPlane(base, lifted)) ||
      "Expected a flat base face and an offset that leaves its plane."
    );
  })
);

/** A pyramid or cone of straight edges: a base face and an apex off its plane. */
const SpacePyramidObjectSchema = Schema.Struct({
  ...MathObjectFields,
  apex: SpacePointSchema,
  base: SpaceFaceSchema,
  kind: Schema.Literal("pyramid"),
}).check(
  Schema.makeFilter(
    ({ apex, base }) =>
      (flatFace(base) && offPlane(base, apex)) ||
      "Expected a flat base face and an apex off its plane."
  )
);

/** The space objects a formula or a face defines. */
export const SpaceSolidObjectSchemas = [
  SpaceFunctionObjectSchema,
  SpaceParametricObjectSchema,
  SpacePrismObjectSchema,
  SpacePyramidObjectSchema,
  SpaceRevolutionObjectSchema,
  SpaceSurfaceObjectSchema,
] as const;
