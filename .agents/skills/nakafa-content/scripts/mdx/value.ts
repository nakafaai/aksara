import { asEstreeNode, type EstreeNode } from "#nakafa-content/mdx/parse";
import { isFullyStaticStringExpression } from "#nakafa-content/mdx/static";

/** Proves that every child in one static collection is recursively known. */
function everyStaticValueNode(values: unknown, allowNull = false): boolean {
  return (
    Array.isArray(values) &&
    values.every((value) => {
      if (value === null) {
        return allowNull;
      }
      const child = asEstreeNode(value);
      return child ? isFullyStaticValueExpression(child) : false;
    })
  );
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
    return (
      node.computed !== true &&
      node.kind === "init" &&
      node.method !== true &&
      Boolean(value && isFullyStaticValueExpression(value))
    );
  }
  if (node.type === "SpreadElement") {
    const argument = asEstreeNode(node.argument);
    return Boolean(argument && isFullyStaticValueExpression(argument));
  }
  if (node.type === "Program") {
    return Array.isArray(node.body) && node.body.length > 0
      ? everyStaticValueNode(node.body)
      : false;
  }
  if (
    node.type === "ExpressionStatement" ||
    node.type === "ParenthesizedExpression" ||
    node.type === "ChainExpression"
  ) {
    const expression = asEstreeNode(node.expression);
    return expression ? isFullyStaticValueExpression(expression) : false;
  }
  if (node.type === "ConditionalExpression") {
    const consequent = asEstreeNode(node.consequent);
    const alternate = asEstreeNode(node.alternate);
    return Boolean(
      consequent &&
        alternate &&
        isFullyStaticValueExpression(consequent) &&
        isFullyStaticValueExpression(alternate)
    );
  }
  return false;
}
