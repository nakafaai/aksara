import assert from "node:assert/strict";

import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  type SourceRange,
} from "#nakafa-content/mdx/parse";
import { directAttributeRange } from "#nakafa-content/mdx/rendered";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const PLAIN_MATH_LABEL_PATTERN = /\b(?:QR|LU|SVD|PLU|PCA)\b/gu;
const QR_CODE_PREFIX_PATTERN = /\b(?:code|kode)\s+$/iu;
const QR_CODE_SUFFIX_PATTERN = /^(?:\s+codes?\b|\s*-\s*codes?\b)/iu;
const LEARNER_TEXT_ATTRIBUTES = new Set([
  "alt",
  "caption",
  "description",
  "helperCaption",
  "label",
  "subtitle",
  "title",
]);
const PROTECTED_NODE_TYPES = new Set([
  "code",
  "definition",
  "heading",
  "html",
  "image",
  "inlineCode",
  "link",
  "linkReference",
  "mdxjsEsm",
]);
const PROTECTED_COMPONENT_NAMES = new Set([
  "a",
  "BlockMath",
  "CodeBlock",
  "InlineMath",
]);
const RENDERED_KEYS_BY_TYPE: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  LogicalExpression: ["left", "right"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  TemplateLiteral: ["quasis", "expressions"],
};

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

type TextMdxNode = MdxNode & {
  position: SourceRange;
  type: "text";
};

/** Narrows one parser-owned JSX node. */
function isJsxMdxNode(node: MdxNode): node is JsxMdxNode {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/** Narrows one parser-owned text node. */
function isTextMdxNode(node: MdxNode): node is TextMdxNode {
  return node.type === "text";
}

/** Returns a diagnostic at one exact source offset. */
function issueAtOffset(
  source: string,
  offset: number,
  rule: string
): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  const line = source.slice(0, lineStart).split("\n").length;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line,
    rule,
  };
}

/** Distinguishes the unrelated QR-code term from matrix QR notation. */
function isQrCodeTerm(text: string, start: number, end: number): boolean {
  const before = text.slice(Math.max(0, start - 12), start);
  const after = text.slice(end, Math.min(text.length, end + 12));
  return (
    QR_CODE_PREFIX_PATTERN.test(before) || QR_CODE_SUFFIX_PATTERN.test(after)
  );
}

/** Adds bare mathematical labels found in one exact learner-visible range. */
function collectRangeOffsets(
  offsets: Set<number>,
  source: string,
  range: SourceRange
): void {
  const start = range.start?.offset;
  const end = range.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  const { rendered } = range;
  const text = rendered?.text ?? source.slice(start, end);
  for (const match of text.matchAll(PLAIN_MATH_LABEL_PATTERN)) {
    if (
      match[0] === "QR" &&
      isQrCodeTerm(text, match.index, match.index + match[0].length)
    ) {
      continue;
    }
    const renderedOffset = rendered?.offsets[match.index];
    assert.ok(!rendered || renderedOffset !== undefined);
    offsets.add(renderedOffset ?? start + match.index);
  }
}

/** Reads one statically authored JSX component name. */
function jsxComponentName(node: EstreeNode): string | undefined {
  const openingElement = asEstreeNode(node.openingElement);
  const name = asEstreeNode(openingElement?.name);
  return name?.type === "JSXIdentifier" && typeof name.name === "string"
    ? name.name
    : undefined;
}

/** Adds rendered text ranges nested below one ESTree field. */
function collectExpressionValues(
  value: unknown,
  offsets: Set<number>,
  source: string
): void {
  for (const child of Array.isArray(value) ? value : [value]) {
    const childNode = asEstreeNode(child);
    if (childNode) {
      collectExpressionOffsets(childNode, offsets, source);
    }
  }
}

/** Scans the rendered children of a non-math JSX element. */
function collectJsxElementOffsets(
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  if (PROTECTED_COMPONENT_NAMES.has(jsxComponentName(node) ?? "")) {
    return;
  }
  collectExpressionValues(node.children, offsets, source);
}

/** Collects rendered static strings from a learner-facing JSX expression. */
function collectExpressionOffsets(
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  if (
    (node.type === "Literal" && typeof node.value === "string") ||
    node.type === "JSXText" ||
    node.type === "TemplateElement"
  ) {
    collectRangeOffsets(offsets, source, {
      end: { offset: Number(node.end) },
      start: { offset: Number(node.start) },
    });
    return;
  }
  if (node.type === "JSXElement") {
    collectJsxElementOffsets(node, offsets, source);
    return;
  }
  for (const key of RENDERED_KEYS_BY_TYPE[node.type] ?? []) {
    collectExpressionValues(node[key], offsets, source);
  }
}

/** Collects math labels from one learner-facing component attribute. */
function collectAttributeOffsets(
  attribute: MdxAttribute,
  offsets: Set<number>,
  source: string
): void {
  if (
    attribute.name === undefined ||
    !LEARNER_TEXT_ATTRIBUTES.has(attribute.name)
  ) {
    return;
  }
  const directRange = directAttributeRange(attribute, source);
  if (directRange) {
    collectRangeOffsets(offsets, source, directRange);
    return;
  }
  if (
    !attribute.value ||
    typeof attribute.value !== "object" ||
    !("data" in attribute.value) ||
    !attribute.value.data ||
    typeof attribute.value.data !== "object" ||
    !("estree" in attribute.value.data)
  ) {
    return;
  }
  collectExpressionValues(attribute.value.data.estree, offsets, source);
}

/** Traverses learner-visible MDX while preserving code, links, and quotations. */
function collectNodeOffsets(
  node: MdxNode,
  offsets: Set<number>,
  source: string,
  isProtected = false
): void {
  const componentIsProtected =
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    PROTECTED_COMPONENT_NAMES.has(String(node.name));
  const protectedHere =
    isProtected ||
    PROTECTED_NODE_TYPES.has(String(node.type)) ||
    componentIsProtected;
  if (!protectedHere && isTextMdxNode(node)) {
    collectRangeOffsets(offsets, source, node.position);
  }
  if (!protectedHere && isJsxMdxNode(node)) {
    for (const attribute of node.attributes) {
      collectAttributeOffsets(attribute, offsets, source);
    }
  }
  for (const child of node.children ?? []) {
    collectNodeOffsets(child, offsets, source, protectedHere);
  }
}

/** Finds bare matrix-method labels only in learner-visible MDX content. */
export function findPlainMathLabelIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const offsets = new Set<number>();
  collectNodeOffsets(tree, offsets, source);
  return [...offsets]
    .sort((left, right) => left - right)
    .map((offset) => issueAtOffset(source, offset, "plain-math-label"));
}
