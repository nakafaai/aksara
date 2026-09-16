import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const LITERAL_CODE_TYPES = new Set(["code", "inlineCode"]);
const EMPHASIS_ARTIFACT_PATTERN = /\*\*/u;
const EXCERPT_CHARACTER_LIMIT = 200;

/**
 * Finds authored text that still carries a literal `**` marker.
 *
 * An emphasis pair resolves inside one paragraph. A pair that wraps an inline
 * component stays valid, but a marker whose partner sits in another paragraph,
 * or that has no partner at all, never parses and reaches the learner as the
 * raw `**`. Inline code and fenced code keep `**` as literal syntax.
 */
export function findEmphasisArtifactIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  visitMdxNodes(tree, (node) => {
    if (LITERAL_CODE_TYPES.has(node.type)) {
      return;
    }
    if (
      node.type === "text" &&
      typeof node.value === "string" &&
      EMPHASIS_ARTIFACT_PATTERN.test(node.value)
    ) {
      const line = node.position?.start?.line;
      issues.push({
        column: 1,
        excerpt: node.value.trim().slice(0, EXCERPT_CHARACTER_LIMIT),
        line: typeof line === "number" ? line : 1,
        rule: "unbalanced-emphasis",
      });
    }
  });
  return issues;
}
