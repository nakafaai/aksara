import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Context, Effect, Layer, Schema } from "effect";
import {
  decodeGitBatchMetadata,
  decodeGitBatchResponse,
  type GitBatchError,
  MAX_GIT_BATCH_BLOBS,
  makeGitBatchRequest,
  makeGitMetadataRequest,
} from "#publisher/git/batch";

const MAX_GIT_TEXT_BYTES = 4096;
const MAX_GIT_ERROR_BYTES = 16 * 1024;

const GitBlobOperationSchema = Schema.Literals([
  "resolve-commit",
  "size-blob",
  "decode-blob",
  "read-blob",
]);
type GitBlobOperation = typeof GitBlobOperationSchema.Type;

const GitBlobInputSchema = Schema.Struct({
  revision: GitCommitShaSchema,
  sourcePaths: Schema.Array(CorpusSourcePathSchema).check(
    Schema.isMaxLength(MAX_GIT_BATCH_BLOBS)
  ),
});
export type GitBlobInput = typeof GitBlobInputSchema.Type;

/** A repository command or exact-revision validation step failed. */
export class GitBlobError extends Schema.TaggedError<GitBlobError>()(
  "GitBlobError",
  {
    cause: Schema.Unknown,
    message: Schema.Trimmed.check(Schema.isNonEmpty()),
    operation: GitBlobOperationSchema,
  }
) {}

/** Reads one bounded batch of immutable UTF-8 corpus blobs. */
export class GitBlob extends Context.Service<
  GitBlob,
  {
    /** Resolves unique paths at one commit after checking every body size. */
    readonly read: (
      input: GitBlobInput
    ) => Effect.Effect<ReadonlyMap<CorpusSourcePath, string>, GitBlobError>;
  }
>()("AksaraGitBlob") {}

/** Decodes trusted bytes without replacement characters or BOM removal. */
const decodeGitText = Effect.fn("AksaraPublisher.decodeGitText")(
  (bytes: Uint8Array, operation: GitBlobOperation, message: string) =>
    Effect.try({
      catch: (cause) => new GitBlobError({ cause, message, operation }),
      try: () =>
        new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(
          bytes
        ),
    })
);

/** Associates protocol failures with the Git operation that produced them. */
function batchError(cause: GitBatchError, operation: GitBlobOperation) {
  return new GitBlobError({
    cause,
    message:
      cause.reason === "limit"
        ? "The authored corpus blob exceeds its byte limit."
        : "Git returned an invalid corpus blob batch.",
    operation: cause.reason === "limit" ? "size-blob" : operation,
  });
}

/** Executes one exact Git command with independently bounded output pipes. */
const runGitBytes = Effect.fn("AksaraPublisher.runGitBytes")(
  (
    exactProcess: typeof ExactProcess.Service,
    repositoryRoot: string,
    args: readonly string[],
    operation: GitBlobOperation,
    message: string,
    maxBytes: number,
    stdin?: Uint8Array
  ) =>
    exactProcess
      .run(
        makeExactGitInput({
          args,
          root: repositoryRoot,
          stderrLimit: MAX_GIT_ERROR_BYTES,
          stdoutLimit: maxBytes,
          ...(stdin === undefined ? {} : { stdin }),
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
      )
);

/** Builds an exact-checkout Git implementation for bounded immutable blobs. */
export function makeGitBlobLive(repositoryRoot: string) {
  return Layer.effect(
    GitBlob,
    ExactProcess.pipe(
      Effect.map((exactProcess) => {
        /** Checks metadata first, then reads only the verified immutable objects. */
        const read = Effect.fn("AksaraPublisher.GitBlob.read")(function* (
          input: GitBlobInput
        ) {
          const { revision, sourcePaths } = yield* Schema.decodeEffect(
            GitBlobInputSchema
          )(input).pipe(
            Effect.mapError(
              (cause) =>
                new GitBlobError({
                  cause,
                  message: "The exact Git source batch is invalid.",
                  operation: "resolve-commit",
                })
            )
          );
          const paths = [...new Set(sourcePaths)];
          const result = new Map<CorpusSourcePath, string>();
          if (paths.length === 0) {
            return result;
          }
          const revisionBytes = yield* runGitBytes(
            exactProcess,
            repositoryRoot,
            [
              "rev-parse",
              "--verify",
              "--end-of-options",
              `${revision}^{commit}`,
            ],
            "resolve-commit",
            "Git could not resolve the authored Aksara revision.",
            MAX_GIT_TEXT_BYTES
          );
          const revisionText = yield* decodeGitText(
            revisionBytes,
            "resolve-commit",
            "Git returned an invalid revision."
          );
          const commitSha = yield* Schema.decodeEffect(GitCommitShaSchema)(
            revisionText.trim()
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
          if (commitSha !== revision) {
            return yield* new GitBlobError({
              cause: {
                actualCommitSha: commitSha,
                expectedCommitSha: revision,
              },
              message:
                "The reviewed revision is not an exact commit object SHA.",
              operation: "resolve-commit",
            });
          }
          const metadataRequest = makeGitMetadataRequest(commitSha, paths);
          const metadataOutput = yield* runGitBytes(
            exactProcess,
            repositoryRoot,
            ["cat-file", "--batch-check"],
            "size-blob",
            "Git could not inspect the reviewed corpus blob batch.",
            metadataRequest.stdoutLimit,
            metadataRequest.stdin
          );
          const metadata = yield* decodeGitBatchMetadata(
            metadataOutput,
            paths
          ).pipe(Effect.mapError((cause) => batchError(cause, "size-blob")));
          const bodyRequest = makeGitBatchRequest(metadata);
          const bodyOutput = yield* runGitBytes(
            exactProcess,
            repositoryRoot,
            ["cat-file", "--batch"],
            "read-blob",
            "Git could not read the reviewed corpus blob batch.",
            bodyRequest.stdoutLimit,
            bodyRequest.stdin
          );
          const bodies = yield* decodeGitBatchResponse(
            bodyOutput,
            metadata
          ).pipe(Effect.mapError((cause) => batchError(cause, "read-blob")));
          for (const [sourcePath, bytes] of bodies) {
            const rawMdx = yield* decodeGitText(
              bytes,
              "decode-blob",
              "The reviewed corpus blob is not valid UTF-8."
            );
            result.set(sourcePath, rawMdx);
          }
          return result;
        });
        return GitBlob.of({ read });
      })
    )
  );
}
