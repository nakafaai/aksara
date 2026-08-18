import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import { selectArticle, selectMaterial } from "#corpus/preview/public";
import { selectQuestion } from "#corpus/preview/question";
import { PreviewSelectionError } from "#corpus/preview/source";

const ARTICLE_ROOT = "packages/corpus/articles/";
const MATERIAL_ROOT = "packages/corpus/material/";
const QUESTION_ROOT = "packages/corpus/question-bank/";

/** Resolves one requested corpus path without cross-family or filesystem fallback. */
export const selectPreviewDocument = Effect.fn(
  "AksaraCorpus.selectPreviewDocument"
)(function* (corpusRoot: string, requestedPath: string, appLocale?: AppLocale) {
  const sourcePath = yield* Schema.decodeUnknown(CorpusSourcePathSchema)(
    requestedPath
  ).pipe(
    Effect.mapError(
      () =>
        new PreviewSelectionError({
          reason: "path",
          sourcePath: requestedPath,
        })
    )
  );
  if (sourcePath.startsWith(ARTICLE_ROOT)) {
    const article = yield* selectArticle(corpusRoot, sourcePath);
    if (
      appLocale !== undefined &&
      article.document.route.appLocale !== appLocale
    ) {
      return yield* new PreviewSelectionError({
        reason: "locale",
        sourcePath,
      });
    }
    return article;
  }
  if (sourcePath.startsWith(MATERIAL_ROOT)) {
    const material = yield* selectMaterial(corpusRoot, sourcePath);
    if (
      appLocale !== undefined &&
      material.document.route.appLocale !== appLocale
    ) {
      return yield* new PreviewSelectionError({
        reason: "locale",
        sourcePath,
      });
    }
    return material;
  }
  if (sourcePath.startsWith(QUESTION_ROOT)) {
    return yield* selectQuestion(corpusRoot, sourcePath, appLocale);
  }
  return yield* new PreviewSelectionError({
    reason: "missing",
    sourcePath,
  });
});
