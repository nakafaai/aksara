import assert from "node:assert/strict";

import type { MathFinding } from "#nakafa-content/math/finding";

const TEXT_GROUP_NAMES = new Set(["text", "mbox", "textrm", "textnormal"]);
const COMMAND_NAME_SEPARATOR_PATTERN = /\s+/u;
const ASCII_LETTER_PATTERN = /[A-Za-z]/u;
const SPACE_PATTERN = /[ \t\n]/u;
/** A separator that cannot render: a math-mode space, or a closing `)` or `]`. */
const GLUED_BEFORE_PATTERN = /(?:[ \t]|[)\]])$/u;
const LEADING_HORIZONTAL_SPACE_PATTERN = /^[ \t]/u;
const LEADING_WORD_CHARACTER_PATTERN = /^[\p{L}\p{N}]/u;
const TRAILING_WORD_CHARACTER_PATTERN = /[\p{L}\p{N}]$/u;
const SCRIPT_SUFFIX_PATTERN = /\s*[_^](?:\{[^{}]*\}|\\[A-Za-z]+|.)\s*$/u;

/** An ordinal suffix attaches to its value, as in the `(n)\text{th}` form. */
const ORDINAL_SUFFIX_PATTERN = /^\d?(?:st|nd|rd|th)$/u;

/** Builds one command-name set from a whitespace-separated list. */
function commandSet(names: string): ReadonlySet<string> {
  return new Set(
    names.split(COMMAND_NAME_SEPARATOR_PATTERN).filter((name) => name !== "")
  );
}

/**
 * Commands that never butt against a neighbour, so a swallowed space stays
 * harmless. A name absent from these sets is deliberately unclassified: a
 * wrong guess here would invent a defect.
 */
const SPACED_COMMAND_NAMES = commandSet(`
  approx ast asymp because begin Big big Bigg bigg Biggl biggl Biggr biggr
  Bigl bigl Bigr bigr bullet cap cdot cdotp cdots circ colon cong cup ddots
  displaystyle div doteq dots end enspace equiv hspace iff implies in land
  langle ldots le left Leftarrow leftarrow Leftrightarrow leq limits
  Longleftrightarrow Longrightarrow lor lvert lVert mapsto mid mp ne neg neq
  nmid nolimits notin oplus otimes parallel perp phantom pm prime propto qquad
  quad rangle right Rightarrow rightarrow rvert rVert sim simeq space subset
  subseteq supset tag textstyle therefore thinspace times to vdots vee vert
  Vert wedge
`);

/** Commands that typeset as an operand and therefore butt against a text group. */
const OPERAND_COMMAND_NAMES = commandSet(`
  abs aleph arccos arcsin arctan arg bar binom bmod cfrac cos cosh cot csc
  ddot deg det dfrac dim dot ell exp frac gcd hat hbar hom Im inf infty int
  ker lcm lg lim liminf limsup ln log mathbb mathbf mathcal mathfrak mathit
  mathrm mathsf mathtt max mbox min mod operatorname overbrace overline
  partial pmod prod Re sec sin sinh sqrt sum sup tan tanh text textnormal
  textrm tfrac tilde underbrace underline vec widehat wp
`);

/** Greek letter commands that typeset as operands. */
const GREEK_COMMAND_NAMES = commandSet(`
  Alpha alpha Beta beta Chi chi Delta delta Epsilon epsilon Eta eta Gamma
  gamma Iota iota Kappa kappa Lambda lambda Mu mu Nu nu Omega omega Omicron
  omicron Phi phi Pi pi Psi psi Rho rho Sigma sigma Tau tau Theta theta
  Upsilon upsilon varepsilon varphi varpi varrho varsigma vartheta Xi xi Zeta
  zeta
`);

/**
 * Characters the renderer never separates from a following text group. The
 * vertical bar belongs here because the renderer assigns it no space class, so
 * an authored space before a word is dropped and the word welds onto the bar.
 */
const OPERAND_CHARACTERS = new Set([
  ..."0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ")",
  "]",
  "}",
  "|",
]);

interface CommandAtom {
  readonly kind: "command";
  readonly name: string;
  readonly start: number;
}

interface CharacterAtom {
  readonly character: string;
  readonly kind: "character";
  readonly start: number;
}

type MathAtom = CommandAtom | CharacterAtom;

interface TextGroup {
  readonly content: string;
  readonly end: number;
  readonly name: string;
  readonly start: number;
}

/** Reads one character that the caller has already proven is in range. */
function characterAt(value: string, index: number): string {
  const character = value[index];
  assert.ok(character !== undefined);
  return character;
}

/** Returns true for one authored ASCII letter. */
function isLetter(character: string): boolean {
  return ASCII_LETTER_PATTERN.test(character);
}

/** Returns true for one authored horizontal or line-break space. */
function isSpace(character: string): boolean {
  return SPACE_PATTERN.test(character);
}

/** Reads a text-like group that starts at one backslash. */
function textGroupAt(value: string, start: number): TextGroup | undefined {
  let index = start + 1;
  let name = "";
  let character = value[index];
  while (character !== undefined && isLetter(character)) {
    name += character;
    index += 1;
    character = value[index];
  }
  if (!TEXT_GROUP_NAMES.has(name) || value[index] !== "{") {
    return undefined;
  }
  const close = value.indexOf("}", index + 1);
  if (close === -1) {
    return undefined;
  }
  const content = value.slice(index + 1, close);
  return content.includes("{")
    ? undefined
    : { content, end: close + 1, name, start };
}

/** Reads the command name that starts at one backslash index. */
function commandNameAt(value: string, start: number): string {
  let index = start + 1;
  let name = "";
  let character = value[index];
  while (character !== undefined && isLetter(character)) {
    name += character;
    index += 1;
    character = value[index];
  }
  return name;
}

/** Returns the index of the opening brace that matches one closing brace. */
function matchingBrace(value: string, close: number): number | undefined {
  let depth = 0;
  for (let index = close; index >= 0; index -= 1) {
    if (value[index] === "}") {
      depth += 1;
    } else if (value[index] === "{") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }
  return undefined;
}

/** Resolves the command name that owns one run of trailing argument groups. */
function commandOwningGroups(
  value: string,
  close: number
): CommandAtom | undefined {
  let cursor = close;
  for (;;) {
    const open = matchingBrace(value, cursor);
    if (open === undefined) {
      return undefined;
    }
    let nameStart = open - 1;
    let name = "";
    let character = value[nameStart];
    while (character !== undefined && isLetter(character)) {
      name = character + name;
      nameStart -= 1;
      character = value[nameStart];
    }
    if (name !== "" && value[nameStart] === "\\") {
      return { kind: "command", name, start: nameStart };
    }
    const previous = value[open - 1];
    if (previous !== "}" && previous !== "]") {
      return undefined;
    }
    cursor = open - 1;
  }
}

/** Reads the atom that ends at one index, ignoring trailing whitespace. */
function atomEnding(value: string, end: number): MathAtom | undefined {
  let index = end;
  while (index > 0 && isSpace(characterAt(value, index - 1))) {
    index -= 1;
  }
  if (index === 0) {
    return undefined;
  }
  const last = characterAt(value, index - 1);
  if (last === "}") {
    const owner = commandOwningGroups(value, index - 1);
    return owner ?? { character: "}", kind: "character", start: index - 1 };
  }
  if (ASCII_LETTER_PATTERN.test(last)) {
    let cursor = index - 1;
    let name = "";
    let character: string | undefined = value[cursor];
    while (character !== undefined && isLetter(character)) {
      name = character + name;
      cursor -= 1;
      character = value[cursor];
    }
    return value[cursor] === "\\" && name !== ""
      ? { kind: "command", name, start: cursor }
      : { character: last, kind: "character", start: index - 1 };
  }
  if (last === "\\") {
    return {
      character: characterAt(value, index),
      kind: "character",
      start: index,
    };
  }
  return { character: last, kind: "character", start: index - 1 };
}

/**
 * Reads the operand that ends at one index, stepping past attached scripts so
 * `45^\circ` classifies as the operand `45` rather than the symbol `\circ`.
 */
function operandBefore(value: string, end: number): MathAtom | undefined {
  let cursor = end;
  let suffix = SCRIPT_SUFFIX_PATTERN.exec(value.slice(0, cursor));
  while (suffix) {
    cursor -= suffix[0].length;
    suffix = SCRIPT_SUFFIX_PATTERN.exec(value.slice(0, cursor));
  }
  return atomEnding(value, cursor);
}

/** Reads the atom that starts at one index, ignoring leading whitespace. */
function atomStarting(value: string, start: number): MathAtom | undefined {
  let index = start;
  let character = value[index];
  while (character !== undefined && isSpace(character)) {
    index += 1;
    character = value[index];
  }
  if (character === undefined) {
    return undefined;
  }
  if (character !== "\\") {
    return { character, kind: "character", start: index };
  }
  const name = commandNameAt(value, index);
  if (name !== "") {
    return { kind: "command", name, start: index };
  }
  const next = value[index + 1];
  if (next === "\\") {
    return { kind: "command", name: "rowbreak", start: index };
  }
  return next === undefined
    ? undefined
    : { character: next, kind: "character", start: index + 1 };
}

/** Returns true when one atom typesets flush against a neighbouring atom. */
function isOperand(atom: MathAtom | undefined): boolean {
  if (atom === undefined) {
    return false;
  }
  if (atom.kind === "character") {
    return OPERAND_CHARACTERS.has(atom.character);
  }
  if (SPACED_COMMAND_NAMES.has(atom.name)) {
    return false;
  }
  return (
    OPERAND_COMMAND_NAMES.has(atom.name) || GREEK_COMMAND_NAMES.has(atom.name)
  );
}

/** Finds text groups whose authored separating space never reaches the page. */
export function findGluedTextGroups(value: string): MathFinding[] {
  const findings: MathFinding[] = [];
  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== "\\") {
      continue;
    }
    const group = textGroupAt(value, index);
    if (group === undefined) {
      continue;
    }
    index = group.end - 1;
    const before = value.slice(0, group.start);
    if (
      GLUED_BEFORE_PATTERN.test(before) &&
      LEADING_WORD_CHARACTER_PATTERN.test(group.content) &&
      !ORDINAL_SUFFIX_PATTERN.test(group.content) &&
      isOperand(operandBefore(value, group.start))
    ) {
      findings.push({ offset: group.start, rule: "glued-text-math" });
    }
    const after = value.slice(group.end);
    if (
      LEADING_HORIZONTAL_SPACE_PATTERN.test(after) &&
      TRAILING_WORD_CHARACTER_PATTERN.test(group.content) &&
      isOperand(atomStarting(value, group.end))
    ) {
      findings.push({ offset: group.end - 1, rule: "glued-text-math" });
    }
  }
  return findings;
}
