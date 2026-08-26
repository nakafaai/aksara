import { describe, expect, it } from "@effect/vitest";
import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import {
  ExactProcessError,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import {
  makeGitProcess,
  readTestBlob,
  readTestBlobs,
  TEST_COMMIT_SHA,
  TEST_RAW_MDX,
  TEST_REPOSITORY_ROOT,
  TEST_SOURCE_PATH,
} from "#test/git";

describe("GitBlob", () => {
  it("returns an empty batch without starting Git", async () => {
    const commands: ExactProcessInput[] = [];

    await expect(
      Effect.runPromise(readTestBlobs(makeGitProcess({}, commands), []))
    ).resolves.toEqual(new Map());
    expect(commands).toEqual([]);
  });

  it("rejects duplicate paths and mixed revisions before starting Git", async () => {
    const commands: ExactProcessInput[] = [];
    const input = {
      maxBytes: MAX_RAW_MDX_BYTES,
      revision: TEST_COMMIT_SHA,
      sourcePath: TEST_SOURCE_PATH,
    };
    const otherPath = CorpusSourcePathSchema.make(
      "packages/corpus/test-protocol/source/id.mdx"
    );
    const duplicate = await Effect.runPromise(
      readTestBlobs(makeGitProcess({}, commands), [input, input]).pipe(
        Effect.flip
      )
    );
    const mixedRevision = await Effect.runPromise(
      readTestBlobs(makeGitProcess({}, commands), [
        input,
        {
          ...input,
          revision: GitCommitShaSchema.make("c".repeat(40)),
          sourcePath: otherPath,
        },
      ]).pipe(Effect.flip)
    );

    expect(duplicate).toMatchObject({ operation: "resolve-commit" });
    expect(mixedRevision).toMatchObject({ operation: "resolve-commit" });
    expect(commands).toEqual([]);
  });

  it("preserves exact blob bytes before UTF-8 decoding", async () => {
    const bytes = Uint8Array.from([0xef, 0xbb, 0xbf, 0x61]);
    await expect(
      Effect.runPromise(
        readTestBlob(
          makeGitProcess({ blob: bytes }),
          MAX_RAW_MDX_BYTES,
          "bytes"
        )
      )
    ).resolves.toEqual(bytes);
  });

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
        args: ["cat-file", "--batch"],
        root: TEST_REPOSITORY_ROOT,
        stderrLimit: 16 * 1024,
        stdin: new TextEncoder().encode(
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}\n`
        ),
        stdoutLimit: MAX_RAW_MDX_BYTES + 97,
      }),
    ]);
  });

  it("rejects an oversized blob before starting a body read", async () => {
    const commands: ExactProcessInput[] = [];
    const error = await Effect.runPromise(
      readTestBlob(
        makeGitProcess(
          { blob: new Uint8Array(), blobSize: MAX_RAW_MDX_BYTES + 1 },
          commands
        )
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "GitBlobError",
      cause: {
        detail: {
          actualBytes: MAX_RAW_MDX_BYTES + 1,
          maxBytes: MAX_RAW_MDX_BYTES,
        },
      },
      operation: "size-blob",
    });
    expect(commands).toHaveLength(2);
  });

  it("rejects a source policy above the authored byte bound", async () => {
    const error = await Effect.runPromise(
      readTestBlob(makeGitProcess({}), MAX_RAW_MDX_BYTES + 1).pipe(Effect.flip)
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

    const batchError = await Effect.runPromise(
      readTestBlob(makeGitProcess({ batchFailure: processError })).pipe(
        Effect.flip
      )
    );
    expect(batchError).toMatchObject({
      cause: processError,
      operation: "read-blob",
    });
  });

  it("rejects invalid Git revision metadata before reading a blob body", async () => {
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
  });

  it("rejects body output that disagrees with its batch header size", async () => {
    const oversized = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({ blob: Uint8Array.from([0x61, 0x62]), blobSize: 1 })
      ).pipe(Effect.flip)
    );
    expect(oversized).toMatchObject({ operation: "read-blob" });

    const undersized = await Effect.runPromise(
      readTestBlob(
        makeGitProcess({ blob: Uint8Array.from([0x61]), blobSize: 2 })
      ).pipe(Effect.flip)
    );
    expect(undersized).toMatchObject({ operation: "read-blob" });
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
