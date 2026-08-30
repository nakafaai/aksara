import { resolve } from "node:path";
import { QuestionBlueprintSchema } from "@nakafa/aksara-contracts/question/item";
import { QuestionHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import { Effect, Path, Stream } from "effect";
import { inspectQuestionDocument } from "#publisher/question/document";
import type { BoundTryoutPlacement } from "#publisher/tryout/bind";
import { bindTryoutContent } from "#publisher/tryout/content";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  questionEntries,
  questionSources,
  rendererManifest,
  sourceByPath,
} from "#test/question/spec";

interface TryoutContentBindingInput {
  readonly entries?: typeof questionEntries;
  readonly files?: ReadonlyMap<string, string>;
  readonly sources?: typeof questionSources;
  readonly values?: readonly BoundTryoutPlacement[];
}

/** Collects exact artifact records through the real question inspection seam. */
export const collectTryoutContent = Effect.fn("TryoutContentTest.collect")(
  (
    bindings: readonly BoundTryoutPlacement[],
    input: TryoutContentBindingInput
  ) =>
    bindTryoutContent({
      bindings: Stream.fromIterable(input.values ?? bindings),
      checkoutRoot,
      entries: input.entries ?? questionEntries,
      rendererManifest,
      sources: input.sources ?? questionSources,
    }).pipe(
      Stream.runCollect,
      Effect.map((records) => [...records]),
      Effect.provide([testFileLayer(input.files ?? sourceByPath), Path.layer])
    )
);

/** Returns one inspected content-binding failure without a FiberFailure wrapper. */
export const rejectTryoutContent = Effect.fn("TryoutContentTest.reject")(
  (
    bindings: readonly BoundTryoutPlacement[],
    input: TryoutContentBindingInput
  ) =>
    bindTryoutContent({
      bindings: Stream.fromIterable(input.values ?? bindings),
      checkoutRoot,
      entries: input.entries ?? questionEntries,
      rendererManifest,
      sources: input.sources ?? questionSources,
    }).pipe(
      Stream.runDrain,
      Effect.flip,
      Effect.provide([testFileLayer(sourceByPath), Path.layer])
    )
);

/** Finds one real body entry through a bound placement identity. */
function placementEntry(
  binding: BoundTryoutPlacement,
  bodyKind: "answer" | "question"
) {
  const contentKey =
    bodyKind === "answer"
      ? binding.placement.answerContentKey
      : binding.placement.questionContentKey;
  const artifactLocale =
    bodyKind === "answer"
      ? binding.placement.answerArtifactLocale
      : binding.placement.questionArtifactLocale;
  return questionEntries.find(
    (entry) =>
      entry.artifactLocale === artifactLocale && entry.contentKey === contentKey
  );
}

/** Builds one fully enriched binding with recomputed source fingerprints. */
export const collectEnrichedTryoutContent = Effect.fn(
  "TryoutContentTest.collectEnriched"
)(function* (binding: BoundTryoutPlacement) {
  const answerEntry = yield* Effect.fromNullishOr(
    placementEntry(binding, "answer")
  );
  const questionEntry = yield* Effect.fromNullishOr(
    placementEntry(binding, "question")
  );
  const source = yield* Effect.fromNullishOr(questionSources[0]);
  const blueprint = QuestionBlueprintSchema.make({
    cognitiveLevel: TryoutKeySchema.make("application"),
    contentDomain: TryoutKeySchema.make("algebra"),
    topic: TryoutKeySchema.make("functions"),
  });
  const stimulusKey = TryoutKeySchema.make("shared-function-model");
  const enrichedItem = { ...source.item, blueprint, stimulusKey };
  const enrichedSources = [{ ...source, item: enrichedItem }];
  const questionPath = resolve(checkoutRoot, questionEntry.sourcePath);
  const questionSource = yield* Effect.fromNullishOr(
    sourceByPath.get(questionPath)
  );
  const modifiedQuestionSource = questionSource.replace(
    '  datePublished: "2026-01-01",',
    '  dateModified: "2026-08-30",\n  datePublished: "2026-01-01",'
  );
  const files = new Map(sourceByPath).set(questionPath, modifiedQuestionSource);
  const [answerDocument, questionDocument] = yield* Effect.all([
    inspectQuestionDocument(
      checkoutRoot,
      rendererManifest,
      answerEntry,
      enrichedItem
    ),
    inspectQuestionDocument(
      checkoutRoot,
      rendererManifest,
      questionEntry,
      enrichedItem
    ),
  ]).pipe(Effect.provide([testFileLayer(files), Path.layer]));
  const enrichedBinding = {
    answerHead: QuestionHeadSchema.make({
      ...binding.answerHead,
      compilerConfigHash: answerDocument.inspection.compilerConfigHash,
      projectionHash: answerDocument.projectionHash,
      sourceHash: answerDocument.inspection.sourceHash,
    }),
    placement: { ...binding.placement, blueprint, stimulusKey },
    questionHead: QuestionHeadSchema.make({
      ...binding.questionHead,
      compilerConfigHash: questionDocument.inspection.compilerConfigHash,
      projectionHash: questionDocument.projectionHash,
      sourceHash: questionDocument.inspection.sourceHash,
    }),
  } satisfies BoundTryoutPlacement;
  const [record] = yield* collectTryoutContent([binding], {
    files,
    sources: enrichedSources,
    values: [enrichedBinding],
  });
  return {
    blueprint,
    modifiedQuestionSource,
    questionSource,
    record,
    stimulusKey,
  };
});
