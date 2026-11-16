import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { inspectDocument } from "#nakafa-content/points/document";
import { lesson } from "#nakafa-content/points/test/lesson";

/** Inspects one real lesson that holds the given teaching blocks. */
function inspect(...blocks: readonly string[]) {
  return inspectDocument(parseLessonMdx(lesson(...blocks)));
}

/** Lists the component that owns each numeric literal, in document order. */
function owners(...blocks: readonly string[]) {
  return inspect(...blocks)
    .nodes.filter(
      ({ node }) => node.type === "Literal" && typeof node.value === "number"
    )
    .map(({ component, node }) => [component, node.value]);
}

describe("document elements", () => {
  it("names every element of the page, nested or inline, in order", () => {
    const { elements } = inspect(
      '<ContentStack>\n<FunctionChart title="A" description="B" data={[]} />\n</ContentStack>',
      'A circle <VirusStructureLab title="C" description="D" /> sits in a sentence.'
    );

    assert.deepStrictEqual(elements, [
      "InlineMath",
      "ContentStack",
      "FunctionChart",
      "VirusStructureLab",
    ]);
  });

  it("names an element that an expression writes", () => {
    const { elements } = inspect(
      '{<FunctionChart title="A" description="B" data={[]} />}',
      '<ContentBlock title={<VirusStructureLab title="C" description="D" />} />'
    );

    assert.deepStrictEqual(elements, [
      "InlineMath",
      "FunctionChart",
      "ContentBlock",
      "VirusStructureLab",
    ]);
  });

  it("gives a fragment and a member element no name", () => {
    const { elements } = inspect(
      "<>\n\nA fragment.\n\n</>",
      "{<Charts.Line data={[]} />}",
      "{<>{1}</>}"
    );

    assert.deepStrictEqual(elements, ["InlineMath"]);
  });
});

describe("document expressions", () => {
  it("gives each attribute expression the element that holds it", () => {
    assert.deepStrictEqual(
      owners(
        '<FunctionChart title="A" description="B" data={[{ x: 1 }]} />',
        '<VirusStructureLab title="C" description="D" angle={2} />'
      ),
      [
        ["FunctionChart", 1],
        ["VirusStructureLab", 2],
      ]
    );
  });

  it("gives an element inside an expression its own attributes", () => {
    assert.deepStrictEqual(
      owners(
        '<ContentBlock title={<MathVisual title="A" description="B" scene={{ x: 1 }} />} gap={2} />'
      ),
      [
        ["MathVisual", 1],
        ["ContentBlock", 2],
      ]
    );
  });

  it("keeps the outer element for a fragment and loses it for a member name", () => {
    assert.deepStrictEqual(
      owners(
        '<FunctionChart title={<>{1}</>} description="A" data={[]} cameraTarget={[2]} />',
        "{<Charts.Line data={[3]} />}"
      ),
      [
        ["FunctionChart", 1],
        ["FunctionChart", 2],
        [undefined, 3],
      ]
    );
  });

  it("reads a flow expression, a spread attribute, and nothing else", () => {
    assert.deepStrictEqual(
      owners(
        "{[4]}",
        '<FunctionChart title="A" description="B" {...{ data: [5] }} />',
        "Plain text with {/* a comment */} inside, {6} and a string {'7'}."
      ),
      [
        [undefined, 4],
        ["FunctionChart", 5],
        [undefined, 6],
      ]
    );
  });
});
