import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Result } from "effect";

import {
  type FormulaGeometry,
  planeFormulaGeometry,
} from "#contracts/math/formula/plane";
import type { SampleBox } from "#contracts/math/formula/sample";

const box: SampleBox = { x: { max: 4, min: -4 }, y: { max: 4, min: -4 } };
const fields = { appearance: "primary", id: "curve" } as const;

/** Samples one object that must sample, returning its geometry. */
function geometry(
  object: Parameters<typeof planeFormulaGeometry>[0],
  scope: Readonly<Record<string, number>> = {},
  named: readonly number[] = []
): FormulaGeometry {
  const result = planeFormulaGeometry(object, box, scope, named);
  assert.isTrue(Result.isSuccess(result));
  return Result.isSuccess(result)
    ? result.success
    : { branches: [], kind: "curves" };
}

/** Every sampled point of a curve geometry. */
function points(sampled: FormulaGeometry) {
  return sampled.kind === "curves" ? Arr.flatten(sampled.branches) : [];
}

describe("planeFormulaGeometry", () => {
  it("samples y = f(x) across the frame with parameters and named points", () => {
    const sampled = geometry(
      { ...fields, formula: "a x^2 - 1", kind: "function" },
      { a: 0.5 },
      [2]
    );

    assert.isTrue(Arr.some(points(sampled), ({ x, y }) => x === 2 && y === 1));
    assert.isTrue(
      Arr.every(
        points(sampled),
        ({ x, y }) => Math.abs(y - (0.5 * x * x - 1)) < 1e-9
      )
    );
  });

  it("samples x = f(y) inside its own domain", () => {
    const sampled = geometry({
      ...fields,
      domain: { max: 2, min: -2 },
      formula: "y^2",
      inputAxis: "y",
      kind: "function",
    });

    assert.isTrue(
      Arr.every(
        points(sampled),
        ({ x, y }) => y >= -2 && y <= 2 && Math.abs(x - y * y) < 1e-9
      )
    );
  });

  it("traces parametric and polar curves", () => {
    const circle = geometry({
      ...fields,
      kind: "parametric",
      parameter: { max: 2 * Math.PI, min: 0 },
      x: "2cos(t)",
      y: "2sin(t)",
    });
    assert.isTrue(
      Arr.every(
        points(circle),
        ({ x, y }) => Math.abs(Math.hypot(x, y) - 2) < 1e-9
      )
    );

    const rose = geometry({
      ...fields,
      angle: { max: Math.PI, min: 0 },
      kind: "polar",
      radius: "3sin(2theta)",
    });
    assert.isTrue(
      Arr.every(points(rose), ({ x, y }) => {
        const theta = Math.atan2(y, x);
        return (
          Math.abs(
            Math.abs(Math.hypot(x, y)) - Math.abs(3 * Math.sin(2 * theta))
          ) < 1e-6
        );
      })
    );
  });

  it("traces an implicit equation", () => {
    const ellipse = geometry({
      ...fields,
      equation: "x^2/9 + y^2/4 = 1",
      kind: "implicit",
    });
    assert.isTrue(
      Arr.every(
        points(ellipse),
        ({ x, y }) => Math.abs((x * x) / 9 + (y * y) / 4 - 1) < 0.02
      )
    );
  });

  it("shades a region and marks strict edges dashed", () => {
    const sampled = geometry({
      ...fields,
      inequalities: ["y < x", "y >= -1", "x <= 2"],
      kind: "region",
    });

    assert.strictEqual(sampled.kind, "region");
    if (sampled.kind === "region") {
      assert.isAbove(sampled.fill.length, 0);
      const strict = Arr.filter(sampled.boundary, ({ strict }) => strict);
      const solid = Arr.filter(sampled.boundary, ({ strict }) => !strict);
      assert.isTrue(
        Arr.every(
          strict,
          ({ points: [from] }) =>
            Math.abs((from?.y ?? 0) - (from?.x ?? 0)) < 0.05
        )
      );
      assert.isAbove(solid.length, 0);
    }
  });

  it("fails on a formula that does not read", () => {
    const formula = planeFormulaGeometry(
      { ...fields, formula: "2 +", kind: "function" },
      box,
      {}
    );
    assert.isTrue(Result.isFailure(formula));
    const region = planeFormulaGeometry(
      { ...fields, inequalities: ["y <"], kind: "region" },
      box,
      {}
    );
    assert.isTrue(Result.isFailure(region));
  });
});
