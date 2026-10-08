import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, HashSet } from "effect";
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
  isVariableDeclaration,
  type Node,
  SyntaxKind,
} from "typescript/unstable/ast";
import { syntaxNodes } from "#scripts/imports/syntax";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
const LEGACY_ADAPTER = "@nakafa/testing/effect";
const EFFECT_MODULES = HashSet.fromIterable(
  "effect effect/Effect effect/ManagedRuntime".split(" ")
);
const EFFECT_RUNNERS = HashSet.fromIterable(
  "runCallback runCallbackWith runFork runForkWith runPromise runPromiseExit runPromiseExitWith runPromiseWith runSync runSyncExit runSyncExitWith runSyncWith".split(
    " "
  )
);
const MANAGED_RUNTIME_RUNNERS = HashSet.fromIterable(
  "runCallback runFork runPromise runPromiseExit runSync runSyncExit".split(" ")
);

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

/** Returns the Effect runtime bindings that one module syntax node exposes, and whether it loads the runtime. */
function runtimeContribution(node: Node) {
  const moduleName = importedModule(node);
  if (moduleName === undefined || !HashSet.has(EFFECT_MODULES, moduleName)) {
    return { bindings: [], runtime: false };
  }
  if (!isImportDeclaration(node)) {
    return { bindings: [], runtime: true };
  }
  const clause = node.importClause;
  const namedBindings = clause?.namedBindings;
  if (
    clause === undefined ||
    clause.phaseModifier === SyntaxKind.TypeKeyword ||
    namedBindings === undefined
  ) {
    return { bindings: [], runtime: false };
  }
  if (isNamespaceImport(namedBindings)) {
    return { bindings: [namedBindings.name.text], runtime: true };
  }
  const named = Arr.filter(
    namedBindings.elements,
    (binding) => !binding.isTypeOnly
  );
  const rootBindings = Arr.filter(named, (binding) => {
    const name = binding.propertyName?.text ?? binding.name.text;
    return name === "Effect" || name === "ManagedRuntime";
  });
  return {
    bindings: Arr.map(rootBindings, (binding) => binding.name.text),
    runtime:
      moduleName === "effect" ? rootBindings.length > 0 : named.length > 0,
  };
}

/** Collects imports that expose Effect runtime APIs. */
function runtimeImports(nodes: readonly Node[]) {
  const contributions = Arr.map(nodes, runtimeContribution);
  return {
    bindings: Arr.flatMap(contributions, ({ bindings }) => bindings),
    legacy: Arr.some(nodes, (node) => importedModule(node) === LEGACY_ADAPTER),
    runtime: Arr.some(contributions, ({ runtime }) => runtime),
  };
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
    if (moduleName === "effect/Effect" && HashSet.has(EFFECT_RUNNERS, name)) {
      return name;
    }
    return moduleName === "effect/ManagedRuntime" &&
      HashSet.has(MANAGED_RUNTIME_RUNNERS, name)
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
  bindings: HashSet.HashSet<string>
) {
  return Arr.some(nodes, (node) => {
    if (HashSet.has(EFFECT_RUNNERS, reservedName(node) ?? "")) {
      return true;
    }
    if (
      !isElementAccessExpression(node) ||
      staticProperty(node.argumentExpression, true) !== undefined ||
      !isIdentifier(node.expression)
    ) {
      return false;
    }
    return HashSet.has(bindings, node.expression.text);
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
        const nodes = syntaxNodes(sourceFile, true);
        const imports = runtimeImports(nodes);
        return [
          ...(imports.legacy
            ? [`${file}: import Effect test APIs directly from @effect/vitest.`]
            : []),
          ...(imports.runtime &&
          hasReservedRunner(nodes, HashSet.fromIterable(imports.bindings))
            ? [`${file}: use @effect/vitest instead of Effect runtime runners.`]
            : []),
        ];
      }
    );
  }
);
