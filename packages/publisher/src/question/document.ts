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
  makeQuestionBodyProjection,
  type QuestionBodyProjection,
  QuestionMetadataSchema,
} from "@nakafa/aksara-contracts/projection/question";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/registry";
import {
  type QuestionDocumentSource,
  readQuestionDocument,
} from "@nakafa/aksara-corpus/question-bank/source";
import { Effect, Schema } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";

/** Authored question metadata does not satisfy its exact three-field contract. */
export class QuestionMetadataError extends Schema.TaggedError<QuestionMetadataError>()(
  "QuestionMetadataError",
  { cause: Schema.Unknown, sourcePath: CorpusSourcePathSchema }
) {}

/** The checkout could not provide its canonical reviewed question body. */
export class QuestionSourceError extends Schema.TaggedError<QuestionSourceError>()(
  "QuestionSourceError",
  { cause: Schema.Unknown, checkoutRoot: Schema.String }
) {}

/** Lightweight question facts sufficient to decide whether compilation is needed. */
export interface InspectedQuestionDocument {
  readonly inspection: ContentSourceInspection;
  readonly projection: QuestionBodyProjection;
  readonly projectionHash: ReturnType<typeof hashContentProjection>;
  readonly source: QuestionDocumentSource;
}

/** Wraps every registry and filesystem failure at the checkout source seam. */
export function mapQuestionSourceError(checkoutRoot: string) {
  return (cause: unknown) => new QuestionSourceError({ cause, checkoutRoot });
}

/** Creates the exact compiler input shared by inspection and code generation. */
export function makeQuestionCompileInput(
  source: QuestionDocumentSource,
  rendererManifest: RendererManifestEnvelope
) {
  return {
    contentKey: source.contentKey,
    locale: source.locale,
    rawMdx: source.rawMdx,
    rendererDomain: source.rendererDomain,
    rendererManifest,
    sourcePath: source.sourcePath,
  };
}

/** Decodes authored metadata and derives the canonical question projection. */
export const makeQuestionProjectionFromSource: (
  source: QuestionDocumentSource,
  metadata: unknown
) => Effect.Effect<QuestionBodyProjection, QuestionMetadataError> = Effect.fn(
  "AksaraPublisher.makeQuestionProjection"
)(function* (source: QuestionDocumentSource, metadata: unknown) {
  const decoded = yield* Schema.decodeUnknown(QuestionMetadataSchema)(
    metadata,
    {
      onExcessProperty: "error",
    }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new QuestionMetadataError({ cause, sourcePath: source.sourcePath })
    )
  );
  return makeQuestionBodyProjection({ ...source, metadata: decoded });
});

/** Reads one registry-owned question document from the supplied checkout. */
export const loadQuestionDocument: (
  checkoutRoot: string,
  entry: QuestionEntry
) => Effect.Effect<
  QuestionDocumentSource,
  QuestionSourceError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.loadQuestionDocument")(function* (
  checkoutRoot: string,
  entry: QuestionEntry
) {
  return yield* readQuestionDocument(checkoutRoot, entry).pipe(
    Effect.mapError(mapQuestionSourceError(checkoutRoot))
  );
});

/** Inspects one question source without generating its executable MDX body. */
export const inspectQuestionDocument = Effect.fn(
  "AksaraPublisher.inspectQuestionDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: QuestionEntry
) {
  const source = yield* loadQuestionDocument(checkoutRoot, entry);
  const inspection = yield* inspectContentSource(
    makeQuestionCompileInput(source, rendererManifest)
  );
  const projection = yield* makeQuestionProjectionFromSource(
    source,
    inspection.metadata
  );
  return {
    inspection,
    projection,
    projectionHash: hashContentProjection(projection),
    source,
  } satisfies InspectedQuestionDocument;
});

/** Binds compiled output to its registry-owned question change and projection. */
export function makeQuestionRecord(
  source: QuestionDocumentSource,
  result: CompiledContentResult,
  projection: QuestionBodyProjection
): PreparedContentUpsert {
  const change = ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(result.payload),
    contentKey: source.contentKey,
    delivery: source.delivery,
    family: "question",
    locale: source.locale,
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  });
  return {
    change,
    payload: result.payload,
    projection,
    source: {
      contentKey: source.contentKey,
      locale: source.locale,
      rawMdx: source.rawMdx,
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  };
}

/** Generates executable MDX only after inspection proves publication changed. */
export const compileQuestionDocument = Effect.fn(
  "AksaraPublisher.compileQuestionDocument"
)(function* (
  document: InspectedQuestionDocument,
  rendererManifest: RendererManifestEnvelope
) {
  const result = yield* compileContent(
    makeQuestionCompileInput(document.source, rendererManifest)
  );
  return makeQuestionRecord(document.source, result, document.projection);
});
