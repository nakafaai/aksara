import { Predicate } from "effect";
import { type MdxNode, visitMdxNodes } from "#nakafa-content/mdx/parse";

/** Resolves reference-style Markdown links through their definitions. */
export function linkDefinitions(tree: MdxNode): ReadonlyMap<string, string> {
  const definitions = new Map<string, string>();
  visitMdxNodes(tree, (node) => {
    if (
      node.type === "definition" &&
      Predicate.isString(node.identifier) &&
      Predicate.isString(node.url)
    ) {
      const identifier = node.identifier.toLowerCase();
      if (!definitions.has(identifier)) {
        definitions.set(identifier, node.url);
      }
    }
  });
  return definitions;
}

/** Returns the destination for an inline or reference-style Markdown resource. */
export function linkUrl(
  node: MdxNode,
  definitions: ReadonlyMap<string, string>
): string | undefined {
  if (
    (node.type === "image" || node.type === "link") &&
    Predicate.isString(node.url)
  ) {
    return node.url;
  }
  if (
    (node.type === "imageReference" || node.type === "linkReference") &&
    Predicate.isString(node.identifier)
  ) {
    return definitions.get(node.identifier.toLowerCase());
  }
}
