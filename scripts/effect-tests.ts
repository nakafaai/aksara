import ts from "typescript";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
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

/** Checks whether one call directly runs an Effect through the runtime API. */
function isEffectRunner(node: ts.Node) {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "Effect" &&
    EFFECT_RUNNERS.has(node.expression.name.text)
  );
}

/** Reports test modules that retain legacy or direct Effect execution. */
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
    if (isEffectRunner(node)) {
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
