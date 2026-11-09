import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { blocks, reason } from "#compiler/test/assessment";

describe("figureNode", () => {
  it.effect("draws figures with their text alternative", () =>
    Effect.gen(function* () {
      const [chart, mermaid, visual, unlabelled] = yield* blocks(
        Arr.join(
          [
            "<Chart",
            '  title="Sales"',
            '  description={<>Two series over <InlineMath math="3" /> years.</>}',
            '  bars="apart"',
            '  categories={["1", "2", "3"]}',
            '  series={[{ label: "A", mark: "bar", values: [1, 2, 3] }, { label: "B", mark: "line", values: [3, null, 1] }]}',
            '  valueLabel="Sold"',
            "/>",
            "",
            "<Mermaid",
            '  title="Flow"',
            '  description="A to B."',
            '  chart="flowchart TD; A --> B"',
            "/>",
            "",
            "<MathVisual",
            '  title="Point"',
            '  description="One point."',
            '  scene={{ space: "plane", frame: { kind: "cartesian", x: { min: -2, max: 2 }, y: { min: -2, max: 2 } }, view: { kind: "fit" }, objects: [{ id: "p", kind: "point", appearance: "primary", at: { x: 0, y: 0 } }] }}',
            "  labels={{}}",
            "/>",
            "",
            "<MathVisual",
            '  title="Unlabelled"',
            '  description="A scene without labels."',
            '  scene={{ space: "plane", frame: { kind: "cartesian", x: { min: -2, max: 2 }, y: { min: -2, max: 2 } }, view: { kind: "fit" }, objects: [{ id: "p", kind: "point", appearance: "primary", at: { x: 0, y: 0 } }] }}',
            "/>",
          ],
          "\n"
        )
      );

      assert.deepStrictEqual(
        Arr.map([chart, mermaid, visual, unlabelled], (node) =>
          node?.type === "figure"
            ? [node.attrs.component, node.attrs.alt]
            : ["block", ""]
        ),
        [
          ["Chart", "Two series over 3 years."],
          ["Mermaid", "A to B."],
          ["MathVisual", "One point."],
          ["MathVisual", "A scene without labels."],
        ]
      );
    })
  );

  it.effect("refuses a figure whose props its contract refuses", () =>
    Effect.gen(function* () {
      assert.strictEqual(
        yield* reason('<Mermaid title="Flow" chart="pie title Share" />'),
        "props"
      );
      assert.strictEqual(
        yield* reason('<Chart description="No values." />'),
        "props"
      );
    })
  );

  it.effect(
    "refuses the retired number line, line equation and unit circle, which no assessment document draws",
    () =>
      Effect.gen(function* () {
        for (const source of [
          '<NumberLine title="Interval" description="None." segments={[{ start: 1, end: 5 }]} />',
          '<LineEquation title="L" description="D" data={[]} />',
          '<UnitCircle title="Angle" description="Thirty degrees." angle={30} />',
        ]) {
          assert.strictEqual(
            yield* reason(source),
            "ContentTreeEvaluationError"
          );
        }
      })
  );
});
