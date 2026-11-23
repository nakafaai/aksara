import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";

import {
  InlineContentSchema,
  InlineInteractionNodeSchema,
  MarkOrder,
  RichTextSchema,
} from "#contracts/assessment/inline";
import {
  failsStrict,
  math,
  placeInline,
  text,
} from "#contracts/test/assessment/document";

describe("text marks", () => {
  it("orders marks as a text node keeps them, the link last", () => {
    expect(
      Arr.map(
        Arr.sort(
          [
            { attrs: { href: "https://nakafa.com" }, type: "link" },
            { type: "code" },
            { type: "bold" },
          ] as const,
          MarkOrder
        ),
        ({ type }) => type
      )
    ).toEqual(["bold", "code", "link"]);
  });

  it("keeps marks in one order, each once, and links on HTTPS or the site", () => {
    expect(failsStrict(InlineContentSchema, [text("x", "bold", "link")])).toBe(
      false
    );
    expect(
      failsStrict(InlineContentSchema, [
        {
          marks: [
            { attrs: { href: "/en/subjects/mathematics" }, type: "link" },
          ],
          text: "x",
          type: "text",
        },
      ])
    ).toBe(false);
    for (const marks of [
      [{ type: "italic" }, { type: "bold" }],
      [{ type: "bold" }, { type: "bold" }],
      [],
      [{ attrs: { href: "http://nakafa.com" }, type: "link" }],
      [{ attrs: { href: "javascript:alert(1)" }, type: "link" }],
      [{ attrs: { href: "//example.com/lesson" }, type: "link" }],
      [{ attrs: { href: "/en/a lesson" }, type: "link" }],
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
  it("keeps marks on inline math in the same canonical order and allows unmarked math", () => {
    expect(failsStrict(InlineContentSchema, [math("x")])).toBe(false);
    expect(failsStrict(InlineContentSchema, [math("x", "bold")])).toBe(false);
    expect(
      failsStrict(InlineContentSchema, [math("x", "bold", "highlight", "link")])
    ).toBe(false);
    expect(
      failsStrict(RichTextSchema, [
        text("koefisien di depan ", "bold"),
        math("x", "bold"),
      ])
    ).toBe(false);
    expect(
      failsStrict(InlineContentSchema, [
        {
          attrs: { latex: "x^2" },
          marks: [{ attrs: { variant: "success" }, type: "highlight" }],
          type: "mathInline",
        },
      ])
    ).toBe(false);
    for (const marks of [
      [],
      [{ type: "italic" }, { type: "bold" }],
      [{ type: "bold" }, { type: "bold" }],
      [{ attrs: { variant: "danger" }, type: "highlight" }],
      [{ type: "strike" }],
    ]) {
      expect(
        failsStrict(InlineContentSchema, [
          { attrs: { latex: "x" }, marks, type: "mathInline" },
        ])
      ).toBe(true);
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
