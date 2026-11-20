import { assert, describe, it } from "@effect/vitest";
import {
  findLengthFindings,
  visibleWords,
} from "#nakafa-content/heading/length";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";

/** A paragraph of the given number of words. */
const words = (count: number) =>
  Array.from({ length: count }, () => "kata").join(" ");

/** The rule and line of every length finding of one page. */
function length(source: string): string[] {
  return findLengthFindings(parseLessonMdx(source)).map(
    ({ blocking, line, rule }) =>
      `${rule} ${blocking ? "block" : "review"} ${line}`
  );
}

describe("visibleWords", () => {
  it("counts text and JSX children, never formulas, code, or props", () => {
    const tree = parseLessonMdx(
      'Dua kata <Highlight>tiga empat</Highlight> <InlineMath math="x + y" />.\n\n```py\nprint(1)\n```\n\n<MathVisual title="Judul panjang" />'
    );
    assert.strictEqual(visibleWords(tree), 4);
  });
});

describe("findLengthFindings", () => {
  it("reviews a leaf section above 300 words of text alone", () => {
    const page = `## Satu\n\n${words(301)}\n\n## Dua\n\n${words(301)}\n\n| a |\n| - |\n| b |\n\n## Tiga\n\n### Empat\n\n${words(40)}`;

    assert.deepStrictEqual(length(page), ["section-span review 1"]);
  });

  it("reviews a page above 1,400 words and one dense with headings", () => {
    const long = `## Satu\n\n${words(290)}\n\n| a |\n| - |\n| b |\n\n`.repeat(
      5
    );
    const dense = "## A\n\nSatu dua.\n\n## B\n\nTiga empat.";

    assert.deepStrictEqual(length(long), ["lesson-length review 1"]);
    assert.deepStrictEqual(length(dense), ["heading-density review 1"]);
    assert.deepStrictEqual(length(""), []);
    assert.deepStrictEqual(findLengthFindings({ type: "root" }), []);
  });

  it("reads the line of a heading without a position as the first", () => {
    const tree = {
      children: [
        { children: [], depth: 2, type: "heading" },
        { children: [{ type: "text", value: words(301) }], type: "paragraph" },
      ],
      type: "root",
    };
    assert.deepStrictEqual(
      findLengthFindings(tree).map(({ line, rule }) => `${rule} ${line}`),
      ["section-span 1"]
    );
  });
});
