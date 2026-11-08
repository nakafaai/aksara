import { Predicate } from "effect";
import {
  isArrayExpressionNode,
  isObjectExpressionNode,
  type ObjectExpressionNode,
} from "#nakafa-content/line/ast";
import {
  asEstreeNode,
  type EstreeNode,
  estreeChildren,
  estreeRange,
  staticFieldName,
} from "#nakafa-content/mdx/parse";

/** One number written directly in the source, with where it starts. */
export interface NumericLiteral {
  readonly offset: number;
  readonly raw: string;
}

/** Reads a numeric literal with its optional sign, never a computed value. */
export function numericLiteral(
  node: EstreeNode | undefined
): NumericLiteral | undefined {
  if (node?.type === "Literal" && Predicate.isNumber(node.value)) {
    return { offset: estreeRange(node).start.offset, raw: String(node.raw) };
  }
  if (
    node?.type === "UnaryExpression" &&
    (node.operator === "-" || node.operator === "+")
  ) {
    const argument = numericLiteral(asEstreeNode(node.argument));
    return (
      argument && {
        offset: estreeRange(node).start.offset,
        raw: argument.raw,
      }
    );
  }
  return undefined;
}

/** Reads the value of one statically named property of an object literal. */
function propertyValue(
  object: ObjectExpressionNode,
  name: string
): EstreeNode | undefined {
  for (const property of estreeChildren(object.properties)) {
    if (
      property.type === "Property" &&
      property.computed !== true &&
      staticFieldName(asEstreeNode(property.key)) === name
    ) {
      return asEstreeNode(property.value);
    }
  }
  return undefined;
}

/** Identifies an object literal whose x and y are both numeric literals. */
function isLiteralPointObject(node: EstreeNode): boolean {
  return (
    isObjectExpressionNode(node) &&
    ["x", "y"].every(
      (name) => numericLiteral(propertyValue(node, name)) !== undefined
    )
  );
}

/** Reads the literals of a tuple of two or three numbers, or nothing else. */
export function tupleLiterals(node: EstreeNode): NumericLiteral[] | undefined {
  if (
    !(
      isArrayExpressionNode(node) &&
      (node.elements.length === 2 || node.elements.length === 3)
    )
  ) {
    return undefined;
  }
  const literals = node.elements.map((element) =>
    numericLiteral(asEstreeNode(element))
  );
  return literals.every(Predicate.isNotUndefined) ? literals : undefined;
}

/** Identifies a point typed as an object or as a tuple of numbers. */
export function isLiteralPoint(node: EstreeNode): boolean {
  return isLiteralPointObject(node) || tupleLiterals(node) !== undefined;
}
