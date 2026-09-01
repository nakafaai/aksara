import type { MdxNode } from "#nakafa-content/voice-mdx";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

const LOWERCASE_LETTER_PATTERN = /^\p{Ll}/u;
const MATH_BLOCK_NAMES = new Set(["BlockMath", "MathContainer"]);

/** Returns true when a root child renders a standalone mathematics block. */
function isMathBlock(node: MdxNode | undefined): boolean {
  return (
    node?.type === "mdxJsxFlowElement" &&
    typeof node.name === "string" &&
    MATH_BLOCK_NAMES.has(node.name)
  );
}

/** Reads a paragraph only when its first visible child is ordinary text. */
function initialParagraphText(node: MdxNode): string | undefined {
  if (node.type !== "paragraph") {
    return;
  }
  const firstChild = node.children?.find(
    (child) =>
      !(
        child.type === "text" &&
        typeof child.value === "string" &&
        child.value.trim() === ""
      )
  );
  return firstChild?.type === "text" && typeof firstChild.value === "string"
    ? firstChild.value.trimStart()
    : undefined;
}

/** Reviews prose that renders as a lowercase fragment after displayed math. */
export function findMathBlockFragmentIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  const children = tree.children ?? [];

  for (const [index, node] of children.entries()) {
    if (!isMathBlock(children[index - 1])) {
      continue;
    }
    const initialText = initialParagraphText(node);
    const start = node.position?.start;
    if (
      initialText === undefined ||
      !LOWERCASE_LETTER_PATTERN.test(initialText) ||
      start?.line === undefined ||
      start.column === undefined
    ) {
      continue;
    }
    const line = source.split("\n")[start.line - 1] ?? "";
    issues.push({
      column: start.column,
      excerpt: line.trim(),
      line: start.line,
      rule: "lowercase-fragment-after-math-block",
    });
  }

  return issues;
}
