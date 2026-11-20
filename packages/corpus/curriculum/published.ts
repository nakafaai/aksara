import { Array as Arr, HashSet } from "effect";
import type { ProjectedCurriculumNode } from "#corpus/curriculum/projection";

/**
 * Keeps the nodes a learner can open into a lesson: every material node and
 * every class, subject, or unit above one. A planned node with no lesson yet
 * stays in the source and is never published, so no learner opens an empty
 * class, subject, or unit (rule 11).
 */
export function publishedNodes(nodes: readonly ProjectedCurriculumNode[]) {
  const filled = HashSet.fromIterable(
    Arr.flatMap(nodes, (node) =>
      Arr.isReadonlyArrayNonEmpty(node.materialKeys)
        ? Arr.map(node.path, (step) => step.key)
        : []
    )
  );
  return Arr.filter(nodes, (node) => HashSet.has(filled, node.key));
}
