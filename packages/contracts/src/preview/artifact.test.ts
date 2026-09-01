import { expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  localPreviewArtifactPath,
  PreviewArtifactSchema,
} from "#contracts/preview/artifact";
import { testPromptProjection } from "#contracts/test/preview-question";

it("rejects predecessor Question fields from current preview", () => {
  const artifactHash = `sha256:${"1".repeat(64)}`;
  const { response: _response, ...identity } = testPromptProjection;
  const historicalQuestion = {
    ...identity,
    choices: [
      { label: "A", value: true },
      { label: "B", value: false },
    ],
    metadata: {
      authors: testPromptProjection.metadata.authors,
      date: testPromptProjection.metadata.datePublished,
      title: testPromptProjection.metadata.title,
    },
  };

  expect(
    Exit.isFailure(
      Schema.decodeUnknownExit(PreviewArtifactSchema)({
        artifactHash,
        artifactPath: localPreviewArtifactPath(artifactHash),
        projection: historicalQuestion,
      })
    )
  ).toBe(true);
});
