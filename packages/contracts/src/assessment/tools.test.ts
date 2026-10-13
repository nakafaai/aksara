import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { ToolIdSchema, ToolSetSchema } from "#contracts/assessment/tools";

describe("player tools", () => {
  it("registers the twelve tools of the player", () => {
    expect(ToolIdSchema.literals).toEqual([
      "calculator-basic",
      "calculator-scientific",
      "calculator-graphing",
      "formula-sheet",
      "option-eliminator",
      "highlighter",
      "mark-for-review",
      "notes",
      "line-reader",
      "zoom",
      "hide-timer",
      "text-to-speech",
    ]);
    expect(Schema.is(ToolIdSchema)("calculator-none")).toBe(false);
  });

  it("enables each tool once, and at most one calculator", () => {
    for (const tools of [
      [],
      ["zoom", "notes"],
      ["calculator-graphing", "formula-sheet"],
    ]) {
      expect(Schema.is(ToolSetSchema)(tools)).toBe(true);
    }
    for (const tools of [
      ["zoom", "zoom"],
      ["calculator-basic", "calculator-scientific"],
      ["abacus"],
    ]) {
      expect(Schema.is(ToolSetSchema)(tools)).toBe(false);
    }
  });
});
