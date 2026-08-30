import type { CompileDocumentSource } from "@nakafa/aksara-contracts/content";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { readQuestionItem } from "@nakafa/aksara-corpus/question-bank/source";
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
  type InspectedPageDocument,
  loadPageDocument,
  makePageCompileSource,
  makePageProjectionFromSource,
} from "#publisher/page/document";
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

/** Loaded public page source normalized for trusted preview compilation. */
interface LoadedPagePreview {
  readonly body: CompileDocumentSource;
  readonly family: "page";
  readonly source: InspectedPageDocument["source"];
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
  | LoadedPagePreview
  | LoadedQuestionPreview;

/** Reading the current item failed at the trusted preview source seam. */
export class PreviewItemSourceError extends Schema.TaggedError<PreviewItemSourceError>()(
  "PreviewItemSourceError",
  {
    cause: Schema.Unknown,
    checkoutRoot: Schema.String,
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Reads one item source once for every selected preview closure. */
const loadQuestionItem = Effect.fn("AksaraPublisher.loadPreviewItem")(
  function* (
    checkoutRoot: string,
    selected: Extract<PreviewSource, { readonly family: "question" }>,
    itemsByRoot: Map<QuestionSourceRoot, QuestionItem>
  ) {
    const { entry } = selected;
    const { sourceRoot } = entry;
    const cached = itemsByRoot.get(sourceRoot);
    if (cached !== undefined) {
      return cached;
    }
    const item = yield* readQuestionItem(checkoutRoot, entry).pipe(
      Effect.mapError(
        (cause) =>
          new PreviewItemSourceError({
            cause,
            checkoutRoot,
            sourcePath: CorpusSourcePathSchema.make(`${sourceRoot}/item.ts`),
          })
      )
    );
    itemsByRoot.set(sourceRoot, item);
    return item;
  }
);

/** Loads one registry source through its family adapter and shared item. */
const loadSelectedSource = Effect.fn("AksaraPublisher.loadSelectedSource")(
  function* (
    checkoutRoot: string,
    selected: PreviewSource,
    itemsByRoot: Map<QuestionSourceRoot, QuestionItem>
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

    if (selected.family === "page") {
      const source = yield* loadPageDocument(checkoutRoot, selected.entry);
      return {
        body: makePageCompileSource(source),
        family: "page",
        source,
      } satisfies LoadedPreviewSource;
    }

    const item = yield* loadQuestionItem(checkoutRoot, selected, itemsByRoot);
    const source = yield* loadQuestionDocument(
      checkoutRoot,
      selected.entry,
      item
    );
    return {
      body: makeQuestionCompileSource(source),
      family: "question",
      source,
    } satisfies LoadedPreviewSource;
  }
);

/** Loads one ordered closure while parsing each shared item file once. */
export const loadPreviewSources = Effect.fn(
  "AksaraPublisher.loadPreviewSources"
)(function* (
  checkoutRoot: string,
  sources: readonly [PreviewSource, ...PreviewSource[]]
) {
  const itemsByRoot = new Map<QuestionSourceRoot, QuestionItem>();
  const [firstSource, ...remainingSources] = sources;
  const first = yield* loadSelectedSource(
    checkoutRoot,
    firstSource,
    itemsByRoot
  );
  const remaining = yield* Effect.forEach(remainingSources, (source) =>
    loadSelectedSource(checkoutRoot, source, itemsByRoot)
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

  if (loaded.family === "page") {
    return makePageProjectionFromSource(loaded.source, metadata);
  }

  return makeQuestionProjectionFromSource(loaded.source, metadata);
}
