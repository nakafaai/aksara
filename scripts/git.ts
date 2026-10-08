import { Effect, Stream } from "effect";
import type { PlatformError } from "effect/PlatformError";
import { ChildProcess } from "effect/process";

/** Collects one child-process stream as text without leaving it unscoped. */
function collectText(stream: Stream.Stream<Uint8Array, PlatformError>) {
  return stream.pipe(
    Stream.decodeText(),
    Stream.runFold(
      () => "",
      (output, chunk) => output + chunk
    )
  );
}

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
