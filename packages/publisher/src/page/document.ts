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
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  makePublicPageProjection,
  PageMetadataSchema,
  type PublicPageProjection,
} from "@nakafa/aksara-contracts/projection/page";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { PageEntry } from "@nakafa/aksara-corpus/pages/registry";
import {
  type PageDocumentSource,
  readPageDocument,
} from "@nakafa/aksara-corpus/pages/source";
import type { FileSystem, Path } from "effect";
import { Effect, Schema } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";

/** Authored page metadata does not satisfy Nakafa's exact public contract. */
export class PageMetadataError extends Schema.TaggedError<PageMetadataError>()(
  "PageMetadataError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** The checkout could not provide its canonical reviewed public page source. */
export class PageSourceError extends Schema.TaggedError<PageSourceError>()(
  "PageSourceError",
  { cause: Schema.Unknown, checkoutRoot: Schema.String }
) {}

/** Lightweight page facts sufficient to decide whether compilation is needed. */
export interface InspectedPageDocument {
  readonly inspection: ContentSourceInspection;
  readonly projection: PublicPageProjection;
  readonly projectionHash: ReturnType<typeof hashContentProjection>;
  readonly source: PageDocumentSource;
}

/** Binds one checkout root to the shared public page source error adapter. */
export function mapPageSourceError(checkoutRoot: string) {
  return (cause: unknown) => new PageSourceError({ cause, checkoutRoot });
}

/** Creates the exact authored body shared by every public page compiler mode. */
export function makePageCompileSource(source: PageDocumentSource) {
  return {
    artifactLocale: source.route.artifactLocale,
    contentKey: source.route.contentKey,
    rawMdx: source.rawMdx,
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  };
}

/** Decodes authored metadata and derives the canonical page projection. */
export const makePageProjectionFromSource: (
  source: PageDocumentSource,
  metadata: unknown
) => Effect.Effect<PublicPageProjection, PageMetadataError> = Effect.fn(
  "AksaraPublisher.makePageProjection"
)(function* (source: PageDocumentSource, metadata: unknown) {
  const decoded = yield* Schema.decodeUnknownEffect(PageMetadataSchema)(
    metadata,
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      (cause) => new PageMetadataError({ cause, sourcePath: source.sourcePath })
    )
  );
  return makePublicPageProjection({ metadata: decoded, route: source.route });
});

/** Reads one registry-owned public page document from the supplied checkout. */
export const loadPageDocument: (
  checkoutRoot: string,
  entry: PageEntry
) => Effect.Effect<
  PageDocumentSource,
  PageSourceError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.loadPageDocument")(function* (
  checkoutRoot: string,
  entry: PageEntry
) {
  return yield* readPageDocument(checkoutRoot, entry).pipe(
    Effect.mapError(mapPageSourceError(checkoutRoot))
  );
});

/** Inspects one page source without generating its executable MDX body. */
export const inspectPageDocument = Effect.fn(
  "AksaraPublisher.inspectPageDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: PageEntry
) {
  const source = yield* loadPageDocument(checkoutRoot, entry);
  const inspection = yield* inspectContentSource({
    ...makePageCompileSource(source),
    rendererManifest,
  });
  const projection = yield* makePageProjectionFromSource(
    source,
    inspection.metadata
  );
  return {
    inspection,
    projection,
    projectionHash: hashContentProjection(projection),
    source,
  } satisfies InspectedPageDocument;
});

/** Binds compiled output to its registry-owned page change and projection. */
function makePageRecord(
  source: PageDocumentSource,
  result: CompiledContentResult,
  projection: PublicPageProjection
): PreparedContentUpsert {
  const change = ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(result.payload),
    artifactLocale: source.route.artifactLocale,
    contentKey: source.route.contentKey,
    delivery: source.delivery,
    family: "page",
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
export const compilePageDocument = Effect.fn(
  "AksaraPublisher.compilePageDocument"
)(function* (
  document: InspectedPageDocument,
  rendererManifest: RendererManifestEnvelope
) {
  const result = yield* compileContent({
    ...makePageCompileSource(document.source),
    rendererManifest,
  });
  return makePageRecord(document.source, result, document.projection);
});
