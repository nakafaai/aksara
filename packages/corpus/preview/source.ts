import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ArticlePreviewDocumentSchema,
  MaterialPreviewDocumentSchema,
  PagePreviewDocumentSchema,
} from "@nakafa/aksara-contracts/preview/document";
import { Schema } from "effect";
import { ArticleEntrySchema } from "#corpus/articles/registry";
import { MaterialEntrySchema } from "#corpus/material/registry";
import { PageEntrySchema } from "#corpus/pages/registry";

/** One selected file whose change either reloads or restarts preview safely. */
const PreviewDependencySchema = Schema.Struct({
  mode: Schema.Literals(["reload", "restart"]),
  sourcePath: CorpusSourcePathSchema,
});
export type PreviewDependency = typeof PreviewDependencySchema.Type;

/** Builds the Schema of one selected source of a family. */
function previewSourceSchema<Entry extends Schema.Top, Family extends string>(
  family: Family,
  entry: Entry
) {
  return Schema.Struct({
    dependencies: Schema.NonEmptyArray(PreviewDependencySchema),
    entry,
    family: Schema.Literal(family),
  });
}
/** One selected article source owned by the article registry. */
const ArticlePreviewSourceSchema = previewSourceSchema(
  "article",
  ArticleEntrySchema
);
/** One selected material source owned by the material registry. */
const MaterialPreviewSourceSchema = previewSourceSchema(
  "material",
  MaterialEntrySchema
);
/** One selected public page source owned by the page registry. */
const PagePreviewSourceSchema = previewSourceSchema("page", PageEntrySchema);
/** One registry-owned source body supported by trusted preview compilation. */
export const PreviewSourceSchema = Schema.Union([
  ArticlePreviewSourceSchema,
  MaterialPreviewSourceSchema,
  PagePreviewSourceSchema,
]);
export type PreviewSource = typeof PreviewSourceSchema.Type;

/** Exact registry selection and the one source that compiles it for preview. */
export const PreviewSelectionSchema = Schema.Union([
  Schema.Struct({
    document: ArticlePreviewDocumentSchema,
    source: ArticlePreviewSourceSchema,
  }),
  Schema.Struct({
    document: MaterialPreviewDocumentSchema,
    source: MaterialPreviewSourceSchema,
  }),
  Schema.Struct({
    document: PagePreviewDocumentSchema,
    source: PagePreviewSourceSchema,
  }),
]);
export type PreviewSelection = typeof PreviewSelectionSchema.Type;

/** One requested preview path cannot resolve to an exact registered document. */
export class PreviewSelectionError extends Schema.TaggedError<
  PreviewSelectionError,
  { readonly brand: unique symbol }
>()("PreviewSelectionError", {
  reason: Schema.Literals(["locale", "missing", "path"]),
  sourcePath: Schema.String,
}) {}
