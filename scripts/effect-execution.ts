import ts from "typescript";

const EFFECT_RUNNERS = new Set([
  "runCallback",
  "runCallbackWith",
  "runFork",
  "runForkWith",
  "runPromise",
  "runPromiseExit",
  "runPromiseExitWith",
  "runPromiseWith",
  "runSync",
  "runSyncExit",
  "runSyncExitWith",
  "runSyncWith",
]);

interface EffectRuntimeBindings {
  readonly modules: ReadonlyMap<string, ts.Identifier>;
  readonly namespaces: ReadonlyMap<string, ts.Identifier>;
  readonly runners: ReadonlyMap<string, ts.Identifier>;
}

type NamedImportBindings = ts.NamespaceImport | ts.NamedImports;
type RuntimeKind = "module" | "namespace" | "runner";

/** Registers local identifiers imported from the root Effect package. */
function registerEffectPackage(
  bindings: NamedImportBindings,
  modules: Map<string, ts.Identifier>,
  namespaces: Map<string, ts.Identifier>
) {
  if (ts.isNamespaceImport(bindings)) {
    modules.set(bindings.name.text, bindings.name);
    return;
  }
  for (const binding of bindings.elements) {
    const importedName = binding.propertyName?.text ?? binding.name.text;
    if (importedName === "Effect") {
      namespaces.set(binding.name.text, binding.name);
    }
  }
}

/** Registers local identifiers imported from the Effect API module. */
function registerEffectModule(
  bindings: NamedImportBindings,
  namespaces: Map<string, ts.Identifier>,
  runners: Map<string, ts.Identifier>
) {
  if (ts.isNamespaceImport(bindings)) {
    namespaces.set(bindings.name.text, bindings.name);
    return;
  }
  for (const binding of bindings.elements) {
    const importedName = binding.propertyName?.text ?? binding.name.text;
    if (EFFECT_RUNNERS.has(importedName)) {
      runners.set(binding.name.text, binding.name);
    }
  }
}

/** Collects local identifiers that expose the Effect runtime API. */
function effectRuntimeBindings(sourceFile: ts.SourceFile) {
  const modules = new Map<string, ts.Identifier>();
  const namespaces = new Map<string, ts.Identifier>();
  const runners = new Map<string, ts.Identifier>();
  for (const statement of sourceFile.statements) {
    if (
      !(
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.importClause?.namedBindings
      )
    ) {
      continue;
    }
    const moduleName = statement.moduleSpecifier.text;
    const bindings = statement.importClause.namedBindings;
    if (moduleName === "effect") {
      registerEffectPackage(bindings, modules, namespaces);
    } else if (moduleName === "effect/Effect") {
      registerEffectModule(bindings, namespaces, runners);
    }
  }
  return { modules, namespaces, runners } satisfies EffectRuntimeBindings;
}

/** Creates symbol resolution for the parsed policy source. */
function sourceTypeChecker(sourceFile: ts.SourceFile) {
  const options = {
    noLib: true,
    noResolve: true,
    target: ts.ScriptTarget.Latest,
  } satisfies ts.CompilerOptions;
  const host = ts.createCompilerHost(options, true);
  host.getSourceFile = () => sourceFile;
  const program = ts.createProgram({
    host,
    options,
    rootNames: [sourceFile.fileName],
  });
  return program.getTypeChecker();
}

/** Lazily resolves symbols only after runtime-shaped syntax appears. */
function sourceSymbols(sourceFile: ts.SourceFile) {
  let checker: ts.TypeChecker | undefined;
  /** Reuses one TypeScript checker for every symbol in this source. */
  const typeChecker = () => {
    if (checker === undefined) {
      checker = sourceTypeChecker(sourceFile);
    }
    return checker;
  };
  return {
    matchesBinding: (reference: ts.Identifier, binding: ts.Identifier) =>
      typeChecker().getSymbolAtLocation(reference) ===
      typeChecker().getSymbolAtLocation(binding),
    symbolAt: (identifier: ts.Identifier) =>
      typeChecker().getSymbolAtLocation(identifier),
  };
}

type SourceSymbols = ReturnType<typeof sourceSymbols>;

interface StaticMember {
  readonly name: string;
  readonly receiver: ts.Expression;
}

/** Extracts a statically named property or element access. */
function staticMember(node: ts.Expression): StaticMember | undefined {
  if (ts.isPropertyAccessExpression(node)) {
    return { name: node.name.text, receiver: node.expression };
  }
  if (
    !ts.isElementAccessExpression(node) ||
    node.argumentExpression === undefined ||
    !(
      ts.isStringLiteral(node.argumentExpression) ||
      ts.isNoSubstitutionTemplateLiteral(node.argumentExpression)
    )
  ) {
    return;
  }
  return { name: node.argumentExpression.text, receiver: node.expression };
}

/** Resolves one identifier when it is an imported Effect runtime binding. */
function importedRuntimeKind(
  identifier: ts.Identifier,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols
): RuntimeKind | undefined {
  const candidates = [
    [bindings.modules, "module"],
    [bindings.namespaces, "namespace"],
    [bindings.runners, "runner"],
  ] as const;
  for (const [runtimeBindings, kind] of candidates) {
    const binding = runtimeBindings.get(identifier.text);
    if (binding !== undefined && symbols.matchesBinding(identifier, binding)) {
      return kind;
    }
  }
}

/** Resolves a destructured Effect runtime binding to its source. */
function destructuredRuntimeKind(
  binding: ts.BindingElement,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols,
  seenSymbols: Set<ts.Symbol>
): RuntimeKind | undefined {
  if (
    !(
      ts.isObjectBindingPattern(binding.parent) &&
      ts.isVariableDeclaration(binding.parent.parent)
    ) ||
    binding.parent.parent.initializer === undefined
  ) {
    return;
  }
  const bindingProperty = binding.propertyName ?? binding.name;
  const property = ts.isComputedPropertyName(bindingProperty)
    ? bindingProperty.expression
    : bindingProperty;
  if (!(ts.isIdentifier(property) || ts.isStringLiteral(property))) {
    return;
  }
  const sourceKind = runtimeReferenceKind(
    binding.parent.parent.initializer,
    bindings,
    symbols,
    seenSymbols
  );
  if (sourceKind === "module" && property.text === "Effect") {
    return "namespace";
  }
  if (sourceKind === "namespace" && EFFECT_RUNNERS.has(property.text)) {
    return "runner";
  }
}

/** Traces each local runtime origin at most once per reference. */
function runtimeReferenceKind(
  node: ts.Expression,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols,
  seenSymbols = new Set<ts.Symbol>()
): RuntimeKind | undefined {
  if (!ts.isIdentifier(node)) {
    const member = staticMember(node);
    if (member === undefined) {
      return;
    }
    const receiverKind = runtimeReferenceKind(
      member.receiver,
      bindings,
      symbols,
      seenSymbols
    );
    if (receiverKind === "module" && member.name === "Effect") {
      return "namespace";
    }
    if (receiverKind === "namespace" && EFFECT_RUNNERS.has(member.name)) {
      return "runner";
    }
    return;
  }
  const importedKind = importedRuntimeKind(node, bindings, symbols);
  if (importedKind !== undefined) {
    return importedKind;
  }
  const symbol = symbols.symbolAt(node);
  if (symbol === undefined || seenSymbols.has(symbol)) {
    return;
  }
  seenSymbols.add(symbol);
  const declaration = symbol.valueDeclaration;
  let resolvedKind: RuntimeKind | undefined;
  if (
    declaration !== undefined &&
    ts.isVariableDeclaration(declaration) &&
    declaration.initializer !== undefined
  ) {
    resolvedKind = runtimeReferenceKind(
      declaration.initializer,
      bindings,
      symbols,
      seenSymbols
    );
  } else if (declaration !== undefined && ts.isBindingElement(declaration)) {
    resolvedKind = destructuredRuntimeKind(
      declaration,
      bindings,
      symbols,
      seenSymbols
    );
  }
  seenSymbols.delete(symbol);
  return resolvedKind;
}

/** Checks whether one call executes an imported Effect runtime runner. */
function isEffectRunner(
  node: ts.Node,
  bindings: EffectRuntimeBindings,
  symbols: SourceSymbols
) {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  if (runtimeReferenceKind(node.expression, bindings, symbols) === "runner") {
    return true;
  }
  const callee = staticMember(node.expression);
  return (
    callee?.name === "pipe" &&
    node.arguments.some(
      (argument) =>
        runtimeReferenceKind(argument, bindings, symbols) === "runner"
    )
  );
}

/** Reports whether authored test code executes an Effect runtime runner. */
export function hasExecutedEffectRunner(sourceFile: ts.SourceFile) {
  const runtimeBindings = effectRuntimeBindings(sourceFile);
  if (
    runtimeBindings.modules.size === 0 &&
    runtimeBindings.namespaces.size === 0 &&
    runtimeBindings.runners.size === 0
  ) {
    return false;
  }
  const symbols = sourceSymbols(sourceFile);
  const nodes: ts.Node[] = [sourceFile];
  for (const node of nodes) {
    if (isEffectRunner(node, runtimeBindings, symbols)) {
      return true;
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }
  return false;
}
