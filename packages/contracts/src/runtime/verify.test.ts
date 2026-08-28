import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Result } from "effect";
import { SigningKeyIdSchema } from "#contracts/ids";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
import {
  verifyContentRuntimeEvidenceExchange,
  verifyContentRuntimeExchange,
} from "#contracts/runtime/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { materialGraph } from "#contracts/test/graph";
import { hash, rendererManifest } from "#contracts/test/request";
import {
  compatibleManifest,
  createSignedRuntimeRelease,
  incompatibleManifest,
  release,
  tamperSignature,
  trustedResolver,
} from "#contracts/test/runtime/fixture";
import {
  articleFound,
  articleRequest,
  artifact,
  found,
  pageFound,
  pageRequest,
  request,
} from "#contracts/test/runtime/public";

interface RuntimeExchangeInput {
  readonly rendererManifest?: unknown;
  readonly request?: unknown;
  readonly response: unknown;
}
/** Supplies the trusted fixture resolver to one runtime verification effect. */
const provideFixtureKey = Effect.provideService(
  ContentVerificationKeyResolver,
  trustedResolver
);

/** Verifies one runtime exchange with the fixture key and default request. */
const verifyRuntimeExchange = Effect.fn(
  "AksaraContracts.test.verifyRuntimeExchange"
)(function* (input: RuntimeExchangeInput) {
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
      const outcomes = yield* Effect.all(
        responses.map((response) =>
          verifyRuntimeExchange({ response }).pipe(Effect.result)
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
      const cases = [
        {
          invalidSources: [
            "packages/corpus/articles/politics/dynastic-politics-asian-values/en.mdx",
            "packages/corpus/articles/politics/dynastic-politics/asian-values/id.mdx",
            "packages/corpus/articles/politics/flawed-legal/geopolitics/en.mdx",
            "packages/corpus/material/lesson/politics/dynastic-politics-asian-values/en.mdx",
          ],
          request: articleRequest,
          response: articleFound,
        },
        {
          invalidSources: [
            "packages/corpus/pages/terms/id.mdx",
            "packages/corpus/pages/legal/terms/en.mdx",
            "packages/corpus/pages/terms.old/en.mdx",
            "packages/corpus/pages/privacy-policy/en.mdx",
            "packages/corpus/articles/terms/en.mdx",
          ],
          request: pageRequest,
          response: pageFound,
        },
      ];
      for (const sourceCase of cases) {
        expect(
          yield* verifyRuntimeExchange({
            request: sourceCase.request,
            response: sourceCase.response,
          })
        ).toEqual(sourceCase.response);
        const outcomes = yield* Effect.all(
          sourceCase.invalidSources.map((sourcePath) =>
            verifyRuntimeExchange({
              request: sourceCase.request,
              response: { ...sourceCase.response, sourcePath },
            }).pipe(Effect.flip)
          ),
          { concurrency: "unbounded" }
        );
        expect(outcomes).toEqual(
          sourceCase.invalidSources.map(() =>
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
      const responses = [
        {
          ...found,
          artifact: {
            ...artifact,
            signature: tamperSignature(artifact.signature),
          },
        },
        {
          ...found,
          artifact: {
            ...artifact,
            keyId: SigningKeyIdSchema.make("test-runtime-unknown"),
          },
        },
        {
          ...found,
          release: {
            ...release,
            signature: tamperSignature(release.signature),
          },
        },
      ];
      const errors = yield* Effect.all(
        responses.map((response) =>
          verifyRuntimeExchange({ response }).pipe(Effect.flip)
        ),
        { concurrency: "unbounded" }
      );
      expect(errors.map(({ _tag }) => _tag)).toEqual([
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
  it.effect(
    "executes an older frozen domain subset on a compatible live superset",
    () =>
      Effect.gen(function* () {
        const domains = rendererManifest.domains.slice(0, -1);
        const historicalContract = {
          base: rendererManifest.base,
          domains,
          publishedDomains: rendererManifest.publishedDomains,
        };
        const historicalRenderer = yield* validateRendererManifestHash({
          ...rendererManifest,
          domains,
          hash: `sha256:${createHash("sha256")
            .update(canonicalizeRendererManifestContract(historicalContract))
            .digest("hex")}`,
        });
        const historicalRelease = yield* Effect.promise(() =>
          createSignedRuntimeRelease(historicalRenderer.hash)
        );
        const response = {
          ...found,
          activeManifestHash: historicalRelease.manifestHash,
          activeReleaseId: historicalRelease.manifest.releaseId,
          release: historicalRelease,
          rendererManifest: historicalRenderer,
        };

        expect(
          yield* verifyRuntimeExchange({ rendererManifest, response })
        ).toEqual(response);
        expect(
          yield* verifyContentRuntimeEvidenceExchange({
            request,
            response,
          }).pipe(provideFixtureKey)
        ).toEqual(response);
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
      expect(errors.map(({ _tag }) => _tag)).toEqual([
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
      const verified = yield* Effect.all(
        responses.map((response) => verifyRuntimeExchange({ response })),
        { concurrency: "unbounded" }
      );
      expect(verified).toEqual(responses);
    })
  );
});
