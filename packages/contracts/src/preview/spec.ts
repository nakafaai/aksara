import { Schema } from "effect";
import { ContentDeliveryClassSchema } from "#contracts/delivery";
import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  MaterialLessonProjectionSchema,
  MaterialLessonRouteSchema,
} from "#contracts/projection/material";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** Stable protocol implemented by the loopback-only authoring provider. */
export const LOCAL_PREVIEW_FORMAT = "aksara-local-preview-v1";

/** Exact Git evidence printed and served for one participating checkout. */
export const PreviewRepositorySchema = Schema.Struct({
  dirty: Schema.Boolean,
  sha: GitCommitShaSchema,
});
export type PreviewRepository = typeof PreviewRepositorySchema.Type;

/** One registry-owned document selected for local compilation. */
export const PreviewDocumentSchema = Schema.Struct({
  delivery: ContentDeliveryClassSchema,
  rendererDomain: RendererDomainSchema,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type PreviewDocument = typeof PreviewDocumentSchema.Type;

const PreviewBaseSchema = Schema.Struct({
  document: PreviewDocumentSchema,
  format: Schema.Literal(LOCAL_PREVIEW_FORMAT),
  repositories: Schema.Struct({
    aksara: PreviewRepositorySchema,
    nakafa: PreviewRepositorySchema,
  }),
  revision: Schema.Number.pipe(Schema.int(), Schema.positive()),
});

/** A changed route is intentionally unavailable while its source compiles. */
export const PreviewPendingSchema = Schema.extend(
  PreviewBaseSchema,
  Schema.Struct({ status: Schema.Literal("pending") })
);

/** Ensures a ready manifest addresses only its own content-addressed artifact. */
function hasCoherentArtifactPath(input: {
  readonly artifactHash: string;
  readonly artifactPath: string;
}) {
  return (
    input.artifactPath ===
    `/v1/artifacts/${encodeURIComponent(input.artifactHash)}`
  );
}

/** Exact signed artifact and projection available to the real Nakafa app. */
export const PreviewReadySchema = Schema.extend(
  PreviewBaseSchema,
  Schema.Struct({
    artifactHash: Sha256HashSchema,
    artifactPath: Schema.NonEmptyTrimmedString,
    projection: MaterialLessonProjectionSchema,
    rendererManifestHash: Sha256HashSchema,
    status: Schema.Literal("ready"),
  })
).pipe(
  Schema.filter(hasCoherentArtifactPath, {
    message: () => "Expected the artifact path to match its signed hash.",
  })
);

/** Sanitized compile failure that forbids fallback to an older route body. */
export const PreviewFailedSchema = Schema.extend(
  PreviewBaseSchema,
  Schema.Struct({
    failure: Schema.Struct({
      code: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(128)),
      message: Schema.String.pipe(Schema.minLength(1), Schema.maxLength(512)),
    }),
    status: Schema.Literal("failed"),
  })
);

/** Complete current local source state returned by the manifest endpoint. */
export const LocalPreviewManifestSchema = Schema.Union(
  PreviewPendingSchema,
  PreviewReadySchema,
  PreviewFailedSchema
);
export type LocalPreviewManifest = typeof LocalPreviewManifestSchema.Type;

/** Minimal SSE signal telling Nakafa to refetch the authenticated manifest. */
export const PreviewEventSchema = Schema.Struct({
  format: Schema.Literal(LOCAL_PREVIEW_FORMAT),
  revision: Schema.Number.pipe(Schema.int(), Schema.positive()),
  status: Schema.Literal("pending", "ready", "failed"),
});
export type PreviewEvent = typeof PreviewEventSchema.Type;
