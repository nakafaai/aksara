import { issueAtOffset } from "#nakafa-content/math/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { expectShape } from "#nakafa-content/mdx/shape";
import type { VisibleTextScan } from "#nakafa-content/mdx/visible";
import { visibleTextOffsets } from "#nakafa-content/mdx/visible";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** Unicode sub- and superscripts, math symbols, Greek letters, and arrows. */
const SYMBOL_PATTERN =
  /[²³¹⁰-₟−→←↔⇌⇄⇒⇐⇔×÷≤≥≠≈≡±∓√∛∞∑∏∫∂∇∈∉⊂⊆⊃⊇∪∩∀∃∠⊥∝Α-Ωα-ω]|<=>|<->|->|=>/gu;

/** A simple equation or inequality between numbers and one-letter variables. */
const EQUATION_PATTERN =
  /(?<![\p{L}\p{N}_])(?:\d+(?:[.,]\d+)?\p{Ll}?|[A-Za-z])(?:\s*[-+*/^]\s*(?:\d+(?:[.,]\d+)?\p{Ll}?|[A-Za-z]))*\s*[=<>]\s*-?(?:\d|[A-Za-z](?![\p{L}]))/gu;

/** A run of element symbols with counts, such as `H2O` or `C6H12O6`. */
const FORMULA_PATTERN =
  /(?<![\p{L}\p{N}_])(?:[A-Z][a-z]?\d*){1,}(?![\p{L}\p{N}_])/gu;
/** Plain-text chemical ions such as `Cu2+`, `Zn2+`, `Fe3+`, `Cl-`, `OH-`, `NO3-`, or `NH4+`. */
const ION_PATTERN =
  /(?<![\p{L}\p{N}_])(?<body>(?:[A-Z][a-z]?\d*)+)(?<charge>[+-])(?![\p{L}\p{N}_+-])/gu;
/** Plain-text ASCII unit exponents such as `mol/dm3`, `g/cm3`, `m/s2`, `cm3`, or `dm3`. */
const UNIT_EXPONENT_PATTERN =
  /(?<![\p{L}\p{N}_])(?:mol\/dm3|g\/cm3|kg\/m3|m\/s2|cm2|cm3|dm2|dm3|mm2|mm3|km2|km3)(?![\p{L}\p{N}_])/gu;
/** Plain-text caret powers such as `10^23`, `2^n`, `x^2`, or `s^-1`. */
const CARET_POWER_PATTERN =
  /(?<![\p{L}\p{N}_])(?:\d+|[A-Za-z])\^(?:-?\d+|[A-Za-z])(?![\p{L}\p{N}_])/gu;
const ELEMENT_PATTERN = /[A-Z][a-z]?/gu;
const DIGIT_PATTERN = /\d/u;
const LEADING_ZERO_PATTERN = /\D0/u;
const DIATOMIC_PATTERN = /^(?:H2|N2|O2|O3|F2|Cl2|Br2|I2)$/u;
/** Ordinary abbreviations that happen to match element symbols plus a digit. */
const NON_FORMULA_TOKENS = new Set(["P3K"]);
/** Single-charge monatomic cations written as `Na+`, `K+`, `Ag+`, `H+`, `Li+`, `Cu+`. */
const SINGLE_PLUS_IONS = new Set(["Ag", "Cu", "H", "K", "Li", "Na"]);
/** Single-charge monatomic halide anions written as `F-`, `Cl-`, `Br-`, `I-`. */
const SINGLE_MINUS_IONS = new Set(["Br", "Cl", "F", "I"]);
/** Multivalent monatomic anions written as `O2-`, `S2-`, `N3-`, `P3-`, `Se2-`. */
const MULTI_MINUS_IONS = new Set(["N3", "O2", "P3", "S2", "Se2"]);
/** Common two-symbol single-charge polyatomic anions without digits (`OH-`, `CN-`, `HS-`). */
const SIMPLE_POLYATOMIC_ANIONS = new Set(["CN", "HS", "OH"]);

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
  if (NON_FORMULA_TOKENS.has(token)) {
    return false;
  }
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

/** Whether a charged token such as `Cu2+`, `NO3-`, `OH-`, or `Cl-` is a chemical ion. */
function isChemicalIon(body: string, charge: string): boolean {
  const symbols = [...body.matchAll(ELEMENT_PATTERN)].map((match) => match[0]);
  if (!symbols.every((symbol) => ELEMENTS.has(symbol))) {
    return false;
  }
  const hasDigit = DIGIT_PATTERN.test(body);
  if (charge === "+") {
    return symbols.length >= 2 || hasDigit || SINGLE_PLUS_IONS.has(body);
  }
  if (symbols.length >= 2) {
    return hasDigit || SIMPLE_POLYATOMIC_ANIONS.has(body);
  }
  return SINGLE_MINUS_IONS.has(body) || MULTI_MINUS_IONS.has(body);
}

/** Returns the index of every plain-text math or chemistry match in a text. */
function findPlainMath(text: string): number[] {
  const formulas = [...text.matchAll(FORMULA_PATTERN)].filter((match) =>
    isFormula(match[0])
  );
  const ions = [...text.matchAll(ION_PATTERN)].filter((match) => {
    const body = match.groups?.body;
    const charge = match.groups?.charge;
    expectShape(body !== undefined && charge !== undefined);
    return isChemicalIon(body, charge);
  });
  return [
    ...[...text.matchAll(SYMBOL_PATTERN)],
    ...[...text.matchAll(EQUATION_PATTERN)],
    ...[...text.matchAll(UNIT_EXPONENT_PATTERN)],
    ...[...text.matchAll(CARET_POWER_PATTERN)],
    ...formulas,
    ...ions,
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
    "footer",
    "helperCaption",
    "label",
    "labels",
    "legend",
    "subtitle",
    "title",
    "xLabel",
    "yLabel",
  ]),
  descendObjects: true,
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
 * text, which must be `<InlineMath />` or `<BlockMath />` instead.
 */
export function findPlainMathText(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  return visibleTextOffsets(source, tree, PLAIN_MATH_SCAN).map((offset) =>
    issueAtOffset(source, offset, "plain-math-text")
  );
}
