import { Predicate } from "effect";
import {
  isAuthoredLesson,
  splitHighlightSections,
} from "#nakafa-content/highlight/section";
import { isHighlightComponentName } from "#nakafa-content/mdx/fields";
import {
  attributeEstree,
  type EstreeNode,
  jsxComponentName,
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** Counts authored highlight elements reachable from one ESTree subtree. */
function countExpressionHighlights(node: EstreeNode): number {
  let total = 0;
  walkEstreeDeep(node, (current) => {
    if (
      current.type === "JSXElement" &&
      isHighlightComponentName(jsxComponentName(current))
    ) {
      total += 1;
    }
  });
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
    if (isComponent && isHighlightComponentName(current.name)) {
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
  if (!isAuthoredLesson(tree)) {
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
