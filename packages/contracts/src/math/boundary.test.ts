import { assert, describe, it } from "@effect/vitest";
import { Record as Rec } from "effect";

import { strictBoundaryIssues } from "#contracts/math/boundary";
import type { PlaneMathObject } from "#contracts/math/plane";

/** A region of the scene, from its inequalities. */
function region(...inequalities: [string, ...string[]]): PlaneMathObject {
  return { appearance: "primary", id: "region", inequalities, kind: "region" };
}

const onEdge = {
  line: {
    appearance: "secondary",
    id: "edge",
    kind: "line",
    through: [
      { x: 5, y: 0 },
      { x: 0, y: 2 },
    ],
  },
  ray: {
    appearance: "secondary",
    from: { x: 5, y: 0 },
    id: "edge",
    kind: "ray",
    through: { x: 0, y: 2 },
  },
  segment: {
    appearance: "secondary",
    from: { x: 5, y: 0 },
    id: "edge",
    kind: "segment",
    to: { x: 0, y: 2 },
  },
  graph: {
    appearance: "secondary",
    formula: "2 - 0.4x",
    id: "edge",
    kind: "function",
  },
} satisfies Record<string, PlaneMathObject>;

describe("strictBoundaryIssues", () => {
  it("asks a solid line, ray, segment or graph on a strict boundary to be dashed", () => {
    for (const [kind, object] of Rec.toEntries(onEdge)) {
      assert.deepStrictEqual(
        strictBoundaryIssues([region("2x + 5y < 10", "x > 0"), object]),
        [
          {
            issue: `Expected the ${kind} on the boundary of the strict inequality "2x + 5y < 10" to be dashed (stroke: "dashed"): the points on it are not solutions.`,
            path: ["objects", 1],
          },
        ]
      );
    }
  });

  it("accepts a dashed edge, an inclusive boundary and a line elsewhere", () => {
    for (const objects of [
      [region("2x + 5y < 10"), { ...onEdge.line, stroke: "dashed" as const }],
      [region("2x + 5y <= 10"), onEdge.line],
      [region("y > 3"), onEdge.segment],
      [region("10 > 2x + 5y"), { ...onEdge.ray, stroke: "dashed" as const }],
      [
        region("2x > 10 - 5y"),
        { ...onEdge.segment, stroke: "dashed" as const },
      ],
      [region("2x + 5y < 10"), { ...onEdge.graph, stroke: "dashed" as const }],
      [region("2x + 5y < 10"), { ...onEdge.graph, formula: "x^2" }],
      [region("2x + 5y < 10"), { ...onEdge.graph, formula: "x +" }],
      [
        region("x > 4"),
        { ...onEdge.graph, formula: "5", inputAxis: "y" as const },
      ],
    ] satisfies PlaneMathObject[][]) {
      assert.deepStrictEqual(strictBoundaryIssues(objects), []);
    }
  });

  it("reads only strict inequalities that are linear in x and y", () => {
    for (const inequality of ["x^2 + y < 4", "2 < 3", "x <"]) {
      assert.deepStrictEqual(
        strictBoundaryIssues([region(inequality), onEdge.line]),
        []
      );
    }
  });

  it("reads a graph of x along the y axis as the vertical line it draws", () => {
    assert.strictEqual(
      strictBoundaryIssues([
        region("x > 5"),
        { ...onEdge.graph, formula: "5", inputAxis: "y" },
      ]).length,
      1
    );
  });

  it("leaves objects that draw no straight line alone", () => {
    assert.deepStrictEqual(
      strictBoundaryIssues([
        region("x > 0"),
        { appearance: "primary", at: { x: 0, y: 1 }, id: "p", kind: "point" },
      ]),
      []
    );
  });
});
