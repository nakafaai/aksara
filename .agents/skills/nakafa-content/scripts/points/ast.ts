import type { EstreeNode } from "#nakafa-content/mdx/parse";

export type ArrayExpressionNode = EstreeNode & {
  elements: unknown[];
  type: "ArrayExpression";
};

export type CallExpressionNode = EstreeNode & {
  arguments: unknown[];
  type: "CallExpression";
};

export type ObjectExpressionNode = EstreeNode & {
  properties: unknown[];
  type: "ObjectExpression";
};

/** Narrows one parser-owned array expression. */
export function isArrayExpressionNode(
  node: EstreeNode
): node is ArrayExpressionNode {
  return node.type === "ArrayExpression";
}

/** Narrows one parser-owned call expression. */
export function isCallExpressionNode(
  node: EstreeNode
): node is CallExpressionNode {
  return node.type === "CallExpression";
}

/** Narrows one parser-owned object expression. */
export function isObjectExpressionNode(
  node: EstreeNode
): node is ObjectExpressionNode {
  return node.type === "ObjectExpression";
}
