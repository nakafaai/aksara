import { Array as Arr, Option, Result, Schema } from "effect";

import {
  FormulaError,
  type FormulaProblem,
} from "#contracts/math/formula/syntax";
import {
  FormulaTokenSchema,
  tokenizeFormula,
} from "#contracts/math/formula/token";

/**
 * The tokens of one formula and the reader's place in them: the token it
 * stands at and how many absolute bars are open around it.
 */
const ReaderSchema = Schema.Struct({
  bars: Schema.mutableKey(Schema.Int),
  index: Schema.mutableKey(Schema.Int),
  length: Schema.Int,
  tokens: Schema.Array(FormulaTokenSchema),
});
export type Reader = typeof ReaderSchema.Type;

/** Builds the failure for one problem at one place in the text. */
export function problemAt(
  problem: FormulaProblem,
  position: number,
  message: string
) {
  return Result.fail(new FormulaError({ message, position, problem }));
}

/** Returns the current token without moving past it. */
export function peek(reader: Reader) {
  return Arr.get(reader.tokens, reader.index);
}

/** Whether the current token is one symbol. */
export function at(reader: Reader, symbol: string) {
  return Option.exists(
    peek(reader),
    (token) => token.kind === "symbol" && token.symbol === symbol
  );
}

/** Where the current token starts, or the end of the text. */
export function here(reader: Reader) {
  return Option.match(peek(reader), {
    onNone: () => reader.length,
    onSome: (token) => token.position,
  });
}

/** Moves past one expected symbol, or fails where it should stand. */
export function expect(reader: Reader, symbol: string) {
  if (!at(reader, symbol)) {
    return problemAt("group-unclosed", here(reader), `Expected "${symbol}".`);
  }
  reader.index += 1;
  return Result.succeed(symbol);
}

/** Starts reading the tokens of one formula. */
export function startReader(text: string) {
  return Result.map(
    tokenizeFormula(text),
    (tokens): Reader => ({
      bars: 0,
      index: 0,
      length: text.length,
      tokens,
    })
  );
}

/** Fails on the first token a complete reading left behind. */
export function finished(reader: Reader) {
  return Option.match(peek(reader), {
    onNone: () => Result.succeed(reader),
    onSome: (token) =>
      token.kind === "comparison"
        ? problemAt(
            "comparison-unexpected",
            token.position,
            "Expected an expression, not an equation or an inequality."
          )
        : problemAt(
            "operator-expected",
            token.position,
            "Expected an operator or the end of the formula."
          ),
  });
}
