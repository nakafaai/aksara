import {
  Array as Arr,
  MutableHashSet,
  MutableList,
  Option,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";
import type {
  Expression,
  ObjectExpression,
  Pattern,
  Property,
} from "estree-jsx";
import { foldNumber } from "#compiler/ast/constant";

/** Recursive JavaScript literal value accepted without running authored code. */
export type StaticLiteral =
  | boolean
  | null
  | number
  | string
  | readonly StaticLiteral[]
  | { readonly [key: string]: StaticLiteral };

/** Schema of every static literal value, recursive through its arrays and objects. */
export const StaticLiteralSchema: Schema.Codec<StaticLiteral> = Schema.suspend(
  (): Schema.Codec<StaticLiteral> =>
    Schema.Union([
      Schema.Boolean,
      Schema.Null,
      Schema.Finite,
      Schema.String,
      Schema.Array(StaticLiteralSchema),
      Schema.Record(Schema.String, StaticLiteralSchema),
    ])
);

/** Stable reasons for rejecting syntax outside the static literal subset. */
export const StaticLiteralSyntaxReasonSchema = Schema.Literals([
  "array-hole",
  "computed-property",
  "duplicate-property",
  "dynamic-value",
  "spread",
  "unsupported-property",
]);
export type StaticLiteralSyntaxReason =
  typeof StaticLiteralSyntaxReasonSchema.Type;

/** String object keys and numeric array indexes in one literal value. */
export type StaticLiteralPathSegment = string | number;

/** One rejected static literal node and its stable syntax reason. */
export interface StaticLiteralFailure {
  readonly node: Expression | Pattern | Property;
  readonly reason: StaticLiteralSyntaxReason;
}

/** Result of statically decoding one JavaScript expression. */
export type StaticLiteralResult =
  | { readonly failure: StaticLiteralFailure; readonly success: false }
  | { readonly success: true; readonly value: StaticLiteral };

/** Finds the deepest authored literal node identified by one decoded path. */
export function staticLiteralNodeAtPath(
  root: Expression | Pattern,
  path: readonly StaticLiteralPathSegment[]
): StaticLiteralFailure["node"] {
  let current: StaticLiteralFailure["node"] = root;
  let value: Expression | Pattern = root;
  for (const segment of path) {
    if (typeof segment === "number") {
      if (value.type !== "ArrayExpression") {
        return current;
      }
      const element = value.elements[segment];
      if (!(element && element.type !== "SpreadElement")) {
        return current;
      }
      current = element;
      value = element;
      continue;
    }
    if (value.type !== "ObjectExpression") {
      return current;
    }
    const property = Arr.findFirst(
      value.properties,
      (candidate): candidate is Property =>
        candidate.type === "Property" &&
        !candidate.computed &&
        staticPropertyName(candidate) === segment
    );
    if (Option.isNone(property)) {
      return current;
    }
    const { value: propertyValue } = property.value;
    current = property.value;
    value = propertyValue;
  }
  return current;
}

/** Resolves one noncomputed object-property name. */
export function staticPropertyName(property: Property) {
  if (property.key.type === "Identifier") {
    return property.key.name;
  }
  if (
    property.key.type === "Literal" &&
    Predicate.isString(property.key.value)
  ) {
    return property.key.value;
  }
}

/** Creates one failed static literal result. */
function failed(
  reason: StaticLiteralSyntaxReason,
  node: StaticLiteralFailure["node"]
): StaticLiteralResult {
  return { failure: { node, reason }, success: false };
}

/** Reads the number one expression denotes, or nothing when it denotes none. */
type NumberReader = (node: Expression | Pattern) => number | undefined;

/** Decodes a static array without executing authored JavaScript. */
function decodeArray(
  node: Extract<Expression, { readonly type: "ArrayExpression" }>,
  readNumber: NumberReader
): StaticLiteralResult {
  const values = MutableList.make<StaticLiteral>();
  for (const element of node.elements) {
    if (element === null) {
      return failed("array-hole", node);
    }
    if (element.type === "SpreadElement") {
      return failed("spread", element.argument);
    }
    const decoded = decode(element, readNumber);
    if (!decoded.success) {
      return decoded;
    }
    MutableList.append(values, decoded.value);
  }
  return { success: true, value: MutableList.toArray(values) };
}

/** Decodes a static object while rejecting ambiguous property syntax. */
function decodeObject(
  node: ObjectExpression,
  readNumber: NumberReader
): StaticLiteralResult {
  const entries = MutableList.make<[string, StaticLiteral]>();
  const names = MutableHashSet.empty<string>();
  for (const property of node.properties) {
    if (property.type === "SpreadElement") {
      return failed("spread", property.argument);
    }
    if (property.computed) {
      return failed("computed-property", property);
    }
    if (property.kind !== "init" || property.method || property.shorthand) {
      return failed("unsupported-property", property);
    }
    const name = staticPropertyName(property);
    if (name === undefined) {
      return failed("unsupported-property", property);
    }
    if (MutableHashSet.has(names, name)) {
      return failed("duplicate-property", property);
    }
    const decoded = decode(property.value, readNumber);
    if (!decoded.success) {
      return decoded;
    }
    MutableHashSet.add(names, name);
    const entry: [string, StaticLiteral] = [name, decoded.value];
    MutableList.append(entries, entry);
  }
  return {
    success: true,
    value: Rec.fromEntries(MutableList.toArray(entries)),
  };
}

/** Reads a number that is written directly, with an optional sign. */
function readSignedLiteral(node: Expression | Pattern): number | undefined {
  if (
    node.type === "UnaryExpression" &&
    (node.operator === "+" || node.operator === "-") &&
    node.argument.type === "Literal" &&
    typeof node.argument.value === "number" &&
    Number.isFinite(node.argument.value)
  ) {
    return node.operator === "-" ? -node.argument.value : node.argument.value;
  }
}

/** Decodes one node, reading each number it holds with the given reader. */
function decode(
  node: Expression | Pattern,
  readNumber: NumberReader
): StaticLiteralResult {
  if (node.type === "Literal") {
    const { value } = node;
    if (
      value === null ||
      Predicate.isBoolean(value) ||
      Predicate.isString(value) ||
      (Predicate.isNumber(value) && Number.isFinite(value))
    ) {
      return { success: true, value };
    }
    return failed("dynamic-value", node);
  }
  if (node.type === "ArrayExpression") {
    return decodeArray(node, readNumber);
  }
  if (node.type === "ObjectExpression") {
    return decodeObject(node, readNumber);
  }
  const value = readNumber(node);
  return value === undefined
    ? failed("dynamic-value", node)
    : { success: true, value };
}

/** Decodes the recursive literal subset accepted by static authoring policy. */
export function decodeStaticLiteral(
  node: Expression | Pattern
): StaticLiteralResult {
  return decode(node, readSignedLiteral);
}

/**
 * Decodes the static literal subset and also folds constant numeric
 * expressions, such as `Math.sqrt(3)` or `1 / 3`, into the numbers they denote.
 * Exact geometry names irrational coordinates this way instead of rounding
 * them, and the renderer evaluates the same source when it draws the scene.
 */
export function decodeConstantLiteral(
  node: Expression | Pattern
): StaticLiteralResult {
  return decode(node, foldNumber);
}
