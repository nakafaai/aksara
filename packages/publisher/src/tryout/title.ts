import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { makeTryoutPlacementRecord } from "@nakafa/aksara-contracts/tryout/row-hash";
import { TryoutPlacementSchema } from "@nakafa/aksara-contracts/tryout/spec";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/registry";
import { Effect, Option, Stream } from "effect";
import {
  type InspectedQuestionDocument,
  inspectQuestionDocument,
} from "#publisher/question/document";
import type { BoundTryoutPlacement } from "#publisher/tryout/bind";
import {
  type TryoutHeadBodySchema,
  TryoutHeadMismatchError,
  TryoutTitleMissingError,
} from "#publisher/tryout/error";

/** Returns one stable locale-specific registry identity. */
function entryIdentity(input: {
  readonly contentKey: string;
  readonly locale: string;
}) {
  return `${input.contentKey}\0${input.locale}`;
}

/** Reads one exact answer or question entry for an active placement. */
function requiredEntry(
  entries: ReadonlyMap<string, QuestionEntry>,
  binding: BoundTryoutPlacement,
  bodyKind: typeof TryoutHeadBodySchema.Type
) {
  const contentKey =
    bodyKind === "answer"
      ? binding.placement.answerContentKey
      : binding.placement.questionContentKey;
  const entry = entries.get(
    entryIdentity({ contentKey, locale: binding.placement.locale })
  );
  return entry === undefined
    ? Effect.fail(
        new TryoutTitleMissingError({
          contentKey,
          locale: binding.placement.locale,
        })
      )
    : Effect.succeed(entry);
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
          contentKey: head.contentKey,
          field,
          locale: head.locale,
        })
      ),
  });
}

/** Inspects both bodies before creating one exact artifact-bound placement. */
const inspectPlacement = Effect.fn("AksaraPublisher.inspectTryoutPlacement")(
  function* (
    checkoutRoot: string,
    rendererManifest: RendererManifestEnvelope,
    entries: ReadonlyMap<string, QuestionEntry>,
    binding: BoundTryoutPlacement
  ) {
    const [answerEntry, questionEntry] = yield* Effect.all([
      requiredEntry(entries, binding, "answer"),
      requiredEntry(entries, binding, "question"),
    ]);
    const [answerDocument, questionDocument] = yield* Effect.all([
      inspectQuestionDocument(checkoutRoot, rendererManifest, answerEntry),
      inspectQuestionDocument(checkoutRoot, rendererManifest, questionEntry),
    ]);
    yield* Effect.all([
      verifyFingerprint(binding.answerHead, answerDocument),
      verifyFingerprint(binding.questionHead, questionDocument),
    ]);
    return makeTryoutPlacementRecord(
      TryoutPlacementSchema.make({
        ...binding.placement,
        answerArtifactHash: binding.answerHead.artifactHash,
        questionArtifactHash: binding.questionHead.artifactHash,
        title: questionDocument.projection.metadata.title,
      })
    );
  }
);

/** Streams placements proven against both exact reviewed MDX bodies. */
export function bindTryoutTitles<E, R>(input: {
  readonly bindings: Stream.Stream<BoundTryoutPlacement, E, R>;
  readonly checkoutRoot: string;
  readonly entries: readonly QuestionEntry[];
  readonly rendererManifest: RendererManifestEnvelope;
}) {
  const entries = new Map(
    input.entries.map((entry) => [entryIdentity(entry), entry])
  );
  return input.bindings.pipe(
    Stream.mapEffect((binding) =>
      inspectPlacement(
        input.checkoutRoot,
        input.rendererManifest,
        entries,
        binding
      )
    )
  );
}
