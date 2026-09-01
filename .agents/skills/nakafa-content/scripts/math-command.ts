import {
  asEstreeNode,
  type EstreeNode,
  estreeRange,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
} from "#nakafa-content/voice-mdx";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

const BARE_LATEX_DOTS_PATTERN = /(?<!\\)\b(?:ldots|cdots|vdots|ddots)\b/gu;
const STATIC_EXPRESSION_KEYS: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  LogicalExpression: ["left", "right"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  TemplateLiteral: ["quasis"],
};

/** Returns a diagnostic at one exact source offset. */
function issueAtOffset(source: string, offset: number): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  const line = source.slice(0, lineStart).split("\n").length;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line,
    rule: "malformed-latex-command",
  };
}

/** Locates one direct string attribute value inside its source range. */
function directAttributeOffsets(
  attribute: MdxAttribute,
  source: string
): { end: number; start: number } | undefined {
  if (typeof attribute.value !== "string") {
    return;
  }
  const start = attribute.position?.start?.offset;
  const end = attribute.position?.end?.offset;
  if (start === undefined || end === undefined) {
    return;
  }
  const localOffset = source.slice(start, end).indexOf(attribute.value);
  return localOffset === -1
    ? undefined
    : {
        end: start + localOffset + attribute.value.length,
        start: start + localOffset,
      };
}

/** Adds static string ranges from an authored math expression. */
function collectExpressionRanges(
  node: EstreeNode,
  ranges: Array<{ end: number; start: number }>
): void {
  if (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "TemplateElement"
  ) {
    const range = estreeRange(node);
    const start = range?.start?.offset;
    const end = range?.end?.offset;
    if (start !== undefined && end !== undefined) {
      ranges.push({ end, start });
    }
    return;
  }
  for (const key of STATIC_EXPRESSION_KEYS[node.type] ?? []) {
    const values = Array.isArray(node[key]) ? node[key] : [node[key]];
    for (const value of values) {
      const child = asEstreeNode(value);
      if (child) {
        collectExpressionRanges(child, ranges);
      }
    }
  }
}

/** Returns static authored ranges from a JSX expression attribute. */
function expressionAttributeOffsets(
  attribute: MdxAttribute
): Array<{ end: number; start: number }> {
  if (
    !attribute.value ||
    typeof attribute.value !== "object" ||
    !("data" in attribute.value) ||
    !attribute.value.data ||
    typeof attribute.value.data !== "object" ||
    !("estree" in attribute.value.data)
  ) {
    return [];
  }
  const estree = asEstreeNode(attribute.value.data.estree);
  const ranges: Array<{ end: number; start: number }> = [];
  if (estree) {
    collectExpressionRanges(estree, ranges);
  }
  return ranges;
}

/** Collects malformed dot commands from one explicit math prop. */
function collectAttributeOffsets(
  attribute: MdxAttribute,
  offsets: Set<number>,
  source: string
): void {
  if (attribute.name !== "math") {
    return;
  }
  const directRange = directAttributeOffsets(attribute, source);
  const ranges = directRange
    ? [directRange]
    : expressionAttributeOffsets(attribute);
  for (const range of ranges) {
    const math = source.slice(range.start, range.end);
    for (const match of math.matchAll(BARE_LATEX_DOTS_PATTERN)) {
      if (match.index !== undefined) {
        offsets.add(range.start + match.index);
      }
    }
  }
}

/** Collects malformed dot commands only from explicit math component props. */
function collectNodeOffsets(
  node: MdxNode,
  offsets: Set<number>,
  source: string
): void {
  if (node.type === "blockquote") {
    return;
  }
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    for (const attribute of node.attributes ?? []) {
      collectAttributeOffsets(attribute, offsets, source);
    }
  }
  for (const child of node.children ?? []) {
    collectNodeOffsets(child, offsets, source);
  }
}

/** Finds dot commands missing the leading backslash in rendered math. */
export function findMalformedLatexCommandIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const offsets = new Set<number>();
  collectNodeOffsets(tree, offsets, source);
  return [...offsets]
    .sort((left, right) => left - right)
    .map((offset) => issueAtOffset(source, offset));
}
