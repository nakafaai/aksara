import assert from "node:assert/strict";
import { Predicate } from "effect";
import {
  attributeEstree,
  type EstreeNode,
  estreeChildren,
  jsxComponentName,
  type MdxNode,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";

/** One ESTree node of an authored expression, with the component that owns it. */
interface ExpressionNode {
  readonly component: string | undefined;
  readonly node: EstreeNode;
}

/** The two things the points gate reads from one parsed lesson or article. */
export interface DocumentParts {
  /** Every JSX element name, whether written in the page or inside an expression. */
  readonly elements: readonly string[];
  /** Every node of every authored expression, in document order. */
  readonly nodes: readonly ExpressionNode[];
}

/**
 * Collects one expression and everything nested in it. A JSX element written
 * inside an expression owns its own attributes, so its name replaces the name
 * of the element around it for everything beneath it.
 */
function collectExpression(
  node: EstreeNode,
  component: string | undefined,
  parts: { elements: string[]; nodes: ExpressionNode[] }
): void {
  const owner = node.type === "JSXElement" ? jsxComponentName(node) : component;
  if (node.type === "JSXElement" && owner !== undefined) {
    parts.elements.push(owner);
  }
  parts.nodes.push({ component: owner, node });
  for (const value of Object.values(node)) {
    for (const child of estreeChildren(value)) {
      collectExpression(child, owner, parts);
    }
  }
}

/**
 * Reads the JSX element names and the authored expressions of one document.
 * Only the MDX parser's own tree is read, never raw text, so a name or a
 * number inside a string or a comment can never count.
 */
export function inspectDocument(tree: MdxNode): DocumentParts {
  const parts: { elements: string[]; nodes: ExpressionNode[] } = {
    elements: [],
    nodes: [],
  };
  visitMdxNodes(tree, (node) => {
    if (
      node.type === "mdxFlowExpression" ||
      node.type === "mdxTextExpression"
    ) {
      for (const program of estreeChildren(node.data?.estree)) {
        collectExpression(program, undefined, parts);
      }
      return;
    }
    if (
      node.type !== "mdxJsxFlowElement" &&
      node.type !== "mdxJsxTextElement"
    ) {
      return;
    }
    assert.ok(node.attributes);
    // A fragment has no name: the parser gives it `null`, not a string.
    const name = Predicate.isString(node.name) ? node.name : undefined;
    if (name !== undefined) {
      parts.elements.push(name);
    }
    for (const attribute of node.attributes) {
      const program = attributeEstree(attribute);
      if (program) {
        collectExpression(program, name, parts);
      }
    }
  });
  return parts;
}
