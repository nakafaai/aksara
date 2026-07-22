import { Effect } from "effect";
import type { Node } from "estree-jsx";
import { resolveColor } from "#compiler/normalize/color";
import {
  type MdxMacroNormalizationError,
  rejectMacro,
} from "#compiler/normalize/spec";

/** One recursively static value accepted by the migration macro evaluator. */
export type StaticValue =
  | boolean
  | number
  | string
  | null
  | readonly StaticValue[]
  | StaticObject;

/** One plain static object accepted by the migration macro evaluator. */
export interface StaticObject {
  readonly [key: string]: StaticValue;
}

/** Narrows a static value to its plain object form. */
export function isStaticObject(value: StaticValue): value is StaticObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Reads one non-computed object property key from reviewed ESTree. */
function propertyName(node: Node) {
  if (node.type === "Identifier") {
    return node.name;
  }
  if (node.type === "Literal" && typeof node.value === "string") {
    return node.value;
  }
}

/** Rejects one expression outside the measured migration grammar. */
function expressionFailure(sourcePath: string, binding?: string) {
  return Effect.fail(rejectMacro(sourcePath, "expression", binding));
}

/** Evaluates one literal without accepting regexp, bigint, or non-finite data. */
function evaluateLiteral(node: Extract<Node, { type: "Literal" }>) {
  const { value } = node;
  if (
    value === null ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return value;
  }
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

/** Evaluates one exact imported `getColor` call nested in a macro argument. */
const evaluateColorCall = Effect.fn("AksaraCompiler.evaluateColorCall")(
  function* (
    node: Extract<Node, { type: "CallExpression" }>,
    bindings: ReadonlyMap<string, string>,
    sourcePath: string
  ) {
    if (
      node.optional ||
      node.callee.type !== "Identifier" ||
      bindings.get(node.callee.name) !== "getColor" ||
      node.arguments.some((argument) => argument.type === "SpreadElement")
    ) {
      return yield* expressionFailure(sourcePath);
    }
    const arguments_ = yield* Effect.forEach(node.arguments, (argument) =>
      evaluateStaticExpression(argument, bindings, sourcePath)
    );
    const color = resolveColor(arguments_);
    if (!color) {
      return yield* rejectMacro(sourcePath, "macro-input", node.callee.name);
    }
    return color;
  }
);

/** Evaluates one object whose keys and values are entirely static. */
const evaluateObject = Effect.fn("AksaraCompiler.evaluateStaticObject")(
  function* (
    node: Extract<Node, { type: "ObjectExpression" }>,
    bindings: ReadonlyMap<string, string>,
    sourcePath: string
  ) {
    const output: { [key: string]: StaticValue } = Object.create(null);
    for (const property of node.properties) {
      if (
        property.type !== "Property" ||
        property.computed ||
        property.kind !== "init" ||
        property.method ||
        property.shorthand
      ) {
        return yield* expressionFailure(sourcePath);
      }
      const name = propertyName(property.key);
      if (
        !name ||
        name === "__proto__" ||
        name === "constructor" ||
        name === "prototype" ||
        Object.hasOwn(output, name)
      ) {
        return yield* expressionFailure(sourcePath);
      }
      output[name] = yield* evaluateStaticExpression(
        property.value,
        bindings,
        sourcePath
      );
    }
    return output satisfies StaticObject;
  }
);

/**
 * Statically evaluates only the expression grammar measured in legacy MDX.
 * No authored code is executed and only an exactly imported `getColor` call
 * may appear inside another migration macro.
 */
export function evaluateStaticExpression(
  node: Node,
  bindings: ReadonlyMap<string, string>,
  sourcePath: string
): Effect.Effect<StaticValue, MdxMacroNormalizationError> {
  if (node.type === "Literal") {
    const literal = evaluateLiteral(node);
    return literal === undefined
      ? expressionFailure(sourcePath)
      : Effect.succeed(literal);
  }
  if (node.type === "ArrayExpression") {
    return Effect.forEach(node.elements, (element) =>
      element === null || element.type === "SpreadElement"
        ? expressionFailure(sourcePath)
        : evaluateStaticExpression(element, bindings, sourcePath)
    );
  }
  if (node.type === "ObjectExpression") {
    return evaluateObject(node, bindings, sourcePath);
  }
  if (node.type === "UnaryExpression" && node.operator === "-") {
    return evaluateStaticExpression(node.argument, bindings, sourcePath).pipe(
      Effect.filterOrFail(
        (value): value is number => typeof value === "number",
        () => rejectMacro(sourcePath, "expression")
      ),
      Effect.map((value) => -value)
    );
  }
  if (node.type === "BinaryExpression" && node.operator === "/") {
    return Effect.gen(function* () {
      const [left, right] = yield* Effect.all([
        evaluateStaticExpression(node.left, bindings, sourcePath),
        evaluateStaticExpression(node.right, bindings, sourcePath),
      ]);
      if (typeof left !== "number" || typeof right !== "number") {
        return yield* rejectMacro(sourcePath, "expression");
      }
      const result = left / right;
      if (!Number.isFinite(result)) {
        return yield* rejectMacro(sourcePath, "expression");
      }
      return result;
    });
  }
  if (node.type === "CallExpression") {
    return evaluateColorCall(node, bindings, sourcePath);
  }
  return expressionFailure(sourcePath);
}

/** Serializes one static value to deterministic executable literal source. */
export function encodeStaticValue(value: StaticValue): string {
  if (value === null || typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "number") {
    return Object.is(value, -0) ? "-0" : String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (isStaticObject(value)) {
    return `{${Object.entries(value)
      .map(
        ([key, entry]) => `${JSON.stringify(key)}:${encodeStaticValue(entry)}`
      )
      .sort()
      .join(",")}}`;
  }
  return `[${value.map(encodeStaticValue).join(",")}]`;
}
