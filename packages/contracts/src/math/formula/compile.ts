import { Array as Arr } from "effect";

import {
  FORMULA_CONSTANTS,
  type FormulaNode,
  type FormulaOperator,
  type FormulaUnary,
} from "#contracts/math/formula/syntax";

/** The value of every variable and parameter a formula reads, by name. */
export type FormulaScope = Readonly<Record<string, number>>;

/** A compiled formula: its value for one scope, or NaN where it is undefined. */
export type FormulaEvaluator = (scope: FormulaScope) => number;

/** Odd root indexes tried for a negative base, so `x^(1/3)` is real for x < 0. */
const ODD_ROOTS = [3, 5, 7, 9, 11] as const;
const ROOT_TOLERANCE = 1e-9;

/**
 * Raises a base to a power. A negative base with a fractional exponent whose
 * denominator is odd, such as 1/3 or 2/5, has a real value, so it keeps one.
 */
function power(base: number, exponent: number) {
  const direct = base ** exponent;
  if (!Number.isNaN(direct) || base >= 0) {
    return direct;
  }
  for (const root of ODD_ROOTS) {
    const numerator = exponent * root;
    const whole = Math.round(numerator);
    if (Math.abs(numerator - whole) < ROOT_TOLERANCE) {
      return (whole % 2 === 0 ? 1 : -1) * Math.abs(base) ** exponent;
    }
  }
  return Number.NaN;
}

/** How each operator combines its two values. */
const OPERATORS = {
  "-": (left, right) => left - right,
  "*": (left, right) => left * right,
  "/": (left, right) => left / right,
  "^": power,
  "+": (left, right) => left + right,
} satisfies Record<FormulaOperator, (left: number, right: number) => number>;

/** What each function of one argument computes, in radians. */
const UNARY = {
  abs: Math.abs,
  acos: Math.acos,
  asin: Math.asin,
  atan: Math.atan,
  cbrt: Math.cbrt,
  ceil: Math.ceil,
  cos: Math.cos,
  cosh: Math.cosh,
  cot: (value) => 1 / Math.tan(value),
  csc: (value) => 1 / Math.sin(value),
  exp: Math.exp,
  floor: Math.floor,
  ln: Math.log,
  log: Math.log10,
  sec: (value) => 1 / Math.cos(value),
  sign: Math.sign,
  sin: Math.sin,
  sinh: Math.sinh,
  sqrt: Math.sqrt,
  tan: Math.tan,
  tanh: Math.tanh,
} satisfies Record<FormulaUnary, (value: number) => number>;

/** Reads one name: a constant's value, or the scope's value for a variable. */
function compileName(name: string): FormulaEvaluator {
  if (name === "pi" || name === "e") {
    const value = FORMULA_CONSTANTS[name];
    return () => value;
  }
  return (scope) => scope[name] ?? Number.NaN;
}

/**
 * Compiles a parsed formula into a function of its variables. It never calls
 * `eval` or `Function`: each node becomes a closure over its children, so a
 * curve can be sampled thousands of times after one compile.
 */
export function compileFormula(node: FormulaNode): FormulaEvaluator {
  if (node.kind === "number") {
    const { value } = node;
    return () => value;
  }
  if (node.kind === "name") {
    return compileName(node.name);
  }
  if (node.kind === "negate") {
    const operand = compileFormula(node.operand);
    return (scope) => -operand(scope);
  }
  if (node.kind === "binary") {
    const left = compileFormula(node.left);
    const right = compileFormula(node.right);
    const combine = OPERATORS[node.operator];
    return (scope) => combine(left(scope), right(scope));
  }
  if (node.kind === "logarithm") {
    const base = compileFormula(node.base);
    const value = compileFormula(node.value);
    return (scope) => Math.log(value(scope)) / Math.log(base(scope));
  }
  const [first, ...rest] = Arr.map(node.args, compileFormula);
  const { callee } = node;
  if (callee === "max" || callee === "min") {
    const pick = callee === "max" ? Math.max : Math.min;
    return (scope) =>
      Arr.reduce(rest, first(scope), (value, each) => pick(value, each(scope)));
  }
  const apply = UNARY[callee];
  return (scope) => apply(first(scope));
}
