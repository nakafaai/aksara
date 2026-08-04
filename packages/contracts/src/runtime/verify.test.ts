import { Either } from "effect";
import { describe, expect, it } from "vitest";
import { SigningKeyIdSchema } from "#contracts/ids";
import { materialGraph } from "#contracts/test/graph";
import { hash, rendererManifest } from "#contracts/test/request";
import { protectedMismatchCases } from "#contracts/test/runtime/mismatch";
import {
  articleFound,
  articleRequest,
  artifact,
  compatibleManifest,
  found,
  incompatibleManifest,
  protectedExpandedArtifact,
  protectedFound,
  protectedRequest,
  rejectExchange,
  release,
  tamperSignature,
  verifyExchange,
  verifyExchangeEither,
} from "#contracts/test/runtime/spec";

describe("content runtime verification", () => {
  it("binds a found response to its exact request", async () => {
    await expect(verifyExchange({ response: found })).resolves.toEqual(found);
    const responses = [
      {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, locale: "id" },
        },
        projection: {
          ...found.projection,
          graph: materialGraph("id", "test", "transport", "test-transport"),
          locale: "id",
        },
      },
      {
        ...found,
        projection: {
          ...found.projection,
          publicPath: "subjects/test/other",
        },
      },
      {
        ...found,
        sourcePath: "packages/corpus/article/test/other/en.mdx",
      },
      {
        ...found,
        sourcePath: "packages/corpus/material/lesson/test/transport/id.mdx",
      },
      { ...found, activeReleaseId: "test-other-release" },
      { ...found, activeManifestHash: hash },
      { ...found, projectionHash: hash },
    ];
    const outcomes = await Promise.all(
      responses.map((response) => verifyExchangeEither({ response }))
    );
    expect(
      outcomes.map((outcome) =>
        Either.isLeft(outcome) &&
        outcome.left._tag === "ContentRuntimeMismatchError"
          ? outcome.left.reason
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
    await expect(
      rejectExchange({ response: protectedFound })
    ).resolves.toMatchObject({
      _tag: "ContentRuntimeMismatchError",
      reason: "delivery",
    });
    await expect(
      rejectExchange({ request: protectedRequest, response: found })
    ).resolves.toMatchObject({
      _tag: "ContentRuntimeMismatchError",
      reason: "delivery",
    });
  });

  it("binds an article response to its pair-grouped physical source", async () => {
    await expect(
      verifyExchange({ request: articleRequest, response: articleFound })
    ).resolves.toEqual(articleFound);

    const invalidSources = [
      "packages/corpus/articles/politics/dynastic-politics-asian-values/en.mdx",
      "packages/corpus/articles/politics/dynastic-politics/asian-values/id.mdx",
      "packages/corpus/articles/politics/flawed-legal/geopolitics/en.mdx",
      "packages/corpus/material/lesson/politics/dynastic-politics-asian-values/en.mdx",
    ];
    const outcomes = await Promise.all(
      invalidSources.map((sourcePath) =>
        rejectExchange({
          request: articleRequest,
          response: { ...articleFound, sourcePath },
        })
      )
    );

    expect(outcomes).toEqual(
      invalidSources.map(() =>
        expect.objectContaining({
          _tag: "ContentRuntimeMismatchError",
          reason: "sourcePath",
        })
      )
    );
  });

  it("binds a protected body to its frozen snapshot selector", async () => {
    await expect(
      verifyExchange({ request: protectedRequest, response: protectedFound })
    ).resolves.toEqual(protectedFound);
    await expect(
      verifyExchange({
        rendererManifest: compatibleManifest,
        request: protectedRequest,
        response: protectedFound,
      })
    ).resolves.toEqual(protectedFound);

    const outcomes = await Promise.all(
      protectedMismatchCases.map(([, response, request = protectedRequest]) =>
        rejectExchange({ request, response })
      )
    );
    expect(outcomes).toEqual(
      protectedMismatchCases.map(([reason]) =>
        expect.objectContaining({
          _tag: "ContentRuntimeMismatchError",
          reason,
        })
      )
    );
  });

  it("rejects a tampered runtime artifact", async () => {
    const tamperedArtifact = {
      ...artifact,
      signature: tamperSignature(artifact.signature),
    };
    const error = await rejectExchange({
      response: { ...found, artifact: tamperedArtifact },
    });
    expect(error).toMatchObject({ _tag: "SignatureInvalidError" });
  });

  it("rejects an artifact signed by an unavailable key", async () => {
    const error = await rejectExchange({
      response: {
        ...found,
        artifact: {
          ...artifact,
          keyId: SigningKeyIdSchema.make("test-runtime-unknown"),
        },
      },
    });
    expect(error).toMatchObject({ _tag: "SigningKeyNotFoundError" });
  });

  it("rejects a tampered active release", async () => {
    expect(tamperSignature("A")).toBe("B");
    expect(tamperSignature("B")).toBe("A");
    const tamperedRelease = {
      ...release,
      signature: tamperSignature(release.signature),
    };
    const error = await rejectExchange({
      response: { ...found, release: tamperedRelease },
    });
    expect(error).toMatchObject({ _tag: "SignatureInvalidError" });
  });

  it("requires an exact live renderer for public content", async () => {
    const error = await rejectExchange({
      rendererManifest: compatibleManifest,
      response: found,
    });
    expect(error).toMatchObject({
      _tag: "ContentRuntimeMismatchError",
      reason: "rendererManifest",
    });
  });

  it("rejects an incompatible live renderer for protected content", async () => {
    const error = await rejectExchange({
      rendererManifest: incompatibleManifest,
      request: protectedRequest,
      response: protectedFound,
    });
    expect(error).toMatchObject({
      _tag: "ArtifactRendererComponentMissingError",
    });
  });

  it("rejects a protected artifact absent from its frozen renderer", async () => {
    const error = await rejectExchange({
      rendererManifest: compatibleManifest,
      request: {
        ...protectedRequest,
        artifactHash: protectedExpandedArtifact.artifactHash,
      },
      response: {
        ...protectedFound,
        artifact: protectedExpandedArtifact,
      },
    });
    expect(error).toMatchObject({
      _tag: "ArtifactRendererComponentMissingError",
      componentName: "InlineMath",
    });
  });

  it("rejects a tampered frozen renderer envelope", async () => {
    const tamperedRenderer = { ...rendererManifest, hash };
    const error = await rejectExchange({
      response: { ...found, rendererManifest: tamperedRenderer },
    });
    expect(error).toMatchObject({
      _tag: "ReleaseBundleVerificationDecodeError",
    });
  });

  it("preserves request-bound missing and failure responses", async () => {
    const responses = [
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_FORBIDDEN", kind: "failure" },
    ];
    await Promise.all(
      responses.map((response) =>
        expect(verifyExchange({ response })).resolves.toEqual(response)
      )
    );
  });
});
