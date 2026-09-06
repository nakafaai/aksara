import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import {
  isBinaryExpression,
  isBindingElement,
  isCallExpression,
  isComputedPropertyName,
  isElementAccessExpression,
  isIdentifier,
  isImportDeclaration,
  isImportSpecifier,
  isNamespaceImport,
  isObjectBindingPattern,
  isPropertyAccessExpression,
  isPropertyAssignment,
  isShorthandPropertyAssignment,
  isStatement,
  isStringLiteral,
  isStringLiteralLikeNode,
  isTypeNode,
  isVariableDeclaration,
  type Node,
  type SourceFile,
  SyntaxKind,
} from "typescript/unstable/ast";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
const LEGACY_ADAPTER = "@nakafa/testing/effect";
const EFFECT_MODULES = new Set(
  "effect effect/Effect effect/ManagedRuntime".split(" ")
);
const EFFECT_RUNNERS = new Set(
  "runCallback runCallbackWith runFork runForkWith runPromise runPromiseExit runPromiseExitWith runPromiseWith runSync runSyncExit runSyncExitWith runSyncWith".split(
    " "
  )
);
const MANAGED_RUNTIME_RUNNERS = new Set(
  "runCallback runFork runPromise runPromiseExit runSync runSyncExit".split(" ")
);

/** Returns value-position descendants while excluding type-only subtrees. */
function descendants(sourceFile: SourceFile) {
  const nodes: Node[] = [sourceFile];
  for (const node of nodes) {
    if (isTypeNode(node)) {
      continue;
    }
    node.forEachChild((child) => {
      nodes.push(child);
    });
  }
  return nodes;
}

/** Returns a statically named module loaded by import syntax. */
function importedModule(node: Node) {
  if (isImportDeclaration(node) && isStringLiteral(node.moduleSpecifier)) {
    return node.moduleSpecifier.text;
  }
  if (
    isCallExpression(node) &&
    node.expression.kind === SyntaxKind.ImportKeyword
  ) {
    const [specifier] = node.arguments;
    return specifier !== undefined && isStringLiteralLikeNode(specifier)
      ? specifier.text
      : undefined;
  }
}

/** Collects imports that expose Effect runtime APIs. */
function runtimeImports(nodes: readonly Node[]) {
  const bindings: string[] = [];
  let legacy = false;
  let runtime = false;
  for (const node of nodes) {
    const moduleName = importedModule(node);
    legacy ||= moduleName === LEGACY_ADAPTER;
    if (moduleName === undefined || !EFFECT_MODULES.has(moduleName)) {
      continue;
    }
    if (!isImportDeclaration(node)) {
      runtime = true;
      continue;
    }
    const clause = node.importClause;
    const namedBindings = clause?.namedBindings;
    if (
      clause === undefined ||
      clause.phaseModifier === SyntaxKind.TypeKeyword ||
      namedBindings === undefined
    ) {
      continue;
    }
    if (isNamespaceImport(namedBindings)) {
      bindings.push(namedBindings.name.text);
      runtime = true;
      continue;
    }
    const named = namedBindings.elements.filter(
      (binding) => !binding.isTypeOnly
    );
    const rootBindings = named.filter((binding) => {
      const name = binding.propertyName?.text ?? binding.name.text;
      return name === "Effect" || name === "ManagedRuntime";
    });
    bindings.push(...rootBindings.map((binding) => binding.name.text));
    runtime ||=
      moduleName === "effect" ? rootBindings.length > 0 : named.length > 0;
  }
  return { bindings, legacy, runtime };
}

/** Returns one statically knowable property name. */
function staticProperty(node: Node, computed = false) {
  const isComputed = computed || isComputedPropertyName(node);
  const property = isComputedPropertyName(node) ? node.expression : node;
  return (!isComputed && isIdentifier(property)) ||
    isStringLiteralLikeNode(property)
    ? property.text
    : undefined;
}

/** Tests whether a property is inside an assignment target. */
function isAssignmentKey(node: Node) {
  let { parent } = node;
  while (!(isStatement(parent) || isVariableDeclaration(parent))) {
    if (
      isBinaryExpression(parent) &&
      parent.operatorToken.kind === SyntaxKind.EqualsToken
    ) {
      return node.pos >= parent.left.pos && node.end <= parent.left.end;
    }
    ({ parent } = parent);
  }
  return false;
}

/** Returns a reserved member or destructuring key. */
function reservedName(node: Node) {
  if (isImportSpecifier(node) && !node.isTypeOnly) {
    const moduleName = importedModule(node.parent.parent.parent);
    const name = node.propertyName?.text ?? node.name.text;
    if (moduleName === "effect/Effect" && EFFECT_RUNNERS.has(name)) {
      return name;
    }
    return moduleName === "effect/ManagedRuntime" &&
      MANAGED_RUNTIME_RUNNERS.has(name)
      ? name
      : undefined;
  }
  if (isPropertyAccessExpression(node)) {
    return node.name.text;
  }
  if (isElementAccessExpression(node)) {
    return staticProperty(node.argumentExpression, true);
  }
  if (
    isBindingElement(node) &&
    node.dotDotDotToken === undefined &&
    isObjectBindingPattern(node.parent)
  ) {
    return node.propertyName === undefined
      ? node.name?.getText()
      : staticProperty(node.propertyName);
  }
  return (isPropertyAssignment(node) || isShorthandPropertyAssignment(node)) &&
    isAssignmentKey(node)
    ? staticProperty(node.name)
    : undefined;
}

/** Reports reserved runner syntax in a value position. */
function hasReservedRunner(
  nodes: readonly Node[],
  bindings: ReadonlySet<string>
) {
  return nodes.some((node) => {
    if (EFFECT_RUNNERS.has(reservedName(node) ?? "")) {
      return true;
    }
    if (
      !isElementAccessExpression(node) ||
      staticProperty(node.argumentExpression, true) !== undefined ||
      !isIdentifier(node.expression)
    ) {
      return false;
    }
    return bindings.has(node.expression.text);
  });
}

/** Reports authored tests that retain the adapter or reserved runners. */
export const effectTestViolations = Effect.fn("AksaraPolicy.effectTests")(
  function* (file: string, sourceText: string) {
    if (!TEST_MODULE_PATTERN.test(file)) {
      return [];
    }
    const parser = yield* TypeScriptParser;
    return yield* parser.inspect(
      { fileName: file, source: sourceText },
      ({ sourceFile }) => {
        const nodes = descendants(sourceFile);
        const imports = runtimeImports(nodes);
        const violations: string[] = [];
        if (imports.legacy) {
          violations.push(
            `${file}: import Effect test APIs directly from @effect/vitest.`
          );
        }
        if (
          imports.runtime &&
          hasReservedRunner(nodes, new Set(imports.bindings))
        ) {
          violations.push(
            `${file}: use @effect/vitest instead of Effect runtime runners.`
          );
        }
        return violations;
      }
    );
  }
);
