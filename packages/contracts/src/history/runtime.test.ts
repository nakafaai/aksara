// @vitest-environment node

import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import {
  historicalArtifact,
  historicalFound,
  historicalItem,
  historicalMissingRenderer,
  historicalRelease,
  historicalRenderer,
  historicalRequest,
  historicalSelector,
  historicalSnapshotId,
  historicalSubsetRenderer,
  historicalUnpublishedRenderer,
  historicalUnsupportedRenderer,
  verifyHistoricalExchange,
} from "#contracts/test/history-runtime";

const otherHash = HistoricalSha256HashSchema.make(`sha256:${"f".repeat(64)}`);
const otherQuestion =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-2/question";

/** Returns one expected retained exchange failure without a FiberFailure wrapper. */
function reject(input: Parameters<typeof verifyHistoricalExchange>[0]) {
  return Effect.runPromise(Effect.flip(verifyHistoricalExchange(input)));
}

/** Reads one expected retained mismatch reason from its typed error. */
function mismatchReason(error: Awaited<ReturnType<typeof reject>>) {
  if (error._tag !== "StoredProtectedRuntimeMismatchError") {
    throw new Error(
      `Expected a retained runtime mismatch, received ${error._tag}.`
    );
  }
  return error.reason;
}

describe("retained protected runtime verification", () => {
  it("authenticates an exact found response and attempt-bound empty outcomes", async () => {
    await expect(
      Effect.runPromise(verifyHistoricalExchange())
    ).resolves.toEqual(historicalFound);
    await expect(
      Effect.runPromise(
        verifyHistoricalExchange({
          response: {
            appLocale: historicalRequest.appLocale,
            attemptId: historicalRequest.attemptId,
            kind: "missing",
          },
        })
      )
    ).resolves.toEqual({
      appLocale: historicalRequest.appLocale,
      attemptId: historicalRequest.attemptId,
      kind: "missing",
    });
    await expect(
      Effect.runPromise(
        verifyHistoricalExchange({
          response: {
            appLocale: historicalRequest.appLocale,
            attemptId: historicalRequest.attemptId,
            code: "CONTENT_RUNTIME_UNAUTHORIZED",
            kind: "failure",
          },
        })
      )
    ).resolves.toMatchObject({ kind: "failure" });
  });

  it("preserves an assessed-language artifact across app locales", async () => {
    const request = { ...historicalRequest, appLocale: "id" };
    const response = { ...historicalFound, appLocale: "id" };

    await expect(
      Effect.runPromise(verifyHistoricalExchange({ request, response }))
    ).resolves.toEqual(response);
  });

  it("rejects unknown request and response fields before authentication", async () => {
    const requestError = await reject({
      request: { ...historicalRequest, unexpected: true },
    });
    const responseError = await reject({
      response: { ...historicalFound, unexpected: true },
    });

    expect(requestError).toMatchObject({
      _tag: "StoredProtectedRuntimeDecodeError",
      subject: "request",
    });
    expect(responseError).toMatchObject({
      _tag: "StoredProtectedRuntimeDecodeError",
      subject: "response",
    });
    expect(requestError.message).toBe(
      "Stored protected runtime request is invalid."
    );
    expect(responseError.message).toBe(
      "Stored protected runtime response is invalid."
    );
  });

  it.each([
    { appLocale: "en", kind: "missing" },
    {
      appLocale: "en",
      code: "CONTENT_RUNTIME_INVALID",
      kind: "failure",
    },
    historicalFound,
  ])("rejects an outcome replayed across attempts", async (response) => {
    const error = await reject({
      response: { ...response, attemptId: "another-retained-attempt" },
    });

    expect(error).toMatchObject({
      _tag: "StoredProtectedRuntimeMismatchError",
      reason: "attemptId",
    });
  });

  it("binds selector count and every ordered item identity", async () => {
    const selectorCount = await reject({
      request: {
        ...historicalRequest,
        selectors: [
          ...historicalRequest.selectors,
          {
            artifactHash: otherHash,
            artifactLocale: historicalSelector.artifactLocale,
            contentKey: otherQuestion,
            delivery: "authenticated",
          },
        ],
      },
    });
    const delivery = await reject({
      response: {
        ...historicalFound,
        items: [{ ...historicalItem, delivery: "entitled" }],
      },
    });
    const appLocale = await reject({
      request: { ...historicalRequest, appLocale: "id" },
    });
    const artifactLocale = await reject({
      request: {
        ...historicalRequest,
        selectors: [{ ...historicalSelector, artifactLocale: "id" }],
      },
    });
    const artifactHash = await reject({
      request: {
        ...historicalRequest,
        selectors: [{ ...historicalSelector, artifactHash: otherHash }],
      },
    });
    const contentKey = await reject({
      request: {
        ...historicalRequest,
        selectors: [{ ...historicalSelector, contentKey: otherQuestion }],
      },
    });
    const sourcePath = await reject({
      response: {
        ...historicalFound,
        items: [
          {
            ...historicalItem,
            sourcePath:
              "packages/corpus/question-bank/tryout/other/question.en.mdx",
          },
        ],
      },
    });

    expect(
      [
        selectorCount,
        delivery,
        appLocale,
        artifactLocale,
        artifactHash,
        contentKey,
        sourcePath,
      ].map(mismatchReason)
    ).toEqual([
      "selectorCount",
      "delivery",
      "appLocale",
      "artifactLocale",
      "artifactHash",
      "contentKey",
      "sourcePath",
    ]);
  });

  it("binds snapshot and renderer facts to the authenticated old release", async () => {
    const snapshotId = await reject({
      response: { ...historicalFound, snapshotId: otherHash },
    });
    const releaseSnapshot = await reject({
      request: { ...historicalRequest, snapshotId: otherHash },
      response: { ...historicalFound, snapshotId: otherHash },
    });
    const snapshotReleaseId = await reject({
      response: { ...historicalFound, snapshotReleaseId: "other-release" },
    });
    const releaseId = await reject({
      request: { ...historicalRequest, snapshotReleaseId: "other-release" },
      response: { ...historicalFound, snapshotReleaseId: "other-release" },
    });
    const manifestHash = await reject({
      response: { ...historicalFound, snapshotManifestHash: otherHash },
    });
    const renderer = await reject({
      response: {
        ...historicalFound,
        rendererManifest: historicalUnpublishedRenderer,
      },
    });

    expect(
      [
        snapshotId,
        releaseSnapshot,
        snapshotReleaseId,
        releaseId,
        manifestHash,
        renderer,
      ].map(mismatchReason)
    ).toEqual([
      "snapshotId",
      "snapshotId",
      "snapshotReleaseId",
      "snapshotReleaseId",
      "snapshotManifestHash",
      "rendererManifest",
    ]);
  });

  it("requires the live renderer to execute every retained component", async () => {
    const unpublished = await reject({
      rendererManifest: historicalUnpublishedRenderer,
    });
    const missing = await reject({
      rendererManifest: historicalMissingRenderer,
    });
    const unsupported = await reject({
      rendererManifest: historicalUnsupportedRenderer,
    });

    expect(unpublished._tag).toBe("StoredRendererDomainUnpublishedError");
    expect(missing._tag).toBe("StoredRendererComponentMissingError");
    expect(unsupported._tag).toBe("StoredRendererVersionUnsupportedError");
  });

  it("rejects a historical domain subset presented as the live renderer", async () => {
    const error = await reject({ rendererManifest: historicalSubsetRenderer });
    expect(error).toMatchObject({
      _tag: "ContractDecodeError",
      contract: "LiveRendererManifestDomains",
    });
  });

  it("rejects an altered retained artifact before delivery", async () => {
    const error = await reject({
      response: {
        ...historicalFound,
        items: [
          {
            ...historicalItem,
            artifact: {
              ...historicalArtifact,
              payload: {
                ...historicalArtifact.payload,
                rawMdx: "altered retained bytes",
              },
            },
          },
        ],
      },
    });

    expect(error._tag).toBe("StoredArtifactHashMismatchError");
  });

  it("keeps fixture identities aligned with the signed retained release", () => {
    expect(historicalRelease.manifest.snapshots.tryout.resultSnapshotId).toBe(
      historicalSnapshotId
    );
    expect(historicalRelease.manifest.rendererManifestHash).toBe(
      historicalRenderer.hash
    );
  });
});
