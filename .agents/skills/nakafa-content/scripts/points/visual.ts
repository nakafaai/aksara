import {
  isCodeComponentName,
  isHighlightComponentName,
  isMathComponentName,
} from "#nakafa-content/mdx/fields";
import { type MdxNode, visitMdxNodes } from "#nakafa-content/mdx/parse";
import type { PointsFinding } from "#nakafa-content/points/finding";

/**
 * Renderer names that lay out content, draw a static diagram, embed a video, or
 * carry agent context, so they never model a concept interactively. Text,
 * notation, code, and emphasis components come from the shared role predicates
 * in `mdx/fields`. No Aksara module lists the renderer names: the contracts
 * package defines only the manifest schema, and the live renderer supplies the
 * names when a document compiles. Every other PascalCase name is therefore an
 * interactive visual, so a newly deployed visual counts without a change here.
 */
const NON_VISUAL_COMPONENTS: ReadonlySet<string> = new Set([
  "AgentContext",
  "ContentBlock",
  "ContentGrid",
  "ContentStack",
  "MathContainer",
  "Mermaid",
  "Youtube",
]);

/** Semantic HTML elements such as table and sup begin with a lowercase letter. */
const HTML_ELEMENT = /^[a-z]/u;

/** Tells whether one renderer component name models a concept interactively. */
export function isInteractiveVisual(name: string): boolean {
  return !(
    HTML_ELEMENT.test(name) ||
    NON_VISUAL_COMPONENTS.has(name) ||
    isMathComponentName(name) ||
    isCodeComponentName(name) ||
    isHighlightComponentName(name)
  );
}

/** Counts the interactive visuals of one document by component name. */
export function countVisuals(tree: MdxNode): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  visitMdxNodes(tree, (node) => {
    if (
      (node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement") &&
      node.name !== undefined &&
      isInteractiveVisual(node.name)
    ) {
      counts.set(node.name, (counts.get(node.name) ?? 0) + 1);
    }
  });
  return counts;
}

/** Sums the counts of every component name. */
function total(counts: ReadonlyMap<string, number>): number {
  let sum = 0;
  for (const count of counts.values()) {
    sum += count;
  }
  return sum;
}

/** Reports a document whose interactive visuals fell below its base version. */
export function findVisualLoss(
  base: MdxNode,
  head: MdxNode
): PointsFinding | undefined {
  const before = countVisuals(base);
  const after = countVisuals(head);
  if (total(after) >= total(before)) {
    return undefined;
  }
  const fell = [...before]
    .filter(([name, count]) => (after.get(name) ?? 0) < count)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, count]) => `${name} ${count} to ${after.get(name) ?? 0}`);
  return {
    column: 1,
    line: 1,
    message: `interactive visuals fell from ${total(before)} to ${total(after)} (${fell.join(", ")}): a revision never removes 3D or animation`,
    rule: "interactive-visuals-fell",
  };
}
