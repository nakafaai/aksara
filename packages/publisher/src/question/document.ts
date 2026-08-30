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
  makeQuestionAnswerProjection,
  makeQuestionBodyProjection,
  makeQuestionPromptProjection,
  type QuestionAnswerProjection,
  type QuestionBodyProjection,
  QuestionMetadataSchema,
  type QuestionPromptProjection,
} from "@nakafa/aksara-contracts/projection/question";
import type {
  QuestionItem,
  QuestionResponseLocaleMissingError,
} from "@nakafa/aksara-contracts/question/item";
import { ContentUpsertSchema } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  type QuestionDocumentSource,
  type QuestionEntry,
  readQuestionDocument,
} from "@nakafa/aksara-corpus/question-bank/content";
import { Effect, Schema } from "effect";
import type { PreparedContentUpsert } from "#publisher/preparation/spec";

/** Authored question metadata does not satisfy its exact publication contract. */
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
export interface InspectedQuestionDocument<
  Projection extends QuestionBodyProjection = QuestionBodyProjection,
> {
  readonly inspection: ContentSourceInspection;
  readonly projection: Projection;
  readonly projectionHash: ReturnType<typeof hashContentProjection>;
  readonly source: QuestionDocumentSource;
}

type QuestionPromptEntry = Extract<
  QuestionEntry,
  { readonly bodyKind: "question" }
>;
type QuestionAnswerEntry = Extract<
  QuestionEntry,
  { readonly bodyKind: "answer" }
>;

/** Wraps every registry and filesystem failure at the checkout source seam. */
export function mapQuestionSourceError(checkoutRoot: string) {
  return (cause: unknown) => new QuestionSourceError({ cause, checkoutRoot });
}

/** Creates the exact authored body shared by every question compiler mode. */
export function makeQuestionCompileSource(source: QuestionDocumentSource) {
  return {
    artifactLocale: source.artifactLocale,
    contentKey: source.contentKey,
    rawMdx: source.rawMdx,
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  };
}

/** Decodes one question document's exact authored metadata. */
const decodeQuestionMetadata = Effect.fn(
  "AksaraPublisher.decodeQuestionMetadata"
)(function* (source: QuestionDocumentSource, metadata: unknown) {
  return yield* Schema.decodeUnknownEffect(QuestionMetadataSchema)(metadata, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new QuestionMetadataError({ cause, sourcePath: source.sourcePath })
    )
  );
});

/** Decodes authored metadata and derives the canonical question projection. */
export const makeQuestionProjectionFromSource: (
  source: QuestionDocumentSource,
  metadata: unknown
) => Effect.Effect<
  QuestionBodyProjection,
  QuestionMetadataError | QuestionResponseLocaleMissingError
> = Effect.fn("AksaraPublisher.makeQuestionProjection")(function* (
  source: QuestionDocumentSource,
  metadata: unknown
) {
  const decoded = yield* decodeQuestionMetadata(source, metadata);
  return yield* makeQuestionBodyProjection({ ...source, metadata: decoded });
});

/** Reads one registry-owned question document from the supplied checkout. */
export const loadQuestionDocument = Effect.fn(
  "AksaraPublisher.loadQuestionDocument"
)(function* <Entry extends QuestionEntry>(
  checkoutRoot: string,
  entry: Entry,
  item: QuestionItem
) {
  return yield* readQuestionDocument(checkoutRoot, entry, item).pipe(
    Effect.mapError(mapQuestionSourceError(checkoutRoot))
  );
});

/** Reads and inspects one body without projecting its publication identity. */
const inspectQuestionSource = Effect.fn(
  "AksaraPublisher.inspectQuestionSource"
)(function* <Entry extends QuestionEntry>(
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: Entry,
  item: QuestionItem
) {
  const source = yield* loadQuestionDocument(checkoutRoot, entry, item);
  const inspection = yield* inspectContentSource({
    ...makeQuestionCompileSource(source),
    rendererManifest,
  });
  const metadata = yield* decodeQuestionMetadata(source, inspection.metadata);
  return { inspection, metadata, source };
});

/** Joins one inspected source to its typed projection and exact hash. */
function inspectedDocument<Projection extends QuestionBodyProjection>(
  inspection: ContentSourceInspection,
  source: QuestionDocumentSource,
  projection: Projection
) {
  return {
    inspection,
    projection,
    projectionHash: hashContentProjection(projection),
    source,
  } satisfies InspectedQuestionDocument<Projection>;
}

/** Inspects one prompt and preserves its prompt projection type. */
export const inspectQuestionPromptDocument = Effect.fn(
  "AksaraPublisher.inspectQuestionPromptDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: QuestionPromptEntry,
  item: QuestionItem
) {
  const document = yield* inspectQuestionSource(
    checkoutRoot,
    rendererManifest,
    entry,
    item
  );
  const projection: QuestionPromptProjection =
    yield* makeQuestionPromptProjection({
      ...document.source,
      bodyKind: "question",
      metadata: document.metadata,
    });
  return inspectedDocument(document.inspection, document.source, projection);
});

/** Inspects one answer and preserves its answer projection type. */
export const inspectQuestionAnswerDocument = Effect.fn(
  "AksaraPublisher.inspectQuestionAnswerDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: QuestionAnswerEntry,
  item: QuestionItem
) {
  const document = yield* inspectQuestionSource(
    checkoutRoot,
    rendererManifest,
    entry,
    item
  );
  const projection: QuestionAnswerProjection = makeQuestionAnswerProjection({
    ...document.source,
    bodyKind: "answer",
    metadata: document.metadata,
  });
  return inspectedDocument(document.inspection, document.source, projection);
});

/** Inspects one question source without generating its executable MDX body. */
export const inspectQuestionDocument = Effect.fn(
  "AksaraPublisher.inspectQuestionDocument"
)(function* (
  checkoutRoot: string,
  rendererManifest: RendererManifestEnvelope,
  entry: QuestionEntry,
  item: QuestionItem
) {
  if (entry.bodyKind === "question") {
    return yield* inspectQuestionPromptDocument(
      checkoutRoot,
      rendererManifest,
      entry,
      item
    );
  }
  return yield* inspectQuestionAnswerDocument(
    checkoutRoot,
    rendererManifest,
    entry,
    item
  );
});

/** Binds compiled output to its registry-owned question change and projection. */
function makeQuestionRecord(
  source: QuestionDocumentSource,
  result: CompiledContentResult,
  projection: QuestionBodyProjection
): PreparedContentUpsert {
  const change = ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(result.payload),
    artifactLocale: source.artifactLocale,
    contentKey: source.contentKey,
    delivery: source.delivery,
    family: "question",
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  });
  return {
    change,
    payload: result.payload,
    projection,
    source: {
      artifactLocale: source.artifactLocale,
      contentKey: source.contentKey,
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
  const result = yield* compileContent({
    ...makeQuestionCompileSource(document.source),
    rendererManifest,
  });
  return makeQuestionRecord(document.source, result, document.projection);
});
