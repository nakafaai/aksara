import { createHash } from "node:crypto";
import { FileSystem } from "@effect/platform";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  PreviewSelection,
  PreviewSource,
} from "@nakafa/aksara-corpus/preview/source";
import { Effect, Schema } from "effect";

/** A requested document failed exact source validation. */
export class PreviewRepositoryError extends Schema.TaggedError<PreviewRepositoryError>()(
  "PreviewRepositoryError",
  {
    kind: Schema.Literal("document"),
    path: Schema.String,
    reason: Schema.Literal(
      "changed",
      "identity",
      "missing",
      "registry",
      "symlink"
    ),
  }
) {}

/** Startup-scoped registry topology changed and requires a fresh session. */
export class PreviewRestartError extends Schema.TaggedError<PreviewRestartError>()(
  "PreviewRestartError",
  { sourcePath: CorpusSourcePathSchema }
) {}

interface SelectedFileBase {
  readonly absolutePath: string;
  readonly sourcePath: PreviewSource["entry"]["sourcePath"];
}

interface ReloadFileCandidate extends SelectedFileBase {
  readonly mode: "reload";
}

interface RestartFileCandidate extends SelectedFileBase {
  readonly mode: "restart";
}

/** One selected file before its restart baseline has been captured. */
export type SelectedFileCandidate = ReloadFileCandidate | RestartFileCandidate;

interface RestartSelectedFile extends RestartFileCandidate {
  readonly baselineHash: typeof Sha256HashSchema.Type;
}

/** One reloadable body or restart-scoped source dependency. */
type SelectedFile = ReloadFileCandidate | RestartSelectedFile;

type SourceDirectory = PreviewSource["directories"][number];

/** Exact source directory whose authored file membership is startup topology. */
export interface SelectedDirectory {
  readonly absolutePath: string;
  readonly files: SourceDirectory["files"];
  readonly sourcePath: SourceDirectory["sourcePath"];
}

/** Exact selected document and its ordered compilation closure. */
export interface SelectedDocument {
  readonly directories: readonly SelectedDirectory[];
  readonly document: PreviewSelection["document"];
  readonly files: readonly [SelectedFile, ...SelectedFile[]];
  readonly sources: readonly [PreviewSource, ...PreviewSource[]];
}

/** Revalidates selected paths before they are read or watched. */
const verifySelectedFiles = Effect.fn("AksaraCli.verifySelectedFiles")(
  function* (files: readonly SelectedFileCandidate[]) {
    const fileSystem = yield* FileSystem.FileSystem;
    for (const file of files) {
      const actualPath = yield* fileSystem.realPath(file.absolutePath).pipe(
        Effect.mapError(
          () =>
            new PreviewRepositoryError({
              kind: "document",
              path: file.sourcePath,
              reason: "missing",
            })
        )
      );
      if (actualPath !== file.absolutePath) {
        return yield* new PreviewRepositoryError({
          kind: "document",
          path: file.sourcePath,
          reason: "symlink",
        });
      }
    }
  }
);

/** Reads one immutable source hash with a typed missing-file boundary. */
const readSelectedHash = Effect.fn("AksaraCli.readSelectedHash")(function* (
  selectedFile: SelectedFileCandidate
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem
    .readFileString(selectedFile.absolutePath, "utf8")
    .pipe(
      Effect.mapError(
        () =>
          new PreviewRepositoryError({
            kind: "document",
            path: selectedFile.sourcePath,
            reason: "missing",
          })
      )
    );
  return {
    hash: Sha256HashSchema.make(
      `sha256:${createHash("sha256").update(source).digest("hex")}`
    ),
    sourcePath: selectedFile.sourcePath,
  };
});

/** Captures the immutable startup hash required by one restart dependency. */
const captureSelectedFile = Effect.fn("AksaraCli.captureSelectedFile")(
  function* (file: SelectedFileCandidate) {
    if (file.mode === "reload") {
      return file;
    }
    const { hash } = yield* readSelectedHash(file);
    return { ...file, baselineHash: hash } satisfies RestartSelectedFile;
  }
);

/** Captures restart baselines for one validated non-empty source closure. */
export const captureSelectedFiles = Effect.fn("AksaraCli.captureSelectedFiles")(
  function* (
    files: readonly [SelectedFileCandidate, ...SelectedFileCandidate[]]
  ) {
    yield* verifySelectedFiles(files);
    const [first, ...remaining] = files;
    const firstFile = yield* captureSelectedFile(first);
    const remainingFiles = yield* Effect.forEach(
      remaining,
      captureSelectedFile
    );
    return [firstFile, ...remainingFiles] satisfies readonly [
      SelectedFile,
      ...SelectedFile[],
    ];
  }
);

/** Rejects any add, remove, rename, or replacement in one strict directory. */
export const verifySelectedDirectory = Effect.fn(
  "AksaraCli.verifySelectedDirectory"
)(function* (directory: SelectedDirectory) {
  const fileSystem = yield* FileSystem.FileSystem;
  const actualPath = yield* fileSystem
    .realPath(directory.absolutePath)
    .pipe(
      Effect.mapError(
        () => new PreviewRestartError({ sourcePath: directory.sourcePath })
      )
    );
  if (actualPath !== directory.absolutePath) {
    return yield* new PreviewRestartError({
      sourcePath: directory.sourcePath,
    });
  }
  const files = yield* fileSystem
    .readDirectory(directory.absolutePath)
    .pipe(
      Effect.mapError(
        () => new PreviewRestartError({ sourcePath: directory.sourcePath })
      )
    );
  const actualFiles = [...files].sort();
  if (
    actualFiles.length !== directory.files.length ||
    actualFiles.some((file, index) => file !== directory.files[index])
  ) {
    return yield* new PreviewRestartError({
      sourcePath: directory.sourcePath,
    });
  }
});

/** Rejects topology that no longer matches its startup-scoped registry. */
export const verifySelectedTopology = Effect.fn(
  "AksaraCli.verifySelectedTopology"
)(function* (selected: SelectedDocument) {
  yield* verifySelectedFiles(selected.files);
  yield* Effect.forEach(selected.directories, verifySelectedDirectory, {
    discard: true,
  });
  for (const file of selected.files) {
    if (file.mode === "reload") {
      continue;
    }
    const { hash } = yield* readSelectedHash(file);
    if (hash !== file.baselineHash) {
      return yield* new PreviewRestartError({ sourcePath: file.sourcePath });
    }
  }
});

/** Reads stable hashes for every source and dependency in one closure. */
export const fingerprintSelectedDocument = Effect.fn(
  "AksaraCli.fingerprintSelectedDocument"
)(function* (selected: SelectedDocument) {
  const files = yield* Effect.forEach(selected.files, readSelectedHash);
  return { files };
});

/** Immutable source hashes captured for one atomic compilation attempt. */
export type SelectedFingerprint = Effect.Effect.Success<
  ReturnType<typeof fingerprintSelectedDocument>
>;

/** Rejects a closure that changed while its related sources were loaded. */
export const verifySelectedFingerprint = Effect.fn(
  "AksaraCli.verifySelectedFingerprint"
)(function* (selected: SelectedDocument, expected: SelectedFingerprint) {
  const actual = yield* fingerprintSelectedDocument(selected);
  yield* verifySelectedTopology(selected);
  const expectedByPath = new Map(
    expected.files.map((file) => [file.sourcePath, file.hash])
  );
  const changed = actual.files.find(
    (file) => expectedByPath.get(file.sourcePath) !== file.hash
  );
  if (changed !== undefined) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: changed.sourcePath,
      reason: "changed",
    });
  }
});
