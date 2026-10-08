import { MutableList } from "effect";
import type { Node, SourceFile } from "typescript/unstable/ast";

/**
 * Lists a module's syntax nodes breadth first, starting with the module
 * itself. Callers keep this order, so their findings keep the order the
 * traversal produced before the walk moved to Effect's mutable list.
 */
export function syntaxNodes(sourceFile: SourceFile): readonly Node[] {
  const pending = MutableList.make<Node>();
  const visited = MutableList.make<Node>();
  MutableList.append(pending, sourceFile);
  for (
    let node = MutableList.take(pending);
    node !== MutableList.Empty;
    node = MutableList.take(pending)
  ) {
    MutableList.append(visited, node);
    node.forEachChild((child) => {
      MutableList.append(pending, child);
    });
  }
  return MutableList.takeAll(visited);
}
