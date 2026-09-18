/**
 * ESTree child fields by traversal purpose.
 *
 * Learner-copy traversal follows spreads and comma tails because address
 * fields hide inside them; the semicolon scan follows only statically
 * rendered fields; JSX discovery follows every shape that can nest an
 * element, including call arguments and full comma tails. The views
 * intentionally diverge, so each purpose keeps its own explicit map instead
 * of deriving one from another.
 */

import { type EstreeNode, estreeChildren } from "#nakafa-content/mdx/parse";

/** Child fields traversed when collecting rendered learner copy. */
export const RENDERED_COPY_KEYS: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  JSXSpreadAttribute: ["argument"],
  LogicalExpression: ["left", "right"],
  ObjectExpression: ["properties"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  SpreadElement: ["argument"],
  TemplateLiteral: ["quasis", "expressions"],
};

/** Child fields traversed when scanning rendered semicolons. */
export const SEMICOLON_SCAN_KEYS: Readonly<Record<string, readonly string[]>> =
  {
    ArrayExpression: ["elements"],
    BinaryExpression: ["left", "right"],
    ConditionalExpression: ["consequent", "alternate"],
    ExpressionStatement: ["expression"],
    JSXExpressionContainer: ["expression"],
    JSXFragment: ["children"],
    LogicalExpression: ["left", "right"],
    ObjectExpression: ["properties"],
    ParenthesizedExpression: ["expression"],
    Program: ["body"],
    TemplateLiteral: ["quasis", "expressions"],
  };

/** Child fields traversed when discovering nested JSX in expression values. */
export const NESTED_DISCOVERY_KEYS: Readonly<
  Record<string, readonly string[]>
> = {
  ArrayExpression: ["elements"],
  ArrowFunctionExpression: ["body"],
  BinaryExpression: ["left", "right"],
  CallExpression: ["arguments"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  LogicalExpression: ["left", "right"],
  ObjectExpression: ["properties"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  Property: ["value"],
  SequenceExpression: ["expressions"],
  SpreadElement: ["argument"],
  TemplateLiteral: ["expressions", "quasis"],
};

/** Child fields traversed when scanning math labels in attribute values. */
export const MATH_LABEL_KEYS: Readonly<Record<string, readonly string[]>> = {
  ArrayExpression: ["elements"],
  BinaryExpression: ["left", "right"],
  ConditionalExpression: ["consequent", "alternate"],
  ExpressionStatement: ["expression"],
  JSXExpressionContainer: ["expression"],
  JSXFragment: ["children"],
  LogicalExpression: ["left", "right"],
  ParenthesizedExpression: ["expression"],
  Program: ["body"],
  TemplateLiteral: ["quasis", "expressions"],
};

/** Visits every child stored under one node's purpose-selected fields. */
export function walkKeyedChildren(
  node: EstreeNode,
  keys: Readonly<Record<string, readonly string[]>>,
  visit: (child: EstreeNode) => void
): void {
  for (const key of keys[node.type] ?? []) {
    for (const child of estreeChildren(node[key])) {
      visit(child);
    }
  }
}
