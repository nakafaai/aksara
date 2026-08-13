import { FileSystem } from "@effect/platform";
import { Effect, Schema } from "effect";

/** One rollback-safe directory replacement step failed. */
export class DirectoryReplacementError extends Schema.TaggedError<DirectoryReplacementError>()(
  "DirectoryReplacementError",
  {
    cause: Schema.Unknown,
    phase: Schema.Literal("backup", "cleanup", "install", "restore"),
  }
) {}

/** Converts one platform failure into its exact replacement phase. */
function replacementError(phase: DirectoryReplacementError["phase"]) {
  return (cause: unknown) => new DirectoryReplacementError({ cause, phase });
}

/** Replaces one complete staged directory and restores its prior tree on failure. */
export const replaceDirectory = Effect.fn("AksaraUtilities.replaceDirectory")(
  function* (input: {
    readonly backup: string;
    readonly staging: string;
    readonly target: string;
  }) {
    const fileSystem = yield* FileSystem.FileSystem;
    const hasTarget = yield* fileSystem
      .exists(input.target)
      .pipe(Effect.mapError(replacementError("backup")));
    if (hasTarget) {
      yield* fileSystem
        .rename(input.target, input.backup)
        .pipe(Effect.mapError(replacementError("backup")));
    }

    const installed = yield* fileSystem
      .rename(input.staging, input.target)
      .pipe(
        Effect.as(true),
        Effect.catchAll(() => Effect.succeed(false))
      );
    if (!installed) {
      if (hasTarget) {
        yield* fileSystem
          .rename(input.backup, input.target)
          .pipe(Effect.mapError(replacementError("restore")));
      }
      return yield* new DirectoryReplacementError({
        cause: "The staged directory could not be installed.",
        phase: "install",
      });
    }

    if (hasTarget) {
      yield* fileSystem
        .remove(input.backup, { force: true, recursive: true })
        .pipe(Effect.mapError(replacementError("cleanup")));
    }
  }
);

/** Removes staging debt without deleting the only retained prior tree. */
export const cleanupDirectoryReplacement = Effect.fn(
  "AksaraUtilities.cleanupDirectoryReplacement"
)(function* (input: {
  readonly backup: string;
  readonly staging: string;
  readonly target: string;
}) {
  const fileSystem = yield* FileSystem.FileSystem;
  yield* fileSystem.remove(input.staging, { force: true, recursive: true });
  const hasTarget = yield* fileSystem.exists(input.target);
  if (!hasTarget) {
    return;
  }
  yield* fileSystem.remove(input.backup, { force: true, recursive: true });
});
