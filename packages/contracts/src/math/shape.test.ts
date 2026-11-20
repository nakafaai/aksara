import { assert, describe, it } from "@effect/vitest";

import type {
  PlaneMathFrame,
  PlaneMathObject,
  PlaneMathView,
} from "#contracts/math/plane";
import { figureAspectIssues, keepsShape } from "#contracts/math/shape";

const circle: PlaneMathObject = {
  appearance: "primary",
  center: { x: 0, y: 0 },
  id: "circle",
  kind: "circle",
  radius: 1,
};

const graph: PlaneMathObject = {
  appearance: "primary",
  formula: "x^2",
  id: "graph",
  kind: "function",
};

/** A frame from the origin, as wide and as tall as given. */
function frame(width: number, height: number): PlaneMathFrame {
  return {
    kind: "cartesian",
    x: { max: width, min: 0 },
    y: { max: height, min: 0 },
  };
}

const fit: PlaneMathView = { kind: "fit" };

describe("keepsShape", () => {
  it("keeps one scale for a figure and lets a graph scale each axis", () => {
    assert.isTrue(keepsShape([graph, circle]));
    assert.isFalse(keepsShape([graph]));
  });
});

describe("figureAspectIssues", () => {
  it("accepts a figure's frame from 0.7 to 2 times as wide as tall", () => {
    for (const [width, height] of [
      [7, 10],
      [10, 10],
      [20, 10],
    ] as const) {
      assert.deepStrictEqual(
        figureAspectIssues(frame(width, height), [circle], fit),
        []
      );
    }
  });

  it("reports a figure's frame too tall or too wide, padding included", () => {
    assert.deepStrictEqual(
      figureAspectIssues(frame(2, 9), [circle], { kind: "fit", padding: 0.5 }),
      [
        {
          issue:
            "Expected the frame of a scene that keeps one scale (it draws one of: arc, circle, implicit, parametric, polar, polygon, ray, vector) to be between 0.7 and 2 times as wide as it is tall, padding included; this frame is 3 by 10 (0.3). Frame the region the figure teaches: the grid, the axes and every unbounded object continue past it.",
          path: ["frame"],
        },
      ]
    );
    assert.strictEqual(
      figureAspectIssues(frame(21, 10), [circle], fit).length,
      1
    );
  });

  it("leaves a graph's frame to the graph", () => {
    assert.deepStrictEqual(figureAspectIssues(frame(30, 1), [graph], fit), []);
  });
});
