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
      const nodes = yield* blocks(
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
            '  alt="A flow from A to B."',
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
        Arr.map(nodes, (node) =>
          node?.type === "figure"
            ? [node.attrs.component, node.attrs.alt]
            : ["block", ""]
        ),
        [
          ["Chart", "Two series over 3 years."],
          ["Mermaid", "A flow from A to B."],
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
      const takeaway = LAB.replace(
        'tab: "Capsid"',
        'tab: "Capsid", takeaway: "It protects."'
      );
      const explanation = yield* compileExplanationDocument({
        ...site,
        rawMdx: takeaway,
      });

      assert.strictEqual(yield* reason(takeaway), "answer");
      assert.strictEqual(
        yield* compileReadingDocument({ ...site, rawMdx: takeaway }).pipe(
          Effect.flip,
          Effect.map((error) => ("reason" in error ? error.reason : error._tag))
        ),
        "answer"
      );
      assert.deepStrictEqual(
        Arr.map(explanation.content, ({ type }) => type),
        ["figure"]
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
        yield* reason('<Mermaid title="Flow" chart="pie title Share" />'),
        "props"
      );
      assert.strictEqual(
        yield* reason('<Chart title="Sales" description="None." />'),
        "props"
      );
    })
  );

  it.effect("refuses a retired visual, which the catalog no longer holds", () =>
    Effect.gen(function* () {
      for (const name of ["LineEquation", "NumberLine", "UnitCircle"]) {
        assert.notStrictEqual(
          yield* reason(`<${name} title="Old" description="Retired." />`),
          "props"
        );
      }
    })
  );
});
