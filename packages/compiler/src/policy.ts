import { analyze } from "eslint-scope";
import type {
  Node as EstreeNode,
  JSXAttribute,
  MemberExpression,
  Program,
  Property,
} from "estree-jsx";
import { visit as visitEstree } from "estree-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Node as UnistNode } from "unist";
import { visit as visitUnist } from "unist-util-visit";
import type {
  ExecutablePolicyViolation,
  UnsupportedMdxModuleOccurrence,
} from "#compiler/errors.js";
import { collectUnsupportedMdxModules } from "#compiler/module-policy.js";

const NETWORK_GLOBALS = new Set(["fetch", "WebSocket", "EventSource"]);
const PROTOTYPE_ESCAPE_PROPERTIES = new Set([
  "__proto__",
  "constructor",
  "prototype",
]);
const SAFE_GLOBALS = new Set([
  "Array",
  "Boolean",
  "Infinity",
  "JSON",
  "Math",
  "NaN",
  "Number",
  "Object",
  "RegExp",
  "String",
  "props",
  "undefined",
]);

function isProgram(value: unknown): value is Program {
  if (!(typeof value === "object" && value !== null)) {
    return false;
  }
  if (!("type" in value && value.type === "Program")) {
    return false;
  }
  return "body" in value && Array.isArray(value.body);
}

function nodeProgram(node: UnistNode) {
  const { data } = node;
  if (!(data && "estree" in data)) {
    return;
  }
  return isProgram(data.estree) ? data.estree : undefined;
}

function isUnistNode(value: unknown): value is UnistNode {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof value.type === "string"
  );
}

function violationKey(violation: ExecutablePolicyViolation) {
  return `${violation.rule}:${violation.identifier ?? ""}`;
}

function staticPropertyName(
  property: MemberExpression["property"] | Property["key"]
) {
  if (property.type === "Identifier") {
    return property.name;
  }
  if (property.type === "Literal" && typeof property.value === "string") {
    return property.value;
  }
  if (
    property.type === "TemplateLiteral" &&
    property.expressions.length === 0
  ) {
    return property.quasis[0]?.value.cooked ?? property.quasis[0]?.value.raw;
  }
}

function memberPropertyName(node: MemberExpression) {
  if (node.computed) {
    return staticPropertyName(node.property);
  }
  return node.property.type === "Identifier" ? node.property.name : undefined;
}

function jsxAttributeName(node: JSXAttribute) {
  return node.name.type === "JSXIdentifier" ? node.name.name : undefined;
}

function inspectSyntaxNode(
  node: EstreeNode,
  add: (violation: ExecutablePolicyViolation) => void
) {
  if (node.type === "ImportExpression") {
    add({ rule: "dynamic-import" });
    return;
  }
  if (node.type === "MemberExpression") {
    const propertyName = memberPropertyName(node);
    if (
      propertyName !== undefined &&
      PROTOTYPE_ESCAPE_PROPERTIES.has(propertyName)
    ) {
      add({ identifier: propertyName, rule: "prototype-chain-access" });
    }
    return;
  }
  if (
    node.type === "JSXAttribute" &&
    jsxAttributeName(node) === "dangerouslySetInnerHTML"
  ) {
    add({
      identifier: "dangerouslySetInnerHTML",
      rule: "dangerous-jsx-attribute",
    });
    return;
  }
  if (
    node.type === "Property" &&
    staticPropertyName(node.key) === "dangerouslySetInnerHTML"
  ) {
    add({
      identifier: "dangerouslySetInnerHTML",
      rule: "dangerous-jsx-attribute",
    });
    return;
  }
  if (
    !(
      (node.type === "CallExpression" || node.type === "NewExpression") &&
      node.callee.type === "Identifier"
    )
  ) {
    return;
  }
  if (node.callee.name === "require") {
    add({ identifier: "require", rule: "require" });
  }
  if (node.callee.name === "eval") {
    add({ identifier: "eval", rule: "eval" });
  }
  if (node.callee.name === "Function") {
    add({ identifier: "Function", rule: "Function" });
  }
}

function inspectProgram(program: Program) {
  const found = new Map<string, ExecutablePolicyViolation>();
  const add = (violation: ExecutablePolicyViolation) => {
    found.set(violationKey(violation), violation);
  };

  visitEstree(program, (node) => inspectSyntaxNode(node, add));

  const scopeManager = analyze(program, {
    ecmaVersion: 2022,
    jsx: true,
    sourceType: "module",
  });
  const { globalScope } = scopeManager;
  if (!globalScope) {
    return [...found.values()];
  }
  for (const reference of globalScope.through) {
    const identifier = reference.identifier.name;
    if (SAFE_GLOBALS.has(identifier)) {
      continue;
    }
    if (identifier === "require") {
      add({ identifier, rule: "require" });
      continue;
    }
    if (identifier === "eval") {
      add({ identifier, rule: "eval" });
      continue;
    }
    if (identifier === "Function") {
      add({ identifier, rule: "Function" });
      continue;
    }
    if (identifier === "process") {
      add({ identifier, rule: "process" });
      continue;
    }
    if (identifier === "globalThis") {
      add({ identifier, rule: "globalThis" });
      continue;
    }
    if (NETWORK_GLOBALS.has(identifier)) {
      add({ identifier, rule: "network-global" });
      continue;
    }
    add({ identifier, rule: "unknown-free-global" });
  }

  return [...found.values()];
}

function appendProgramViolations(
  node: UnistNode,
  violations: ExecutablePolicyViolation[]
) {
  const program = nodeProgram(node);
  if (program) {
    violations.push(...inspectProgram(program));
  }
}

function inspectMdxJsxAttributes(
  node: UnistNode,
  violations: ExecutablePolicyViolation[]
) {
  if (
    !(node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement")
  ) {
    return;
  }
  if (!("attributes" in node && Array.isArray(node.attributes))) {
    return;
  }
  for (const attribute of node.attributes) {
    if (!isUnistNode(attribute)) {
      continue;
    }
    if (
      attribute.type === "mdxJsxAttribute" &&
      "name" in attribute &&
      attribute.name === "dangerouslySetInnerHTML"
    ) {
      violations.push({
        identifier: "dangerouslySetInnerHTML",
        rule: "dangerous-jsx-attribute",
      });
    }
    appendProgramViolations(attribute, violations);
    if ("value" in attribute && isUnistNode(attribute.value)) {
      appendProgramViolations(attribute.value, violations);
    }
  }
}

/** Rejects MDX module syntax and records unsupported executable capabilities. */
export function enforceExecutablePolicy(
  unsupportedModules: UnsupportedMdxModuleOccurrence[],
  violations: ExecutablePolicyViolation[]
): Plugin<[], Root> {
  return () => (tree) => {
    visitUnist(tree, (node) => {
      if (node.type === "mdxjsEsm") {
        return;
      }
      appendProgramViolations(node, violations);
      inspectMdxJsxAttributes(node, violations);
    });

    collectUnsupportedMdxModules(tree, unsupportedModules);
  };
}
