import { Array as Arr, type Schema } from "effect";
import {
  type FormulaParameter,
  type FormulaReadout,
  isPlaneFormulaPoint,
} from "#contracts/math/formula/field";
import { expression, strayIssues } from "#contracts/math/formula/scope";

/**
 * Reports every label position or readout formula that reads a name other
 * than a slider's, since only the sliders move them, and every readout key
 * that repeats an earlier one.
 */
export function sliderFormulaIssues(
  labels: readonly { readonly at: unknown }[],
  readouts: readonly FormulaReadout[],
  parameters: readonly FormulaParameter[]
): readonly Schema.FilterIssue[] {
  const declared = Arr.dedupe(Arr.map(parameters, ({ name }) => name));
  const anchors = Arr.flatMap(labels, ({ at }, index) =>
    isPlaneFormulaPoint(at)
      ? Arr.flatMap(["x", "y"] as const, (axis) =>
          strayIssues(expression([axis], at[axis], []), declared, [
            "labels",
            index,
            "at",
          ])
        )
      : []
  );
  const values = Arr.flatMap(readouts, ({ formula }, index) =>
    strayIssues(expression(["formula"], formula, []), declared, [
      "readouts",
      index,
    ])
  );
  const keys = Arr.map(readouts, ({ key }) => key);
  const repeated = Arr.flatMap(keys, (key, index): Schema.FilterIssue[] =>
    Arr.contains(Arr.take(keys, index), key)
      ? [
          {
            issue: "Expected a unique readout key.",
            path: ["readouts", index, "key"],
          },
        ]
      : []
  );
  return [...anchors, ...values, ...repeated];
}
