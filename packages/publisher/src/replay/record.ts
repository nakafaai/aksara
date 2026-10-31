import { hashText } from "@nakafa/aksara-contracts/hash/text";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import {
  encodeJsonText,
  JsonTextSchema,
} from "@nakafa/aksara-utilities/text/json";
import { Effect, Schema } from "effect";
import { replaySpoolFailure } from "#publisher/replay/error";

/** Counts the UTF-8 bytes that one text occupies in the spool. */
function utf8Length(value: string) {
  return new TextEncoder().encode(value).byteLength;
}

/** Maximum records accepted by one bounded publication replay spool. */
export const MAX_REPLAY_RECORDS = 100_000;

/** Maximum stored bytes accepted for one independently replayable record. */
export const MAX_REPLAY_RECORD_BYTES = MAX_PUBLICATION_RESPONSE_BYTES;

/** Maximum temporary disk footprint accepted by one publication spool. */
export const MAX_REPLAY_TOTAL_BYTES = 1024 * 1024 * 1024;

const ReplaySpoolUsageSchema = Schema.Struct({
  count: Schema.Finite,
  index: Schema.Finite,
  recordBytes: Schema.Finite,
  totalBytes: Schema.Finite,
});

/** Proposed bounded usage for one replay-spool state transition. */
type ReplaySpoolUsage = typeof ReplaySpoolUsageSchema.Type;

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
    try: () => (value === undefined ? undefined : encodeJsonText(value)),
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
      return hashText(data).pipe(
        Effect.flatMap((hash) => {
          const bytes = utf8Length(data) + utf8Length(hash);
          return validateReplaySpoolUsage({
            count: 1,
            index,
            recordBytes: bytes,
            totalBytes: bytes,
          }).pipe(Effect.as({ bytes, data, hash }));
        })
      );
    })
  );
}

/** Hash-authenticates and strictly schema-decodes one persisted record. */
export function decodeReplayRecord<A, I>(input: {
  readonly data: string;
  readonly hash: string;
  readonly index: number;
  readonly schema: Schema.Codec<A, I, never>;
}) {
  const recordBytes = utf8Length(input.data) + utf8Length(input.hash);
  return validateReplaySpoolUsage({
    count: 1,
    index: input.index,
    recordBytes,
    totalBytes: recordBytes,
  }).pipe(
    Effect.andThen(
      Schema.decodeEffect(Sha256HashSchema)(input.hash).pipe(
        Effect.mapError((cause) =>
          replaySpoolFailure("hash", cause, input.index)
        )
      )
    ),
    Effect.flatMap((expectedHash) =>
      hashText(input.data).pipe(
        Effect.filterOrFail(
          (actualHash) => actualHash === expectedHash,
          (actualHash) =>
            replaySpoolFailure(
              "hash",
              { actualHash, expectedHash },
              input.index
            )
        )
      )
    ),
    Effect.flatMap(() =>
      Schema.decodeEffect(JsonTextSchema)(input.data).pipe(
        Effect.mapError((cause) =>
          replaySpoolFailure("decode", cause, input.index)
        ),
        Effect.flatMap((value) =>
          Schema.decodeUnknownEffect(input.schema)(value, {
            onExcessProperty: "error",
          }).pipe(
            Effect.mapError((cause) =>
              replaySpoolFailure("decode", cause, input.index)
            )
          )
        )
      )
    )
  );
}
