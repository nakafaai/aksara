import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
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
function runExact(input: ExactProcessInput) {
  return ExactProcess.pipe(
    Effect.flatMap((exactProcess) => exactProcess.run(input)),
    Effect.provide(ExactProcessLive)
  );
}

/** Runs one command against a repository with the canonical exact Git policy. */
function runGit(root: string, args: readonly string[]) {
  return Effect.runPromise(
    runExact(
      makeExactGitInput({
        args,
        root,
        stderrLimit: OUTPUT_LIMIT,
        stdoutLimit: OUTPUT_LIMIT,
      })
    )
  );
}

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

    expect(input).toEqual({
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

  it("ignores foreign ambient Git coordinates in a real repository", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-git-exact-"));
    mkdirSync(join(root, "foreign"));
    vi.stubEnv("GIT_DIR", join(root, "foreign"));
    vi.stubEnv("GIT_WORK_TREE", join(root, "foreign"));
    await Effect.runPromise(
      runExact({
        args: ["init", root],
        environment: GIT_ENVIRONMENT,
        executable: GIT_EXECUTABLE,
        root,
        stderrLimit: OUTPUT_LIMIT,
        stdoutLimit: OUTPUT_LIMIT,
      })
    );
    writeFileSync(join(root, "source.mdx"), "# Real source\n");
    await runGit(root, ["add", "source.mdx"]);
    await runGit(root, [
      "-c",
      "user.name=Aksara Test",
      "-c",
      "user.email=aksara@example.invalid",
      "commit",
      "-m",
      "test: exact git",
    ]);

    const revision = await runGit(root, ["rev-parse", "--verify", "HEAD"]);
    expect(new TextDecoder().decode(revision.stdout).trim()).toMatch(
      COMMIT_SHA_PATTERN
    );
    expect(revision.exitCode).toBe(0);
    rmSync(root, { force: true, recursive: true });
  });
});
