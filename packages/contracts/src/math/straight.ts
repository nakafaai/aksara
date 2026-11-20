import { Match, Option, Result } from "effect";

import { readAffine } from "#contracts/math/formula/affine";
import { readFormula } from "#contracts/math/formula/parse";
import type { PlaneMathObject } from "#contracts/math/plane";

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

/**
 * Two points of a straight object of a plane scene, which name the line it
 * runs along: a line, ray, segment, or the graph of an affine formula.
 */
export function straightPoints(object: PlaneMathObject) {
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
