import { assert, describe, it } from "@effect/vitest";

import { graphAsParametricIssues } from "#contracts/math/graph";
import type { PlaneMathObject } from "#contracts/math/plane";

/** A parametric curve of the scene, from its two formulas. */
function parametric(x: string, y: string): PlaneMathObject {
  return {
    appearance: "primary",
    id: "curve",
    kind: "parametric",
    parameter: { max: 12, min: 0 },
    x,
    y,
  };
}

describe("graphAsParametricIssues", () => {
  it("asks for a function when x changes at one constant rate in t", () => {
    for (const x of ["t", "(t - 6)", "((-2) + (t * 0.02))", "2t", "(t / 40)"]) {
      assert.deepStrictEqual(
        graphAsParametricIssues([parametric(x, "abs(t)")]),
        [
          {
            issue: `Expected the parametric curve "curve", whose x changes at one constant rate in t (x = ${x}), to be written as { kind: "function", formula, domain }: it is the graph y = f(x), and a graph lets each axis scale on its own.`,
            path: ["objects", 0],
          },
        ]
      );
    }
  });

  it("asks for a function when y reads t only through the formula of x", () => {
    for (const [x, y] of [
      ["exp(t)", "log_2(exp(t))"],
      ["(2 - exp(t))", "(((2 - exp(t)) + 3) / ((2 - exp(t)) - 2))"],
      ["cos(t)", "3"],
      ["exp(t)", "-sin(exp(t))"],
    ] as const) {
      assert.deepStrictEqual(graphAsParametricIssues([parametric(x, y)]), [
        {
          issue: `Expected the parametric curve "curve", whose y reads t only through its x (x = ${x}), to be written as { kind: "function", formula, domain }: it is the graph y = f(x), and a graph lets each axis scale on its own.`,
          path: ["objects", 0],
        },
      ]);
    }
  });

  it("keeps a curve whose x turns back or stands still", () => {
    for (const x of ["4 * cos(t)", "t * t", "exp(t)", "0", "3 + 0 * t"]) {
      assert.deepStrictEqual(
        graphAsParametricIssues([parametric(x, "sin(t)")]),
        []
      );
    }
  });

  it("keeps a curve whose x reads a slider, which the reader moves", () => {
    assert.deepStrictEqual(
      graphAsParametricIssues([parametric("a * t", "t")]),
      []
    );
  });

  it("keeps a curve whose formula does not read, which another rule reports", () => {
    assert.deepStrictEqual(
      graphAsParametricIssues([parametric("t +", "t")]),
      []
    );
  });

  it("reads only parametric curves, at their place in the scene", () => {
    const line: PlaneMathObject = {
      appearance: "secondary",
      id: "line",
      kind: "line",
      through: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
    };
    assert.deepStrictEqual(
      graphAsParametricIssues([line, parametric("t", "t * t")]),
      [
        {
          issue: `Expected the parametric curve "curve", whose x changes at one constant rate in t (x = t), to be written as { kind: "function", formula, domain }: it is the graph y = f(x), and a graph lets each axis scale on its own.`,
          path: ["objects", 1],
        },
      ]
    );
  });
});
