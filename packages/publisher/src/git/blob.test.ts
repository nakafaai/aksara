import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  MAX_RAW_MDX_BYTES,
  MAX_REVIEWED_OFFICIAL_SOURCE_BYTES,
} from "@nakafa/aksara-contracts/limits";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import {
  ExactProcess,
  ExactProcessError,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { GitBlob, makeGitBlobLive } from "#publisher/git/blob";

const TEST_COMMIT_SHA = GitCommitShaSchema.make("b".repeat(40));
const TEST_SOURCE_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/test-protocol/source/en.mdx"
);
const TEST_RAW_MDX = 'export const testProtocol = "byte-identical-✓";\r\n';
const TEST_RAW_BYTES = new TextEncoder().encode(TEST_RAW_MDX);
const TEST_REPOSITORY_ROOT = "/test-only/aksara";

interface TestGitOverrides {
  readonly blob?: string | Uint8Array;
  readonly exitCode?: number;
  readonly failure?: ExactProcessError;
  readonly revision?: string;
  readonly size?: string;
  readonly stderr?: string | Uint8Array;
}

/** Converts one test output value into exact process bytes. */
function outputBytes(value: string | Uint8Array | undefined) {
  if (typeof value === "string") {
    return new TextEncoder().encode(value);
  }
  return value ?? new Uint8Array();
}

/** Responds to every exact-Git command with independently overridable data. */
function makeGitProcess(
  overrides: TestGitOverrides,
  commands?: ExactProcessInput[]
) {
  return ExactProcess.of({
    /** Runs one deterministic exact-Git process response. */
    run: (input) =>
      Effect.gen(function* () {
        commands?.push(input);
        if (overrides.failure) {
          return yield* overrides.failure;
        }
        const [, , , operation, detail] = input.args;
        let stdout = overrides.blob ?? TEST_RAW_BYTES;
        if (operation === "rev-parse") {
          stdout = overrides.revision ?? `${TEST_COMMIT_SHA}\n`;
        } else if (operation === "cat-file" && detail === "-s") {
          stdout = overrides.size ?? `${TEST_RAW_BYTES.byteLength}\n`;
        }
        return {
          exitCode: overrides.exitCode ?? 0,
          stderr: outputBytes(overrides.stderr),
          stdout: outputBytes(stdout),
        };
      }),
  });
}

/** Reads the fixed branded test coordinate through one exact process service. */
function readTestBlob(
  exactProcess: typeof ExactProcess.Service,
  maxBytes = MAX_RAW_MDX_BYTES
) {
  return GitBlob.pipe(
    Effect.flatMap((gitBlob) =>
      gitBlob.read({
        maxBytes,
        revision: TEST_COMMIT_SHA,
        sourcePath: TEST_SOURCE_PATH,
      })
    ),
    Effect.provide(makeGitBlobLive(TEST_REPOSITORY_ROOT)),
    Effect.provideService(ExactProcess, exactProcess)
  );
}

describe("GitBlob", () => {
  it("reads byte-identical content through explicit immutable Git coordinates", async () => {
    const commands: ExactProcessInput[] = [];

    await expect(
      Effect.runPromise(readTestBlob(makeGitProcess({}, commands)))
    ).resolves.toBe(TEST_RAW_MDX);
    expect(commands).toEqual([
      makeExactGitInput({
        args: [
          "rev-parse",
          "--verify",
          "--end-of-options",
          `${TEST_COMMIT_SHA}^{commit}`,
        ],
        root: TEST_REPOSITORY_ROOT,
        stderrLimit: 16 * 1024,
        stdoutLimit: 4096,
      }),
      makeExactGitInput({
        args: ["cat-file", "-s", `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}`],
        root: TEST_REPOSITORY_ROOT,
        stderrLimit: 16 * 1024,
        stdoutLimit: 4096,
      }),
      makeExactGitInput({
        args: ["cat-file", "blob", `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}`],
        root: TEST_REPOSITORY_ROOT,
        stderrLimit: 16 * 1024,
        stdoutLimit: TEST_RAW_BYTES.byteLength,
      }),
    ]);
  });

  it("rejects an oversized blob before starting a body read", async () => {
    const commands: ExactProcessInput[] = [];
    const error = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({ size: `${MAX_RAW_MDX_BYTES + 1}\n` }, commands)
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
    expect(commands).toHaveLength(2);
  });

  it("reads a bounded official source larger than authored MDX", async () => {
    const officialBytes = new Uint8Array(MAX_RAW_MDX_BYTES + 1).fill(0x61);
    await expect(
      Effect.runPromise(
        readTestBlob(
          makeGitProcess({
            blob: officialBytes,
            size: `${officialBytes.byteLength}\n`,
          }),
          MAX_REVIEWED_OFFICIAL_SOURCE_BYTES
        )
      )
    ).resolves.toHaveLength(officialBytes.byteLength);
  });

  it("rejects an unbounded reviewed source policy", async () => {
    const error = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({}),
        MAX_REVIEWED_OFFICIAL_SOURCE_BYTES + 1
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "GitBlobError",
      operation: "size-blob",
    });
    expect(error.message).toContain("limit is invalid");
  });

  it("rejects invalid UTF-8 instead of inserting replacement text", async () => {
    const invalidUtf8 = Uint8Array.from([0xc3, 0x28]);
    const error = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({
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

  it("maps exact process failures into the typed Git error", async () => {
    const processError = new ExactProcessError({ reason: "spawn" });
    const error = await Effect.runPromise(
      readTestBlob(makeGitProcess({ failure: processError })).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "GitBlobError",
      cause: processError,
      operation: "resolve-commit",
    });
  });

  it("rejects invalid Git metadata before reading a blob body", async () => {
    const invalidRevision = await Effect.runPromise(
      readTestBlob(makeGitProcess({ revision: "main\n" })).pipe(Effect.flip)
    );
    expect(invalidRevision).toMatchObject({ operation: "resolve-commit" });

    const peeledRevision = await Effect.runPromise(
      readTestBlob(makeGitProcess({ revision: `${"c".repeat(40)}\n` })).pipe(
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
      readTestBlob(makeGitProcess({ size: "not-a-byte-size" })).pipe(
        Effect.flip
      )
    );
    expect(invalidSize).toMatchObject({ operation: "size-blob" });
  });

  it("rejects body output that disagrees with its preflight size", async () => {
    const oversized = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({ blob: Uint8Array.from([0x61, 0x62]), size: "1" })
      ).pipe(Effect.flip)
    );
    expect(oversized).toMatchObject({
      cause: { actualBytes: 2, expectedBytes: 1 },
      operation: "read-blob",
    });

    const undersized = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({ blob: Uint8Array.from([0x61]), size: "2" })
      ).pipe(Effect.flip)
    );
    expect(undersized).toMatchObject({
      cause: { actualBytes: 1, expectedBytes: 2 },
      operation: "read-blob",
    });
  });

  it("types nonzero and non-UTF-8 Git diagnostics", async () => {
    const ordinaryError = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({
          exitCode: 128,
          stderr: "Test-only Git fatal error.",
        })
      ).pipe(Effect.flip)
    );
    expect(ordinaryError).toMatchObject({
      cause: { exitCode: 128, stderr: "Test-only Git fatal error." },
      operation: "resolve-commit",
    });

    const invalidDiagnostic = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({
          exitCode: 128,
          stderr: Uint8Array.from([0xc3, 0x28]),
        })
      ).pipe(Effect.flip)
    );
    expect(invalidDiagnostic).toMatchObject({
      operation: "resolve-commit",
    });
    expect(invalidDiagnostic.message).toContain("non-UTF-8");
  });
});
