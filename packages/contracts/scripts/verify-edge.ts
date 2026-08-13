import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { parseInstalledManifest } from "#scripts/manifest";

export const EDGE_CONTRACT_EXPORTS = [
  "graph/family",
  "history/decode",
  "release/canonical",
  "release/snapshot/data",
  "renderer/compatibility",
  "renderer/manifest",
  "transport/request",
  "transport/response",
  "transport/snapshot",
  "tryout/catalog",
  "tryout/identity",
] as const;
const PRIVATE_PREFIX = "#contracts/";

/** Returns statically reachable runtime imports from emitted JavaScript. */
export function runtimeImports(
  file: string,
  source: string
): readonly string[] {
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS
  );
  const imports: string[] = [];
  const nodes: ts.Node[] = [sourceFile];
  for (const node of nodes) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      imports.push(node.moduleSpecifier.text);
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword
    ) {
      for (const argument of node.arguments) {
        if (ts.isStringLiteral(argument)) {
          imports.push(argument.text);
        }
      }
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }
  return imports;
}

/** Resolves one package-private or relative emitted import for traversal. */
function internalImport(
  distRoot: string,
  importingFile: string,
  specifier: string
): string | undefined {
  if (specifier.startsWith(PRIVATE_PREFIX)) {
    return resolve(distRoot, `${specifier.slice(PRIVATE_PREFIX.length)}.js`);
  }
  if (!specifier.startsWith(".")) {
    return;
  }
  const target = resolve(dirname(importingFile), specifier);
  return extname(target) ? target : `${target}.js`;
}

/** Traces one Edge entry and rejects any reachable Node builtin import. */
export function verifyEdgeEntry(
  distRoot: string,
  entry: string
): ReadonlySet<string> {
  const visited = new Set<string>();
  const pending = [resolve(distRoot, `${entry}.js`)];
  while (pending.length > 0) {
    const file = pending.pop();
    assert.ok(file, "Edge traversal must retain its pending module");
    if (visited.has(file)) {
      continue;
    }
    assert.ok(existsSync(file), `Edge contract module is missing: ${file}`);
    visited.add(file);
    for (const specifier of runtimeImports(file, readFileSync(file, "utf8"))) {
      assert.ok(
        !specifier.startsWith("node:"),
        `${entry} reaches Node-only import ${specifier} through ${file}`
      );
      const internal = internalImport(distRoot, file, specifier);
      if (internal) {
        pending.push(internal);
      }
    }
  }
  return visited;
}

/** Verifies every contract entry consumed by Convex Edge mutations. */
export function verifyEdgeContracts(packageRoot: string): void {
  const distRoot = resolve(packageRoot, "dist");
  const manifest = parseInstalledManifest(
    readFileSync(resolve(packageRoot, "package.json"), "utf8")
  );
  for (const entry of EDGE_CONTRACT_EXPORTS) {
    const descriptor = manifest.exports[`./${entry}`];
    assert.ok(descriptor, `Edge contract export is missing: ${entry}`);
    assert.ok(
      descriptor.import,
      `Edge contract export must declare an import condition: ${entry}`
    );
    verifyEdgeEntry(distRoot, entry);
  }
}

/** Runs the verifier only when this module is the selected CLI entrypoint. */
export function runEdgeVerification(input: {
  readonly entry: string | undefined;
  readonly moduleUrl: string;
  readonly packageRoot: string;
}): boolean {
  if (
    input.entry === undefined ||
    pathToFileURL(resolve(input.entry)).href !== input.moduleUrl
  ) {
    return false;
  }
  verifyEdgeContracts(input.packageRoot);
  return true;
}

runEdgeVerification({
  entry: process.argv.at(1),
  moduleUrl: import.meta.url,
  packageRoot: resolve(import.meta.dirname, ".."),
});
