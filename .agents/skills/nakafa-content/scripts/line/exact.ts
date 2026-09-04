import { inspectGeneratedLine } from "#nakafa-content/line/generated";
import {
  areCollinear,
  distinctPointPair,
  type PointCoordinates,
  staticPoint,
} from "#nakafa-content/line/numeric";
import {
  asEstreeNode,
  type EstreeNode,
  staticFieldName,
} from "#nakafa-content/mdx/parse";

export interface ExactPointExpressionInspection {
  exactSegment: boolean;
  pointCount?: number;
}

/** Visits every ESTree child reachable from one node. */
function visitEstree(
  node: EstreeNode,
  visit: (current: EstreeNode) => void
): void {
  visit(node);
  for (const value of Object.values(node)) {
    for (const child of Array.isArray(value) ? value : [value]) {
      const childNode = asEstreeNode(child);
      if (childNode) {
        visitEstree(childNode, visit);
      }
    }
  }
}

/** Reads an ordinary point array without holes or spread elements. */
function pointArray(node: EstreeNode | undefined): EstreeNode[] | undefined {
  if (node?.type !== "ArrayExpression" || !Array.isArray(node.elements)) {
    return;
  }
  const elements = node.elements.map(asEstreeNode);
  if (
    elements.some(
      (element) =>
        !(
          element &&
          ["Identifier", "MemberExpression", "ObjectExpression"].includes(
            element.type
          )
        )
    )
  ) {
    return;
  }
  return elements.filter((element): element is EstreeNode => Boolean(element));
}

/** Reads a two-point array returned directly by an immediately invoked function. */
function twoPointIife(call: EstreeNode): EstreeNode[] | undefined {
  const callee = asEstreeNode(call.callee);
  const body = asEstreeNode(callee?.body);
  if (
    !(
      callee &&
      ["ArrowFunctionExpression", "FunctionExpression"].includes(callee.type)
    ) ||
    body?.type !== "BlockStatement" ||
    !Array.isArray(body.body)
  ) {
    return;
  }
  const returns = body.body
    .map(asEstreeNode)
    .filter((statement) => statement?.type === "ReturnStatement");
  if (returns.length !== 1) {
    return;
  }
  const points = pointArray(asEstreeNode(returns[0]?.argument));
  return points?.length === 2 ? points : undefined;
}

/** Collects unambiguous point-expression initializers by identifier. */
export function pointExpressionBindings(
  program: EstreeNode
): Map<string, EstreeNode | null> {
  const bindings = new Map<string, EstreeNode | null>();
  visitEstree(program, (node) => {
    if (node.type !== "VariableDeclarator") {
      return;
    }
    const name = staticFieldName(asEstreeNode(node.id));
    const initializer = asEstreeNode(node.init);
    if (!(name && initializer)) {
      return;
    }
    bindings.set(name, bindings.has(name) ? null : initializer);
  });
  return bindings;
}

/** Proves exact straightness without executing authored JavaScript. */
export function inspectExactPointExpression(
  node: EstreeNode | undefined,
  bindings: ReadonlyMap<string, EstreeNode | null>,
  seen: ReadonlySet<string> = new Set()
): ExactPointExpressionInspection {
  if (node?.type === "Identifier") {
    const name = staticFieldName(node);
    const initializer = name ? bindings.get(name) : undefined;
    if (!(name && initializer) || seen.has(name)) {
      return { exactSegment: false };
    }
    return inspectExactPointExpression(
      initializer,
      bindings,
      new Set([...seen, name])
    );
  }
  const points = pointArray(node);
  if (points) {
    const coordinates = points.map(staticPoint);
    return {
      exactSegment:
        (points.length === 2 && distinctPointPair(points)) ||
        (points.length >= 3 &&
          coordinates.every(
            (point): point is PointCoordinates => point !== undefined
          ) &&
          areCollinear(coordinates)),
      pointCount: points.length,
    };
  }
  if (node?.type !== "CallExpression") {
    return { exactSegment: false };
  }
  const generated = inspectGeneratedLine(node);
  if (generated) {
    return generated;
  }
  const returnedPoints = twoPointIife(node);
  return returnedPoints
    ? {
        exactSegment: distinctPointPair(returnedPoints),
        pointCount: returnedPoints.length,
      }
    : { exactSegment: false };
}
