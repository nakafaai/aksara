import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
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
)(function* (corpusRoot: string, requestedPath: string) {
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
    return yield* selectArticle(corpusRoot, sourcePath);
  }
  if (sourcePath.startsWith(MATERIAL_ROOT)) {
    return yield* selectMaterial(corpusRoot, sourcePath);
  }
  if (sourcePath.startsWith(QUESTION_ROOT)) {
    return yield* selectQuestion(corpusRoot, sourcePath);
  }
  return yield* new PreviewSelectionError({
    reason: "missing",
    sourcePath,
  });
});
