import { Predicate } from "effect";
import type { HeadingFinding } from "#nakafa-content/heading/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { visitMdxNodes } from "#nakafa-content/mdx/parse";

/** Checks whether a node contains visible text or inline math. */
function hasVisibleContent(node: MdxNode): boolean {
  if (node.type === "text" && Predicate.isString(node.value)) {
    return node.value.trim().length > 0;
  }
  if (node.name === "InlineMath" || node.name === "BlockMath") {
    return true;
  }
  return (node.children ?? []).some(hasVisibleContent);
}

/** Checks whether a parsed MDX tree contains at least one authored blockquote. */
export function hasAuthoredBlockquote(tree: MdxNode): boolean {
  let found = false;
  visitMdxNodes(tree, (node) => {
    if (node.type === "blockquote" && hasVisibleContent(node)) {
      found = true;
    }
  });
  return found;
}

/**
 * Requires at least one core blockquote in a lesson or worked try-out answer
 * holding the key concept, intuition, or warning a learner must remember.
 */
export function findBlockquoteFindings(tree: MdxNode): HeadingFinding[] {
  if (hasAuthoredBlockquote(tree)) {
    return [];
  }
  return [
    {
      blocking: true,
      line: 1,
      message:
        "Include at least one blockquote (> ...) holding a key concept, intuition, or warning a learner must remember, stated directly without any prefix label or colon.",
      rule: "missing-blockquote",
    },
  ];
}
