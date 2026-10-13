import { Array as Arr, Schema } from "effect";

import { hasDistinctIds } from "#contracts/assessment/identity";

/**
 * The calculators a section can offer. A section with none of them offers no
 * calculator; "none" is the absence of every identifier here.
 */
export const CalculatorToolSchema = Schema.Literals([
  "calculator-basic",
  "calculator-scientific",
  "calculator-graphing",
]);

/**
 * The registry of player tools. A section of an exam profile enables tools by
 * these identifiers: a calculator of one level, a formula sheet, an option
 * eliminator, a highlighter, mark for review, notes, a line reader, zoom, hide
 * timer, and text to speech.
 */
export const ToolIdSchema = Schema.Literals([
  ...CalculatorToolSchema.literals,
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
export type ToolId = typeof ToolIdSchema.Type;

/** Checks that a set of tools offers at most one calculator. */
function hasOneCalculator(tools: readonly ToolId[]) {
  return Arr.filter(tools, Schema.is(CalculatorToolSchema)).length <= 1;
}

/** A set of tools: each once, and at most one calculator. */
export const ToolSetSchema = Schema.Array(ToolIdSchema).check(
  Schema.makeFilter(hasDistinctIds, {
    message: "Expected each tool once.",
  }),
  Schema.makeFilter(hasOneCalculator, {
    message: "Expected at most one calculator.",
  })
);
export type ToolSet = typeof ToolSetSchema.Type;
