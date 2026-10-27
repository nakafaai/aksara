import type { CompileDocumentSource } from "@nakafa/aksara-contracts/content";
import type { PreviewSource } from "@nakafa/aksara-corpus/preview/source";
import { Effect } from "effect";
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

type PreviewFamily = PreviewSource["family"];

/** The loaded document source of each preview family. */
type LoadedDocument<Family extends PreviewFamily> = Family extends "article"
  ? InspectedArticleDocument["source"]
  : Family extends "material"
    ? InspectedMaterialDocument["source"]
    : InspectedPageDocument["source"];

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
  Effect.Success<ReturnType<typeof loadPreviewSource>>
>;

/** Loads the one registry source of a preview through its family adapter. */
export const loadPreviewSource = Effect.fn("AksaraPublisher.loadPreviewSource")(
  function* (checkoutRoot: string, selected: PreviewSource) {
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

    const source = yield* loadPageDocument(checkoutRoot, selected.entry);
    return loadedPreview(
      "page",
      makeCompileSource(source, source.route),
      source
    );
  }
);

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

  return makePageProjectionFromSource(loaded.source, metadata);
}
