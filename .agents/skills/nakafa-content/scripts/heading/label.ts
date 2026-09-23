import { Predicate } from "effect";
import {
  type EstreeNode,
  estreeChildren,
  type MdxNode,
} from "#nakafa-content/mdx/parse";

/** Reads visible JSX children without including attributes or expression identifiers. */
export function expressionText(node: EstreeNode): string {
  if (node.type === "JSXText" || node.type === "Literal") {
    return Predicate.isString(node.value) ? node.value : "";
  }
  return ["children", "expression", "body"]
    .flatMap((key) => estreeChildren(node[key]))
    .map(expressionText)
    .join("");
}

/** Reads a heading label from parsed Markdown and literal JSX content. */
export function headingText(node: MdxNode): string {
  if (node.type === "text") {
    return Predicate.isString(node.value) ? node.value : "";
  }
  if (node.data?.estree) {
    return expressionText(node.data.estree);
  }
  return (node.children ?? []).map(headingText).join("");
}
