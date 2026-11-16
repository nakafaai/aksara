import { Predicate } from "effect";
import { issueAtOffset } from "#nakafa-content/math/finding";
import {
  type MdxAttribute,
  type MdxNode,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import { expectShape } from "#nakafa-content/mdx/shape";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

/** The visual text props that hold rich text: math renders only in JSX. */
const VISUAL_TEXT_PROPS = new Set([
  "description",
  "facts",
  "labels",
  "legend",
  "legends",
  "title",
]);

type JsxMdxNode = MdxNode & {
  attributes: MdxAttribute[];
};

/** Narrows one MDX node to a JSX element, whose attributes are always listed. */
function isJsxElement(node: MdxNode): node is JsxMdxNode {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}

/**
 * Finds each visual text prop written as a string, such as `title="Area"`.
 * Such text renders as plain characters, so math inside it never typesets;
 * the prop is written as JSX instead (D39).
 */
export function findStringVisualText(
  source: string,
  tree: MdxNode
): LessonVoiceIssue[] {
  const issues: LessonVoiceIssue[] = [];
  visitMdxNodes(tree, (node) => {
    if (!isJsxElement(node)) {
      return;
    }
    for (const attribute of node.attributes) {
      if (
        Predicate.isString(attribute.value) &&
        VISUAL_TEXT_PROPS.has(String(attribute.name))
      ) {
        const offset = attribute.position?.start?.offset;
        expectShape(offset !== undefined);
        issues.push(issueAtOffset(source, offset, "string-visual-text"));
      }
    }
  });
  return issues;
}
