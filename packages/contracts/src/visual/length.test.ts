import { assert, describe, it } from "@effect/vitest";
import { Schema } from "effect";

import { RichTextSchema } from "#contracts/assessment/inline";
import {
  atMostVisible,
  latexGlyphs,
  visibleLength,
} from "#contracts/visual/length";

describe("latexGlyphs", () => {
  it("counts the glyphs a formula draws, not its source", () => {
    assert.strictEqual(latexGlyphs("2x + 5y < 10"), 8);
    assert.strictEqual(latexGlyphs("\\frac{a}{b}"), 3);
    assert.strictEqual(latexGlyphs("x^{2}_{1} \\le \\alpha"), 5);
    assert.strictEqual(latexGlyphs("\\left( x \\right)\\,\\quad y"), 4);
    assert.strictEqual(latexGlyphs("\\text{if } x \\{ 1 \\}"), 7);
  });
});

describe("visibleLength", () => {
  it("adds the letters of its text and the glyphs of its math", () => {
    const text = Schema.decodeSync(RichTextSchema)([
      { text: "Line ", type: "text" },
      { attrs: { latex: "y = 2x" }, type: "mathInline" },
    ]);
    assert.strictEqual(visibleLength(text), 9);
  });
});

describe("atMostVisible", () => {
  it("accepts a rich text up to its limit and refuses a longer one", () => {
    const schema = RichTextSchema.check(atMostVisible(4, "too long"));
    assert.isTrue(Schema.is(schema)([{ text: "four", type: "text" }]));
    assert.isFalse(Schema.is(schema)([{ text: "fives", type: "text" }]));
  });
});
