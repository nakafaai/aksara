import { MutableList } from "effect";
import {
  isTypeNode,
  type Node,
  type SourceFile,
} from "typescript/unstable/ast";

/** Lists a module's syntax nodes breadth first, starting with the module itself. */
export function syntaxNodes(sourceFile: SourceFile): readonly Node[] {
  return walkSyntax(sourceFile, () => true);
}

/**
 * Lists a module's syntax nodes breadth first, as `syntaxNodes` does, except
 * that the children of a type node are left out.
 */
export function syntaxNodesSkippingTypes(
  sourceFile: SourceFile
): readonly Node[] {
  return walkSyntax(sourceFile, (node) => !isTypeNode(node));
}

/** Lists nodes breadth first, expanding a node's children only when `expand` accepts it. */
function walkSyntax(
  sourceFile: SourceFile,
  expand: (node: Node) => boolean
): readonly Node[] {
  const pending = MutableList.make<Node>();
  const visited = MutableList.make<Node>();
  MutableList.append(pending, sourceFile);
  for (
    let node = MutableList.take(pending);
    node !== MutableList.Empty;
    node = MutableList.take(pending)
  ) {
    MutableList.append(visited, node);
    if (expand(node)) {
      node.forEachChild((child) => {
        MutableList.append(pending, child);
      });
    }
  }
  return MutableList.takeAll(visited);
}
