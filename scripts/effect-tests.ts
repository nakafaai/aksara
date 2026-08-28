import ts from "typescript";

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
function descendants(sourceFile: ts.SourceFile) {
  const nodes: ts.Node[] = [sourceFile];
  for (const node of nodes) {
    if (ts.isTypeNode(node)) {
      continue;
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }
  return nodes;
}

/** Returns a statically named module loaded by import syntax. */
function importedModule(node: ts.Node) {
  if (
    ts.isImportDeclaration(node) &&
    ts.isStringLiteral(node.moduleSpecifier)
  ) {
    return node.moduleSpecifier.text;
  }
  if (
    ts.isCallExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ImportKeyword
  ) {
    const [specifier] = node.arguments;
    return specifier !== undefined && ts.isStringLiteralLike(specifier)
      ? specifier.text
      : undefined;
  }
}

/** Collects imports that expose Effect runtime APIs. */
function runtimeImports(nodes: readonly ts.Node[]) {
  const bindings: string[] = [];
  let legacy = false;
  let runtime = false;
  for (const node of nodes) {
    const moduleName = importedModule(node);
    legacy ||= moduleName === LEGACY_ADAPTER;
    if (moduleName === undefined || !EFFECT_MODULES.has(moduleName)) {
      continue;
    }
    if (!ts.isImportDeclaration(node)) {
      runtime = true;
      continue;
    }
    const clause = node.importClause;
    const namedBindings = clause?.namedBindings;
    if (clause?.isTypeOnly !== false || namedBindings === undefined) {
      continue;
    }
    if (ts.isNamespaceImport(namedBindings)) {
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
function staticProperty(node: ts.Node, computed = false) {
  const isComputed = computed || ts.isComputedPropertyName(node);
  const property = ts.isComputedPropertyName(node) ? node.expression : node;
  return (!isComputed && ts.isIdentifier(property)) ||
    ts.isStringLiteralLike(property)
    ? property.text
    : undefined;
}

/** Tests whether a property is inside an assignment target. */
function isAssignmentKey(node: ts.Node) {
  let { parent } = node;
  while (!(ts.isStatement(parent) || ts.isVariableDeclaration(parent))) {
    if (
      ts.isBinaryExpression(parent) &&
      parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
    ) {
      return node.pos >= parent.left.pos && node.end <= parent.left.end;
    }
    ({ parent } = parent);
  }
  return false;
}

/** Returns a reserved member or destructuring key. */
function reservedName(node: ts.Node) {
  if (ts.isImportSpecifier(node) && !node.isTypeOnly) {
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
  if (ts.isPropertyAccessExpression(node)) {
    return node.name.text;
  }
  if (ts.isElementAccessExpression(node)) {
    return staticProperty(node.argumentExpression, true);
  }
  if (
    ts.isBindingElement(node) &&
    node.dotDotDotToken === undefined &&
    ts.isObjectBindingPattern(node.parent)
  ) {
    return node.propertyName === undefined
      ? node.name.getText()
      : staticProperty(node.propertyName);
  }
  return (ts.isPropertyAssignment(node) ||
    ts.isShorthandPropertyAssignment(node)) &&
    isAssignmentKey(node)
    ? staticProperty(node.name)
    : undefined;
}

/** Reports reserved runner syntax in a value position. */
function hasReservedRunner(
  nodes: readonly ts.Node[],
  bindings: ReadonlySet<string>
) {
  return nodes.some((node) => {
    if (EFFECT_RUNNERS.has(reservedName(node) ?? "")) {
      return true;
    }
    if (
      !ts.isElementAccessExpression(node) ||
      staticProperty(node.argumentExpression, true) !== undefined ||
      !ts.isIdentifier(node.expression)
    ) {
      return false;
    }
    return bindings.has(node.expression.text);
  });
}

/** Reports authored tests that retain the adapter or reserved runners. */
export function effectTestViolations(file: string, sourceText: string) {
  if (!TEST_MODULE_PATTERN.test(file)) {
    return [];
  }
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  const nodes = descendants(sourceFile);
  const imports = runtimeImports(nodes);
  const violations: string[] = [];
  if (imports.legacy) {
    violations.push(
      `${file}: import Effect test APIs directly from @effect/vitest.`
    );
  }
  if (imports.runtime && hasReservedRunner(nodes, new Set(imports.bindings))) {
    violations.push(
      `${file}: use @effect/vitest instead of Effect runtime runners.`
    );
  }
  return violations;
}
