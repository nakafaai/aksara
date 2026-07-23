import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { ContentSnapshotRowSchema } from "#contracts/release/snapshot-data";
import { materialGraph } from "#contracts/test/graph";
import {
  hash,
  releaseId,
  snapshotManifest,
  snapshotRow,
} from "#contracts/test/request";
import {
  StageSnapshotBatchInputSchema,
  StageSnapshotBatchRequestSchema,
  StageSnapshotInputSchema,
  StageSnapshotReceiptSchema,
  StageSnapshotRequestSchema,
} from "#contracts/transport/snapshot";

const otherHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

const quranRow = Schema.decodeUnknownSync(ContentSnapshotRowSchema)({
  family: "quran",
  record: {
    payload: {
      description: "Test-only Quran search row",
      graph: materialGraph("en", "test", "quran", "search"),
      kind: "quran-search",
      locale: "en",
      route: "quran/1",
      surahNumber: 1,
      text: "Test-only Quran protocol text",
      title: "Test Quran Row",
    },
    rowHash: hash,
    snapshotId: hash,
  },
});

/** Strictly tests one snapshot transport schema without extra properties. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("snapshot transport", () => {
  it("keeps manifest inputs operation-free and binds request identities", () => {
    const input = { releaseId, snapshot: snapshotManifest };
    const request = { ...input, operation: "stageSnapshot" };

    expect(accepts(StageSnapshotInputSchema, input)).toBe(true);
    expect(accepts(StageSnapshotRequestSchema, request)).toBe(true);
    expect(accepts(StageSnapshotInputSchema, request)).toBe(false);
    expect(
      accepts(StageSnapshotRequestSchema, {
        ...request,
        operation: "stageSnapshotBatch",
      })
    ).toBe(false);
  });

  it("accepts non-empty bounded rows owned by one snapshot envelope", () => {
    const input = {
      batchIndex: 0,
      family: "tryout",
      releaseId,
      rows: [snapshotRow],
      snapshotId: hash,
    };
    const request = { ...input, operation: "stageSnapshotBatch" };

    expect(accepts(StageSnapshotBatchInputSchema, input)).toBe(true);
    expect(accepts(StageSnapshotBatchRequestSchema, request)).toBe(true);
    expect(accepts(StageSnapshotBatchInputSchema, request)).toBe(false);
  });

  it("rejects mixed families and Quran rows from another snapshot", () => {
    const quranRequest = {
      batchIndex: 0,
      family: "quran",
      operation: "stageSnapshotBatch",
      releaseId,
      rows: [quranRow],
      snapshotId: hash,
    };
    const mixedRequest = {
      ...quranRequest,
      family: "tryout",
      rows: [snapshotRow, quranRow],
    };
    const mismatchedQuran = {
      ...quranRequest,
      rows: [
        {
          ...quranRow,
          record: { ...quranRow.record, snapshotId: otherHash },
        },
      ],
    };

    expect(accepts(StageSnapshotBatchRequestSchema, quranRequest)).toBe(true);
    expect(accepts(StageSnapshotBatchRequestSchema, mixedRequest)).toBe(false);
    expect(accepts(StageSnapshotBatchRequestSchema, mismatchedQuran)).toBe(
      false
    );
    for (const request of [mixedRequest, mismatchedQuran]) {
      const result = Schema.decodeUnknownEither(
        StageSnapshotBatchRequestSchema
      )(request);
      expect(Either.isLeft(result) ? String(result.left) : "").toContain(
        "Expected snapshot rows bound to one family and snapshot identity."
      );
    }
    const inputResult = Schema.decodeUnknownEither(
      StageSnapshotBatchInputSchema
    )({
      batchIndex: mixedRequest.batchIndex,
      family: mixedRequest.family,
      releaseId: mixedRequest.releaseId,
      rows: mixedRequest.rows,
      snapshotId: mixedRequest.snapshotId,
    });
    expect(
      Either.isLeft(inputResult) ? String(inputResult.left) : ""
    ).toContain(
      "Expected snapshot rows bound to one family and snapshot identity."
    );
  });

  it("requires exactly one manifest staging outcome", () => {
    const receipt = {
      created: 1,
      family: snapshotManifest.family,
      releaseId,
      snapshotId: hash,
      unchanged: 0,
    };

    expect(accepts(StageSnapshotReceiptSchema, receipt)).toBe(true);
    expect(
      accepts(StageSnapshotReceiptSchema, {
        ...receipt,
        created: 0,
        unchanged: 1,
      })
    ).toBe(true);
    for (const [created, unchanged] of [
      [0, 0],
      [1, 1],
    ]) {
      expect(
        accepts(StageSnapshotReceiptSchema, {
          ...receipt,
          created,
          unchanged,
        })
      ).toBe(false);
    }
    const invalid = Schema.decodeUnknownEither(StageSnapshotReceiptSchema)({
      ...receipt,
      created: 0,
    });
    expect(Either.isLeft(invalid) ? String(invalid.left) : "").toContain(
      "Expected exactly one created or unchanged snapshot manifest."
    );
  });
});
