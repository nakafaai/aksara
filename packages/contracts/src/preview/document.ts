import { Schema } from "effect";
import { CorpusSourcePathSchema } from "#contracts/ids";
import { PreviewRouteSchema } from "#contracts/preview/target";
import { ArticleRouteSchema } from "#contracts/projection/article";
import { MaterialLessonRouteSchema } from "#contracts/projection/material";
import { PublicPageRouteSchema } from "#contracts/projection/page";
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

/** Complete discriminated document vocabulary supported by preview. */
export const PreviewDocumentSchema = Schema.Union([
  ArticlePreviewDocumentSchema,
  MaterialPreviewDocumentSchema,
  PagePreviewDocumentSchema,
]);
export type PreviewDocument = typeof PreviewDocumentSchema.Type;

/** Derives the one existing Nakafa route that renders a preview document. */
export function previewDocumentRoute(document: PreviewDocument) {
  return PreviewRouteSchema.make({
    appLocale: document.route.appLocale,
    publicPath: document.route.publicPath,
  });
}
