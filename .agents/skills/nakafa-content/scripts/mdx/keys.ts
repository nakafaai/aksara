/**
 * ESTree child fields by traversal purpose.
 *
 * Learner-copy traversal follows spreads and comma tails because address
 * fields hide inside them; the semicolon scan follows only statically
 * rendered fields. The two views intentionally diverge, so each purpose keeps
 * its own explicit map and a test pins their documented relation instead of
 * deriving one from the other.
 */

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
