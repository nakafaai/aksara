import { splitHighlightSections } from "#nakafa-content/highlight/section";
import {
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const HIGHLIGHT_COMPONENT_NAME = "Highlight";

/** Returns whether one authored node marks a phrase the learner can see. */
function marksPhrase(node: MdxNode): boolean {
  let marked = false;
  visitMdxNodes(node, (current) => {
    if (current.type === "strong") {
      marked = true;
      return;
    }
    if (
      (current.type === "mdxJsxFlowElement" ||
        current.type === "mdxJsxTextElement") &&
      current.name === HIGHLIGHT_COMPONENT_NAME
    ) {
      marked = true;
    }
  });
  return marked;
}

/**
 * Finds authored lesson documents whose opening carries no marked phrase.
 *
 * A learner decides from the first screen whether the page is worth reading,
 * so the opening section marks at least one phrase. `**` counts because both
 * markers render the same marked phrase, and the floor of one `<Highlight>`
 * per document is owned separately.
 */
export function findOpeningHighlightIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const children = tree.children ?? [];
  if (!children.some((node) => node.type === "mdxjsEsm")) {
    return [];
  }
  const [opening] = splitHighlightSections(tree, 2);
  if (!(opening && !opening.nodes.some(marksPhrase))) {
    return [];
  }
  const line = opening.opener.position?.start?.line ?? 1;
  return [
    {
      column: opening.opener.position?.start?.column ?? 1,
      excerpt: (source.split("\n")[line - 1] ?? "").trim(),
      line,
      rule: "lesson-opening-highlight",
    },
  ];
}
