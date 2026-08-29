import { describe, expect, it } from "vitest";
import { LOCAL_PREVIEW_FORMAT } from "#contracts/preview/spec";
import { testPageDocument, testPageProjection } from "#contracts/test/preview";
import {
  previewArtifact,
  previewRepositories,
  rejectsPreviewManifest,
} from "#contracts/test/preview-manifest";

describe("Page preview rollout", () => {
  it("rejects predecessor Page metadata from local preview", () => {
    const artifact = previewArtifact(testPageProjection, "1");
    const manifest = {
      artifacts: [
        {
          ...artifact,
          projection: {
            ...testPageProjection,
            metadata: {
              description: testPageProjection.metadata.description,
              lastModified: testPageProjection.metadata.datePublished,
              title: testPageProjection.metadata.title,
            },
          },
        },
      ],
      document: testPageDocument,
      format: LOCAL_PREVIEW_FORMAT,
      rendererManifestHash: `sha256:${"8".repeat(64)}`,
      repositories: previewRepositories,
      revision: 1,
      status: "ready",
    };

    expect(rejectsPreviewManifest(manifest)).toBe(true);
  });
});
