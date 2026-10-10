import { dirname, join } from "node:path";
import { assert } from "@effect/vitest";
import { Effect, FileSystem, Stream } from "effect";
import { ChildProcess } from "effect/process";

/** Runs Git in one fixture repository and returns its trimmed output. */
export const git = Effect.fn("PointsFixture.git")(
  (root: string, ...args: readonly string[]) =>
    Effect.scoped(
      Effect.gen(function* () {
        const command = yield* ChildProcess.make("git", args, { cwd: root });
        const [exitCode, stdout, stderr] = yield* Effect.all(
          [
            command.exitCode,
            command.stdout.pipe(Stream.decodeText(), Stream.mkString),
            command.stderr.pipe(Stream.decodeText(), Stream.mkString),
          ],
          { concurrency: 3 }
        );
        assert.strictEqual(
          exitCode,
          0,
          stderr.trim() || `git ${args.join(" ")} failed`
        );
        return stdout.trim();
      })
    )
);

/** Creates one empty repository on `main` that owns its test identity. */
export const createRepository = Effect.fn("PointsFixture.createRepository")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const root = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-points-",
    });
    yield* git(root, "init", "--quiet", "--initial-branch=main");
    yield* git(root, "config", "user.email", "tests@nakafa.com");
    yield* git(root, "config", "user.name", "Nakafa Tests");
    yield* git(root, "config", "commit.gpgsign", "false");
    return root;
  }
);

/** Writes files below the repository root, creating their folders first. */
export const writeFiles = Effect.fn("PointsFixture.writeFiles")(function* (
  root: string,
  files: Readonly<Record<string, string>>
) {
  const fileSystem = yield* FileSystem.FileSystem;
  for (const [file, source] of Object.entries(files)) {
    const target = join(root, file);
    yield* fileSystem.makeDirectory(dirname(target), { recursive: true });
    yield* fileSystem.writeFileString(target, source);
  }
});

/** Commits every change in the repository and returns the new revision. */
export const commitAll = Effect.fn("PointsFixture.commitAll")(function* (
  root: string,
  message: string
) {
  yield* git(root, "add", "--all");
  yield* git(root, "commit", "--quiet", "-m", message);
  return yield* git(root, "rev-parse", "HEAD");
});
