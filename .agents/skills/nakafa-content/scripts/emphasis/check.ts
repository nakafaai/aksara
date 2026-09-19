import { Predicate } from "effect";
import { isHighlightComponentName } from "#nakafa-content/mdx/fields";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const LITERAL_CODE_TYPES = new Set(["code", "inlineCode"]);
const EMPHASIS_ARTIFACT_PATTERN = /\*\*/u;
const EXCERPT_CHARACTER_LIMIT = 200;
const STEP_LABEL_PATTERN = /^(?:Langkah|Step|Schritt)$/iu;
const STEP_NUMBER_PATTERN = /^[\t ]*\d+(?:[\s.:)]|$)/u;

/**
 * Finds broken markers and numbered step labels split across an emphasis boundary.
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
      Predicate.isString(node.value) &&
      EMPHASIS_ARTIFACT_PATTERN.test(node.value)
    ) {
      const line = node.position?.start?.line;
      issues.push({
        column: 1,
        excerpt: node.value.trim().slice(0, EXCERPT_CHARACTER_LIMIT),
        line: Predicate.isNumber(line) ? line : 1,
        rule: "unbalanced-emphasis",
      });
    }
    const marked =
      node.type === "strong" ||
      ((node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement") &&
        isHighlightComponentName(node.name));
    const label =
      node.children?.length === 1 ? node.children[0]?.value : undefined;
    const end = node.position?.end?.offset;
    if (
      marked &&
      Predicate.isString(label) &&
      STEP_LABEL_PATTERN.test(label.trim()) &&
      Predicate.isNumber(end) &&
      STEP_NUMBER_PATTERN.test(source.slice(end))
    ) {
      issues.push({
        column: node.position?.start?.column ?? 1,
        excerpt: source
          .slice(node.position?.start?.offset ?? end, end + 20)
          .trim(),
        line: node.position?.start?.line ?? 1,
        rule: "incomplete-step-emphasis",
      });
    }
  });
  return issues;
}
