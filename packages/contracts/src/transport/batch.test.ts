import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { batchCeilingCases, emptyBatchCases } from "#contracts/test/batch";
import { testPageProjection } from "#contracts/test/preview";
import {
  artifact,
  items,
  projection,
  releaseId,
  route,
} from "#contracts/test/request";
import {
  StageArtifactBatchInputSchema,
  StageItemBatchInputSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchInputSchema,
  StageProjectionBatchRequestSchema,
  StageRollbackProjectionBatchInputSchema,
  StageRollbackProjectionBatchRequestSchema,
  StageRouteBatchInputSchema,
  StageRouteBatchRequestSchema,
} from "#contracts/transport/batch";

const itemError =
  "Expected contiguous release items bound to the batch release identity.";

/** Strictly tests one batch transport schema without extra properties. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("batch transport", () => {
  it("requires contiguous items owned by the exact release", () => {
    const mismatched = [{ ...items[0], releaseId: "test-other" }, items[1]];
    const skipped = [items[0], { ...items[1], index: 2 }];
    for (const batchItems of [mismatched, skipped]) {
      expect(
        accepts(StageItemBatchRequestSchema, {
          batchIndex: 0,
          items: batchItems,
          operation: "stageItemBatch",
          releaseId,
        })
      ).toBe(false);
      expect(
        accepts(StageItemBatchInputSchema, {
          batchIndex: 0,
          items: batchItems,
          releaseId,
        })
      ).toBe(false);
    }
    const error = Schema.decodeUnknownExit(StageItemBatchRequestSchema)({
      batchIndex: 0,
      items: skipped,
      operation: "stageItemBatch",
      releaseId,
    });
    expect(Exit.isFailure(error) ? String(error.cause) : "").toContain(
      itemError
    );
    const inputError = Schema.decodeUnknownExit(StageItemBatchInputSchema)({
      batchIndex: 0,
      items: skipped,
      releaseId,
    });
    expect(
      Exit.isFailure(inputError) ? String(inputError.cause) : ""
    ).toContain(itemError);
  });

  it("shares exact operation-free inputs with wire requests", () => {
    for (const { input, schema } of [
      {
        input: { batchIndex: 0, items, releaseId },
        schema: StageItemBatchInputSchema,
      },
      {
        input: { batchIndex: 0, projections: [projection], releaseId },
        schema: StageProjectionBatchInputSchema,
      },
      {
        input: { artifacts: [artifact], batchIndex: 0, releaseId },
        schema: StageArtifactBatchInputSchema,
      },
      {
        input: { batchIndex: 0, releaseId, routes: [route] },
        schema: StageRouteBatchInputSchema,
      },
    ]) {
      expect(accepts(schema, input)).toBe(true);
      expect(accepts(schema, { ...input, operation: "stageItemBatch" })).toBe(
        false
      );
    }
  });

  it("rejects incomplete material projections", () => {
    const { topicTitle: _topicTitle, ...incompleteMaterial } = projection;
    expect(
      accepts(StageProjectionBatchInputSchema, {
        batchIndex: 0,
        projections: [incompleteMaterial],
        releaseId,
      })
    ).toBe(false);
  });

  it("rejects predecessor Page metadata from projection staging", () => {
    const historicalPage = {
      ...testPageProjection,
      metadata: {
        description: testPageProjection.metadata.description,
        lastModified: testPageProjection.metadata.datePublished,
        title: testPageProjection.metadata.title,
      },
    };
    expect(
      accepts(StageProjectionBatchInputSchema, {
        batchIndex: 0,
        projections: [historicalPage],
        releaseId,
      })
    ).toBe(false);
    expect(
      accepts(StageProjectionBatchRequestSchema, {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: [historicalPage],
        releaseId,
      })
    ).toBe(false);
    expect(
      accepts(StageRollbackProjectionBatchInputSchema, {
        batchIndex: 0,
        projections: [historicalPage],
        releaseId,
      })
    ).toBe(true);
    expect(
      accepts(StageRollbackProjectionBatchRequestSchema, {
        batchIndex: 0,
        operation: "stageRollbackProjectionBatch",
        projections: [historicalPage],
        releaseId,
      })
    ).toBe(true);
  });

  it("requires non-empty batches and enforces canonical count ceilings", () => {
    for (const { input, schema } of emptyBatchCases()) {
      expect(accepts(schema, input)).toBe(false);
    }
    for (const { invalid, schema, valid } of batchCeilingCases()) {
      expect(accepts(schema, valid)).toBe(true);
      expect(accepts(schema, invalid)).toBe(false);
    }
  });

  it("requires contiguous routes owned by the exact release", () => {
    const skipped = [route, { ...route, index: 2 }];
    const foreign = [{ ...route, releaseId: "test-other" }];
    for (const routes of [skipped, foreign]) {
      expect(
        accepts(StageRouteBatchInputSchema, {
          batchIndex: 0,
          releaseId,
          routes,
        })
      ).toBe(false);
      expect(
        accepts(StageRouteBatchRequestSchema, {
          batchIndex: 0,
          operation: "stageRouteBatch",
          releaseId,
          routes,
        })
      ).toBe(false);
    }
    for (const result of [
      Schema.decodeUnknownExit(StageRouteBatchInputSchema)({
        batchIndex: 0,
        releaseId,
        routes: skipped,
      }),
      Schema.decodeUnknownExit(StageRouteBatchRequestSchema)({
        batchIndex: 0,
        operation: "stageRouteBatch",
        releaseId,
        routes: skipped,
      }),
    ]) {
      expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
        "Expected contiguous route items bound to the batch release identity."
      );
    }
  });
});
