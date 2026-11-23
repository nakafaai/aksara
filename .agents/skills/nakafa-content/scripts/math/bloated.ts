import { Array as Arr, Predicate } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { MdxAttribute, MdxNode } from "#nakafa-content/mdx/parse";
import {
  asEstreeNode,
  attributeEstree,
  estreeChildren,
} from "#nakafa-content/mdx/parse";

const BLOCK_LATEX_PATTERN =
  /\\begin\{|\\displaystyle\b|\\(?:sum|int|lim|prod)(?:_|\^|\s)/u;
const FRAC_PATTERN = /\\d?frac\b/gu;
const COMPLEX_IN_EQUATION_PATTERN = /\\(?:d?frac|sqrt)\b/u;
const RELATION_PATTERN =
  /\\(?:neq|ne|leq|le|geq|ge|approx|equiv|implies|Rightarrow|iff|Leftrightarrow|rightarrow|to)\b|[=<>]/gu;
const SHORT_BOUNDED_INTERVAL_PATTERN =
  /^[A-Za-z0-9\\{}().,\s]+(?:<=?|\\leq?|>=?|\\geq?)[A-Za-z0-9\\{}().,\s]+(?:<=?|\\leq?|>=?|\\geq?)[A-Za-z0-9\\{}().,\s]+$/u;
const FRACTION_GROUP_PATTERN =
  /\\d?frac\s*\{(?<numerator>[^{}]*)\}\s*\{(?<denominator>[^{}]*)\}/gu;
const COMPLEX_FRAC_CONTENT_PATTERN = /[+\-^]|\\(?:cdot|times|sqrt)\b/u;
const LATEX_WRAPPER_PATTERN =
  /\\(?:text|mathrm|mathbf|mathit|mathbb|left|right|bigl|bigr|Bigl|Bigr)\b/gu;
const WHITESPACE_AND_BRACES_PATTERN = /[\s{}]/gu;
const BINARY_OPERATOR_PATTERN =
  /(?:(?<=[\p{L}\p{N})}\]|])\s*[+-]\s*(?=[\p{L}\p{N}([{\\|])|\\(?:times|cdot|div)\b)/gu;

const MAX_EQUATION_VISIBLE_LENGTH = 24;
const MAX_EXPRESSION_VISIBLE_LENGTH = 40;
const MAX_SIMPLE_FRAC_PART_LENGTH = 6;
const MAX_INTERVAL_VISIBLE_LENGTH = 20;

/** Reads a static string value from an `<InlineMath math={...} />` attribute. */
function inlineMathLatex(node: MdxNode): string | undefined {
  const attribute = (node.attributes ?? []).find(
    (entry): entry is MdxAttribute => entry.name === "math"
  );
  if (attribute === undefined) {
    return undefined;
  }
  if (Predicate.isString(attribute.value)) {
    return attribute.value.trim();
  }
  const estree = attributeEstree(attribute);
  const [statement] = estree === undefined ? [] : estreeChildren(estree.body);
  const expression = asEstreeNode(statement?.expression);
  if (expression?.type === "Literal" && Predicate.isString(expression.value)) {
    return expression.value.trim();
  }
  return undefined;
}

/** Approximates visible character length of a LaTeX expression without wrapper syntax. */
function visibleLatexLength(latex: string): number {
  return latex
    .replace(LATEX_WRAPPER_PATTERN, "")
    .replace(WHITESPACE_AND_BRACES_PATTERN, "").length;
}

/** Checks whether a fraction in inline math is too complex or tall for prose. */
function hasComplexFraction(latex: string): boolean {
  const fractions = latex.match(FRAC_PATTERN) ?? [];
  if (fractions.length === 0) {
    return false;
  }
  if (fractions.length > 1) {
    return true;
  }
  const matched = [...latex.matchAll(FRACTION_GROUP_PATTERN)];
  if (matched.length === 0) {
    return true;
  }
  return Arr.some(matched, ([, rawNum, rawDen]) => {
    const numerator = String(rawNum);
    const denominator = String(rawDen);
    const cleanNum = numerator.replace(WHITESPACE_AND_BRACES_PATTERN, "");
    const cleanDen = denominator.replace(WHITESPACE_AND_BRACES_PATTERN, "");
    return (
      cleanNum.length > MAX_SIMPLE_FRAC_PART_LENGTH ||
      cleanDen.length > MAX_SIMPLE_FRAC_PART_LENGTH ||
      COMPLEX_FRAC_CONTENT_PATTERN.test(numerator) ||
      COMPLEX_FRAC_CONTENT_PATTERN.test(denominator)
    );
  });
}

/** Returns a reason when an `<InlineMath />` expression belongs in `<BlockMath />`. */
export function bloatedInlineMathReason(latex: string): string | undefined {
  if (latex.length === 0) {
    return undefined;
  }
  if (BLOCK_LATEX_PATTERN.test(latex)) {
    return "Uses a display math environment or large operator inside InlineMath. Move it into BlockMath.";
  }
  const visibleLength = visibleLatexLength(latex);
  const relations = latex.match(RELATION_PATTERN) ?? [];
  const binaryOps = latex.match(BINARY_OPERATOR_PATTERN) ?? [];
  if (relations.length >= 2) {
    const isShortInterval =
      relations.length === 2 &&
      binaryOps.length === 0 &&
      !COMPLEX_IN_EQUATION_PATTERN.test(latex) &&
      visibleLength <= MAX_INTERVAL_VISIBLE_LENGTH &&
      SHORT_BOUNDED_INTERVAL_PATTERN.test(latex);
    if (!isShortInterval) {
      return "Contains a multi-step equation or chained relation inside InlineMath. Move derivations and transformations into BlockMath.";
    }
  }
  if (hasComplexFraction(latex)) {
    return "Contains a complex or nested fraction inside InlineMath. Move it into BlockMath so prose stays readable.";
  }
  if (
    relations.length === 1 &&
    (COMPLEX_IN_EQUATION_PATTERN.test(latex) ||
      binaryOps.length >= 2 ||
      visibleLength > MAX_EQUATION_VISIBLE_LENGTH)
  ) {
    return "Contains a full equation or multi-term inequality inside InlineMath. Move it into BlockMath and keep InlineMath for short symbols, values, or brief conditions.";
  }
  if (binaryOps.length >= 3 || visibleLength > MAX_EXPRESSION_VISIBLE_LENGTH) {
    return "Contains a long multi-term expression inside InlineMath. Move it into BlockMath so paragraphs stay breathable on phones.";
  }
  return undefined;
}

/**
 * Flags bloated `<InlineMath />` elements inside prose paragraphs, lists, and
 * blockquotes. Table cells and visual props are skipped because they cannot
 * host `<BlockMath />`.
 */
export function findBloatedInlineMathFindings(tree: MdxNode): HeadingFinding[] {
  const findings: HeadingFinding[] = [];

  /** Walks prose-hosting MDX nodes and inspects inline math children. */
  function visit(node: MdxNode, inProseBlock: boolean): void {
    if (
      node.type === "table" ||
      node.type === "code" ||
      node.type === "mdxjsEsm" ||
      node.type === "mdxFlowExpression" ||
      node.type === "mdxTextExpression"
    ) {
      return;
    }
    if (
      inProseBlock &&
      (node.type === "mdxJsxTextElement" ||
        node.type === "mdxJsxFlowElement") &&
      node.name === "InlineMath"
    ) {
      const latex = inlineMathLatex(node);
      const reason =
        latex === undefined ? undefined : bloatedInlineMathReason(latex);
      if (reason !== undefined) {
        findings.push({
          blocking: true,
          line: node.position?.start?.line ?? 1,
          message: reason,
          rule: "bloated-inline-math",
        });
      }
      return;
    }
    const nextInProse =
      inProseBlock ||
      node.type === "paragraph" ||
      node.type === "listItem" ||
      node.type === "blockquote";
    for (const child of node.children ?? []) {
      visit(child, nextInProse);
    }
  }

  visit(tree, false);
  return findings;
}
