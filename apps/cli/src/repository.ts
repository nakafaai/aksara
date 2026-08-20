import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { selectPreviewDocument as selectCorpusDocument } from "@nakafa/aksara-corpus/preview/selection";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { Effect, type FileSystem, Path } from "effect";
import {
  captureSelectedFiles,
  PreviewRepositoryError,
  type PreviewRestartError,
  type SelectedDirectory,
  type SelectedDocument,
  type SelectedFileCandidate,
  verifySelectedDirectory,
} from "#cli/integrity";

/** Retains restart semantics when one selected file has multiple owners. */
function recordSelectedPath(
  files: Map<
    SelectedFileCandidate["sourcePath"],
    SelectedFileCandidate["mode"]
  >,
  sourcePath: SelectedFileCandidate["sourcePath"],
  mode: SelectedFileCandidate["mode"]
) {
  if (mode === "restart" || !files.has(sourcePath)) {
    files.set(sourcePath, mode);
  }
}

/** Selects only an exact realpath-backed document and its registry closure. */
export const selectPreviewDocument: (
  aksaraRoot: string,
  requestedPath: string,
  appLocale?: AppLocale
) => Effect.Effect<
  SelectedDocument,
  PreviewRepositoryError | PreviewRestartError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraCli.selectPreviewDocument")(function* (
  aksaraRoot: string,
  requestedPath: string,
  appLocale?: AppLocale
) {
  const path = yield* Path.Path;
  const absolutePath = path.resolve(aksaraRoot, requestedPath);
  const relativePath = path
    .relative(aksaraRoot, absolutePath)
    .split(path.sep)
    .join("/");
  if (path.normalize(requestedPath) !== requestedPath) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: requestedPath,
      reason: "registry",
    });
  }
  const selection = yield* selectCorpusDocument(
    aksaraRoot,
    relativePath,
    appLocale
  ).pipe(
    Effect.mapError(
      (cause) =>
        new PreviewRepositoryError({
          kind: "document",
          path: requestedPath,
          reason:
            cause._tag === "PreviewSelectionError" && cause.reason === "locale"
              ? "app-locale"
              : "registry",
        })
    )
  );
  const [first, ...remaining] = selection.sources;
  const firstPath = first.entry.sourcePath;
  const directoriesByPath = new Map<
    SelectedDirectory["sourcePath"],
    SelectedDirectory["files"]
  >();
  const remainingPaths = new Map<
    PreviewSource["entry"]["sourcePath"],
    SelectedFileCandidate["mode"]
  >();
  for (const source of selection.sources) {
    for (const directory of source.directories) {
      directoriesByPath.set(directory.sourcePath, directory.files);
    }
    if (source.entry.sourcePath !== firstPath) {
      recordSelectedPath(remainingPaths, source.entry.sourcePath, "reload");
    }
    for (const dependency of source.dependencies) {
      recordSelectedPath(
        remainingPaths,
        dependency.sourcePath,
        dependency.mode
      );
    }
  }
  const candidates = [
    {
      absolutePath: path.resolve(aksaraRoot, firstPath),
      mode: "reload",
      sourcePath: firstPath,
    },
    ...[...remainingPaths].map(([sourcePath, mode]): SelectedFileCandidate => {
      const selectedPath = path.resolve(aksaraRoot, sourcePath);
      if (mode === "reload") {
        return { absolutePath: selectedPath, mode: "reload", sourcePath };
      }
      return { absolutePath: selectedPath, mode: "restart", sourcePath };
    }),
  ] satisfies readonly [SelectedFileCandidate, ...SelectedFileCandidate[]];
  const files = yield* captureSelectedFiles(candidates);
  const directories = [...directoriesByPath].map(
    ([sourcePath, expectedFiles]): SelectedDirectory => ({
      absolutePath: path.resolve(aksaraRoot, sourcePath),
      files: expectedFiles,
      sourcePath,
    })
  );
  yield* Effect.forEach(directories, verifySelectedDirectory, {
    discard: true,
  });
  const selected = {
    directories,
    document: selection.document,
    files,
    sources: [first, ...remaining],
  } satisfies SelectedDocument;
  return selected;
});

/** Selects one real material solely to discover the actual renderer contract. */
export const selectCatalogDocument: (
  aksaraRoot: string
) => Effect.Effect<
  SelectedDocument,
  PreviewRepositoryError | PreviewRestartError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraCli.selectCatalogDocument")(function* (aksaraRoot) {
  const entries = yield* decodeMaterialRegistry().pipe(
    Effect.mapError(
      () =>
        new PreviewRepositoryError({
          kind: "document",
          path: "packages/corpus/material/lesson",
          reason: "registry",
        })
    )
  );
  const [entry] = entries;
  if (entry === undefined) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: "packages/corpus/material/lesson",
      reason: "registry",
    });
  }
  return yield* selectPreviewDocument(aksaraRoot, entry.sourcePath);
});
