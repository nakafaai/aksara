import { Array as Arr, Option, Order, Result, Schema } from "effect";
import type { PlaneCurveObjectSchemas } from "#contracts/math/curve";
import {
  type SampleBox,
  type SamplePoint,
  SamplePointSchema,
} from "#contracts/math/formula/box";
import {
  compileFormula,
  type FormulaEvaluator,
  type FormulaScope,
} from "#contracts/math/formula/compile";
import {
  contourFill,
  contourLines,
  type SampleField,
} from "#contracts/math/formula/contour";
import { SampleGridSchema } from "#contracts/math/formula/mesh";
import { readFormula, readRelation } from "#contracts/math/formula/parse";
import { sampleCurve } from "#contracts/math/formula/sample";
import type { FormulaError } from "#contracts/math/formula/syntax";

const BranchSchema = Schema.Array(SamplePointSchema);

/**
 * What a formula object draws once sampled: curves, a shaded region with
 * solid or dashed edges, a surface grid, or the flat faces of a solid.
 */
export const FormulaGeometrySchema = Schema.Union([
  Schema.Struct({
    branches: Schema.Array(BranchSchema),
    kind: Schema.Literal("curves"),
  }),
  Schema.Struct({
    boundary: Schema.Array(
      Schema.Struct({ points: BranchSchema, strict: Schema.Boolean })
    ),
    fill: Schema.Array(BranchSchema),
    kind: Schema.Literal("region"),
  }),
  Schema.Struct({ grid: SampleGridSchema, kind: Schema.Literal("grid") }),
  Schema.Struct({
    faces: Schema.Array(BranchSchema),
    kind: Schema.Literal("faces"),
  }),
]);
export type FormulaGeometry = typeof FormulaGeometrySchema.Type;

/** Compiles one authored expression into its evaluator. */
export function compileText(text: string) {
  return Result.map(readFormula(text), compileFormula);
}

/** Evaluates one compiled formula with one more variable bound. */
export function evaluateWith(
  evaluate: FormulaEvaluator,
  scope: FormulaScope,
  name: string,
  value: number
) {
  return evaluate({ ...scope, [name]: value });
}

/** A plane point, with z kept at zero. */
function planePoint(x: number, y: number): SamplePoint {
  return { x, y, z: 0 };
}

/** How far a boundary piece lies from one inequality's edge, and whether that edge is strict. */
const ConstraintGapSchema = Schema.Struct({
  gap: Schema.Finite,
  strict: Schema.Boolean,
});
type ConstraintGap = typeof ConstraintGapSchema.Type;

/** The signed room an inequality leaves at a point: positive where it holds. */
function margin(text: string) {
  return Result.map(readRelation(text), ({ comparison, left, right }) => {
    const leftValue = compileFormula(left);
    const rightValue = compileFormula(right);
    const below = comparison === "<" || comparison === "<=";
    return {
      field:
        (scope: FormulaScope): SampleField =>
        (x, y) => {
          const point = { ...scope, x, y };
          const gap = rightValue(point) - leftValue(point);
          return below ? gap : -gap;
        },
      strict: comparison === "<" || comparison === ">",
    };
  });
}

/** The plane objects a formula defines. */
export type PlaneFormulaObject =
  (typeof PlaneCurveObjectSchemas)[number]["Type"];

/** The region where every inequality holds, with each edge marked strict or not. */
function regionGeometry(
  inequalities: readonly [string, ...string[]],
  box: SampleBox,
  scope: FormulaScope
) {
  return Result.map(Result.all(Arr.map(inequalities, margin)), (margins) => {
    const constraints = Arr.map(margins, (each) => ({
      field: each.field(scope),
      strict: each.strict,
    }));
    /** The tightest margin at a point: where it is not negative, every inequality holds. */
    const field: SampleField = (x, y) =>
      Math.min(...Arr.map(constraints, (each) => each.field(x, y)));
    const byGap = Order.mapInput(
      Order.Number,
      (piece: ConstraintGap) => piece.gap
    );
    /** Whether the inequality nearest a boundary piece is strict, so it draws dashed. */
    const strictAt = (from: SamplePoint, to: SamplePoint) => {
      const x = (from.x + to.x) / 2;
      const y = (from.y + to.y) / 2;
      const gaps = Arr.map(constraints, (each) => ({
        gap: Math.abs(each.field(x, y)),
        strict: each.strict,
      }));
      return Option.exists(
        Arr.head(Arr.sort(gaps, byGap)),
        ({ strict }) => strict
      );
    };
    const boundary = Arr.flatMap(contourLines(field, box), (line) =>
      Arr.zipWith(line, Arr.drop(line, 1), (point, next) => ({
        points: [point, next],
        strict: strictAt(point, next),
      }))
    );
    return {
      boundary,
      fill: contourFill(field, box),
      kind: "region" as const,
    } satisfies FormulaGeometry;
  });
}

/**
 * Samples one plane formula object inside its frame. `named` holds the input
 * values a function must hit exactly, such as the x of each of its labels.
 */
export function planeFormulaGeometry(
  object: PlaneFormulaObject,
  box: SampleBox,
  scope: FormulaScope,
  named: readonly number[] = []
): Result.Result<FormulaGeometry, FormulaError> {
  return Result.gen(function* () {
    if (object.kind === "function") {
      const f = yield* compileText(object.formula);
      const axis = object.inputAxis ?? "x";
      const range = object.domain ?? box[axis];
      const branches = sampleCurve(
        (input) => {
          const output = evaluateWith(f, scope, axis, input);
          return axis === "x"
            ? planePoint(input, output)
            : planePoint(output, input);
        },
        box,
        range,
        named
      );
      return { branches, kind: "curves" as const };
    }
    if (object.kind === "parametric") {
      const fx = yield* compileText(object.x);
      const fy = yield* compileText(object.y);
      const branches = sampleCurve(
        (t) =>
          planePoint(
            evaluateWith(fx, scope, "t", t),
            evaluateWith(fy, scope, "t", t)
          ),
        box,
        object.parameter
      );
      return { branches, kind: "curves" as const };
    }
    if (object.kind === "polar") {
      const fr = yield* compileText(object.radius);
      const branches = sampleCurve(
        (theta) => {
          const r = evaluateWith(fr, scope, "theta", theta);
          return planePoint(r * Math.cos(theta), r * Math.sin(theta));
        },
        box,
        object.angle
      );
      return { branches, kind: "curves" as const };
    }
    if (object.kind === "implicit") {
      const relation = yield* readRelation(object.equation);
      const left = compileFormula(relation.left);
      const right = compileFormula(relation.right);
      /** How far the two sides of the equation are apart at a point. */
      const field: SampleField = (x, y) => {
        const point = { ...scope, x, y };
        return left(point) - right(point);
      };
      return { branches: contourLines(field, box), kind: "curves" as const };
    }
    return yield* regionGeometry(object.inequalities, box, scope);
  });
}
