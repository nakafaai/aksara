import { Predicate } from "effect";
import { splitHighlightSections } from "#nakafa-content/highlight/section";
import {
  asEstreeNode,
  attributeEstree,
  type EstreeNode,
  type MdxNode,
  parseLessonMdx,
  staticFieldName,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const HIGHLIGHT_COMPONENT_NAME = "Highlight";

/** Reads one statically authored JSX element name. */
function elementName(node: EstreeNode): string | undefined {
  const opening = asEstreeNode(node.openingElement);
  return staticFieldName(asEstreeNode(opening?.name));
}

/** Counts authored highlight elements reachable from one ESTree subtree. */
function countExpressionHighlights(node: EstreeNode): number {
  let total = 0;
  /** Walks one ESTree subtree and counts every authored highlight element. */
  const visit = (current: EstreeNode): void => {
    if (
      current.type === "JSXElement" &&
      elementName(current) === HIGHLIGHT_COMPONENT_NAME
    ) {
      total += 1;
    }
    for (const value of Object.values(current)) {
      for (const child of Array.isArray(value) ? value : [value]) {
        const childNode = asEstreeNode(child);
        if (childNode) {
          visit(childNode);
        }
      }
    }
  };
  visit(node);
  return total;
}

/**
 * Counts authored highlight components below one parsed node and inside its
 * learner-visible props, because a component receives its body as JSX there.
 */
function countHighlights(node: MdxNode): number {
  let total = 0;
  visitMdxNodes(node, (current) => {
    const isComponent =
      current.type === "mdxJsxFlowElement" ||
      current.type === "mdxJsxTextElement";
    if (isComponent && current.name === HIGHLIGHT_COMPONENT_NAME) {
      total += 1;
    }
    for (const attribute of current.attributes ?? []) {
      if (Predicate.isString(attribute.value)) {
        continue;
      }
      const estree = attributeEstree(attribute);
      if (estree) {
        total += countExpressionHighlights(estree);
      }
    }
  });
  return total;
}

/**
 * Finds sections that carry more than two highlights.
 *
 * A section may mark its decisive rule or condition and one key term, so a
 * third highlight means the section marks everything and therefore nothing.
 * `<InlineMath />` shares the component shape and is never counted.
 */
export function findHighlightCeilingIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];
  for (const { nodes, opener } of splitHighlightSections(tree, 6)) {
    if (nodes.reduce((total, node) => total + countHighlights(node), 0) < 3) {
      continue;
    }
    const line = opener.position?.start?.line ?? 1;
    issues.push({
      column: opener.position?.start?.column ?? 1,
      excerpt: (lines[line - 1] ?? "").trim(),
      line,
      rule: "highlight-ceiling",
    });
  }
  return issues;
}
