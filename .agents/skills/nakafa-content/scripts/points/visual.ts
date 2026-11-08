import {
  isCodeComponentName,
  isHighlightComponentName,
  isMathComponentName,
} from "#nakafa-content/mdx/fields";
import type { DocumentParts } from "#nakafa-content/points/document";
import type { PointsFinding } from "#nakafa-content/points/finding";

/**
 * Renderer names that lay out content, draw a static diagram, embed a video, or
 * carry agent context, so they never model a concept interactively. Text,
 * notation, code, and emphasis components come from the shared role predicates
 * in `mdx/fields`. No Aksara module lists the renderer names: the contracts
 * package defines only the manifest schema, and the live renderer supplies the
 * names when a document compiles. Every other PascalCase name is therefore an
 * interactive visual, so a newly deployed visual counts without a change here.
 */
const NON_VISUAL_COMPONENTS: ReadonlySet<string> = new Set([
  "AgentContext",
  "ContentBlock",
  "ContentGrid",
  "ContentStack",
  "MathContainer",
  "Mermaid",
  "Youtube",
]);

/** Semantic HTML elements such as table and sup begin with a lowercase letter. */
const HTML_ELEMENT = /^[a-z]/u;

/** A lesson is one folder below the lesson root with one MDX file per locale. */
const LESSON_FILE =
  /(?:^|\/)(?<folder>packages\/corpus\/material\/lesson\/.+)\/[^/]+\.mdx$/u;

/** Tells whether one renderer component name models a concept interactively. */
export function isInteractiveVisual(name: string): boolean {
  return !(
    HTML_ELEMENT.test(name) ||
    NON_VISUAL_COMPONENTS.has(name) ||
    isMathComponentName(name) ||
    isCodeComponentName(name) ||
    isHighlightComponentName(name)
  );
}

/**
 * Counts the interactive visuals of one document by component name, whether
 * the element stands in the page or inside an expression of another one.
 */
export function countVisuals(
  document: DocumentParts
): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const name of document.elements) {
    if (isInteractiveVisual(name)) {
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
  }
  return counts;
}

/** Names the lesson folder of one locale file, or nothing for any other page. */
export function lessonFolder(file: string): string | undefined {
  return LESSON_FILE.exec(file)?.groups?.folder;
}

/** A lesson carries at least this many visual cards, Mermaid diagrams included. */
export const MIN_VISUAL_CARDS = 3;

/**
 * Counts the visual cards of one document: every interactive visual and every
 * Mermaid diagram. A diagram is a card but never the interactive one.
 */
export function countCards(document: DocumentParts): {
  readonly cards: number;
  readonly interactive: number;
} {
  const interactive = total(countVisuals(document));
  let diagrams = 0;
  for (const name of document.elements) {
    if (name === "Mermaid") {
      diagrams += 1;
    }
  }
  return { cards: interactive + diagrams, interactive };
}

/**
 * Lists every lesson folder with a locale file below the visual bar, in path
 * order: fewer than three visual cards, or no interactive one among them.
 */
export function lessonsBelowBar(
  documents: Iterable<readonly [file: string, document: DocumentParts]>
): readonly string[] {
  const below = new Set<string>();
  for (const [file, document] of documents) {
    const folder = lessonFolder(file);
    if (folder === undefined) {
      continue;
    }
    const { cards, interactive } = countCards(document);
    if (cards < MIN_VISUAL_CARDS || interactive === 0) {
      below.add(folder);
    }
  }
  return [...below].sort();
}

/** Sums the counts of every component name. */
function total(counts: ReadonlyMap<string, number>): number {
  let sum = 0;
  for (const count of counts.values()) {
    sum += count;
  }
  return sum;
}

/** Reports a document whose interactive visuals fell below its base version. */
export function findVisualLoss(
  base: DocumentParts,
  head: DocumentParts
): PointsFinding | undefined {
  const before = countVisuals(base);
  const after = countVisuals(head);
  if (total(after) >= total(before)) {
    return undefined;
  }
  const fell = [...before]
    .filter(([name, count]) => (after.get(name) ?? 0) < count)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, count]) => `${name} ${count} to ${after.get(name) ?? 0}`);
  return {
    column: 1,
    line: 1,
    message: `interactive visuals fell from ${total(before)} to ${total(after)} (${fell.join(", ")}): a revision never removes 3D or animation`,
    rule: "interactive-visuals-fell",
  };
}
