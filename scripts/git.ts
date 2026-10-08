import { Effect } from "effect";
import { ChildProcess } from "effect/process";
import { collectText } from "#scripts/output";

/**
 * Runs one Git command, in the working directory unless `cwd` names another,
 * and returns its exit code with both output streams as text.
 */
export const runGit = Effect.fn("AksaraGit.run")(function* (
  args: readonly string[],
  options?: { readonly cwd?: string }
) {
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const command = yield* ChildProcess.make("git", args, options);
      const [exitCode, stdout, stderr] = yield* Effect.all(
        [
          command.exitCode,
          collectText(command.stdout),
          collectText(command.stderr),
        ],
        { concurrency: 3 }
      );
      return { exitCode, stderr, stdout };
    })
  );
});
