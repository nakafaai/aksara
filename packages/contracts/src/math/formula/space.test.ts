import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Option, Result } from "effect";

import type { FormulaGeometry } from "#contracts/math/formula/plane";
import type { SampleBox } from "#contracts/math/formula/sample";
import { spaceFormulaGeometry } from "#contracts/math/formula/space";

const box: SampleBox = {
  x: { max: 4, min: -4 },
  y: { max: 4, min: -4 },
  z: { max: 4, min: -4 },
};
const fields = { appearance: "primary", id: "solid" } as const;

/** Samples one object that must sample, returning its geometry. */
function geometry(
  object: Parameters<typeof spaceFormulaGeometry>[0]
): FormulaGeometry {
  const result = spaceFormulaGeometry(object, box, { r: 2 });
  assert.isTrue(Result.isSuccess(result));
  return Result.isSuccess(result)
    ? result.success
    : { branches: [], kind: "curves" };
}

/** Every defined point of a grid geometry. */
function gridPoints(sampled: FormulaGeometry) {
  return sampled.kind === "grid" ? Arr.getSomes(sampled.grid.points) : [];
}

describe("spaceFormulaGeometry", () => {
  it("builds the faces of a prism and of a pyramid", () => {
    const base = [
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: 0, y: 2, z: 0 },
    ] as const;
    const prism = geometry({
      ...fields,
      base,
      kind: "prism",
      offset: { x: 0, y: 0, z: 3 },
    });
    const pyramid = geometry({
      ...fields,
      apex: { x: 0, y: 0, z: 3 },
      base,
      kind: "pyramid",
    });

    assert.isTrue(prism.kind === "faces" && prism.faces.length === 5);
    assert.isTrue(pyramid.kind === "faces" && pyramid.faces.length === 4);
    if (prism.kind === "faces") {
      assert.deepStrictEqual(prism.faces[1], [
        { x: 0, y: 0, z: 3 },
        { x: 2, y: 0, z: 3 },
        { x: 0, y: 2, z: 3 },
      ]);
    }
  });

  it("traces a space curve", () => {
    const helix = geometry({
      ...fields,
      kind: "parametric",
      parameter: { max: 6, min: 0 },
      x: "cos(t)",
      y: "sin(t)",
      z: "t/2",
    });
    assert.isTrue(helix.kind === "curves" && helix.branches.length === 1);
  });

  it("samples z = f(x, y), a parametric surface, and holes where undefined", () => {
    const saddle = geometry({
      ...fields,
      formula: "(x^2 - y^2)/4",
      kind: "function",
    });
    assert.isTrue(
      Arr.every(
        gridPoints(saddle),
        ({ x, y, z }) => Math.abs(z - (x * x - y * y) / 4) < 1e-9
      )
    );

    const bowl = geometry({
      ...fields,
      domain: { x: { max: 1, min: -1 }, y: { max: 1, min: -1 } },
      formula: "sqrt(1 - x^2 - y^2)",
      kind: "function",
    });
    assert.isTrue(
      bowl.kind === "grid" && Arr.some(bowl.grid.points, Option.isNone)
    );

    const sphere = geometry({
      ...fields,
      kind: "surface",
      u: { max: Math.PI, min: 0 },
      v: { max: 2 * Math.PI, min: 0 },
      x: "r sin(u) cos(v)",
      y: "r sin(u) sin(v)",
      z: "r cos(u)",
    });
    assert.isTrue(
      Arr.every(
        gridPoints(sphere),
        ({ x, y, z }) => Math.abs(Math.hypot(x, y, z) - 2) < 1e-9
      )
    );
  });

  it("turns a profile around each axis", () => {
    for (const axis of ["x", "y", "z"] as const) {
      const cone = geometry({
        ...fields,
        axis,
        domain: { max: 2, min: 0 },
        formula: `${axis}/2`,
        kind: "revolution",
      });
      const others = Arr.filter(
        ["x", "y", "z"] as const,
        (each) => each !== axis
      );
      assert.isTrue(
        Arr.every(gridPoints(cone), (point) => {
          const [first = "x", second = "y"] = others;
          return (
            Math.abs(
              Math.hypot(point[first], point[second]) - point[axis] / 2
            ) < 1e-9
          );
        }),
        axis
      );
    }
  });

  it("fails on a formula that does not read", () => {
    for (const object of [
      {
        ...fields,
        kind: "parametric",
        parameter: { max: 1, min: 0 },
        x: "t",
        y: "t",
        z: "(",
      },
      { ...fields, formula: "*", kind: "function" },
      {
        ...fields,
        kind: "surface",
        u: { max: 1, min: 0 },
        v: { max: 1, min: 0 },
        x: "u",
        y: "v",
        z: "+",
      },
      {
        ...fields,
        axis: "x",
        domain: { max: 1, min: 0 },
        formula: ")",
        kind: "revolution",
      },
    ] as const) {
      assert.isTrue(
        Result.isFailure(spaceFormulaGeometry(object, box, {})),
        object.kind
      );
    }
  });
});
