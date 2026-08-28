import ts from "typescript";

import { hasExecutedEffectRunner } from "#scripts/effect-execution";

const TEST_MODULE_PATTERN = /\.test\.ts$/u;
const POLICY_SOURCE_FILE = "/effect-policy.test.ts";

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
  const importsLegacyAdapter = sourceFile.statements.some(
    (statement) =>
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text === "@nakafa/testing/effect"
  );
  const runsEffect = hasExecutedEffectRunner(sourceFile);
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
