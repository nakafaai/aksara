import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ContentReleaseBundleSchema } from "#contracts/release/lifecycle";
import {
  artifact,
  hash,
  items,
  projection,
  release,
  releaseId,
  rendererManifest,
  requests,
} from "#contracts/test/request";
import {
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_COUNT,
  MAX_PROJECTION_BATCH_COUNT,
} from "#contracts/transport/limits";
import {
  decodePublicationRequest,
  PublicationRequestSchema,
  StageArtifactBatchInputSchema,
  StageArtifactBatchRequestSchema,
  StageItemBatchInputSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchInputSchema,
  StageProjectionBatchRequestSchema,
} from "#contracts/transport/request";

const itemError =
  "Expected contiguous release items bound to the batch release identity.";

/** Strictly tests one request schema without allowing extra properties. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("publication requests", () => {
  it("decodes every exact operation through one discriminated ingress", async () => {
    for (const request of requests) {
      expect(accepts(PublicationRequestSchema, request)).toBe(true);
    }
    const decoded = await Effect.runPromise(
      decodePublicationRequest(requests[3])
    );
    expect(decoded.operation).toBe("stageRelease");
  });

  it("rejects excess fields with a typed error", async () => {
    const error = await Effect.runPromise(
      decodePublicationRequest({ ...requests[4], unexpected: true }).pipe(
        Effect.flip
      )
    );
    expect(error._tag).toBe("ContractDecodeError");
  });

  it("binds the frozen renderer envelope to the signed manifest", async () => {
    expect(
      accepts(ContentReleaseBundleSchema, { release, rendererManifest })
    ).toBe(true);
    const mismatchedRelease = {
      ...release,
      manifest: {
        ...release.manifest,
        rendererManifestHash: hash,
      },
    };
    const inputError = Schema.decodeUnknownEither(ContentReleaseBundleSchema)({
      release: mismatchedRelease,
      rendererManifest,
    });
    expect(Either.isLeft(inputError)).toBe(true);
    if (Either.isLeft(inputError)) {
      expect(String(inputError.left)).toContain(
        "Expected the signed release to bind the frozen renderer envelope."
      );
    }
    const error = await Effect.runPromise(
      decodePublicationRequest({
        operation: "stageRelease",
        release: mismatchedRelease,
        rendererManifest,
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ContractDecodeError");
  });

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
    const error = Schema.decodeUnknownEither(StageItemBatchRequestSchema)({
      batchIndex: 0,
      items: skipped,
      operation: "stageItemBatch",
      releaseId,
    });
    expect(Either.isLeft(error) ? String(error.left) : "").toContain(itemError);
    const inputError = Schema.decodeUnknownEither(StageItemBatchInputSchema)({
      batchIndex: 0,
      items: skipped,
      releaseId,
    });
    expect(Either.isLeft(inputError) ? String(inputError.left) : "").toContain(
      itemError
    );
  });

  it("shares exact operation-free batch inputs with wire requests", () => {
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
    ]) {
      expect(accepts(schema, input)).toBe(true);
      expect(accepts(schema, { ...input, operation: "stageItemBatch" })).toBe(
        false
      );
    }
  });

  it("requires non-empty batches and enforces canonical count ceilings", () => {
    const emptyBatches = [
      {
        input: {
          batchIndex: 0,
          items: [],
          operation: "stageItemBatch",
          releaseId,
        },
        schema: StageItemBatchRequestSchema,
      },
      {
        input: {
          batchIndex: 0,
          operation: "stageProjectionBatch",
          projections: [],
          releaseId,
        },
        schema: StageProjectionBatchRequestSchema,
      },
      {
        input: {
          artifacts: [],
          batchIndex: 0,
          operation: "stageArtifactBatch",
          releaseId,
        },
        schema: StageArtifactBatchRequestSchema,
      },
    ];
    for (const { input, schema } of emptyBatches) {
      expect(accepts(schema, input)).toBe(false);
    }

    const artifactBatch = Array.from(
      { length: MAX_ARTIFACT_BATCH_COUNT },
      () => artifact
    );
    expect(
      accepts(StageArtifactBatchRequestSchema, {
        artifacts: artifactBatch,
        batchIndex: 0,
        operation: "stageArtifactBatch",
        releaseId,
      })
    ).toBe(true);
    expect(
      accepts(StageArtifactBatchRequestSchema, {
        artifacts: [...artifactBatch, artifact],
        batchIndex: 0,
        operation: "stageArtifactBatch",
        releaseId,
      })
    ).toBe(false);

    const projectionBatch = Array.from(
      { length: MAX_PROJECTION_BATCH_COUNT },
      () => projection
    );
    expect(
      accepts(StageProjectionBatchRequestSchema, {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: projectionBatch,
        releaseId,
      })
    ).toBe(true);
    expect(
      accepts(StageProjectionBatchRequestSchema, {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: [...projectionBatch, projection],
        releaseId,
      })
    ).toBe(false);

    const itemBatch = Array.from(
      { length: MAX_ITEM_BATCH_COUNT },
      (_, index) => ({
        ...items[0],
        index,
      })
    );
    expect(
      accepts(StageItemBatchRequestSchema, {
        batchIndex: 0,
        items: itemBatch,
        operation: "stageItemBatch",
        releaseId,
      })
    ).toBe(true);
    expect(
      accepts(StageItemBatchRequestSchema, {
        batchIndex: 0,
        items: [
          ...itemBatch,
          {
            ...items[0],
            index: MAX_ITEM_BATCH_COUNT,
          },
        ],
        operation: "stageItemBatch",
        releaseId,
      })
    ).toBe(false);
  });
});
