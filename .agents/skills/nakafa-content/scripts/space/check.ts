import { issueAtOffset } from "#nakafa-content/math/finding";
import {
  asEstreeNode,
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  type MdxNode,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** Whitespace at the end of a JSX text that holds a line break. */
const TRAILING_BREAK_PATTERN = /\s*\n\s*$/u;
/** Whitespace at the start of a JSX text that holds a line break. */
const LEADING_BREAK_PATTERN = /^\s*\n\s*/u;
/** A character that wants no space before the element that follows it. */
const OPENING_PATTERN = /[([{“‘„"'/\-–]$/u;
/** A character that wants no space after the element before it. */
const CLOSING_PATTERN = /^[.,;:!?)\]}”’"'%/\-–]/u;

/** Whether a JSX child renders inline beside text: an element or a fragment. */
function isElement(node: EstreeNode | undefined): boolean {
  return node?.type === "JSXElement" || node?.type === "JSXFragment";
}

/**
 * Finds where JSX joins text to a neighbouring element. JSX drops whitespace
 * that holds a line break next to an element, so `five` at the end of a line
 * followed by `<InlineMath />` renders as one word. Returns the offset of
 * each dropped gap that needed a space.
 */
function droppedGaps(source: string, children: EstreeNode[]): number[] {
  return children.flatMap((child, index) => {
    if (child.type !== "JSXText") {
      return [];
    }
    const start = Number(child.start);
    const text = source.slice(start, Number(child.end));
    const body = text.trim();
    if (body === "") {
      return [];
    }
    const gaps: number[] = [];
    const trailing = TRAILING_BREAK_PATTERN.exec(text);
    if (
      trailing &&
      isElement(children[index + 1]) &&
      !OPENING_PATTERN.test(body)
    ) {
      gaps.push(start + trailing.index);
    }
    const leading = LEADING_BREAK_PATTERN.exec(text);
    if (
      leading &&
      isElement(children[index - 1]) &&
      !CLOSING_PATTERN.test(body)
    ) {
      gaps.push(start);
    }
    return gaps;
  });
}

/** Collects the dropped gaps of every element and fragment in one program. */
function programGaps(source: string, program: EstreeNode): number[] {
  const gaps: number[] = [];
  walkEstreeDeep(program, (node) => {
    if (isElement(node)) {
      gaps.push(...droppedGaps(source, estreeChildren(node.children)));
    }
  });
  return gaps;
}

/**
 * Reports each place where JSX drops the space between text and an inline
 * element, in props, fragments, and expressions. Keep the space on the same
 * line as the element, or write `{" "}`.
 */
export function findDroppedSpaceIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const programs: EstreeNode[] = [];
  visitMdxNodes(tree, (node) => {
    const program = asEstreeNode(node.data?.estree);
    if (program) {
      programs.push(program);
    }
    for (const attribute of node.attributes ?? []) {
      const expression = attributeEstree(attribute);
      if (expression) {
        programs.push(expression);
      }
    }
  });
  const offsets = new Set(
    programs.flatMap((program) => programGaps(source, program))
  );
  return [...offsets]
    .sort((left, right) => left - right)
    .map((offset) => issueAtOffset(source, offset, "jsx-dropped-space"));
}
