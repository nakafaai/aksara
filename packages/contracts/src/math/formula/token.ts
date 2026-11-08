import {
  Array as Arr,
  MutableList,
  Option,
  Order,
  Record as Rec,
  Result,
  Schema,
} from "effect";

import {
  FORMULA_CONSTANTS,
  FormulaComparisonSchema,
  FormulaError,
  FormulaFunctionSchema,
} from "#contracts/math/formula/syntax";

/** Symbols a formula writes between its numbers and names. */
const FormulaSymbolSchema = Schema.Literals([
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  "/",
  "^",
  "_",
  "|",
  "°",
  "√",
]);
type FormulaSymbol = typeof FormulaSymbolSchema.Type;

/** One token of a formula and the index of its first character. */
export const FormulaTokenSchema = Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("number"),
    position: Schema.Int,
    value: Schema.Finite,
  }),
  Schema.Struct({
    kind: Schema.Literal("name"),
    name: Schema.String,
    position: Schema.Int,
  }),
  Schema.Struct({
    kind: Schema.Literal("symbol"),
    position: Schema.Int,
    symbol: FormulaSymbolSchema,
  }),
  Schema.Struct({
    comparison: FormulaComparisonSchema,
    kind: Schema.Literal("comparison"),
    position: Schema.Int,
  }),
]);
export type FormulaToken = typeof FormulaTokenSchema.Type;

/** Every word longer than one letter, longest first, so `sinh` wins over `sin`. */
const WORDS = Arr.sort(
  Arr.filter(
    [
      ...FormulaFunctionSchema.literals,
      ...Rec.keys(FORMULA_CONSTANTS),
      "theta",
    ],
    (word) => word.length > 1
  ),
  Order.flip(Order.mapInput(Order.Number, (word: string) => word.length))
);

/** Typed and Unicode spellings of each symbol, two-character ones first. */
const SPELLINGS: readonly (readonly [string, FormulaToken])[] = [
  ["<=", { comparison: "<=", kind: "comparison", position: 0 }],
  [">=", { comparison: ">=", kind: "comparison", position: 0 }],
  ["≤", { comparison: "<=", kind: "comparison", position: 0 }],
  ["≥", { comparison: ">=", kind: "comparison", position: 0 }],
  ["<", { comparison: "<", kind: "comparison", position: 0 }],
  [">", { comparison: ">", kind: "comparison", position: 0 }],
  ["=", { comparison: "=", kind: "comparison", position: 0 }],
  ["×", symbol("*")],
  ["·", symbol("*")],
  ["÷", symbol("/")],
  ["−", symbol("-")],
  ...Arr.map(FormulaSymbolSchema.literals, (each): [string, FormulaToken] => [
    each,
    symbol(each),
  ]),
];

/** Superscript digits read as a power of that digit. */
const SUPERSCRIPTS = { "²": 2, "³": 3 } as const;
const DIGITS = /^(?:\d+(?:\.\d+)?|\.\d+)/u;
const LETTERS = /^[a-z]+/u;
const SPACE = /\s/u;

/** Builds one symbol token before its position is known. */
function symbol(each: FormulaSymbol): FormulaToken {
  return { kind: "symbol", position: 0, symbol: each };
}

/** Splits a run of letters into the longest known words and single letters. */
function splitLetters(run: string, start: number) {
  const names = MutableList.make<FormulaToken>();
  let index = 0;
  while (index < run.length) {
    const rest = run.slice(index);
    const word = Option.getOrElse(
      Arr.findFirst(WORDS, (each) => rest.startsWith(each)),
      () => rest.charAt(0)
    );
    MutableList.append(names, {
      kind: "name",
      name: word,
      position: start + index,
    });
    index += word.length;
  }
  return MutableList.toArray(names);
}

/**
 * Reads a formula into tokens. Letters split into the longest known words, so
 * `2xy` reads as two, x, y and `sinh` as one function; π and θ read as `pi`
 * and `theta`, and ² and ³ as powers.
 */
export function tokenizeFormula(text: string) {
  const tokens = MutableList.make<FormulaToken>();
  let index = 0;
  while (index < text.length) {
    const rest = text.slice(index);
    const character = rest.charAt(0);
    if (SPACE.test(character)) {
      index += 1;
      continue;
    }
    const digits = DIGITS.exec(rest);
    if (digits) {
      MutableList.append(tokens, {
        kind: "number",
        position: index,
        value: Number(digits[0]),
      });
      index += digits[0].length;
      continue;
    }
    const letters = LETTERS.exec(rest);
    if (letters) {
      MutableList.appendAll(tokens, splitLetters(letters[0], index));
      index += letters[0].length;
      continue;
    }
    if (character === "π" || character === "θ") {
      const name = character === "π" ? "pi" : "theta";
      MutableList.append(tokens, { kind: "name", name, position: index });
      index += 1;
      continue;
    }
    if (character === "²" || character === "³") {
      MutableList.append(tokens, { ...symbol("^"), position: index });
      MutableList.append(tokens, {
        kind: "number",
        position: index,
        value: SUPERSCRIPTS[character],
      });
      index += 1;
      continue;
    }
    const spelling = Arr.findFirst(SPELLINGS, ([spelled]) =>
      rest.startsWith(spelled)
    );
    if (Option.isNone(spelling)) {
      return Result.fail(
        new FormulaError({
          message: `Unexpected "${character}" at ${index}.`,
          position: index,
          problem: "symbol-unexpected",
        })
      );
    }
    const [written, token] = spelling.value;
    MutableList.append(tokens, { ...token, position: index });
    index += written.length;
  }
  return Result.succeed(MutableList.toArray(tokens));
}
