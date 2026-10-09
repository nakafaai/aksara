import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema } from "effect";
import {
  decodeReplayRecord,
  encodeReplayRecord,
  MAX_REPLAY_RECORD_BYTES,
  MAX_REPLAY_RECORDS,
  MAX_REPLAY_TOTAL_BYTES,
  validateReplaySpoolUsage,
} from "#publisher/replay/record";
import { encodeJsonText } from "#publisher/text/json";

const ReplayEntrySchema = Schema.Struct({
  sequence: Schema.Finite,
  value: Schema.String,
});
const entry = { sequence: 1, value: "test-record" };

/** Creates the contract-shaped digest for exact test bytes. */
function hashData(data: string) {
  const digest = createHash("sha256").update(data).digest("hex");
  return `sha256:${digest}`;
}

/** Returns one typed record-codec failure without a FiberFailure wrapper. */
const reject = Effect.fn("ReplayRecordTest.reject")(
  <A, E>(effect: Effect.Effect<A, E>) => effect.pipe(Effect.flip)
);

describe("replay record", () => {
  it.effect("round-trips one hashed strict-schema record", () =>
    Effect.gen(function* () {
      const encoded = yield* encodeReplayRecord(entry, 4);
      const decoded = yield* decodeReplayRecord({
        data: encoded.data,
        hash: encoded.hash,
        index: 4,
        schema: ReplayEntrySchema,
      });

      expect(decoded).toEqual(entry);
      expect(encoded.bytes).toBeGreaterThan(encoded.data.length);
      expect(encoded.hash).toBe(hashData(encoded.data));
    })
  );

  it.effect("rejects non-JSON values through typed encode failures", () =>
    Effect.gen(function* () {
      expect(yield* reject(encodeReplayRecord(undefined, 2))).toMatchObject({
        index: 2,
        operation: "encode",
      });
      expect(yield* reject(encodeReplayRecord(BigInt(1), 3))).toMatchObject({
        index: 3,
        operation: "encode",
      });
    })
  );

  it.effect.each([
    ["record bytes", MAX_REPLAY_RECORD_BYTES + 1, 1, 1],
    ["total bytes", 1, MAX_REPLAY_TOTAL_BYTES + 1, 1],
    ["record count", 1, 1, MAX_REPLAY_RECORDS + 1],
  ] as const)(
    "rejects usage beyond the %s ceiling",
    ([_label, recordBytes, totalBytes, count]) =>
      Effect.gen(function* () {
        const error = yield* reject(
          validateReplaySpoolUsage({ count, index: 8, recordBytes, totalBytes })
        );
        expect(error).toMatchObject({ index: 8, operation: "limit" });
      })
  );

  it.effect("accepts usage exactly at every ceiling", () =>
    Effect.gen(function* () {
      expect(MAX_REPLAY_RECORD_BYTES).toBe(MAX_PUBLICATION_RESPONSE_BYTES);
      const result = yield* validateReplaySpoolUsage({
        count: MAX_REPLAY_RECORDS,
        index: MAX_REPLAY_RECORDS - 1,
        recordBytes: MAX_REPLAY_RECORD_BYTES,
        totalBytes: MAX_REPLAY_TOTAL_BYTES,
      });
      expect(result).toBeUndefined();
    })
  );

  it.effect("rejects oversized and invalid persisted hashes", () =>
    Effect.gen(function* () {
      expect(
        yield* reject(
          decodeReplayRecord({
            data: "x".repeat(MAX_REPLAY_RECORD_BYTES),
            hash: hashData("x"),
            index: 5,
            schema: ReplayEntrySchema,
          })
        )
      ).toMatchObject({ index: 5, operation: "limit" });
      expect(
        yield* reject(
          decodeReplayRecord({
            data: encodeJsonText(entry),
            hash: "invalid",
            index: 6,
            schema: ReplayEntrySchema,
          })
        )
      ).toMatchObject({ index: 6, operation: "hash" });
    })
  );

  it.effect("rejects digest tampering before parsing", () =>
    Effect.gen(function* () {
      const data = encodeJsonText(entry);
      const error = yield* reject(
        decodeReplayRecord({
          data: `${data} `,
          hash: hashData(data),
          index: 7,
          schema: ReplayEntrySchema,
        })
      );
      expect(error).toMatchObject({ index: 7, operation: "hash" });
    })
  );

  it.effect.each([
    ["invalid JSON", "{", hashData("{")],
    [
      "invalid schema",
      encodeJsonText({ sequence: "one", value: "test-record" }),
      hashData(encodeJsonText({ sequence: "one", value: "test-record" })),
    ],
    [
      "excess properties",
      encodeJsonText({ ...entry, unexpected: true }),
      hashData(encodeJsonText({ ...entry, unexpected: true })),
    ],
  ] as const)("rejects %s after digest verification", ([_label, data, hash]) =>
    Effect.gen(function* () {
      const error = yield* reject(
        decodeReplayRecord({
          data,
          hash,
          index: 9,
          schema: ReplayEntrySchema,
        })
      );
      expect(error).toMatchObject({ index: 9, operation: "decode" });
    })
  );
});

describe("replay record canonical bytes", () => {
  it.effect(
    "pins the encoded data, digest, and byte count of a non-ASCII record",
    () =>
      Effect.gen(function* () {
        const encoded = yield* encodeReplayRecord(
          { items: [1.5, "x"], sequence: 2, value: "Pelajaran é ✓ 数学" },
          7
        );
        expect(encoded).toMatchInlineSnapshot(`
          {
            "bytes": 137,
            "data": "{"items":[1.5,"x"],"sequence":2,"value":"Pelajaran é ✓ 数学"}",
            "hash": "sha256:444ff258fd1a44e5957c6f42f68f72f42340e7ad219401c32358ab85508c2bc7",
          }
        `);
      })
  );

  it.effect(
    "decodes the pinned stored record and rejects a one-character change",
    () =>
      Effect.gen(function* () {
        const PinnedRecordSchema = Schema.Struct({
          items: Schema.Array(Schema.Union([Schema.Finite, Schema.String])),
          sequence: Schema.Finite,
          value: Schema.String,
        });
        const decoded = yield* decodeReplayRecord({
          data: '{"items":[1.5,"x"],"sequence":2,"value":"Pelajaran é ✓ 数学"}',
          hash: "sha256:444ff258fd1a44e5957c6f42f68f72f42340e7ad219401c32358ab85508c2bc7",
          index: 7,
          schema: PinnedRecordSchema,
        });
        expect(decoded).toEqual({
          items: [1.5, "x"],
          sequence: 2,
          value: "Pelajaran é ✓ 数学",
        });

        const error = yield* reject(
          decodeReplayRecord({
            data: '{"items":[1.5,"x"],"sequence":3,"value":"Pelajaran é ✓ 数学"}',
            hash: "sha256:444ff258fd1a44e5957c6f42f68f72f42340e7ad219401c32358ab85508c2bc7",
            index: 7,
            schema: PinnedRecordSchema,
          })
        );
        expect(error).toMatchObject({ index: 7, operation: "hash" });
      })
  );
});
