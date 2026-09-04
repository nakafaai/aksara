import {
  asEstreeNode,
  type EstreeNode,
  type MdxNode,
  type SourceRange,
  staticFieldName,
  visitMdxNodes,
} from "#nakafa-content/mdx/parse";
import { staticExpressionRanges } from "#nakafa-content/mdx/surface";

const METADATA_ADDRESS_FIELDS = new Set(["description", "subject", "title"]);

/** Finds the exported metadata object in one ESM program. */
function metadataObject(estree: EstreeNode): EstreeNode | undefined {
  if (estree.type !== "Program" || !Array.isArray(estree.body)) {
    return;
  }
  for (const statement of estree.body) {
    const exportNode = asEstreeNode(statement);
    const declaration = asEstreeNode(exportNode?.declaration);
    if (
      exportNode?.type !== "ExportNamedDeclaration" ||
      declaration?.type !== "VariableDeclaration" ||
      !Array.isArray(declaration.declarations)
    ) {
      continue;
    }
    for (const declarationValue of declaration.declarations) {
      const declarator = asEstreeNode(declarationValue);
      if (
        declarator?.type === "VariableDeclarator" &&
        staticFieldName(asEstreeNode(declarator.id)) === "metadata"
      ) {
        return asEstreeNode(declarator.init);
      }
    }
  }
}

/** Returns static learner-facing title, description, and subject ranges. */
export function metadataAddressRanges(
  tree: MdxNode,
  source: string
): SourceRange[] {
  const ranges: SourceRange[] = [];
  visitMdxNodes(tree, (node) => {
    if (node.type !== "mdxjsEsm" || !node.data?.estree) {
      return;
    }
    const metadata = metadataObject(node.data.estree);
    if (
      metadata?.type !== "ObjectExpression" ||
      !Array.isArray(metadata.properties)
    ) {
      return;
    }
    for (const propertyValue of metadata.properties) {
      const property = asEstreeNode(propertyValue);
      const fieldName = staticFieldName(asEstreeNode(property?.key));
      const value = asEstreeNode(property?.value);
      if (!(fieldName && value && METADATA_ADDRESS_FIELDS.has(fieldName))) {
        continue;
      }
      ranges.push(...staticExpressionRanges(value, source));
    }
  });
  return ranges;
}
