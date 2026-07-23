import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ContentReleaseBundleSchema } from "#contracts/release/lifecycle";
import { batchCeilingCases, emptyBatchCases } from "#contracts/test/batch";
import {
  artifact,
  hash,
  items,
  projection,
  recoveryRelease,
  release,
  releaseId,
  rendererManifest,
  requests,
  route,
  snapshotRow,
} from "#contracts/test/request";
import {
  decodePublicationRequest,
  PublicationRequestSchema,
  StageArtifactBatchInputSchema,
  StageItemBatchInputSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchInputSchema,
  StageRouteBatchInputSchema,
  StageRouteBatchRequestSchema,
} from "#contracts/transport/request";
import { StageSnapshotBatchInputSchema } from "#contracts/transport/snapshot";

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
    const stageRelease = requests.find(
      (request) => request.operation === "stageRelease"
    );
    const decoded = await Effect.runPromise(
      decodePublicationRequest(stageRelease)
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

  it("rejects the removed finalization operation", async () => {
    const error = await Effect.runPromise(
      decodePublicationRequest({
        afterIndex: -1,
        operation: "finalize",
        release,
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ContractDecodeError");
  });

  it("requires distinct active and recovery identities for acceptance", () => {
    expect(
      accepts(PublicationRequestSchema, {
        operation: "accept",
        recoveryId: releaseId,
        releaseId,
      })
    ).toBe(false);
  });

  it("accepts rollback provenance only at recovery publication seams", () => {
    for (const input of [
      { operation: "stageRecovery", release, rendererManifest },
      { operation: "activateRecovery", release },
    ]) {
      expect(accepts(PublicationRequestSchema, input)).toBe(false);
    }
    for (const input of [
      {
        operation: "stageRecovery",
        release: recoveryRelease,
        rendererManifest,
      },
      { operation: "activateRecovery", release: recoveryRelease },
    ]) {
      expect(accepts(PublicationRequestSchema, input)).toBe(true);
    }
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
      {
        input: { batchIndex: 0, releaseId, routes: [route] },
        schema: StageRouteBatchInputSchema,
      },
      {
        input: {
          batchIndex: 0,
          family: "tryout",
          releaseId,
          rows: [snapshotRow],
          snapshotId: hash,
        },
        schema: StageSnapshotBatchInputSchema,
      },
    ]) {
      expect(accepts(schema, input)).toBe(true);
      expect(accepts(schema, { ...input, operation: "stageItemBatch" })).toBe(
        false
      );
    }
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
      Schema.decodeUnknownEither(StageRouteBatchInputSchema)({
        batchIndex: 0,
        releaseId,
        routes: skipped,
      }),
      Schema.decodeUnknownEither(StageRouteBatchRequestSchema)({
        batchIndex: 0,
        operation: "stageRouteBatch",
        releaseId,
        routes: skipped,
      }),
    ]) {
      expect(Either.isLeft(result) ? String(result.left) : "").toContain(
        "Expected contiguous route items bound to the batch release identity."
      );
    }
  });
});
