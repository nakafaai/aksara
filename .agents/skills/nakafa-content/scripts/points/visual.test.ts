import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { inspectDocument } from "#nakafa-content/points/document";
import { lesson } from "#nakafa-content/points/test/lesson";
import {
  countVisuals,
  findVisualLoss,
  isInteractiveVisual,
} from "#nakafa-content/points/visual";

/** Parses and inspects one lesson that holds the given teaching blocks. */
function parse(...blocks: readonly string[]) {
  return inspectDocument(parseLessonMdx(lesson(...blocks)));
}

/** Writes one self-closing LineEquation, the most common lesson visual. */
const LINE = '<LineEquation title="Line" description="A line." data={[]} />';
const UNIT_CIRCLE = '<UnitCircle title="Circle" description="A circle." />';

describe("interactive visual names", () => {
  it("counts every renderer component that models a concept", () => {
    for (const name of [
      "LineEquation",
      "MathVisual",
      "ScatterDiagram",
      "UnitCircle",
      "WindEnergyConversionLab",
    ]) {
      assert.isTrue(isInteractiveVisual(name), name);
    }
  });

  it("skips text, notation, emphasis, code, layout, and media", () => {
    for (const name of [
      "AgentContext",
      "BlockMath",
      "CodeBlock",
      "ContentBlock",
      "ContentGrid",
      "ContentStack",
      "Highlight",
      "InlineMath",
      "MathContainer",
      "Mermaid",
      "Youtube",
      "sup",
      "table",
    ]) {
      assert.isFalse(isInteractiveVisual(name), name);
    }
  });
});

describe("visual inventory", () => {
  it("tallies each visual by name wherever the document nests it", () => {
    const tree = parse(
      "<ContentStack>",
      `${LINE}\n\n${LINE}`,
      "</ContentStack>",
      '<ContentBlock><MathVisual title="Figure" description="A figure." scene={{}} labels={{}} /></ContentBlock>',
      `A circle ${UNIT_CIRCLE} sits inside a sentence with x<sup>2</sup> and <Highlight>one phrase</Highlight>.`,
      '<>\n\n<BlockMath math="y=x^2" />\n\n</>',
      '<MathContainer>\n<BlockMath math="a=1" />\n</MathContainer>',
      '<Mermaid chart="graph TD; A-->B" />'
    );

    assert.deepStrictEqual([...countVisuals(tree)].sort(), [
      ["LineEquation", 2],
      ["MathVisual", 1],
      ["UnitCircle", 1],
    ]);
  });
});

describe("visuals written inside expressions", () => {
  it("counts a visual in a flow expression or an attribute of another element", () => {
    const tree = parse(
      `{${LINE}}`,
      `<ContentBlock title={${UNIT_CIRCLE}} />`,
      '<>\n\n<BlockMath math="y=x" />\n\n</>'
    );

    assert.deepStrictEqual([...countVisuals(tree)].sort(), [
      ["LineEquation", 1],
      ["UnitCircle", 1],
    ]);
  });

  it("keeps the count when a visual moves into an expression", () => {
    const base = parse(LINE, UNIT_CIRCLE);

    assert.isUndefined(findVisualLoss(base, parse(`{${LINE}}`, UNIT_CIRCLE)));
  });

  it("notices a visual that is deleted from inside an expression", () => {
    const base = parse(`{${LINE}}`, UNIT_CIRCLE);

    assert.include(
      findVisualLoss(base, parse(UNIT_CIRCLE))?.message,
      "fell from 2 to 1 (LineEquation 1 to 0)"
    );
  });

  it("never counts a fragment or an element with a member name", () => {
    const tree = parse("<>\n\n</>", "{<Charts.Line data={[]} />}", "{<></>}");

    assert.deepStrictEqual([...countVisuals(tree)], []);
  });
});

describe("visual loss", () => {
  it("reports each component that fell when the total fell", () => {
    const base = parse(LINE, LINE, UNIT_CIRCLE, UNIT_CIRCLE, UNIT_CIRCLE);
    const head = parse(LINE, UNIT_CIRCLE);
    const loss = findVisualLoss(base, head);

    assert.strictEqual(loss?.rule, "interactive-visuals-fell");
    assert.strictEqual(loss?.line, 1);
    assert.strictEqual(loss?.column, 1);
    assert.include(
      loss?.message,
      "interactive visuals fell from 5 to 2 (LineEquation 2 to 1, UnitCircle 3 to 1)"
    );
  });

  it("names a component that disappeared completely", () => {
    const base = parse(LINE, UNIT_CIRCLE);
    const head = parse(LINE);

    assert.include(
      findVisualLoss(base, head)?.message,
      "interactive visuals fell from 2 to 1 (UnitCircle 1 to 0)"
    );
  });

  it("accepts a lesson that keeps, swaps, or gains visuals", () => {
    const base = parse(LINE, LINE);

    assert.isUndefined(findVisualLoss(base, parse(LINE, LINE)));
    assert.isUndefined(findVisualLoss(base, parse(LINE, UNIT_CIRCLE)));
    assert.isUndefined(findVisualLoss(base, parse(LINE, LINE, UNIT_CIRCLE)));
    assert.isUndefined(findVisualLoss(parse(), parse()));
  });
});
