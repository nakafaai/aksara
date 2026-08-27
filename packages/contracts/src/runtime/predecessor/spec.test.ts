import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { CorpusSourcePathSchema } from "#contracts/ids";
import {
  decodeProtectedContentRuntimeRequest,
  decodeProtectedContentRuntimeResponse,
  ProtectedContentRuntimeRequestSchema,
  ProtectedContentRuntimeResponseSchema,
} from "#contracts/runtime/predecessor/spec";
import { rendererManifest } from "#contracts/test/request";
import {
  accepts,
  protectedSnapshotId,
  release,
} from "#contracts/test/runtime/fixture";
import {
  protectedAnswerArtifact,
  protectedAnswerContentKey,
  protectedArtifact,
  protectedContentKey,
} from "#contracts/test/runtime/protected";

const request = {
  appLocale: "en",
  selectors: [
    {
      artifactHash: protectedArtifact.artifactHash,
      contentKey: protectedContentKey,
      delivery: "authenticated",
    },
  ],
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

describe("predecessor protected runtime contract", () => {
  it.effect("preserves the deployed request and response wire shapes", () =>
    Effect.gen(function* () {
      expect(accepts(ProtectedContentRuntimeRequestSchema, request)).toBe(true);
      expect(accepts(ProtectedContentRuntimeResponseSchema, response)).toBe(
        true
      );
      expect(yield* decodeProtectedContentRuntimeRequest(request)).toEqual(
        request
      );
      expect(yield* decodeProtectedContentRuntimeResponse(response)).toEqual(
        response
      );
    })
  );

  it("stays disjoint from the permanent-bundle request", () => {
    expect(
      accepts(ProtectedContentRuntimeRequestSchema, {
        bundleHash: release.manifestHash,
        selectors: request.selectors,
        snapshotId: request.snapshotId,
      })
    ).toBe(false);
  });

  it("enforces predecessor selector identity and delivery", () => {
    const [selector] = request.selectors;
    for (const invalid of [
      { ...selector, contentKey: "question" },
      { ...selector, contentKey: "material/lesson/test/question" },
      { ...selector, delivery: "entitled" },
      {
        artifactHash: protectedAnswerArtifact.artifactHash,
        contentKey: protectedAnswerContentKey,
        delivery: "authenticated",
      },
    ]) {
      expect(
        accepts(ProtectedContentRuntimeRequestSchema, {
          ...request,
          selectors: [invalid],
        })
      ).toBe(false);
    }

    expect(
      accepts(ProtectedContentRuntimeRequestSchema, {
        ...request,
        selectors: [
          {
            artifactHash: protectedAnswerArtifact.artifactHash,
            contentKey: protectedAnswerContentKey,
            delivery: "entitled",
          },
        ],
      })
    ).toBe(true);
  });
});
