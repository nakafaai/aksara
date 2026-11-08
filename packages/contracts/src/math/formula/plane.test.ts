import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Result } from "effect";
import type { SampleBox } from "#contracts/math/formula/box";
import {
  type FormulaGeometry,
  planeFormulaGeometry,
} from "#contracts/math/formula/plane";

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
      const dashed = Arr.filter(sampled.boundary, (piece) => piece.strict);
      const solid = Arr.filter(sampled.boundary, (piece) => !piece.strict);
      assert.isTrue(
        Arr.every(
          dashed,
          ({ points: [from] }) =>
            Math.abs((from?.y ?? 0) - (from?.x ?? 0)) < 0.05
        )
      );
      assert.isAbove(solid.length, 0);
      assert.isBelow(sampled.boundary.length, 12);
      assert.isTrue(
        Arr.every(sampled.boundary, (edge) => edge.points.length >= 2)
      );
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

  it("places a marker with the sliders and drops one that is not finite", () => {
    const placed = geometry(
      { ...fields, kind: "marker", x: "cos(a)", y: "sin(a)" },
      { a: Math.PI / 2 }
    );
    const missing = geometry(
      { ...fields, kind: "marker", x: "ln(a - a)", y: "0" },
      { a: Math.PI / 2 }
    );

    assert.strictEqual(placed.kind, "points");
    assert.deepStrictEqual(
      placed.kind === "points" ? placed.points.length : 0,
      1
    );
    assert.isTrue(
      placed.kind === "points" &&
        Arr.every(
          placed.points,
          ({ x, y }) => Math.abs(x) < 1e-12 && Math.abs(y - 1) < 1e-12
        )
    );
    assert.deepStrictEqual(missing, { kind: "points", points: [] });
  });

  it("joins a path through its formula points and closes it on request", () => {
    const corners = [
      { x: "0", y: "0" },
      { x: "cos(a)", y: "0" },
      { x: "cos(a)", y: "sin(a)" },
    ];
    const open = geometry(
      { ...fields, kind: "path", points: corners },
      { a: 0 }
    );
    const closed = geometry(
      { ...fields, closed: true, kind: "path", points: corners },
      { a: 0 }
    );
    const broken = geometry(
      { ...fields, kind: "path", points: [...corners, { x: "1 / 0", y: "0" }] },
      { a: 0 }
    );

    assert.deepStrictEqual(points(open).length, 3);
    assert.deepStrictEqual(points(closed).length, 4);
    assert.deepStrictEqual(points(closed)[3], points(closed)[0]);
    assert.deepStrictEqual(broken, { branches: [], kind: "curves" });
  });

  it("fails a marker whose formula does not read", () => {
    assert.isTrue(
      Result.isFailure(
        planeFormulaGeometry(
          { ...fields, kind: "marker", x: "cos(", y: "0" },
          box,
          {}
        )
      )
    );
  });
});
