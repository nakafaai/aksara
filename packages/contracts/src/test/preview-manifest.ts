import { Exit, Schema } from "effect";

import type { ArticlePreviewDocument } from "#contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  LocalPreviewManifestSchema,
  type PreviewArtifact,
  PreviewRepositorySchema,
} from "#contracts/preview/spec";

export const previewRepositories = {
  aksara: Schema.decodeSync(PreviewRepositorySchema)({
    dirty: true,
    sha: "a".repeat(40),
  }),
  nakafa: Schema.decodeSync(PreviewRepositorySchema)({
    dirty: false,
    sha: "b".repeat(40),
  }),
};

/** Builds one content-addressed artifact reference for a test projection. */
export function previewArtifact(
  projection: PreviewArtifact["projection"],
  hashCharacter: string
) {
  const artifactHash = `sha256:${hashCharacter.repeat(64)}` as const;
  return {
    artifactHash,
    artifactPath: `/v1/artifacts/${encodeURIComponent(artifactHash)}`,
    projection,
  };
}

/** Builds the state shared by every exact manifest variant in this test. */
export function previewManifestBase(document: ArticlePreviewDocument) {
  return {
    document,
    format: LOCAL_PREVIEW_FORMAT,
    repositories: previewRepositories,
  };
}

/** Reports whether strict manifest decoding rejects one candidate. */
export function rejectsPreviewManifest(candidate: unknown) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(LocalPreviewManifestSchema, {
      onExcessProperty: "error",
    })(candidate)
  );
}
