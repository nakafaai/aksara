import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  ArticlePreviewDocumentSchema,
  MaterialPreviewDocumentSchema,
  PagePreviewDocumentSchema,
  QuestionAnswerPreviewDocumentSchema,
  QuestionPromptPreviewDocumentSchema,
} from "@nakafa/aksara-contracts/preview/document";
import { Schema } from "effect";
import { ArticleEntrySchema } from "#corpus/articles/registry";
import { MaterialEntrySchema } from "#corpus/material/registry";
import { PageEntrySchema } from "#corpus/pages/registry";
import { QuestionEntrySchema } from "#corpus/question-bank/content";

/** One selected file whose change either reloads or restarts preview safely. */
const PreviewDependencySchema = Schema.Struct({
  mode: Schema.Literals(["reload", "restart"]),
  sourcePath: CorpusSourcePathSchema,
});
export type PreviewDependency = typeof PreviewDependencySchema.Type;

/** One exact source directory whose authored file set must remain unchanged. */
export const PreviewDirectorySchema = Schema.Struct({
  files: Schema.Array(Schema.String),
  sourcePath: CorpusSourcePathSchema,
});
/** Builds the Schema of one selected source of a family with no directory closure. */
function previewSourceSchema<Entry extends Schema.Top, Family extends string>(
  family: Family,
  entry: Entry
) {
  return Schema.Struct({
    dependencies: Schema.NonEmptyArray(PreviewDependencySchema),
    directories: Schema.Tuple([]),
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
/** One selected question body owned by the authored question corpus. */
const QuestionPreviewSourceSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  dependencies: Schema.NonEmptyArray(PreviewDependencySchema),
  directories: Schema.Tuple([PreviewDirectorySchema]),
  entry: QuestionEntrySchema,
  family: Schema.Literal("question"),
});
export type QuestionPreviewSource = typeof QuestionPreviewSourceSchema.Type;

/** One registry-owned source body supported by trusted preview compilation. */
export const PreviewSourceSchema = Schema.Union([
  ArticlePreviewSourceSchema,
  MaterialPreviewSourceSchema,
  PagePreviewSourceSchema,
  QuestionPreviewSourceSchema,
]);
export type PreviewSource = typeof PreviewSourceSchema.Type;

/** Exact registry selection and ordered compilation closure for preview. */
export const PreviewSelectionSchema = Schema.Union([
  Schema.Struct({
    document: ArticlePreviewDocumentSchema,
    sources: Schema.Tuple([ArticlePreviewSourceSchema]),
  }),
  Schema.Struct({
    document: MaterialPreviewDocumentSchema,
    sources: Schema.Tuple([MaterialPreviewSourceSchema]),
  }),
  Schema.Struct({
    document: PagePreviewDocumentSchema,
    sources: Schema.Tuple([PagePreviewSourceSchema]),
  }),
  Schema.Struct({
    document: QuestionPromptPreviewDocumentSchema,
    sources: Schema.Tuple([QuestionPreviewSourceSchema]),
  }),
  Schema.Struct({
    document: QuestionAnswerPreviewDocumentSchema,
    sources: Schema.Tuple([
      QuestionPreviewSourceSchema,
      QuestionPreviewSourceSchema,
    ]),
  }),
]);
export type PreviewSelection = typeof PreviewSelectionSchema.Type;

/** One requested preview path cannot resolve to an exact registered document. */
export class PreviewSelectionError extends Schema.TaggedError<PreviewSelectionError>()(
  "PreviewSelectionError",
  {
    reason: Schema.Literals(["locale", "missing", "path"]),
    sourcePath: Schema.String,
  }
) {}
