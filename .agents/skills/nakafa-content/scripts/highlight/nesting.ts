import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const HIGHLIGHT_COMPONENT_NAME = "Highlight";

/** Returns whether one node is an authored emphasis marker. */
function isMarker(node: MdxNode): boolean {
  if (node.type === "strong") {
    return true;
  }
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    node.name === HIGHLIGHT_COMPONENT_NAME
  );
}

/**
 * Finds authored emphasis markers nested inside another marker.
 *
 * Both markers render the same marked surface, so a nested marker adds no
 * treatment for the learner and only spends the section's marking budget. The
 * outer marker already carries the phrase, so the inner one is always the
 * reported defect.
 */
export function findHighlightNestingIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];

  /** Walks one subtree and reports every marker below another marker. */
  function visit(node: MdxNode, insideMarker: boolean): void {
    const marked = isMarker(node);
    if (marked && insideMarker) {
      const line = node.position?.start?.line ?? 1;
      issues.push({
        column: node.position?.start?.column ?? 1,
        excerpt: (lines[line - 1] ?? "").trim(),
        line,
        rule: "highlight-nesting",
      });
    }
    for (const child of node.children ?? []) {
      visit(child, insideMarker || marked);
    }
  }

  for (const child of children) {
    visit(child, false);
  }
  return issues;
}
