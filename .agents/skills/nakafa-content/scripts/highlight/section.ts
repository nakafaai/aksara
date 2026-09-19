import { Predicate } from "effect";
import { isHighlightComponentName } from "#nakafa-content/mdx/fields";
import {
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  jsxComponentName,
  type MdxNode,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";
import { staticStringCandidates } from "#nakafa-content/mdx/static";

/** One heading-delimited part of a lesson document and the node that opens it. */
export interface HighlightSection {
  nodes: MdxNode[];
  opener: MdxNode;
}

/** Tells highlight rules whether a tree carries authored lesson metadata. */
export function isAuthoredLesson(tree: MdxNode | undefined): tree is MdxNode {
  return (tree?.children ?? []).some((node) => node.type === "mdxjsEsm");
}

/**
 * Splits authored MDX flow content into heading-delimited sections.
 *
 * A heading at or above `level` opens a section, and every later node belongs
 * to it until the next such heading. Content before the first heading forms
 * its own section, so an introduction is measured exactly like a titled
 * section.
 *
 * `level` is the deepest heading that still opens a section. The opening rule
 * passes `2` so the first top-level section includes its subsections.
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

/** Recognizes either rendered marker, including JSX inside component labels. */
export function hasMarkedPhrase(node: MdxNode): boolean {
  let marked = false;
  visitMdxNodes(node, (current) => {
    if (
      (current.type === "strong" ||
        ((current.type === "mdxJsxFlowElement" ||
          current.type === "mdxJsxTextElement") &&
          isHighlightComponentName(current.name))) &&
      hasPhraseText(current)
    ) {
      marked = true;
    }
    const expressions = (current.attributes ?? []).flatMap((attribute) => {
      if (Predicate.isString(attribute.value)) {
        return [];
      }
      const expression = attributeEstree(attribute);
      return expression ? [expression] : [];
    });
    if (
      (current.type === "mdxFlowExpression" ||
        current.type === "mdxTextExpression") &&
      current.data?.estree
    ) {
      expressions.push(current.data.estree);
    }
    for (const expression of expressions) {
      walkEstreeDeep(expression, (child) => {
        if (
          child.type === "JSXElement" &&
          isHighlightComponentName(jsxComponentName(child)) &&
          estreeChildren(child.children).some(hasExpressionText)
        ) {
          marked = true;
        }
      });
    }
  });
  return marked;
}

/** Reads actual child text, excluding element attributes and empty markers. */
function hasPhraseText(node: MdxNode): boolean {
  if (
    (node.type === "text" || node.type === "inlineCode") &&
    Predicate.isString(node.value) &&
    node.value.trim().length > 0
  ) {
    return true;
  }
  if (node.data?.estree && hasExpressionText(node.data.estree)) {
    return true;
  }
  return (node.children ?? []).some(hasPhraseText);
}

/** Reads static rendered JSX children without counting invisible attributes. */
function hasExpressionText(node: EstreeNode): boolean {
  if (node.type === "JSXText" || node.type === "Literal") {
    return (
      Predicate.isNumber(node.value) ||
      (Predicate.isString(node.value) && node.value.trim().length > 0)
    );
  }
  if (staticStringCandidates(node).some(({ text }) => text.trim().length > 0)) {
    return true;
  }
  return [node.children, node.expression, node.body].some((field) =>
    estreeChildren(field).some(hasExpressionText)
  );
}
