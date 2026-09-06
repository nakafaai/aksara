import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, FileSystem, Path, Schema } from "effect";
import {
  isCallExpression,
  isExportDeclaration,
  isIdentifier,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isImportTypeNode,
  isLiteralTypeNode,
  isStringLiteral,
  type Node,
  type SourceFile,
  SyntaxKind,
} from "typescript/unstable/ast";

const CORPUS_ALIAS = "#corpus/";
const MAX_SOURCE_FILES = 128;

/** A source-module dependency closure cannot be reproduced safely. */
export class SourceDependencyError extends Schema.TaggedError<SourceDependencyError>()(
  "SourceDependencyError",
  {
    reason: Schema.Literals(["limit", "missing", "module", "syntax"]),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Collects every static module reference or rejects unsupported loading. */
function inspectModuleSpecifiers(sourceFile: SourceFile) {
  const specifiers: string[] = [];
  const pending: Node[] = [sourceFile];
  for (const node of pending) {
    if (isImportEqualsDeclaration(node)) {
      return;
    }
    if (
      isCallExpression(node) &&
      (node.expression.kind === SyntaxKind.ImportKeyword ||
        (isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      return;
    }
    if (
      (isImportDeclaration(node) || isExportDeclaration(node)) &&
      node.moduleSpecifier !== undefined &&
      isStringLiteral(node.moduleSpecifier)
    ) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (isImportTypeNode(node)) {
      if (
        !(
          isLiteralTypeNode(node.argument) &&
          isStringLiteral(node.argument.literal)
        )
      ) {
        return;
      }
      specifiers.push(node.argument.literal.text);
    }
    node.forEachChild((child) => {
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
    return yield* Schema.decodeEffect(CorpusSourcePathSchema)(
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
    const parser = yield* TypeScriptParser;
    const inspected = yield* parser.inspect(
      { fileName: sourcePath, source },
      ({ diagnostics, sourceFile }) => ({
        invalid: diagnostics.length > 0,
        specifiers: inspectModuleSpecifiers(sourceFile),
      })
    );
    if (inspected.invalid) {
      return yield* new SourceDependencyError({ reason: "syntax", sourcePath });
    }
    const { specifiers } = inspected;
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
}, Effect.provide(TypeScriptParser.layer));
