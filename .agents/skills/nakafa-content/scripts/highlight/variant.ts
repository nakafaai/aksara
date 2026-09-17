import { Predicate } from "effect";
import {
  asEstreeNode,
  attributeEstree,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import type { LessonVoiceIssue } from "#nakafa-content/voice/types";

const HIGHLIGHT_COMPONENT_NAME = "Highlight";
const SUPPORTED_VARIANTS = new Set(["success", "warning"]);

/** Reads one authored attribute that must be a static string literal. */
function staticStringValue(attribute: MdxAttribute): string | undefined {
  if (Predicate.isString(attribute.value)) {
    return attribute.value;
  }
  const program = attributeEstree(attribute);
  const statements = Array.isArray(program?.body) ? program.body : [];
  const [statement] = statements;
  const expression = asEstreeNode(asEstreeNode(statement)?.expression);
  return expression?.type === "Literal" && Predicate.isString(expression.value)
    ? expression.value
    : undefined;
}

/** Returns whether one node is the authored highlight component. */
function isHighlight(node: MdxNode): boolean {
  return (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    node.name === HIGHLIGHT_COMPONENT_NAME
  );
}

/**
 * Finds authored highlights whose surface tone is unsupported.
 *
 * The renderer owns one variant map, so an unknown tone would drop the surface
 * and leave the phrase unmarked for the learner. A tone written as a dynamic
 * expression fails the same way, because nothing can verify it at review time.
 */
export function findHighlightVariantIssues(
  source: string,
  tree: MdxNode = parseLessonMdx(source)
): LessonVoiceIssue[] {
  const lines = source.split("\n");
  const issues: LessonVoiceIssue[] = [];
  visitMdxNodes(tree, (node) => {
    if (!isHighlight(node)) {
      return;
    }
    for (const attribute of node.attributes ?? []) {
      if (attribute.name !== "variant") {
        continue;
      }
      const value = staticStringValue(attribute);
      if (value !== undefined && SUPPORTED_VARIANTS.has(value)) {
        continue;
      }
      const line =
        attribute.position?.start?.line ?? node.position?.start?.line ?? 1;
      issues.push({
        column: attribute.position?.start?.column ?? 1,
        excerpt: (lines[line - 1] ?? "").trim(),
        line,
        rule: "highlight-variant",
      });
    }
  });
  return issues;
}
