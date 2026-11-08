import { Console, Effect } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import {
  type VisibleTextScan,
  visibleTextOffsets,
} from "#nakafa-content/mdx/visible";
import type { CliOptions } from "#nakafa-content/voice/options";
import type {
  LessonVoiceFileIssue,
  LessonVoiceIssue,
} from "#nakafa-content/voice/types";

/** Unicode sub- and superscripts, math symbols, Greek letters, and arrows. */
const SYMBOL_PATTERN =
  /[²³¹⁰-₟−→←↔⇌⇄⇒⇐⇔×÷≤≥≠≈≡±∓√∛∞∑∏∫∂∇∈∉⊂⊆⊃⊇∪∩∀∃∠⊥∝Α-Ωα-ω]|<=>|<->|->|=>/gu;

/** A simple equation or inequality between numbers and one-letter variables. */
const EQUATION_PATTERN =
  /(?<![\p{L}\p{N}_])(?:\d+(?:[.,]\d+)?\p{Ll}?|[A-Za-z])(?:\s*[-+*/^]\s*(?:\d+(?:[.,]\d+)?\p{Ll}?|[A-Za-z]))*\s*[=<>]\s*-?(?:\d|[A-Za-z](?![\p{L}]))/gu;

/** A run of element symbols with counts, such as `H2O` or `C6H12O6`. */
const FORMULA_PATTERN =
  /(?<![\p{L}\p{N}_])(?:[A-Z][a-z]?\d*){1,}(?![\p{L}\p{N}_])/gu;
const ELEMENT_PATTERN = /[A-Z][a-z]?/gu;
const DIGIT_PATTERN = /\d/u;
const LEADING_ZERO_PATTERN = /\D0/u;
const DIATOMIC_PATTERN = /^(?:H2|N2|O2|O3|F2|Cl2|Br2|I2)$/u;

/** Every element symbol of the periodic table. */
const ELEMENTS = new Set(
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(
    " "
  )
);

/**
 * Whether a token is a chemical formula: two or more element symbols with at
 * least one count that does not start with 0, such as `CO2` but not the food
 * code `CP077`, or a diatomic gas such as `O2`.
 */
function isFormula(token: string): boolean {
  if (DIATOMIC_PATTERN.test(token)) {
    return true;
  }
  const symbols = [...token.matchAll(ELEMENT_PATTERN)].map((match) => match[0]);
  return (
    DIGIT_PATTERN.test(token) &&
    !LEADING_ZERO_PATTERN.test(token) &&
    symbols.length >= 2 &&
    symbols.every((symbol) => ELEMENTS.has(symbol))
  );
}

/** Returns the index of every plain-text math or chemistry match in a text. */
function findPlainMath(text: string): number[] {
  const formulas = [...text.matchAll(FORMULA_PATTERN)].filter((match) =>
    isFormula(match[0])
  );
  return [
    ...[...text.matchAll(SYMBOL_PATTERN)],
    ...[...text.matchAll(EQUATION_PATTERN)],
    ...formulas,
  ].map((match) => match.index);
}

/**
 * The scan of learner text for mathematics or chemistry written as plain
 * text: prose, headings, table cells, and the text props of every visual.
 */
const PLAIN_MATH_SCAN: VisibleTextScan = {
  attributes: new Set([
    "alt",
    "caption",
    "description",
    "facts",
    "helperCaption",
    "label",
    "labels",
    "legend",
    "subtitle",
    "title",
    "xLabel",
    "yLabel",
  ]),
  find: findPlainMath,
  protectedTypes: new Set([
    "code",
    "definition",
    "html",
    "image",
    "inlineCode",
    "inlineMath",
    "link",
    "linkReference",
    "math",
    "mdxjsEsm",
  ]),
};

/**
 * Finds mathematics and chemistry that learner-visible MDX writes as plain
 * text, which must be math instead: `$...$`, or mhchem `$\ce{...}$` for a
 * formula or a reaction.
 */
export function findPlainMathText(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  return visibleTextOffsets(source, tree, PLAIN_MATH_SCAN).map((offset) =>
    issueAtOffset(source, offset, "plain-math-text")
  );
}

/**
 * Prints the plain-text math count and every occurrence in a text report. The
 * list reports and does not fail, until the change that clears the last
 * occurrence moves `plain-math-text` into the blocking rules (D37).
 */
export const printPlainMath = Effect.fn("PlainMath.print")(function* (
  format: CliOptions["format"],
  issues: readonly LessonVoiceFileIssue[] | undefined
) {
  if (format !== "text" || issues === undefined) {
    return;
  }
  yield* Console.log(
    `${issues.length} plain-text math or chemistry expression(s); write each as <InlineMath /> in prose or $...$ in a visual's text prop, with \\ce{...} for chemistry:`
  );
  for (const issue of issues) {
    yield* Console.log(
      `${issue.file}:${issue.line}:${issue.column} [plain-math-text] ${issue.excerpt}`
    );
  }
});
