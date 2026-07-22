import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const SOURCE_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;
const PACKAGE_SOURCE_PATTERN = /^packages\/([^/]+)\//u;
const RELATIVE_IMPORT_PATTERN = /^\.{1,2}(?:\/|$)/u;
const FILESYSTEM_IMPORT_PATTERN = /^(?:\/|file:|packages\/)/u;
const IMPORT_WILDCARD_PATTERN = /\*$/u;

interface WorkspaceIdentity {
  readonly allowedDependencies: ReadonlySet<string>;
  readonly privatePrefixes: readonly string[];
  readonly publicName: string;
  readonly runtimeDependencies: ReadonlySet<string>;
}

const workspaceIdentities = new Map<string, WorkspaceIdentity>();
const allowedWorkspaceDependencies: ReadonlyMap<
  string,
  ReadonlySet<string>
> = new Map([
  ["compiler", new Set(["@nakafaai/aksara-contracts"])],
  ["contracts", new Set()],
  ["corpus", new Set(["@nakafaai/aksara-contracts"])],
  [
    "publisher",
    new Set([
      "@nakafaai/aksara-compiler",
      "@nakafaai/aksara-contracts",
      "@nakafaai/aksara-corpus",
    ]),
  ],
]);

/** Lists authored TypeScript files governed by repository import boundaries. */
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

/** Returns the statically knowable module specifier owned by one syntax node. */
function staticModuleSpecifier(
  node: ts.Node
): ts.StringLiteralLike | undefined {
  if (
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
    node.moduleSpecifier &&
    ts.isStringLiteral(node.moduleSpecifier)
  ) {
    return node.moduleSpecifier;
  }
  if (
    ts.isImportTypeNode(node) &&
    ts.isLiteralTypeNode(node.argument) &&
    ts.isStringLiteral(node.argument.literal)
  ) {
    return node.argument.literal;
  }
  if (
    ts.isImportEqualsDeclaration(node) &&
    ts.isExternalModuleReference(node.moduleReference) &&
    node.moduleReference.expression &&
    ts.isStringLiteralLike(node.moduleReference.expression)
  ) {
    return node.moduleReference.expression;
  }
  if (!ts.isCallExpression(node)) {
    return;
  }
  const [argument] = node.arguments;
  const isModuleCall =
    node.expression.kind === ts.SyntaxKind.ImportKeyword ||
    (ts.isIdentifier(node.expression) && node.expression.text === "require");
  return isModuleCall &&
    node.arguments.length === 1 &&
    argument &&
    ts.isStringLiteralLike(argument)
    ? argument
    : undefined;
}

/** Returns every static or dynamic module specifier in one source module. */
function moduleSpecifiers(
  sourceFile: ts.SourceFile
): readonly ts.StringLiteralLike[] {
  const specifiers: ts.StringLiteralLike[] = [];
  const nodes: ts.Node[] = [sourceFile];

  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) {
      continue;
    }
    const specifier = staticModuleSpecifier(node);
    if (specifier) {
      specifiers.push(specifier);
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }

  return specifiers;
}

/** Narrows parsed package metadata without introducing an unsafe assertion. */
function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === "object" && input !== null;
}

/** Returns declared package names from one manifest dependency section. */
function dependencyNames(input: unknown): readonly string[] {
  return isRecord(input) ? Object.keys(input) : [];
}

/** Reads one workspace's declared public name and private import aliases. */
function workspaceIdentity(file: string): WorkspaceIdentity | undefined {
  const match = PACKAGE_SOURCE_PATTERN.exec(file);
  const workspace = match?.[1];
  if (!workspace || workspace === "typescript-config") {
    return;
  }
  const cached = workspaceIdentities.get(workspace);
  if (cached) {
    return cached;
  }
  const manifest: unknown = JSON.parse(
    readFileSync(`packages/${workspace}/package.json`, "utf8")
  );
  if (!isRecord(manifest) || typeof manifest.name !== "string") {
    throw new Error(`packages/${workspace}/package.json has no package name`);
  }
  const allowedDependencies = allowedWorkspaceDependencies.get(workspace);
  if (!allowedDependencies) {
    throw new Error(`packages/${workspace} has no import-boundary policy`);
  }
  const imports = isRecord(manifest.imports)
    ? Object.keys(manifest.imports)
    : [];
  const identity = {
    allowedDependencies,
    privatePrefixes: imports
      .filter((specifier) => specifier.startsWith("#"))
      .map((specifier) => specifier.replace(IMPORT_WILDCARD_PATTERN, "")),
    publicName: manifest.name,
    runtimeDependencies: new Set(dependencyNames(manifest.dependencies)),
  } satisfies WorkspaceIdentity;
  workspaceIdentities.set(workspace, identity);
  return identity;
}

/** Reports one module specifier that crosses an Aksara import boundary. */
function importViolation(file: string, specifier: string): string | undefined {
  if (
    RELATIVE_IMPORT_PATTERN.test(specifier) ||
    FILESYSTEM_IMPORT_PATTERN.test(specifier)
  ) {
    return "relative or filesystem module import";
  }

  const identity = workspaceIdentity(file);
  if (!identity) {
    return;
  }
  if (
    specifier.startsWith("#") &&
    !identity.privatePrefixes.some((prefix) => specifier.startsWith(prefix))
  ) {
    return "private alias owned by another workspace";
  }
  if (
    specifier === identity.publicName ||
    specifier.startsWith(`${identity.publicName}/`)
  ) {
    return "self-import through public package export";
  }
  if (!specifier.startsWith("@nakafaai/")) {
    return;
  }
  const packageName = specifier.split("/").slice(0, 2).join("/");
  if (!identity.allowedDependencies.has(packageName)) {
    return "workspace dependency violates the architecture graph";
  }
  if (!identity.runtimeDependencies.has(packageName)) {
    return "workspace dependency is absent from package dependencies";
  }
}

/** Collects stable file and line diagnostics for invalid module imports. */
function importViolations(file: string): string[] {
  const sourceText = readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );

  return moduleSpecifiers(sourceFile).flatMap((specifier) => {
    const violation = importViolation(file, specifier.text);
    if (!violation) {
      return [];
    }
    const line =
      sourceFile.getLineAndCharacterOfPosition(specifier.getStart()).line + 1;
    return [`${file}:${line} ${specifier.text}: ${violation}`];
  });
}

const violations = sourceFiles().flatMap(importViolations);

if (violations.length > 0) {
  process.stderr.write(
    `TypeScript imports must respect workspace aliases:\n${violations.join("\n")}\n`
  );
  process.exitCode = 1;
}
