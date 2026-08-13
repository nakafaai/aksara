import type { CompileDocumentSource } from "@nakafa/aksara-contracts/content";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { readQuestionChoices } from "@nakafa/aksara-corpus/question-bank/source";
import { Effect, Schema } from "effect";
import {
  type InspectedArticleDocument,
  loadArticleDocument,
  makeArticleCompileSource,
  makeArticleProjectionFromSource,
} from "#publisher/article/document";
import {
  type InspectedMaterialDocument,
  loadMaterialDocument,
  makeMaterialCompileSource,
  makeMaterialProjection,
} from "#publisher/material/document";
import {
  type InspectedQuestionDocument,
  loadQuestionDocument,
  makeQuestionCompileSource,
  makeQuestionProjectionFromSource,
} from "#publisher/question/document";

type QuestionEntry = Extract<
  PreviewSource,
  { readonly family: "question" }
>["entry"];
type QuestionSourceRoot = QuestionEntry["sourceRoot"];

/** Loaded article source normalized for trusted preview compilation. */
interface LoadedArticlePreview {
  readonly body: CompileDocumentSource;
  readonly family: "article";
  readonly source: InspectedArticleDocument["source"];
}

/** Loaded material source normalized for trusted preview compilation. */
interface LoadedMaterialPreview {
  readonly body: CompileDocumentSource;
  readonly family: "material";
  readonly source: InspectedMaterialDocument["source"];
}

/** Loaded question source normalized for trusted preview compilation. */
interface LoadedQuestionPreview {
  readonly body: CompileDocumentSource;
  readonly family: "question";
  readonly source: InspectedQuestionDocument["source"];
}

/** Complete source vocabulary accepted by incremental preview compilation. */
export type LoadedPreviewSource =
  | LoadedArticlePreview
  | LoadedMaterialPreview
  | LoadedQuestionPreview;

/** Reading current choices failed at the trusted preview source seam. */
export class PreviewChoiceSourceError extends Schema.TaggedError<PreviewChoiceSourceError>()(
  "PreviewChoiceSourceError",
  {
    cause: Schema.Unknown,
    checkoutRoot: Schema.String,
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Reads one choice source once for every selected preview closure. */
const loadQuestionChoices = Effect.fn("AksaraPublisher.loadPreviewChoices")(
  function* (
    checkoutRoot: string,
    entry: QuestionEntry,
    choicesByRoot: Map<QuestionSourceRoot, QuestionChoices>
  ) {
    const { sourceRoot } = entry;
    const cached = choicesByRoot.get(sourceRoot);
    if (cached !== undefined) {
      return cached;
    }
    const choices = yield* readQuestionChoices(checkoutRoot, entry).pipe(
      Effect.mapError(
        (cause) =>
          new PreviewChoiceSourceError({
            cause,
            checkoutRoot,
            sourcePath: CorpusSourcePathSchema.make(`${sourceRoot}/choices.ts`),
          })
      )
    );
    choicesByRoot.set(sourceRoot, choices);
    return choices;
  }
);

/** Loads one registry source through its family adapter and shared choices. */
const loadSelectedSource = Effect.fn("AksaraPublisher.loadSelectedSource")(
  function* (
    checkoutRoot: string,
    selected: PreviewSource,
    choicesByRoot: Map<QuestionSourceRoot, QuestionChoices>
  ) {
    if (selected.family === "article") {
      const source = yield* loadArticleDocument(checkoutRoot, selected.entry);
      return {
        body: makeArticleCompileSource(source),
        family: "article",
        source,
      } satisfies LoadedPreviewSource;
    }

    if (selected.family === "material") {
      const source = yield* loadMaterialDocument(checkoutRoot, selected.entry);
      return {
        body: makeMaterialCompileSource(source),
        family: "material",
        source,
      } satisfies LoadedPreviewSource;
    }

    const choices = yield* loadQuestionChoices(
      checkoutRoot,
      selected.entry,
      choicesByRoot
    );
    const source = yield* loadQuestionDocument(
      checkoutRoot,
      selected.entry,
      choices
    );
    return {
      body: makeQuestionCompileSource(source),
      family: "question",
      source,
    } satisfies LoadedPreviewSource;
  }
);

/** Loads one ordered closure while parsing each shared choices file once. */
export const loadPreviewSources = Effect.fn(
  "AksaraPublisher.loadPreviewSources"
)(function* (
  checkoutRoot: string,
  sources: readonly [PreviewSource, ...PreviewSource[]]
) {
  const choicesByRoot = new Map<QuestionSourceRoot, QuestionChoices>();
  const [firstSource, ...remainingSources] = sources;
  const first = yield* loadSelectedSource(
    checkoutRoot,
    firstSource,
    choicesByRoot
  );
  const remaining = yield* Effect.forEach(remainingSources, (source) =>
    loadSelectedSource(checkoutRoot, source, choicesByRoot)
  );
  return [first, ...remaining] satisfies readonly [
    LoadedPreviewSource,
    ...LoadedPreviewSource[],
  ];
});

/** Derives one family-owned projection from trusted compiler metadata. */
export function projectPreviewSource(
  loaded: LoadedPreviewSource,
  metadata: unknown
) {
  if (loaded.family === "article") {
    return makeArticleProjectionFromSource(loaded.source, metadata);
  }

  if (loaded.family === "material") {
    return makeMaterialProjection(loaded.source, metadata);
  }

  return makeQuestionProjectionFromSource(loaded.source, metadata);
}
