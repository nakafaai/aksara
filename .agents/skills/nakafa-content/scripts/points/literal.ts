import { isArrayExpressionNode } from "#nakafa-content/line/ast";
import type { EstreeNode } from "#nakafa-content/mdx/parse";
import {
  propertyFindings,
  tupleFindings,
} from "#nakafa-content/points/decimal";
import type { DocumentParts } from "#nakafa-content/points/document";
import type { PointsFinding } from "#nakafa-content/points/finding";
import { isConcatCall, seriesFindings } from "#nakafa-content/points/series";

/**
 * Components that chart observed data. An observation has no formula, so its
 * numbers are the lesson's data rather than plotted output, and the gate skips
 * every expression these components own.
 */
const OBSERVED_DATA_COMPONENTS: ReadonlySet<string> = new Set([
  "ScatterDiagram",
]);

/** Applies the rules that fit one node of an expression owned by a component. */
function nodeFindings(
  source: string,
  node: EstreeNode,
  component: string | undefined,
  covered: Set<EstreeNode>
): PointsFinding[] {
  if (node.type === "Property") {
    return propertyFindings(source, node);
  }
  if (isArrayExpressionNode(node)) {
    return [
      ...seriesFindings(source, node, component, covered),
      ...tupleFindings(source, node),
    ];
  }
  return isConcatCall(node)
    ? seriesFindings(source, node, component, covered)
    : [];
}

/** Finds literal point lists and long decimal coordinates in one document. */
export function findLiteralPoints(
  source: string,
  document: DocumentParts
): PointsFinding[] {
  const covered = new Set<EstreeNode>();
  return document.nodes.flatMap(({ component, node }) =>
    component !== undefined && OBSERVED_DATA_COMPONENTS.has(component)
      ? []
      : nodeFindings(source, node, component, covered)
  );
}
