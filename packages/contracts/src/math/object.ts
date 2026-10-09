import { Schema } from "effect";

import {
  hasUniquePositions,
  MathAppearanceSchema,
  MathLabelPlacementSchema,
  MathVisualKeySchema,
} from "#contracts/math/base";

/** Fields that every visual object shares, whatever its Cartesian dimension. */
export const MathObjectFields = {
  appearance: MathAppearanceSchema,
  id: MathVisualKeySchema,
};

/**
 * Builds the point, line, ray, segment, polyline, and label shapes once for one
 * Cartesian dimension. The point schema and its equality are the only inputs,
 * and every shape keeps its exact message.
 */
export function makeSharedMathShapes<Point extends Schema.Top>(
  point: Point,
  same: (left: Point["Type"], right: Point["Type"]) => boolean
) {
  return {
    labelAnchor: Schema.Struct({
      at: point,
      key: MathVisualKeySchema,
      objectId: MathVisualKeySchema,
      placement: Schema.optionalKey(MathLabelPlacementSchema),
    }),
    line: Schema.Struct({
      ...MathObjectFields,
      kind: Schema.Literal("line"),
      through: Schema.Tuple([point, point]),
    }).pipe(
      Schema.check(
        Schema.makeFilter(({ through: [from, to] }) => !same(from, to), {
          message: "Expected a line through two distinct positions.",
        })
      )
    ),
    point: Schema.Struct({
      ...MathObjectFields,
      at: point,
      kind: Schema.Literal("point"),
    }),
    polyline: Schema.Struct({
      ...MathObjectFields,
      kind: Schema.Literal("polyline"),
      vertices: Schema.TupleWithRest(Schema.Tuple([point, point]), [point]),
    }).pipe(
      Schema.check(
        Schema.makeFilter(
          ({ vertices }) => hasUniquePositions(vertices, same),
          { message: "Expected unique polyline vertices." }
        )
      )
    ),
    ray: Schema.Struct({
      ...MathObjectFields,
      from: point,
      kind: Schema.Literal("ray"),
      through: point,
    }).pipe(
      Schema.check(
        Schema.makeFilter(({ from, through }) => !same(from, through), {
          message: "Expected a ray through a position distinct from its start.",
        })
      )
    ),
    segment: Schema.Struct({
      ...MathObjectFields,
      from: point,
      kind: Schema.Literal("segment"),
      to: point,
    }).pipe(
      Schema.check(
        Schema.makeFilter(({ from, to }) => !same(from, to), {
          message: "Expected a segment with distinct ends.",
        })
      )
    ),
  };
}
