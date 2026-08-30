import { expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  localPreviewArtifactPath,
  PreviewArtifactSchema,
} from "#contracts/preview/artifact";
import { testPageProjection } from "#contracts/test/preview";

it("rejects predecessor Page metadata", () => {
  const artifactHash = `sha256:${"1".repeat(64)}`;
  const historicalPage = {
    ...testPageProjection,
    metadata: {
      description: testPageProjection.metadata.description,
      lastModified: testPageProjection.metadata.datePublished,
      title: testPageProjection.metadata.title,
    },
  };

  expect(
    Exit.isFailure(
      Schema.decodeUnknownExit(PreviewArtifactSchema)({
        artifactHash,
        artifactPath: localPreviewArtifactPath(artifactHash),
        projection: historicalPage,
      })
    )
  ).toBe(true);
});
