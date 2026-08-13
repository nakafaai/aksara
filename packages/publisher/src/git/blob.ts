import type {
  CorpusSourcePath,
  GitCommitSha,
} from "@nakafa/aksara-contracts/ids";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_REVIEWED_OFFICIAL_SOURCE_BYTES } from "@nakafa/aksara-contracts/limits";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Context, Effect, Layer, Schema } from "effect";
import {
  decodeGitBatchResponse,
  makeGitBatchRequest,
  partitionGitBlobInputs,
} from "#publisher/git/batch";

const MAX_GIT_TEXT_BYTES = 4096;
const MAX_GIT_ERROR_BYTES = 16 * 1024;

const GitBlobOperationSchema = Schema.Literal(
  "resolve-commit",
  "size-blob",
  "decode-blob",
  "read-blob"
);
type GitBlobOperation = typeof GitBlobOperationSchema.Type;

const GitBlobLimitSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.positive(),
  Schema.lessThanOrEqualTo(MAX_REVIEWED_OFFICIAL_SOURCE_BYTES)
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
  readonly maxBytes: number;
  readonly revision: GitCommitSha;
  readonly sourcePath: CorpusSourcePath;
}

/** Reads immutable corpus blobs through argument-safe Git commands. */
export class GitBlob extends Context.Tag("AksaraGitBlob")<
  GitBlob,
  {
    /** Returns the exact unmodified blob bytes at a verified commit. */
    readonly readBytes: (
      input: GitBlobInput
    ) => Effect.Effect<Uint8Array, GitBlobError>;
    /** Returns exact unmodified blobs through bounded Git batch processes. */
    readonly readManyBytes: (
      inputs: readonly GitBlobInput[]
    ) => Effect.Effect<ReadonlyMap<CorpusSourcePath, Uint8Array>, GitBlobError>;
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
  maxBytes: number,
  stdin?: Uint8Array
) {
  const processInput = makeExactGitInput({
    args,
    root: repositoryRoot,
    stderrLimit: MAX_GIT_ERROR_BYTES,
    stdoutLimit: maxBytes,
    ...(stdin === undefined ? {} : { stdin }),
  });
  return exactProcess.run(processInput).pipe(
    Effect.mapError((cause) => new GitBlobError({ cause, message, operation })),
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
        /** Reads exact corpus blobs after resolving one shared commit SHA. */
        const readManyBytes = Effect.fn(
          "AksaraPublisher.GitBlob.readManyBytes"
        )(function* (inputs: readonly GitBlobInput[]) {
          if (inputs.length === 0) {
            return new Map<CorpusSourcePath, Uint8Array>();
          }
          const revision = inputs[0]?.revision;
          const seenPaths = new Set<CorpusSourcePath>();
          const bounded = yield* Effect.forEach(inputs, (input) =>
            Schema.decodeUnknown(GitBlobLimitSchema)(input.maxBytes).pipe(
              Effect.mapError(
                (cause) =>
                  new GitBlobError({
                    cause,
                    message: "The reviewed corpus blob limit is invalid.",
                    operation: "size-blob",
                  })
              ),
              Effect.flatMap((maxBytes) => {
                if (
                  input.revision !== revision ||
                  seenPaths.has(input.sourcePath)
                ) {
                  return Effect.fail(
                    new GitBlobError({
                      cause: input,
                      message:
                        "A Git blob batch requires one revision and unique source paths.",
                      operation: "resolve-commit",
                    })
                  );
                }
                seenPaths.add(input.sourcePath);
                return Effect.succeed({
                  maxBytes,
                  sourcePath: input.sourcePath,
                });
              })
            )
          );
          const revisionOutput = yield* runGitText(
            exactProcess,
            repositoryRoot,
            [
              "rev-parse",
              "--verify",
              "--end-of-options",
              `${revision}^{commit}`,
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

          const decoded = yield* Effect.forEach(
            partitionGitBlobInputs(bounded),
            (blobs) => {
              const request = makeGitBatchRequest(commitSha, blobs);
              return runGitBytes(
                exactProcess,
                repositoryRoot,
                ["cat-file", "--batch"],
                "read-blob",
                "Git could not read the reviewed corpus blob batch.",
                request.stdoutLimit,
                request.stdin
              ).pipe(
                Effect.flatMap((output) =>
                  decodeGitBatchResponse(output, blobs)
                ),
                Effect.mapError((cause) =>
                  cause._tag === "GitBlobError"
                    ? cause
                    : new GitBlobError({
                        cause: {
                          batchReason: cause.reason,
                          detail: cause.cause,
                          sourcePath: cause.sourcePath,
                        },
                        message:
                          cause.reason === "limit"
                            ? "The reviewed corpus blob exceeds its byte limit."
                            : "Git returned an invalid corpus blob batch.",
                        operation:
                          cause.reason === "limit" ? "size-blob" : "read-blob",
                      })
                )
              );
            },
            { concurrency: 2 }
          );
          const result = new Map<CorpusSourcePath, Uint8Array>();
          for (const batch of decoded) {
            for (const [sourcePath, bytes] of batch) {
              result.set(sourcePath, bytes);
            }
          }
          return result;
        });

        /** Reads one corpus blob through the bounded batch implementation. */
        const readBytes = Effect.fn("AksaraPublisher.GitBlob.readBytes")(
          function* (input: GitBlobInput) {
            const blobs = yield* readManyBytes([input]);
            return yield* Effect.fromNullable(blobs.get(input.sourcePath)).pipe(
              Effect.orDie
            );
          }
        );

        /** Decodes one exact corpus blob without normalizing its bytes. */
        const read = Effect.fn("AksaraPublisher.GitBlob.read")(
          (input: GitBlobInput) =>
            readBytes(input).pipe(
              Effect.flatMap((blobBytes) =>
                decodeGitText(
                  blobBytes,
                  "decode-blob",
                  "The reviewed corpus blob is not valid UTF-8."
                )
              )
            )
        );

        return GitBlob.of({ read, readBytes, readManyBytes });
      })
    )
  );
}
