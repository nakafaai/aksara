import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { PreviewRepositorySchema } from "@nakafa/aksara-contracts/preview/spec";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect, Schema } from "effect";

const MAXIMUM_GIT_OUTPUT_BYTES = 4 * 1024 * 1024;
const MAXIMUM_GIT_ERROR_BYTES = 16 * 1024;

/** Git could not prove the exact revision or dirty state of one checkout. */
export class PreviewEvidenceError extends Schema.TaggedError<PreviewEvidenceError>()(
  "PreviewEvidenceError",
  {
    repository: Schema.Literals(["aksara", "nakafa"]),
    stage: Schema.Literals(["sha", "status"]),
  }
) {}

/** Production release preparation refuses a dirty authored checkout. */
export class ReleaseEvidenceError extends Schema.TaggedError<ReleaseEvidenceError>()(
  "ReleaseEvidenceError",
  { reason: Schema.Literal("dirty") }
) {}

/** Authored source changed while one production release was being prepared. */
export class ReleaseRevisionChangedError extends Schema.TaggedError<ReleaseRevisionChangedError>()(
  "ReleaseRevisionChangedError",
  { actual: GitCommitShaSchema, expected: GitCommitShaSchema }
) {}

/** Fatally decodes bounded Git output without retaining process diagnostics. */
function decodeGitOutput(bytes: Uint8Array, error: PreviewEvidenceError) {
  return Effect.try({
    catch: () => error,
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  });
}

/** Runs one exact Git evidence process and requires a zero exit code. */
const readGit = Effect.fn("AksaraCli.readGitEvidence")(function* (input: {
  readonly repository: "aksara" | "nakafa";
  readonly root: string;
  readonly stage: "sha" | "status";
}) {
  const exactProcess = yield* ExactProcess;
  const args =
    input.stage === "sha"
      ? ["rev-parse", "--verify", "HEAD"]
      : ["status", "--porcelain=v1", "--untracked-files=normal"];
  const error = new PreviewEvidenceError({
    repository: input.repository,
    stage: input.stage,
  });
  const output = yield* exactProcess
    .run(
      makeExactGitInput({
        args,
        root: input.root,
        stderrLimit: MAXIMUM_GIT_ERROR_BYTES,
        stdoutLimit: MAXIMUM_GIT_OUTPUT_BYTES,
      })
    )
    .pipe(Effect.mapError(() => error));
  if (output.exitCode !== 0) {
    return yield* error;
  }
  return yield* decodeGitOutput(output.stdout, error);
});

/** Decodes one full Git revision without accepting abbreviated output. */
const decodeGitSha = Effect.fn("AksaraCli.decodeGitSha")(function* (
  repository: "aksara" | "nakafa",
  rawSha: string
) {
  return yield* Schema.decodeEffect(GitCommitShaSchema)(rawSha.trim()).pipe(
    Effect.mapError(
      () => new PreviewEvidenceError({ repository, stage: "sha" })
    )
  );
});

/** Captures one full commit SHA and a non-destructive dirty-state signal. */
export const readRepositoryEvidence = Effect.fn(
  "AksaraCli.readRepositoryEvidence"
)(function* (repository: "aksara" | "nakafa", root: string) {
  const initialSha = yield* readGit({ repository, root, stage: "sha" }).pipe(
    Effect.flatMap((rawSha) => decodeGitSha(repository, rawSha))
  );
  const status = yield* readGit({ repository, root, stage: "status" });
  const finalSha = yield* readGit({ repository, root, stage: "sha" }).pipe(
    Effect.flatMap((rawSha) => decodeGitSha(repository, rawSha))
  );
  if (finalSha !== initialSha) {
    return yield* new PreviewEvidenceError({ repository, stage: "sha" });
  }
  return PreviewRepositorySchema.make({
    dirty: status.length > 0,
    sha: finalSha,
  });
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

/** Requires post-preparation Git evidence to match the initial clean revision. */
export function validateStableAksaraRevision(
  expected: typeof GitCommitShaSchema.Type,
  actual: typeof GitCommitShaSchema.Type
) {
  if (actual === expected) {
    return Effect.void;
  }
  return Effect.fail(new ReleaseRevisionChangedError({ actual, expected }));
}
