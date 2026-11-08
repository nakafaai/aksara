import { Array as Arr, Result, Schema } from "effect";

import { readFormula, readRelation } from "#contracts/math/formula/parse";
import {
  type FormulaComparison,
  type FormulaError,
  FormulaParameterNameSchema,
} from "#contracts/math/formula/syntax";

/** Passes a formula that reads, or names the problem of one that does not. */
function readable<A>(read: (text: string) => Result.Result<A, FormulaError>) {
  return (text: string) =>
    Result.match(read(text), {
      onFailure: (problem) => problem.message,
      onSuccess: () => true,
    });
}

/** Passes a relation that reads with one of the allowed comparisons. */
function comparedWith(allowed: readonly FormulaComparison[], message: string) {
  return (text: string) =>
    Result.match(readRelation(text), {
      onFailure: (problem) => problem.message,
      onSuccess: ({ comparison }) =>
        Arr.contains(allowed, comparison) || message,
    });
}

/** An authored expression, such as `2x^2 - 3x + 1` or `a sin(t)`. */
export const FormulaTextSchema = Schema.String.check(
  Schema.makeFilter(readable(readFormula))
);

/** An authored equation, such as `x^2 + y^2 = 4`. */
export const EquationTextSchema = Schema.String.check(
  Schema.makeFilter(comparedWith(["="], "Expected an equation with =."))
);

/** An authored inequality, such as `y < 2x + 1` or `x + y <= 4`. */
export const InequalityTextSchema = Schema.String.check(
  Schema.makeFilter(
    comparedWith(["<", "<=", ">", ">="], "Expected <, <=, >, or >=.")
  )
);

/**
 * One slider a learner moves to change every formula that reads its name. Its
 * value starts inside its range, and a positive step, when given, snaps it.
 */
export const FormulaParameterSchema = Schema.Struct({
  max: Schema.Finite,
  min: Schema.Finite,
  name: FormulaParameterNameSchema,
  step: Schema.optionalKey(Schema.Finite.check(Schema.isGreaterThan(0))),
  value: Schema.Finite,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) =>
      (min < max && min <= value && value <= max) ||
      "Expected min < max and a value between them."
  )
);
export type FormulaParameter = typeof FormulaParameterSchema.Type;
