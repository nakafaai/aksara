import { expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  localPreviewArtifactPath,
  PreviewArtifactSchema,
} from "#contracts/preview/artifact";
import { projection } from "#contracts/test/request";

it("accepts an artifact only at the path of its signed hash", () => {
  const artifactHash = `sha256:${"1".repeat(64)}`;
  const decode = Schema.decodeUnknownExit(PreviewArtifactSchema);

  expect(
    Exit.isSuccess(
      decode({
        artifactHash,
        artifactPath: localPreviewArtifactPath(artifactHash),
        projection,
      })
    )
  ).toBe(true);
  expect(
    Exit.isFailure(
      decode({
        artifactHash,
        artifactPath: localPreviewArtifactPath(`sha256:${"2".repeat(64)}`),
        projection,
      })
    )
  ).toBe(true);
});

it("pins the content-addressed preview artifact path", () => {
  expect(
    localPreviewArtifactPath(
      "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    )
  ).toBe(
    "/artifacts/sha256%3A0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  );
});
