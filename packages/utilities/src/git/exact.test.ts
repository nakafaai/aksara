import { NodeServices } from "@effect/platform-node";
import { afterEach, assert, describe, it } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import {
  GIT_ENVIRONMENT,
  GIT_EXECUTABLE,
  makeExactGitInput,
} from "#utilities/git/exact";
import {
  ExactProcess,
  type ExactProcessInput,
  ExactProcessLive,
} from "#utilities/process/exact";

const OUTPUT_LIMIT = 4096;
const COMMIT_SHA_PATTERN = /^[0-9a-f]{40}$/u;

/** Runs one exact process through the live direct-Node implementation. */
const runExact = Effect.fn("GitExactTest.runExact")(
  (input: ExactProcessInput) =>
    ExactProcess.pipe(
      Effect.flatMap((exactProcess) => exactProcess.run(input)),
      Effect.provide(ExactProcessLive)
    )
);

/** Runs one command against a repository with the canonical exact Git policy. */
const runGit = Effect.fn("GitExactTest.runGit")(
  (root: string, args: readonly string[]) =>
    runExact(
      makeExactGitInput({
        args,
        root,
        stderrLimit: OUTPUT_LIMIT,
        stdoutLimit: OUTPUT_LIMIT,
      })
    )
);

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("exact Git process", () => {
  it("builds one explicit repository command with the minimal environment", () => {
    const input = makeExactGitInput({
      args: ["status", "--porcelain=v1"],
      root: "/code/aksara",
      stderrLimit: 20,
      stdoutLimit: 10,
    });

    assert.deepStrictEqual(input, {
      args: [
        "--git-dir=/code/aksara/.git",
        "--work-tree=/code/aksara",
        "--no-replace-objects",
        "status",
        "--porcelain=v1",
      ],
      environment: GIT_ENVIRONMENT,
      executable: GIT_EXECUTABLE,
      root: "/code/aksara",
      stderrLimit: 20,
      stdoutLimit: 10,
    });
  });

  it("forwards explicit standard input without changing the Git policy", () => {
    const stdin = new TextEncoder().encode("batch input");
    const input = makeExactGitInput({
      args: ["cat-file", "--batch"],
      root: "/code/aksara",
      stderrLimit: 20,
      stdin,
      stdoutLimit: 10,
    });

    assert.strictEqual(input.stdin, stdin);
    assert.strictEqual(input.environment, GIT_ENVIRONMENT);
    assert.strictEqual(input.executable, GIT_EXECUTABLE);
  });

  it.live("ignores foreign ambient Git coordinates in a real repository", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-git-exact-",
      });
      const foreignRoot = path.join(root, "foreign");
      yield* fileSystem.makeDirectory(foreignRoot);
      vi.stubEnv("GIT_DIR", foreignRoot);
      vi.stubEnv("GIT_WORK_TREE", foreignRoot);
      yield* runExact({
        args: ["init", root],
        environment: GIT_ENVIRONMENT,
        executable: GIT_EXECUTABLE,
        root,
        stderrLimit: OUTPUT_LIMIT,
        stdoutLimit: OUTPUT_LIMIT,
      });
      yield* fileSystem.writeFileString(
        path.join(root, "source.mdx"),
        "# Real source\n"
      );
      yield* runGit(root, ["add", "source.mdx"]);
      yield* runGit(root, [
        "-c",
        "user.name=Aksara Test",
        "-c",
        "user.email=aksara@example.invalid",
        "commit",
        "-m",
        "test: exact git",
      ]);

      const revision = yield* runGit(root, ["rev-parse", "--verify", "HEAD"]);
      assert.match(
        new TextDecoder().decode(revision.stdout).trim(),
        COMMIT_SHA_PATTERN
      );
      assert.strictEqual(revision.exitCode, 0);
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
