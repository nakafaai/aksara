import type { MemberExpression, Program, Property } from "estree-jsx";
import { visit as visitEstree } from "estree-util-visit";
import type { ExecutablePolicyViolation } from "#compiler/errors";

const PROTOTYPE_ESCAPE_PROPERTIES = new Set([
  "__proto__",
  "constructor",
  "getOwnPropertyDescriptor",
  "getOwnPropertyDescriptors",
  "getPrototypeOf",
  "prototype",
  "setPrototypeOf",
]);

type PropertyExpression = MemberExpression["property"] | Property["key"];

/** Resolves a compile-time string without evaluating authored JavaScript. */
function staticStringValue(expression: PropertyExpression): string | undefined {
  if (expression.type === "Literal" && typeof expression.value === "string") {
    return expression.value;
  }
  if (expression.type === "BinaryExpression" && expression.operator === "+") {
    const left = staticStringValue(expression.left);
    const right = staticStringValue(expression.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (expression.type !== "TemplateLiteral") {
    return;
  }
  let value = "";
  for (const [index, quasi] of expression.quasis.entries()) {
    value += quasi.value.cooked ?? quasi.value.raw;
    const substitution = expression.expressions[index];
    if (!substitution) {
      continue;
    }
    const staticSubstitution = staticStringValue(substitution);
    if (staticSubstitution === undefined) {
      return;
    }
    value += staticSubstitution;
  }
  return value;
}

/** Resolves a property name only when its syntax is statically knowable. */
function staticPropertyName(property: Property["key"]) {
  if (property.type === "Identifier") {
    return property.name;
  }
  return staticStringValue(property);
}

/** Resolves the statically knowable property selected by member access. */
function memberPropertyName(node: MemberExpression) {
  if (node.computed) {
    return staticStringValue(node.property);
  }
  return node.property.type === "Identifier" ? node.property.name : undefined;
}

/** Allows a computed numeric key that cannot name a prototype capability. */
function hasSafeNumericKey(property: PropertyExpression) {
  return (
    property.type === "Literal" &&
    typeof property.value === "number" &&
    Number.isFinite(property.value)
  );
}

/** Records one property name or a dynamic-property violation. */
function inspectProperty(
  computed: boolean,
  property: PropertyExpression,
  staticName: string | undefined
): ExecutablePolicyViolation | undefined {
  if (computed && staticName === undefined && !hasSafeNumericKey(property)) {
    return { rule: "dynamic-property-access" };
  }
  if (staticName !== undefined && PROTOTYPE_ESCAPE_PROPERTIES.has(staticName)) {
    return { identifier: staticName, rule: "prototype-chain-access" };
  }
}

/** Finds dynamic and prototype-chain property capabilities in one program. */
export function inspectPropertyProgram(program: Program) {
  const violations: ExecutablePolicyViolation[] = [];
  visitEstree(program, (node) => {
    if (node.type === "MemberExpression") {
      const violation = inspectProperty(
        node.computed,
        node.property,
        memberPropertyName(node)
      );
      if (violation) {
        violations.push(violation);
      }
      return;
    }
    if (node.type !== "Property") {
      return;
    }
    const propertyName = node.computed
      ? staticStringValue(node.key)
      : staticPropertyName(node.key);
    const violation = inspectProperty(node.computed, node.key, propertyName);
    if (violation) {
      violations.push(violation);
    }
    if (propertyName === "dangerouslySetInnerHTML") {
      violations.push({
        identifier: "dangerouslySetInnerHTML",
        rule: "dangerous-jsx-attribute",
      });
    }
  });
  return violations;
}
