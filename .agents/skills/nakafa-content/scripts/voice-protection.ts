import { isNonProseFieldName } from "#nakafa-content/semicolon/expression";
import type { MdxNode, SourceRange } from "#nakafa-content/voice-mdx";
import { maskProtectedInlineContent } from "#nakafa-content/voice-text";

const RAW_LINE_PROTECTED_NODE_TYPES = new Set([
  "blockquote",
  "code",
  "definition",
  "html",
  "image",
  "inlineCode",
  "link",
  "linkReference",
]);
const RAW_LINE_PROTECTED_COMPONENT_NAMES = new Set([
  "a",
  "BlockMath",
  "CodeBlock",
  "InlineMath",
]);

/** Recognizes an MDX expression that contains comments but renders no value. */
function isNonRenderedExpression(node: MdxNode): boolean {
  if (node.type !== "mdxFlowExpression" && node.type !== "mdxTextExpression") {
    return false;
  }
  const estree = node.data?.estree;
  return (
    estree?.type === "Program" &&
    Array.isArray(estree.body) &&
    estree.body.length === 0 &&
    Array.isArray(estree.comments) &&
    estree.comments.length > 0
  );
}

/** Collects parsed regions that raw prose rules must never inspect. */
function collectProtectedRanges(node: MdxNode, ranges: SourceRange[]): void {
  const protectedNode =
    RAW_LINE_PROTECTED_NODE_TYPES.has(node.type ?? "") ||
    isNonRenderedExpression(node) ||
    ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
      RAW_LINE_PROTECTED_COMPONENT_NAMES.has(node.name ?? ""));
  if (protectedNode) {
    if (node.position) {
      ranges.push(node.position);
    }
    return;
  }
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    for (const attribute of node.attributes ?? []) {
      if (attribute.position && isNonProseFieldName(attribute.name)) {
        ranges.push(attribute.position);
      }
    }
  }
  for (const child of node.children ?? []) {
    collectProtectedRanges(child, ranges);
  }
}

/** Returns every parsed range that raw line rules must ignore. */
export function rawLineProtectedRanges(tree: MdxNode): SourceRange[] {
  const ranges: SourceRange[] = [];
  collectProtectedRanges(tree, ranges);
  return ranges;
}

/** Masks parsed code, quotes, links, comments, and component attributes. */
export function maskRawLineProtectedContent(
  line: string,
  lineOffset: number,
  ranges: readonly SourceRange[]
): string {
  const characters = maskProtectedInlineContent(line).split("");
  const lineEnd = lineOffset + line.length;
  for (const range of ranges) {
    const start = range.start?.offset;
    const end = range.end?.offset;
    if (
      start === undefined ||
      end === undefined ||
      end <= lineOffset ||
      start >= lineEnd
    ) {
      continue;
    }
    characters.fill(
      " ",
      Math.max(0, start - lineOffset),
      Math.min(line.length, end - lineOffset)
    );
  }
  return characters.join("");
}
