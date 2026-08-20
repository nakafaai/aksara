import type {
  CorpusSourcePath,
  GitCommitSha,
} from "@nakafa/aksara-contracts/ids";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, Schema } from "effect";

const MAX_BATCH_BLOBS = 128;
const MAX_BATCH_BODY_BYTES = 32 * 1024 * 1024;
const MAX_BATCH_HEADER_BYTES = 96;
const BLOB_HEADER_PATTERN = /^[a-f\d]{40} blob ([1-9]\d*|0)$/;

/** One bounded blob expected from Git's batch protocol. */
export interface GitBatchBlob {
  readonly maxBytes: number;
  readonly sourcePath: CorpusSourcePath;
}

/** One complete bounded request to Git's batch protocol. */
export interface GitBatchRequest {
  readonly blobs: readonly GitBatchBlob[];
  readonly stdin: Uint8Array;
  readonly stdoutLimit: number;
}

/** Git's binary batch response violated its exact framing contract. */
export class GitBatchError extends Schema.TaggedError<GitBatchError>()(
  "GitBatchError",
  {
    cause: Schema.Unknown,
    reason: Schema.Literals(["limit", "protocol"]),
    sourcePath: Schema.NullOr(CorpusSourcePathSchema),
  }
) {}

/** Splits canonical paths by both process count and retained byte ceilings. */
export function partitionGitBlobInputs(inputs: readonly GitBatchBlob[]) {
  const ordered = [...inputs].sort((left, right) =>
    compareCodeUnits(left.sourcePath, right.sourcePath)
  );
  const batches: GitBatchBlob[][] = [];
  let batch: GitBatchBlob[] = [];
  let batchBytes = 0;
  for (const input of ordered) {
    const exceedsCount = batch.length >= MAX_BATCH_BLOBS;
    const exceedsBytes = batchBytes + input.maxBytes > MAX_BATCH_BODY_BYTES;
    if (batch.length > 0 && (exceedsCount || exceedsBytes)) {
      batches.push(batch);
      batch = [];
      batchBytes = 0;
    }
    batch.push(input);
    batchBytes += input.maxBytes;
  }
  if (batch.length > 0) {
    batches.push(batch);
  }
  return batches;
}

/** Encodes one argument-safe Git batch request with a bounded response ceiling. */
export function makeGitBatchRequest(
  commitSha: GitCommitSha,
  blobs: readonly GitBatchBlob[]
): GitBatchRequest {
  const coordinates = blobs
    .map(({ sourcePath }) => `${commitSha}:${sourcePath}\n`)
    .join("");
  return {
    blobs,
    stdin: new TextEncoder().encode(coordinates),
    stdoutLimit: blobs.reduce(
      (total, { maxBytes }) => total + maxBytes + MAX_BATCH_HEADER_BYTES + 1,
      0
    ),
  };
}

/** Finds the next line terminator without decoding following blob bytes. */
function lineEnd(bytes: Uint8Array, offset: number) {
  const index = bytes.indexOf(0x0a, offset);
  return index === -1 ? null : index;
}

/** Decodes one strict ASCII-compatible Git batch header. */
function decodeHeader(
  bytes: Uint8Array,
  start: number,
  end: number,
  sourcePath: CorpusSourcePath
) {
  return Effect.try({
    catch: (cause) =>
      new GitBatchError({ cause, reason: "protocol", sourcePath }),
    try: () =>
      new TextDecoder("utf-8", { fatal: true }).decode(bytes.slice(start, end)),
  });
}

/** Decodes exact raw blob bytes from one complete Git batch response. */
export const decodeGitBatchResponse = Effect.fn(
  "AksaraPublisher.decodeGitBatchResponse"
)(function* (output: Uint8Array, blobs: readonly GitBatchBlob[]) {
  const decoded = new Map<CorpusSourcePath, Uint8Array>();
  let offset = 0;
  for (const blob of blobs) {
    const end = lineEnd(output, offset);
    if (end === null) {
      return yield* new GitBatchError({
        cause: "Missing Git batch header terminator.",
        reason: "protocol",
        sourcePath: blob.sourcePath,
      });
    }
    const header = yield* decodeHeader(output, offset, end, blob.sourcePath);
    const match = BLOB_HEADER_PATTERN.exec(header);
    const size = match?.[1] === undefined ? Number.NaN : Number(match[1]);
    if (!Number.isSafeInteger(size)) {
      return yield* new GitBatchError({
        cause: { header },
        reason: "protocol",
        sourcePath: blob.sourcePath,
      });
    }
    if (size > blob.maxBytes) {
      return yield* new GitBatchError({
        cause: { actualBytes: size, maxBytes: blob.maxBytes },
        reason: "limit",
        sourcePath: blob.sourcePath,
      });
    }
    const bodyStart = end + 1;
    const bodyEnd = bodyStart + size;
    if (bodyEnd >= output.byteLength || output[bodyEnd] !== 0x0a) {
      return yield* new GitBatchError({
        cause: {
          actualBytes: output.byteLength - bodyStart,
          expectedBytes: size,
        },
        reason: "protocol",
        sourcePath: blob.sourcePath,
      });
    }
    decoded.set(blob.sourcePath, output.slice(bodyStart, bodyEnd));
    offset = bodyEnd + 1;
  }
  if (offset !== output.byteLength) {
    return yield* new GitBatchError({
      cause: { trailingBytes: output.byteLength - offset },
      reason: "protocol",
      sourcePath: null,
    });
  }
  return decoded;
});
