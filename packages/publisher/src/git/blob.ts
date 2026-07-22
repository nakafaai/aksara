import {
  type Command,
  make as makeCommand,
  workingDirectory,
} from "@effect/platform/Command";
import {
  CommandExecutor,
  type CommandExecutor as CommandExecutorService,
} from "@effect/platform/CommandExecutor";
import type {
  CorpusSourcePath,
  GitCommitSha,
} from "@nakafaai/aksara-contracts/ids";
import { GitCommitShaSchema } from "@nakafaai/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafaai/aksara-contracts/limits";
import { Context, Effect, Layer, Schema } from "effect";
import {
  collectBoundedBytes,
  collectErrorBytes,
  decodeUtf8,
} from "#publisher/git/output";

const MAX_GIT_TEXT_BYTES = 4096;
const MAX_GIT_ERROR_BYTES = 16 * 1024;

const GitBlobOperationSchema = Schema.Literal(
  "find-root",
  "resolve-commit",
  "size-blob",
  "decode-blob",
  "read-blob"
);
type GitBlobOperation = typeof GitBlobOperationSchema.Type;

const GitBlobSizeSchema = Schema.NumberFromString.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** A repository command or exact-revision validation step failed. */
export class GitBlobError extends Schema.TaggedError<GitBlobError>()(
  "GitBlobError",
  {
    cause: Schema.Unknown,
    message: Schema.NonEmptyTrimmedString,
    operation: GitBlobOperationSchema,
  }
) {}

/** Branded exact-revision coordinates for one authored corpus blob. */
export interface GitBlobInput {
  readonly revision: GitCommitSha;
  readonly sourcePath: CorpusSourcePath;
}

/** Reads immutable corpus blobs through argument-safe Git commands. */
export class GitBlob extends Context.Tag("AksaraGitBlob")<
  GitBlob,
  {
    /** Returns the exact unmodified UTF-8 blob at a verified commit. */
    readonly read: (input: GitBlobInput) => Effect.Effect<string, GitBlobError>;
  }
>() {}

/** Builds a Git command that cannot observe repository replacement refs. */
function makeGitCommand(...args: readonly string[]) {
  return makeCommand("git", "--no-replace-objects", ...args);
}

/** Decodes trusted command bytes without accepting replacement characters. */
function decodeGitText(
  bytes: Uint8Array,
  operation: GitBlobOperation,
  message: string
) {
  return decodeUtf8(
    bytes,
    (cause) => new GitBlobError({ cause, message, operation })
  );
}

/** Executes one Git command with strictly bounded stdout retention. */
function runGitBytes(
  executor: CommandExecutorService,
  command: Command,
  operation: GitBlobOperation,
  message: string,
  maxBytes: number
) {
  const execution = Effect.gen(function* () {
    const process = yield* executor.start(command);
    const [exitCode, stdout, stderr] = yield* Effect.all(
      [
        process.exitCode,
        collectBoundedBytes(
          process.stdout,
          maxBytes,
          (actualBytes) =>
            new GitBlobError({
              cause: { actualBytes, maxBytes },
              message,
              operation,
            })
        ),
        collectErrorBytes(process.stderr, MAX_GIT_ERROR_BYTES),
      ],
      { concurrency: "unbounded" }
    );
    return { exitCode, stderr, stdout };
  }).pipe(
    Effect.mapError((cause) =>
      cause instanceof GitBlobError
        ? cause
        : new GitBlobError({ cause, message, operation })
    )
  );

  return Effect.scoped(
    execution.pipe(
      Effect.flatMap(({ exitCode, stderr, stdout }) => {
        if (exitCode === 0) {
          return Effect.succeed(stdout);
        }
        return decodeGitText(
          stderr,
          operation,
          "Git returned non-UTF-8 diagnostic output."
        ).pipe(
          Effect.flatMap((decodedError) =>
            Effect.fail(
              new GitBlobError({
                cause: { exitCode, stderr: decodedError },
                message,
                operation,
              })
            )
          )
        );
      })
    )
  );
}

/** Executes one small Git metadata command and fatally decodes its output. */
function runGitText(
  executor: CommandExecutorService,
  command: Command,
  operation: GitBlobOperation,
  message: string
) {
  return runGitBytes(
    executor,
    command,
    operation,
    message,
    MAX_GIT_TEXT_BYTES
  ).pipe(Effect.flatMap((bytes) => decodeGitText(bytes, operation, message)));
}

/** Platform-neutral Git implementation supplied with a command executor. */
export const GitBlobLive = Layer.effect(
  GitBlob,
  Effect.gen(function* () {
    const executor = yield* CommandExecutor;

    /** Reads one corpus blob only after resolving an exact commit SHA. */
    const read = Effect.fn("AksaraPublisher.GitBlob.read")(function* (
      input: GitBlobInput
    ) {
      const rootOutput = yield* runGitText(
        executor,
        makeGitCommand("rev-parse", "--show-toplevel"),
        "find-root",
        "Git could not locate the Aksara repository root."
      );
      const repositoryRoot = yield* Schema.decodeUnknown(
        Schema.NonEmptyTrimmedString
      )(rootOutput.trim()).pipe(
        Effect.mapError(
          (cause) =>
            new GitBlobError({
              cause,
              message: "Git returned an empty Aksara repository root.",
              operation: "find-root",
            })
        )
      );
      const revisionOutput = yield* runGitText(
        executor,
        makeGitCommand(
          "rev-parse",
          "--verify",
          "--end-of-options",
          `${input.revision}^{commit}`
        ).pipe(workingDirectory(repositoryRoot)),
        "resolve-commit",
        "Git could not resolve the reviewed Aksara revision."
      );
      const commitSha = yield* Schema.decodeUnknown(GitCommitShaSchema)(
        revisionOutput.trim()
      ).pipe(
        Effect.mapError(
          (cause) =>
            new GitBlobError({
              cause,
              message: "Git did not return a full lowercase commit SHA.",
              operation: "resolve-commit",
            })
        )
      );
      if (commitSha !== input.revision) {
        return yield* new GitBlobError({
          cause: {
            actualCommitSha: commitSha,
            expectedCommitSha: input.revision,
          },
          message: "The reviewed revision is not an exact commit object SHA.",
          operation: "resolve-commit",
        });
      }

      const blobCoordinate = `${commitSha}:${input.sourcePath}`;
      const sizeOutput = yield* runGitText(
        executor,
        makeGitCommand("cat-file", "-s", blobCoordinate).pipe(
          workingDirectory(repositoryRoot)
        ),
        "size-blob",
        "Git could not measure the reviewed corpus blob."
      );
      const blobSize = yield* Schema.decodeUnknown(GitBlobSizeSchema)(
        sizeOutput.trim()
      ).pipe(
        Effect.mapError(
          (cause) =>
            new GitBlobError({
              cause,
              message: "Git did not return a valid corpus blob byte size.",
              operation: "size-blob",
            })
        )
      );
      if (blobSize > MAX_RAW_MDX_BYTES) {
        return yield* new GitBlobError({
          cause: { actualBytes: blobSize, maxBytes: MAX_RAW_MDX_BYTES },
          message: "The reviewed corpus blob exceeds the raw MDX byte limit.",
          operation: "size-blob",
        });
      }

      const blobBytes = yield* runGitBytes(
        executor,
        makeGitCommand("cat-file", "blob", blobCoordinate).pipe(
          workingDirectory(repositoryRoot)
        ),
        "read-blob",
        "Git could not read the reviewed corpus blob.",
        blobSize
      );
      if (blobBytes.byteLength !== blobSize) {
        return yield* new GitBlobError({
          cause: { actualBytes: blobBytes.byteLength, expectedBytes: blobSize },
          message: "Git returned a corpus blob with an unexpected byte size.",
          operation: "read-blob",
        });
      }
      return yield* decodeGitText(
        blobBytes,
        "decode-blob",
        "The reviewed corpus blob is not valid UTF-8."
      );
    });

    return GitBlob.of({ read });
  })
);
