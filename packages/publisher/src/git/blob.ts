import type {
  CorpusSourcePath,
  GitCommitSha,
} from "@nakafa/aksara-contracts/ids";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Context, Effect, Layer, Schema } from "effect";

const MAX_GIT_TEXT_BYTES = 4096;
const MAX_GIT_ERROR_BYTES = 16 * 1024;

const GitBlobOperationSchema = Schema.Literal(
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

/** Decodes trusted command bytes without accepting replacement characters. */
function decodeGitText(
  bytes: Uint8Array,
  operation: GitBlobOperation,
  message: string
) {
  return Effect.try({
    catch: (cause) => new GitBlobError({ cause, message, operation }),
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  });
}

/** Executes one exact Git command with independently bounded output pipes. */
function runGitBytes(
  exactProcess: typeof ExactProcess.Service,
  repositoryRoot: string,
  args: readonly string[],
  operation: GitBlobOperation,
  message: string,
  maxBytes: number
) {
  return exactProcess
    .run(
      makeExactGitInput({
        args,
        root: repositoryRoot,
        stderrLimit: MAX_GIT_ERROR_BYTES,
        stdoutLimit: maxBytes,
      })
    )
    .pipe(
      Effect.mapError(
        (cause) => new GitBlobError({ cause, message, operation })
      ),
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
    );
}

/** Executes one small Git metadata command and fatally decodes its output. */
function runGitText(
  exactProcess: typeof ExactProcess.Service,
  repositoryRoot: string,
  args: readonly string[],
  operation: GitBlobOperation,
  message: string
) {
  return runGitBytes(
    exactProcess,
    repositoryRoot,
    args,
    operation,
    message,
    MAX_GIT_TEXT_BYTES
  ).pipe(Effect.flatMap((bytes) => decodeGitText(bytes, operation, message)));
}

/** Builds an exact-checkout Git implementation for immutable corpus blobs. */
export function makeGitBlobLive(repositoryRoot: string) {
  return Layer.effect(
    GitBlob,
    ExactProcess.pipe(
      Effect.map((exactProcess) => {
        /** Reads one corpus blob only after resolving an exact commit SHA. */
        const read = Effect.fn("AksaraPublisher.GitBlob.read")(function* (
          input: GitBlobInput
        ) {
          const revisionOutput = yield* runGitText(
            exactProcess,
            repositoryRoot,
            [
              "rev-parse",
              "--verify",
              "--end-of-options",
              `${input.revision}^{commit}`,
            ],
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
              message:
                "The reviewed revision is not an exact commit object SHA.",
              operation: "resolve-commit",
            });
          }

          const blobCoordinate = `${commitSha}:${input.sourcePath}`;
          const sizeOutput = yield* runGitText(
            exactProcess,
            repositoryRoot,
            ["cat-file", "-s", blobCoordinate],
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
              message:
                "The reviewed corpus blob exceeds the raw MDX byte limit.",
              operation: "size-blob",
            });
          }

          const blobBytes = yield* runGitBytes(
            exactProcess,
            repositoryRoot,
            ["cat-file", "blob", blobCoordinate],
            "read-blob",
            "Git could not read the reviewed corpus blob.",
            blobSize
          );
          if (blobBytes.byteLength !== blobSize) {
            return yield* new GitBlobError({
              cause: {
                actualBytes: blobBytes.byteLength,
                expectedBytes: blobSize,
              },
              message:
                "Git returned a corpus blob with an unexpected byte size.",
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
    )
  );
}
