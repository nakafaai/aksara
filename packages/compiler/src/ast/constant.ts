import { Predicate } from "effect";
import type { Node } from "estree-jsx";

type Operation = (...values: number[]) => number;

/** Numeric `Math` constants that an authored expression may read by name. */
const MATH_CONSTANTS: ReadonlyMap<string, number> = new Map([
  ["E", Math.E],
  ["LN10", Math.LN10],
  ["LN2", Math.LN2],
  ["LOG10E", Math.LOG10E],
  ["LOG2E", Math.LOG2E],
  ["PI", Math.PI],
  ["SQRT1_2", Math.SQRT1_2],
  ["SQRT2", Math.SQRT2],
]);

/**
 * Deterministic `Math` functions that an authored expression may call, the
 * same set the authoring checkers accept in a graph point. `random` is absent
 * because it returns a different number on every call, and a constant must be
 * the same number on every run.
 */
const MATH_FUNCTIONS: ReadonlyMap<string, Operation> = new Map<
  string,
  Operation
>([
  ["abs", Math.abs],
  ["acos", Math.acos],
  ["acosh", Math.acosh],
  ["asin", Math.asin],
  ["asinh", Math.asinh],
  ["atan", Math.atan],
  ["atan2", Math.atan2],
  ["atanh", Math.atanh],
  ["cbrt", Math.cbrt],
  ["ceil", Math.ceil],
  ["cos", Math.cos],
  ["cosh", Math.cosh],
  ["exp", Math.exp],
  ["floor", Math.floor],
  ["fround", Math.fround],
  ["hypot", Math.hypot],
  ["log", Math.log],
  ["log10", Math.log10],
  ["log1p", Math.log1p],
  ["log2", Math.log2],
  ["max", Math.max],
  ["min", Math.min],
  ["pow", Math.pow],
  ["round", Math.round],
  ["sign", Math.sign],
  ["sin", Math.sin],
  ["sinh", Math.sinh],
  ["sqrt", Math.sqrt],
  ["tan", Math.tan],
  ["tanh", Math.tanh],
  ["trunc", Math.trunc],
]);

/** Unary operators that keep a number a number, with JavaScript semantics. */
const UNARY_OPERATORS: ReadonlyMap<string, Operation> = new Map<
  string,
  Operation
>([
  ["+", (value) => +value],
  ["-", (value) => -value],
]);

/** Binary arithmetic operators, with the exact semantics JavaScript gives. */
const BINARY_OPERATORS: ReadonlyMap<string, Operation> = new Map<
  string,
  Operation
>([
  ["%", (left, right) => left % right],
  ["*", (left, right) => left * right],
  ["**", (left, right) => left ** right],
  ["+", (left, right) => left + right],
  ["-", (left, right) => left - right],
  ["/", (left, right) => left / right],
]);

/** Looks up one plain `Math.name` access in a table, or nothing for any other node. */
function mathMember<Value>(
  node: Node,
  table: ReadonlyMap<string, Value>
): Value | undefined {
  return node.type === "MemberExpression" &&
    !node.computed &&
    node.object.type === "Identifier" &&
    node.object.name === "Math" &&
    node.property.type === "Identifier"
    ? table.get(node.property.name)
    : undefined;
}

/** Applies one operation when it exists and every operand is itself constant. */
function operate(
  operation: Operation | undefined,
  operands: readonly Node[]
): number | undefined {
  const values = operands.map(evaluate);
  return operation && values.every(Predicate.isNumber)
    ? operation(...values)
    : undefined;
}

/** Evaluates one node to a number, or to nothing when it is not constant. */
function evaluate(node: Node): number | undefined {
  switch (node.type) {
    case "Literal":
      return Predicate.isNumber(node.value) ? node.value : undefined;
    case "UnaryExpression":
      return operate(UNARY_OPERATORS.get(node.operator), [node.argument]);
    case "BinaryExpression":
      return operate(BINARY_OPERATORS.get(node.operator), [
        node.left,
        node.right,
      ]);
    case "MemberExpression":
      return mathMember(node, MATH_CONSTANTS);
    case "CallExpression":
      return operate(mathMember(node.callee, MATH_FUNCTIONS), node.arguments);
    default:
      return undefined;
  }
}

/**
 * Folds one constant numeric expression into the finite number it denotes.
 *
 * The expression may hold only numeric literals, the arithmetic operators, and
 * the `Math` constants and functions above, so folding never runs authored
 * code and always matches what the renderer computes when it evaluates the
 * same source.
 */
export function foldNumber(node: Node): number | undefined {
  const value = evaluate(node);
  return Predicate.isNumber(value) && Number.isFinite(value)
    ? value
    : undefined;
}
