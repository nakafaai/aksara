import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, FileSystem, Path, Schema } from "effect";
import {
  isCallExpression,
  isExportDeclaration,
  isImportDeclaration,
  isStringLiteral,
  type Node,
  SyntaxKind,
} from "typescript/unstable/ast";
import { parseInstalledManifest } from "#scripts/manifest";

export const EDGE_CONTRACT_EXPORTS = [
  "graph/family",
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

/** One expected Edge contract verification failure. */
export class EdgeVerificationError extends Schema.TaggedError<EdgeVerificationError>()(
  "EdgeVerificationError",
  {
    cause: Schema.Unknown,
    detail: Schema.String,
    reason: Schema.Literals(["filesystem", "manifest", "module"]),
  }
) {}

/** Creates one stable Edge verification failure. */
function edgeError(
  reason: typeof EdgeVerificationError.fields.reason.Type,
  detail: string,
  cause: unknown
) {
  return new EdgeVerificationError({ cause, detail, reason });
}

/** Preserves one upstream cause inside a stable Edge failure. */
function edgeFailure(
  reason: typeof EdgeVerificationError.fields.reason.Type,
  detail: string
) {
  return (cause: unknown) =>
    edgeError(reason, `${detail}: ${String(cause)}`, cause);
}

/** Returns statically reachable runtime imports from emitted JavaScript. */
export const runtimeImports = Effect.fn("AksaraContracts.runtimeImports")(
  function* (file: string, source: string) {
    const parser = yield* TypeScriptParser;
    return yield* parser.inspect(
      { fileName: file, source },
      ({ sourceFile }) => {
        const imports: string[] = [];
        const nodes: Node[] = [sourceFile];
        for (const node of nodes) {
          if (
            (isImportDeclaration(node) || isExportDeclaration(node)) &&
            node.moduleSpecifier &&
            isStringLiteral(node.moduleSpecifier)
          ) {
            imports.push(node.moduleSpecifier.text);
          }
          if (
            isCallExpression(node) &&
            node.expression.kind === SyntaxKind.ImportKeyword
          ) {
            for (const argument of node.arguments) {
              if (isStringLiteral(argument)) {
                imports.push(argument.text);
              }
            }
          }
          node.forEachChild((child) => {
            nodes.push(child);
          });
        }
        return imports;
      }
    );
  }
);

/** Resolves one package-private or relative emitted import for traversal. */
function internalImport(
  path: Path.Path,
  distRoot: string,
  importingFile: string,
  specifier: string
): string | undefined {
  if (specifier.startsWith(PRIVATE_PREFIX)) {
    return path.resolve(
      distRoot,
      `${specifier.slice(PRIVATE_PREFIX.length)}.js`
    );
  }
  if (!specifier.startsWith(".")) {
    return;
  }
  const target = path.resolve(path.dirname(importingFile), specifier);
  return path.extname(target) ? target : `${target}.js`;
}

/** Traces one Edge entry and rejects any reachable Node builtin import. */
export const verifyEdgeEntry = Effect.fn("AksaraContracts.verifyEdgeEntry")(
  function* (distRoot: string, entry: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const visited = new Set<string>();
    const pending = [path.resolve(distRoot, `${entry}.js`)];
    for (const file of pending) {
      if (visited.has(file)) {
        continue;
      }
      const source = yield* fileSystem
        .readFileString(file, "utf8")
        .pipe(
          Effect.mapError(
            edgeFailure(
              "module",
              `Edge contract module could not be read: ${file}`
            )
          )
        );
      visited.add(file);
      const imports = yield* runtimeImports(file, source);
      for (const specifier of imports) {
        if (specifier.startsWith("node:")) {
          return yield* edgeError(
            "module",
            `${entry} reaches Node-only import ${specifier} through ${file}`,
            { entry, file, specifier }
          );
        }
        const internal = internalImport(path, distRoot, file, specifier);
        if (internal !== undefined) {
          pending.push(internal);
        }
      }
    }
    return visited;
  }
);

/** Verifies every contract entry consumed by Convex Edge mutations. */
export const verifyEdgeContracts = Effect.fn(
  "AksaraContracts.verifyEdgeContracts"
)(function* (packageRoot: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const manifestFile = path.resolve(packageRoot, "package.json");
  const manifestSource = yield* fileSystem
    .readFileString(manifestFile, "utf8")
    .pipe(
      Effect.mapError(
        edgeFailure(
          "filesystem",
          `Edge contract manifest could not be read: ${manifestFile}`
        )
      )
    );
  const manifest = yield* Effect.try({
    catch: edgeFailure(
      "manifest",
      `Edge contract manifest could not be decoded: ${manifestFile}`
    ),
    try: () => parseInstalledManifest(manifestSource),
  });
  const distRoot = path.resolve(packageRoot, "dist");
  for (const entry of EDGE_CONTRACT_EXPORTS) {
    const descriptor = manifest.exports[`./${entry}`];
    if (descriptor === undefined) {
      return yield* edgeError(
        "manifest",
        `Edge contract export is missing: ${entry}`,
        entry
      );
    }
    if (descriptor.import === undefined) {
      return yield* edgeError(
        "manifest",
        `Edge contract export must declare an import condition: ${entry}`,
        descriptor
      );
    }
    yield* verifyEdgeEntry(distRoot, entry);
  }
}, Effect.provide(TypeScriptParser.layer));

/** Runs verification only when this module is the selected CLI entrypoint. */
export const runEdgeVerification = Effect.fn(
  "AksaraContracts.runEdgeVerification"
)(function* (input: {
  readonly entry: string | undefined;
  readonly moduleFile: string;
  readonly scriptDirectory: string;
}) {
  const path = yield* Path.Path;
  if (
    input.entry === undefined ||
    path.resolve(input.entry) !== path.resolve(input.moduleFile)
  ) {
    return false;
  }
  yield* verifyEdgeContracts(path.resolve(input.scriptDirectory, ".."));
  return true;
});

NodeRuntime.runMain(
  runEdgeVerification({
    entry: process.argv.at(1),
    moduleFile: import.meta.filename,
    scriptDirectory: import.meta.dirname,
  }).pipe(Effect.provide(NodeServices.layer))
);
