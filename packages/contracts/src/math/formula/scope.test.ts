import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Option, Schema } from "effect";
import type { SampleBox } from "#contracts/math/formula/box";
import {
  formulaScopeIssues,
  geometryVisible,
  parameterScope,
  planeFormulaFields,
  spaceFormulaFields,
} from "#contracts/math/formula/scope";
import {
  type PlaneMathObject,
  PlaneMathObjectSchema,
} from "#contracts/math/plane";
import { SpaceMathObjectSchema } from "#contracts/math/space";

const fields = { appearance: "primary", id: "object" } as const;
const plane = Schema.decodeUnknownSync(PlaneMathObjectSchema);
const space = Schema.decodeUnknownSync(SpaceMathObjectSchema);
const slider = { max: 3, min: -3, name: "a", value: 1 };

describe("formula fields", () => {
  it("names the variables each plane formula may read", () => {
    /** The path and readable variables of each formula of one decoded object. */
    const variables = (object: unknown) =>
      Arr.map(
        planeFormulaFields(plane(object)),
        ({ path, variables: each }) => [
          Arr.join(Arr.map(path, String), "."),
          Arr.join(each, ","),
        ]
      );

    assert.deepStrictEqual(
      variables({ ...fields, formula: "x", kind: "function" }),
      [["formula", "x"]]
    );
    assert.deepStrictEqual(
      variables({ ...fields, formula: "y", inputAxis: "y", kind: "function" }),
      [["formula", "y"]]
    );
    assert.deepStrictEqual(
      variables({
        ...fields,
        kind: "parametric",
        parameter: { max: 1, min: 0 },
        x: "t",
        y: "t",
      }),
      [
        ["x", "t"],
        ["y", "t"],
      ]
    );
    assert.deepStrictEqual(
      variables({
        ...fields,
        angle: { max: 1, min: 0 },
        kind: "polar",
        radius: "1",
      }),
      [["radius", "theta"]]
    );
    assert.deepStrictEqual(
      variables({ ...fields, equation: "x = y", kind: "implicit" }),
      [["equation", "x,y"]]
    );
    assert.deepStrictEqual(
      variables({
        ...fields,
        inequalities: ["y < x", "x < 1"],
        kind: "region",
      }),
      [
        ["inequalities.0", "x,y"],
        ["inequalities.1", "x,y"],
      ]
    );
    assert.deepStrictEqual(
      variables({ ...fields, at: { x: 0, y: 0 }, kind: "point" }),
      []
    );
  });

  it("names the variables each space formula may read", () => {
    /** The path and readable variables of each formula of one decoded object. */
    const variables = (object: unknown) =>
      Arr.map(
        spaceFormulaFields(space(object)),
        ({ path, variables: each }) => [
          Arr.join(Arr.map(path, String), "."),
          Arr.join(each, ","),
        ]
      );

    assert.deepStrictEqual(
      variables({
        ...fields,
        kind: "parametric",
        parameter: { max: 1, min: 0 },
        x: "t",
        y: "t",
        z: "t",
      }),
      [
        ["x", "t"],
        ["y", "t"],
        ["z", "t"],
      ]
    );
    assert.deepStrictEqual(
      variables({
        ...fields,
        kind: "surface",
        u: { max: 1, min: 0 },
        v: { max: 1, min: 0 },
        x: "u",
        y: "v",
        z: "u",
      }),
      [
        ["x", "u,v"],
        ["y", "u,v"],
        ["z", "u,v"],
      ]
    );
    assert.deepStrictEqual(
      variables({ ...fields, formula: "x y", kind: "function" }),
      [["formula", "x,y"]]
    );
    assert.deepStrictEqual(
      variables({
        ...fields,
        axis: "z",
        domain: { max: 1, min: 0 },
        formula: "z",
        kind: "revolution",
      }),
      [["formula", "z"]]
    );
    assert.deepStrictEqual(
      variables({ ...fields, at: { x: 0, y: 0, z: 0 }, kind: "point" }),
      []
    );
  });
});

describe("formulaScopeIssues", () => {
  it("reports a stray name and a repeated slider at their exact paths", () => {
    const objects = [
      plane({ ...fields, formula: "a x + q", kind: "function" }),
      plane({
        ...fields,
        id: "border",
        inequalities: ["y < a x", "y > b"],
        kind: "region",
      }),
      plane({
        ...fields,
        equation: "x^2 + y^2 = a",
        id: "ring",
        kind: "implicit",
      }),
    ];

    assert.deepStrictEqual(
      formulaScopeIssues(objects, planeFormulaFields, [
        slider,
        { ...slider, value: 2 },
      ]),
      [
        {
          issue: "Expected a unique slider name.",
          path: ["parameters", 1, "name"],
        },
        {
          issue: "Expected only x, a in this formula, not q.",
          path: ["objects", 0, "formula"],
        },
        {
          issue: "Expected only x, y, a in this formula, not b.",
          path: ["objects", 1, "inequalities", 1],
        },
      ]
    );
  });

  it("leaves a formula that does not read to its own field", () => {
    const broken: readonly PlaneMathObject[] = [
      { ...fields, formula: "2 +", kind: "function" },
      { ...fields, equation: "x <", kind: "implicit" },
    ];

    assert.deepStrictEqual(
      formulaScopeIssues(broken, planeFormulaFields, []),
      []
    );
  });

  it("starts every slider at its value", () => {
    assert.deepStrictEqual(
      parameterScope([slider, { ...slider, name: "k", value: 2 }]),
      { a: 1, k: 2 }
    );
  });
});

describe("geometryVisible", () => {
  const box: SampleBox = {
    x: { max: 1, min: 0 },
    y: { max: 1, min: 0 },
    z: { max: 1, min: 0 },
  };
  const inside = { x: 0.5, y: 0.5, z: 0.5 };
  const outside = { x: 2, y: 0.5, z: 0.5 };

  it("reads curves, regions, grids, and faces", () => {
    assert.isTrue(
      geometryVisible({ branches: [[inside]], kind: "curves" }, box)
    );
    assert.isFalse(geometryVisible({ branches: [[]], kind: "curves" }, box));
    assert.isTrue(
      geometryVisible({ boundary: [], fill: [[inside]], kind: "region" }, box)
    );
    assert.isFalse(
      geometryVisible({ boundary: [], fill: [], kind: "region" }, box)
    );
    assert.isTrue(
      geometryVisible(
        {
          grid: {
            columns: 1,
            points: [Option.none(), Option.some(inside)],
            rows: 0,
          },
          kind: "grid",
        },
        box
      )
    );
    assert.isFalse(
      geometryVisible(
        {
          grid: { columns: 1, points: [Option.some(outside)], rows: 0 },
          kind: "grid",
        },
        box
      )
    );
    assert.isTrue(
      geometryVisible({ faces: [[inside, inside, inside]], kind: "faces" }, box)
    );
    assert.isFalse(
      geometryVisible(
        { faces: [[inside, outside, inside]], kind: "faces" },
        box
      )
    );
    assert.isTrue(
      geometryVisible(
        { faces: [[{ ...outside, x: 0.5, z: 9 }]], kind: "faces" },
        { x: box.x, y: box.y }
      )
    );
  });
});
