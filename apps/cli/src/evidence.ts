import { make as makeCommand } from "@effect/platform/Command";
import { CommandExecutor } from "@effect/platform/CommandExecutor";
import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { PreviewRepositorySchema } from "@nakafa/aksara-contracts/preview/spec";
import { Effect, Schema, Stream } from "effect";

const MAXIMUM_GIT_OUTPUT_BYTES = 4 * 1024 * 1024;

interface GitOutputState {
  readonly chunks: readonly Uint8Array[];
  readonly size: number;
}

const EMPTY_GIT_OUTPUT: GitOutputState = { chunks: [], size: 0 };

/** Git could not prove the exact revision or dirty state of one checkout. */
export class PreviewEvidenceError extends Schema.TaggedError<PreviewEvidenceError>()(
  "PreviewEvidenceError",
  {
    repository: Schema.Literal("aksara", "nakafa"),
    stage: Schema.Literal("sha", "status"),
  }
) {}

/** Production release preparation refuses a dirty authored checkout. */
export class ReleaseEvidenceError extends Schema.TaggedError<ReleaseEvidenceError>()(
  "ReleaseEvidenceError",
  { reason: Schema.Literal("dirty") }
) {}

/** Collects bounded command bytes before strict UTF-8 decoding. */
const collectGitOutput = Effect.fn("AksaraCli.collectGitOutput")(
  (stream: Stream.Stream<Uint8Array, unknown>) =>
    Stream.runFoldEffect(stream, EMPTY_GIT_OUTPUT, (state, chunk) => {
      const size = state.size + chunk.byteLength;
      if (size > MAXIMUM_GIT_OUTPUT_BYTES) {
        return Effect.fail(undefined);
      }
      return Effect.succeed({ chunks: [...state.chunks, chunk], size });
    }).pipe(
      Effect.flatMap(({ chunks, size }) =>
        Effect.try({
          catch: () => undefined,
          try: () => {
            const bytes = new Uint8Array(size);
            let offset = 0;
            for (const chunk of chunks) {
              bytes.set(chunk, offset);
              offset += chunk.byteLength;
            }
            return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
          },
        })
      )
    )
);

/** Runs one bounded Git evidence process and requires a zero exit code. */
const readGit = Effect.fn("AksaraCli.readGitEvidence")(
  (input: {
    readonly repository: "aksara" | "nakafa";
    readonly root: string;
    readonly stage: "sha" | "status";
  }) => {
    const args =
      input.stage === "sha"
        ? ["-C", input.root, "rev-parse", "--verify", "HEAD"]
        : [
            "-C",
            input.root,
            "status",
            "--porcelain=v1",
            "--untracked-files=normal",
          ];
    const error = new PreviewEvidenceError({
      repository: input.repository,
      stage: input.stage,
    });
    return Effect.scoped(
      CommandExecutor.pipe(
        Effect.flatMap((executor) =>
          executor.start(makeCommand("git", ...args))
        ),
        Effect.flatMap((process) =>
          Effect.all([process.exitCode, collectGitOutput(process.stdout)], {
            concurrency: 2,
          })
        ),
        Effect.flatMap(([exitCode, output]) =>
          exitCode === 0 ? Effect.succeed(output) : Effect.fail(undefined)
        ),
        Effect.mapError(() => error)
      )
    );
  }
);

/** Captures one full commit SHA and a non-destructive dirty-state signal. */
export const readRepositoryEvidence = Effect.fn(
  "AksaraCli.readRepositoryEvidence"
)(function* (repository: "aksara" | "nakafa", root: string) {
  const [rawSha, status] = yield* Effect.all(
    [
      readGit({ repository, root, stage: "sha" }),
      readGit({ repository, root, stage: "status" }),
    ],
    { concurrency: 2 }
  );
  const sha = yield* Schema.decodeUnknown(GitCommitShaSchema)(
    rawSha.trim()
  ).pipe(
    Effect.mapError(
      () => new PreviewEvidenceError({ repository, stage: "sha" })
    )
  );
  return PreviewRepositorySchema.make({ dirty: status.length > 0, sha });
});

/** Returns the exact clean Aksara revision accepted for release provenance. */
export const readCleanAksaraRevision = Effect.fn(
  "AksaraCli.readCleanAksaraRevision"
)(function* (root: string) {
  const evidence = yield* readRepositoryEvidence("aksara", root);
  if (evidence.dirty) {
    return yield* new ReleaseEvidenceError({ reason: "dirty" });
  }
  return evidence.sha;
});
