import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import { runGit } from "#scripts/git";

const VERSION_PATTERN = /^git version /u;

describe("git runner", () => {
  it.effect(
    "returns the exit code and both output streams of one command",
    () =>
      Effect.gen(function* () {
        const result = yield* runGit(["--version"]);

        expect(result.exitCode).toBe(0);
        expect(result.stdout).toMatch(VERSION_PATTERN);
        expect(result.stderr).toBe("");
      }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("reports a failed command's exit code and error output", () =>
    Effect.gen(function* () {
      const result = yield* runGit(["not-a-git-command"]);

      expect(result.exitCode).not.toBe(0);
      expect(result.stderr).toContain("not-a-git-command");
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("runs the command in the requested directory", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-git-",
      });

      yield* runGit(["init", "--quiet"], { cwd: root });

      expect(yield* fileSystem.exists(path.join(root, ".git"))).toBe(true);
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
