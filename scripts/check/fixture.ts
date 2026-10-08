import { Effect, FileSystem } from "effect";
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
