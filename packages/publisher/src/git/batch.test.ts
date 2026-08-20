import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
} from "@nakafa/aksara-contracts/ids";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import {
  decodeGitBatchResponse,
  type GitBatchBlob,
  GitBatchError,
  makeGitBatchRequest,
  partitionGitBlobInputs,
} from "#publisher/git/batch";

const commitSha = GitCommitShaSchema.make("a".repeat(40));
const firstPath = CorpusSourcePathSchema.make(
  "packages/corpus/test-batch/first.mdx"
);
const secondPath = CorpusSourcePathSchema.make(
  "packages/corpus/test-batch/second.mdx"
);

/** Builds one bounded test batch input. */
function blob(sourcePath: typeof firstPath, maxBytes = 8): GitBatchBlob {
  return { maxBytes, sourcePath };
}

/** Encodes one exact Git batch response frame. */
function frame(content: Uint8Array, size = content.byteLength) {
  const header = new TextEncoder().encode(`${"b".repeat(40)} blob ${size}\n`);
  const output = new Uint8Array(header.byteLength + content.byteLength + 1);
  output.set(header);
  output.set(content, header.byteLength);
  output[output.byteLength - 1] = 0x0a;
  return output;
}

/** Concatenates exact test protocol frames. */
function concatenate(...frames: readonly Uint8Array[]) {
  const size = frames.reduce((total, bytes) => total + bytes.byteLength, 0);
  const output = new Uint8Array(size);
  let offset = 0;
  for (const bytes of frames) {
    output.set(bytes, offset);
    offset += bytes.byteLength;
  }
  return output;
}

describe("Git batch protocol", () => {
  it("encodes canonical coordinates and decodes exact raw bytes", async () => {
    const inputs = [blob(firstPath), blob(secondPath)];
    const request = makeGitBatchRequest(commitSha, inputs);
    const first = Uint8Array.from([0xef, 0xbb, 0xbf, 0x61]);
    const second = new TextEncoder().encode("second");
    const decoded = await Effect.runPromise(
      decodeGitBatchResponse(concatenate(frame(first), frame(second)), inputs)
    );

    expect(new TextDecoder().decode(request.stdin)).toBe(
      `${commitSha}:${firstPath}\n${commitSha}:${secondPath}\n`
    );
    expect(request.stdoutLimit).toBe(210);
    expect(decoded.get(firstPath)).toEqual(first);
    expect(decoded.get(secondPath)).toEqual(second);
  });

  it("partitions canonical paths by count and retained byte ceilings", () => {
    const many = Array.from({ length: 129 }, (_, index) =>
      blob(
        CorpusSourcePathSchema.make(
          `packages/corpus/test-batch/${String(index).padStart(3, "0")}.mdx`
        ),
        1
      )
    ).reverse();
    const counted = partitionGitBlobInputs(many);
    const bounded = partitionGitBlobInputs([
      blob(firstPath, 20 * 1024 * 1024),
      blob(secondPath, 20 * 1024 * 1024),
    ]);

    expect(counted.map(({ length }) => length)).toEqual([128, 1]);
    expect(counted[0]?.[0]?.sourcePath).toContain("000.mdx");
    expect(bounded).toHaveLength(2);
    expect(partitionGitBlobInputs([])).toEqual([]);
  });

  it("rejects malformed, oversized, truncated, and trailing frames", async () => {
    const input = [blob(firstPath, 1)];
    const malformedHeader = new TextEncoder().encode("missing\n");
    const oversized = frame(Uint8Array.from([0x61, 0x62]));
    const truncated = frame(Uint8Array.from([0x61]), 2);
    const trailing = concatenate(
      frame(Uint8Array.from([0x61])),
      Uint8Array.of(0)
    );
    const missingTerminator = new TextEncoder().encode("missing");
    const invalidUtf8 = Uint8Array.from([0xc3, 0x28, 0x0a]);

    const errors = await Promise.all(
      [
        malformedHeader,
        oversized,
        decodeGitBatchResponse(truncated, [blob(firstPath, 8)]).pipe(
          Effect.flip
        ),
        trailing,
        missingTerminator,
        invalidUtf8,
      ].map((output) =>
        Effect.runPromise(
          output instanceof Uint8Array
            ? decodeGitBatchResponse(output, input).pipe(Effect.flip)
            : output
        )
      )
    );

    expect(errors.every((error) => error instanceof GitBatchError)).toBe(true);
    expect(errors.map(({ reason }) => reason)).toEqual([
      "protocol",
      "limit",
      "protocol",
      "protocol",
      "protocol",
      "protocol",
    ]);
    expect(errors[3]?.sourcePath).toBeNull();
  });
});
