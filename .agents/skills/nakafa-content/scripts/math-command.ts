import {
  sourceOffsetForStaticMatch,
  staticStringCandidates,
} from "#nakafa-content/static-string";
import {
  asEstreeNode,
  type EstreeNode,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
} from "#nakafa-content/voice-mdx";
import type { LessonVoiceIssue } from "#nakafa-content/voice-types";

const LATEX_DOTS_PATTERN = /\b(?:ldots|cdots|vdots|ddots)\b/gu;

/** Checks whether a dot name is preceded by an active command backslash. */
function isBareDotCommand(value: string, index: number): boolean {
  let backslashCount = 0;
  for (
    let cursor = index - 1;
    cursor >= 0 && value[cursor] === "\\";
    cursor -= 1
  ) {
    backslashCount += 1;
  }
  return backslashCount % 2 === 0;
}

/** Returns a diagnostic at one exact source offset. */
function issueAtOffset(source: string, offset: number): LessonVoiceIssue {
  const lineStart = source.lastIndexOf("\n", offset - 1) + 1;
  const lineEndIndex = source.indexOf("\n", offset);
  const lineEnd = lineEndIndex === -1 ? source.length : lineEndIndex;
  const line = source.slice(0, lineStart).split("\n").length;
  return {
    column: offset - lineStart + 1,
    excerpt: source.slice(lineStart, lineEnd).trim(),
    line,
    rule: "malformed-latex-command",
  };
}

/** Locates one direct string attribute value inside its source range. */
function directAttributeOffsets(
  attribute: MdxAttribute,
  source: string
): { end: number; start: number } | undefined {
  if (typeof attribute.value !== "string") {
    return;
  }
  const start = attribute.position?.start?.offset;
  const end = attribute.position?.end?.offset;
  if (start === undefined || end === undefined) {
    return;
  }
  const localOffset = source.slice(start, end).indexOf(attribute.value);
  return localOffset === -1
    ? undefined
    : {
        end: start + localOffset + attribute.value.length,
        start: start + localOffset,
      };
}

/** Returns the static expression stored in one JSX attribute. */
function attributeExpression(attribute: MdxAttribute): EstreeNode | undefined {
  if (
    !attribute.value ||
    typeof attribute.value !== "object" ||
    !("data" in attribute.value) ||
    !attribute.value.data ||
    typeof attribute.value.data !== "object" ||
    !("estree" in attribute.value.data)
  ) {
    return;
  }
  return asEstreeNode(attribute.value.data.estree);
}

/** Collects malformed dot commands from one explicit math prop. */
function collectAttributeOffsets(
  attribute: MdxAttribute,
  offsets: Set<number>,
  source: string
): void {
  if (attribute.name !== "math") {
    return;
  }
  const directRange = directAttributeOffsets(attribute, source);
  if (directRange) {
    const math = source.slice(directRange.start, directRange.end);
    for (const match of math.matchAll(LATEX_DOTS_PATTERN)) {
      if (match.index !== undefined && isBareDotCommand(math, match.index)) {
        offsets.add(directRange.start + match.index);
      }
    }
    return;
  }
  const expression = attributeExpression(attribute);
  if (!expression) {
    return;
  }
  for (const candidate of staticStringCandidates(expression)) {
    const math = candidate.text;
    for (const match of math.matchAll(LATEX_DOTS_PATTERN)) {
      if (match.index === undefined || !isBareDotCommand(math, match.index)) {
        continue;
      }
      const offset = sourceOffsetForStaticMatch(
        candidate,
        match.index,
        match[0],
        source
      );
      if (offset !== undefined) {
        offsets.add(offset);
      }
    }
  }
}

/** Collects malformed dot commands only from explicit math component props. */
function collectNodeOffsets(
  node: MdxNode,
  offsets: Set<number>,
  source: string
): void {
  if (node.type === "blockquote") {
    return;
  }
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    for (const attribute of node.attributes ?? []) {
      collectAttributeOffsets(attribute, offsets, source);
    }
  }
  for (const child of node.children ?? []) {
    collectNodeOffsets(child, offsets, source);
  }
}

/** Finds dot commands missing the leading backslash in rendered math. */
export function findMalformedLatexCommandIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const offsets = new Set<number>();
  collectNodeOffsets(tree, offsets, source);
  return [...offsets]
    .sort((left, right) => left - right)
    .map((offset) => issueAtOffset(source, offset));
}
