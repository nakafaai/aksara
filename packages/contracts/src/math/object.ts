import { Schema } from "effect";

import {
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
 * Fields that every rich-label anchor shares. Each dimension supplies its own
 * point schema, so the struct built from these fields stays fully typed.
 */
export function mathLabelAnchorFields<Point extends Schema.Top>(at: Point) {
  return {
    at,
    key: MathVisualKeySchema,
    objectId: MathVisualKeySchema,
    placement: Schema.optionalKey(MathLabelPlacementSchema),
  } as const;
}

/** Message for a line whose two authored positions coincide. */
export const MATH_LINE_MESSAGE =
  "Expected a line through two distinct positions.";

/** Message for a polyline that repeats one authored position. */
export const MATH_POLYLINE_MESSAGE = "Expected unique polyline vertices.";

/** Message for a ray whose origin and through position coincide. */
export const MATH_RAY_MESSAGE =
  "Expected a ray through a position distinct from its start.";

/** Message for a segment whose two ends coincide. */
export const MATH_SEGMENT_MESSAGE = "Expected a segment with distinct ends.";
