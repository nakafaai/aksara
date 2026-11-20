import { Array as Arr } from "effect";
import type { MdxNode } from "#nakafa-content/mdx/parse";
import { visitMdxNodes } from "#nakafa-content/mdx/parse";
import { expectShape } from "#nakafa-content/mdx/shape";

/** One version of a document: its source and the tree parsed from it. */
export interface DocumentVersion {
  readonly source: string;
  readonly tree: MdxNode;
}

/**
 * The source of one document with the scene data of every MathVisual cut out:
 * the whole `scene` attribute of each MathVisual element. A title, a
 * description, a label or a footer is text the learner reads, so it stays.
 */
export function withoutSceneData({ source, tree }: DocumentVersion): string {
  const ranges: (readonly [start: number, end: number])[] = [];
  visitMdxNodes(tree, (node) => {
    if (node.name !== "MathVisual") {
      return;
    }
    expectShape(node.attributes);
    for (const attribute of node.attributes) {
      const start = attribute.position?.start?.offset;
      const end = attribute.position?.end?.offset;
      expectShape(start !== undefined && end !== undefined);
      if (attribute.name === "scene") {
        ranges.push([start, end]);
      }
    }
  });
  // The parser visits elements in document order, so the ranges run forward.
  const cut = Arr.reduce(ranges, { at: 0, text: "" }, (kept, [start, end]) => ({
    at: end,
    text: kept.text + source.slice(kept.at, start),
  }));
  return cut.text + source.slice(cut.at);
}

/**
 * Whether a change to one document only corrects its figures (D26): both
 * versions read the same once every MathVisual's scene data is left out, so
 * the change moved a frame, an object or a view and nothing the learner
 * reads. Such a change is not a revision of the document, so the bars that
 * hold a revised page (the scene count, the outline and its headings) do not
 * hold it. Any change to a heading, a sentence, a section or a figure's words
 * makes it a revision.
 */
export function correctsFiguresOnly(
  base: DocumentVersion,
  head: DocumentVersion
): boolean {
  return withoutSceneData(base) === withoutSceneData(head);
}
