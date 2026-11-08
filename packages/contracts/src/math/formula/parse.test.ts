import { assert, describe, it } from "@effect/vitest";
import { Result, Schema } from "effect";

import { compileFormula } from "#contracts/math/formula/compile";
import { readFormula, readRelation } from "#contracts/math/formula/parse";
import {
  type FormulaError,
  FormulaNodeSchema,
  type FormulaProblem,
  FormulaRelationSchema,
} from "#contracts/math/formula/syntax";

/** Reads and evaluates one formula at one scope, failing the test if it does not parse. */
function value(text: string, scope: Readonly<Record<string, number>> = {}) {
  const node = readFormula(text);
  assert.isTrue(Result.isSuccess(node), text);
  return Result.isSuccess(node) ? compileFormula(node.success)(scope) : 0;
}

/** Returns the problem and position of a formula that must not parse. */
function problem(
  read: (text: string) => Result.Result<unknown, FormulaError>,
  text: string
) {
  const result = read(text);
  return Result.isFailure(result)
    ? [result.failure.problem, result.failure.position]
    : ["parsed", -1];
}

describe("readFormula", () => {
  it("reads precedence, signs, and right-associative powers", () => {
    assert.strictEqual(value("2x^2 - 3x + 1", { x: 2 }), 3);
    assert.strictEqual(value("-x^2", { x: 3 }), -9);
    assert.strictEqual(value("2^-1"), 0.5);
    assert.strictEqual(value("2^3^2"), 512);
    assert.strictEqual(value("+x - -x", { x: 2 }), 4);
    assert.strictEqual(value("8 / 2 / 2"), 2);
  });

  it("reads implicit products between numbers, names, groups, bars, and roots", () => {
    assert.strictEqual(value("2(x + 1)(x - 1)", { x: 3 }), 16);
    assert.strictEqual(value("xy", { x: 2, y: 5 }), 10);
    assert.strictEqual(value("2|x|", { x: -3 }), 6);
    assert.strictEqual(value("|x - 3| + 1", { x: 1 }), 3);
    assert.strictEqual(value("3√x", { x: 4 }), 6);
    assert.strictEqual(value("a(x - h)^2 + k", { a: 2, h: 1, k: -1, x: 3 }), 7);
  });

  it("reads functions, powers of functions, and logarithms in any base", () => {
    assert.closeTo(value("sin^2(x) + cos^2(x)", { x: 0.7 }), 1, 1e-12);
    assert.strictEqual(value("log_2(8)"), 3);
    assert.closeTo(value("log_(b)(81)", { b: 3 }), 4, 1e-12);
    assert.strictEqual(value("sinh(0) + cosh(0)"), 1);
    assert.strictEqual(value("max(1, 5, 3) - min(4, 2)"), 3);
    assert.closeTo(value("sin(x) cos(x)", { x: 0.5 }), Math.sin(1) / 2, 1e-12);
  });

  it("reads π, θ, superscripts, degrees, and typed operator symbols", () => {
    assert.strictEqual(value("π"), Math.PI);
    assert.strictEqual(value("2θ", { theta: 1.5 }), 3);
    assert.strictEqual(value("x² + x³", { x: 2 }), 12);
    assert.closeTo(value("sin(30°)"), 0.5, 1e-12);
    assert.strictEqual(value("2 × 3 − 6 ÷ 2 · 1"), 3);
    assert.strictEqual(value("e^0 + pi - π"), 1);
  });

  it.each<readonly [string, FormulaProblem, number]>([
    ["", "empty", 0],
    ["   ", "empty", 0],
    ["2 +", "value-expected", 3],
    ["(x + 1", "group-unclosed", 6],
    ["(x, 1)", "group-unclosed", 2],
    ["|x", "group-unclosed", 2],
    ["sin x", "function-arguments", 0],
    ["max(1)", "function-arguments", 0],
    ["sin(1, 2)", "function-arguments", 0],
    ["x $ 2", "symbol-unexpected", 2],
    ["x = 1", "comparison-unexpected", 2],
    ["= 1", "comparison-unexpected", 0],
    ["2)", "operator-expected", 1],
    ["2 * )", "value-expected", 4],
  ])("refuses %j as %s at %i", (text, expected, position) => {
    assert.deepStrictEqual(problem(readFormula, text), [expected, position]);
  });
});

describe("FormulaNodeSchema", () => {
  it("accepts every tree the reader builds", () => {
    const node = readFormula("-log_2(x) + |sin^2(x)| * max(1, x) / 3");
    const relation = readRelation("x^2 + y^2 <= 4");
    assert.isTrue(Result.isSuccess(node) && Result.isSuccess(relation));
    if (Result.isSuccess(node) && Result.isSuccess(relation)) {
      assert.deepStrictEqual(
        Schema.decodeSync(FormulaNodeSchema)(node.success),
        node.success
      );
      assert.deepStrictEqual(
        Schema.decodeSync(FormulaRelationSchema)(relation.success),
        relation.success
      );
    }
  });
});

describe("readRelation", () => {
  it("reads an equation and each inequality", () => {
    const circle = readRelation("x^2 + y^2 = 4");
    assert.isTrue(Result.isSuccess(circle));
    if (Result.isSuccess(circle)) {
      assert.strictEqual(circle.success.comparison, "=");
      assert.strictEqual(
        compileFormula(circle.success.left)({ x: 1, y: 1 }),
        2
      );
    }
    for (const [text, comparison] of [
      ["y < 2x + 1", "<"],
      ["y <= 2x", "<="],
      ["y ≤ 2x", "<="],
      ["y > 0", ">"],
      ["y >= 0", ">="],
      ["y ≥ 0", ">="],
    ] as const) {
      const relation = readRelation(text);
      assert.isTrue(
        Result.isSuccess(relation) &&
          relation.success.comparison === comparison,
        text
      );
    }
  });

  it.each<readonly [string, FormulaProblem, number]>([
    ["", "empty", 0],
    ["x + 1", "comparison-expected", 5],
    ["x + 1) = 2", "comparison-expected", 5],
    ["y < ", "value-expected", 4],
    ["0 < x < 1", "comparison-unexpected", 6],
    ["y < x $", "symbol-unexpected", 6],
  ])("refuses %j as %s at %i", (text, expected, position) => {
    assert.deepStrictEqual(problem(readRelation, text), [expected, position]);
  });
});
