import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Result, Schema } from "effect";

import { MathVisualSchema } from "#contracts/math/visual";

const frame = {
  kind: "cartesian",
  x: { max: 10, min: -10 },
  y: { max: 10, min: -10 },
} as const;
const fields = { appearance: "primary" } as const;

/** Decodes one plane scene and returns the paths of every issue it raised. */
function issuePaths(scene: Record<string, unknown>) {
  const result = Schema.decodeUnknownResult(MathVisualSchema)({
    frame,
    space: "plane",
    view: { kind: "fit" },
    ...scene,
  });
  return Result.isSuccess(result)
    ? []
    : Arr.map(String(result.failure).split("\n"), (line) => line.trim());
}

describe("plane formula objects in a scene", () => {
  it("accepts visible formula objects that read only their variables and sliders", () => {
    assert.deepStrictEqual(
      issuePaths({
        labels: [
          { at: { x: 1, y: 1 }, key: "vertex", objectId: "parabola" },
          { at: { x: 2, y: 0 }, key: "ring", objectId: "circle" },
        ],
        objects: [
          { ...fields, formula: "a x^2", id: "parabola", kind: "function" },
          {
            ...fields,
            formula: "y",
            id: "mirror",
            inputAxis: "y",
            kind: "function",
          },
          {
            ...fields,
            equation: "x^2 + y^2 = 4",
            id: "circle",
            kind: "implicit",
          },
          {
            ...fields,
            angle: { max: 6, min: 0 },
            id: "spiral",
            kind: "polar",
            radius: "theta",
          },
          {
            ...fields,
            id: "loop",
            kind: "parametric",
            parameter: { max: 6, min: 0 },
            x: "cos(t)",
            y: "sin(t)",
          },
          { ...fields, id: "half", inequalities: ["y > x"], kind: "region" },
        ],
        parameters: [{ max: 2, min: -2, name: "a", value: 1 }],
      }),
      []
    );
  });

  it("refuses a curve outside the frame, a stray name, and a repeated slider", () => {
    const issues = issuePaths({
      objects: [
        { ...fields, formula: "x + 40", id: "far", kind: "function" },
        { ...fields, id: "empty", inequalities: ["y > 40"], kind: "region" },
        { ...fields, formula: "k x", id: "stray", kind: "function" },
      ],
      parameters: [
        { max: 2, min: -2, name: "a", value: 1 },
        { max: 2, min: -2, name: "a", value: 0 },
      ],
    });

    assert.isTrue(
      Arr.some(issues, (line) =>
        line.includes("Expected plane geometry visible inside its frame.")
      )
    );
    assert.isTrue(Arr.some(issues, (line) => line.includes("not k.")));
    assert.isTrue(
      Arr.some(issues, (line) =>
        line.includes("Expected a unique slider name.")
      )
    );
  });

  it("leaves a formula that does not read to its own field", () => {
    const issues = issuePaths({
      objects: [{ ...fields, formula: "2 +", id: "broken", kind: "function" }],
    });

    assert.isTrue(
      Arr.some(issues, (line) => line.includes("Expected a value."))
    );
    assert.isFalse(
      Arr.some(issues, (line) => line.includes("visible inside its frame"))
    );
  });
});
