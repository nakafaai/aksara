import { createHash } from "node:crypto";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  PreviewSelectionSchema,
  PreviewSourceSchema,
} from "@nakafa/aksara-corpus/preview/source";
import { Effect, FileSystem, HashMap, Option, Schema } from "effect";

/** A requested document failed exact source validation. */
export class PreviewRepositoryError extends Schema.TaggedError<PreviewRepositoryError>()(
  "PreviewRepositoryError",
  {
    kind: Schema.Literal("document"),
    path: Schema.String,
    reason: Schema.Literals([
      "changed",
      "app-locale",
      "identity",
      "missing",
      "registry",
      "symlink",
    ]),
  }
) {}

/** Startup-scoped registry topology changed and requires a fresh session. */
export class PreviewRestartError extends Schema.TaggedError<PreviewRestartError>()(
  "PreviewRestartError",
  { sourcePath: CorpusSourcePathSchema }
) {}

const SelectedFileBaseSchema = Schema.Struct({
  absolutePath: Schema.String,
  sourcePath: CorpusSourcePathSchema,
});
const ReloadFileCandidateSchema = Schema.Struct({
  ...SelectedFileBaseSchema.fields,
  mode: Schema.Literal("reload"),
});
const RestartFileCandidateSchema = Schema.Struct({
  ...SelectedFileBaseSchema.fields,
  mode: Schema.Literal("restart"),
});
const RestartSelectedFileSchema = Schema.Struct({
  ...RestartFileCandidateSchema.fields,
  baselineHash: Sha256HashSchema,
});
/** One reloadable body or restart-scoped source dependency. */
const SelectedFileSchema = Schema.Union([
  ReloadFileCandidateSchema,
  RestartSelectedFileSchema,
]);
type ReloadFileCandidate = typeof ReloadFileCandidateSchema.Type;
type RestartFileCandidate = typeof RestartFileCandidateSchema.Type;
type RestartSelectedFile = typeof RestartSelectedFileSchema.Type;

/** One selected file before its restart baseline has been captured. */
export type SelectedFileCandidate = ReloadFileCandidate | RestartFileCandidate;

type SelectedFile = typeof SelectedFileSchema.Type;

/** Exact source directory whose authored file membership is startup topology. */
const SelectedDirectorySchema = Schema.Struct({
  absolutePath: Schema.String,
  files: Schema.Array(Schema.String),
  sourcePath: CorpusSourcePathSchema,
});
export type SelectedDirectory = typeof SelectedDirectorySchema.Type;

/** Exact selected document and its ordered compilation closure. */
const SelectedDocumentSchema = Schema.Struct({
  directories: Schema.Array(SelectedDirectorySchema),
  // Each selection variant owns one document Schema, so the field accepts any of them.
  document: Schema.Union(
    PreviewSelectionSchema.members.map((member) => member.fields.document)
  ),
  files: Schema.NonEmptyArray(SelectedFileSchema),
  sources: Schema.NonEmptyArray(PreviewSourceSchema),
});
export type SelectedDocument = typeof SelectedDocumentSchema.Type;

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
export const SelectedFingerprintSchema = Schema.Struct({
  files: Schema.Array(
    Schema.Struct({
      hash: Sha256HashSchema,
      sourcePath: CorpusSourcePathSchema,
    })
  ),
});
export type SelectedFingerprint = typeof SelectedFingerprintSchema.Type;

/** Rejects a closure that changed while its related sources were loaded. */
export const verifySelectedFingerprint = Effect.fn(
  "AksaraCli.verifySelectedFingerprint"
)(function* (selected: SelectedDocument, expected: SelectedFingerprint) {
  const actual = yield* fingerprintSelectedDocument(selected);
  yield* verifySelectedTopology(selected);
  const expectedByPath = HashMap.fromIterable(
    expected.files.map((file) => [file.sourcePath, file.hash])
  );
  const changed = actual.files.find(
    (file) =>
      Option.getOrUndefined(HashMap.get(expectedByPath, file.sourcePath)) !==
      file.hash
  );
  if (changed !== undefined) {
    return yield* new PreviewRepositoryError({
      kind: "document",
      path: changed.sourcePath,
      reason: "changed",
    });
  }
});
