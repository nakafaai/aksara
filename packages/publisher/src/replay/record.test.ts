import { createHash } from "node:crypto";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  decodeReplayRecord,
  encodeReplayRecord,
  MAX_REPLAY_RECORD_BYTES,
  MAX_REPLAY_RECORDS,
  MAX_REPLAY_TOTAL_BYTES,
  validateReplaySpoolUsage,
} from "#publisher/replay/record";

const ReplayEntrySchema = Schema.Struct({
  sequence: Schema.Number,
  value: Schema.String,
});
const entry = { sequence: 1, value: "test-record" };

/** Creates the contract-shaped digest for exact test bytes. */
function hashData(data: string) {
  const digest = createHash("sha256").update(data).digest("hex");
  return `sha256:${digest}`;
}

/** Returns one typed record-codec failure without a FiberFailure wrapper. */
function reject<A, E>(effect: Effect.Effect<A, E>) {
  return Effect.runPromise(effect.pipe(Effect.flip));
}

describe("replay record", () => {
  it("round-trips one hashed strict-schema record", async () => {
    const encoded = await Effect.runPromise(encodeReplayRecord(entry, 4));
    const decoded = await Effect.runPromise(
      decodeReplayRecord({
        data: encoded.data,
        hash: encoded.hash,
        index: 4,
        schema: ReplayEntrySchema,
      })
    );

    expect(decoded).toEqual(entry);
    expect(encoded.bytes).toBeGreaterThan(encoded.data.length);
    expect(encoded.hash).toBe(hashData(encoded.data));
  });

  it("rejects non-JSON values through typed encode failures", async () => {
    await expect(
      reject(encodeReplayRecord(undefined, 2))
    ).resolves.toMatchObject({
      index: 2,
      operation: "encode",
    });
    await expect(
      reject(encodeReplayRecord(BigInt(1), 3))
    ).resolves.toMatchObject({
      index: 3,
      operation: "encode",
    });
  });

  it.each([
    ["record bytes", MAX_REPLAY_RECORD_BYTES + 1, 1, 1],
    ["total bytes", 1, MAX_REPLAY_TOTAL_BYTES + 1, 1],
    ["record count", 1, 1, MAX_REPLAY_RECORDS + 1],
  ])(
    "rejects usage beyond the %s ceiling",
    async (_label, recordBytes, totalBytes, count) => {
      const error = await reject(
        validateReplaySpoolUsage({ count, index: 8, recordBytes, totalBytes })
      );
      expect(error).toMatchObject({ index: 8, operation: "limit" });
    }
  );

  it("accepts usage exactly at every ceiling", async () => {
    expect(MAX_REPLAY_RECORD_BYTES).toBe(MAX_PUBLICATION_RESPONSE_BYTES);
    await expect(
      Effect.runPromise(
        validateReplaySpoolUsage({
          count: MAX_REPLAY_RECORDS,
          index: MAX_REPLAY_RECORDS - 1,
          recordBytes: MAX_REPLAY_RECORD_BYTES,
          totalBytes: MAX_REPLAY_TOTAL_BYTES,
        })
      )
    ).resolves.toBeUndefined();
  });

  it("rejects oversized and invalid persisted hashes", async () => {
    await expect(
      reject(
        decodeReplayRecord({
          data: "x".repeat(MAX_REPLAY_RECORD_BYTES),
          hash: hashData("x"),
          index: 5,
          schema: ReplayEntrySchema,
        })
      )
    ).resolves.toMatchObject({ index: 5, operation: "limit" });
    await expect(
      reject(
        decodeReplayRecord({
          data: JSON.stringify(entry),
          hash: "invalid",
          index: 6,
          schema: ReplayEntrySchema,
        })
      )
    ).resolves.toMatchObject({ index: 6, operation: "hash" });
  });

  it("rejects digest tampering before parsing", async () => {
    const data = JSON.stringify(entry);
    const error = await reject(
      decodeReplayRecord({
        data: `${data} `,
        hash: hashData(data),
        index: 7,
        schema: ReplayEntrySchema,
      })
    );
    expect(error).toMatchObject({ index: 7, operation: "hash" });
  });

  it.each([
    ["invalid JSON", "{", hashData("{")],
    [
      "invalid schema",
      JSON.stringify({ sequence: "one", value: "test-record" }),
      hashData(JSON.stringify({ sequence: "one", value: "test-record" })),
    ],
    [
      "excess properties",
      JSON.stringify({ ...entry, unexpected: true }),
      hashData(JSON.stringify({ ...entry, unexpected: true })),
    ],
  ])("rejects %s after digest verification", async (_label, data, hash) => {
    const error = await reject(
      decodeReplayRecord({ data, hash, index: 9, schema: ReplayEntrySchema })
    );
    expect(error).toMatchObject({ index: 9, operation: "decode" });
  });
});
