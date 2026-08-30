import { Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import { ContentProjectionSchema } from "#contracts/projection/spec";

export const LOCAL_PREVIEW_ARTIFACT_PREFIX = "/v1/artifacts/";

/** Builds the one content-addressed path owned by the preview protocol. */
export function localPreviewArtifactPath(artifactHash: string) {
  return `${LOCAL_PREVIEW_ARTIFACT_PREFIX}${encodeURIComponent(artifactHash)}`;
}

/** Ensures one artifact endpoint is addressed only by its signed hash. */
function hasCoherentArtifactPath(input: {
  readonly artifactHash: string;
  readonly artifactPath: string;
}) {
  return input.artifactPath === localPreviewArtifactPath(input.artifactHash);
}

/** One signed artifact reference and its exact current renderer projection. */
export const PreviewArtifactSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  artifactPath: Schema.Trimmed.check(Schema.isNonEmpty()),
  projection: ContentProjectionSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentArtifactPath, {
      message: "Expected the artifact path to match its signed hash.",
    })
  )
);
export type PreviewArtifact = typeof PreviewArtifactSchema.Type;
