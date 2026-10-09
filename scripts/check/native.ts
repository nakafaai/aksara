import { Effect, FileSystem, Path, Schema } from "effect";
import { ChildProcess } from "effect/process";

import { runEntry } from "#scripts/entry";
import { collectText } from "#scripts/output";

/** The public nakafa.com repository that owns the Effect-native source check. */
const REPOSITORY_URL = "https://github.com/nakafaai/nakafa.com.git";

/**
 * The nakafa.com commit whose source check runs here. Move this pin on purpose,
 * in a pull request of its own, after the new engine reports zero findings here.
 */
export const NAKAFA_COMMIT = "92a806f4c8d6aea66fa3535e9256778b49ed5a09";

/** The steps of the native check, in the order they run. */
const NativeStepSchema = Schema.Literals(["clone", "install", "check"]);

/** One step of the native check that failed, or whose command could not start. */
export class NativeCheckError extends Schema.TaggedError<NativeCheckError>()(
  "NativeCheckError",
  {
    exitCode: Schema.optionalKey(Schema.Finite),
    message: Schema.String,
    step: NativeStepSchema,
  }
) {}

/** One step of the native check. */
type NativeStep = typeof NativeStepSchema.Type;

/** Options for a command whose standard output stays out of the way while its standard error is kept for a failure. */
function quietOptions(cwd: string): ChildProcess.CommandOptions {
  return { cwd, stdin: "ignore", stdout: "ignore" };
}

/** Options for the source check, whose standard output and standard error reach the terminal while it runs. */
const CHECK_OPTIONS: ChildProcess.CommandOptions = {
  stderr: "inherit",
  stdin: "ignore",
  stdout: "inherit",
};

/**
 * Runs one command to completion. A command that cannot start, or that exits
 * with a code other than zero, fails with its step. An unsuccessful exit also
 * carries the trimmed text of its standard error.
 */
const runCommand = Effect.fn("AksaraNative.runCommand")(function* (
  step: NativeStep,
  command: ChildProcess.StandardCommand
) {
  const [exitCode, stderr] = yield* Effect.scoped(
    Effect.gen(function* () {
      const handle = yield* command;
      return yield* Effect.all([handle.exitCode, collectText(handle.stderr)], {
        concurrency: 2,
      });
    })
  ).pipe(
    Effect.mapError(
      (cause) =>
        new NativeCheckError({
          message: `The ${step} step could not start: ${cause.message}`,
          step,
        })
    )
  );
  if (exitCode !== 0) {
    const output = stderr.trim();
    return yield* new NativeCheckError({
      exitCode,
      message:
        output === ""
          ? `The ${step} step exited with code ${exitCode}.`
          : `The ${step} step exited with code ${exitCode}: ${output}`,
      step,
    });
  }
});

/**
 * Runs the pinned nakafa.com source check against the repository in the working
 * directory. The check runs from a temporary checkout of nakafa.com, which is
 * removed when this program ends, whether or not the check passes.
 */
export const verifyNativeSource = Effect.fn("AksaraNative.verifySource")(
  function* () {
    yield* Effect.scoped(
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const checkout = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-native-",
        });
        yield* runCommand(
          "clone",
          ChildProcess.make("git", ["init"], quietOptions(checkout))
        );
        yield* runCommand(
          "clone",
          ChildProcess.make(
            "git",
            ["fetch", "--depth", "1", REPOSITORY_URL, NAKAFA_COMMIT],
            quietOptions(checkout)
          )
        );
        yield* runCommand(
          "clone",
          ChildProcess.make(
            "git",
            ["checkout", "--detach", "FETCH_HEAD"],
            quietOptions(checkout)
          )
        );
        yield* runCommand(
          "install",
          ChildProcess.make(
            "pnpm",
            ["install", "--frozen-lockfile", "--filter", "{.}"],
            quietOptions(checkout)
          )
        );
        yield* runCommand(
          "check",
          ChildProcess.make(
            "node",
            [path.join(checkout, "scripts", "check", "tests.ts")],
            CHECK_OPTIONS
          )
        );
      })
    );
  }
);

runEntry(import.meta.main, verifyNativeSource());
