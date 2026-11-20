import { assert, describe, it } from "@effect/vitest";
import { Option, Result } from "effect";

import { affineConstant, readAffine } from "#contracts/math/formula/affine";
import { readFormula } from "#contracts/math/formula/parse";

/** Reads a formula's text as an affine expression in x and y. */
function read(text: string) {
  return Result.match(readFormula(text), {
    onFailure: () => Option.none(),
    onSuccess: (node) => readAffine(node, ["x", "y"]),
  });
}

describe("readAffine", () => {
  it("reads sums, differences and constant multiples of the variables", () => {
    assert.deepStrictEqual(
      read("2x + 5y - 10"),
      Option.some({ constant: -10, terms: { x: 2, y: 5 } })
    );
    assert.deepStrictEqual(
      read("-(x - 3y) / 2"),
      Option.some({ constant: -0, terms: { x: -0.5, y: 1.5 } })
    );
    assert.deepStrictEqual(
      read("y * 4 + x^1"),
      Option.some({ constant: 0, terms: { x: 1, y: 4 } })
    );
  });

  it("folds every part that reads no variable to its value", () => {
    assert.deepStrictEqual(
      read("sqrt(4) * x + pi"),
      Option.some({ constant: Math.PI, terms: { x: 2 } })
    );
    assert.deepStrictEqual(read("3"), Option.some({ constant: 3, terms: {} }));
  });

  it("refuses products, quotients, powers and calls of the variables", () => {
    for (const text of ["x * y", "1 / x", "x / 0", "x^2", "sin(x)", "2^x"]) {
      assert.isTrue(Option.isNone(read(text)), text);
    }
  });

  it("refuses a name that is not one of its variables, such as a parameter", () => {
    assert.isTrue(Option.isNone(read("a * x + 1")));
  });
});

describe("affineConstant", () => {
  it("gives the value of an expression whose variables cancel, and nothing otherwise", () => {
    assert.deepStrictEqual(
      Option.flatMap(read("x - x + 2"), affineConstant),
      Option.some(2)
    );
    assert.isTrue(Option.isNone(Option.flatMap(read("x + 2"), affineConstant)));
  });
});
