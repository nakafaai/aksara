import { Schema } from "effect";

/** Arithmetic operators of a formula, from the loosest binding to the tightest. */
export const FormulaOperatorSchema = Schema.Literals(["+", "-", "*", "/", "^"]);
export type FormulaOperator = typeof FormulaOperatorSchema.Type;

/** Comparisons that turn two expressions into an equation or an inequality. */
export const FormulaComparisonSchema = Schema.Literals([
  "=",
  "<",
  "<=",
  ">",
  ">=",
]);
export type FormulaComparison = typeof FormulaComparisonSchema.Type;

/** Functions of one argument, in radians where an angle is meant. */
export const FormulaUnarySchema = Schema.Literals([
  "abs",
  "acos",
  "asin",
  "atan",
  "cbrt",
  "ceil",
  "cos",
  "cosh",
  "cot",
  "csc",
  "exp",
  "floor",
  "ln",
  "log",
  "sec",
  "sign",
  "sin",
  "sinh",
  "sqrt",
  "tan",
  "tanh",
]);
export type FormulaUnary = typeof FormulaUnarySchema.Type;

/**
 * Every function a formula may call: the functions of one argument, and `min`
 * and `max`, which take two or more. A logarithm in another base is written
 * `log_b(x)`.
 */
export const FormulaFunctionSchema = Schema.Literals([
  ...FormulaUnarySchema.literals,
  "max",
  "min",
]);
export type FormulaFunction = typeof FormulaFunctionSchema.Type;

/** Named constants, each with its exact numeric value. */
export const FORMULA_CONSTANTS = { e: Math.E, pi: Math.PI } as const;

/** The variables an object's formula is written in, chosen by its kind. */
export const FormulaVariableSchema = Schema.Literals([
  "theta",
  "t",
  "u",
  "v",
  "x",
  "y",
  "z",
]);
export type FormulaVariable = typeof FormulaVariableSchema.Type;

/**
 * A slider parameter's name: one lowercase Latin letter that is neither a
 * variable nor the constant e, so `a`, `b`, `h`, `k`, and `m` all qualify.
 */
export const FormulaParameterNameSchema = Schema.String.check(
  Schema.isPattern(/^[a-df-sw]$/u)
);

/** The named type of one formula node, which a node's children repeat. */
export type FormulaNode =
  | { readonly kind: "number"; readonly value: number }
  | { readonly kind: "name"; readonly name: string }
  | { readonly kind: "negate"; readonly operand: FormulaNode }
  | {
      readonly kind: "binary";
      readonly left: FormulaNode;
      readonly operator: FormulaOperator;
      readonly right: FormulaNode;
    }
  | {
      readonly args: readonly [FormulaNode, ...FormulaNode[]];
      readonly callee: FormulaFunction;
      readonly kind: "call";
    }
  | {
      readonly base: FormulaNode;
      readonly kind: "logarithm";
      readonly value: FormulaNode;
    };

/** One parsed formula expression as a tree of numbers, names, and operations. */
export const FormulaNodeSchema: Schema.Codec<FormulaNode> = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("number"), value: Schema.Finite }),
  Schema.Struct({ kind: Schema.Literal("name"), name: Schema.String }),
  Schema.Struct({
    kind: Schema.Literal("negate"),
    operand: Schema.suspend(() => FormulaNodeSchema),
  }),
  Schema.Struct({
    kind: Schema.Literal("binary"),
    left: Schema.suspend(() => FormulaNodeSchema),
    operator: FormulaOperatorSchema,
    right: Schema.suspend(() => FormulaNodeSchema),
  }),
  Schema.Struct({
    args: Schema.NonEmptyArray(Schema.suspend(() => FormulaNodeSchema)),
    callee: FormulaFunctionSchema,
    kind: Schema.Literal("call"),
  }),
  Schema.Struct({
    base: Schema.suspend(() => FormulaNodeSchema),
    kind: Schema.Literal("logarithm"),
    value: Schema.suspend(() => FormulaNodeSchema),
  }),
]);

/** One parsed equation or inequality: two expressions and their comparison. */
export const FormulaRelationSchema = Schema.Struct({
  comparison: FormulaComparisonSchema,
  left: FormulaNodeSchema,
  right: FormulaNodeSchema,
});
export type FormulaRelation = typeof FormulaRelationSchema.Type;

/** Why a formula could not be read, so an editor can say it in any language. */
export const FormulaProblemSchema = Schema.Literals([
  "comparison-expected",
  "comparison-unexpected",
  "empty",
  "function-arguments",
  "group-unclosed",
  "operator-expected",
  "symbol-unexpected",
  "value-expected",
]);
export type FormulaProblem = typeof FormulaProblemSchema.Type;

/** A formula that does not parse, with the problem and where it starts. */
export class FormulaError extends Schema.TaggedError<FormulaError>()(
  "FormulaError",
  {
    message: Schema.String,
    position: Schema.Int,
    problem: FormulaProblemSchema,
  }
) {}
