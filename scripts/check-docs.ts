import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const SOURCE_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;
const WHITESPACE_PATTERN = /\s+/u;
const MINIMUM_DOCUMENTATION_WORDS = 3;

/** Lists authored TypeScript files that require documentation. */
function sourceFiles(): string[] {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  )
    .split("\n")
    .filter(
      (file) =>
        file.length > 0 &&
        existsSync(file) &&
        SOURCE_PATTERN.test(file) &&
        !GENERATED_PATH_PATTERN.test(file)
    );
}

/** Detects bindings created by Effect's named function factory. */
function isEffectFunctionFactory(node: ts.Node): boolean {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  const { expression } = node;
  if (
    ts.isPropertyAccessExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    expression.expression.text === "Effect" &&
    expression.name.text === "fn"
  ) {
    return true;
  }
  return ts.isCallExpression(expression) && isEffectFunctionFactory(expression);
}

/** Reports whether an initializer creates a named callable binding. */
function isCallableInitializer(node: ts.Expression): boolean {
  return (
    ts.isArrowFunction(node) ||
    ts.isFunctionExpression(node) ||
    isEffectFunctionFactory(node)
  );
}

/** Finds the syntax node that owns leading JSDoc for a declaration. */
function documentationOwner(node: ts.Node): ts.Node {
  if (ts.isVariableDeclaration(node)) {
    return node.parent.parent;
  }
  return node;
}

/** Extracts prose from leading JSDoc while ignoring tags and delimiters. */
function documentationText(node: ts.Node, sourceFile: ts.SourceFile): string {
  return ts
    .getJSDocCommentsAndTags(documentationOwner(node))
    .filter(ts.isJSDoc)
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
function hasUsefulDocumentation(
  node: ts.Node,
  sourceFile: ts.SourceFile
): boolean {
  const words = documentationText(node, sourceFile)
    .split(WHITESPACE_PATTERN)
    .filter((word) => word.length > 0);
  return words.length >= MINIMUM_DOCUMENTATION_WORDS;
}

/** Returns the stable name for one callable declaration when it has one. */
function callableName(
  node: ts.Node,
  sourceFile: ts.SourceFile
): string | undefined {
  if (ts.isFunctionDeclaration(node) && node.name) {
    return node.name.text;
  }
  if (ts.isConstructorDeclaration(node)) {
    return "constructor";
  }
  if (
    ts.isMethodDeclaration(node) ||
    ts.isMethodSignature(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node)
  ) {
    return node.name.getText(sourceFile);
  }
  if (
    ts.isPropertyDeclaration(node) &&
    node.initializer &&
    isCallableInitializer(node.initializer)
  ) {
    return node.name.getText(sourceFile);
  }
  if (
    ts.isPropertyAssignment(node) &&
    isEffectFunctionFactory(node.initializer)
  ) {
    return node.name.getText(sourceFile);
  }
  if (
    ts.isPropertySignature(node) &&
    node.type &&
    ts.isFunctionTypeNode(node.type)
  ) {
    return node.name.getText(sourceFile);
  }
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer &&
    isCallableInitializer(node.initializer)
  ) {
    return node.name.text;
  }
}

/** Collects stable callable declarations that lack useful JSDoc. */
function missingDocumentation(file: string): string[] {
  const sourceText = readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  const missing: string[] = [];
  const nodes: ts.Node[] = [sourceFile];

  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) {
      continue;
    }
    const name = callableName(node, sourceFile);
    if (name && !hasUsefulDocumentation(node, sourceFile)) {
      const line =
        sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      missing.push(`${file}:${line} ${name}`);
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }

  return missing;
}

const violations = sourceFiles().flatMap(missingDocumentation);

if (violations.length > 0) {
  process.stderr.write(
    `Named callables require useful JSDoc:\n${violations.join("\n")}\n`
  );
  process.exitCode = 1;
}
