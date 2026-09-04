import type { EstreeNode } from "#nakafa-content/mdx/parse";

export type ArrayExpressionNode = EstreeNode & {
  elements: unknown[];
  type: "ArrayExpression";
};

export type BlockStatementNode = EstreeNode & {
  body: unknown[];
  type: "BlockStatement";
};

export type CallExpressionNode = EstreeNode & {
  arguments: unknown[];
  type: "CallExpression";
};

export type FunctionExpressionNode = EstreeNode & {
  params: unknown[];
  type: "ArrowFunctionExpression" | "FunctionExpression";
};

export type ObjectExpressionNode = EstreeNode & {
  properties: unknown[];
  type: "ObjectExpression";
};

export type VariableDeclarationNode = EstreeNode & {
  declarations: unknown[];
  type: "VariableDeclaration";
};

/** Narrows one parser-owned array expression. */
export function isArrayExpressionNode(
  node: EstreeNode | undefined
): node is ArrayExpressionNode {
  return node?.type === "ArrayExpression";
}

/** Narrows one parser-owned block statement. */
export function isBlockStatementNode(
  node: EstreeNode | undefined
): node is BlockStatementNode {
  return node?.type === "BlockStatement";
}

/** Narrows one parser-owned call expression. */
export function isCallExpressionNode(
  node: EstreeNode | undefined
): node is CallExpressionNode {
  return node?.type === "CallExpression";
}

/** Narrows one parser-owned function expression. */
export function isFunctionExpressionNode(
  node: EstreeNode | undefined
): node is FunctionExpressionNode {
  return (
    node?.type === "ArrowFunctionExpression" ||
    node?.type === "FunctionExpression"
  );
}

/** Narrows one parser-owned object expression. */
export function isObjectExpressionNode(
  node: EstreeNode | undefined
): node is ObjectExpressionNode {
  return node?.type === "ObjectExpression";
}

/** Narrows one parser-owned variable declaration. */
export function isVariableDeclarationNode(
  node: EstreeNode | undefined
): node is VariableDeclarationNode {
  return node?.type === "VariableDeclaration";
}
