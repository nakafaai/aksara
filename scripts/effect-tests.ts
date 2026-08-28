import ts from "typescript";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
const POLICY_SOURCE_FILE = "/effect-policy.test.ts";
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
      continue;
    }

    if (moduleName === "effect/Effect") {
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
    rootNames: [POLICY_SOURCE_FILE],
  });
  return program.getTypeChecker();
}

type BindingMatches = (
  reference: ts.Identifier,
  binding: ts.Identifier
) => boolean;

/** Lazily resolves import bindings only after runtime-shaped syntax appears. */
function bindingMatcher(sourceFile: ts.SourceFile): BindingMatches {
  let checker: ts.TypeChecker | undefined;
  return (reference, binding) => {
    if (checker === undefined) {
      checker = sourceTypeChecker(sourceFile);
    }
    return (
      checker.getSymbolAtLocation(reference) ===
      checker.getSymbolAtLocation(binding)
    );
  };
}

/** Checks whether one expression references the Effect runtime namespace. */
function isEffectNamespace(
  node: ts.Expression,
  bindings: EffectRuntimeBindings,
  matchesBinding: BindingMatches
) {
  if (ts.isIdentifier(node)) {
    const namespace = bindings.namespaces.get(node.text);
    return namespace !== undefined && matchesBinding(node, namespace);
  }
  if (
    !(
      ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.name.text === "Effect"
    )
  ) {
    return false;
  }
  const module = bindings.modules.get(node.expression.text);
  return module !== undefined && matchesBinding(node.expression, module);
}

/** Checks whether one call directly runs an Effect through the runtime API. */
function isEffectRunner(
  node: ts.Node,
  bindings: EffectRuntimeBindings,
  matchesBinding: BindingMatches
) {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  if (ts.isIdentifier(node.expression)) {
    const importedRunner = bindings.runners.get(node.expression.text);
    return (
      importedRunner !== undefined &&
      matchesBinding(node.expression, importedRunner)
    );
  }
  return (
    ts.isPropertyAccessExpression(node.expression) &&
    EFFECT_RUNNERS.has(node.expression.name.text) &&
    isEffectNamespace(node.expression.expression, bindings, matchesBinding)
  );
}

/** Reports test modules that retain legacy or direct Effect execution. */
export function effectTestViolations(file: string, sourceText: string) {
  if (!TEST_MODULE_PATTERN.test(file)) {
    return [];
  }
  const sourceFile = ts.createSourceFile(
    POLICY_SOURCE_FILE,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  const runtimeBindings = effectRuntimeBindings(sourceFile);
  const matchesBinding = bindingMatcher(sourceFile);
  let importsLegacyAdapter = false;
  let runsEffect = false;
  const nodes: ts.Node[] = [sourceFile];
  for (const node of nodes) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text === "@nakafa/testing/effect"
    ) {
      importsLegacyAdapter = true;
    }
    if (isEffectRunner(node, runtimeBindings, matchesBinding)) {
      runsEffect = true;
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }
  const violations: string[] = [];
  if (importsLegacyAdapter) {
    violations.push(
      `${file}: import Effect test APIs directly from @effect/vitest.`
    );
  }
  if (runsEffect) {
    violations.push(
      `${file}: execute Effects through @effect/vitest instead of Effect.run*.`
    );
  }
  return violations;
}
