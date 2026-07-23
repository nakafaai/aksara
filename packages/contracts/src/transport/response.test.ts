import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { hash as manifestHash, releaseId } from "#contracts/test/request";
import { evidence, receipt, successes } from "#contracts/test/response";
import {
  decodePublicationResponse,
  PublicationResponseSchema,
} from "#contracts/transport/response";

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
        operation: "activate",
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
    const error = await Effect.runPromise(
      decodePublicationResponse({ ...successes[0], extra: true }).pipe(
        Effect.flip
      )
    );
    expect(error._tag).toBe("ContractDecodeError");
  });
  it("rejects the removed finalization response", async () => {
    const obsoleteResponse = {
      ok: true,
      operation: "finalize",
      releaseId,
      value: { done: true, nextIndex: 0, processed: 1, receipt },
    };
    expect(accepts(obsoleteResponse)).toBe(false);
    const error = await Effect.runPromise(
      decodePublicationResponse(obsoleteResponse).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ContractDecodeError");
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
