import {
  headingAnchor,
  headingWords,
} from "@nakafa/aksara-compiler/policy/anchor";
import { HashSet } from "effect";
import { headingText } from "#nakafa-content/heading/label";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/**
 * The fewest and the most H2 sections a lesson holds. Measured on the 383
 * lessons of 15 November 2026: the 5th percentile is three sections and the
 * largest lesson has ten, while the lesson standard expects five to nine.
 */
const FEWEST_SECTIONS = 3;
const MOST_SECTIONS = 10;

const SECTION_DEPTH = 2;
const SUBSECTION_DEPTH = 3;
const WHITESPACE_PATTERN = /\s+/gu;

type HeadingNode = Omit<MdxNode, "position" | "type"> & {
  position: {
    end: { offset: number };
    start: { line: number; offset: number };
  };
  type: "heading";
};

/** Narrows one parser-owned heading, which always carries its position. */
function isHeadingNode(node: MdxNode): node is HeadingNode {
  return node.type === "heading";
}

/** One top-level Markdown heading of a lesson body. */
export interface OutlineHeading {
  readonly depth: number;
  readonly excerpt: string;
  /** The heading's text and JSX text, without the source of its formulas. */
  readonly label: string;
  readonly line: number;
  /** The words the page renders, with the source of each formula. */
  readonly words: string;
}

/** Reads the top-level headings of one lesson in teaching order. */
export function outlineHeadings(
  source: string,
  tree: MdxNode
): OutlineHeading[] {
  const headings: OutlineHeading[] = [];
  for (const node of tree.children ?? []) {
    if (!isHeadingNode(node)) {
      continue;
    }
    const { end, start } = node.position;
    headings.push({
      depth: Number(node.depth),
      excerpt: source.slice(start.offset, end.offset).trim(),
      label: headingText(node).replace(WHITESPACE_PATTERN, " ").trim(),
      line: start.line,
      words: headingWords(node).replace(WHITESPACE_PATTERN, " ").trim(),
    });
  }
  return headings;
}

/** Builds one outline finding at a heading line. */
function issueAt(heading: OutlineHeading, rule: string): LessonVoiceIssue {
  return { column: 1, excerpt: heading.excerpt, line: heading.line, rule };
}

/**
 * Finds each H2 that opens exactly one H3. A lone subsection splits one
 * teaching job across two headings, so merge it into its section or give the
 * section the second subsection it lacks. No heading is exempt, including
 * worked-solution subsections in any locale.
 */
export function findLoneSubsections(
  headings: readonly OutlineHeading[]
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  headings.forEach((section, index) => {
    if (section.depth !== SECTION_DEPTH) {
      return;
    }
    const subsections: OutlineHeading[] = [];
    for (const heading of headings.slice(index + 1)) {
      if (heading.depth <= SECTION_DEPTH) {
        break;
      }
      if (heading.depth === SUBSECTION_DEPTH) {
        subsections.push(heading);
      }
    }
    if (subsections.length !== 1) {
      return;
    }
    for (const only of subsections) {
      issues.push(issueAt(only, "lone-subsection"));
    }
  });
  return issues;
}

/**
 * Finds a flat lesson with fewer than three H2 sections and a crowded lesson
 * with more than ten, reported at its first and at its eleventh H2.
 */
function findSectionCountIssues(
  headings: readonly OutlineHeading[]
): LessonVoiceIssue[] {
  const sections = headings.filter(({ depth }) => depth === SECTION_DEPTH);
  const [first] = sections;
  if (first !== undefined && sections.length < FEWEST_SECTIONS) {
    return [issueAt(first, "flat-outline")];
  }
  const extra = sections[MOST_SECTIONS];
  return extra === undefined ? [] : [issueAt(extra, "crowded-outline")];
}

/**
 * Finds each heading whose anchor an earlier heading of the page already
 * renders, as `Sudut Pusat` and `sudut pusat` do. The page outline links both
 * entries to the first heading, so the second is unreachable. The compiler
 * rejects the same collision with `AuthoredHeadingAnchorError`.
 */
function findAnchorCollisions(
  headings: readonly OutlineHeading[]
): LessonVoiceIssue[] {
  let seen = HashSet.empty<string>();
  const issues: LessonVoiceIssue[] = [];
  for (const heading of headings) {
    const anchor = headingAnchor(heading.words);
    if (anchor !== "" && HashSet.has(seen, anchor)) {
      issues.push(issueAt(heading, "heading-anchor"));
    }
    seen = HashSet.add(seen, anchor);
  }
  return issues;
}

/**
 * Holds the whole corpus to the outline invariants every existing page already
 * meets: three to ten H2 sections and no two headings with one anchor. Changed
 * and new pages additionally run `budget.ts` in `bun run headings`, which
 * blocks every lone subsection (including solution headings) and flat outlines.
 */
export function findCorpusOutlineIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const headings = outlineHeadings(source, tree);
  return [
    ...findSectionCountIssues(headings),
    ...findAnchorCollisions(headings),
  ];
}

/**
 * Holds one lesson's outline to its measured shape: three to ten H2
 * sections, no H2 with a single H3 (no exemption for solution headings), and
 * no two headings with one anchor.
 * The heading-order rule owns the depth limit and the section-body rules own
 * the words under each heading.
 */
export function findOutlineIssues(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const headings = outlineHeadings(source, tree);
  return [
    ...findSectionCountIssues(headings),
    ...findLoneSubsections(headings),
    ...findAnchorCollisions(headings),
  ];
}
