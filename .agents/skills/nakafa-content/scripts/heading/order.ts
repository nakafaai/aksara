import { Predicate } from "effect";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const BODY_HEADING_DEPTH = 2;

type HeadingNode = Omit<MdxNode, "position" | "type"> & {
  depth: number;
  position: { start: { column: number; line: number } };
  type: "heading";
};

/** Narrows one parser-owned heading with a resolved depth and position. */
function isHeadingNode(node: MdxNode): node is HeadingNode {
  return (
    node.type === "heading" &&
    Predicate.isNumber(node.depth) &&
    Predicate.isNumber(node.position?.start?.line) &&
    Predicate.isNumber(node.position?.start?.column)
  );
}

/**
 * Finds body headings whose level jumps.
 *
 * A lesson body opens at `##`, and every later heading may descend one level
 * at a time or return to any level above it. A jump such as `##` to `####`
 * hides the missing nesting, so the learner meets a heading whose parent is
 * never written. Answer keys legitimately nest to `####` under a `###`
 * heading, and that stays valid because the level is not skipped.
 */
export function findHeadingOrderIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const headings: HeadingNode[] = [];
  visitMdxNodes(tree, (node) => {
    if (isHeadingNode(node)) {
      headings.push(node);
    }
  });
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];
  let previousDepth: number | undefined;
  for (const heading of headings) {
    const skipped =
      previousDepth !== undefined && heading.depth > previousDepth + 1;
    const misrooted =
      previousDepth === undefined && heading.depth !== BODY_HEADING_DEPTH;
    if (skipped || misrooted) {
      issues.push({
        column: heading.position.start.column,
        excerpt: (lines[heading.position.start.line - 1] ?? "").trim(),
        line: heading.position.start.line,
        rule: "heading-order",
      });
    }
    previousDepth = heading.depth;
  }
  return issues;
}
