import {
  type CompiledContentResult,
  compileContent,
} from "@nakafa/aksara-compiler/compile";
import {
  type ContentSourceInspection,
  inspectContentSource,
} from "@nakafa/aksara-compiler/inspect";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ArticleMetadataSchema,
  type ArticleProjection,
  makeArticleProjection,
} from "@nakafa/aksara-contracts/projection/article";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { ArticleEntry } from "@nakafa/aksara-corpus/articles/registry";
import {
  type ArticleDocumentSource,
  readArticleDocument,
} from "@nakafa/aksara-corpus/articles/source";
import { teams } from "@nakafa/aksara-corpus/team/source";
import type { FileSystem, Path } from "effect";
import { Effect, Schema } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";

/** Authored article metadata does not satisfy Nakafa's exact page contract. */
export class ArticleMetadataError extends Schema.TaggedError<ArticleMetadataError>()(
  "ArticleMetadataError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** The checkout could not provide its canonical reviewed article source. */
export class ArticleSourceError extends Schema.TaggedError<ArticleSourceError>()(
  "ArticleSourceError",
  { cause: Schema.Unknown, checkoutRoot: Schema.String }
) {}

/** Lightweight article facts sufficient to decide whether compilation is needed. */
export interface InspectedArticleDocument {
  readonly inspection: ContentSourceInspection;
  readonly projection: ArticleProjection;
  readonly projectionHash: ReturnType<typeof hashContentProjection>;
  readonly source: ArticleDocumentSource;
}

/** Binds one checkout root to the shared article-source error adapter. */
export function mapArticleSourceError(checkoutRoot: string) {
  return (cause: unknown) => new ArticleSourceError({ cause, checkoutRoot });
}

/** Creates the exact authored body shared by every article compiler mode. */
export function makeArticleCompileSource(source: ArticleDocumentSource) {
  return {
    artifactLocale: source.route.artifactLocale,
    contentKey: source.route.contentKey,
    rawMdx: source.rawMdx,
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  };
}

/** Decodes authored metadata and derives the canonical article projection. */
export const makeArticleProjectionFromSource: (
  source: ArticleDocumentSource,
  metadata: unknown
) => Effect.Effect<ArticleProjection, ArticleMetadataError> = Effect.fn(
  "AksaraPublisher.makeArticleProjection"
)(function* (source: ArticleDocumentSource, metadata: unknown) {
  const decoded = yield* Schema.decodeUnknownEffect(ArticleMetadataSchema)(
    metadata,
    {
      onExcessProperty: "error",
    }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new ArticleMetadataError({ cause, sourcePath: source.sourcePath })
    )
  );
  return makeArticleProjection({
    categoryTitle: source.categoryTitle,
    metadata: decoded,
    official: decoded.authors.some(({ name }) => teams.has(name)),
    references: source.references,
    route: source.route,
  });
});

/** Reads one registry-owned article document from the supplied checkout. */
export const loadArticleDocument: (
  checkoutRoot: string,
  entry: ArticleEntry
) => Effect.Effect<
  ArticleDocumentSource,
  ArticleSourceError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.loadArticleDocument")(function* (
  checkoutRoot: string,
  entry: ArticleEntry
) {
  return yield* readArticleDocument(checkoutRoot, entry).pipe(
    Effect.mapError(mapArticleSourceError(checkoutRoot))
  );
});

/** Inspects one article source without generating its executable MDX body. */
export const inspectArticleDocument = Effect.fn(
  "AksaraPublisher.inspectArticleDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: ArticleEntry
) {
  const source = yield* loadArticleDocument(checkoutRoot, entry);
  const inspection = yield* inspectContentSource({
    ...makeArticleCompileSource(source),
    rendererManifest,
  });
  const projection = yield* makeArticleProjectionFromSource(
    source,
    inspection.metadata
  );
  return {
    inspection,
    projection,
    projectionHash: hashContentProjection(projection),
    source,
  } satisfies InspectedArticleDocument;
});

/** Binds compiled output to its registry-owned article change and projection. */
function makeArticleRecord(
  source: ArticleDocumentSource,
  result: CompiledContentResult,
  projection: ArticleProjection
): PreparedContentUpsert {
  const change = ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(result.payload),
    artifactLocale: source.route.artifactLocale,
    contentKey: source.route.contentKey,
    delivery: source.delivery,
    family: "article",
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  });
  return {
    change,
    payload: result.payload,
    projection,
    source: {
      artifactLocale: source.route.artifactLocale,
      contentKey: source.route.contentKey,
      rawMdx: source.rawMdx,
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  };
}

/** Generates executable MDX only after inspection proves publication changed. */
export const compileArticleDocument = Effect.fn(
  "AksaraPublisher.compileArticleDocument"
)(function* (
  document: InspectedArticleDocument,
  rendererManifest: RendererManifestEnvelope
) {
  const result = yield* compileContent({
    ...makeArticleCompileSource(document.source),
    rendererManifest,
  });
  return makeArticleRecord(document.source, result, document.projection);
});
