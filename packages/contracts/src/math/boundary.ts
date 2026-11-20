import { Array as Arr, Match, Option, Result, Schema } from "effect";

import type { PlanePoint } from "#contracts/math/base";
import { readAffine } from "#contracts/math/formula/affine";
import { readFormula, readRelation } from "#contracts/math/formula/parse";
import type { PlaneMathObject } from "#contracts/math/plane";

/**
 * How far from a boundary line a point may lie and still stand on it, relative
 * to the size of the line's terms there: room for the rounding of decimal
 * coefficients such as 0.1, never for an authored approximation such as 3.33.
 */
const ON_LINE_TOLERANCE = 1e-9;

/**
 * The boundary of one strict linear inequality of a region, `a x + b y + c = 0`,
 * with the inequality as its author wrote it.
 */
const StrictBoundarySchema = Schema.Struct({
  a: Schema.Finite,
  b: Schema.Finite,
  c: Schema.Finite,
  inequality: Schema.String,
});
type StrictBoundary = typeof StrictBoundarySchema.Type;

/** The boundary of an inequality when it is strict and linear in x and y. */
function strictBoundary(inequality: string): Option.Option<StrictBoundary> {
  return Result.getSuccess(readRelation(inequality)).pipe(
    Option.filter(({ comparison }) => comparison === "<" || comparison === ">"),
    Option.flatMap(({ left, right }) =>
      readAffine({ kind: "binary", left, operator: "-", right }, ["x", "y"])
    ),
    Option.flatMap(({ constant, terms }) => {
      const a = terms.x ?? 0;
      const b = terms.y ?? 0;
      return a === 0 && b === 0
        ? Option.none()
        : Option.some({ a, b, c: constant, inequality });
    })
  );
}

/** Whether a point stands on a boundary line. */
function onLine({ a, b, c }: StrictBoundary, { x, y }: PlanePoint) {
  const value = a * x + b * y + c;
  const size = Math.abs(a * x) + Math.abs(b * y) + Math.abs(c);
  return Math.abs(value) <= ON_LINE_TOLERANCE * Math.max(1, size);
}

/** Two points of a graph that is a straight line: an affine formula in its input axis. */
function straightGraph(formula: string, input: "x" | "y") {
  return Result.getSuccess(readFormula(formula)).pipe(
    Option.flatMap((node) => readAffine(node, [input])),
    Option.map(({ constant, terms }) => {
      const slope = terms[input] ?? 0;
      /** The graph's point at one value of its input. */
      const at = (value: number) =>
        input === "x"
          ? { x: value, y: slope * value + constant }
          : { x: slope * value + constant, y: value };
      return [at(0), at(1)] as const;
    })
  );
}

/** Two points of a straight object: a line, ray, segment or straight graph. */
function straightPoints(object: PlaneMathObject) {
  return Match.value(object).pipe(
    Match.discriminators("kind")({
      function: ({ formula, inputAxis = "x" }) =>
        straightGraph(formula, inputAxis),
      line: ({ through }) => Option.some(through),
      ray: ({ from, through }) => Option.some([from, through] as const),
      segment: ({ from, to }) => Option.some([from, to] as const),
    }),
    Match.orElse(() => Option.none())
  );
}

/** Two points of a straight object drawn solid, which a strict boundary may not hold. */
function solidStraight(object: PlaneMathObject) {
  return "stroke" in object && object.stroke !== undefined
    ? Option.none()
    : straightPoints(object);
}

/**
 * Guardrail G5: a line, ray, segment or straight graph that runs along the
 * boundary of a strict inequality of a region in the same scene draws dashed. Its points are
 * not solutions, and the region draws that edge dashed too, so a solid line
 * on it would say the opposite of the region.
 */
export function strictBoundaryIssues(
  objects: readonly PlaneMathObject[]
): readonly Schema.FilterIssue[] {
  const boundaries = Arr.flatMap(objects, (object) =>
    object.kind === "region"
      ? Arr.getSomes(Arr.map(object.inequalities, strictBoundary))
      : []
  );
  return Arr.flatMap(objects, (object, index): Schema.FilterIssue[] =>
    solidStraight(object).pipe(
      Option.flatMap(([from, to]) =>
        Arr.findFirst(
          boundaries,
          (boundary) => onLine(boundary, from) && onLine(boundary, to)
        )
      ),
      Option.match({
        onNone: () => [],
        onSome: ({ inequality }) => [
          {
            issue: `Expected the ${object.kind === "function" ? "graph" : object.kind} on the boundary of the strict inequality "${inequality}" to be dashed (stroke: "dashed"): the points on it are not solutions.`,
            path: ["objects", index],
          },
        ],
      })
    )
  );
}
