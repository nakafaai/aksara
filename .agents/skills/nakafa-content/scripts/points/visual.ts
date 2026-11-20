import { Array as Arr, HashMap, HashSet, Option, Order, pipe } from "effect";
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
 * in `mdx/fields`. Every other PascalCase name is an interactive visual, so a
 * newly deployed visual counts without a change here.
 */
const NON_VISUAL_COMPONENTS = HashSet.make(
  "AgentContext",
  "ContentBlock",
  "ContentGrid",
  "ContentStack",
  "MathContainer",
  "Mermaid",
  "Youtube"
);

/** Semantic HTML elements such as table and sup begin with a lowercase letter. */
const HTML_ELEMENT = /^[a-z]/u;

/** Tells whether one renderer component name models a concept interactively. */
export function isInteractiveVisual(name: string): boolean {
  return !(
    HTML_ELEMENT.test(name) ||
    HashSet.has(NON_VISUAL_COMPONENTS, name) ||
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
): HashMap.HashMap<string, number> {
  return Arr.reduce(
    Arr.filter(document.elements, isInteractiveVisual),
    HashMap.empty<string, number>(),
    (counts, name) =>
      HashMap.set(
        counts,
        name,
        Option.getOrElse(HashMap.get(counts, name), () => 0) + 1
      )
  );
}

/** Sums the counts of every component name. */
function total(counts: HashMap.HashMap<string, number>): number {
  return Arr.reduce(
    Arr.fromIterable(HashMap.values(counts)),
    0,
    (sum, count) => sum + count
  );
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
  /** The visuals of one component name that the head still holds. */
  const remaining = (name: string) =>
    Option.getOrElse(HashMap.get(after, name), () => 0);
  const fell = pipe(
    Arr.fromIterable(before),
    Arr.filter(([name, count]) => remaining(name) < count),
    Arr.sort(
      Order.mapInput(Order.String, ([name]: readonly [string, number]) => name)
    ),
    Arr.map(([name, count]) => `${name} ${count} to ${remaining(name)}`)
  );
  return {
    column: 1,
    line: 1,
    message: `interactive visuals fell from ${total(before)} to ${total(after)} (${Arr.join(fell, ", ")}): a revision never removes 3D or animation`,
    rule: "interactive-visuals-fell",
  };
}
