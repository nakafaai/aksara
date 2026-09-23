import { Predicate } from "effect";
import {
  isExerciseHeading,
  isSolutionHeading,
} from "#nakafa-content/exercise/context";
import { expressionText, headingText } from "#nakafa-content/heading/label";
import { issueAtOffset } from "#nakafa-content/math/finding";
import {
  attributeEstree,
  type EstreeNode,
  jsxComponentName,
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
} from "#nakafa-content/voice/types";

const HTML_HEADING_PATTERN = /^h[1-6]$/u;
const WHITESPACE_PATTERN = /\s+/gu;

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
 * Enforces the two authored heading levels owned by each document genre.
 *
 * Lessons and articles use H2 and H3, including their worked solutions.
 * Standalone question-bank answers use H4 and H5 beneath the app-owned H3.
 */
export function findHeadingOrderIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source),
  bodyHeadingDepth = BODY_HEADING_DEPTH,
  lessonLocale?: LessonVoiceLocale
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const headings: {
    depth: number;
    line: number;
    column: number;
    label: string;
  }[] = [];
  /** Records only statically named HTML headings with parser-owned offsets. */
  function recordJsx(
    name: string | undefined,
    offset: number | undefined,
    label: string
  ): void {
    if (
      name === undefined ||
      offset === undefined ||
      !HTML_HEADING_PATTERN.test(name)
    ) {
      return;
    }
    const { line, column } = issueAtOffset(source, offset, "heading-order");
    headings.push({ column, depth: Number(name.slice(1)), label, line });
  }
  /** Inspects JSX hidden inside expressions and component attributes. */
  function inspectProgram(program: EstreeNode | undefined): void {
    if (!program) {
      return;
    }
    walkEstreeDeep(program, (node) => {
      if (node.type === "JSXElement") {
        recordJsx(jsxComponentName(node), node.start, expressionText(node));
      }
    });
  }
  visitMdxNodes(tree, (node) => {
    if (isHeadingNode(node)) {
      headings.push({
        depth: node.depth,
        label: headingText(node),
        ...node.position.start,
      });
    }
    if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      recordJsx(node.name, node.position?.start?.offset, headingText(node));
      for (const attribute of node.attributes ?? []) {
        inspectProgram(attributeEstree(attribute));
      }
    }
    if (node.type !== "mdxjsEsm") {
      inspectProgram(node.data?.estree);
    }
  });
  headings.sort(
    (left, right) => left.line - right.line || left.column - right.column
  );
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];
  let previousDepth: number | undefined;
  let exerciseSection = false;
  for (const heading of headings) {
    const excerpt = (lines[heading.line - 1] ?? "").trim();
    const label = heading.label.replace(WHITESPACE_PATTERN, " ").trim();
    const promotedSolution =
      lessonLocale !== undefined &&
      heading.depth === 2 &&
      exerciseSection &&
      isSolutionHeading(lessonLocale, label);
    const skipped =
      previousDepth !== undefined && heading.depth > previousDepth + 1;
    const misrooted =
      previousDepth === undefined && heading.depth !== bodyHeadingDepth;
    if (
      promotedSolution ||
      skipped ||
      misrooted ||
      heading.depth < bodyHeadingDepth ||
      heading.depth > bodyHeadingDepth + 1
    ) {
      issues.push({
        column: heading.column,
        excerpt,
        line: heading.line,
        rule: "heading-order",
      });
    }
    if (lessonLocale !== undefined && heading.depth === 2) {
      exerciseSection = isExerciseHeading(lessonLocale, label);
    }
    previousDepth = heading.depth;
  }
  return issues;
}
