import { Schema } from "effect";

import { MathAxisRangeSchema } from "#contracts/math/base";
import {
  EquationTextSchema,
  FormulaTextSchema,
  InequalityTextSchema,
  PlaneFormulaPointSchema,
} from "#contracts/math/formula/field";
import { MathObjectFields } from "#contracts/math/object";

/**
 * The graph of y = f(x), or of x = f(y) when its input axis is y. The renderer
 * samples it inside the frame, at least 200 times per visible branch, exactly
 * at its domain ends and labels, and splits it at every break and asymptote.
 * Without a domain it spans the frame along its input axis.
 */
const PlaneFunctionObjectSchema = Schema.Struct({
  ...MathObjectFields,
  domain: Schema.optionalKey(MathAxisRangeSchema),
  formula: FormulaTextSchema,
  inputAxis: Schema.optionalKey(Schema.Literals(["x", "y"])),
  kind: Schema.Literal("function"),
});

/** A curve traced by x(t) and y(t) while t runs over its parameter range. */
const PlaneParametricObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("parametric"),
  parameter: MathAxisRangeSchema,
  x: FormulaTextSchema,
  y: FormulaTextSchema,
});

/** A curve r = f(theta) in polar coordinates, theta in radians over its range. */
const PlanePolarObjectSchema = Schema.Struct({
  ...MathObjectFields,
  angle: MathAxisRangeSchema,
  kind: Schema.Literal("polar"),
  radius: FormulaTextSchema,
});

/** Every point of the frame where an equation in x and y holds, such as a conic. */
const PlaneImplicitObjectSchema = Schema.Struct({
  ...MathObjectFields,
  equation: EquationTextSchema,
  kind: Schema.Literal("implicit"),
});

/**
 * The part of the frame where every inequality holds, shaded, with each
 * boundary drawn solid for <= or >= and dashed for < or >.
 */
const PlaneRegionObjectSchema = Schema.Struct({
  ...MathObjectFields,
  inequalities: Schema.NonEmptyArray(InequalityTextSchema),
  kind: Schema.Literal("region"),
});

/** A point placed by formulas of the sliders, which moves as they move. */
const PlaneMarkerObjectSchema = Schema.Struct({
  ...MathObjectFields,
  kind: Schema.Literal("marker"),
  x: FormulaTextSchema,
  y: FormulaTextSchema,
});

/**
 * Straight segments through points placed by formulas of the sliders, such as
 * the sides of a right triangle with angle a. `closed` joins the last point
 * back to the first, which draws a polygon's outline.
 */
const PlanePathObjectSchema = Schema.Struct({
  ...MathObjectFields,
  closed: Schema.optionalKey(Schema.Boolean),
  kind: Schema.Literal("path"),
  points: Schema.Array(PlaneFormulaPointSchema).check(Schema.isMinLength(2)),
});

/** The plane objects a formula defines, which a renderer samples itself. */
export const PlaneCurveObjectSchemas = [
  PlaneFunctionObjectSchema,
  PlaneImplicitObjectSchema,
  PlaneMarkerObjectSchema,
  PlaneParametricObjectSchema,
  PlanePathObjectSchema,
  PlanePolarObjectSchema,
  PlaneRegionObjectSchema,
] as const;
