import type { FileSystem, Path } from "@effect/platform";
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
  type MaterialLessonProjection,
  MaterialMetadataSchema,
  makeMaterialLessonProjection,
} from "@nakafa/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { MaterialEntry } from "@nakafa/aksara-corpus/material/registry";
import {
  type MaterialDocumentSource,
  readMaterialDocument,
} from "@nakafa/aksara-corpus/material/source";
import { Effect, Schema } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";

/** Authored material metadata does not satisfy Nakafa's exact page contract. */
export class MaterialMetadataError extends Schema.TaggedError<MaterialMetadataError>()(
  "MaterialMetadataError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** The checkout could not provide its canonical reviewed material source. */
export class MaterialSourceError extends Schema.TaggedError<MaterialSourceError>()(
  "MaterialSourceError",
  { cause: Schema.Unknown, checkoutRoot: Schema.String }
) {}

/** Lightweight material facts sufficient to decide whether compilation is needed. */
export interface InspectedMaterialDocument {
  readonly inspection: ContentSourceInspection;
  readonly projection: MaterialLessonProjection;
  readonly projectionHash: ReturnType<typeof hashContentProjection>;
  readonly source: MaterialDocumentSource;
}

/** Wraps every registry and filesystem failure at the checkout source seam. */
export function mapMaterialSourceError(checkoutRoot: string) {
  return (cause: unknown) => new MaterialSourceError({ cause, checkoutRoot });
}

/** Creates the exact compiler input shared by inspection and code generation. */
export function makeMaterialCompileInput(
  source: MaterialDocumentSource,
  rendererManifest: RendererManifestEnvelope
) {
  return {
    contentKey: source.route.contentKey,
    locale: source.route.locale,
    rawMdx: source.rawMdx,
    rendererDomain: source.rendererDomain,
    rendererManifest,
    sourcePath: source.sourcePath,
  };
}

/** Decodes authored metadata and derives the canonical material projection. */
export const makeMaterialProjection: (
  source: MaterialDocumentSource,
  metadata: unknown
) => Effect.Effect<MaterialLessonProjection, MaterialMetadataError> = Effect.fn(
  "AksaraPublisher.makeMaterialProjection"
)(function* (source: MaterialDocumentSource, metadata: unknown) {
  const decoded = yield* Schema.decodeUnknown(MaterialMetadataSchema)(
    metadata,
    {
      onExcessProperty: "error",
    }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialMetadataError({ cause, sourcePath: source.sourcePath })
    )
  );
  return makeMaterialLessonProjection(source.route, decoded);
});

/** Reads one registry-owned material document from the supplied checkout. */
export const loadMaterialDocument: (
  checkoutRoot: string,
  entry: MaterialEntry
) => Effect.Effect<
  MaterialDocumentSource,
  MaterialSourceError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.loadMaterialDocument")(function* (
  checkoutRoot: string,
  entry: MaterialEntry
) {
  return yield* readMaterialDocument(checkoutRoot, entry).pipe(
    Effect.mapError(mapMaterialSourceError(checkoutRoot))
  );
});

/** Inspects one material source without generating its executable MDX body. */
export const inspectMaterialDocument = Effect.fn(
  "AksaraPublisher.inspectMaterialDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: MaterialEntry
) {
  const source = yield* loadMaterialDocument(checkoutRoot, entry);
  const inspection = yield* inspectContentSource(
    makeMaterialCompileInput(source, rendererManifest)
  );
  const projection = yield* makeMaterialProjection(source, inspection.metadata);
  return {
    inspection,
    projection,
    projectionHash: hashContentProjection(projection),
    source,
  } satisfies InspectedMaterialDocument;
});

/** Binds compiled output to its registry-owned change and projection. */
export function makeMaterialRecord(
  source: MaterialDocumentSource,
  result: CompiledContentResult,
  projection: MaterialLessonProjection
): PreparedContentUpsert {
  const change = ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(result.payload),
    contentKey: source.route.contentKey,
    delivery: source.delivery,
    family: "material",
    locale: source.route.locale,
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  });
  return {
    change,
    payload: result.payload,
    projection,
    source: {
      contentKey: source.route.contentKey,
      locale: source.route.locale,
      rawMdx: source.rawMdx,
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  };
}

/** Generates executable MDX only after inspection proves publication changed. */
export const compileMaterialDocument = Effect.fn(
  "AksaraPublisher.compileMaterialDocument"
)(function* (
  document: InspectedMaterialDocument,
  rendererManifest: RendererManifestEnvelope
) {
  const result = yield* compileContent(
    makeMaterialCompileInput(document.source, rendererManifest)
  );
  return makeMaterialRecord(document.source, result, document.projection);
});
