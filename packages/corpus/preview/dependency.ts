import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  MutableHashSet,
  MutableList,
  Path,
  Schema,
} from "effect";
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
  const specifiers = MutableList.make<string>();
  const pending = MutableList.make<Node>();
  MutableList.append(pending, sourceFile);
  let node = MutableList.take(pending);
  while (node !== MutableList.Empty) {
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
      MutableList.append(specifiers, node.moduleSpecifier.text);
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
      MutableList.append(specifiers, node.argument.literal.text);
    }
    node.forEachChild((child) => {
      MutableList.append(pending, child);
    });
    node = MutableList.take(pending);
  }
  return MutableList.toArray(specifiers);
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
    const dependencies = yield* Effect.forEach(specifiers, (specifier) =>
      decodeCorpusImport(specifier, sourcePath)
    );
    return Arr.filter(
      dependencies,
      (dependency): dependency is CorpusSourcePath => dependency !== undefined
    );
  }
);

/** Discovers the bounded transitive corpus imports for one source module. */
export const discoverSourceDependencies = Effect.fn(
  "AksaraCorpus.discoverSourceDependencies"
)(function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
  const scheduled = MutableHashSet.fromIterable([sourcePath]);
  const pending = MutableList.make<CorpusSourcePath>();
  const discovered = MutableList.make<CorpusSourcePath>();
  MutableList.append(pending, sourcePath);
  let processed = 0;
  let current = MutableList.take(pending);

  while (current !== MutableList.Empty) {
    if (processed === MAX_SOURCE_FILES) {
      return yield* new SourceDependencyError({
        reason: "limit",
        sourcePath: current,
      });
    }
    processed += 1;
    const direct = yield* readSourceDependencies(corpusRoot, current);
    for (const dependency of direct) {
      if (MutableHashSet.has(scheduled, dependency)) {
        continue;
      }
      MutableHashSet.add(scheduled, dependency);
      MutableList.append(pending, dependency);
      MutableList.append(discovered, dependency);
    }
    current = MutableList.take(pending);
  }
  return Arr.prepend(MutableList.toArray(discovered), sourcePath);
}, Effect.provide(TypeScriptParser.layer));
