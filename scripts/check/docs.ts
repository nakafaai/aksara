import { readFileSync } from "node:fs";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import {
  type Expression,
  isArrowFunction,
  isCallExpression,
  isConstructorDeclaration,
  isFunctionDeclaration,
  isFunctionExpression,
  isFunctionTypeNode,
  isGetAccessorDeclaration,
  isIdentifier,
  isJSDoc,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isPropertyAccessExpression,
  isPropertyAssignment,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isSetAccessorDeclaration,
  isVariableDeclaration,
  type Node,
  type SourceFile,
} from "typescript/unstable/ast";

import { enforceViolations, typescriptFiles } from "#scripts/check/files";

const WHITESPACE_PATTERN = /\s+/u;
const MINIMUM_DOCUMENTATION_WORDS = 3;

/** Detects bindings created by Effect's named function factory. */
function isEffectFunctionFactory(node: Node): boolean {
  if (!isCallExpression(node)) {
    return false;
  }
  const { expression } = node;
  if (
    isPropertyAccessExpression(expression) &&
    isIdentifier(expression.expression) &&
    expression.expression.text === "Effect" &&
    expression.name.text === "fn"
  ) {
    return true;
  }
  return isCallExpression(expression) && isEffectFunctionFactory(expression);
}

/** Reports whether an initializer creates a named callable binding. */
function isCallableInitializer(node: Expression): boolean {
  return (
    isArrowFunction(node) ||
    isFunctionExpression(node) ||
    isEffectFunctionFactory(node)
  );
}

/** Finds the syntax node that owns leading JSDoc for a declaration. */
function documentationOwner(node: Node): Node {
  if (isVariableDeclaration(node)) {
    return node.parent.parent;
  }
  return node;
}

/** Extracts prose from leading JSDoc while ignoring tags and delimiters. */
function documentationText(node: Node, sourceFile: SourceFile): string {
  return (documentationOwner(node).jsDoc ?? [])
    .filter(isJSDoc)
    .map((doc) => doc.getText(sourceFile))
    .join("\n")
    .replaceAll("/**", "")
    .replaceAll("*/", "")
    .replace(/^\s*\*\s?/gmu, "")
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("@"))
    .join(" ")
    .trim();
}

/** Reports whether a declaration has a short but meaningful JSDoc summary. */
function hasUsefulDocumentation(node: Node, sourceFile: SourceFile): boolean {
  const words = documentationText(node, sourceFile)
    .split(WHITESPACE_PATTERN)
    .filter((word) => word.length > 0);
  return words.length >= MINIMUM_DOCUMENTATION_WORDS;
}

/** Returns the stable name for one callable declaration when it has one. */
function callableName(node: Node, sourceFile: SourceFile): string | undefined {
  if (isFunctionDeclaration(node) && node.name) {
    return node.name.text;
  }
  if (isConstructorDeclaration(node)) {
    return "constructor";
  }
  if (
    isMethodDeclaration(node) ||
    isMethodSignatureDeclaration(node) ||
    isGetAccessorDeclaration(node) ||
    isSetAccessorDeclaration(node)
  ) {
    return node.name.getText(sourceFile);
  }
  if (
    isPropertyDeclaration(node) &&
    node.initializer &&
    isCallableInitializer(node.initializer)
  ) {
    return node.name.getText(sourceFile);
  }
  if (isPropertyAssignment(node) && isEffectFunctionFactory(node.initializer)) {
    return node.name.getText(sourceFile);
  }
  if (
    isPropertySignatureDeclaration(node) &&
    node.type &&
    isFunctionTypeNode(node.type)
  ) {
    return node.name.getText(sourceFile);
  }
  if (
    isVariableDeclaration(node) &&
    isIdentifier(node.name) &&
    node.initializer &&
    isCallableInitializer(node.initializer)
  ) {
    return node.name.text;
  }
}

/** Collects stable callable declarations that lack useful JSDoc. */
export const missingDocumentation = Effect.fn(
  "AksaraPolicy.missingDocumentation"
)(function* (file: string, sourceText: string) {
  const parser = yield* TypeScriptParser;
  return yield* parser.inspect(
    { fileName: file, source: sourceText },
    ({ sourceFile }) => {
      const missing: string[] = [];
      const nodes: Node[] = [sourceFile];

      for (const node of nodes) {
        const name = callableName(node, sourceFile);
        if (name && !hasUsefulDocumentation(node, sourceFile)) {
          const line =
            sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
          missing.push(`${file}:${line} ${name}`);
        }
        node.forEachChild((child) => {
          nodes.push(child);
        });
      }

      return missing;
    }
  );
});

/** Collects missing JSDoc diagnostics from authored TypeScript source files. */
export const documentationViolations = Effect.fn("AksaraPolicy.documentation")(
  function* (files: readonly string[], readSource: (file: string) => string) {
    const violations = yield* Effect.forEach(files, (file) =>
      Effect.try({
        catch: (cause) => new TypeScriptSourceError({ cause, fileName: file }),
        try: () => readSource(file),
      }).pipe(Effect.flatMap((source) => missingDocumentation(file, source)))
    );
    return violations.flat();
  }
);

const violations = await Effect.runPromise(
  documentationViolations(typescriptFiles(), (file) =>
    readFileSync(file, "utf8")
  ).pipe(Effect.provide(TypeScriptParser.layer))
);
enforceViolations("Named callables require useful JSDoc", violations);
