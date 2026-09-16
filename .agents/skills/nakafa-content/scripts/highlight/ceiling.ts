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

interface Section {
  nodes: MdxNode[];
  opener: MdxNode;
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
      if (typeof attribute.value === "string") {
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
 * Finds sections that carry more than one highlight.
 *
 * `<Highlight>` names the section's single decisive phrase, so a second one
 * inside the same section means the section has not chosen. `<InlineMath />`
 * shares the component shape and is never counted.
 */
export function findHighlightCeilingIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const flow = children.filter((node) => node.type !== "mdxjsEsm");
  const sections: Section[] = [];
  let current: Section | undefined;
  for (const node of flow) {
    if (node.type === "heading" || current === undefined) {
      const section = { nodes: [node], opener: node };
      sections.push(section);
      current = section;
      continue;
    }
    current.nodes.push(node);
  }
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];
  for (const { nodes, opener } of sections) {
    if (nodes.reduce((total, node) => total + countHighlights(node), 0) < 2) {
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
