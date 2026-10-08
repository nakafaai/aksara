import { Buffer } from "node:buffer";
import { verify as verifyBytes } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Result } from "effect";
import { SigningKeyIdSchema } from "#contracts/ids";
import { verifyProtectedContentRuntimeExchange } from "#contracts/runtime/protected/verify";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import {
  compatibleManifest,
  incompatibleManifest,
} from "#contracts/test/runtime/fixture";
import { protectedMismatchCases } from "#contracts/test/runtime/mismatch";
import {
  pinnedArtifactMessage,
  pinnedBundleMessage,
  pinnedFound,
  pinnedPublicKey,
  pinnedRequest,
  protectedExpandedArtifact,
  protectedFound,
  protectedRequest,
  protectedSelector,
  verifyProtectedExchange,
} from "#contracts/test/runtime/protected";

describe("protected content runtime verification", () => {
  it.effect("binds ordered bodies to one frozen snapshot request", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyProtectedExchange({ response: protectedFound })
      ).toEqual(protectedFound);
      expect(
        yield* verifyProtectedExchange({
          rendererManifest: compatibleManifest,
          response: protectedFound,
        })
      ).toEqual(protectedFound);

      const outcomes = yield* Effect.all(
        protectedMismatchCases.map(([, response, request = protectedRequest]) =>
          verifyProtectedExchange({ request, response }).pipe(Effect.result)
        ),
        { concurrency: "unbounded" }
      );
      expect(
        outcomes.map((outcome) =>
          Result.isFailure(outcome) &&
          outcome.failure._tag === "ContentRuntimeMismatchError"
            ? outcome.failure.reason
            : "none"
        )
      ).toEqual(protectedMismatchCases.map(([reason]) => reason));
    })
  );

  it.effect("rejects a response with another selector cardinality", () =>
    Effect.gen(function* () {
      const error = yield* verifyProtectedExchange({
        request: {
          ...protectedRequest,
          selectors: [
            protectedSelector,
            {
              ...protectedSelector,
              artifactHash: `sha256:${"7".repeat(64)}`,
            },
          ],
        },
        response: protectedFound,
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "ContentRuntimeMismatchError",
        reason: "selectorCount",
      });
    })
  );

  it.effect("rejects an incompatible live renderer", () =>
    Effect.gen(function* () {
      const error = yield* verifyProtectedExchange({
        rendererManifest: incompatibleManifest,
        response: protectedFound,
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "ArtifactRendererComponentMissingError",
      });
    })
  );

  it.effect("rejects an artifact absent from its frozen renderer", () =>
    Effect.gen(function* () {
      const error = yield* verifyProtectedExchange({
        rendererManifest: compatibleManifest,
        request: {
          ...protectedRequest,
          selectors: [
            {
              ...protectedSelector,
              artifactHash: protectedExpandedArtifact.artifactHash,
            },
          ],
        },
        response: {
          ...protectedFound,
          items: [
            {
              ...protectedFound.items[0],
              artifact: protectedExpandedArtifact,
            },
          ],
        },
      }).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "ArtifactRendererComponentMissingError",
        componentName: "InlineMath",
      });
    })
  );

  it.effect("preserves request-bound missing and failure responses", () =>
    Effect.gen(function* () {
      const responses = [
        { kind: "missing" },
        { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      ] as const;
      expect(
        yield* Effect.all(
          responses.map((response) => verifyProtectedExchange({ response })),
          { concurrency: "unbounded" }
        )
      ).toEqual(responses);
    })
  );
});

describe("pinned protected runtime exchange bytes", () => {
  const pinnedKeyId = SigningKeyIdSchema.make("test-runtime-key");
  const pinnedResolver = ContentVerificationKeyResolver.of({
    /** Resolves only the fixed key that signed the pinned protected bundle. */
    resolve: (requestedKeyId) =>
      requestedKeyId === pinnedKeyId
        ? Effect.succeed(pinnedPublicKey)
        : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
  });
  it.effect("authenticates pinned ordered bodies under the pinned key", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyProtectedContentRuntimeExchange({
          rendererManifest: pinnedFound.rendererManifest,
          request: pinnedRequest,
          response: pinnedFound,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, pinnedResolver)
        )
      ).toEqual(pinnedFound);
    })
  );

  it.effect("rejects a pinned bundle signature changed by one character", () =>
    Effect.gen(function* () {
      const error = yield* verifyProtectedContentRuntimeExchange({
        rendererManifest: pinnedFound.rendererManifest,
        request: pinnedRequest,
        response: {
          ...pinnedFound,
          bundle: {
            ...pinnedFound.bundle,
            signature:
              "A2im7ZWPnRyjHMr4F3VvnL_3IHSKIG2Zju9i3gGNb6CDqAX61w9ND3omasZQLI8_DxCvwSA3ERE8EsR-5bDcCg",
          },
        },
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, pinnedResolver),
        Effect.flip
      );

      expect(error._tag).toBe("SignatureInvalidError");
    })
  );
  /** Verifies one recorded signature over its exact bytes, then over the same bytes with one changed byte. */
  function verifyRecorded(message: string, signature: string | undefined) {
    return [message, message.replace("nakafa", "makafa")].map(
      (text) =>
        signature !== undefined &&
        verifyBytes(
          null,
          new TextEncoder().encode(text),
          pinnedPublicKey,
          Buffer.from(signature, "base64url")
        )
    );
  }

  it("verifies the pinned artifact and bundle signatures over exact bytes", () => {
    expect(
      verifyRecorded(
        pinnedArtifactMessage,
        pinnedFound.items.at(0)?.artifact.signature
      )
    ).toEqual([true, false]);
    expect(
      verifyRecorded(pinnedBundleMessage, pinnedFound.bundle.signature)
    ).toEqual([true, false]);
  });
});
