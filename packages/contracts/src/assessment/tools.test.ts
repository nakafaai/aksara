import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { ToolSetSchema } from "#contracts/assessment/tools";

describe("player tools", () => {
  it("enables each tool once, at most one calculator, and no tool outside the registry", () => {
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
      // No calculator is the absence of every calculator, not a tool of its own.
      ["calculator-none"],
    ]) {
      expect(Schema.is(ToolSetSchema)(tools)).toBe(false);
    }
  });
});
