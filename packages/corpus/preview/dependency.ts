import { FileSystem, Path } from "@effect/platform";
import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { hasTypeScriptSyntaxError } from "@nakafa/aksara-utilities/typescript/syntax";
import { Effect, Schema } from "effect";
import ts from "typescript";

const CORPUS_ALIAS = "#corpus/";
const MAX_SOURCE_FILES = 128;

/** A source-module dependency closure cannot be reproduced safely. */
export class SourceDependencyError extends Schema.TaggedError<SourceDependencyError>()(
  "SourceDependencyError",
  {
    reason: Schema.Literal("limit", "missing", "module", "syntax"),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Collects every static module reference or rejects unsupported loading. */
function inspectModuleSpecifiers(sourceFile: ts.SourceFile) {
  const specifiers: string[] = [];
  const pending: ts.Node[] = [sourceFile];
  for (const node of pending) {
    if (ts.isImportEqualsDeclaration(node)) {
      return;
    }
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) &&
          node.expression.text === "require"))
    ) {
      return;
    }
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isImportTypeNode(node)) {
      if (
        !(
          ts.isLiteralTypeNode(node.argument) &&
          ts.isStringLiteral(node.argument.literal)
        )
      ) {
        return;
      }
      specifiers.push(node.argument.literal.text);
    }
    ts.forEachChild(node, (child) => {
      pending.push(child);
    });
  }
  return specifiers;
}

/** Decodes one corpus alias into its canonical source-controlled file path. */
const decodeCorpusImport = Effect.fn("AksaraCorpus.decodeCorpusImport")(
  function* (specifier: string, sourcePath: CorpusSourcePath) {
    if (specifier.startsWith(".")) {
      return yield* new SourceDependencyError({
        reason: "module",
        sourcePath,
      });
    }
    if (!specifier.startsWith(CORPUS_ALIAS)) {
      return;
    }
    return yield* Schema.decodeUnknown(CorpusSourcePathSchema)(
      `packages/corpus/${specifier.slice(CORPUS_ALIAS.length)}.ts`
    ).pipe(
      Effect.mapError(
        () =>
          new SourceDependencyError({
            reason: "module",
            sourcePath,
          })
      )
    );
  }
);

/** Reads one source module and returns its direct corpus dependencies. */
const readSourceDependencies = Effect.fn("AksaraCorpus.readSourceDependencies")(
  function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const source = yield* fileSystem
      .readFileString(path.join(corpusRoot, sourcePath), "utf8")
      .pipe(
        Effect.mapError(
          () =>
            new SourceDependencyError({
              reason: "missing",
              sourcePath,
            })
        )
      );
    if (hasTypeScriptSyntaxError(source, sourcePath)) {
      return yield* new SourceDependencyError({
        reason: "syntax",
        sourcePath,
      });
    }
    const sourceFile = ts.createSourceFile(
      sourcePath,
      source,
      ts.ScriptTarget.ES2022,
      false,
      ts.ScriptKind.TS
    );
    const specifiers = inspectModuleSpecifiers(sourceFile);
    if (specifiers === undefined) {
      return yield* new SourceDependencyError({
        reason: "module",
        sourcePath,
      });
    }
    const dependencies: CorpusSourcePath[] = [];
    for (const specifier of specifiers) {
      const dependency = yield* decodeCorpusImport(specifier, sourcePath);
      if (dependency !== undefined) {
        dependencies.push(dependency);
      }
    }
    return dependencies;
  }
);

/** Discovers the bounded transitive corpus imports for one source module. */
export const discoverSourceDependencies = Effect.fn(
  "AksaraCorpus.discoverSourceDependencies"
)(function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
  const dependencies: [CorpusSourcePath, ...CorpusSourcePath[]] = [sourcePath];
  const scheduled = new Set<CorpusSourcePath>(dependencies);
  let processed = 0;

  for (const current of dependencies) {
    if (processed === MAX_SOURCE_FILES) {
      return yield* new SourceDependencyError({
        reason: "limit",
        sourcePath: current,
      });
    }
    processed += 1;
    const direct = yield* readSourceDependencies(corpusRoot, current);
    for (const dependency of direct) {
      if (scheduled.has(dependency)) {
        continue;
      }
      scheduled.add(dependency);
      dependencies.push(dependency);
    }
  }
  return dependencies;
});
