import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema } from "effect";
import { replaySpoolFailure } from "#publisher/replay/error";

/** Maximum records accepted by one bounded publication replay spool. */
export const MAX_REPLAY_RECORDS = 100_000;

/** Maximum stored bytes accepted for one independently replayable record. */
export const MAX_REPLAY_RECORD_BYTES = MAX_PUBLICATION_RESPONSE_BYTES;

/** Maximum temporary disk footprint accepted by one publication spool. */
export const MAX_REPLAY_TOTAL_BYTES = 1024 * 1024 * 1024;

/** Proposed bounded usage for one replay-spool state transition. */
export interface ReplaySpoolUsage {
  readonly count: number;
  readonly index: number;
  readonly recordBytes: number;
  readonly totalBytes: number;
}

/** Computes the exact digest persisted beside one encoded record. */
function hashRecord(value: string) {
  const digest = createHash("sha256").update(value).digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}

/** Rejects proposed disk usage before any replay file is written. */
export function validateReplaySpoolUsage(usage: ReplaySpoolUsage) {
  if (usage.recordBytes > MAX_REPLAY_RECORD_BYTES) {
    return Effect.fail(
      replaySpoolFailure(
        "limit",
        {
          actual: usage.recordBytes,
          limit: MAX_REPLAY_RECORD_BYTES,
          resource: "record-bytes",
        },
        usage.index
      )
    );
  }
  if (usage.totalBytes > MAX_REPLAY_TOTAL_BYTES) {
    return Effect.fail(
      replaySpoolFailure(
        "limit",
        {
          actual: usage.totalBytes,
          limit: MAX_REPLAY_TOTAL_BYTES,
          resource: "total-bytes",
        },
        usage.index
      )
    );
  }
  if (usage.count > MAX_REPLAY_RECORDS) {
    return Effect.fail(
      replaySpoolFailure(
        "limit",
        {
          actual: usage.count,
          limit: MAX_REPLAY_RECORDS,
          resource: "records",
        },
        usage.index
      )
    );
  }
  return Effect.void;
}

/** Serializes one schema-owned value and derives its bounded wire evidence. */
export function encodeReplayRecord<A>(value: A, index: number) {
  return Effect.try({
    catch: (cause) => replaySpoolFailure("encode", cause, index),
    try: () => JSON.stringify(value),
  }).pipe(
    Effect.flatMap((data) => {
      if (data === undefined) {
        return Effect.fail(
          replaySpoolFailure(
            "encode",
            "Replay records must have JSON object values.",
            index
          )
        );
      }
      const hash = hashRecord(data);
      const bytes = Buffer.byteLength(data) + Buffer.byteLength(hash);
      return validateReplaySpoolUsage({
        count: 1,
        index,
        recordBytes: bytes,
        totalBytes: bytes,
      }).pipe(Effect.as({ bytes, data, hash }));
    })
  );
}

/** Hash-authenticates and strictly schema-decodes one persisted record. */
export function decodeReplayRecord<A, I>(input: {
  readonly data: string;
  readonly hash: string;
  readonly index: number;
  readonly schema: Schema.Schema<A, I, never>;
}) {
  const recordBytes =
    Buffer.byteLength(input.data) + Buffer.byteLength(input.hash);
  return validateReplaySpoolUsage({
    count: 1,
    index: input.index,
    recordBytes,
    totalBytes: recordBytes,
  }).pipe(
    Effect.zipRight(
      Schema.decodeUnknown(Sha256HashSchema)(input.hash).pipe(
        Effect.mapError((cause) =>
          replaySpoolFailure("hash", cause, input.index)
        )
      )
    ),
    Effect.flatMap((expectedHash) => {
      const actualHash = hashRecord(input.data);
      if (actualHash !== expectedHash) {
        return Effect.fail(
          replaySpoolFailure("hash", { actualHash, expectedHash }, input.index)
        );
      }
      return Effect.try({
        catch: (cause) => replaySpoolFailure("decode", cause, input.index),
        try: (): unknown => JSON.parse(input.data),
      }).pipe(
        Effect.flatMap((value) =>
          Schema.decodeUnknown(input.schema)(value, {
            onExcessProperty: "error",
          }).pipe(
            Effect.mapError((cause) =>
              replaySpoolFailure("decode", cause, input.index)
            )
          )
        )
      );
    })
  );
}
