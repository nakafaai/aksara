import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { selectPreviewDocument as selectCorpusDocument } from "@nakafa/aksara-corpus/preview/selection";
import { Array as Arr, Effect, type FileSystem, Path } from "effect";
import {
  captureSelectedFiles,
  PreviewRepositoryError,
  type PreviewRestartError,
  type SelectedDocument,
  type SelectedFileCandidate,
} from "#cli/integrity";

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
  const relativePath = Arr.join(
    path.relative(aksaraRoot, absolutePath).split(path.sep),
    "/"
  );
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
  const { source } = selection;
  const bodyPath = source.entry.sourcePath;
  const candidates = [
    {
      absolutePath: path.resolve(aksaraRoot, bodyPath),
      mode: "reload",
      sourcePath: bodyPath,
    },
    ...Arr.map(
      Arr.dedupe(source.dependencies),
      (sourcePath): SelectedFileCandidate => ({
        absolutePath: path.resolve(aksaraRoot, sourcePath),
        mode: "restart",
        sourcePath,
      })
    ),
  ] satisfies readonly [SelectedFileCandidate, ...SelectedFileCandidate[]];
  const files = yield* captureSelectedFiles(candidates);
  const selected = {
    document: selection.document,
    files,
    source,
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
