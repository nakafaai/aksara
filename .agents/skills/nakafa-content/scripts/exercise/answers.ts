import { Predicate } from "effect";
import {
  isExerciseHeading,
  isSolutionHeading,
} from "#nakafa-content/exercise/context";
import { headingText } from "#nakafa-content/heading/label";
import { issueAtOffset } from "#nakafa-content/math/finding";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import type {
  LessonVoiceIssue,
  LessonVoiceLocale,
} from "#nakafa-content/voice/types";

const REFERENCE =
  /^(?:Soal|Pembahasan|Problem|Question|Solution|Aufgabe|Lösung)\s+(\d+)\b/iu;
const NUMBER_COLUMN = /^(?:Soal|Problem|Question|Aufgabe)$/iu;
const NUMBER = /^\d+$/u;
const HTML_HEADING = /^h[1-6]$/u;
const WHITESPACE = /\s+/gu;

/** Resolves a document heading without treating component attributes as sections. */
function headingDepth(node: MdxNode): number | undefined {
  if (node.type === "heading") {
    return node.depth;
  }
  const child = node.children?.[0];
  if (node.type === "paragraph" && node.children?.length === 1 && child) {
    return headingDepth(child);
  }
  return (node.type === "mdxJsxFlowElement" ||
    node.type === "mdxJsxTextElement") &&
    node.name !== undefined &&
    HTML_HEADING.test(node.name)
    ? Number(node.name.slice(1))
    : undefined;
}

/** Reads visible identifiers without treating code or component data as prose. */
function text(node: MdxNode): string {
  if (node.type === "text") {
    return Predicate.isString(node.value) ? node.value : "";
  }
  if (node.name === "InlineMath") {
    const value = node.attributes?.find(({ name }) => name === "math")?.value;
    return Predicate.isString(value) ? value : "";
  }
  return (node.children ?? []).map(text).join("");
}

/** Resolves the visible ordinals of a parser-owned ordered list. */
function ordinals(node: MdxNode): number[] {
  if (node.type !== "list" || !node.ordered) {
    return [];
  }
  return (node.children ?? []).map((_, index) => (node.start ?? 1) + index);
}

/** Collects explicit row or column references from one solution table. */
function tableReferences(node: MdxNode): number[] {
  const rows = node.children ?? [];
  const headers = rows[0]?.children ?? [];
  const references = headers.flatMap((cell) => {
    const match = text(cell).match(REFERENCE);
    return match ? [Number(match[1])] : [];
  });
  const column = headers.findIndex((cell) => NUMBER_COLUMN.test(text(cell)));
  if (column < 0) {
    return references;
  }
  for (const row of rows.slice(1)) {
    const cell = row.children?.[column];
    if (cell && NUMBER.test(text(cell))) {
      references.push(Number(text(cell)));
    }
  }
  return references;
}

/** Matches answer boundaries, excluding numbered steps after an explicit label. */
function answerReferences(nodes: readonly MdxNode[]): Set<number> {
  const references = new Set<number>();
  let labeledAnswer = false;
  let usedList = false;
  for (const node of nodes) {
    if (node.type === "paragraph") {
      const match = text(node).match(REFERENCE);
      if (match) {
        labeledAnswer = true;
        references.add(Number(match[1]));
      }
    }
    if (node.type === "table") {
      for (const number of tableReferences(node)) {
        references.add(number);
      }
    }
    const numbers = ordinals(node);
    const continuation = (node.start ?? 1) > 1;
    if ((labeledAnswer || usedList) && !continuation) {
      continue;
    }
    usedList ||= numbers.length > 0;
    for (const number of numbers) {
      references.add(number);
    }
  }
  return references;
}

/**
 * Requires visible answer numbers for a numbered lesson exercise.
 *
 * Only explicit exercise and solution headings establish this boundary. Multiple
 * prompt groups that restart their numbering require the contextual review.
 */
export function findExerciseAnswerIssues(
  source: string,
  tree: MdxNode,
  locale: LessonVoiceLocale
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  const issues: LessonVoiceIssue[] = [];
  for (const [index, heading] of children.entries()) {
    if (
      headingDepth(heading) !== 2 ||
      !isExerciseHeading(
        locale,
        headingText(heading).replace(WHITESPACE, " ").trim()
      )
    ) {
      continue;
    }
    const following = children.slice(index + 1);
    const end = following.findIndex((node) => headingDepth(node) === 2);
    const section = end < 0 ? following : following.slice(0, end);
    const solutionIndex = section.findIndex(
      (node) =>
        headingDepth(node) === 3 &&
        isSolutionHeading(
          locale,
          headingText(node).replace(WHITESPACE, " ").trim()
        )
    );
    if (solutionIndex < 0) {
      continue;
    }
    const questions = section.slice(0, solutionIndex).flatMap(ordinals);
    if (questions.length < 2 || new Set(questions).size !== questions.length) {
      continue;
    }
    const references = answerReferences(section.slice(solutionIndex + 1));
    if (questions.every((number) => references.has(number))) {
      continue;
    }
    const offset = section[solutionIndex]?.position?.start?.offset;
    if (offset !== undefined) {
      issues.push(issueAtOffset(source, offset, "exercise-answer-reference"));
    }
  }
  return issues;
}
