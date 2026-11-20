import { Array as Arr, Match, Option, Record as Rec, Schema } from "effect";

import { compileFormula } from "#contracts/math/formula/compile";
import type {
  FormulaNode,
  FormulaOperator,
} from "#contracts/math/formula/syntax";

/**
 * An affine expression: a constant plus one coefficient for each variable it
 * reads, such as `2x + 5y - 10`, read as 2 for x, 5 for y and -10.
 */
export const AffineSchema = Schema.Struct({
  constant: Schema.Finite,
  terms: Schema.Record(Schema.String, Schema.Finite),
});
export type Affine = typeof AffineSchema.Type;

/** An expression that reads no variable. */
function constant(value: number): Affine {
  return { constant: value, terms: {} };
}

/** Multiplies every part of an affine expression by one number. */
function scale(affine: Affine, factor: number): Affine {
  return {
    constant: affine.constant * factor,
    terms: Rec.map(affine.terms, (coefficient) => coefficient * factor),
  };
}

/** Adds two affine expressions, or subtracts the second when `sign` is -1. */
function combine(left: Affine, right: Affine, sign: 1 | -1): Affine {
  const names = Arr.dedupe([...Rec.keys(left.terms), ...Rec.keys(right.terms)]);
  return {
    constant: left.constant + sign * right.constant,
    terms: Rec.fromEntries(
      Arr.map(names, (name) => [
        name,
        (left.terms[name] ?? 0) + sign * (right.terms[name] ?? 0),
      ])
    ),
  };
}

/** The value of an affine expression that reads no variable, if it reads none. */
export function affineConstant(affine: Affine) {
  return Arr.every(Rec.values(affine.terms), (coefficient) => coefficient === 0)
    ? Option.some(affine.constant)
    : Option.none();
}

/** Reads a product, which stays affine while one side is a constant. */
function product(left: Affine, right: Affine) {
  return Option.orElse(
    Option.map(affineConstant(left), (factor) => scale(right, factor)),
    () => Option.map(affineConstant(right), (factor) => scale(left, factor))
  );
}

/** Reads a quotient, which stays affine while its divisor is a constant other than zero. */
function quotient(left: Affine, right: Affine) {
  return Option.flatMap(affineConstant(right), (divisor) =>
    divisor === 0 ? Option.none() : Option.some(scale(left, 1 / divisor))
  );
}

/** How each operator combines two affine expressions, while the result stays affine. */
const OPERATORS = {
  "-": (left, right) => Option.some(combine(left, right, -1)),
  "*": product,
  "/": quotient,
  // Only a power of one keeps a variable affine.
  "^": (left, right) =>
    Option.filter(affineConstant(right), (power) => power === 1).pipe(
      Option.as(left)
    ),
  "+": (left, right) => Option.some(combine(left, right, 1)),
} satisfies Record<
  FormulaOperator,
  (left: Affine, right: Affine) => Option.Option<Affine>
>;

/**
 * Reads a formula as an affine expression in the given variables, from its
 * syntax and without sampling it: sums, differences and constant multiples of
 * the variables, with any part that reads no name folded to its value. A
 * formula that multiplies two variables, divides by one, or calls a function
 * of one is not affine, and neither is one that reads any other name, such as
 * a slider's parameter, whose value changes as the reader moves it.
 */
export function readAffine(
  node: FormulaNode,
  variables: readonly string[]
): Option.Option<Affine> {
  const value = compileFormula(node)({});
  if (Number.isFinite(value)) {
    return Option.some(constant(value));
  }
  return Match.value(node).pipe(
    Match.discriminators("kind")({
      binary: ({ left, operator, right }) =>
        Option.flatMap(
          Option.all([
            readAffine(left, variables),
            readAffine(right, variables),
          ]),
          ([first, second]) => OPERATORS[operator](first, second)
        ),
      name: ({ name }) =>
        Arr.contains(variables, name)
          ? Option.some({ constant: 0, terms: { [name]: 1 } })
          : Option.none(),
      negate: ({ operand }) =>
        Option.map(readAffine(operand, variables), (read) => scale(read, -1)),
    }),
    Match.orElse(() => Option.none<Affine>())
  );
}
