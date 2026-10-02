import { Effect, Stream } from "effect";
import type { PlatformError } from "effect/PlatformError";
import { ChildProcess } from "effect/process";
import {
  PointsCheckError,
  type PointsFailureReason,
} from "#nakafa-content/points/error";

/** Collects one child-process byte stream as UTF-8 text. */
function collectText(stream: Stream.Stream<Uint8Array, PlatformError>) {
  return stream.pipe(
    Stream.decodeText(),
    Stream.runFold(
      () => "",
      (output, chunk) => output + chunk
    )
  );
}

/** Runs Git in the repository and returns stdout or a typed failure. */
const runGit = Effect.fn("PointsCheck.runGit")(function* (
  root: string,
  args: readonly string[],
  reason: PointsFailureReason
) {
  const { exitCode, stderr, stdout } = yield* Effect.scoped(
    Effect.gen(function* () {
      const command = yield* ChildProcess.make("git", args, { cwd: root });
      const [code, output, errors] = yield* Effect.all(
        [
          command.exitCode,
          collectText(command.stdout),
          collectText(command.stderr),
        ],
        { concurrency: 3 }
      );
      return { exitCode: code, stderr: errors, stdout: output };
    })
  ).pipe(
    Effect.mapError(
      (error) => new PointsCheckError({ detail: error.message, reason })
    )
  );
  if (exitCode !== 0) {
    return yield* new PointsCheckError({
      detail: `git ${args.join(" ")}: ${stderr.trim() || `exit code ${exitCode}`}`,
      reason,
    });
  }
  return stdout;
});

/**
 * Resolves the revision a change started from. Comparing with the merge base
 * keeps work that landed on the base ref after the branch point from reading as
 * visuals this change removed.
 */
export const resolveBase = Effect.fn("PointsCheck.resolveBase")(function* (
  root: string,
  ref: string
) {
  const output = yield* runGit(
    root,
    ["merge-base", ref, "HEAD"],
    "unknown-base"
  );
  return output.trim();
});

/**
 * Pairs each changed file with its path at the base revision. Git reports a
 * modified file as `M`, then its path, and a renamed one as `R` and a score,
 * then its old and its new path, every field ending with a NUL byte.
 */
export const parseChanges = Effect.fn("PointsCheck.parseChanges")(function* (
  output: string
) {
  const fields = output.split("\0");
  const changes = new Map<string, string>();
  let index = 0;
  while (index < fields.length - 1) {
    const [status, from, to] = fields.slice(index, index + 3);
    const renamed = status?.startsWith("R") === true;
    const head = renamed ? to : from;
    if (!(from && head)) {
      return yield* new PointsCheckError({
        detail: `Unexpected git diff output: ${JSON.stringify(output)}`,
        reason: "unreadable-entry",
      });
    }
    changes.set(head, from);
    index += renamed ? 3 : 2;
  }
  return changes;
});

/**
 * Lists the tracked files below the paths that differ from the base revision,
 * each paired with the path it had there. Git pairs a renamed file with its
 * old path, so moving a lesson never hides a lost visual.
 */
export const changedFiles = Effect.fn("PointsCheck.changedFiles")(function* (
  root: string,
  base: string,
  paths: readonly string[]
) {
  const output = yield* runGit(
    root,
    [
      "diff",
      "--name-status",
      "-z",
      "--find-renames",
      "--diff-filter=MR",
      "--relative",
      base,
      "--",
      ...paths,
    ],
    "unreadable-entry"
  );
  return yield* parseChanges(output);
});

/** Reads one file as it was committed at the base revision. */
export const readBase = Effect.fn("PointsCheck.readBase")(function* (
  root: string,
  base: string,
  file: string
) {
  return yield* runGit(root, ["show", `${base}:./${file}`], "unreadable-entry");
});
