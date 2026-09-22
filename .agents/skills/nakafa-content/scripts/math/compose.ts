import assert from "node:assert/strict";
import { Predicate } from "effect";

import { findAlignedFindings } from "#nakafa-content/math/align";
import { issueAtOffset, type MathFinding } from "#nakafa-content/math/finding";
import { findGluedTextGroups } from "#nakafa-content/math/glue";
import {
  NESTED_DISCOVERY_KEYS,
  walkKeyedChildren,
} from "#nakafa-content/mdx/keys";
import { sourceOffsetForStaticMatch } from "#nakafa-content/mdx/offset";
import {
  asEstreeNode,
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
import { staticStringCandidates } from "#nakafa-content/mdx/static";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const ENTITY_PATTERN = /&(?:#[xX][\dA-Fa-f]+|#\d+|[A-Za-z][A-Za-z\d]*);/u;
const NON_WHITESPACE_PATTERN = /\S/u;

interface MathText {
  readonly offsets: readonly number[];
  readonly text: string;
}

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

/** Narrows one parser-owned JSX node. */
function isJsxMdxNode(node: MdxNode): node is JsxMdxNode {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/** Collects every displayed-math composition finding in one decoded value. */
function findingsInMathValue(value: string): MathFinding[] {
  return [...findGluedTextGroups(value), ...findAlignedFindings(value)];
}

/** Records one decoded value's findings at their authored source offsets. */
function recordFindings(text: MathText, offsets: Map<number, string>): void {
  for (const finding of findingsInMathValue(text.text)) {
    const authored = text.offsets[finding.offset];
    assert.ok(authored !== undefined);
    offsets.set(authored, finding.rule);
  }
}

/** Records the findings of one fully static expression value. */
function recordExpressionFindings(
  node: EstreeNode,
  offsets: Map<number, string>,
  source: string
): void {
  for (const candidate of staticStringCandidates(node)) {
    for (const finding of findingsInMathValue(candidate.text)) {
      offsets.set(
        sourceOffsetForStaticMatch(candidate, finding.offset, source),
        finding.rule
      );
    }
  }
}

/** Aligns one decoded attribute value with its authored entity offsets. */
function alignEntityOffsets(
  authored: string,
  decoded: string,
  start: number
): MathText | undefined {
  if (authored === decoded) {
    return {
      offsets: Array.from(
        { length: decoded.length },
        (_, index) => start + index
      ),
      text: decoded,
    };
  }
  const offsets: number[] = [];
  let cursor = 0;
  while (offsets.length < decoded.length) {
    if (cursor >= authored.length) {
      return undefined;
    }
    if (authored[cursor] === "&") {
      const entity: RegExpExecArray | null = ENTITY_PATTERN.exec(
        authored.slice(cursor)
      );
      if (entity === null || entity.index !== 0) {
        return undefined;
      }
      offsets.push(start + cursor);
      cursor += entity[0].length;
      continue;
    }
    offsets.push(start + cursor);
    cursor += 1;
  }
  return { offsets, text: decoded };
}

/**
 * Reads one direct math attribute. MDX attribute strings decode HTML entities
 * but keep authored backslashes, so JavaScript escape rules must not apply.
 */
function directMathText(
  attribute: MdxAttribute,
  source: string
): MathText | undefined {
  if (!Predicate.isString(attribute.value)) {
    return undefined;
  }
  const start = attribute.position?.start?.offset;
  const end = attribute.position?.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  const authored = source.slice(start, end);
  const equals = authored.indexOf("=");
  assert.notEqual(equals, -1);
  const valueIndex =
    authored.slice(equals + 1).search(NON_WHITESPACE_PATTERN) + equals + 1;
  const quote = authored[valueIndex];
  assert.ok(quote === '"' || quote === "'");
  const closing = authored.lastIndexOf(quote);
  assert.ok(closing > valueIndex);
  return alignEntityOffsets(
    source.slice(start + valueIndex + 1, start + closing),
    attribute.value,
    start + valueIndex + 1
  );
}

/** Collects findings from one JSX attribute that carries a math value. */
function collectJsxAttributeFindings(
  node: EstreeNode,
  offsets: Map<number, string>,
  source: string
): void {
  if (
    node.type !== "JSXAttribute" ||
    staticFieldName(asEstreeNode(node.name)) !== "math"
  ) {
    return;
  }
  const attributeValue = asEstreeNode(node.value);
  if (!attributeValue) {
    return;
  }
  const value =
    attributeValue.type === "JSXExpressionContainer"
      ? asEstreeNode(attributeValue.expression)
      : attributeValue;
  assert.ok(value !== undefined);
  if (value.type === "Literal" && Predicate.isString(value.value)) {
    const { start, end } = value;
    assert.ok(start !== undefined);
    assert.ok(end !== undefined);
    const quoted = source.slice(start, end);
    assert.ok(quoted.length >= 2);
    const text = alignEntityOffsets(
      quoted.slice(1, -1),
      value.value,
      start + 1
    );
    if (text) {
      recordFindings(text, offsets);
    }
    return;
  }
  recordExpressionFindings(value, offsets, source);
}

/** Walks the authored JSX that one expression value nests in its data. */
function walkExpression(
  node: EstreeNode,
  offsets: Map<number, string>,
  source: string
): void {
  if (node.type === "JSXElement") {
    const opening = asEstreeNode(node.openingElement);
    for (const attribute of estreeChildren(opening?.attributes)) {
      collectJsxAttributeFindings(attribute, offsets, source);
    }
    for (const child of estreeChildren(node.children)) {
      walkExpression(child, offsets, source);
    }
    return;
  }
  walkKeyedChildren(node, NESTED_DISCOVERY_KEYS, (child) => {
    walkExpression(child, offsets, source);
  });
}

/**
 * Collects composition findings from one explicit math prop, and from the JSX
 * that any other learner-facing prop nests in its expression value.
 */
function collectAttributeOffsets(
  attribute: MdxAttribute,
  offsets: Map<number, string>,
  source: string
): void {
  const isMath = attribute.name === "math";
  if (isMath) {
    const direct = directMathText(attribute, source);
    if (direct) {
      recordFindings(direct, offsets);
      return;
    }
  }
  const expression = attributeEstree(attribute);
  if (!expression) {
    return;
  }
  if (isMath) {
    recordExpressionFindings(expression, offsets, source);
  }
  walkExpression(expression, offsets, source);
}

/** Collects composition findings from every math prop in one document. */
function collectNodeOffsets(
  node: MdxNode,
  offsets: Map<number, string>,
  source: string
): void {
  if (isJsxMdxNode(node)) {
    for (const attribute of node.attributes) {
      collectAttributeOffsets(attribute, offsets, source);
    }
  }
  for (const child of node.children ?? []) {
    collectNodeOffsets(child, offsets, source);
  }
}

/** Finds displayed math whose authored spacing or alignment never renders. */
export function findDisplayedMathCompositionIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const offsets = new Map<number, string>();
  collectNodeOffsets(tree, offsets, source);
  return [...offsets]
    .sort(([left], [right]) => left - right)
    .map(([offset, rule]) => issueAtOffset(source, offset, rule));
}
