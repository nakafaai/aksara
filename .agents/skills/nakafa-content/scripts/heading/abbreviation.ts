import { type MdxNode, parseLessonMdx } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const ABBREVIATION_PATTERN = /\b[A-Z]{2,5}s?\b/gu;

type HeadingNode = MdxNode & {
  position: {
    start: { line: number; offset: number };
  };
  type: "heading";
};

/** Narrows one parser-owned heading with a resolved source position. */
function isHeadingNode(node: MdxNode | undefined): node is HeadingNode {
  return node?.type === "heading";
}

/**
 * Finds headings that use an abbreviation the lesson has not introduced yet.
 *
 * A learner reads the heading before the section, so an abbreviation that has
 * not appeared earlier in the document leaves the heading undecodable at the
 * moment the learner meets it. The lesson may still introduce the term inside
 * the section; this rule only requires the introduction to come first.
 */
export function findUndefinedHeadingAbbreviationIssues(
  source: string,
  tree?: MdxNode
): LessonVoiceIssue[] {
  const root = tree ?? parseLessonMdx(source);
  const children = root.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];
  for (const node of children) {
    if (!isHeadingNode(node)) {
      continue;
    }
    const excerpt = (lines[node.position.start.line - 1] ?? "").trim();
    const introduced = source.slice(0, node.position.start.offset);
    for (const token of new Set(excerpt.match(ABBREVIATION_PATTERN) ?? [])) {
      if (new RegExp(`\\b${token}\\b`, "u").test(introduced)) {
        continue;
      }
      issues.push({
        column: 1,
        excerpt,
        line: node.position.start.line,
        rule: "heading-undefined-abbreviation",
      });
    }
  }
  return issues;
}
