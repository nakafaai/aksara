import { Schema } from "effect";
import { GitCommitShaSchema, Sha256HashSchema } from "#contracts/ids";
import type { ArtifactLocale } from "#contracts/locale";
import {
  type ArticlePreviewDocument,
  type MaterialPreviewDocument,
  type PreviewDocument,
  PreviewDocumentSchema,
} from "#contracts/preview/document";
import { PreviewRouteSchema } from "#contracts/preview/target";
import type { ArticleProjection } from "#contracts/projection/article";
import type { MaterialLessonProjection } from "#contracts/projection/material";
import type { QuestionBodyProjection } from "#contracts/projection/question";
import {
  type ContentProjection,
  ContentProjectionSchema,
} from "#contracts/projection/spec";
import type {
  QuestionAnswerIdentity,
  QuestionBodyIdentity,
} from "#contracts/question/identity";

/** Stable protocol implemented by the loopback-only authoring provider. */
export const LOCAL_PREVIEW_FORMAT = "aksara-local-preview";
export const LOCAL_PREVIEW_ARTIFACT_PREFIX = "/v1/artifacts/";

/** Builds the one content-addressed path owned by the preview protocol. */
export function localPreviewArtifactPath(artifactHash: string) {
  return `${LOCAL_PREVIEW_ARTIFACT_PREFIX}${encodeURIComponent(artifactHash)}`;
}

/** Exact Git evidence printed and served for one participating checkout. */
export const PreviewRepositorySchema = Schema.Struct({
  dirty: Schema.Boolean,
  sha: GitCommitShaSchema,
});
export type PreviewRepository = typeof PreviewRepositorySchema.Type;

/** Ensures one artifact endpoint is addressed only by its signed hash. */
function hasCoherentArtifactPath(input: {
  readonly artifactHash: string;
  readonly artifactPath: string;
}) {
  return input.artifactPath === localPreviewArtifactPath(input.artifactHash);
}

/** One signed artifact reference and its exact renderer projection. */
export const PreviewArtifactSchema = Schema.Struct({
  artifactHash: Sha256HashSchema,
  artifactPath: Schema.NonEmptyTrimmedString,
  projection: ContentProjectionSchema,
}).pipe(
  Schema.filter(hasCoherentArtifactPath, {
    message: () => "Expected the artifact path to match its signed hash.",
  })
);
export type PreviewArtifact = typeof PreviewArtifactSchema.Type;

const PreviewArtifactListSchema = Schema.NonEmptyArray(
  PreviewArtifactSchema
).pipe(
  Schema.filter((artifacts) => artifacts.length <= 2, {
    message: () => "Expected at most two preview artifacts.",
  })
);
type PreviewArtifactList = typeof PreviewArtifactListSchema.Type;

/** Checks one article projection against its selected registry route. */
function matchesArticleDocument(
  document: ArticlePreviewDocument,
  projection: ContentProjection
): projection is ArticleProjection {
  return (
    projection.kind === "article" &&
    projection.articleSlug === document.route.articleSlug &&
    projection.category === document.route.category &&
    projection.contentKey === document.route.contentKey &&
    projection.appLocale === document.route.appLocale &&
    projection.artifactLocale === document.route.artifactLocale &&
    projection.publicPath === document.route.publicPath
  );
}

/** Checks one material projection against its selected registry route. */
function matchesMaterialDocument(
  document: MaterialPreviewDocument,
  projection: ContentProjection
): projection is MaterialLessonProjection {
  return (
    projection.kind === "subject-lesson" &&
    projection.contentKey === document.route.contentKey &&
    projection.appLocale === document.route.appLocale &&
    projection.artifactLocale === document.route.artifactLocale &&
    projection.materialKey === document.route.materialKey &&
    projection.order === document.route.order &&
    projection.publicPath === document.route.publicPath &&
    projection.sectionKey === document.route.sectionKey &&
    projection.topicTitle === document.route.topicTitle
  );
}

/** Checks one question projection against an exact prompt or answer identity. */
function matchesQuestionIdentity(
  projection: ContentProjection,
  identity: QuestionBodyIdentity
): projection is QuestionBodyProjection {
  return (
    projection.kind === "question-body" &&
    projection.bodyKind === identity.bodyKind &&
    projection.contentKey === identity.contentKey &&
    projection.artifactLocale === identity.artifactLocale &&
    projection.peerContentKey === identity.peerContentKey &&
    projection.questionKey === identity.questionKey &&
    projection.questionNumber === identity.questionNumber &&
    projection.setKey === identity.setKey
  );
}

/** Checks the ordered prompt required before one entitled answer artifact. */
function matchesAnswerPrompt(
  projection: ContentProjection,
  input: {
    readonly identity: QuestionAnswerIdentity;
    readonly questionArtifactLocale: ArtifactLocale;
  }
) {
  const { identity } = input;
  return (
    projection.kind === "question-body" &&
    projection.bodyKind === "question" &&
    projection.contentKey === identity.peerContentKey &&
    projection.artifactLocale === input.questionArtifactLocale &&
    projection.peerContentKey === identity.contentKey &&
    projection.questionKey === identity.questionKey &&
    projection.questionNumber === identity.questionNumber &&
    projection.setKey === identity.setKey
  );
}

/** Checks family-specific artifact count, order, identity, and projection kind. */
function hasCoherentReadyArtifacts(input: {
  readonly artifacts: PreviewArtifactList;
  readonly document: PreviewDocument;
}) {
  const first = input.artifacts[0].projection;
  if (input.document.family === "article") {
    return (
      input.artifacts.length === 1 &&
      matchesArticleDocument(input.document, first)
    );
  }
  if (input.document.family === "material") {
    return (
      input.artifacts.length === 1 &&
      matchesMaterialDocument(input.document, first)
    );
  }
  if (input.document.identity.bodyKind === "question") {
    return (
      input.artifacts.length === 1 &&
      matchesQuestionIdentity(first, input.document.identity)
    );
  }
  const second = input.artifacts[1]?.projection;
  return (
    input.artifacts.length === 2 &&
    matchesAnswerPrompt(first, {
      identity: input.document.identity,
      questionArtifactLocale:
        input.document.target.placement.questionArtifactLocale,
    }) &&
    second !== undefined &&
    matchesQuestionIdentity(second, input.document.identity)
  );
}

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

/** Exact bounded artifacts available to the real loopback Nakafa app. */
export const PreviewReadySchema = Schema.extend(
  PreviewBaseSchema,
  Schema.Struct({
    artifacts: PreviewArtifactListSchema,
    rendererManifestHash: Sha256HashSchema,
    status: Schema.Literal("ready"),
  })
).pipe(
  Schema.filter(hasCoherentReadyArtifacts, {
    message: () =>
      "Expected preview artifacts to match the selected document exactly.",
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

/** Minimal SSE signal carrying only the derived route and manifest revision. */
export const PreviewEventSchema = Schema.Struct({
  format: Schema.Literal(LOCAL_PREVIEW_FORMAT),
  revision: Schema.Number.pipe(Schema.int(), Schema.positive()),
  route: PreviewRouteSchema,
  status: Schema.Literal("pending", "ready", "failed"),
});
export type PreviewEvent = typeof PreviewEventSchema.Type;
