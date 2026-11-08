import { assert, describe, it } from "@effect/vitest";
import { Result, Schema } from "effect";

import {
  EquationTextSchema,
  FormulaParameterSchema,
  FormulaTextSchema,
  InequalityTextSchema,
} from "#contracts/math/formula/field";

/** Decodes one value and returns whether it passed. */
function passes<S extends Schema.Top>(schema: S, value: unknown) {
  return Result.isSuccess(Schema.decodeUnknownResult(schema)(value));
}

describe("formula fields", () => {
  it("accepts an expression and names the problem of one that does not read", () => {
    assert.isTrue(passes(FormulaTextSchema, "2x^2 - 3x + 1"));
    const failed = Schema.decodeUnknownResult(FormulaTextSchema)("2 +");
    assert.isTrue(Result.isFailure(failed));
    assert.include(
      String(Result.isFailure(failed) ? failed.failure : ""),
      "Expected a value."
    );
  });

  it("keeps equations and inequalities apart", () => {
    assert.isTrue(passes(EquationTextSchema, "x^2 + y^2 = 4"));
    assert.isFalse(passes(EquationTextSchema, "y < x"));
    assert.isFalse(passes(EquationTextSchema, "x + 1"));
    assert.isTrue(passes(InequalityTextSchema, "y >= 2x - 1"));
    assert.isFalse(passes(InequalityTextSchema, "y = x"));
  });

  it("checks a slider's name, range, value, and step", () => {
    const slider = { max: 3, min: -3, name: "a", value: 1 };
    assert.isTrue(passes(FormulaParameterSchema, slider));
    assert.isTrue(passes(FormulaParameterSchema, { ...slider, step: 0.5 }));
    assert.isFalse(passes(FormulaParameterSchema, { ...slider, name: "x" }));
    assert.isFalse(passes(FormulaParameterSchema, { ...slider, name: "e" }));
    assert.isFalse(passes(FormulaParameterSchema, { ...slider, value: 4 }));
    assert.isFalse(passes(FormulaParameterSchema, { ...slider, max: -3 }));
    assert.isFalse(passes(FormulaParameterSchema, { ...slider, step: 0 }));
  });
});
