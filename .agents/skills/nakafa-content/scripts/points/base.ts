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

/** Lists the tracked files below the paths that differ from the base revision. */
export const changedFiles = Effect.fn("PointsCheck.changedFiles")(function* (
  root: string,
  base: string,
  paths: readonly string[]
) {
  const output = yield* runGit(
    root,
    [
      "diff",
      "--name-only",
      "-z",
      "--no-renames",
      "--diff-filter=M",
      "--relative",
      base,
      "--",
      ...paths,
    ],
    "unreadable-entry"
  );
  return new Set(output.split("\0").filter((file) => file !== ""));
});

/** Reads one file as it was committed at the base revision. */
export const readBase = Effect.fn("PointsCheck.readBase")(function* (
  root: string,
  base: string,
  file: string
) {
  return yield* runGit(root, ["show", `${base}:./${file}`], "unreadable-entry");
});
