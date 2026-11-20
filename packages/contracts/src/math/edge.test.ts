import { assert, describe, it } from "@effect/vitest";

import type { PlanePoint } from "#contracts/math/base";
import { inventedEdgeIssues } from "#contracts/math/edge";
import type { PlaneMathFrame, PlaneMathObject } from "#contracts/math/plane";

/** A frame from 0 to 10 on both axes, whose band is one unit deep. */
const FRAME: PlaneMathFrame = {
  kind: "cartesian",
  x: { max: 10, min: 0 },
  y: { max: 10, min: 0 },
};

/** A line of the scene through two points. */
function line(
  id: string,
  from: PlanePoint,
  through: PlanePoint
): PlaneMathObject {
  return { appearance: "primary", id, kind: "line", through: [from, through] };
}

/** A polygon of the scene through its corners. */
function polygon(
  ...corners: [PlanePoint, PlanePoint, PlanePoint, ...PlanePoint[]]
): PlaneMathObject {
  return {
    appearance: "answer",
    id: "shade",
    kind: "polygon",
    vertices: corners,
  };
}

const across = line("across", { x: 0, y: 5 }, { x: 10, y: 5 });
const upright = line("upright", { x: 5, y: 0 }, { x: 5, y: 10 });

describe("inventedEdgeIssues", () => {
  it("names the edge that closes a cut region along any side of the frame", () => {
    const cases = [
      {
        cut: across,
        shade: polygon(
          { x: 2, y: 0.5 },
          { x: 8, y: 0.5 },
          { x: 8, y: 5 },
          { x: 2, y: 5 }
        ),
        edge: "(2, 0.5) to (8, 0.5)",
      },
      {
        cut: across,
        shade: polygon(
          { x: 2, y: 5 },
          { x: 8, y: 5 },
          { x: 8, y: 9.5 },
          { x: 2, y: 9.5 }
        ),
        edge: "(8, 9.5) to (2, 9.5)",
      },
      {
        cut: upright,
        shade: polygon(
          { x: 0.5, y: 2 },
          { x: 5, y: 2 },
          { x: 5, y: 8 },
          { x: 0.5, y: 8 }
        ),
        edge: "(0.5, 8) to (0.5, 2)",
      },
      {
        cut: upright,
        shade: polygon(
          { x: 5, y: 2 },
          { x: 9.5, y: 2 },
          { x: 9.5, y: 8 },
          { x: 5, y: 8 }
        ),
        edge: "(9.5, 2) to (9.5, 8)",
      },
    ];
    for (const { cut, edge, shade } of cases) {
      assert.deepStrictEqual(inventedEdgeIssues(FRAME, [cut, shade]), [
        {
          issue: `Expected the polygon "shade" to close only along lines of the scene; its edge from ${edge} runs along the frame's edge and lies on no line, ray, segment, graph or axis, so it closes an open region with an invented edge. Draw it as { kind: "region", inequalities: [...] }, which continues past the frame, and bound it only where the mathematics does, such as x <= 7 for an area up to 7.`,
          path: ["objects", 1],
        },
      ]);
    }
  });

  it("keeps a region whose every edge lies on a line or an axis", () => {
    const slant = line("slant", { x: 0, y: 10 }, { x: 10, y: 0 });
    const triangle = polygon({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 10 });
    assert.deepStrictEqual(inventedEdgeIssues(FRAME, [slant, triangle]), []);
  });

  it("keeps a closing edge that an authored segment draws", () => {
    const side: PlaneMathObject = {
      appearance: "reference",
      from: { x: 9.5, y: 2 },
      id: "side",
      kind: "segment",
      to: { x: 9.5, y: 8 },
    };
    const shade = polygon(
      { x: 5, y: 2 },
      { x: 9.5, y: 2 },
      { x: 9.5, y: 8 },
      { x: 5, y: 8 }
    );
    assert.deepStrictEqual(
      inventedEdgeIssues(FRAME, [upright, side, shade]),
      []
    );
  });

  it("keeps a bound inside the frame, such as the end of an area under a graph", () => {
    const graph: PlaneMathObject = {
      appearance: "reference",
      formula: "x",
      id: "graph",
      kind: "function",
    };
    const area = polygon({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 });
    assert.deepStrictEqual(inventedEdgeIssues(FRAME, [graph, area]), []);
  });

  it("keeps a shape that no line or graph cuts, such as a box of a diagram", () => {
    const marker: PlaneMathObject = {
      appearance: "reference",
      at: { x: 1, y: 1 },
      id: "marker",
      kind: "point",
    };
    const box = polygon(
      { x: 0.5, y: 0.5 },
      { x: 9.5, y: 0.5 },
      { x: 9.5, y: 9.5 },
      { x: 0.5, y: 9.5 }
    );
    assert.deepStrictEqual(inventedEdgeIssues(FRAME, [marker, box]), []);
  });
});
