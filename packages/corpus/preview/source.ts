import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import type {
  ArticlePreviewDocument,
  MaterialPreviewDocument,
  QuestionAnswerPreviewDocument,
  QuestionPromptPreviewDocument,
} from "@nakafa/aksara-contracts/preview/document";
import { Schema } from "effect";
import type { ArticleEntry } from "#corpus/articles/registry";
import type { MaterialEntry } from "#corpus/material/registry";
import type { QuestionEntry } from "#corpus/question-bank/content";

/** One selected file whose change either reloads or restarts preview safely. */
export interface PreviewDependency {
  readonly mode: "reload" | "restart";
  readonly sourcePath: CorpusSourcePath;
}

/** One exact source directory whose authored file set must remain unchanged. */
export interface PreviewDirectory {
  readonly files: readonly string[];
  readonly sourcePath: CorpusSourcePath;
}

/** One selected article source owned by the article registry. */
export interface ArticlePreviewSource {
  readonly dependencies: readonly [PreviewDependency, ...PreviewDependency[]];
  readonly directories: readonly [];
  readonly entry: ArticleEntry;
  readonly family: "article";
}

/** One selected material source owned by the material registry. */
export interface MaterialPreviewSource {
  readonly dependencies: readonly [PreviewDependency, ...PreviewDependency[]];
  readonly directories: readonly [];
  readonly entry: MaterialEntry;
  readonly family: "material";
}

/** One selected question body owned by the authored question corpus. */
export interface QuestionPreviewSource {
  readonly appLocale: AppLocale;
  readonly dependencies: readonly [PreviewDependency, ...PreviewDependency[]];
  readonly directories: readonly [PreviewDirectory];
  readonly entry: QuestionEntry;
  readonly family: "question";
}

/** One registry-owned source body supported by trusted preview compilation. */
export type PreviewSource =
  | ArticlePreviewSource
  | MaterialPreviewSource
  | QuestionPreviewSource;

/** Exact registry selection and ordered compilation closure for preview. */
export type PreviewSelection =
  | {
      readonly document: ArticlePreviewDocument;
      readonly sources: readonly [ArticlePreviewSource];
    }
  | {
      readonly document: MaterialPreviewDocument;
      readonly sources: readonly [MaterialPreviewSource];
    }
  | {
      readonly document: QuestionPromptPreviewDocument;
      readonly sources: readonly [QuestionPreviewSource];
    }
  | {
      readonly document: QuestionAnswerPreviewDocument;
      readonly sources: readonly [QuestionPreviewSource, QuestionPreviewSource];
    };

/** One requested preview path cannot resolve to an exact registered document. */
export class PreviewSelectionError extends Schema.TaggedError<PreviewSelectionError>()(
  "PreviewSelectionError",
  {
    reason: Schema.Literals(["locale", "missing", "path"]),
    sourcePath: Schema.String,
  }
) {}
