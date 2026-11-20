import { Array as Arr, Match, Option, Result, Schema } from "effect";

import { readAffine } from "#contracts/math/formula/affine";
import { readFormula } from "#contracts/math/formula/parse";
import type { FormulaNode } from "#contracts/math/formula/syntax";
import { FormulaNodeSchema } from "#contracts/math/formula/syntax";
import type { PlaneMathObject } from "#contracts/math/plane";

/** Whether two formulas are the same tree. */
const sameFormula = Schema.toEquivalence(FormulaNodeSchema);

/** The formulas directly below a node of a formula. */
function children(node: FormulaNode): readonly FormulaNode[] {
  return Match.value(node).pipe(
    Match.discriminatorsExhaustive("kind")({
      binary: ({ left, right }) => [left, right],
      call: ({ args }) => args,
      logarithm: ({ base, value }) => [base, value],
      name: () => [],
      negate: ({ operand }) => [operand],
      number: () => [],
    })
  );
}

/** Whether a formula reads t anywhere outside the copies of `inside` it holds. */
function readsTOutside(node: FormulaNode, inside: FormulaNode): boolean {
  return (
    !sameFormula(node, inside) &&
    ((node.kind === "name" && node.name === "t") ||
      Arr.some(children(node), (child) => readsTOutside(child, inside)))
  );
}

/** Whether a formula reads t at all. */
function readsT(node: FormulaNode): boolean {
  return (
    (node.kind === "name" && node.name === "t") ||
    Arr.some(children(node), readsT)
  );
}

/**
 * How a parametric curve traces a graph y = f(x), if it does: its x changes at
 * one constant rate in t (`x = t - 6`), or its y reads t only through the
 * formula of its x (`x = exp(t)`, `y = log_2(exp(t))`). Either way each x
 * meets the curve at one height.
 */
function graphTrace(x: string, y: string) {
  return Option.all([
    Result.getSuccess(readFormula(x)),
    Result.getSuccess(readFormula(y)),
  ]).pipe(
    Option.flatMap(([across, up]) => {
      if (
        Option.exists(
          readAffine(across, ["t"]),
          ({ terms }) => (terms.t ?? 0) !== 0
        )
      ) {
        return Option.some("whose x changes at one constant rate in t");
      }
      return readsT(across) && !readsTOutside(up, across)
        ? Option.some("whose y reads t only through its x")
        : Option.none();
    })
  );
}

/**
 * Guardrail G4: a parametric curve that traces a graph y = f(x) is written as
 * a function. A function reads as the graph it is, takes its domain in x, and
 * lets a scene scale each axis on its own, while a parametric curve keeps one
 * scale for both, as a circle needs.
 */
export function graphAsParametricIssues(
  objects: readonly PlaneMathObject[]
): readonly Schema.FilterIssue[] {
  return Arr.flatMap(objects, (object, index): Schema.FilterIssue[] =>
    object.kind === "parametric"
      ? Option.match(graphTrace(object.x, object.y), {
          onNone: () => [],
          onSome: (trace) => [
            {
              issue: `Expected the parametric curve "${object.id}", ${trace} (x = ${object.x}), to be written as { kind: "function", formula, domain }: it is the graph y = f(x), and a graph lets each axis scale on its own.`,
              path: ["objects", index],
            },
          ],
        })
      : []
  );
}
