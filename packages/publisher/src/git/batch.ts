import type {
  CorpusSourcePath,
  GitCommitSha,
} from "@nakafa/aksara-contracts/ids";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { Effect, Schema } from "effect";

export const MAX_GIT_BATCH_BLOBS = 128;
const MAX_BATCH_HEADER_BYTES = 96;
const BLOB_HEADER_PATTERN = /^([a-f\d]{40}) blob ([1-9]\d*|0)$/;

const GitBlobMetadataSchema = Schema.Struct({
  byteLength: Schema.Number.check(
    Schema.isInt(),
    Schema.isGreaterThanOrEqualTo(0)
  ),
  objectId: Schema.String.check(Schema.isPattern(/^[a-f\d]{40}$/)).pipe(
    Schema.brand("GitBlobObjectId")
  ),
  sourcePath: CorpusSourcePathSchema,
});
type GitBlobMetadata = typeof GitBlobMetadataSchema.Type;

/** Git's binary batch response violated its exact framing contract. */
export class GitBatchError extends Schema.TaggedError<GitBatchError>()(
  "GitBatchError",
  {
    cause: Schema.Unknown,
    reason: Schema.Literals(["limit", "protocol"]),
    sourcePath: Schema.NullOr(CorpusSourcePathSchema),
  }
) {}

/** Requests only immutable object identities and sizes before any body read. */
export function makeGitMetadataRequest(
  commitSha: GitCommitSha,
  sourcePaths: readonly CorpusSourcePath[]
) {
  return {
    stdin: new TextEncoder().encode(
      sourcePaths.map((sourcePath) => `${commitSha}:${sourcePath}\n`).join("")
    ),
    stdoutLimit: sourcePaths.length * MAX_BATCH_HEADER_BYTES,
  };
}

/** Requests verified object IDs with a ceiling derived from their exact sizes. */
export function makeGitBatchRequest(blobs: readonly GitBlobMetadata[]) {
  return {
    stdin: new TextEncoder().encode(
      blobs.map(({ objectId }) => `${objectId}\n`).join("")
    ),
    stdoutLimit: blobs.reduce(
      (total, { byteLength }) =>
        total + byteLength + MAX_BATCH_HEADER_BYTES + 1,
      0
    ),
  };
}

/** Decodes a bounded blob header without decoding any following body bytes. */
const readHeader = Effect.fn("AksaraPublisher.readGitBatchHeader")(function* (
  output: Uint8Array,
  offset: number,
  sourcePath: CorpusSourcePath
) {
  const end = output.indexOf(0x0a, offset);
  if (end === -1 || end - offset >= MAX_BATCH_HEADER_BYTES) {
    return yield* new GitBatchError({
      cause: "Missing or oversized Git batch header terminator.",
      reason: "protocol",
      sourcePath,
    });
  }
  const header = yield* Effect.try({
    catch: (cause) =>
      new GitBatchError({ cause, reason: "protocol", sourcePath }),
    try: () =>
      new TextDecoder("utf-8", { fatal: true }).decode(
        output.subarray(offset, end)
      ),
  });
  const match = BLOB_HEADER_PATTERN.exec(header);
  const blob = yield* Schema.decodeUnknownEffect(GitBlobMetadataSchema)({
    byteLength: Number(match?.[2]),
    objectId: match?.[1],
    sourcePath,
  }).pipe(
    Effect.mapError(
      (cause) => new GitBatchError({ cause, reason: "protocol", sourcePath })
    )
  );
  if (blob.byteLength > MAX_RAW_MDX_BYTES) {
    return yield* new GitBatchError({
      cause: { actualBytes: blob.byteLength, maxBytes: MAX_RAW_MDX_BYTES },
      reason: "limit",
      sourcePath,
    });
  }
  return { blob, nextOffset: end + 1 };
});

/** Rejects additional response frames that were not requested. */
const verifyEnd = Effect.fn("AksaraPublisher.verifyGitBatchEnd")(function* (
  output: Uint8Array,
  offset: number
) {
  if (offset !== output.byteLength) {
    return yield* new GitBatchError({
      cause: { trailingBytes: output.byteLength - offset },
      reason: "protocol",
      sourcePath: null,
    });
  }
});

/** Verifies every blob type and authored byte limit before requesting bodies. */
export const decodeGitBatchMetadata = Effect.fn(
  "AksaraPublisher.decodeGitBatchMetadata"
)(function* (output: Uint8Array, sourcePaths: readonly CorpusSourcePath[]) {
  const blobs: GitBlobMetadata[] = [];
  let offset = 0;
  for (const sourcePath of sourcePaths) {
    const header = yield* readHeader(output, offset, sourcePath);
    blobs.push(header.blob);
    offset = header.nextOffset;
  }
  yield* verifyEnd(output, offset);
  return blobs;
});

/** Checks body framing and identity against the metadata-only preflight. */
export const decodeGitBatchResponse = Effect.fn(
  "AksaraPublisher.decodeGitBatchResponse"
)(function* (output: Uint8Array, blobs: readonly GitBlobMetadata[]) {
  const decoded = new Map<CorpusSourcePath, Uint8Array>();
  let offset = 0;
  for (const expected of blobs) {
    const { blob, nextOffset } = yield* readHeader(
      output,
      offset,
      expected.sourcePath
    );
    if (
      blob.objectId !== expected.objectId ||
      blob.byteLength !== expected.byteLength
    ) {
      return yield* new GitBatchError({
        cause: { actual: blob, expected },
        reason: "protocol",
        sourcePath: expected.sourcePath,
      });
    }
    const bodyEnd = nextOffset + blob.byteLength;
    if (bodyEnd >= output.byteLength || output[bodyEnd] !== 0x0a) {
      return yield* new GitBatchError({
        cause: {
          actualBytes: output.byteLength - nextOffset,
          expectedBytes: blob.byteLength,
        },
        reason: "protocol",
        sourcePath: expected.sourcePath,
      });
    }
    decoded.set(expected.sourcePath, output.slice(nextOffset, bodyEnd));
    offset = bodyEnd + 1;
  }
  yield* verifyEnd(output, offset);
  return decoded;
});
