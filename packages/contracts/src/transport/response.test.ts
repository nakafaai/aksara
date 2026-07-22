import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import { release, rendererManifest } from "#contracts/test/request";
import {
  decodePublicationResponse,
  PublicationResponseSchema,
} from "#contracts/transport/response";

const releaseId = "test-transport";
const manifestHash = `sha256:${"a".repeat(64)}`;
const projectionDigest = `sha256:${"b".repeat(64)}`;
const rendererManifestHash = `sha256:${"c".repeat(64)}`;
const receipt = {
  activatedHeads: 1,
  deletedHeads: 0,
  manifestHash,
  projectionDigest,
  releaseId,
  resultCount: 1,
  resultDigest: projectionDigest,
  stagedArtifacts: 1,
  stagedItems: 1,
  stagedProjections: 1,
};
const status = { manifestHash, phase: "staging", releaseId };
const evidence = {
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteHeads: 0,
  itemCount: 1,
  itemsDigest: manifestHash,
  manifestHash,
  projectionCount: 1,
  projectionDigest,
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash,
  resultCount: 1,
  resultDigest: projectionDigest,
  rollbackCount: 1,
  rollbackDigest: manifestHash,
  stagedArtifacts: 1,
  upsertHeads: 1,
};

const successes = [
  {
    ok: true,
    operation: "abort",
    value: {
      complete: true,
      processedItems: 2,
      releaseId,
      totalItems: 2,
    },
  },
  {
    ok: true,
    operation: "current",
    value: {
      activeManifestHash: null,
      activeReleaseId: null,
      completed: null,
      pending: { phase: "staging", release, rendererManifest },
    },
  },
  {
    ok: true,
    operation: "headPage",
    value: {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      done: true,
      family: "material",
      heads: [
        {
          artifactHash: manifestHash,
          compilerConfigHash: manifestHash,
          contentKey: "test:transport",
          delivery: "public",
          locale: "en",
          projectionHash: projectionDigest,
          publicPath: "subjects/test/transport",
          rendererDomain: "mathematics",
          sourceHash: manifestHash,
          sourcePath: "packages/corpus/test/transport/en.mdx",
        },
      ],
      nextCursor: null,
    },
  },
  { ok: true, operation: "stageRelease", value: status },
  {
    ok: true,
    operation: "stageItemBatch",
    value: { batchIndex: 0, created: 1, releaseId, unchanged: 0 },
  },
  {
    ok: true,
    operation: "stageProjectionBatch",
    value: { batchIndex: 0, created: 0, releaseId, unchanged: 1 },
  },
  {
    ok: true,
    operation: "stageArtifactBatch",
    value: { batchIndex: 0, created: 1, releaseId, unchanged: 0 },
  },
  { ok: true, operation: "status", value: status },
  { ok: true, operation: "verify", value: evidence },
  { ok: true, operation: "activate", value: receipt },
  {
    ok: true,
    operation: "finalize",
    releaseId,
    value: { done: false, nextIndex: 63, processed: 64 },
  },
  {
    ok: true,
    operation: "finalize",
    releaseId,
    value: { done: true, nextIndex: 63, processed: 0, receipt },
  },
  {
    ok: true,
    operation: "rollbackPage",
    value: {
      done: true,
      nextIndex: -1,
      records: [],
      rollbackOf: releaseId,
      rollbackOfManifestHash: manifestHash,
      total: 0,
    },
  },
  {
    ok: true,
    operation: "cleanup",
    value: {
      complete: true,
      deletedArtifacts: 1,
      deletedItems: 2,
      releaseId,
    },
  },
];

/** Strictly checks one transport response without allowing extra properties. */
function accepts(input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(PublicationResponseSchema)(input, {
      onExcessProperty: "error",
    })
  );
}

describe("publication responses", () => {
  it("decodes every operation-specific success result", async () => {
    for (const response of successes) {
      expect(accepts(response)).toBe(true);
    }
    const decoded = await Effect.runPromise(
      decodePublicationResponse(successes[7])
    );
    expect(decoded.ok).toBe(true);
  });
  it("decodes stable typed failures through the same response contract", () => {
    for (const failure of [
      {
        code: "CONTENT_RELEASE_UNAUTHORIZED",
        kind: "unauthorized",
      },
      {
        code: "CONTENT_RELEASE_STATE",
        kind: "rejected",
        operation: "finalize",
        releaseId,
      },
      {
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: "stageRelease",
        releaseId,
      },
      {
        activeReleaseId: "test-active",
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "activate",
        releaseId,
      },
    ]) {
      expect(accepts({ failure, ok: false })).toBe(true);
    }
  });
  it("rejects operation-result mismatches and extra wire fields", async () => {
    expect(
      accepts({
        ok: true,
        operation: "activate",
        value: {
          batchIndex: 0,
          created: 1,
          releaseId,
          unchanged: 0,
        },
      })
    ).toBe(false);
    const missingStage = Schema.decodeUnknownEither(PublicationResponseSchema)({
      ok: true,
      operation: "stageRelease",
      value: { manifestHash, phase: "missing", releaseId },
    });
    expect(Either.isLeft(missingStage)).toBe(true);
    if (Either.isLeft(missingStage)) {
      expect(String(missingStage.left)).toContain(
        "Expected stageRelease to return a stored release status."
      );
    }
    const mismatchedReceipt = Schema.decodeUnknownEither(
      PublicationResponseSchema
    )({
      ok: true,
      operation: "finalize",
      releaseId,
      value: {
        done: true,
        nextIndex: 0,
        processed: 1,
        receipt: { ...receipt, releaseId: "test-other" },
      },
    });
    expect(Either.isLeft(mismatchedReceipt)).toBe(true);
    if (Either.isLeft(mismatchedReceipt)) {
      expect(String(mismatchedReceipt.left)).toContain(
        "Expected the completed receipt to match the finalized release identity."
      );
    }
    const error = await Effect.runPromise(
      decodePublicationResponse({ ...successes[0], extra: true }).pipe(
        Effect.flip
      )
    );
    expect(error._tag).toBe("ContractDecodeError");
  });
  it("requires bounded integer finalization progress", () => {
    for (const value of [
      { done: false, nextIndex: -2, processed: 1 },
      { done: false, nextIndex: 0, processed: -1 },
      { done: false, nextIndex: 0.5, processed: 1 },
      { done: true, nextIndex: 0, processed: 1 },
      { done: false, nextIndex: 0, processed: 1, receipt },
    ]) {
      expect(
        accepts({
          ok: true,
          operation: "finalize",
          releaseId,
          value,
        })
      ).toBe(false);
    }
  });
  it("rejects verification evidence with contradictory staged counts", () => {
    const invalidHeads = Schema.decodeUnknownEither(PublicationResponseSchema)({
      ok: true,
      operation: "verify",
      value: { ...evidence, deleteHeads: 1 },
    });
    expect(Either.isLeft(invalidHeads)).toBe(true);
    if (Either.isLeft(invalidHeads)) {
      expect(String(invalidHeads.left)).toContain(
        "Expected staged head and artifact counts to match the release items."
      );
    }
    expect(
      accepts({
        ok: true,
        operation: "verify",
        value: { ...evidence, stagedArtifacts: 0 },
      })
    ).toBe(false);
  });
  it("rejects activation receipts with contradictory staged counts", () => {
    const invalid = Schema.decodeUnknownEither(PublicationResponseSchema)({
      ok: true,
      operation: "activate",
      value: { ...receipt, activatedHeads: 0 },
    });
    expect(Either.isLeft(invalid)).toBe(true);
    if (Either.isLeft(invalid)) {
      expect(String(invalid.left)).toContain(
        "Expected activated head and artifact counts to match staged items."
      );
    }
  });
});
