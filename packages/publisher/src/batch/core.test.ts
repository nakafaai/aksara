import { ReleaseIdSchema } from "@nakafaai/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { partitionBatch } from "#publisher/batch/core";

const releaseId = ReleaseIdSchema.make("test-batch-core");

describe("partitionBatch", () => {
  it("splits collectively oversized values that each fit independently", async () => {
    const batches = await Effect.runPromise(
      partitionBatch({
        kind: "release-item",
        maxBytes: 5,
        maxCount: 2,
        releaseId,
        serializeBatch: (values) => JSON.stringify(values),
        values: ["a", "b"],
      })
    );

    expect(batches).toEqual([["a"], ["b"]]);
  });

  it("preserves an empty bounded group without inventing an envelope", async () => {
    const batches = await Effect.runPromise(
      partitionBatch({
        kind: "release-item",
        maxBytes: 5,
        maxCount: 2,
        releaseId,
        serializeBatch: (values) => JSON.stringify(values),
        values: [],
      })
    );

    expect(batches).toEqual([]);
  });
});
