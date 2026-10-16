import { describe, expect, it } from "@effect/vitest";

import {
  InlineContentSchema,
  InlineInteractionNodeSchema,
  RichTextSchema,
} from "#contracts/assessment/inline";
import {
  failsStrict,
  math,
  placeInline,
  text,
} from "#contracts/test/assessment/document";

describe("text marks", () => {
  it("keeps marks in one order, each once, and links on HTTPS only", () => {
    expect(failsStrict(InlineContentSchema, [text("x", "bold", "link")])).toBe(
      false
    );
    for (const marks of [
      [{ type: "italic" }, { type: "bold" }],
      [{ type: "bold" }, { type: "bold" }],
      [],
      [{ attrs: { href: "http://nakafa.com" }, type: "link" }],
      [{ attrs: { href: "javascript:alert(1)" }, type: "link" }],
      [{ type: "strike" }],
    ]) {
      expect(
        failsStrict(InlineContentSchema, [{ marks, text: "x", type: "text" }])
      ).toBe(true);
    }
  });

  it("writes neighboring text with the same marks as one node", () => {
    for (const nodes of [
      [text("a"), text("b")],
      [text("a", "bold"), text("b", "bold")],
    ]) {
      expect(failsStrict(InlineContentSchema, nodes)).toBe(true);
      expect(failsStrict(RichTextSchema, nodes)).toBe(true);
    }
    for (const nodes of [
      [text("a", "bold"), text("b"), text("c", "bold")],
      [text("a"), math("x"), text("b")],
    ]) {
      expect(failsStrict(InlineContentSchema, nodes)).toBe(false);
    }
  });
});

describe("rich text", () => {
  it("holds text and inline math only, and is never empty", () => {
    expect(failsStrict(RichTextSchema, [text("a "), math("x")])).toBe(false);
    for (const input of [
      [],
      [{ type: "hardBreak" }],
      [placeInline("blank-1")],
      [text("a"), { type: "hardBreak" }],
    ]) {
      expect(failsStrict(RichTextSchema, input)).toBe(true);
    }
  });
});

describe("inline interactions", () => {
  it("names an interaction, and a gap or null", () => {
    expect(
      failsStrict(InlineInteractionNodeSchema, placeInline("blank-1"))
    ).toBe(false);
    expect(
      failsStrict(InlineInteractionNodeSchema, placeInline("gaps", "gap-1"))
    ).toBe(false);
    for (const input of [
      { attrs: { interaction: "blank-1" }, type: "inlineInteraction" },
      placeInline("Blank 1"),
      placeInline("gaps", "Gap 1"),
    ]) {
      expect(failsStrict(InlineInteractionNodeSchema, input)).toBe(true);
    }
  });
});
