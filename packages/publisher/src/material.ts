import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import { CorpusSourcePathSchema } from "@nakafaai/aksara-contracts/ids";
import {
  MaterialMetadataSchema,
  makeMaterialLessonProjection,
} from "@nakafaai/aksara-contracts/projection/material";
import { ContentUpsertSchema } from "@nakafaai/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import {
  type MaterialDocumentSource,
  streamMaterialDocuments,
} from "@nakafaai/aksara-corpus/material/source";
import { Effect, Schema, Stream } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";

/** Authored material metadata does not satisfy Nakafa's exact page contract. */
export class MaterialMetadataError extends Schema.TaggedError<MaterialMetadataError>()(
  "MaterialMetadataError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** The exact checkout could not stream its validated material sources. */
export class MaterialSourceError extends Schema.TaggedError<MaterialSourceError>()(
  "MaterialSourceError",
  { cause: Schema.Unknown, checkoutRoot: Schema.String }
) {}

/** Compiles one source and decodes its AST metadata into a material projection. */
const prepareMaterial = Effect.fn("AksaraPublisher.prepareMaterial")(function* (
  source: MaterialDocumentSource,
  rendererManifest: RendererManifestEnvelope
) {
  const compiled = yield* compileContent({
    contentKey: source.route.contentKey,
    locale: source.route.locale,
    rawMdx: source.rawMdx,
    rendererDomain: source.rendererDomain,
    rendererManifest,
    sourcePath: source.sourcePath,
  });
  const metadata = yield* Schema.decodeUnknown(MaterialMetadataSchema)(
    compiled.metadata,
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialMetadataError({ cause, sourcePath: source.sourcePath })
    )
  );
  const projection = makeMaterialLessonProjection(source.route, metadata);
  const change = ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(compiled.payload),
    contentKey: source.route.contentKey,
    delivery: source.delivery,
    locale: source.route.locale,
    operation: "upsert",
    publicPath: source.route.publicPath,
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  });
  return {
    change,
    payload: compiled.payload,
    projection,
    source: {
      contentKey: source.route.contentKey,
      locale: source.route.locale,
      rawMdx: source.rawMdx,
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  } satisfies PreparedContentUpsert;
});

/** Prepares replayable material sources without collecting their bodies. */
export function prepareMaterialDocuments<E, R>(input: {
  readonly rendererManifest: RendererManifestEnvelope;
  readonly sources: Stream.Stream<MaterialDocumentSource, E, R>;
}) {
  return input.sources.pipe(
    Stream.mapEffect((source) =>
      prepareMaterial(source, input.rendererManifest)
    )
  );
}

/** Replays material preparation from one exact Aksara checkout root. */
export function prepareMaterialCheckout(
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope
) {
  const sources = streamMaterialDocuments(checkoutRoot).pipe(
    Stream.mapError((cause) => new MaterialSourceError({ cause, checkoutRoot }))
  );
  return prepareMaterialDocuments({
    rendererManifest,
    sources,
  });
}
