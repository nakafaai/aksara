import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Result, Schema } from "effect";

import { SpaceMathObjectSchema } from "#contracts/math/space";
import { MathVisualSchema } from "#contracts/math/visual";

const base = [
  { x: 0, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 0, y: 2, z: 0 },
];

/** Decodes one space object and returns whether it passed. */
function accepts(fields: Record<string, unknown>) {
  return Result.isSuccess(
    Schema.decodeUnknownResult(SpaceMathObjectSchema)({
      appearance: "primary",
      id: "solid",
      ...fields,
    })
  );
}

describe("prisms and pyramids", () => {
  it("accepts a flat base with an offset or apex off its plane", () => {
    assert.isTrue(
      accepts({ base, kind: "prism", offset: { x: 0, y: 0, z: 1 } })
    );
    assert.isTrue(
      accepts({ apex: { x: 1, y: 1, z: 2 }, base, kind: "pyramid" })
    );
  });

  it("refuses an offset or apex in the base plane", () => {
    assert.isFalse(
      accepts({ base, kind: "prism", offset: { x: 1, y: 1, z: 0 } })
    );
    assert.isFalse(
      accepts({ apex: { x: 1, y: 1, z: 0 }, base, kind: "pyramid" })
    );
  });

  it("refuses a base that repeats a corner, leaves its plane, or has no area", () => {
    const repeated = [...base, { x: 0, y: 0, z: 0 }];
    const bent = [...base, { x: 1, y: 1, z: 1 }];
    const flat = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
    ];
    for (const face of [repeated, bent, flat]) {
      assert.isFalse(
        accepts({ apex: { x: 0, y: 0, z: 3 }, base: face, kind: "pyramid" })
      );
    }
  });
});

describe("space formula objects in a scene", () => {
  const frame = {
    kind: "cartesian",
    x: { max: 10, min: -10 },
    y: { max: 10, min: -10 },
    z: { max: 10, min: -10 },
  } as const;

  /** Decodes one space scene and returns whether it passed. */
  const scene = (objects: readonly Record<string, unknown>[]) =>
    Result.isSuccess(
      Schema.decodeUnknownResult(MathVisualSchema)({
        frame,
        objects: Arr.map(objects, (object, index) => ({
          appearance: "primary",
          id: `solid-${index}`,
          ...object,
        })),
        space: "space",
        view: { kind: "fit" },
      })
    );

  it("accepts solids and surfaces inside the frame", () => {
    assert.isTrue(
      scene([
        { base, kind: "prism", offset: { x: 0, y: 0, z: 2 } },
        { apex: { x: 0, y: 0, z: 2 }, base, kind: "pyramid" },
        { formula: "x y / 10", kind: "function" },
        {
          axis: "x",
          domain: { max: 2, min: 0 },
          formula: "x",
          kind: "revolution",
        },
        {
          kind: "parametric",
          parameter: { max: 6, min: 0 },
          x: "cos(t)",
          y: "sin(t)",
          z: "t",
        },
      ])
    );
  });

  it("refuses a prism that leaves the frame and a surface outside it", () => {
    assert.isFalse(
      scene([{ base, kind: "prism", offset: { x: 0, y: 0, z: 20 } }])
    );
    assert.isFalse(
      scene([
        {
          kind: "surface",
          u: { max: 1, min: 0 },
          v: { max: 1, min: 0 },
          x: "u + 40",
          y: "v",
          z: "0",
        },
      ])
    );
  });
});
