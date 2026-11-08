import { Array as Arr, Option, Result, Schema } from "effect";
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
  contourLines,
  type SampleField,
} from "#contracts/math/formula/contour";
import type { PlaneFormulaPoint } from "#contracts/math/formula/field";
import { SampleGridSchema } from "#contracts/math/formula/mesh";
import { readFormula, readRelation } from "#contracts/math/formula/parse";
import { regionGeometry } from "#contracts/math/formula/region";
import { sampleCurve } from "#contracts/math/formula/sample";
import type { FormulaError } from "#contracts/math/formula/syntax";

const BranchSchema = Schema.Array(SamplePointSchema);

/**
 * What a formula object draws once sampled: curves, marked points, a shaded
 * region with solid or dashed edges, a surface grid, or the faces of a solid.
 */
export const FormulaGeometrySchema = Schema.Union([
  Schema.Struct({
    branches: Schema.Array(BranchSchema),
    kind: Schema.Literal("curves"),
  }),
  Schema.Struct({ kind: Schema.Literal("points"), points: BranchSchema }),
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

/**
 * Places one formula point with the sliders' current values. A coordinate
 * that is not finite there, such as ln(0), places nothing.
 */
export function planeFormulaPoint(
  point: PlaneFormulaPoint,
  scope: FormulaScope
): Result.Result<Option.Option<SamplePoint>, FormulaError> {
  return Result.gen(function* () {
    const x = (yield* compileText(point.x))(scope);
    const y = (yield* compileText(point.y))(scope);
    return Number.isFinite(x) && Number.isFinite(y)
      ? Option.some(planePoint(x, y))
      : Option.none();
  });
}

/** Places every point of a path; one point that is not finite breaks the path. */
function pathBranch(
  points: readonly PlaneFormulaPoint[],
  closed: boolean,
  scope: FormulaScope
) {
  return Result.map(
    Result.all(Arr.map(points, (point) => planeFormulaPoint(point, scope))),
    (placed) =>
      Option.match(Option.all(placed), {
        onNone: () => [],
        onSome: (corners) => [
          closed ? [...corners, ...Arr.take(corners, 1)] : corners,
        ],
      })
  );
}

/** The plane objects a formula defines. */
export type PlaneFormulaObject =
  (typeof PlaneCurveObjectSchemas)[number]["Type"];

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
    if (object.kind === "marker") {
      const placed = yield* planeFormulaPoint(object, scope);
      return { kind: "points" as const, points: Option.toArray(placed) };
    }
    if (object.kind === "path") {
      const branches = yield* pathBranch(
        object.points,
        object.closed ?? false,
        scope
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
