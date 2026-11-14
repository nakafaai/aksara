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
  /** Names the JSX elements, such as `code`, whose text stays out. */
  readonly protectedNames?: ReadonlySet<string>;
  readonly protectedTypes: ReadonlySet<string>;
}

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

type TextMdxNode = MdxNode & {
  position: SourceRange;
  type: "text";
};

/**
 * Where one learner-visible text sits: Markdown prose, JSX text inside an
 * expression, or a string that JSX cannot enter without becoming a fragment.
 */
export type VisibleTextKind = "jsx" | "markdown" | "string";

/** One learner-visible text range and the syntax that holds it. */
export interface VisibleTextRange {
  readonly kind: VisibleTextKind;
  readonly range: SourceRange;
}

/** One scan in progress: its rules, the source, and the ranges found so far. */
interface ScanState {
  readonly ranges: VisibleTextRange[];
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

/** Returns the source offset of every match in one learner-visible range. */
function rangeOffsets(
  source: string,
  scan: VisibleTextScan,
  { range }: VisibleTextRange
): number[] {
  const start = range.start?.offset;
  const end = range.end?.offset;
  assert.ok(start !== undefined);
  assert.ok(end !== undefined);
  const { rendered } = range;
  const text = rendered?.text ?? source.slice(start, end);
  return scan.find(text).map((index) => {
    const renderedOffset = rendered?.offsets[index];
    assert.ok(!rendered || renderedOffset !== undefined);
    return renderedOffset ?? start + index;
  });
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
    state.ranges.push({
      kind: node.type === "JSXText" ? "jsx" : "string",
      range: {
        end: { offset: Number(node.end) },
        start: { offset: Number(node.start) },
      },
    });
    return;
  }
  if (node.type === "JSXElement") {
    const name = jsxComponentName(node);
    if (
      !(
        isProtectedLineComponent(name) ||
        state.scan.protectedNames?.has(String(name))
      )
    ) {
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
    state.ranges.push({ kind: "string", range: directRange });
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
    (isJsxMdxNode(node) &&
      (isProtectedLineComponent(node.name) ||
        state.scan.protectedNames?.has(String(node.name)) === true));
  if (!protectedHere && isTextMdxNode(node)) {
    state.ranges.push({ kind: "markdown", range: node.position });
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
  const offsets = new Set(
    visibleTextRanges(source, tree, scan).flatMap((range) =>
      rangeOffsets(source, scan, range)
    )
  );
  return [...offsets].sort((left, right) => left - right);
}

/**
 * Returns every text range a learner reads, in document order, with the
 * syntax that holds it, so a codemod can rewrite exactly what a scan reads.
 */
export function visibleTextRanges(
  source: string,
  tree: MdxNode,
  scan: VisibleTextScan
): VisibleTextRange[] {
  const state: ScanState = { ranges: [], scan, source };
  collectNode(state, tree, false);
  return state.ranges;
}
