import { FIGURE_NAMES } from "@nakafa/aksara-contracts/visual/catalog";
import { Array as Arr, HashSet, Predicate } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";

/** Catalog visual figure names checked for lead-in, takeaway, and stacking rules. */
export const FIGURE_SET = HashSet.fromIterable<string>(FIGURE_NAMES);

const LAYOUT_WRAPPERS = HashSet.make(
  "ContentBlock",
  "ContentGrid",
  "ContentStack"
);
const FORMULA_COMPONENTS = HashSet.make("BlockMath", "MathContainer");

type FlowKind = "formula" | "heading" | "prose" | "support" | "visual";

/** One top-level structural block inside a lesson section after unwrapping layout containers. */
export interface FlowBlock {
  readonly inStack: boolean;
  readonly kind: FlowKind;
  readonly line: number;
  readonly name: string | undefined;
  readonly node: MdxNode;
}

/** Extracts visible prose from a node, omitting code and inline math. */
export function visibleProse(node: MdxNode): string {
  if (node.type === "text" && Predicate.isString(node.value)) {
    return node.value;
  }
  if (
    node.type === "code" ||
    node.type === "inlineCode" ||
    node.type === "mdxjsEsm" ||
    node.type === "mdxFlowExpression" ||
    node.type === "mdxTextExpression" ||
    node.name === "InlineMath" ||
    node.name === "BlockMath"
  ) {
    return "";
  }
  return Arr.join(Arr.map(node.children ?? [], visibleProse), "");
}

/** Classifies one JSX flow element as a layout wrapper, visual, formula, or support block. */
function classifyJsxFlow(
  node: MdxNode,
  name: string,
  line: number,
  inStack: boolean
): readonly FlowBlock[] {
  if (HashSet.has(LAYOUT_WRAPPERS, name)) {
    return flattenFlow(node.children ?? [], inStack || name === "ContentStack");
  }
  if (HashSet.has(FIGURE_SET, name)) {
    return [{ inStack, kind: "visual", line, name, node }];
  }
  if (HashSet.has(FORMULA_COMPONENTS, name)) {
    return [{ inStack, kind: "formula", line, name, node }];
  }
  return [{ inStack, kind: "support", line, name, node }];
}

/** Classifies one MDX node into zero or more structural flow blocks. */
function classifyNode(node: MdxNode, inStack: boolean): readonly FlowBlock[] {
  if (
    node.type === "mdxjsEsm" ||
    node.type === "mdxFlowExpression" ||
    node.name === "AgentContext"
  ) {
    return [];
  }
  const line = node.position?.start?.line ?? 1;
  if (node.type === "mdxJsxFlowElement" && Predicate.isString(node.name)) {
    return classifyJsxFlow(node, node.name, line, inStack);
  }
  if (node.type === "heading") {
    return [{ inStack, kind: "heading", line, name: undefined, node }];
  }
  if (node.type === "paragraph") {
    return [{ inStack, kind: "prose", line, name: undefined, node }];
  }
  return [{ inStack, kind: "support", line, name: node.name, node }];
}

/** Flattens layout wrappers (`ContentBlock`, `ContentStack`, `ContentGrid`) into flow blocks. */
export function flattenFlow(
  nodes: readonly MdxNode[],
  inStack = false
): readonly FlowBlock[] {
  return Arr.flatMap(nodes, (node) => classifyNode(node, inStack));
}

/** Checks lead-in prose, back-to-back visuals, and takeaway prose around one visual block. */
function visualFindings(
  current: FlowBlock,
  previous: FlowBlock | undefined,
  next: FlowBlock | undefined
): HeadingFinding[] {
  const findings: HeadingFinding[] = [];
  if (previous === undefined || previous.kind === "heading") {
    findings.push({
      blocking: true,
      line: current.line,
      message: `<${current.name}> sits directly under a heading with no lead-in prose. Raise the question or plain-language intuition before introducing the visual.`,
      rule: "visual-missing-intro",
    });
  } else if (previous.kind === "visual") {
    findings.push({
      blocking: true,
      line: current.line,
      message: `<${current.name}> immediately follows <${previous.name}> with no bridging prose. Interpret what the first visual showed and set up what the second visual tests.`,
      rule: "back-to-back-visuals",
    });
  }
  if (next === undefined || next.kind === "heading") {
    findings.push({
      blocking: true,
      line: current.line,
      message: `<${current.name}> ends the section with no takeaway prose after it. Tell the learner what to notice in the visual and connect it back to the concept.`,
      rule: "visual-missing-takeaway",
    });
  }
  return findings;
}

/** Checks whether one displayed formula opens a section without plain-language intuition. */
function formulaFindings(
  current: FlowBlock,
  previous: FlowBlock | undefined
): readonly HeadingFinding[] {
  if (previous !== undefined && previous.kind !== "heading") {
    return [];
  }
  return [
    {
      blocking: true,
      line: current.line,
      message:
        "A displayed formula opens the section with no plain-language intuition before it. Explain the idea in plain words first, then write the symbols.",
      rule: "formula-without-intro",
    },
  ];
}

/** Checks whether a paragraph ends with a colon followed directly by another plain paragraph. */
function danglingColonFindings(
  current: FlowBlock,
  next: FlowBlock | undefined
): readonly HeadingFinding[] {
  if (next?.kind !== "prose") {
    return [];
  }
  const trimmed = visibleProse(current.node).trimEnd();
  if (!trimmed.endsWith(":")) {
    return [];
  }
  return [
    {
      blocking: true,
      line: current.line,
      message:
        "This paragraph ends with a colon followed by another plain paragraph instead of a list, formula, table, or visual. Finish the sentence with a period or connect the thought directly.",
      rule: "dangling-colon",
    },
  ];
}

/** Checks structural flow: visual anchoring, back-to-back visuals, formula lead-ins, and dangling colons. */
export function findFlowFindings(
  blocks: readonly FlowBlock[]
): HeadingFinding[] {
  return Arr.flatMap(blocks, (current, index): readonly HeadingFinding[] => {
    const previous = index > 0 ? blocks[index - 1] : undefined;
    const next = blocks[index + 1];
    if (current.kind === "visual") {
      return visualFindings(current, previous, next);
    }
    if (current.kind === "formula") {
      return formulaFindings(current, previous);
    }
    if (current.kind === "prose") {
      return danglingColonFindings(current, next);
    }
    return [];
  });
}
