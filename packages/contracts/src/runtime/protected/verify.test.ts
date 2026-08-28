import { describe, expect, it } from "@effect/vitest";
import { Effect, Result } from "effect";
import {
  compatibleManifest,
  incompatibleManifest,
} from "#contracts/test/runtime/fixture";
import { protectedMismatchCases } from "#contracts/test/runtime/mismatch";
import {
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
