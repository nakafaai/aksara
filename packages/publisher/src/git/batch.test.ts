import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { Effect } from "effect";
import {
  decodeGitBatchMetadata,
  decodeGitBatchResponse,
  GitBatchError,
  makeGitBatchRequest,
  makeGitMetadataRequest,
} from "#publisher/git/batch";
import {
  gitFrame,
  joinGitFrames,
  TEST_COMMIT_SHA,
  TEST_SOURCE_PATH,
  testBlobId,
} from "#test/git";

const secondPath = CorpusSourcePathSchema.make(
  "packages/corpus/test-protocol/second.mdx"
);
const first = Uint8Array.from([0xef, 0xbb, 0xbf, 0x61]);
const second = new TextEncoder().encode("second\r\n✓");
const paths = [TEST_SOURCE_PATH, secondPath];

describe("Git batch protocol", () => {
  it.effect(
    "preflights ordered identities and preserves every raw body byte",
    () =>
      Effect.gen(function* () {
        const metadataRequest = makeGitMetadataRequest(TEST_COMMIT_SHA, paths);
        const blobs = yield* decodeGitBatchMetadata(
          joinGitFrames([gitFrame(first, false), gitFrame(second, false)]),
          paths
        );
        const bodyRequest = makeGitBatchRequest(blobs);
        const decoded = yield* decodeGitBatchResponse(
          joinGitFrames([gitFrame(first, true), gitFrame(second, true)]),
          blobs
        );

        expect(new TextDecoder().decode(metadataRequest.stdin)).toBe(
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH}\n${TEST_COMMIT_SHA}:${secondPath}\n`
        );
        expect(metadataRequest.stdoutLimit).toBe(192);
        expect(new TextDecoder().decode(bodyRequest.stdin)).toBe(
          `${testBlobId(first)}\n${testBlobId(second)}\n`
        );
        expect(bodyRequest.stdoutLimit).toBe(
          first.byteLength + second.byteLength + 194
        );
        expect([...decoded]).toEqual([
          [TEST_SOURCE_PATH, first],
          [secondPath, second],
        ]);
      })
  );

  it.effect(
    "rejects missing, non-blob, invalid, oversized, and extra metadata",
    () =>
      Effect.gen(function* () {
        const headers = [
          `${TEST_COMMIT_SHA}:${TEST_SOURCE_PATH} missing\n`,
          `${testBlobId(first)} tree 4\n`,
          `${testBlobId(first)} blob 9007199254740992\n`,
          `${testBlobId(first)} blob -1\n`,
          `${testBlobId(first)} blob 01\n`,
          `${testBlobId(first)} blob ${MAX_RAW_MDX_BYTES + 1}\n`,
          "missing",
          `${"x".repeat(96)}\n`,
        ];
        const errors = yield* Effect.forEach(headers, (header) =>
          decodeGitBatchMetadata(new TextEncoder().encode(header), [
            TEST_SOURCE_PATH,
          ]).pipe(Effect.flip)
        );
        expect(errors.every((error) => error instanceof GitBatchError)).toBe(
          true
        );
        expect(errors.map(({ reason }) => reason)).toEqual([
          "protocol",
          "protocol",
          "protocol",
          "protocol",
          "protocol",
          "limit",
          "protocol",
          "protocol",
        ]);
        const invalidUtf8 = yield* decodeGitBatchMetadata(
          Uint8Array.from([0xc3, 0x28, 0x0a]),
          [TEST_SOURCE_PATH]
        ).pipe(Effect.flip);
        expect(invalidUtf8.reason).toBe("protocol");
        const trailing = yield* decodeGitBatchMetadata(
          joinGitFrames([gitFrame(first, false), gitFrame(second, false)]),
          [TEST_SOURCE_PATH]
        ).pipe(Effect.flip);
        expect(trailing).toMatchObject({
          reason: "protocol",
          sourcePath: null,
        });
      })
  );

  it.effect(
    "rejects changed identities and sizes, truncation, and trailing bytes",
    () =>
      Effect.gen(function* () {
        const blobs = yield* decodeGitBatchMetadata(gitFrame(first, false), [
          TEST_SOURCE_PATH,
        ]);
        const frame = gitFrame(first, true);
        const sameSize = gitFrame(Uint8Array.of(0x61, 0x62, 0x63, 0x64), true);
        const changedSize = new TextEncoder().encode(
          `${testBlobId(first)} blob 3\nabc\n`
        );
        const wrongTerminator = frame.slice();
        wrongTerminator[wrongTerminator.length - 1] = 0;
        const errors = yield* Effect.forEach(
          [
            sameSize,
            changedSize,
            frame.subarray(0, frame.length - 1),
            wrongTerminator,
            joinGitFrames([frame, Uint8Array.of(0)]),
          ],
          (output) => decodeGitBatchResponse(output, blobs).pipe(Effect.flip)
        );
        expect(errors.map(({ reason }) => reason)).toEqual(
          Array.from({ length: 5 }, () => "protocol")
        );
        expect(errors[4]?.sourcePath).toBeNull();
      })
  );

  it.effect("accepts zero-byte blobs and the exact authored size ceiling", () =>
    Effect.gen(function* () {
      const full = new Uint8Array(MAX_RAW_MDX_BYTES);
      const empty = new Uint8Array();
      const blobs = yield* decodeGitBatchMetadata(
        joinGitFrames([gitFrame(empty, false), gitFrame(full, false)]),
        paths
      );
      const decoded = yield* decodeGitBatchResponse(
        joinGitFrames([gitFrame(empty, true), gitFrame(full, true)]),
        blobs
      );
      expect(decoded.get(TEST_SOURCE_PATH)).toEqual(empty);
      expect(decoded.get(secondPath)).toEqual(full);
    })
  );
});
