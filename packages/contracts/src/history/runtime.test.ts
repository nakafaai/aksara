// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import {
  historicalArtifact,
  historicalFound,
  historicalFrozenUnpublishedRenderer,
  historicalItem,
  historicalLiveRenderer,
  historicalMissingRenderer,
  historicalRenderer,
  historicalRequest,
  historicalSelector,
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
  return Effect.flip(verifyHistoricalExchange(input));
}

/** Reads one expected retained mismatch reason from its typed error. */
function mismatchReason(error: Effect.Success<ReturnType<typeof reject>>) {
  if (error._tag !== "StoredProtectedRuntimeMismatchError") {
    return Effect.die(
      new Error(`Expected a retained runtime mismatch, received ${error._tag}.`)
    );
  }
  return Effect.succeed(error.reason);
}

/** Changes retained request facts while preserving the complete fixture. */
function changedRequest(changes: object) {
  return { request: { ...historicalRequest, ...changes } };
}

/** Changes retained response facts while preserving the complete fixture. */
function changedResponse(changes: object) {
  return { response: { ...historicalFound, ...changes } };
}

/** Changes the retained selector while preserving its other identity facts. */
function changedSelector(changes: object) {
  return changedRequest({ selectors: [{ ...historicalSelector, ...changes }] });
}

/** Changes the retained item while preserving its other identity facts. */
function changedItem(changes: object) {
  return changedResponse({ items: [{ ...historicalItem, ...changes }] });
}

/** Names one retained identity mutation and its expected mismatch. */
function mismatchCase(
  input: Parameters<typeof verifyHistoricalExchange>[0],
  reason: string
) {
  return { input, reason };
}

describe("retained protected runtime verification", () => {
  it.effect(
    "authenticates an exact found response and attempt-bound empty outcomes",
    () =>
      Effect.gen(function* () {
        expect(
          historicalLiveRenderer.domains.some(({ name }) => name === "site")
        ).toBe(true);
        expect(historicalLiveRenderer.hash).not.toBe(historicalRenderer.hash);
        expect(yield* verifyHistoricalExchange()).toEqual(historicalFound);
        expect(
          yield* verifyHistoricalExchange({
            response: {
              appLocale: historicalRequest.appLocale,
              attemptId: historicalRequest.attemptId,
              kind: "missing",
            },
          })
        ).toEqual({
          appLocale: historicalRequest.appLocale,
          attemptId: historicalRequest.attemptId,
          kind: "missing",
        });
        expect(
          yield* verifyHistoricalExchange({
            response: {
              appLocale: historicalRequest.appLocale,
              attemptId: historicalRequest.attemptId,
              code: "CONTENT_RUNTIME_UNAUTHORIZED",
              kind: "failure",
            },
          })
        ).toMatchObject({ kind: "failure" });
      })
  );

  it.effect("preserves an assessed-language artifact across app locales", () =>
    Effect.gen(function* () {
      const request = { ...historicalRequest, appLocale: "id" };
      const response = { ...historicalFound, appLocale: "id" };

      expect(yield* verifyHistoricalExchange({ request, response })).toEqual(
        response
      );
    })
  );

  it.effect(
    "rejects unknown request and response fields before authentication",
    () =>
      Effect.gen(function* () {
        const requestError = yield* reject({
          request: { ...historicalRequest, unexpected: true },
        });
        const responseError = yield* reject({
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
      })
  );

  it.effect.each([
    { appLocale: "en", kind: "missing" },
    {
      appLocale: "en",
      code: "CONTENT_RUNTIME_INVALID",
      kind: "failure",
    },
    historicalFound,
  ])("rejects an outcome replayed across attempts", (response) =>
    Effect.gen(function* () {
      const error = yield* reject({
        response: { ...response, attemptId: "another-retained-attempt" },
      });

      expect(error).toMatchObject({
        _tag: "StoredProtectedRuntimeMismatchError",
        reason: "attemptId",
      });
    })
  );

  it.effect.each([
    mismatchCase(
      changedRequest({
        selectors: [
          ...historicalRequest.selectors,
          { ...historicalSelector, artifactHash: otherHash },
        ],
      }),
      "selectorCount"
    ),
    mismatchCase(changedItem({ delivery: "entitled" }), "delivery"),
    mismatchCase(changedRequest({ appLocale: "id" }), "appLocale"),
    mismatchCase(changedSelector({ artifactLocale: "id" }), "artifactLocale"),
    mismatchCase(changedSelector({ artifactHash: otherHash }), "artifactHash"),
    mismatchCase(changedSelector({ contentKey: otherQuestion }), "contentKey"),
    mismatchCase(
      changedItem({
        sourcePath:
          "packages/corpus/question-bank/tryout/other/question.en.mdx",
      }),
      "sourcePath"
    ),
    mismatchCase(changedResponse({ snapshotId: otherHash }), "snapshotId"),
    mismatchCase(
      {
        ...changedRequest({ snapshotId: otherHash }),
        ...changedResponse({ snapshotId: otherHash }),
      },
      "snapshotId"
    ),
    mismatchCase(
      changedResponse({ snapshotReleaseId: "other-release" }),
      "snapshotReleaseId"
    ),
    mismatchCase(
      {
        ...changedRequest({ snapshotReleaseId: "other-release" }),
        ...changedResponse({ snapshotReleaseId: "other-release" }),
      },
      "snapshotReleaseId"
    ),
    mismatchCase(
      changedResponse({ snapshotManifestHash: otherHash }),
      "snapshotManifestHash"
    ),
    mismatchCase(
      changedResponse({
        rendererManifest: historicalFrozenUnpublishedRenderer,
      }),
      "rendererManifest"
    ),
  ])(
    "binds retained request and response identity: $reason",
    ({ input, reason }) =>
      Effect.gen(function* () {
        const error = yield* reject(input);
        expect(yield* mismatchReason(error)).toBe(reason);
      })
  );

  it.effect(
    "requires the live renderer to execute every retained component",
    () =>
      Effect.gen(function* () {
        const [unpublished, missing, unsupported] = yield* Effect.all([
          reject({ rendererManifest: historicalUnpublishedRenderer }),
          reject({ rendererManifest: historicalMissingRenderer }),
          reject({ rendererManifest: historicalUnsupportedRenderer }),
        ]);

        expect(unpublished._tag).toBe("StoredRendererDomainUnpublishedError");
        expect(missing._tag).toBe("StoredRendererComponentMissingError");
        expect(unsupported._tag).toBe("StoredRendererVersionUnsupportedError");
      })
  );

  it.effect(
    "rejects a historical domain subset presented as the live renderer",
    () =>
      Effect.gen(function* () {
        const error = yield* reject({
          rendererManifest: historicalSubsetRenderer,
        });
        expect(error).toMatchObject({
          _tag: "ContractDecodeError",
          contract: "LiveRendererManifestDomains",
        });
      })
  );

  it.effect("rejects an altered retained artifact before delivery", () =>
    Effect.gen(function* () {
      const error = yield* reject({
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
    })
  );
});
