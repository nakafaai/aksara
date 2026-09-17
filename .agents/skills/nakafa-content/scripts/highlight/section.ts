import type { MdxNode } from "#nakafa-content/mdx/parse";

/** One heading-delimited part of a lesson document and the node that opens it. */
export interface HighlightSection {
  nodes: MdxNode[];
  opener: MdxNode;
}

/**
 * Splits authored MDX flow content into heading-delimited sections.
 *
 * A heading at or above `level` opens a section, and every later node belongs
 * to it until the next such heading. Content before the first heading forms
 * its own section, so an introduction is measured exactly like a titled
 * section.
 *
 * `level` is the deepest heading that still opens a section. The ceiling rule
 * passes `6` so every subsection is measured on its own, and the opening rule
 * passes `2` so the first top-level section counts together with the
 * subsections a learner reads inside it.
 */
export function splitHighlightSections(
  tree: MdxNode,
  level: number
): HighlightSection[] {
  const flow = (tree.children ?? []).filter((node) => node.type !== "mdxjsEsm");
  const sections: HighlightSection[] = [];
  for (const node of flow) {
    const current = sections.at(-1);
    const opens =
      node.type === "heading" &&
      (node.depth ?? Number.POSITIVE_INFINITY) <= level;
    if (opens || current === undefined) {
      sections.push({ nodes: [node], opener: node });
      continue;
    }
    current.nodes.push(node);
  }
  return sections;
}
