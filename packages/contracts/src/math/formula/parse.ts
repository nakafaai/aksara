import { Array as Arr, MutableList, Option, Result, Schema } from "effect";

import {
  at,
  expect,
  finished,
  here,
  peek,
  problemAt,
  type Reader,
  startReader,
} from "#contracts/math/formula/reader";
import {
  type FormulaComparison,
  type FormulaError,
  type FormulaFunction,
  FormulaFunctionSchema,
  type FormulaNode,
  type FormulaRelation,
} from "#contracts/math/formula/syntax";

/** How tightly each operator holds its operands; implicit products bind like `*`. */
const SUM = 10;
const PRODUCT = 20;
const SIGN = 25;
const POWER = 30;
const DEGREE = 40;

const isFunction = Schema.is(FormulaFunctionSchema);

/** Whether the current token can begin a factor of an implicit product. */
function startsFactor(reader: Reader) {
  return Option.exists(peek(reader), (token) => {
    if (token.kind === "number" || token.kind === "name") {
      return true;
    }
    return (
      token.kind === "symbol" &&
      (token.symbol === "(" ||
        token.symbol === "√" ||
        (token.symbol === "|" && reader.bars === 0))
    );
  });
}

/** Reads the comma-separated arguments of one call, checking their count. */
function readArguments(reader: Reader, callee: FormulaFunction, start: number) {
  return Result.gen(function* () {
    if (!at(reader, "(")) {
      return yield* problemAt(
        "function-arguments",
        start,
        `Expected "(" after ${callee}.`
      );
    }
    reader.index += 1;
    const outerBars = reader.bars;
    reader.bars = 0;
    const first = yield* readExpression(reader, 0);
    const rest = MutableList.make<FormulaNode>();
    while (at(reader, ",")) {
      reader.index += 1;
      MutableList.append(rest, yield* readExpression(reader, 0));
    }
    yield* expect(reader, ")");
    reader.bars = outerBars;
    const args: readonly [FormulaNode, ...FormulaNode[]] = [
      first,
      ...MutableList.toArray(rest),
    ];
    const many = callee === "max" || callee === "min";
    if (many ? args.length < 2 : args.length !== 1) {
      return yield* problemAt(
        "function-arguments",
        start,
        many
          ? `${callee} takes two or more arguments.`
          : `${callee} takes one argument.`
      );
    }
    return args;
  });
}

/** Reads a function call, with `sin^2(x)` powers and `log_b(x)` bases. */
function readCall(reader: Reader, callee: FormulaFunction, start: number) {
  return Result.gen(function* () {
    const base =
      callee === "log" && at(reader, "_")
        ? Option.some(yield* readSubscript(reader))
        : Option.none<FormulaNode>();
    const power = at(reader, "^")
      ? Option.some(yield* readExponent(reader))
      : Option.none<FormulaNode>();
    const args = yield* readArguments(reader, callee, start);
    const [value] = args;
    const call: FormulaNode = Option.match(base, {
      onNone: () => ({ args, callee, kind: "call" as const }),
      onSome: (each) => ({ base: each, kind: "logarithm" as const, value }),
    });
    return Option.match(power, {
      onNone: () => call,
      onSome: (right): FormulaNode => ({
        kind: "binary",
        left: call,
        operator: "^",
        right,
      }),
    });
  });
}

/** Reads the `_b` base of a logarithm: one number, name, or group. */
function readSubscript(reader: Reader) {
  reader.index += 1;
  return readPrefix(reader);
}

/** Reads the `^n` power written between a function's name and its arguments. */
function readExponent(reader: Reader) {
  reader.index += 1;
  return readPrefix(reader);
}

/** Reads what one symbol opens: a group, absolute bars, a root, or a sign. */
function readSymbol(
  reader: Reader,
  symbol: string,
  position: number
): Result.Result<FormulaNode, FormulaError> {
  return Result.gen(function* () {
    if (symbol === "(") {
      const outerBars = reader.bars;
      reader.bars = 0;
      const inner = yield* readExpression(reader, 0);
      yield* expect(reader, ")");
      reader.bars = outerBars;
      return inner;
    }
    if (symbol === "|") {
      reader.bars += 1;
      const inner = yield* readExpression(reader, 0);
      yield* expect(reader, "|");
      reader.bars -= 1;
      return {
        args: [inner],
        callee: "abs",
        kind: "call",
      } satisfies FormulaNode;
    }
    if (symbol === "√") {
      const inner = yield* readExpression(reader, POWER);
      return {
        args: [inner],
        callee: "sqrt",
        kind: "call",
      } satisfies FormulaNode;
    }
    if (symbol === "-" || symbol === "+") {
      const operand = yield* readExpression(reader, SIGN);
      return symbol === "-"
        ? ({ kind: "negate", operand } satisfies FormulaNode)
        : operand;
    }
    return yield* problemAt(
      "value-expected",
      position,
      `Expected a value, not "${symbol}".`
    );
  });
}

/** Reads one factor: a number, a name, a call, or what a symbol opens. */
function readPrefix(reader: Reader): Result.Result<FormulaNode, FormulaError> {
  return Result.gen(function* () {
    const token = peek(reader);
    if (Option.isNone(token)) {
      return yield* problemAt(
        "value-expected",
        reader.length,
        "Expected a value."
      );
    }
    const current = token.value;
    reader.index += 1;
    if (current.kind === "number") {
      return { kind: "number", value: current.value } satisfies FormulaNode;
    }
    if (current.kind === "name") {
      return isFunction(current.name)
        ? yield* readCall(reader, current.name, current.position)
        : ({ kind: "name", name: current.name } satisfies FormulaNode);
    }
    if (current.kind === "comparison") {
      return yield* problemAt(
        "comparison-unexpected",
        current.position,
        "Expected a value before the comparison."
      );
    }
    return yield* readSymbol(reader, current.symbol, current.position);
  });
}

/** How tightly each written operator binds, and how its right side reads. */
const INFIX = [
  { operator: "+", power: SUM, right: SUM + 1 },
  { operator: "-", power: SUM, right: SUM + 1 },
  { operator: "*", power: PRODUCT, right: PRODUCT + 1 },
  { operator: "/", power: PRODUCT, right: PRODUCT + 1 },
  { operator: "^", power: POWER, right: POWER - 1 },
] as const;

/** The written operator ahead and its binding, if one stands there. */
function infixAhead(reader: Reader) {
  return Arr.findFirst(INFIX, ({ operator }) => at(reader, operator));
}

/**
 * Extends what has been read with every operator ahead that binds tighter
 * than `minimum`: degrees, written operators, and implicit products.
 */
function extend(
  reader: Reader,
  minimum: number,
  left: FormulaNode
): Result.Result<FormulaNode, FormulaError> {
  return Result.gen(function* () {
    if (at(reader, "°") && DEGREE > minimum) {
      reader.index += 1;
      const right = { kind: "number", value: Math.PI / 180 } as const;
      return yield* extend(reader, minimum, {
        kind: "binary",
        left,
        operator: "*",
        right,
      });
    }
    const infix = infixAhead(reader);
    if (Option.isSome(infix)) {
      if (infix.value.power <= minimum) {
        return left;
      }
      reader.index += 1;
      const right = yield* readExpression(reader, infix.value.right);
      const { operator } = infix.value;
      return yield* extend(reader, minimum, {
        kind: "binary",
        left,
        operator,
        right,
      });
    }
    if (startsFactor(reader) && PRODUCT > minimum) {
      const right = yield* readExpression(reader, PRODUCT + 1);
      return yield* extend(reader, minimum, {
        kind: "binary",
        left,
        operator: "*",
        right,
      });
    }
    return left;
  });
}

/** Reads operators that bind tighter than `minimum`, the core of a Pratt parser. */
function readExpression(
  reader: Reader,
  minimum: number
): Result.Result<FormulaNode, FormulaError> {
  return Result.flatMap(readPrefix(reader), (left) =>
    extend(reader, minimum, left)
  );
}

/** Reads a formula that is one expression, such as `2x^2 - 3x + 1`. */
export function readFormula(text: string) {
  return Result.gen(function* () {
    const reader = yield* startReader(text);
    if (reader.tokens.length === 0) {
      return yield* problemAt("empty", 0, "Expected a formula.");
    }
    const node = yield* readExpression(reader, 0);
    yield* finished(reader);
    return node;
  });
}

/** Reads one equation or inequality, such as `x^2 + y^2 = 4` or `y < 2x + 1`. */
export function readRelation(text: string) {
  return Result.gen(function* () {
    const reader = yield* startReader(text);
    if (reader.tokens.length === 0) {
      return yield* problemAt("empty", 0, "Expected a formula.");
    }
    const left = yield* readExpression(reader, 0);
    const token = peek(reader);
    if (Option.isNone(token) || token.value.kind !== "comparison") {
      return yield* problemAt(
        "comparison-expected",
        here(reader),
        "Expected =, <, <=, >, or >=."
      );
    }
    const comparison: FormulaComparison = token.value.comparison;
    reader.index += 1;
    const right = yield* readExpression(reader, 0);
    yield* finished(reader);
    return { comparison, left, right } satisfies FormulaRelation;
  });
}
