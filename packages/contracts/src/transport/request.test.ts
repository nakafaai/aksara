import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { ContentReleaseBundleSchema } from "#contracts/release/lifecycle";
import {
  hash,
  recoveryRelease,
  release,
  releaseId,
  rendererManifest,
  requests,
} from "#contracts/test/request";
import { StageGroupRequestSchema } from "#contracts/transport/group";
import {
  decodePublicationRequest,
  PublicationRequestSchema,
} from "#contracts/transport/request";

/** Strictly tests one request schema without allowing extra properties. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("publication requests", () => {
  it.effect(
    "decodes every exact operation through one discriminated ingress",
    () =>
      Effect.gen(function* () {
        for (const request of requests) {
          expect(accepts(PublicationRequestSchema, request)).toBe(true);
        }
        const stageRelease = requests.find(
          (request) => request.operation === "stageRelease"
        );
        const decoded = yield* decodePublicationRequest(stageRelease);
        expect(decoded.operation).toBe("stageRelease");
      })
  );

  it.effect("rejects excess fields with a typed error", () =>
    Effect.gen(function* () {
      const error = yield* decodePublicationRequest({
        ...requests[4],
        unexpected: true,
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");
    })
  );

  it.effect("rejects the removed finalization operation", () =>
    Effect.gen(function* () {
      const error = yield* decodePublicationRequest({
        afterIndex: -1,
        operation: "finalize",
        release,
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");
    })
  );

  it("requires distinct active and recovery identities for acceptance", () => {
    expect(
      accepts(PublicationRequestSchema, {
        operation: "accept",
        recoveryId: releaseId,
        releaseId,
      })
    ).toBe(false);
  });

  it("confines rollback projection staging to authenticated groups", () => {
    const current = requests.find(
      (request) => request.operation === "stageProjectionBatch"
    );
    expect(current?.operation).toBe("stageProjectionBatch");
    if (current?.operation !== "stageProjectionBatch") {
      return;
    }
    const rollback = {
      ...current,
      operation: "stageRollbackProjectionBatch",
    };
    expect(accepts(PublicationRequestSchema, rollback)).toBe(false);
    expect(
      accepts(StageGroupRequestSchema, {
        operation: "stageGroup",
        releaseId,
        requests: [rollback],
      })
    ).toBe(true);
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

  it.effect("binds the frozen renderer envelope to the signed manifest", () =>
    Effect.gen(function* () {
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
      const inputError = Schema.decodeExit(ContentReleaseBundleSchema)({
        release: mismatchedRelease,
        rendererManifest,
      });
      expect(Exit.isFailure(inputError)).toBe(true);
      if (Exit.isFailure(inputError)) {
        expect(String(inputError.cause)).toContain(
          "Expected the signed release to bind the frozen renderer envelope."
        );
      }
      const error = yield* decodePublicationRequest({
        operation: "stageRelease",
        release: mismatchedRelease,
        rendererManifest,
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");
    })
  );
});
