import type { MathFinding } from "#nakafa-content/math/finding";

const ALIGNED_ENVIRONMENT_NAMES = [
  "align",
  "aligned",
  "alignedat",
  "alignat",
  "split",
];

const RELATION_COMMANDS = [
  "approx",
  "approxeq",
  "cong",
  "equiv",
  "ge",
  "geq",
  "gt",
  "iff",
  "implies",
  "le",
  "Leftarrow",
  "Leftrightarrow",
  "leftarrow",
  "leq",
  "lt",
  "ne",
  "neq",
  "Rightarrow",
  "rightarrow",
  "sim",
  "simeq",
  "to",
];

const RELATION_PATTERN = new RegExp(
  `^(?:=|${RELATION_COMMANDS.map((name) => `\\\\${name}`).join("|")}|<|>)`,
  "u"
);

const RELATION_ANYWHERE_PATTERN = new RegExp(
  `(?:=|${RELATION_COMMANDS.map((name) => `\\\\${name}`).join("|")}|<|>)`,
  "u"
);

const CONJUNCTION_PATTERN =
  /\\(?:mbox|text|textrm|textnormal)\s*\{\s*(?:and|atau|dan|oder|or|serta)\s*\}/u;

/**
 * One symbol rather than a complete expression: a Latin letter or a command
 * name, with optional scripts and primes. A head that carries parentheses,
 * operators, or a text label stays a complete expression and is never reported.
 */
const BARE_TERM_PATTERN =
  /^(?:\\[A-Za-z]+|[A-Za-z])(?:_\{[^}]{1,8}\}|_[A-Za-z0-9]|\^\{[^}]{1,8}\}|\^[A-Za-z0-9])*(?:'|\\prime)*$/u;

const ENVIRONMENT_PATTERN = /\\(begin|end)\{([^}]*)\}/gu;

interface AlignedBlock {
  readonly rows: readonly string[];
  readonly start: number;
}

/** Splits one alignment body only at row breaks outside nested environments. */
function alignedRows(body: string): string[] {
  const spans: { end: number; start: number }[] = [];
  const stack: number[] = [];
  for (const match of body.matchAll(ENVIRONMENT_PATTERN)) {
    if (match[1] === "begin") {
      stack.push(match.index);
      continue;
    }
    const start = stack.pop();
    if (start !== undefined) {
      spans.push({ end: match.index + match[0].length, start });
    }
  }
  const rows: string[] = [];
  let cursor = 0;
  for (let index = 0; index + 1 < body.length; index += 1) {
    if (body[index] !== "\\" || body[index + 1] !== "\\") {
      continue;
    }
    if (spans.some((span) => index >= span.start && index < span.end)) {
      continue;
    }
    rows.push(body.slice(cursor, index).trim());
    cursor = index + 2;
    index += 1;
  }
  rows.push(body.slice(cursor).trim());
  return rows.filter((row) => row !== "");
}

/** Reads every alignment environment in one math value with its start index. */
function alignedBlocks(value: string): AlignedBlock[] {
  const blocks: AlignedBlock[] = [];
  for (const name of ALIGNED_ENVIRONMENT_NAMES) {
    const open = `\\begin{${name}}`;
    const close = `\\end{${name}}`;
    let from = 0;
    for (;;) {
      const start = value.indexOf(open, from);
      if (start === -1) {
        break;
      }
      const end = value.indexOf(close, start);
      if (end === -1) {
        break;
      }
      const body = value.slice(start + open.length, end);
      blocks.push({
        rows: alignedRows(body),
        start,
      });
      from = end + close.length;
    }
  }
  return blocks;
}

/** Returns one aligned row without its leading alignment marker. */
function rowBody(row: string): string {
  return row.startsWith("&") ? row.slice(1).trimStart() : row;
}

/** Finds a relation aligned inside an unfinished argument or grouped value. */
function hasNestedRelation(row: string): boolean {
  let environmentDepth = 0;
  let groupDepth = 0;
  const tokens = row.matchAll(
    new RegExp(
      String.raw`\\(begin|end)\{[^}]*\}|\\[A-Za-z]+|\\[^A-Za-z]|[()[\]{}]|&\s*${RELATION_ANYWHERE_PATTERN.source}`,
      "gu"
    )
  );
  for (const [token, boundary] of tokens) {
    if (boundary) {
      environmentDepth += boundary === "begin" ? 1 : -1;
      continue;
    }
    if (environmentDepth !== 0) {
      continue;
    }
    if (token === "(" || token === "[" || token === "{" || token === "\\{") {
      groupDepth += 1;
    } else if (
      token === ")" ||
      token === "]" ||
      token === "}" ||
      token === "\\}"
    ) {
      groupDepth -= 1;
    } else if (token.startsWith("&") && groupDepth > 0) {
      return true;
    }
  }
  return false;
}

/** Finds alignment blocks and chains that split one equation across rows. */
export function findAlignedFindings(value: string): MathFinding[] {
  const findings: MathFinding[] = [];
  for (const { rows, start } of alignedBlocks(value)) {
    if (rows.some(hasNestedRelation)) {
      findings.push({ offset: start, rule: "nested-relation-alignment" });
    }
    const head = rowBody(rows[0] ?? "").trim();
    const next = rowBody(rows[1] ?? "");
    if (
      rows.length > 1 &&
      BARE_TERM_PATTERN.test(head) &&
      RELATION_PATTERN.test(next)
    ) {
      findings.push({ offset: start, rule: "split-aligned-head" });
    }
    for (const [index, row] of rows.entries()) {
      const body = rowBody(row);
      if (
        !(
          RELATION_ANYWHERE_PATTERN.test(body) &&
          CONJUNCTION_PATTERN.test(row) &&
          rows
            .slice(index + 1)
            .some((later) => RELATION_PATTERN.test(rowBody(later)))
        )
      ) {
        continue;
      }
      findings.push({ offset: start, rule: "conjunction-in-aligned-chain" });
    }
  }
  return findings;
}
