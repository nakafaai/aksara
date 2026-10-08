import { Array as Arr, Effect, FileSystem, Schema } from "effect";

import { runGit } from "#scripts/git";

const TYPESCRIPT_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const VENDORED_PATH_PREFIX = "repos/";
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;

/** Git could not list the repository's tracked files. */
export class TrackedFilesError extends Schema.TaggedError<TrackedFilesError>()(
  "TrackedFilesError",
  { message: Schema.String }
) {}

/** Runs Git in the working directory and returns its standard output. */
const gitOutput = Effect.fn("AksaraPolicy.gitOutput")(function* (
  args: readonly string[]
) {
  const result = yield* runGit(args);
  if (result.exitCode !== 0) {
    return yield* new TrackedFilesError({
      message: `git ${Arr.join(args, " ")} failed: ${result.stderr.trim()}`,
    });
  }
  return result.stdout;
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
