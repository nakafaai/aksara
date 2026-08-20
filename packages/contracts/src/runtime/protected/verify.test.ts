import { Result } from "effect";
import { describe, expect, it } from "vitest";
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
  rejectProtectedExchange,
  verifyProtectedExchange,
  verifyProtectedExchangeResult,
} from "#contracts/test/runtime/protected";

describe("protected content runtime verification", () => {
  it("binds ordered bodies to one frozen snapshot request", async () => {
    await expect(
      verifyProtectedExchange({ response: protectedFound })
    ).resolves.toEqual(protectedFound);
    await expect(
      verifyProtectedExchange({
        rendererManifest: compatibleManifest,
        response: protectedFound,
      })
    ).resolves.toEqual(protectedFound);

    const outcomes = await Promise.all(
      protectedMismatchCases.map(([, response, request = protectedRequest]) =>
        verifyProtectedExchangeResult({ request, response })
      )
    );
    expect(
      outcomes.map((outcome) =>
        Result.isFailure(outcome) &&
        outcome.failure._tag === "ContentRuntimeMismatchError"
          ? outcome.failure.reason
          : "none"
      )
    ).toEqual(protectedMismatchCases.map(([reason]) => reason));
  });

  it("rejects a response with another selector cardinality", async () => {
    const error = await rejectProtectedExchange({
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
    });
    expect(error).toMatchObject({
      _tag: "ContentRuntimeMismatchError",
      reason: "selectorCount",
    });
  });

  it("rejects an incompatible live renderer", async () => {
    const error = await rejectProtectedExchange({
      rendererManifest: incompatibleManifest,
      response: protectedFound,
    });
    expect(error).toMatchObject({
      _tag: "ArtifactRendererComponentMissingError",
    });
  });

  it("rejects an artifact absent from its frozen renderer", async () => {
    const error = await rejectProtectedExchange({
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
    });
    expect(error).toMatchObject({
      _tag: "ArtifactRendererComponentMissingError",
      componentName: "InlineMath",
    });
  });

  it("preserves request-bound missing and failure responses", async () => {
    const responses = [
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
    ] as const;
    await Promise.all(
      responses.map((response) =>
        expect(verifyProtectedExchange({ response })).resolves.toEqual(response)
      )
    );
  });
});
