import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { verifyProtectedContentRuntimeExchange } from "#contracts/runtime/predecessor/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { rendererManifest } from "#contracts/test/request";
import {
  compatibleManifest,
  protectedSnapshotId,
  release,
  trustedResolver,
} from "#contracts/test/runtime/fixture";
import {
  protectedAnswerContentKey,
  protectedAnswerSelector,
  protectedArtifact,
  protectedContentKey,
} from "#contracts/test/runtime/protected";

const otherHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
const otherReleaseId = ReleaseIdSchema.make("other-release");

const selector = {
  artifactHash: protectedArtifact.artifactHash,
  contentKey: protectedContentKey,
  delivery: "authenticated",
} as const;
const request = {
  appLocale: "en",
  selectors: [selector],
  snapshotId: protectedSnapshotId,
  snapshotReleaseId: release.manifest.releaseId,
} as const;
const response = {
  items: [
    {
      artifact: protectedArtifact,
      delivery: "authenticated",
      sourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/question-bank/tryout/test/runtime/protected/set-1/question-1/question.en.mdx"
      ),
    },
  ],
  kind: "found",
  release,
  rendererManifest,
  snapshotId: protectedSnapshotId,
  snapshotManifestHash: release.manifestHash,
  snapshotReleaseId: release.manifest.releaseId,
} as const;

/** Runs one predecessor exchange with its exact technical trust root. */
function verify(input: {
  readonly request?: unknown;
  readonly response: unknown;
}) {
  return verifyProtectedContentRuntimeExchange({
    rendererManifest,
    request: input.request ?? request,
    response: input.response,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}

describe("predecessor protected runtime verification", () => {
  it.effect("authenticates the deployed release-shaped response", () =>
    Effect.gen(function* () {
      expect(yield* verify({ response })).toEqual(response);
      expect(
        yield* verifyProtectedContentRuntimeExchange({
          rendererManifest: compatibleManifest,
          request,
          response,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
        )
      ).toEqual(response);
      expect(yield* verify({ response: { kind: "missing" } })).toEqual({
        kind: "missing",
      });
    })
  );

  it.effect("rejects selector and release identity mismatches", () =>
    Effect.gen(function* () {
      const failures = [
        [
          "selectorCount",
          verify({
            request: {
              ...request,
              selectors: [selector, protectedAnswerSelector],
            },
            response,
          }),
        ],
        [
          "snapshotManifestHash",
          verify({
            response: { ...response, snapshotManifestHash: otherHash },
          }),
        ],
        [
          "delivery",
          verify({
            response: {
              ...response,
              items: [{ ...response.items[0], delivery: "entitled" }],
            },
          }),
        ],
        [
          "artifactHash",
          verify({
            request: {
              ...request,
              selectors: [{ ...selector, artifactHash: otherHash }],
            },
            response,
          }),
        ],
        [
          "contentKey",
          verify({
            request: {
              ...request,
              selectors: [
                {
                  ...selector,
                  contentKey: protectedAnswerContentKey,
                  delivery: "entitled",
                },
              ],
            },
            response: {
              ...response,
              items: [{ ...response.items[0], delivery: "entitled" }],
            },
          }),
        ],
        [
          "sourcePath",
          verify({
            response: {
              ...response,
              items: [
                {
                  ...response.items[0],
                  sourcePath: CorpusSourcePathSchema.make(
                    "packages/corpus/question/wrong.en.mdx"
                  ),
                },
              ],
            },
          }),
        ],
        [
          "snapshotId",
          verify({ request: { ...request, snapshotId: otherHash }, response }),
        ],
        [
          "snapshotId",
          verify({
            request: { ...request, snapshotId: otherHash },
            response: { ...response, snapshotId: otherHash },
          }),
        ],
        [
          "snapshotReleaseId",
          verify({
            request: { ...request, snapshotReleaseId: otherReleaseId },
            response,
          }),
        ],
        [
          "snapshotReleaseId",
          verify({
            request: { ...request, snapshotReleaseId: otherReleaseId },
            response: { ...response, snapshotReleaseId: otherReleaseId },
          }),
        ],
      ] as const;
      for (const [reason, failure] of failures) {
        expect(yield* failure.pipe(Effect.flip)).toMatchObject({
          _tag: "PredecessorRuntimeMismatchError",
          reason,
        });
      }
    })
  );
});
