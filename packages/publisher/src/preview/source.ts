import type { CompileDocumentSource } from "@nakafa/aksara-contracts/content";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { readQuestionItem } from "@nakafa/aksara-corpus/question-bank/source";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, MutableHashMap, Option, Schema } from "effect";
import {
  type InspectedArticleDocument,
  loadArticleDocument,
  makeArticleProjectionFromSource,
} from "#publisher/article/document";
import { makeCompileSource } from "#publisher/compilation";
import {
  type InspectedMaterialDocument,
  loadMaterialDocument,
  makeMaterialProjection,
} from "#publisher/material/document";
import {
  type InspectedPageDocument,
  loadPageDocument,
  makePageProjectionFromSource,
} from "#publisher/page/document";
import {
  type InspectedQuestionDocument,
  loadQuestionDocument,
  makeQuestionProjectionFromSource,
} from "#publisher/question/document";

type QuestionEntry = Extract<
  PreviewSource,
  { readonly family: "question" }
>["entry"];
type QuestionSourceRoot = QuestionEntry["sourceRoot"];

type PreviewFamily = PreviewSource["family"];

/** The loaded document source of each preview family. */
type LoadedDocument<Family extends PreviewFamily> = Family extends "article"
  ? InspectedArticleDocument["source"]
  : Family extends "material"
    ? InspectedMaterialDocument["source"]
    : Family extends "page"
      ? InspectedPageDocument["source"]
      : InspectedQuestionDocument["source"];

/**
 * Pairs one loaded family with its compile body and its own document. The
 * source type follows from the family, so a branch cannot pair a family with
 * another family's document.
 */
function loadedPreview<Family extends PreviewFamily>(
  family: Family,
  body: CompileDocumentSource,
  source: LoadedDocument<Family>
) {
  return { body, family, source };
}

/** Complete source vocabulary accepted by incremental preview compilation. */
export type LoadedPreviewSource = Readonly<
  Effect.Success<ReturnType<typeof loadSelectedSource>>
>;

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
    itemsByRoot: MutableHashMap.MutableHashMap<QuestionSourceRoot, QuestionItem>
  ) {
    const { entry } = selected;
    const { sourceRoot } = entry;
    const cached = Option.getOrUndefined(
      MutableHashMap.get(itemsByRoot, sourceRoot)
    );
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
      ),
      Effect.provide(TypeScriptParser.layer)
    );
    MutableHashMap.set(itemsByRoot, sourceRoot, item);
    return item;
  }
);

/** Loads one registry source through its family adapter and shared item. */
const loadSelectedSource = Effect.fn("AksaraPublisher.loadSelectedSource")(
  function* (
    checkoutRoot: string,
    selected: PreviewSource,
    itemsByRoot: MutableHashMap.MutableHashMap<QuestionSourceRoot, QuestionItem>
  ) {
    if (selected.family === "article") {
      const source = yield* loadArticleDocument(checkoutRoot, selected.entry);
      return loadedPreview(
        "article",
        makeCompileSource(source, source.route),
        source
      );
    }

    if (selected.family === "material") {
      const source = yield* loadMaterialDocument(checkoutRoot, selected.entry);
      return loadedPreview(
        "material",
        makeCompileSource(source, source.route),
        source
      );
    }

    if (selected.family === "page") {
      const source = yield* loadPageDocument(checkoutRoot, selected.entry);
      return loadedPreview(
        "page",
        makeCompileSource(source, source.route),
        source
      );
    }

    const item = yield* loadQuestionItem(checkoutRoot, selected, itemsByRoot);
    const source = yield* loadQuestionDocument(
      checkoutRoot,
      selected.entry,
      item
    );
    return loadedPreview("question", makeCompileSource(source, source), source);
  }
);

/** Loads one ordered closure while parsing each shared item file once. */
export const loadPreviewSources = Effect.fn(
  "AksaraPublisher.loadPreviewSources"
)(function* (
  checkoutRoot: string,
  sources: readonly [PreviewSource, ...PreviewSource[]]
) {
  const itemsByRoot = MutableHashMap.empty<QuestionSourceRoot, QuestionItem>();
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
