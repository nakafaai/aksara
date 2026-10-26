import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { blocks, reason } from "#compiler/test/assessment";

describe("figureNode", () => {
  it.effect("draws figures with their text alternative", () =>
    Effect.gen(function* () {
      const [chart, line, number, mermaid, circle, visual, unlabelled] =
        yield* blocks(
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
            "<LineEquation",
            '  alt="A line through the origin."',
            '  title="Line"',
            '  description="A line."',
            "  cameraPosition={[0, 0, 10]}",
            '  data={[{ color: "#4f46e5", points: [{ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 0 }], labels: [{ text: <InlineMath math="O" />, at: 0 }] }]}',
            "/>",
            "",
            "<NumberLine",
            '  title="Interval"',
            '  description="An open interval."',
            '  segments={[{ start: 1, end: 5, startLabel: <InlineMath math="1" />, endLabel: "5", label: "x" }]}',
            "/>",
            "",
            "<Mermaid",
            '  title="Flow"',
            '  description="A to B."',
            '  chart="flowchart TD; A --> B"',
            "/>",
            "",
            "<UnitCircle",
            '  title="Angle"',
            '  description="Thirty degrees."',
            "  angle={30}",
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
          ].join("\n")
        );

      assert.deepStrictEqual(
        [chart, line, number, mermaid, circle, visual, unlabelled].map(
          (node) =>
            node?.type === "figure"
              ? [node.attrs.component, node.attrs.alt]
              : ["block", ""]
        ),
        [
          ["Chart", "Two series over 3 years."],
          ["LineEquation", "A line through the origin."],
          ["NumberLine", "An open interval."],
          ["Mermaid", "A to B."],
          ["UnitCircle", "Thirty degrees."],
          ["MathVisual", "One point."],
          ["MathVisual", "A scene without labels."],
        ]
      );
    })
  );

  it.effect("refuses a figure whose props its contract refuses", () =>
    Effect.gen(function* () {
      assert.strictEqual(
        yield* reason('<Mermaid title="Flow" description="A to B." />'),
        "props"
      );
      assert.strictEqual(
        yield* reason('<UnitCircle title="Angle" angle={30} />'),
        "props"
      );
    })
  );
});
