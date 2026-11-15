import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import {
  compileExplanationDocument,
  compileReadingDocument,
} from "#compiler/assessment/document";
import { blocks, reason, site } from "#compiler/test/assessment";

/** A three-dimensional lab of the lesson catalog, as a prompt places it. */
const LAB = Arr.join(
  [
    "<VirusStructureLab",
    '  title="Virion"',
    '  description="Rotate the virion."',
    '  labels={{ chooseMode: "Part", viewLabel: "Virion view", items: [{ tab: "Capsid" }] }}',
    "/>",
  ],
  "\n"
);

describe("figureNode", () => {
  it.effect("draws figures with their text alternative", () =>
    Effect.gen(function* () {
      const [chart, line, number, mermaid, circle, visual, unlabelled] =
        yield* blocks(
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
              "<LineEquation",
              '  alt="A line through the origin."',
              '  title="Line"',
              '  description="A line."',
              "  cameraPosition={[0, 0, 10]}",
              '  data={[{ color: "#4f46e5", points: [{ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 0 }], labels: [{ text: <InlineMath math="O" />, at: 0, fontSize: 0.6 }] }]}',
              "/>",
              "",
              "<NumberLine",
              '  title="Interval"',
              '  description="An open interval."',
              '  segments={[{ end: 1 }, { start: 1, end: 5, startLabel: <InlineMath math="1" />, endLabel: "5", label: "x" }, { start: 5 }]}',
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
            ],
            "\n"
          )
        );

      if (
        number?.type !== "figure" ||
        number.attrs.component !== "NumberLine"
      ) {
        return assert.fail("Expected a number line figure.");
      }
      assert.deepStrictEqual(
        Arr.map(number.attrs.props.segments, ({ end, start }) => [start, end]),
        [
          [undefined, 1],
          [1, 5],
          [5, undefined],
        ]
      );
      assert.deepStrictEqual(
        Arr.map(
          [chart, line, number, mermaid, circle, visual, unlabelled],
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

  it.effect("draws a lab of the lesson catalog in a prompt", () =>
    Effect.gen(function* () {
      const [lab] = yield* blocks(LAB);

      assert.deepStrictEqual(
        lab?.type === "figure"
          ? [lab.attrs.component, lab.attrs.alt]
          : ["block", ""],
        ["VirusStructureLab", "Rotate the virion."]
      );
    })
  );

  it.effect("refuses answer state before the answer, and shows it after", () =>
    Effect.gen(function* () {
      const circle =
        '<UnitCircle title="Angle" description="An angle." angle={30} trigValues={{ sin: "1/2" }} />';
      const takeaway = LAB.replace(
        'tab: "Capsid"',
        'tab: "Capsid", takeaway: "It protects."'
      );
      const prompt = yield* blocks(circle).pipe(Effect.flip);
      const explanation = yield* compileExplanationDocument({
        ...site,
        rawMdx: `${circle}\n\n${takeaway}`,
      });

      assert.deepStrictEqual(
        [prompt.reason, "cause" in prompt ? prompt.cause : undefined],
        ["answer", ["trigValues"]]
      );
      assert.strictEqual(yield* reason(takeaway), "answer");
      assert.strictEqual(
        yield* compileReadingDocument({ ...site, rawMdx: circle }).pipe(
          Effect.flip,
          Effect.map((error) => ("reason" in error ? error.reason : error._tag))
        ),
        "answer"
      );
      assert.deepStrictEqual(
        Arr.map(explanation.content, ({ type }) => type),
        ["figure", "figure"]
      );
    })
  );

  it.effect(
    "names a figure by its description or refuses one with neither",
    () =>
      Effect.gen(function* () {
        assert.strictEqual(
          yield* reason(
            '<FunctionAndNonFunctionRelationVisualizer accessibilityLabel="Arrows" domainLabel="X" codomainLabel="Y" domain={[]} codomain={[]} mappings={[]} />'
          ),
          "props"
        );
      })
  );

  it.effect("refuses a figure whose props its contract refuses", () =>
    Effect.gen(function* () {
      assert.strictEqual(
        yield* reason('<NumberLine title="Interval" description="None." />'),
        "props"
      );
      assert.strictEqual(
        yield* reason('<LineEquation title="L" description="D" data={[1]} />'),
        "props"
      );
      assert.strictEqual(
        yield* reason(
          '<UnitCircle title="" description="Angle." angle={30} />'
        ),
        "props"
      );
      assert.strictEqual(
        yield* reason('<Mermaid title="Flow" chart="pie title Share" />'),
        "props"
      );
      assert.strictEqual(
        yield* reason('<UnitCircle title="Angle" angle={30} />'),
        "props"
      );
    })
  );
});
