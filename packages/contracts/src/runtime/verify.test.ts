import { createHash, verify as verifyBytes } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Result } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract";
import {
  verifyContentRuntimeEvidenceExchange,
  verifyContentRuntimeExchange,
} from "#contracts/runtime/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { hash, rendererManifest } from "#contracts/test/request";
import {
  compatibleManifest,
  createSignedRuntimeRelease,
  incompatibleManifest,
  tamperSignature,
  trustedResolver,
} from "#contracts/test/runtime/fixture";
import {
  found,
  mismatchedFoundResponses,
  pinnedArtifactMessage,
  pinnedPublicKey,
  pinnedReleaseMessage,
  pinnedRequest,
  pinnedResponse,
  request,
  routedSourceCases,
  tamperedFoundResponses,
} from "#contracts/test/runtime/public";

/** Supplies the trusted fixture resolver to one runtime verification effect. */
const provideFixtureKey = Effect.provideService(
  ContentVerificationKeyResolver,
  trustedResolver
);

/** Verifies one runtime exchange with the fixture key and default request. */
const verifyRuntimeExchange = Effect.fn(
  "AksaraContracts.test.verifyRuntimeExchange"
)(function* (input: {
  readonly rendererManifest?: unknown;
  readonly request?: unknown;
  readonly response: unknown;
}) {
  return yield* verifyContentRuntimeExchange({
    rendererManifest: input.rendererManifest ?? rendererManifest,
    request: input.request ?? request,
    response: input.response,
  }).pipe(provideFixtureKey);
});
describe("content runtime verification", () => {
  it.effect("binds a found response to its exact request", () =>
    Effect.gen(function* () {
      expect(yield* verifyRuntimeExchange({ response: found })).toEqual(found);
      expect(
        yield* verifyContentRuntimeEvidenceExchange({
          request,
          response: found,
        }).pipe(provideFixtureKey)
      ).toEqual(found);
      const outcomes = yield* Effect.forEach(
        mismatchedFoundResponses,
        (response) => verifyRuntimeExchange({ response }).pipe(Effect.result),
        { concurrency: "unbounded" }
      );
      expect(
        Arr.map(outcomes, (outcome) =>
          Result.isFailure(outcome) &&
          outcome.failure._tag === "ContentRuntimeMismatchError"
            ? outcome.failure.reason
            : "none"
        )
      ).toEqual([
        "locale",
        "publicPath",
        "sourcePath",
        "sourcePath",
        "activeReleaseId",
        "activeManifestHash",
        "projectionHash",
      ]);
    })
  );
  it.effect("binds routed responses to their physical sources", () =>
    Effect.gen(function* () {
      for (const sourceCase of routedSourceCases) {
        expect(
          yield* verifyRuntimeExchange({
            request: sourceCase.request,
            response: sourceCase.response,
          })
        ).toEqual(sourceCase.response);
        const outcomes = yield* Effect.forEach(
          sourceCase.invalidSources,
          (sourcePath) =>
            verifyRuntimeExchange({
              request: sourceCase.request,
              response: { ...sourceCase.response, sourcePath },
            }).pipe(Effect.flip),
          { concurrency: "unbounded" }
        );
        expect(outcomes).toEqual(
          Arr.map(sourceCase.invalidSources, () =>
            expect.objectContaining({
              _tag: "ContentRuntimeMismatchError",
              reason: "sourcePath",
            })
          )
        );
      }
    })
  );
  it.effect("rejects invalid artifact and release signatures or keys", () =>
    Effect.gen(function* () {
      expect(tamperSignature("A")).toBe("B");
      expect(tamperSignature("B")).toBe("A");
      const errors = yield* Effect.forEach(
        tamperedFoundResponses,
        (response) => verifyRuntimeExchange({ response }).pipe(Effect.flip),
        { concurrency: "unbounded" }
      );
      expect(Arr.map(errors, ({ _tag }) => _tag)).toEqual([
        "SignatureInvalidError",
        "SigningKeyNotFoundError",
        "SignatureInvalidError",
      ]);
    })
  );
  it.effect(
    "accepts compatible live renderer evolution and rejects incompatibility",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyRuntimeExchange({
            rendererManifest: compatibleManifest,
            response: found,
          })
        ).toEqual(found);

        const error = yield* verifyRuntimeExchange({
          rendererManifest: incompatibleManifest,
          response: found,
        }).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "ArtifactRendererComponentMissingError",
          componentName: "BlockMath",
        });
      })
  );
  it.effect("rejects incomplete current domains in signed execution", () =>
    Effect.gen(function* () {
      const incompleteContract = {
        ...rendererManifest,
        domains: Arr.dropRight(rendererManifest.domains, 1),
      };
      const incompleteRenderer = {
        ...incompleteContract,
        hash: Sha256HashSchema.make(
          `sha256:${createHash("sha256")
            .update(canonicalizeRendererManifestContract(incompleteContract))
            .digest("hex")}`
        ),
      };
      const incompleteRelease = yield* Effect.promise(() =>
        createSignedRuntimeRelease(incompleteRenderer.hash)
      );
      const response = {
        ...found,
        activeManifestHash: incompleteRelease.manifestHash,
        activeReleaseId: incompleteRelease.manifest.releaseId,
        release: incompleteRelease,
        rendererManifest: incompleteRenderer,
      };

      expect(
        yield* verifyRuntimeExchange({ rendererManifest, response }).pipe(
          Effect.flip
        )
      ).toMatchObject({ _tag: "ContractDecodeError" });
    })
  );
  it.effect("authenticates the frozen renderer before live compatibility", () =>
    Effect.gen(function* () {
      const tamperedRenderer = { ...rendererManifest, hash };
      const errors = yield* Effect.all(
        [
          verifyRuntimeExchange({
            response: { ...found, rendererManifest: tamperedRenderer },
          }).pipe(Effect.flip),
          verifyRuntimeExchange({
            rendererManifest: compatibleManifest,
            response: { ...found, rendererManifest: tamperedRenderer },
          }).pipe(Effect.flip),
        ],
        { concurrency: "unbounded" }
      );
      expect(Arr.map(errors, ({ _tag }) => _tag)).toEqual([
        "ReleaseBundleVerificationDecodeError",
        "ReleaseBundleVerificationDecodeError",
      ]);
    })
  );
  it.effect("preserves request-bound missing and failure responses", () =>
    Effect.gen(function* () {
      const responses = [
        { kind: "missing" },
        { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      ];
      const verified = yield* Effect.forEach(
        responses,
        (response) => verifyRuntimeExchange({ response }),
        { concurrency: "unbounded" }
      );
      expect(verified).toEqual(responses);
    })
  );
});
describe("pinned public runtime exchange bytes", () => {
  const provideKey = Effect.provideService(
    ContentVerificationKeyResolver,
    ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(pinnedPublicKey),
    })
  );
  it.effect("pins the accepted response under both policies", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyContentRuntimeEvidenceExchange({
          request: pinnedRequest,
          response: pinnedResponse,
        }).pipe(provideKey)
      ).toEqual(pinnedResponse);
      expect(
        yield* verifyContentRuntimeExchange({
          rendererManifest: pinnedResponse.rendererManifest,
          request: pinnedRequest,
          response: pinnedResponse,
        }).pipe(provideKey)
      ).toEqual(pinnedResponse);
    })
  );
  /** Verifies one recorded signature over its exact bytes, then over the same bytes with one changed byte. */
  function verifyRecorded(message: string, signature: string) {
    return Arr.map([message, message.replace("nakafa", "makafa")], (text) =>
      verifyBytes(
        null,
        new TextEncoder().encode(text),
        pinnedPublicKey,
        Buffer.from(signature, "base64url")
      )
    );
  }
  it("verifies the pinned artifact and release signatures over exact bytes", () => {
    expect(
      verifyRecorded(pinnedArtifactMessage, pinnedResponse.artifact.signature)
    ).toEqual([true, false]);
    expect(
      verifyRecorded(pinnedReleaseMessage, pinnedResponse.release.signature)
    ).toEqual([true, false]);
  });
  it.effect("rejects one changed signature or projection hash character", () =>
    Effect.gen(function* () {
      const signatureError = yield* verifyContentRuntimeExchange({
        rendererManifest: pinnedResponse.rendererManifest,
        request: pinnedRequest,
        response: {
          ...pinnedResponse,
          artifact: {
            ...pinnedResponse.artifact,
            signature: tamperSignature(pinnedResponse.artifact.signature),
          },
        },
      }).pipe(provideKey, Effect.flip);
      expect(signatureError._tag).toBe("SignatureInvalidError");

      const hashError = yield* verifyContentRuntimeExchange({
        rendererManifest: pinnedResponse.rendererManifest,
        request: pinnedRequest,
        response: {
          ...pinnedResponse,
          projectionHash:
            "sha256:d1634d167425c61b00afee9690888872fc66b9896f4c82d22c4155145d2c7f30",
        },
      }).pipe(provideKey, Effect.flip);
      expect(hashError).toMatchObject({
        _tag: "ContentRuntimeMismatchError",
        reason: "projectionHash",
      });
    })
  );
});
