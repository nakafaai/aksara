import { Schema } from "effect";
import { GitCommitShaSchema, Sha256HashSchema } from "#contracts/ids";
import { PreviewArtifactSchema } from "#contracts/preview/artifact";
import {
  type ArticlePreviewDocument,
  type MaterialPreviewDocument,
  type PagePreviewDocument,
  type PreviewDocument,
  PreviewDocumentSchema,
} from "#contracts/preview/document";
import { PreviewRouteSchema } from "#contracts/preview/target";
import type { ArticleProjection } from "#contracts/projection/article";
import type { MaterialLessonProjection } from "#contracts/projection/material";
import type { PublicPageProjection } from "#contracts/projection/page";
import type { ContentProjection } from "#contracts/projection/spec";

/** Stable protocol implemented by the loopback-only authoring provider. */
export const LOCAL_PREVIEW_FORMAT = "aksara-local-preview";

/** Exact Git evidence printed and served for one participating checkout. */
export const PreviewRepositorySchema = Schema.Struct({
  dirty: Schema.Boolean,
  sha: GitCommitShaSchema,
});
export type PreviewRepository = typeof PreviewRepositorySchema.Type;

/** The one signed artifact that renders a preview document. */
const PreviewArtifactListSchema = Schema.Tuple([PreviewArtifactSchema]);
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

/** Checks one page projection against its selected registry route. */
function matchesPageDocument(
  document: PagePreviewDocument,
  projection: ContentProjection
): projection is PublicPageProjection {
  return (
    projection.kind === "public-page" &&
    projection.contentKey === document.route.contentKey &&
    projection.appLocale === document.route.appLocale &&
    projection.artifactLocale === document.route.artifactLocale &&
    projection.pageKey === document.route.pageKey &&
    projection.publicPath === document.route.publicPath &&
    projection.sourcePath === document.sourcePath
  );
}

/** Checks that the one artifact projects exactly the selected document. */
function hasCoherentReadyArtifacts(input: {
  readonly artifacts: PreviewArtifactList;
  readonly document: PreviewDocument;
}) {
  const [{ projection }] = input.artifacts;
  if (input.document.family === "article") {
    return matchesArticleDocument(input.document, projection);
  }
  if (input.document.family === "material") {
    return matchesMaterialDocument(input.document, projection);
  }
  return matchesPageDocument(input.document, projection);
}

const PreviewBaseSchema = Schema.Struct({
  document: PreviewDocumentSchema,
  format: Schema.Literal(LOCAL_PREVIEW_FORMAT),
  repositories: Schema.Struct({
    aksara: PreviewRepositorySchema,
    nakafa: PreviewRepositorySchema,
  }),
  revision: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
});

/** A changed route is intentionally unavailable while its source compiles. */
export const PreviewPendingSchema = Schema.Struct({
  ...PreviewBaseSchema.fields,
  status: Schema.Literal("pending"),
});

/** Exact bounded artifacts available to the real loopback Nakafa app. */
export const PreviewReadySchema = Schema.Struct({
  ...PreviewBaseSchema.fields,
  artifacts: PreviewArtifactListSchema,
  rendererManifestHash: Sha256HashSchema,
  status: Schema.Literal("ready"),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentReadyArtifacts, {
      message:
        "Expected preview artifacts to match the selected document exactly.",
    })
  )
);

/** Sanitized compile failure that forbids fallback to an older route body. */
export const PreviewFailedSchema = Schema.Struct({
  ...PreviewBaseSchema.fields,
  failure: Schema.Struct({
    code: Schema.String.pipe(
      Schema.check(Schema.isMinLength(1)),
      Schema.check(Schema.isMaxLength(128))
    ),
    message: Schema.String.pipe(
      Schema.check(Schema.isMinLength(1)),
      Schema.check(Schema.isMaxLength(512))
    ),
  }),
  status: Schema.Literal("failed"),
});

/** Complete current local source state returned by the manifest endpoint. */
export const LocalPreviewManifestSchema = Schema.Union([
  PreviewPendingSchema,
  PreviewReadySchema,
  PreviewFailedSchema,
]);
export type LocalPreviewManifest = typeof LocalPreviewManifestSchema.Type;

/** Minimal SSE signal carrying only the derived route and manifest revision. */
export const PreviewEventSchema = Schema.Struct({
  format: Schema.Literal(LOCAL_PREVIEW_FORMAT),
  revision: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  route: PreviewRouteSchema,
  status: Schema.Literals(["pending", "ready", "failed"]),
});
export type PreviewEvent = typeof PreviewEventSchema.Type;
