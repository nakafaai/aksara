import {
  isArrayExpressionNode,
  isCallExpressionNode,
} from "#nakafa-content/line/ast";
import {
  asEstreeNode,
  type EstreeNode,
  estreeChildren,
  estreeRange,
  staticFieldName,
} from "#nakafa-content/mdx/parse";
import { findingAt, type PointsFinding } from "#nakafa-content/points/finding";
import { isLiteralPoint } from "#nakafa-content/points/point";

/**
 * Most literal points one series may hold. A named exact point, such as a
 * vertex, an intercept, or a polygon corner, may be typed into the source, and
 * eight corners cover every polygon the corpus names exactly. A sampled curve
 * never fits that budget, so a longer list is a series that a script printed.
 * Spreading arrays into one array or joining them with `concat` does not reset
 * the count, because the points still make one series.
 */
const MAX_LITERAL_POINTS = 8;

/**
 * The one component whose scene the compiler reads without running code. It
 * folds constant expressions such as Math.sqrt(3) but rejects Array.from, so a
 * sampled curve cannot be built there and belongs to LineEquation.
 */
const SCENE_COMPONENT = "MathVisual";

/** Reads what a `.concat` call joins, its receiver and its arguments, else nothing. */
function concatPieces(node: EstreeNode): unknown[] {
  if (!isCallExpressionNode(node)) {
    return [];
  }
  const callee = asEstreeNode(node.callee);
  return callee?.type === "MemberExpression" &&
    callee.computed !== true &&
    staticFieldName(asEstreeNode(callee.property)) === "concat"
    ? [callee.object, ...node.arguments]
    : [];
}

/** Identifies a call such as `[].concat(points)` that joins arrays into one. */
export function isConcatCall(node: EstreeNode): boolean {
  return concatPieces(node).length > 0;
}

/** Counts the literal points of the arrays that a series spreads or joins in. */
function countPieces(values: unknown, nested: Set<EstreeNode>): number {
  return estreeChildren(values).reduce((total, piece) => {
    if (!(isArrayExpressionNode(piece) || isConcatCall(piece))) {
      return total;
    }
    nested.add(piece);
    return total + countPoints(piece, nested);
  }, 0);
}

/** Counts the literal points of one array literal or one concat call. */
function countPoints(node: EstreeNode, nested: Set<EstreeNode>): number {
  if (!isArrayExpressionNode(node)) {
    return countPieces(concatPieces(node), nested);
  }
  return estreeChildren(node.elements).reduce(
    (total, element) =>
      total +
      (element.type === "SpreadElement"
        ? countPieces(element.argument, nested)
        : Number(isLiteralPoint(element))),
    0
  );
}

/**
 * Reports one series that holds more literal points than a lesson may type.
 * The pieces that make up a reported series are marked covered, so one pasted
 * list is reported once, where it begins.
 */
export function seriesFindings(
  source: string,
  node: EstreeNode,
  component: string | undefined,
  covered: Set<EstreeNode>
): PointsFinding[] {
  if (covered.has(node)) {
    return [];
  }
  const nested = new Set<EstreeNode>();
  const count = countPoints(node, nested);
  if (count <= MAX_LITERAL_POINTS) {
    return [];
  }
  for (const piece of nested) {
    covered.add(piece);
  }
  const advice =
    component === SCENE_COMPONENT
      ? `${component} folds only constant expressions, so draw a sampled curve with LineEquation and Array.from, and keep only named exact points here`
      : "build the series with Array.from from its formula, and keep only named exact points as literals";
  return [
    findingAt(
      source,
      estreeRange(node).start.offset,
      "literal-points",
      `${count} literal points in one series: ${advice}`
    ),
  ];
}
