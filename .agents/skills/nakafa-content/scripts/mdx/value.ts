import { asEstreeNode, type EstreeNode } from "#nakafa-content/mdx/parse";
import { expectShape } from "#nakafa-content/mdx/shape";
import { isFullyStaticStringExpression } from "#nakafa-content/mdx/static";

/** Proves that every child in one static collection is recursively known. */
function everyStaticValueNode(values: unknown, allowNull = false): boolean {
  expectShape(Array.isArray(values));
  return values.every((value) => {
    if (value === null) {
      return allowNull;
    }
    const child = asEstreeNode(value);
    expectShape(child);
    return isFullyStaticValueExpression(child);
  });
}

/** Proves that one structured JSX spread cannot hide a dynamic destination. */
export function isFullyStaticValueExpression(node: EstreeNode): boolean {
  if (node.type === "Literal") {
    return true;
  }
  if (isFullyStaticStringExpression(node)) {
    return true;
  }
  if (node.type === "ArrayExpression") {
    return everyStaticValueNode(node.elements, true);
  }
  if (node.type === "ObjectExpression") {
    return everyStaticValueNode(node.properties);
  }
  if (node.type === "Property") {
    const value = asEstreeNode(node.value);
    expectShape(value);
    return (
      node.computed !== true &&
      node.kind === "init" &&
      node.method !== true &&
      isFullyStaticValueExpression(value)
    );
  }
  if (node.type === "SpreadElement") {
    const argument = asEstreeNode(node.argument);
    expectShape(argument);
    return isFullyStaticValueExpression(argument);
  }
  if (node.type === "Program") {
    expectShape(Array.isArray(node.body));
    expectShape(node.body.length > 0);
    return everyStaticValueNode(node.body);
  }
  if (
    node.type === "ExpressionStatement" ||
    node.type === "ParenthesizedExpression" ||
    node.type === "ChainExpression"
  ) {
    const expression = asEstreeNode(node.expression);
    expectShape(expression);
    return isFullyStaticValueExpression(expression);
  }
  if (node.type === "SequenceExpression") {
    expectShape(Array.isArray(node.expressions));
    const result = asEstreeNode(node.expressions.at(-1));
    expectShape(result);
    return isFullyStaticValueExpression(result);
  }
  if (node.type === "ConditionalExpression") {
    const consequent = asEstreeNode(node.consequent);
    const alternate = asEstreeNode(node.alternate);
    expectShape(consequent);
    expectShape(alternate);
    return (
      isFullyStaticValueExpression(consequent) &&
      isFullyStaticValueExpression(alternate)
    );
  }
  return false;
}
