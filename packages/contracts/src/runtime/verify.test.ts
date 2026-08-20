import { createHash } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Result } from "effect";
import { SigningKeyIdSchema } from "#contracts/ids";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import { materialGraph } from "#contracts/test/graph";
import { hash, rendererManifest } from "#contracts/test/request";
import {
  compatibleManifest,
  createSignedRuntimeRelease,
  incompatibleManifest,
  release,
  tamperSignature,
} from "#contracts/test/runtime/fixture";
import {
  articleFound,
  articleRequest,
  artifact,
  found,
  rejectExchange,
  verifyExchange,
  verifyExchangeResult,
} from "#contracts/test/runtime/public";

describe("content runtime verification", () => {
  it("binds a found response to its exact request", async () => {
    await expect(verifyExchange({ response: found })).resolves.toEqual(found);
    const responses = [
      {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, artifactLocale: "id" },
        },
        projection: {
          ...found.projection,
          appLocale: "id",
          artifactLocale: "id",
          graph: materialGraph("id", "test", "transport", "test-transport"),
          parentPath: "materi/test",
          publicPath: "materi/test/transport",
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
      responses.map((response) => verifyExchangeResult({ response }))
    );
    expect(
      outcomes.map((outcome) =>
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

  it("accepts compatible live renderer evolution and rejects incompatibility", async () => {
    await expect(
      verifyExchange({
        rendererManifest: compatibleManifest,
        response: found,
      })
    ).resolves.toEqual(found);

    const error = await rejectExchange({
      rendererManifest: incompatibleManifest,
      response: found,
    });
    expect(error).toMatchObject({
      _tag: "ArtifactRendererComponentMissingError",
      componentName: "BlockMath",
    });
  });

  it("executes an older frozen domain subset on a compatible live superset", async () => {
    const domains = rendererManifest.domains.slice(0, -1);
    const historicalContract = {
      base: rendererManifest.base,
      domains,
      publishedDomains: rendererManifest.publishedDomains,
    };
    const historicalRenderer = await Effect.runPromise(
      validateRendererManifestHash({
        ...rendererManifest,
        domains,
        hash: `sha256:${createHash("sha256")
          .update(canonicalizeRendererManifestContract(historicalContract))
          .digest("hex")}`,
      })
    );
    const historicalRelease = await createSignedRuntimeRelease(
      historicalRenderer.hash
    );
    const response = {
      ...found,
      activeManifestHash: historicalRelease.manifestHash,
      activeReleaseId: historicalRelease.manifest.releaseId,
      release: historicalRelease,
      rendererManifest: historicalRenderer,
    };

    await expect(
      verifyExchange({ rendererManifest, response })
    ).resolves.toEqual(response);
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

  it("authenticates the frozen renderer before live compatibility", async () => {
    const tamperedRenderer = { ...rendererManifest, hash };
    const error = await rejectExchange({
      rendererManifest: compatibleManifest,
      response: { ...found, rendererManifest: tamperedRenderer },
    });
    expect(error).toMatchObject({
      _tag: "ReleaseBundleVerificationDecodeError",
    });
  });

  it("preserves request-bound missing and failure responses", async () => {
    const responses = [
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
    ];
    await Promise.all(
      responses.map((response) =>
        expect(verifyExchange({ response })).resolves.toEqual(response)
      )
    );
  });
});
