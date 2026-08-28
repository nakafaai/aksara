import ts from "typescript";

import { hasEffectRunnerReference } from "#scripts/effect-execution";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
const POLICY_SOURCE_FILE = "/effect-policy.test.ts";

/** Reports test modules that retain the adapter or runtime runner references. */
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
  const importsLegacyAdapter = sourceFile.statements.some(
    (statement) =>
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === "@nakafa/testing/effect"
  );
  const referencesRunner = hasEffectRunnerReference(sourceFile);
  const violations: string[] = [];
  if (importsLegacyAdapter) {
    violations.push(
      `${file}: import Effect test APIs directly from @effect/vitest.`
    );
  }
  if (referencesRunner) {
    violations.push(
      `${file}: use @effect/vitest instead of Effect runtime runners.`
    );
  }
  return violations;
}
