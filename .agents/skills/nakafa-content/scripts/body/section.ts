import { parseLessonMdx, type MdxNode } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const THIN_SECTION_WORD_LIMIT = 25;
const INLINE_PROSE_TYPES = new Set(["inlineCode", "text"]);
const BLOCK_REPRESENTATION_TYPES = new Set(["blockquote", "code", "table"]);

type HeadingNode = Omit<MdxNode, "position" | "type"> & {
  depth: number;
  position: {
    end: { offset: number };
    start: { line: number; offset: number };
  };
  type: "heading";
};

/** Narrows one parser-owned heading. */
function isHeadingNode(node: MdxNode): node is HeadingNode {
  return node.type === "heading";
}

/** Reads the top-level flow children of a parsed lesson document. */
function flowChildren(root: MdxNode): MdxNode[] {
  return (root.children ?? []).filter((node) => node.type !== "mdxjsEsm");
}

/** Detects an authored lesson document by its static metadata declaration. */
function isLessonDocument(root: MdxNode): boolean {
  return (root.children ?? []).some((node) => node.type === "mdxjsEsm");
}

/** Counts words in ordinary text and inline code, skipping inline components. */
function countProseWords(node: MdxNode): number {
  if (
    node.type === "mdxJsxFlowElement" ||
    node.type === "mdxJsxTextElement"
  ) {
    return 0;
  }
  const own =
    typeof node.value === "string" && INLINE_PROSE_TYPES.has(node.type)
      ? node.value.split(/\s+/u).filter((word) => word !== "").length
      : 0;
  return (node.children ?? []).reduce(
    (total, child) => total + countProseWords(child),
    own
  );
}

/** Returns the rule id for one heading that carries no teaching content. */
function sectionBodyRule(
  body: readonly MdxNode[],
  proseWords: number,
  opensChildHeading: boolean
): string | undefined {
  // One bar covers every section: a heading must carry either at least
  // THIN_SECTION_WORD_LIMIT words of ordinary prose or one real representation
  // (a table, blockquote, code block, or teaching component). Text inside list
  // items counts as prose, so a rich worked-solution list passes while a bare
  // bullet list does not. Keep this order so each defective section yields
  // exactly one diagnosis.
  if (body.length === 0) {
    return opensChildHeading ? "heading-without-body" : "empty-section-body";
  }
  if (
    proseWords < THIN_SECTION_WORD_LIMIT &&
    body.every((node) => node.type === "list")
  ) {
    return "list-only-section";
  }
  if (
    proseWords === 0 &&
    body.every(
      (node) =>
        node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement"
    )
  ) {
    return "component-only-section";
  }
  const hasRepresentation = body.some(
    (node) =>
      node.type === "mdxJsxFlowElement" ||
      BLOCK_REPRESENTATION_TYPES.has(node.type)
  );
  return proseWords < THIN_SECTION_WORD_LIMIT && !hasRepresentation
    ? "thin-section-body"
    : undefined;
}

/** Collects every heading whose section body carries no teaching content. */
export function findSectionBodyIssues(
  source: string,
  tree?: MdxNode
): LessonVoiceIssue[] {
  const root = tree ?? parseLessonMdx(source);
  if (!isLessonDocument(root)) {
    return [];
  }
  const flow = flowChildren(root);
  const issues: LessonVoiceIssue[] = [];
  for (let index = 0; index < flow.length; index += 1) {
    const node = flow[index];
    if (!isHeadingNode(node)) {
      continue;
    }
    let end = index + 1;
    while (end < flow.length && !isHeadingNode(flow[end])) {
      end += 1;
    }
    const body = flow.slice(index + 1, end);
    const proseWords = body.reduce(
      (total, child) => total + countProseWords(child),
      0
    );
    const stop = flow[end];
    const opensChildHeading =
      stop !== undefined && isHeadingNode(stop) && stop.depth > node.depth;
    const rule = sectionBodyRule(body, proseWords, opensChildHeading);
    if (rule !== undefined) {
      issues.push({
        column: 1,
        excerpt: source
          .slice(node.position.start.offset, node.position.end.offset)
          .trim(),
        line: node.position.start.line,
        rule,
      });
    }
  }
  return issues;
}
