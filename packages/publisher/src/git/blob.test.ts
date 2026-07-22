import type { Command } from "@effect/platform/Command";
import {
  CommandExecutor,
  type CommandExecutor as CommandExecutorService,
} from "@effect/platform/CommandExecutor";
import { SystemError } from "@effect/platform/Error";
import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafaai/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafaai/aksara-contracts/limits";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { GitBlob, GitBlobLive } from "#publisher/git/blob";
import { inspectTestCommand, makeTestExecutor } from "#test/command";

const TEST_COMMIT_SHA = GitCommitShaSchema.make("b".repeat(40));
const TEST_SOURCE_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/test-protocol/source/en.mdx"
);
const TEST_RAW_MDX = 'export const testProtocol = "byte-identical-✓";\r\n';
const TEST_RAW_BYTES = new TextEncoder().encode(TEST_RAW_MDX);
const TEST_REPOSITORY_ROOT = "/test-only/aksara";
const TEST_COMMAND_ERROR = new SystemError({
  description: "Test-only Git command failure.",
  method: "spawn",
  module: "Command",
  reason: "Unknown",
});

interface TestGitOverrides {
  readonly blob?: string | Uint8Array;
  readonly revision?: string;
  readonly root?: string;
  readonly size?: string;
}

/** Responds to every exact-Git command with independently overridable data. */
function makeGitExecutor(
  overrides: TestGitOverrides,
  commands?: Command[]
): CommandExecutorService {
  return makeTestExecutor((command) =>
    Effect.sync(() => {
      commands?.push(command);
      const { args } = inspectTestCommand(command);
      const [, operation, detail] = args;
      if (operation === "rev-parse" && detail === "--show-toplevel") {
        return { stdout: overrides.root ?? `${TEST_REPOSITORY_ROOT}\n` };
      }
      if (operation === "rev-parse") {
        return { stdout: overrides.revision ?? `${TEST_COMMIT_SHA}\n` };
      }
      if (operation === "cat-file" && detail === "-s") {
        return { stdout: overrides.size ?? `${TEST_RAW_BYTES.byteLength}\n` };
      }
      return { stdout: overrides.blob ?? TEST_RAW_BYTES };
    })
  );
}

/** Reads the fixed branded test coordinate through one command executor. */
function readTestBlob(executor: CommandExecutorService) {
  return GitBlob.pipe(
    Effect.flatMap((gitBlob) =>
      gitBlob.read({
        revision: TEST_COMMIT_SHA,
        sourcePath: TEST_SOURCE_PATH,
      })
    ),
    Effect.provide(GitBlobLive),
    Effect.provideService(CommandExecutor, executor)
  );
}

describe("GitBlob", () => {
  it("reads byte-identical content while disabling replacement refs", async () => {
    const commands: Command[] = [];
    const executor = makeGitExecutor({}, commands);

    await expect(Effect.runPromise(readTestBlob(executor))).resolves.toBe(
      TEST_RAW_MDX
    );
    expect(commands.map(inspectTestCommand)).toEqual([
      {
        args: ["--no-replace-objects", "rev-parse", "--show-toplevel"],
        command: "git",
        cwd: null,
        shell: false,
      },
      {
        args: [
          "--no-replace-objects",
          "rev-parse",
          "--verify",
          "--end-of-options",
          `${TEST_COMMIT_SHA}^{commit}`,
        ],
        command: "git",
        cwd: TEST_REPOSITORY_ROOT,
        shell: false,
      },
      {
        args: [
          "--no-replace-objects",
          "cat-file",
          "-s",
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}`,
        ],
        command: "git",
        cwd: TEST_REPOSITORY_ROOT,
        shell: false,
      },
      {
        args: [
          "--no-replace-objects",
          "cat-file",
          "blob",
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}`,
        ],
        command: "git",
        cwd: TEST_REPOSITORY_ROOT,
        shell: false,
      },
    ]);
  });

  it("rejects an oversized blob before starting a body read", async () => {
    const commands: Command[] = [];
    const error = await Effect.runPromise(
      readTestBlob(
        makeGitExecutor({ size: `${MAX_RAW_MDX_BYTES + 1}\n` }, commands)
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "GitBlobError",
      cause: {
        actualBytes: MAX_RAW_MDX_BYTES + 1,
        maxBytes: MAX_RAW_MDX_BYTES,
      },
      operation: "size-blob",
    });
    expect(commands).toHaveLength(3);
  });

  it("rejects invalid UTF-8 instead of inserting replacement text", async () => {
    const invalidUtf8 = Uint8Array.from([0xc3, 0x28]);
    const error = await Effect.runPromise(
      readTestBlob(
        makeGitExecutor({
          blob: invalidUtf8,
          size: `${invalidUtf8.byteLength}`,
        })
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "GitBlobError",
      operation: "decode-blob",
    });
    expect(error.message).toContain("valid UTF-8");
  });

  it("maps command execution failures into the typed Git error", async () => {
    const error = await Effect.runPromise(
      readTestBlob(
        makeTestExecutor(() => Effect.fail(TEST_COMMAND_ERROR))
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "GitBlobError",
      cause: TEST_COMMAND_ERROR,
      operation: "find-root",
    });
  });

  it("rejects invalid Git metadata before reading a blob body", async () => {
    const emptyRoot = await Effect.runPromise(
      readTestBlob(makeGitExecutor({ root: " \n" })).pipe(Effect.flip)
    );
    expect(emptyRoot).toMatchObject({ operation: "find-root" });

    const invalidRevision = await Effect.runPromise(
      readTestBlob(makeGitExecutor({ revision: "main\n" })).pipe(Effect.flip)
    );
    expect(invalidRevision).toMatchObject({ operation: "resolve-commit" });

    const peeledRevision = await Effect.runPromise(
      readTestBlob(makeGitExecutor({ revision: `${"c".repeat(40)}\n` })).pipe(
        Effect.flip
      )
    );
    expect(peeledRevision).toMatchObject({
      cause: {
        actualCommitSha: "c".repeat(40),
        expectedCommitSha: TEST_COMMIT_SHA,
      },
      operation: "resolve-commit",
    });

    const invalidSize = await Effect.runPromise(
      readTestBlob(makeGitExecutor({ size: "not-a-byte-size" })).pipe(
        Effect.flip
      )
    );
    expect(invalidSize).toMatchObject({ operation: "size-blob" });
  });

  it("rejects body output that disagrees with its preflight size", async () => {
    const oversized = await Effect.runPromise(
      readTestBlob(
        makeGitExecutor({ blob: Uint8Array.from([0x61, 0x62]), size: "1" })
      ).pipe(Effect.flip)
    );
    expect(oversized).toMatchObject({
      cause: { actualBytes: 2, maxBytes: 1 },
      operation: "read-blob",
    });

    const undersized = await Effect.runPromise(
      readTestBlob(
        makeGitExecutor({ blob: Uint8Array.from([0x61]), size: "2" })
      ).pipe(Effect.flip)
    );
    expect(undersized).toMatchObject({
      cause: { actualBytes: 1, expectedBytes: 2 },
      operation: "read-blob",
    });
  });

  it("types a nonzero Git exit and bounds its diagnostic bytes", async () => {
    const ordinaryError = await Effect.runPromise(
      readTestBlob(
        makeTestExecutor(() =>
          Effect.succeed({
            exitCode: 128,
            stderr: "Test-only Git fatal error.",
            stdout: "",
          })
        )
      ).pipe(Effect.flip)
    );
    expect(ordinaryError).toMatchObject({
      cause: { exitCode: 128, stderr: "Test-only Git fatal error." },
      operation: "find-root",
    });

    const boundedError = await Effect.runPromise(
      readTestBlob(
        makeTestExecutor(() =>
          Effect.succeed({
            exitCode: 128,
            stderrChunks: [new Uint8Array(16 * 1024), Uint8Array.from([0x61])],
            stdout: "",
          })
        )
      ).pipe(Effect.flip)
    );
    expect(boundedError).toMatchObject({ operation: "find-root" });
  });
});
