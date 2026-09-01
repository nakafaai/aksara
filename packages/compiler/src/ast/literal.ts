import { Schema } from "effect";
import type {
  Expression,
  ObjectExpression,
  Pattern,
  Property,
} from "estree-jsx";

/** Recursive JavaScript literal value accepted without evaluation. */
export type StaticLiteral =
  | boolean
  | null
  | number
  | string
  | readonly StaticLiteral[]
  | { readonly [key: string]: StaticLiteral };

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
    const property = value.properties.find(
      (candidate): candidate is Property =>
        candidate.type === "Property" &&
        !candidate.computed &&
        staticPropertyName(candidate) === segment
    );
    if (!property) {
      return current;
    }
    const { value: propertyValue } = property;
    current = property;
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
    typeof property.key.value === "string"
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

/** Decodes a static array without executing authored JavaScript. */
function decodeArray(
  node: Extract<Expression, { readonly type: "ArrayExpression" }>
): StaticLiteralResult {
  const values: StaticLiteral[] = [];
  for (const element of node.elements) {
    if (element === null) {
      return failed("array-hole", node);
    }
    if (element.type === "SpreadElement") {
      return failed("spread", element.argument);
    }
    const decoded = decodeStaticLiteral(element);
    if (!decoded.success) {
      return decoded;
    }
    values.push(decoded.value);
  }
  return { success: true, value: values };
}

/** Decodes a static object while rejecting ambiguous property syntax. */
function decodeObject(node: ObjectExpression): StaticLiteralResult {
  const entries: [string, StaticLiteral][] = [];
  const names = new Set<string>();
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
    if (names.has(name)) {
      return failed("duplicate-property", property);
    }
    const decoded = decodeStaticLiteral(property.value);
    if (!decoded.success) {
      return decoded;
    }
    names.add(name);
    entries.push([name, decoded.value]);
  }
  return { success: true, value: Object.fromEntries(entries) };
}

/** Decodes the recursive literal subset accepted by static authoring policy. */
export function decodeStaticLiteral(
  node: Expression | Pattern
): StaticLiteralResult {
  if (node.type === "Literal") {
    const { value } = node;
    if (
      value === null ||
      typeof value === "boolean" ||
      typeof value === "string" ||
      (typeof value === "number" && Number.isFinite(value))
    ) {
      return { success: true, value };
    }
    return failed("dynamic-value", node);
  }
  if (
    node.type === "UnaryExpression" &&
    (node.operator === "+" || node.operator === "-") &&
    node.argument.type === "Literal" &&
    typeof node.argument.value === "number" &&
    Number.isFinite(node.argument.value)
  ) {
    return {
      success: true,
      value: node.operator === "-" ? -node.argument.value : node.argument.value,
    };
  }
  if (node.type === "ArrayExpression") {
    return decodeArray(node);
  }
  if (node.type === "ObjectExpression") {
    return decodeObject(node);
  }
  return failed("dynamic-value", node);
}
