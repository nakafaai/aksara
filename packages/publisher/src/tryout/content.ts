import type { QuestionBodyKind } from "@nakafa/aksara-contracts/question/identity";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { hashTryoutContent } from "@nakafa/aksara-contracts/tryout/hash/content";
import { makeTryoutPlacementRecord } from "@nakafa/aksara-contracts/tryout/hash/placement";
import { TryoutPlacementSchema } from "@nakafa/aksara-contracts/tryout/placement";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/content";
import type { QuestionSource } from "@nakafa/aksara-corpus/question-bank/source";
import { indexQuestionItems } from "@nakafa/aksara-corpus/question-bank/source";
import {
  Array as Arr,
  Effect,
  HashMap,
  MutableHashMap,
  Option,
  Stream,
} from "effect";
import {
  type InspectedQuestionDocument,
  inspectQuestionAnswerDocument,
  inspectQuestionPromptDocument,
} from "#publisher/question/document";
import type { BoundTryoutPlacement } from "#publisher/tryout/bind";
import {
  TryoutContentMissingError,
  TryoutHeadMismatchError,
} from "#publisher/tryout/error";

/** Returns one stable artifactLocale-specific registry identity. */
function entryIdentity(input: {
  readonly contentKey: string;
  readonly artifactLocale: string;
}) {
  return `${input.contentKey}\0${input.artifactLocale}`;
}

/** Reads one exact answer or question entry for an active placement. */
function requiredEntry(
  entries: HashMap.HashMap<string, QuestionEntry>,
  binding: BoundTryoutPlacement,
  bodyKind: QuestionBodyKind
) {
  const contentKey =
    bodyKind === "answer"
      ? binding.placement.answerContentKey
      : binding.placement.questionContentKey;
  const artifactLocale =
    bodyKind === "answer"
      ? binding.placement.answerArtifactLocale
      : binding.placement.questionArtifactLocale;
  const entry = Option.getOrUndefined(
    HashMap.get(entries, entryIdentity({ artifactLocale, contentKey }))
  );
  return entry === undefined
    ? Effect.fail(
        new TryoutContentMissingError({
          artifactLocale,
          contentKey,
        })
      )
    : Effect.succeed(entry);
}

/** Joins one body entry to the item owned by its physical question source. */
function requiredItem(
  itemsByRoot: ReturnType<typeof indexQuestionItems>,
  entry: QuestionEntry
) {
  const item = Option.getOrUndefined(
    MutableHashMap.get(itemsByRoot, entry.sourceRoot)
  );
  return item === undefined
    ? Effect.fail(
        new TryoutContentMissingError({
          artifactLocale: entry.artifactLocale,
          contentKey: entry.contentKey,
        })
      )
    : Effect.succeed(item);
}

type FingerprintField = "compilerConfigHash" | "projectionHash" | "sourceHash";

/** Finds the first inspected source fingerprint that differs from its head. */
function mismatchedFingerprint(
  head: QuestionHead,
  document: InspectedQuestionDocument
): Option.Option<FingerprintField> {
  if (head.compilerConfigHash !== document.inspection.compilerConfigHash) {
    return Option.some("compilerConfigHash");
  }
  if (head.projectionHash !== document.projectionHash) {
    return Option.some("projectionHash");
  }
  if (head.sourceHash !== document.inspection.sourceHash) {
    return Option.some("sourceHash");
  }
  return Option.none();
}

/** Rejects a desired artifact head that no longer matches exact Git source. */
function verifyFingerprint(
  head: QuestionHead,
  document: InspectedQuestionDocument
) {
  return Option.match(mismatchedFingerprint(head, document), {
    onNone: () => Effect.void,
    onSome: (field) =>
      Effect.fail(
        new TryoutHeadMismatchError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
          field,
        })
      ),
  });
}

/** Inspects both bodies before creating one exact artifact-bound placement. */
const inspectPlacement = Effect.fn("AksaraPublisher.inspectTryoutPlacement")(
  function* (
    checkoutRoot: string,
    rendererManifest: RendererManifestEnvelope,
    entries: HashMap.HashMap<string, QuestionEntry>,
    itemsByRoot: ReturnType<typeof indexQuestionItems>,
    binding: BoundTryoutPlacement
  ) {
    const [answerEntry, questionEntry] = yield* Effect.all([
      requiredEntry(entries, binding, "answer"),
      requiredEntry(entries, binding, "question"),
    ]);
    if (answerEntry.bodyKind !== "answer") {
      return yield* new TryoutContentMissingError({
        artifactLocale: binding.placement.answerArtifactLocale,
        contentKey: binding.placement.answerContentKey,
      });
    }
    if (questionEntry.bodyKind !== "question") {
      return yield* new TryoutContentMissingError({
        artifactLocale: binding.placement.questionArtifactLocale,
        contentKey: binding.placement.questionContentKey,
      });
    }
    const [answerItem, questionItem] = yield* Effect.all([
      requiredItem(itemsByRoot, answerEntry),
      requiredItem(itemsByRoot, questionEntry),
    ]);
    const [answerDocument, questionDocument] = yield* Effect.all([
      inspectQuestionAnswerDocument(
        checkoutRoot,
        rendererManifest,
        answerEntry,
        answerItem
      ),
      inspectQuestionPromptDocument(
        checkoutRoot,
        rendererManifest,
        questionEntry,
        questionItem
      ),
    ]);
    yield* Effect.all([
      verifyFingerprint(binding.answerHead, answerDocument),
      verifyFingerprint(binding.questionHead, questionDocument),
    ]);
    return makeTryoutPlacementRecord(
      TryoutPlacementSchema.make({
        ...binding.placement,
        answerArtifactHash: binding.answerHead.artifactHash,
        contentHash: hashTryoutContent({
          answerArtifactLocale: binding.placement.answerArtifactLocale,
          answerBody: answerDocument.inspection.bodyMdx,
          appLocale: binding.placement.appLocale,
          ...(binding.placement.blueprint === undefined
            ? {}
            : { blueprint: binding.placement.blueprint }),
          ...(questionDocument.projection.metadata.dateModified === undefined
            ? {}
            : {
                dateModified: questionDocument.projection.metadata.dateModified,
              }),
          datePublished: questionDocument.projection.metadata.datePublished,
          deliveryLanguage: binding.placement.deliveryLanguage,
          languagePolicy: binding.placement.languagePolicy,
          questionArtifactLocale: binding.placement.questionArtifactLocale,
          questionBody: questionDocument.inspection.bodyMdx,
          response: questionDocument.projection.response,
          sourcePath: questionDocument.projection.questionKey,
          sourceRevision: binding.placement.sourceRevision,
          ...(binding.placement.stimulusKey === undefined
            ? {}
            : { stimulusKey: binding.placement.stimulusKey }),
        }),
        questionArtifactHash: binding.questionHead.artifactHash,
      })
    );
  }
);

/** Streams placements proven against both exact reviewed MDX bodies. */
export function bindTryoutContent<E, R>(input: {
  readonly bindings: Stream.Stream<BoundTryoutPlacement, E, R>;
  readonly checkoutRoot: string;
  readonly entries: readonly QuestionEntry[];
  readonly rendererManifest: RendererManifestEnvelope;
  readonly sources: readonly QuestionSource[];
}) {
  const entries = HashMap.fromIterable(
    Arr.map(input.entries, (entry) => [entryIdentity(entry), entry])
  );
  const itemsByRoot = indexQuestionItems(input.sources);
  return input.bindings.pipe(
    Stream.mapEffect((binding) =>
      inspectPlacement(
        input.checkoutRoot,
        input.rendererManifest,
        entries,
        itemsByRoot,
        binding
      )
    )
  );
}
