import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Exit, Schema } from "effect";
import { hash as manifestHash, releaseId } from "#contracts/test/request";
import { evidence, receipt, successes } from "#contracts/test/response";
import {
  decodePublicationResponse,
  PublicationResponseSchema,
} from "#contracts/transport/response";

/** Strictly checks one transport response without allowing extra properties. */
function accepts(input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(PublicationResponseSchema)(input, {
      onExcessProperty: "error",
    })
  );
}

describe("publication responses", () => {
  it.effect("decodes every operation-specific success result", () =>
    Effect.gen(function* () {
      for (const response of successes) {
        expect(accepts(response), response.operation).toBe(true);
      }
      const decoded = yield* decodePublicationResponse(
        successes.find(({ operation }) => operation === "stageSnapshot")
      );
      expect(decoded).toMatchObject({ ok: true, operation: "stageSnapshot" });
    })
  );
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
  it.effect("rejects operation-result mismatches and extra wire fields", () =>
    Effect.gen(function* () {
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
      const missingStage = Schema.decodeExit(PublicationResponseSchema)({
        ok: true,
        operation: "stageRelease",
        value: { manifestHash, phase: "missing", releaseId },
      });
      expect(Exit.isFailure(missingStage)).toBe(true);
      if (Exit.isFailure(missingStage)) {
        expect(String(missingStage.cause)).toContain(
          "Expected stageRelease to return a stored release status."
        );
      }
      const error = yield* decodePublicationResponse({
        ...successes[0],
        extra: true,
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");
    })
  );
  it.effect("rejects the removed finalization response", () =>
    Effect.gen(function* () {
      const obsoleteResponse = {
        ok: true,
        operation: "finalize",
        releaseId,
        value: { done: true, nextIndex: 0, processed: 1, receipt },
      };
      expect(accepts(obsoleteResponse)).toBe(false);
      const error = yield* decodePublicationResponse(obsoleteResponse).pipe(
        Effect.flip
      );
      expect(error._tag).toBe("ContractDecodeError");
    })
  );
  it("rejects verification evidence with contradictory staged counts", () => {
    const invalidHeads = Schema.decodeExit(PublicationResponseSchema)({
      ok: true,
      operation: "verify",
      value: {
        evidence: { ...evidence, deleteHeads: 1 },
        phase: "verified",
      },
    });
    expect(Exit.isFailure(invalidHeads)).toBe(true);
    if (Exit.isFailure(invalidHeads)) {
      expect(String(invalidHeads.cause)).toContain(
        "Expected staged head and artifact counts to match the release items."
      );
    }
    expect(
      accepts({
        ok: true,
        operation: "verify",
        value: {
          evidence: { ...evidence, stagedArtifacts: 0 },
          phase: "verified",
        },
      })
    ).toBe(false);
  });
  it("accepts only identity-bound pending verification progress", () => {
    expect(
      accepts({
        ok: true,
        operation: "verify",
        value: { manifestHash, phase: "verifying", releaseId },
      })
    ).toBe(true);
    expect(
      accepts({
        ok: true,
        operation: "verify",
        value: { manifestHash, phase: "verifying" },
      })
    ).toBe(false);
  });
  it("rejects activation receipts with contradictory staged counts", () => {
    const invalid = Schema.decodeUnknownExit(PublicationResponseSchema)({
      ok: true,
      operation: "activate",
      value: { ...receipt, activatedHeads: 0 },
    });
    expect(Exit.isFailure(invalid)).toBe(true);
    if (Exit.isFailure(invalid)) {
      expect(String(invalid.cause)).toContain(
        "Expected activated head and artifact counts to match staged items."
      );
    }
  });
});
