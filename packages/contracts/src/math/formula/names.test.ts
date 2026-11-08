import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Order, Result } from "effect";

import { formulaNames } from "#contracts/math/formula/names";
import { readFormula } from "#contracts/math/formula/parse";

describe("formulaNames", () => {
  it("names every variable and parameter it reads, and no constant", () => {
    const node = readFormula("-a sin(theta) + log_(b)(x) + max(y, 2) - pi e");
    assert.isTrue(Result.isSuccess(node));
    if (Result.isSuccess(node)) {
      assert.deepStrictEqual(
        Arr.sort(Arr.fromIterable(formulaNames(node.success)), Order.String),
        ["a", "b", "theta", "x", "y"]
      );
    }
  });
});
