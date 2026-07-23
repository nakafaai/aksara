import { Predicate } from "effect";
import { analyze } from "eslint-scope";
import type { Node as EstreeNode, JSXAttribute, Program } from "estree-jsx";
import { visit as visitEstree } from "estree-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { Node as UnistNode } from "unist";
import { visit as visitUnist } from "unist-util-visit";
import { readNodeProgram } from "#compiler/ast/program";
import type {
  ExecutablePolicyViolation,
  UnsupportedMdxModuleOccurrence,
} from "#compiler/errors";
import { collectUnsupportedMdxModules } from "#compiler/module-policy";
import { inspectPropertyProgram } from "#compiler/property-policy";

const NETWORK_GLOBALS = new Set(["fetch", "WebSocket", "EventSource"]);
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
  "undefined",
]);
/** Revision bound into artifact fingerprints whenever executable policy changes. */
export const EXECUTABLE_POLICY_REVISION = "trusted-mdx-policy-v6";
/** Narrows unknown values to the minimal unified node contract. */
function isUnistNode(value: unknown): value is UnistNode {
  return (
    Predicate.isRecord(value) &&
    "type" in value &&
    typeof value.type === "string"
  );
}
/** Builds the stable deduplication key for one policy violation. */
function violationKey(violation: ExecutablePolicyViolation) {
  return `${violation.rule}:${violation.identifier ?? ""}`;
}
/** Resolves simple JSX attribute names while excluding namespaced forms. */
function jsxAttributeName(node: JSXAttribute) {
  return node.name.type === "JSXIdentifier" ? node.name.name : undefined;
}

/** Records executable capabilities visible directly in one ESTree node. */
function inspectSyntaxNode(
  node: EstreeNode,
  add: (violation: ExecutablePolicyViolation) => void
) {
  if (node.type === "ImportExpression") {
    add({ rule: "dynamic-import" });
    return;
  }
  if (
    node.type === "MetaProperty" &&
    node.meta.name === "import" &&
    node.property.name === "meta"
  ) {
    add({ identifier: "import.meta", rule: "import-meta" });
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

/** Finds forbidden syntax and unresolved runtime globals in one program. */
function inspectProgram(
  program: Program,
  allowedComponents: ReadonlySet<string>
) {
  const found = new Map<string, ExecutablePolicyViolation>();
  /** Adds one violation using its stable identity to remove duplicates. */
  const add = (violation: ExecutablePolicyViolation) => {
    found.set(violationKey(violation), violation);
  };

  for (const violation of inspectPropertyProgram(program)) {
    add(violation);
  }
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
    if (allowedComponents.has(identifier)) {
      continue;
    }
    add({ identifier, rule: "unknown-free-global" });
  }

  return [...found.values()];
}

/** Appends violations from an ESTree program attached to a unified node. */
function appendProgramViolations(
  node: UnistNode,
  allowedComponents: ReadonlySet<string>,
  violations: ExecutablePolicyViolation[]
) {
  const program = readNodeProgram(node);
  if (program) {
    violations.push(...inspectProgram(program, allowedComponents));
  }
}

/** Inspects MDX JSX attributes and their embedded expression programs. */
function inspectMdxJsxAttributes(
  node: UnistNode,
  allowedComponents: ReadonlySet<string>,
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
    appendProgramViolations(attribute, allowedComponents, violations);
    if ("value" in attribute && isUnistNode(attribute.value)) {
      appendProgramViolations(attribute.value, allowedComponents, violations);
    }
  }
}

/** Rejects MDX module syntax and records unsupported executable capabilities. */
export function enforceExecutablePolicy(
  allowedComponents: ReadonlySet<string>,
  unsupportedModules: UnsupportedMdxModuleOccurrence[],
  violations: ExecutablePolicyViolation[]
): Plugin<[], Root> {
  return () => (tree) => {
    visitUnist(tree, (node) => {
      if (node.type === "mdxjsEsm") {
        return;
      }
      appendProgramViolations(node, allowedComponents, violations);
      inspectMdxJsxAttributes(node, allowedComponents, violations);
    });

    collectUnsupportedMdxModules(tree, unsupportedModules);
  };
}
