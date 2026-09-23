import { Predicate } from "effect";
import {
  hasMarkedPhrase,
  isAuthoredLesson,
  splitHighlightSections,
} from "#nakafa-content/highlight/section";
import { isHighlightComponentName } from "#nakafa-content/mdx/fields";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { maskBalancedQuotations } from "#nakafa-content/voice/text";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const STRUCTURAL_MARKER =
  /^(?:Soal|Pembahasan|Problem|Question|Solution|Aufgabe|Lösung|Langkah|Step|Schritt|Contoh|Example|Beispiel)\s+\d+$/iu;

/** Observable section features that require a contextual teaching decision. */
export interface TeachingSectionReview {
  components: string[];
  heading: string;
  line: number;
  proseWords: number;
  signals: string[];
}

interface ProsePart {
  marked: boolean;
  text: string;
}

/** Keeps each visible text fragment attached to its actual emphasis scope. */
function proseParts(node: MdxNode, marked = false): ProsePart[] {
  if (node.type === "text" && Predicate.isString(node.value)) {
    return [{ marked, text: node.value }];
  }
  if (
    node.type === "blockquote" ||
    node.type === "code" ||
    node.type === "inlineCode" ||
    node.type === "mdxjsEsm" ||
    node.type === "mdxFlowExpression" ||
    node.type === "mdxTextExpression"
  ) {
    return [];
  }
  const markedHere =
    marked || node.type === "strong" || isHighlightComponentName(node.name);
  return (node.children ?? []).flatMap((child) =>
    proseParts(child, markedHere)
  );
}

/** Masks quoted spans across formatting boundaries without dropping prose nearby. */
function authoredParts(parts: readonly ProsePart[]): ProsePart[] {
  const unquoted = maskBalancedQuotations(
    parts.map(({ text }) => text).join("")
  );
  let offset = 0;
  return parts.map(({ marked, text }) => {
    const visible = unquoted.slice(offset, offset + text.length);
    offset += text.length;
    return { marked, text: visible };
  });
}

/** Counts ordinary authored words without quoted speech or source syntax. */
function wordCount(parts: readonly ProsePart[]): number {
  return (
    parts
      .map(({ text }) => text)
      .join(" ")
      .match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  );
}

/** Identifies emphasis that still contains text after quotation masking. */
function hasMarkedText(parts: readonly ProsePart[]): boolean {
  return parts.some(({ marked, text }) => marked && text.trim() !== "");
}

/** Preserves valid prose markers, including static JSX and inline code terms. */
function hasProseEmphasis(node: MdxNode): boolean {
  if (node.type === "blockquote" || node.type === "code") {
    return false;
  }
  if (node.type === "strong" || isHighlightComponentName(node.name)) {
    const phrase = proseParts(node)
      .map(({ text }) => text)
      .join("")
      .trim();
    return !STRUCTURAL_MARKER.test(phrase) && hasMarkedPhrase(node);
  }
  return (node.children ?? []).some(hasProseEmphasis);
}

/** Separates a missing marker from a quotation whose ownership needs review. */
function emphasisSignal(
  body: readonly MdxNode[],
  visible: readonly ProsePart[],
  authored: readonly ProsePart[]
): string | undefined {
  if (!body.some(hasProseEmphasis)) {
    return "unmarked-body";
  }
  if (hasMarkedText(visible) && !hasMarkedText(authored)) {
    return "quoted-emphasis-only";
  }
  return undefined;
}

/** Builds a review inventory without pretending features establish quality. */
export function reviewTeachingSections(tree: MdxNode): TeachingSectionReview[] {
  return splitHighlightSections(tree, 6).map(({ nodes, opener }) => {
    const body = nodes.filter((node) => node.type !== "heading");
    const visible = body.flatMap((node) => [
      ...proseParts(node),
      { marked: false, text: "\n\n" },
    ]);
    const parts = authoredParts(visible);
    const components = new Set<string>();
    let richBlock = false;
    let nestedList = false;
    let longParagraph = false;

    /** Collects visible block support and list depth inside this section. */
    function visit(node: MdxNode, listDepth: number): void {
      const nextDepth = listDepth + (node.type === "list" ? 1 : 0);
      nestedList ||= nextDepth > 1;
      longParagraph ||=
        node.type === "paragraph" &&
        wordCount(authoredParts(proseParts(node))) >= 100;
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
    const proseWords = wordCount(parts);
    const signals: string[] = [];
    const emphasis =
      proseWords > 0 ? emphasisSignal(body, visible, parts) : undefined;
    if (emphasis) {
      signals.push(emphasis);
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
      heading:
        opener.type === "heading"
          ? proseParts(opener)
              .map(({ text }) => text)
              .join("")
              .trim()
          : "",
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
