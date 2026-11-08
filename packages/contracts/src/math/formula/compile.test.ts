import { assert, describe, it } from "@effect/vitest";
import { Result } from "effect";

import { compileFormula } from "#contracts/math/formula/compile";
import { readFormula } from "#contracts/math/formula/parse";

/** Compiles one formula that must parse. */
function compiled(text: string) {
  const node = readFormula(text);
  assert.isTrue(Result.isSuccess(node), text);
  return Result.isSuccess(node) ? compileFormula(node.success) : () => 0;
}

describe("compileFormula", () => {
  it("keeps real odd roots of a negative base", () => {
    assert.closeTo(compiled("x^(1/3)")({ x: -8 }), -2, 1e-12);
    assert.closeTo(compiled("x^(2/3)")({ x: -8 }), 4, 1e-12);
    assert.closeTo(compiled("x^(3/5)")({ x: -32 }), -8, 1e-9);
    assert.strictEqual(compiled("x^(1/3)")({ x: 8 }), 2);
  });

  it("is undefined where the real function is undefined", () => {
    assert.isNaN(compiled("x^0.5")({ x: -4 }));
    assert.isNaN(compiled("sqrt(x)")({ x: -1 }));
    assert.isNaN(compiled("ln(x)")({ x: -1 }));
    assert.isNaN(compiled("a + 1")({}));
    assert.strictEqual(compiled("1 / x")({ x: 0 }), Number.POSITIVE_INFINITY);
  });

  it("computes every function in radians", () => {
    const x = 0.6;
    const cases = [
      ["abs(-x)", x],
      ["acos(x)", Math.acos(x)],
      ["asin(x)", Math.asin(x)],
      ["atan(x)", Math.atan(x)],
      ["cbrt(x)", Math.cbrt(x)],
      ["ceil(x)", 1],
      ["floor(x)", 0],
      ["cot(x)", 1 / Math.tan(x)],
      ["csc(x)", 1 / Math.sin(x)],
      ["sec(x)", 1 / Math.cos(x)],
      ["exp(x)", Math.exp(x)],
      ["ln(x)", Math.log(x)],
      ["log(100)", 2],
      ["sign(-x)", -1],
      ["tan(x)", Math.tan(x)],
      ["tanh(x)", Math.tanh(x)],
    ] as const;
    for (const [text, expected] of cases) {
      assert.closeTo(compiled(text)({ x }), expected, 1e-12, text);
    }
  });

  it("folds min and max over every argument", () => {
    assert.strictEqual(compiled("max(1, x, 3)")({ x: 7 }), 7);
    assert.strictEqual(compiled("min(4, x, 2, 9)")({ x: 3 }), 2);
  });
});
