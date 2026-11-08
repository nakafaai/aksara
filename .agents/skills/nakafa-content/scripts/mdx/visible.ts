import assert from "node:assert/strict";
import { Predicate } from "effect";
import { isProtectedLineComponent } from "#nakafa-content/mdx/fields";
import { MATH_LABEL_KEYS, walkKeyedChildren } from "#nakafa-content/mdx/keys";
import {
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  jsxComponentName,
  type MdxAttribute,
  type MdxNode,
  type SourceRange,
} from "#nakafa-content/mdx/parse";
import { directAttributeRange } from "#nakafa-content/mdx/rendered";

/**
 * What one scan of learner-visible text looks for: `find` returns the index of
 * each match in a text, `attributes` names the component props a learner
 * reads, and `protectedTypes` names the MDX nodes whose text stays out.
 */
export interface VisibleTextScan {
  readonly attributes: ReadonlySet<string>;
  /** Returns the index of each match in one learner-visible text. */
  readonly find: (text: string) => readonly number[];
  readonly protectedTypes: ReadonlySet<string>;
}

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

type TextMdxNode = MdxNode & {
  position: SourceRange;
  type: "text";
};

/** One scan in progress: its rules, the source, and the offsets found so far. */
interface ScanState {
  readonly offsets: Set<number>;
  readonly scan: VisibleTextScan;
  readonly source: string;
}

/** Narrows one parser-owned JSX node. */
function isJsxMdxNode(node: MdxNode): node is JsxMdxNode {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/** Narrows one parser-owned text node. */
function isTextMdxNode(node: MdxNode): node is TextMdxNode {
  return node.type === "text";
}

/** Adds the source offset of every match in one exact learner-visible range. */
function collectRange(state: ScanState, range: SourceRange): void {
  const start = range.start?.offset;
  const end = range.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  const { rendered } = range;
  const text = rendered?.text ?? state.source.slice(start, end);
  for (const index of state.scan.find(text)) {
    const renderedOffset = rendered?.offsets[index];
    assert.ok(!rendered || renderedOffset !== undefined);
    state.offsets.add(renderedOffset ?? start + index);
  }
}

/** Scans the rendered text ranges nested below one ESTree field. */
function collectExpressionValues(state: ScanState, value: unknown): void {
  for (const childNode of estreeChildren(value)) {
    collectExpression(state, childNode);
  }
}

/** Scans the rendered static strings of a learner-facing JSX expression. */
function collectExpression(state: ScanState, node: EstreeNode): void {
  if (
    (node.type === "Literal" && Predicate.isString(node.value)) ||
    node.type === "JSXText" ||
    node.type === "TemplateElement"
  ) {
    collectRange(state, {
      end: { offset: Number(node.end) },
      start: { offset: Number(node.start) },
    });
    return;
  }
  if (node.type === "JSXElement") {
    if (!isProtectedLineComponent(jsxComponentName(node))) {
      collectExpressionValues(state, node.children);
    }
    return;
  }
  walkKeyedChildren(node, MATH_LABEL_KEYS, (child) => {
    collectExpression(state, child);
  });
}

/** Scans one learner-facing component attribute. */
function collectAttribute(state: ScanState, attribute: MdxAttribute): void {
  if (
    attribute.name === undefined ||
    !state.scan.attributes.has(attribute.name)
  ) {
    return;
  }
  const directRange = directAttributeRange(attribute, state.source);
  if (directRange) {
    collectRange(state, directRange);
    return;
  }
  const program = attributeEstree(attribute);
  if (program) {
    collectExpressionValues(state, program);
  }
}

/** Traverses learner-visible MDX, keeping protected nodes and math out. */
function collectNode(
  state: ScanState,
  node: MdxNode,
  isProtected: boolean
): void {
  const protectedHere =
    isProtected ||
    state.scan.protectedTypes.has(String(node.type)) ||
    (isJsxMdxNode(node) && isProtectedLineComponent(node.name));
  if (!protectedHere && isTextMdxNode(node)) {
    collectRange(state, node.position);
  }
  if (!protectedHere && isJsxMdxNode(node)) {
    for (const attribute of node.attributes) {
      collectAttribute(state, attribute);
    }
  }
  for (const child of node.children ?? []) {
    collectNode(state, child, protectedHere);
  }
}

/**
 * Returns the sorted source offsets of every match in the text a learner
 * reads: prose, table cells, the nodes the scan does not protect, and the
 * named props of components. Math, code, and protected components stay out.
 */
export function visibleTextOffsets(
  source: string,
  tree: MdxNode,
  scan: VisibleTextScan
): number[] {
  const state: ScanState = { offsets: new Set(), scan, source };
  collectNode(state, tree, false);
  return [...state.offsets].sort((left, right) => left - right);
}
