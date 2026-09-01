import { type MdxNode, visitMdxNodes } from "#nakafa-content/voice-mdx";

/** Resolves reference-style Markdown links through their definitions. */
export function linkDefinitions(tree: MdxNode): ReadonlyMap<string, string> {
  const definitions = new Map<string, string>();
  visitMdxNodes(tree, (node) => {
    if (
      node.type === "definition" &&
      typeof node.identifier === "string" &&
      typeof node.url === "string"
    ) {
      definitions.set(node.identifier.toLowerCase(), node.url);
    }
  });
  return definitions;
}

/** Returns the destination for an inline or reference-style Markdown link. */
export function linkUrl(
  node: MdxNode,
  definitions: ReadonlyMap<string, string>
): string | undefined {
  if (node.type === "link" && typeof node.url === "string") {
    return node.url;
  }
  if (node.type === "linkReference" && typeof node.identifier === "string") {
    return definitions.get(node.identifier.toLowerCase());
  }
}
