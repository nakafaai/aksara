import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, FileSystem } from "effect";
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

import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import { syntaxNodes } from "#scripts/check/syntax";
import { runEntry } from "#scripts/entry";

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
  const docs = Arr.filter(documentationOwner(node).jsDoc ?? [], isJSDoc);
  const text = Arr.join(
    Arr.map(docs, (doc) => doc.getText(sourceFile)),
    "\n"
  )
    .replaceAll("/**", "")
    .replaceAll("*/", "")
    .replace(/^\s*\*\s?/gmu, "");
  return Arr.join(
    Arr.filter(text.split("\n"), (line) => !line.trimStart().startsWith("@")),
    " "
  ).trim();
}

/** Reports whether a declaration has a short but meaningful JSDoc summary. */
function hasUsefulDocumentation(node: Node, sourceFile: SourceFile): boolean {
  const words = Arr.filter(
    documentationText(node, sourceFile).split(WHITESPACE_PATTERN),
    (word) => word.length > 0
  );
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

/** Describes one callable declaration that lacks useful JSDoc, if it is one. */
function missingDeclaration(
  file: string,
  node: Node,
  sourceFile: SourceFile
): readonly string[] {
  const name = callableName(node, sourceFile);
  if (!name || hasUsefulDocumentation(node, sourceFile)) {
    return [];
  }
  const line =
    sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
  return [`${file}:${line} ${name}`];
}

/** Collects stable callable declarations that lack useful JSDoc. */
export const missingDocumentation = Effect.fn(
  "AksaraPolicy.missingDocumentation"
)(function* (file: string, sourceText: string) {
  const parser = yield* TypeScriptParser;
  return yield* parser.inspect(
    { fileName: file, source: sourceText },
    ({ sourceFile }) =>
      Arr.flatMap(syntaxNodes(sourceFile), (node) =>
        missingDeclaration(file, node, sourceFile)
      )
  );
});

/** Collects missing JSDoc diagnostics from authored TypeScript source files. */
export const documentationViolations = Effect.fn("AksaraPolicy.documentation")(
  function* (
    files: readonly string[],
    readSource: (file: string) => Effect.Effect<string, unknown>
  ) {
    const violations = yield* Effect.forEach(files, (file) =>
      readSource(file).pipe(
        Effect.mapError(
          (cause) => new TypeScriptSourceError({ cause, fileName: file })
        ),
        Effect.flatMap((source) => missingDocumentation(file, source))
      )
    );
    return Arr.flatten(violations);
  }
);

/** Reports every named callable without useful JSDoc in the given modules. */
export const documentationReport = Effect.fn(
  "AksaraPolicy.documentationReport"
)(function* (files: readonly string[]) {
  const fileSystem = yield* FileSystem.FileSystem;
  const violations = yield* documentationViolations(files, (file) =>
    fileSystem.readFileString(file)
  );
  enforceViolations("Named callables require useful JSDoc", violations);
});

runEntry(
  import.meta.main,
  trackedFiles().pipe(
    Effect.map(typescriptFiles),
    Effect.flatMap(documentationReport),
    Effect.provide(TypeScriptParser.layer)
  )
);
