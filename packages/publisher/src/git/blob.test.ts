import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { makeExactGitInput } from "@nakafa/aksara-utilities/git/exact";
import {
  ExactProcessError,
  type ExactProcessInput,
  ExactProcessLive,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect, FileSystem } from "effect";
import { MAX_GIT_BATCH_BLOBS } from "#publisher/git/batch";
import { GitBlob, makeGitBlobLive } from "#publisher/git/blob";
import {
  makeGitProcess,
  makeTestGitRepository,
  readTestBlob,
  readTestBlobs,
  TEST_COMMIT_SHA,
  TEST_RAW_BYTES,
  TEST_RAW_MDX,
  TEST_REPOSITORY_ROOT,
  TEST_SOURCE_PATH,
  testBlobId,
} from "#test/git";

describe("GitBlob", () => {
  it.live(
    "reads committed bytes despite dirty files and replacement refs, then cleans up",
    () =>
      Effect.gen(function* () {
        const rawMdx = `\ufeff${TEST_RAW_MDX}`;
        const root = yield* Effect.scoped(
          Effect.gen(function* () {
            const fixture = yield* makeTestGitRepository(rawMdx);
            const blobs = yield* GitBlob.pipe(
              Effect.flatMap((git) =>
                git.read({
                  revision: fixture.revision,
                  sourcePaths: [fixture.sourcePath],
                })
              ),
              Effect.provide(makeGitBlobLive(fixture.root))
            );
            expect(blobs.get(fixture.sourcePath)).toBe(rawMdx);
            return fixture.root;
          })
        );
        const fileSystem = yield* FileSystem.FileSystem;
        expect(yield* fileSystem.exists(root)).toBe(false);
      }).pipe(Effect.provide([NodeServices.layer, ExactProcessLive]))
  );

  it.effect("returns an empty batch without starting Git", () =>
    Effect.gen(function* () {
      const commands: ExactProcessInput[] = [];
      expect(yield* readTestBlobs(makeGitProcess({}, commands), [])).toEqual(
        new Map()
      );
      expect(commands).toEqual([]);
    })
  );

  it.effect(
    "bounds the input before starting Git and deduplicates shared paths",
    () =>
      Effect.gen(function* () {
        const commands: ExactProcessInput[] = [];
        const oversized = yield* readTestBlobs(
          makeGitProcess({}, commands),
          Array.from(
            { length: MAX_GIT_BATCH_BLOBS + 1 },
            () => TEST_SOURCE_PATH
          )
        ).pipe(Effect.flip);
        expect(oversized).toMatchObject({ operation: "resolve-commit" });
        expect(commands).toEqual([]);
        expect(
          yield* readTestBlobs(makeGitProcess({}, commands), [
            TEST_SOURCE_PATH,
            TEST_SOURCE_PATH,
          ])
        ).toEqual(new Map([[TEST_SOURCE_PATH, TEST_RAW_MDX]]));
        expect(commands).toHaveLength(3);
        expect(new TextDecoder().decode(commands[1]?.stdin)).toBe(
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}\n`
        );
      })
  );

  it.effect("preserves the UTF-8 BOM, Unicode, and original line endings", () =>
    Effect.gen(function* () {
      const text = `\ufeff${TEST_RAW_MDX}`;
      const blobs = new Map([
        [TEST_SOURCE_PATH, new TextEncoder().encode(text)],
      ]);
      expect(yield* readTestBlob(makeGitProcess({ blobs }))).toBe(text);
    })
  );

  it.effect(
    "preflights exact paths before requesting immutable object bodies",
    () =>
      Effect.gen(function* () {
        const commands: ExactProcessInput[] = [];
        expect(yield* readTestBlob(makeGitProcess({}, commands))).toBe(
          TEST_RAW_MDX
        );
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
            args: ["cat-file", "--batch-check"],
            root: TEST_REPOSITORY_ROOT,
            stderrLimit: 16 * 1024,
            stdin: new TextEncoder().encode(
              `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}\n`
            ),
            stdoutLimit: 96,
          }),
          makeExactGitInput({
            args: ["cat-file", "--batch"],
            root: TEST_REPOSITORY_ROOT,
            stderrLimit: 16 * 1024,
            stdin: new TextEncoder().encode(`${testBlobId(TEST_RAW_BYTES)}\n`),
            stdoutLimit: TEST_RAW_BYTES.byteLength + 97,
          }),
        ]);
      })
  );

  it.effect(
    "rejects oversized, missing, and non-blob metadata before body reads",
    () =>
      Effect.gen(function* () {
        for (const metadata of [
          `${testBlobId(TEST_RAW_BYTES)} blob ${MAX_RAW_MDX_BYTES + 1}\n`,
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH} missing\n`,
          `${testBlobId(TEST_RAW_BYTES)} tree 4\n`,
        ]) {
          const commands: ExactProcessInput[] = [];
          const error = yield* readTestBlob(
            makeGitProcess({ metadata }, commands)
          ).pipe(Effect.flip);
          expect(error).toMatchObject({
            _tag: "GitBlobError",
            operation: "size-blob",
          });
          expect(commands).toHaveLength(2);
          expect(commands.every(({ args }) => !args.includes("--batch"))).toBe(
            true
          );
        }
      })
  );

  it.effect("rejects invalid UTF-8 instead of inserting replacement text", () =>
    Effect.gen(function* () {
      const blobs = new Map([
        [TEST_SOURCE_PATH, Uint8Array.from([0xc3, 0x28])],
      ]);
      const error = yield* readTestBlob(makeGitProcess({ blobs })).pipe(
        Effect.flip
      );
      expect(error).toMatchObject({
        _tag: "GitBlobError",
        operation: "decode-blob",
      });
      expect(error.message).toContain("valid UTF-8");
    })
  );

  it.effect("retains typed process failures at every Git operation", () =>
    Effect.gen(function* () {
      const failure = new ExactProcessError({ reason: "spawn" });
      const errors = yield* Effect.forEach(
        [{ failure }, { metadataFailure: failure }, { batchFailure: failure }],
        (overrides) => readTestBlob(makeGitProcess(overrides)).pipe(Effect.flip)
      );
      expect(errors.map(({ operation }) => operation)).toEqual([
        "resolve-commit",
        "size-blob",
        "read-blob",
      ]);
      expect(errors.every(({ cause }) => cause === failure)).toBe(true);
    })
  );

  it.effect(
    "rejects invalid or peeled revision metadata before reading bodies",
    () =>
      Effect.gen(function* () {
        const invalid = yield* readTestBlob(
          makeGitProcess({ revision: "main\n" })
        ).pipe(Effect.flip);
        expect(invalid).toMatchObject({ operation: "resolve-commit" });
        const peeled = yield* readTestBlob(
          makeGitProcess({ revision: `${"c".repeat(40)}\n` })
        ).pipe(Effect.flip);
        expect(peeled).toMatchObject({
          cause: {
            actualCommitSha: "c".repeat(40),
            expectedCommitSha: TEST_COMMIT_SHA,
          },
          operation: "resolve-commit",
        });
      })
  );

  it.effect("maps malformed body frames into the Git error contract", () =>
    Effect.gen(function* () {
      const error = yield* readTestBlob(
        makeGitProcess({ batch: "malformed\n" })
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        cause: { _tag: "GitBatchError", reason: "protocol" },
        operation: "read-blob",
      });
    })
  );

  it.effect("types nonzero and non-UTF-8 Git diagnostics", () =>
    Effect.gen(function* () {
      const ordinary = yield* readTestBlob(
        makeGitProcess({ exitCode: 128, stderr: "Test-only Git fatal error." })
      ).pipe(Effect.flip);
      expect(ordinary).toMatchObject({
        cause: { exitCode: 128, stderr: "Test-only Git fatal error." },
        operation: "resolve-commit",
      });
      const invalid = yield* readTestBlob(
        makeGitProcess({ exitCode: 128, stderr: Uint8Array.from([0xc3, 0x28]) })
      ).pipe(Effect.flip);
      expect(invalid.operation).toBe("resolve-commit");
      expect(invalid.message).toContain("non-UTF-8");
    })
  );
});
