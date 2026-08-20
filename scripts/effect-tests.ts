import ts from "typescript";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
const EFFECT_RUNNERS = new Set([
  "runFork",
  "runPromise",
  "runPromiseExit",
  "runSync",
  "runSyncExit",
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

/** Reports Effect runtime tests that bypass the shared Effect Vitest adapter. */
export function effectTestAdapterViolations(file: string, sourceText: string) {
  if (!TEST_MODULE_PATTERN.test(file)) {
    return [];
  }
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  let importsEffectAdapter = false;
  let runsEffect = false;
  const nodes: ts.Node[] = [sourceFile];
  for (const node of nodes) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text === "@nakafa/testing/effect"
    ) {
      importsEffectAdapter = true;
    }
    if (isEffectRunner(node)) {
      runsEffect = true;
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }
  if (!runsEffect || importsEffectAdapter) {
    return [];
  }
  return [`${file}: Effect runtime tests must import @nakafa/testing/effect.`];
}
