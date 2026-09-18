import assert from "node:assert/strict";
import { Predicate } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import { isProtectedLineComponent } from "#nakafa-content/mdx/fields";
import { MATH_LABEL_KEYS, walkKeyedChildren } from "#nakafa-content/mdx/keys";
import {
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  jsxComponentName,
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

/** Adds rendered text ranges nested below one ESTree field. */
function collectExpressionValues(
  value: unknown,
  offsets: Set<number>,
  source: string
): void {
  for (const childNode of estreeChildren(value)) {
    collectExpressionOffsets(childNode, offsets, source);
  }
}

/** Scans the rendered children of a non-math JSX element. */
function collectJsxElementOffsets(
  node: EstreeNode,
  offsets: Set<number>,
  source: string
): void {
  if (isProtectedLineComponent(jsxComponentName(node))) {
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
    (node.type === "Literal" && Predicate.isString(node.value)) ||
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
  walkKeyedChildren(node, MATH_LABEL_KEYS, (child) => {
    collectExpressionOffsets(child, offsets, source);
  });
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
  const program = attributeEstree(attribute);
  if (!program) {
    return;
  }
  collectExpressionValues(program, offsets, source);
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
    isProtectedLineComponent(node.name);
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
