import { assert, describe, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import { foldNumber } from "#compiler/ast/constant";
import { parseExpression } from "#compiler/test/expression";

/** Folds one source expression the way the compiler folds a scene value. */
function fold(source: string) {
  return foldNumber(parseExpression(source));
}

const MATH_CONSTANTS = [
  "E",
  "LN10",
  "LN2",
  "LOG10E",
  "LOG2E",
  "PI",
  "SQRT1_2",
  "SQRT2",
] as const;

const MATH_FUNCTIONS = [
  "abs",
  "acos",
  "acosh",
  "asin",
  "asinh",
  "atan",
  "atan2",
  "atanh",
  "cbrt",
  "ceil",
  "cos",
  "cosh",
  "exp",
  "floor",
  "fround",
  "hypot",
  "log",
  "log10",
  "log1p",
  "log2",
  "max",
  "min",
  "pow",
  "round",
  "sign",
  "sin",
  "sinh",
  "sqrt",
  "tan",
  "tanh",
  "trunc",
] as const;

describe("constant numeric expressions", () => {
  it.each([
    ["1.5", 1.5],
    ["-2", -2],
    ["+2", 2],
    ["- -2", 2],
    ["3 - 5", -2],
    ["2 + 3 * 4", 14],
    ["(2 + 3) * 4", 20],
    ["1 / 3", 1 / 3],
    ["-1 / 3", -1 / 3],
    ["7 % 4", 3],
    ["2 ** -3", 0.125],
    ["0.5 + 0.25", 0.75],
    ["Math.SQRT1_2 * 2", Math.SQRT1_2 * 2],
    ["Math.sqrt(3)", Math.sqrt(3)],
    ["-Math.sqrt(3) / 2", -Math.sqrt(3) / 2],
    ["Math.hypot(3, 4)", 5],
    ["Math.max(1, 2, 3)", 3],
    ["Math.atan2(1, Math.sqrt(3))", Math.atan2(1, Math.sqrt(3))],
    ["0.63 * Math.cos(Math.PI / 8)", 0.63 * Math.cos(Math.PI / 8)],
    ["Math.atan(1 / 0)", Math.PI / 2],
  ])("folds %s to the number JavaScript computes", (source, expected) => {
    assert.isTrue(Object.is(fold(source), expected), source);
  });

  it.each(MATH_CONSTANTS)("reads the Math constant %s", (name) => {
    assert.isTrue(Object.is(fold(`Math.${name}`), Math[name]));
  });

  it.each(MATH_FUNCTIONS)("calls the Math function %s", (name) => {
    const method: (...values: number[]) => number = Math[name];
    const results = Arr.map([0.5, 1.5], (sample) => {
      const expected = method(sample, 2);
      const folded = fold(`Math.${name}(${sample}, 2)`);
      assert.isTrue(
        Object.is(folded, Number.isFinite(expected) ? expected : undefined),
        `${name}(${sample})`
      );
      return folded;
    });
    assert.isTrue(
      Arr.some(results, (result) => result !== undefined),
      name
    );
  });

  it.each([
    "x",
    "Infinity",
    "NaN",
    "undefined",
    "'1'",
    "'a' + 1",
    "true",
    "null",
    "1n",
    "/1/",
    "`1`",
    "typeof 1",
    "!1",
    "~1",
    "void 0",
    "1 << 2",
    "1 | 2",
    "1 < 2",
    "1 && 2",
    "1 ? 2 : 3",
    "(x = 1)",
    "(1, 2)",
    "() => 1",
    "[1]",
    "({})",
    "x + 1",
    "1 + x",
    "-x",
    "foo(1)",
    "Math.foo",
    "Math.foo(1)",
    "Math.sqrt",
    "Math.PI()",
    "Math.random()",
    "Math.imul(2, 3)",
    "Math.clz32(2)",
    "Math.constructor",
    "Math.toString()",
    "Other.PI",
    "Math.PI.valueOf()",
    "Math['PI']",
    "Math[PI]",
    "Math?.PI",
    "Math?.sqrt(4)",
    "Math.sqrt?.(4)",
    "Math.max(...[1, 2])",
    "new Math.sqrt(4)",
    "Math.sqrt(x)",
    "Math.sqrt.call(null, 4)",
  ])("does not fold the non-constant expression %s", (source) => {
    assert.isUndefined(fold(source));
  });

  it.each([
    "1 / 0",
    "-1 / 0",
    "0 / 0",
    "5 % 0",
    "10 ** 400",
    "Math.sqrt(-1)",
    "Math.log(0)",
    "Math.max()",
    "Math.pow(10, 400)",
    "Math.atan(0 / 0)",
  ])("rejects %s because the result is not a finite number", (source) => {
    assert.isUndefined(fold(source));
  });
});
