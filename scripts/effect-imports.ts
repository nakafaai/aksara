import ts from "typescript";

export const EFFECT_RUNNERS = new Set([
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

export type RuntimeKind = "module" | "namespace" | "runner";

export interface EffectRuntimeBindings {
  readonly modules: ReadonlyMap<string, ts.Identifier>;
  readonly namespaces: ReadonlyMap<string, ts.Identifier>;
  readonly runners: ReadonlyMap<string, ts.Identifier>;
}

type NamedImportBindings = ts.NamespaceImport | ts.NamedImports;

/** Registers bindings imported from the root Effect package. */
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
    if (binding.isTypeOnly) {
      continue;
    }
    const importedName = binding.propertyName?.text ?? binding.name.text;
    if (importedName === "Effect") {
      namespaces.set(binding.name.text, binding.name);
    }
  }
}

/** Registers bindings imported from the Effect API module. */
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
    if (binding.isTypeOnly) {
      continue;
    }
    const importedName = binding.propertyName?.text ?? binding.name.text;
    if (EFFECT_RUNNERS.has(importedName)) {
      runners.set(binding.name.text, binding.name);
    }
  }
}

/** Collects static imports that expose the Effect runtime API. */
export function effectRuntimeBindings(sourceFile: ts.SourceFile) {
  const modules = new Map<string, ts.Identifier>();
  const namespaces = new Map<string, ts.Identifier>();
  const runners = new Map<string, ts.Identifier>();
  for (const statement of sourceFile.statements) {
    if (
      !(
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.importClause?.namedBindings &&
        !statement.importClause.isTypeOnly
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
  return {
    modules,
    namespaces,
    runners,
  } satisfies EffectRuntimeBindings;
}

/** Resolves a statically named dynamic Effect import. */
export function dynamicRuntimeKind(node: ts.Node): RuntimeKind | undefined {
  if (
    !ts.isCallExpression(node) ||
    node.expression.kind !== ts.SyntaxKind.ImportKeyword ||
    node.arguments.length === 0
  ) {
    return;
  }
  const [specifier] = node.arguments;
  if (
    specifier === undefined ||
    !(
      ts.isStringLiteral(specifier) ||
      ts.isNoSubstitutionTemplateLiteral(specifier)
    )
  ) {
    return;
  }
  if (specifier.text === "effect") {
    return "module";
  }
  return specifier.text === "effect/Effect" ? "namespace" : undefined;
}

/** Resolves lexical symbols inside the parsed policy source. */
export function sourceSymbols(sourceFile: ts.SourceFile) {
  const options = {
    noLib: true,
    noResolve: true,
    target: ts.ScriptTarget.Latest,
  } satisfies ts.CompilerOptions;
  const host = ts.createCompilerHost(options, true);
  host.getSourceFile = () => sourceFile;
  const checker = ts
    .createProgram({
      host,
      options,
      rootNames: [sourceFile.fileName],
    })
    .getTypeChecker();
  return {
    matchesBinding: (reference: ts.Identifier, binding: ts.Identifier) =>
      checker.getSymbolAtLocation(reference) ===
      checker.getSymbolAtLocation(binding),
    symbolAt: (node: ts.Identifier) => checker.getSymbolAtLocation(node),
  };
}

export type SourceSymbols = ReturnType<typeof sourceSymbols>;
