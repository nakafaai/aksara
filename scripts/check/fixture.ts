import { Effect, FileSystem, Path, Record as Rec } from "effect";
import { runGit } from "#scripts/git";

/** Runs one effect with the process working directory moved to root, restored afterwards. */
export const inDirectory = <A, E, R>(
  root: string,
  effect: Effect.Effect<A, E, R>
) =>
  Effect.acquireUseRelease(
    Effect.sync(() => {
      const previous = process.cwd();
      process.chdir(root);
      return previous;
    }),
    () => effect,
    (previous) => Effect.sync(() => process.chdir(previous))
  );

/** Creates an empty Git repository in a scoped temporary folder. */
export const makeRepository = Effect.fn("AksaraCheckFixture.makeRepository")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-repository-",
    });
    yield* runGit(["init", "--quiet"], { cwd: root });
    return root;
  }
);

/** Writes each file below root, creating its folders. */
export const writeFiles = Effect.fn("AksaraCheckFixture.writeFiles")(function* (
  root: string,
  files: Record<string, string>
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  for (const [file, source] of Rec.toEntries(files)) {
    yield* fileSystem.makeDirectory(path.dirname(path.join(root, file)), {
      recursive: true,
    });
    yield* fileSystem.writeFileString(path.join(root, file), source);
  }
});
