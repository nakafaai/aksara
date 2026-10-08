import { Array as Arr, Effect, FileSystem, Schema, Stream } from "effect";
import type { PlatformError } from "effect/PlatformError";
import { ChildProcess } from "effect/process";

const TYPESCRIPT_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const VENDORED_PATH_PREFIX = "repos/";
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;

/** Git could not list the repository's tracked files. */
export class TrackedFilesError extends Schema.TaggedError<TrackedFilesError>()(
  "TrackedFilesError",
  { message: Schema.String }
) {}

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

/** Runs Git in the working directory and returns its standard output. */
const gitOutput = Effect.fn("AksaraPolicy.gitOutput")(function* (
  args: readonly string[]
) {
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const command = yield* ChildProcess.make("git", args);
      const [exitCode, stdout, stderr] = yield* Effect.all(
        [
          command.exitCode,
          collectText(command.stdout),
          collectText(command.stderr),
        ],
        { concurrency: 3 }
      );
      if (exitCode !== 0) {
        return yield* new TrackedFilesError({
          message: `git ${Arr.join(args, " ")} failed: ${stderr.trim()}`,
        });
      }
      return stdout;
    })
  );
});

/** Parses Git output into existing repository paths outside vendored source. */
export function parseTrackedFiles<E>(
  output: string,
  pathExists: (path: string) => Effect.Effect<boolean, E>
): Effect.Effect<readonly string[], E> {
  return Effect.filter(
    Arr.filter(
      output.split("\n"),
      (file) => file.length > 0 && !file.startsWith(VENDORED_PATH_PREFIX)
    ),
    pathExists
  );
}

/** Lists Git-known repository files that still exist on disk. */
export const trackedFiles = Effect.fn("AksaraPolicy.trackedFiles")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const output = yield* gitOutput([
      "ls-files",
      "--cached",
      "--others",
      "--exclude-standard",
    ]);
    return yield* parseTrackedFiles(output, (file) => fileSystem.exists(file));
  }
);

/** Lists authored TypeScript files while excluding generated directories. */
export function typescriptFiles(files: readonly string[]): readonly string[] {
  return Arr.filter(
    files,
    (file) =>
      TYPESCRIPT_PATTERN.test(file) && !GENERATED_PATH_PATTERN.test(file)
  );
}

/** Reports stable policy diagnostics and marks the current script as failed. */
export function enforceViolations(
  heading: string,
  violations: readonly string[]
): void {
  if (violations.length === 0) {
    return;
  }
  process.stderr.write(`${heading}:\n${Arr.join(violations, "\n")}\n`);
  process.exitCode = 1;
}
