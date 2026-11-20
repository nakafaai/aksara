import { Array as Arr, Option, Result, type Schema } from "effect";

import { readAffine } from "#contracts/math/formula/affine";
import { readFormula } from "#contracts/math/formula/parse";
import type { PlaneMathObject } from "#contracts/math/plane";

/**
 * Whether a parametric curve's x changes at one constant rate in t, such as
 * `t - 6` or `-2 + 0.02t`: each x then meets the curve once, so the curve is
 * the graph of a function of x.
 */
function tracesGraph(x: string) {
  return Result.getSuccess(readFormula(x)).pipe(
    Option.flatMap((node) => readAffine(node, ["t"])),
    Option.exists(({ terms }) => (terms.t ?? 0) !== 0)
  );
}

/**
 * Guardrail G4: a parametric curve whose x changes at one constant rate in t
 * is the graph y = f(x), written as a function. A function reads as the graph
 * it is, takes its domain in x, and lets a scene scale each axis on its own,
 * while a parametric curve keeps one scale for both, as a circle needs.
 */
export function graphAsParametricIssues(
  objects: readonly PlaneMathObject[]
): readonly Schema.FilterIssue[] {
  return Arr.flatMap(objects, (object, index): Schema.FilterIssue[] =>
    object.kind === "parametric" && tracesGraph(object.x)
      ? [
          {
            issue: `Expected the parametric curve "${object.id}", whose x changes at one constant rate in t (x = ${object.x}), to be written as { kind: "function", formula, domain }: it is the graph y = f(x), and a graph lets each axis scale on its own.`,
            path: ["objects", index],
          },
        ]
      : []
  );
}
