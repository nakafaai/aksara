import { describe, expect, it } from "@effect/vitest";

import { failsStrict, text } from "#contracts/test/assessment/document";
import { tankProps } from "#contracts/test/assessment/figure";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const MathVisualSchema = assessmentVisuals.MathVisual.props;

describe("MathVisual props", () => {
  const { height: _height, ...fewer } = tankProps.labels;
  const extra = { depth: [text("d")] };

  it("needs one rich label for each label anchor of the scene", () => {
    expect(failsStrict(MathVisualSchema, tankProps)).toBe(false);
    for (const labels of [
      fewer,
      { ...tankProps.labels, ...extra },
      { ...fewer, ...extra },
    ]) {
      expect(failsStrict(MathVisualSchema, { ...tankProps, labels })).toBe(
        true
      );
    }
    const { labels: _labels, ...withoutLabels } = tankProps;

    expect(failsStrict(MathVisualSchema, withoutLabels)).toBe(true);
  });

  it("reuses the strict scene contract", () => {
    expect(
      failsStrict(MathVisualSchema, {
        ...tankProps,
        scene: { ...tankProps.scene, space: "line" },
      })
    ).toBe(true);
  });
});

describe("MathVisual answer state", () => {
  const [object] = tankProps.scene.objects;

  it("names objects drawn as the answer and the readouts a scene computes", () => {
    expect(answerState("MathVisual", tankProps)).toEqual([]);
    expect(
      answerState("MathVisual", {
        ...tankProps,
        scene: {
          ...tankProps.scene,
          objects: [{ ...object, appearance: "answer" }],
        },
      })
    ).toEqual(["scene.objects.0"]);
    expect(answerState("MathVisual", { scene: "none" })).toEqual([]);
    expect(answerState("MathVisual", {})).toEqual([]);
  });

  it("names the readouts of a plane, and nothing in a plane without them", () => {
    const plane = {
      frame: {
        kind: "cartesian",
        x: { max: 1.5, min: -1.5 },
        y: { max: 1.5, min: -1.5 },
      },
      objects: [
        {
          appearance: "primary",
          formula: "x",
          id: "diagonal",
          kind: "function",
        },
      ],
      readouts: [{ formula: "1", key: "one" }],
      space: "plane",
      view: { kind: "fit" },
    };
    const { readouts: _readouts, ...withoutReadouts } = plane;

    expect(answerState("MathVisual", { scene: plane })).toEqual([
      "scene.readouts",
    ]);
    expect(answerState("MathVisual", { scene: withoutReadouts })).toEqual([]);
  });
});

describe("formulas", () => {
  it("keep the spacing of a long formula and refuse an empty one", () => {
    const formula = assessmentVisuals.BlockMath.props;

    expect(failsStrict(formula, { math: "\n  x^2 + 1\n" })).toBe(false);
    for (const math of ["", "  "]) {
      expect(failsStrict(formula, { math })).toBe(true);
    }
  });
});
