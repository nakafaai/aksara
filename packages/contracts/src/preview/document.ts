import { Schema } from "effect";
import { CorpusSourcePathSchema } from "#contracts/ids";
import {
  PreviewRouteSchema,
  previewTryoutRoute,
  type TryoutPreviewTarget,
  TryoutPreviewTargetSchema,
} from "#contracts/preview/target";
import { ArticleRouteSchema } from "#contracts/projection/article";
import { MaterialLessonRouteSchema } from "#contracts/projection/material";
import { PublicPageRouteSchema } from "#contracts/projection/page";
import {
  QuestionAnswerIdentitySchema,
  type QuestionBodyIdentity,
  QuestionPromptIdentitySchema,
} from "#contracts/question/identity";
import { RendererDomainSchema } from "#contracts/renderer/domain";

/** One exact public article body selected from its reviewed registry. */
export const ArticlePreviewDocumentSchema = Schema.Struct({
  delivery: Schema.Literal("public"),
  family: Schema.Literal("article"),
  rendererDomain: RendererDomainSchema,
  route: ArticleRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type ArticlePreviewDocument = typeof ArticlePreviewDocumentSchema.Type;

/** One exact public material body selected from its reviewed registry. */
export const MaterialPreviewDocumentSchema = Schema.Struct({
  delivery: Schema.Literal("public"),
  family: Schema.Literal("material"),
  rendererDomain: RendererDomainSchema,
  route: MaterialLessonRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type MaterialPreviewDocument = typeof MaterialPreviewDocumentSchema.Type;

/** One exact public site page selected from its reviewed registry. */
export const PagePreviewDocumentSchema = Schema.Struct({
  delivery: Schema.Literal("public"),
  family: Schema.Literal("page"),
  rendererDomain: Schema.Literal("site"),
  route: PublicPageRouteSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type PagePreviewDocument = typeof PagePreviewDocumentSchema.Type;

interface QuestionPreviewDocumentInput {
  readonly identity: QuestionBodyIdentity;
  readonly rendererDomain: typeof RendererDomainSchema.Type;
  readonly sourcePath: typeof CorpusSourcePathSchema.Type;
  readonly target: TryoutPreviewTarget;
}

/** Checks one question body against its active placement and physical source. */
function hasCoherentQuestionDocument(input: QuestionPreviewDocumentInput) {
  const { identity, target } = input;
  const contentKeysMatch =
    identity.bodyKind === "question"
      ? identity.contentKey === target.placement.questionContentKey &&
        identity.peerContentKey === target.placement.answerContentKey
      : identity.contentKey === target.placement.answerContentKey &&
        identity.peerContentKey === target.placement.questionContentKey;
  return (
    contentKeysMatch &&
    identity.artifactLocale ===
      (identity.bodyKind === "question"
        ? target.placement.questionArtifactLocale
        : target.placement.answerArtifactLocale) &&
    identity.questionNumber === target.placement.questionOrder &&
    input.rendererDomain === target.placement.rendererDomain &&
    input.sourcePath ===
      `${target.placement.questionSourcePath}/${identity.bodyKind}.${identity.artifactLocale}.mdx`
  );
}

/** One authenticated question prompt selected for its real try-out page. */
export const QuestionPromptPreviewDocumentSchema = Schema.Struct({
  delivery: Schema.Literal("authenticated"),
  family: Schema.Literal("question"),
  identity: QuestionPromptIdentitySchema,
  rendererDomain: RendererDomainSchema,
  sourcePath: CorpusSourcePathSchema,
  target: TryoutPreviewTargetSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentQuestionDocument, {
      message:
        "Expected question prompt identity, placement, and source to agree.",
    })
  )
);
export type QuestionPromptPreviewDocument =
  typeof QuestionPromptPreviewDocumentSchema.Type;

/** One entitled answer selected for review on its real try-out page. */
export const QuestionAnswerPreviewDocumentSchema = Schema.Struct({
  delivery: Schema.Literal("entitled"),
  family: Schema.Literal("question"),
  identity: QuestionAnswerIdentitySchema,
  rendererDomain: RendererDomainSchema,
  sourcePath: CorpusSourcePathSchema,
  target: TryoutPreviewTargetSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentQuestionDocument, {
      message:
        "Expected question answer identity, placement, and source to agree.",
    })
  )
);
export type QuestionAnswerPreviewDocument =
  typeof QuestionAnswerPreviewDocumentSchema.Type;

/** Complete discriminated document vocabulary supported by preview. */
export const PreviewDocumentSchema = Schema.Union([
  ArticlePreviewDocumentSchema,
  MaterialPreviewDocumentSchema,
  PagePreviewDocumentSchema,
  QuestionPromptPreviewDocumentSchema,
  QuestionAnswerPreviewDocumentSchema,
]);
export type PreviewDocument = typeof PreviewDocumentSchema.Type;

/** Derives the one existing Nakafa route that renders a preview document. */
export function previewDocumentRoute(document: PreviewDocument) {
  if (document.family === "question") {
    return previewTryoutRoute(document.target);
  }

  return PreviewRouteSchema.make({
    appLocale: document.route.appLocale,
    publicPath: document.route.publicPath,
  });
}
