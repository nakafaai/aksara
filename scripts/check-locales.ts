import { readFileSync } from "node:fs";

import ts from "typescript";

import { enforceViolations, typescriptFiles } from "#scripts/files";

const LOCALE_CONTRACT_MODULE = "packages/contracts/src/locale.ts";
const HISTORICAL_LOCALE_MODULE = "packages/contracts/src/history/locale.ts";
const LOCALE_POLICY_SCRIPT = "scripts/check-locales.ts";
const LOCALE_VOCABULARY_MODULES = new Set([
  HISTORICAL_LOCALE_MODULE,
  LOCALE_CONTRACT_MODULE,
  LOCALE_POLICY_SCRIPT,
]);
const TEST_SOURCE_PATTERN = /(?:^|\/)(?:test|tests)(?:\/|$)|\.test\.[^.]+$/u;
const localeCodes = new Set(["de", "en", "id"]);

/** Returns a statically declared locale code from one syntax node. */
function localeCode(node: ts.Node): string | undefined {
  const value = ts.isLiteralTypeNode(node) ? node.literal : node;
  if (!(ts.isStringLiteralLike(value) && localeCodes.has(value.text))) {
    return;
  }
  return value.text;
}

/** Checks whether a call names one Effect Schema constructor. */
function isSchemaCall(node: ts.Node, name: string): node is ts.CallExpression {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "Schema" &&
    node.expression.name.text === name
  );
}

/** Returns distinct locale codes declared directly by syntax nodes. */
function declaredLocaleCodes(nodes: readonly ts.Node[]) {
  return new Set(nodes.map(localeCode).filter((value) => value !== undefined));
}

/** Detects one duplicated schema or type-level locale vocabulary. */
function duplicatedLocaleVocabulary(node: ts.Node) {
  if (ts.isUnionTypeNode(node)) {
    return declaredLocaleCodes(node.types).size >= 2;
  }
  if (isSchemaCall(node, "Literal")) {
    return declaredLocaleCodes(node.arguments).size >= 2;
  }
  if (!isSchemaCall(node, "Union")) {
    return false;
  }
  const members = node.arguments.flatMap((argument) =>
    isSchemaCall(argument, "Literal") ? [...argument.arguments] : []
  );
  return declaredLocaleCodes(members).size >= 2;
}

/** Detects a duplicated multi-locale policy array or tuple. */
function duplicatedLocaleList(node: ts.Node) {
  let values: ts.NodeArray<ts.Node> | undefined;
  if (ts.isArrayLiteralExpression(node)) {
    values = node.elements;
  } else if (ts.isTupleTypeNode(node)) {
    values = node.elements;
  }
  if (values === undefined) {
    return false;
  }
  return declaredLocaleCodes(values).size >= 2;
}

/** Reports locale vocabularies that bypass the canonical contract module. */
export function localePolicyViolations(
  file: string,
  sourceText: string
): readonly string[] {
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  const violations: Array<{
    readonly offset: number;
    readonly reason: string;
  }> = [];
  const nodes: ts.Node[] = [sourceFile];
  const ownsLocaleVocabulary = LOCALE_VOCABULARY_MODULES.has(file);
  const allowsConcreteLists = TEST_SOURCE_PATTERN.test(file);

  for (const node of nodes) {
    const duplicatedVocabulary =
      !ownsLocaleVocabulary && duplicatedLocaleVocabulary(node);
    const hardcodedList =
      !(ownsLocaleVocabulary || allowsConcreteLists) &&
      duplicatedLocaleList(node);
    if (duplicatedVocabulary || hardcodedList) {
      const reason = duplicatedVocabulary
        ? "locale vocabulary must derive from the locale contract"
        : "locale lists must derive from the locale contract";
      violations.push({ offset: node.getStart(sourceFile), reason });
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }

  return violations
    .sort((left, right) => left.offset - right.offset)
    .map(({ offset, reason }) => {
      const line = sourceFile.getLineAndCharacterOfPosition(offset).line + 1;
      return `${file}:${line}: ${reason}`;
    });
}

enforceViolations(
  "Locale vocabularies must have one contract source",
  typescriptFiles().flatMap((file) =>
    localePolicyViolations(file, readFileSync(file, "utf8"))
  )
);
