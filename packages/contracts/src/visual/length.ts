import { Array as Arr, Schema } from "effect";

import type { RichText } from "#contracts/assessment/inline";

/** Commands that set size, style or spacing and draw no glyph of their own. */
const SILENT =
  /\\(?:(?:left|right|big|Big|bigg|Bigg|displaystyle|textstyle|scriptstyle|quad|qquad)(?![a-zA-Z])|[,;:!> ])/gu;

/** Commands whose argument is words, which show letter for letter. */
const WORDS =
  /\\(?:text|textbf|textit|textrm|mathrm|mathbf|mathit|operatorname)\s*\{(?<words>[^{}]*)\}/gu;

/** Any other command or escaped symbol, which draws one glyph. */
const GLYPH = /\\(?:[a-zA-Z]+|.)/gu;

/** Grouping, script and alignment marks, which shape a formula and show nothing. */
const MARKS = /[{}^_&\s]/gu;

/**
 * About how many glyphs a LaTeX formula draws: one for each letter, digit and
 * symbol, one for each command such as `\alpha` or `\le`, the letters of its
 * words in `\text{...}`, and nothing for grouping, scripts or spacing. A
 * fraction counts its numerator and denominator side by side, which is what a
 * reader scans.
 */
export function latexGlyphs(latex: string) {
  return (
    latex
      // The named group is also the first argument after the whole match.
      .replace(WORDS, (_command, words: string) => words.replace(/\s/gu, "~"))
      .replace(SILENT, "")
      .replace(GLYPH, "#")
      .replace(MARKS, "").length
  );
}

/** How many characters a rich text shows: its letters, and the glyphs of its math. */
export function visibleLength(text: RichText) {
  return Arr.reduce(
    text,
    0,
    (sum, node) =>
      sum +
      (node.type === "text"
        ? Array.from(node.text).length
        : latexGlyphs(node.attrs.latex))
  );
}

/** Keeps a rich text to at most `limit` visible characters (`visibleLength`). */
export function atMostVisible(limit: number, message: string) {
  return Schema.makeFilter((text: RichText) => visibleLength(text) <= limit, {
    message,
  });
}
