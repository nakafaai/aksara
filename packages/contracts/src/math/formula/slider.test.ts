import { assert, describe, it } from "@effect/vitest";
import { sliderFormulaIssues } from "#contracts/math/formula/slider";

const slider = { max: 6, min: 0, name: "a", value: 1 } as const;

describe("sliderFormulaIssues", () => {
  it("lets labels and readouts read only the sliders", () => {
    assert.deepStrictEqual(
      sliderFormulaIssues(
        [{ at: { x: 1, y: 2 } }, { at: { x: "cos(a)", y: "sin(a) + x" } }],
        [
          { formula: "cos(a)", key: "cosine" },
          { formula: "t a", key: "speed" },
        ],
        [slider]
      ),
      [
        {
          issue: "Expected only a in this formula, not x.",
          path: ["labels", 1, "at", "y"],
        },
        {
          issue: "Expected only a in this formula, not t.",
          path: ["readouts", 1, "formula"],
        },
      ]
    );
  });

  it("reports a readout key that repeats an earlier one", () => {
    assert.deepStrictEqual(
      sliderFormulaIssues(
        [],
        [
          { formula: "a", key: "value" },
          { formula: "2 a", key: "value" },
        ],
        [slider]
      ),
      [
        {
          issue: "Expected a unique readout key.",
          path: ["readouts", 1, "key"],
        },
      ]
    );
  });
});
