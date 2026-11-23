import { assert, describe, it } from "@effect/vitest";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  findBlockquoteFindings,
  hasAuthoredBlockquote,
} from "#nakafa-content/prose/blockquote";

describe("findBlockquoteFindings", () => {
  it("passes when at least one non-empty blockquote is present", () => {
    const withText = parseLessonMdx(
      "## Konsep\n\nTeks biasa.\n\n> Tanda negatif membalik arah gerak benda."
    );
    const withMath = parseLessonMdx(
      '## Konsep\n\n> <InlineMath math="x \\neq 0" />'
    );

    assert.isTrue(hasAuthoredBlockquote(withText));
    assert.isTrue(hasAuthoredBlockquote(withMath));
    assert.deepStrictEqual(findBlockquoteFindings(withText), []);
    assert.deepStrictEqual(findBlockquoteFindings(withMath), []);
  });

  it("blocks when no authored blockquote is present or a blockquote is empty", () => {
    const plain = parseLessonMdx("## Konsep\n\nHanya paragraf biasa.");
    const emptyQuote = {
      children: [{ children: [{ type: "thematicBreak" }], type: "blockquote" }],
      type: "root",
    };

    assert.isFalse(hasAuthoredBlockquote(plain));
    assert.isFalse(hasAuthoredBlockquote(emptyQuote));
    assert.deepStrictEqual(
      findBlockquoteFindings(plain).map(({ blocking, line, rule }) => [
        line,
        blocking,
        rule,
      ]),
      [[1, true, "missing-blockquote"]]
    );
  });
});
