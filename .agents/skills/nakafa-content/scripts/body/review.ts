import { Predicate } from "effect";
import {
  hasMarkedPhrase,
  isAuthoredLesson,
  splitHighlightSections,
} from "#nakafa-content/highlight/section";
import { isHighlightComponentName } from "#nakafa-content/mdx/fields";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** Observable section features that require a contextual teaching decision. */
export interface TeachingSectionReview {
  components: string[];
  heading: string;
  line: number;
  proseWords: number;
  signals: string[];
}

/** Reads ordinary text without treating executable props or math as prose. */
function prose(node: MdxNode): string {
  if (node.type === "text" && Predicate.isString(node.value)) {
    return node.value;
  }
  if (
    node.type === "blockquote" ||
    node.type === "code" ||
    node.type === "inlineCode" ||
    node.type === "mdxjsEsm" ||
    node.type === "mdxFlowExpression" ||
    node.type === "mdxTextExpression"
  ) {
    return "";
  }
  return (node.children ?? []).map(prose).join(" ");
}

/** Counts rendered prose words after excluding source syntax and notation. */
function wordCount(node: MdxNode): number {
  return prose(node).match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
}

/** Finds emphasis in authored prose without borrowing quoted or label markers. */
function hasProseEmphasis(node: MdxNode): boolean {
  if (node.type === "blockquote" || node.type === "code") {
    return false;
  }
  if (node.type === "strong" || isHighlightComponentName(node.name)) {
    return hasMarkedPhrase(node);
  }
  return (node.children ?? []).some(hasProseEmphasis);
}

/** Builds a review inventory without pretending features establish quality. */
export function reviewTeachingSections(tree: MdxNode): TeachingSectionReview[] {
  return splitHighlightSections(tree, 6).map(({ nodes, opener }) => {
    const body = nodes.filter((node) => node.type !== "heading");
    const components = new Set<string>();
    let richBlock = false;
    let nestedList = false;
    let longParagraph = false;

    /** Collects visible block support and list depth inside this section. */
    function visit(node: MdxNode, listDepth: number): void {
      const nextDepth = listDepth + (node.type === "list" ? 1 : 0);
      nestedList ||= nextDepth > 1;
      longParagraph ||= node.type === "paragraph" && wordCount(node) >= 100;
      richBlock ||=
        node.type === "table" ||
        node.type === "blockquote" ||
        node.type === "code";
      if (
        node.name &&
        node.name !== "Highlight" &&
        node.name !== "InlineMath"
      ) {
        components.add(node.name);
        richBlock = true;
      }
      for (const child of node.children ?? []) {
        visit(child, nextDepth);
      }
    }

    for (const node of body) {
      visit(node, 0);
    }
    const proseWords = body.reduce((total, node) => total + wordCount(node), 0);
    const signals: string[] = [];
    if (proseWords > 0 && !body.some(hasProseEmphasis)) {
      signals.push("unmarked-body");
    }
    if (proseWords > 0 && !richBlock) {
      signals.push("prose-without-representation");
    }
    if (body.length > 0 && body.every((node) => node.type === "list")) {
      signals.push("list-only-body");
    }
    if (nestedList) {
      signals.push("nested-list");
    }
    if (longParagraph) {
      signals.push("long-paragraph");
    }
    return {
      components: [...components].sort(),
      heading: opener.type === "heading" ? prose(opener).trim() : "",
      line: opener.position?.start?.line ?? 1,
      proseWords,
      signals,
    };
  });
}

/** Requires a selective phrase inside each authored heading body, not its title. */
export function findBodyHighlightIssues(
  tree: MdxNode,
  includeOpening = false
): LessonVoiceIssue[] {
  if (!isAuthoredLesson(tree)) {
    return [];
  }
  return reviewTeachingSections(tree)
    .filter(
      ({ heading, signals }) =>
        (includeOpening || heading.length > 0) &&
        signals.includes("unmarked-body")
    )
    .map(({ heading, line }) => ({
      column: 1,
      excerpt: heading,
      line,
      rule: "section-body-highlight",
    }));
}
