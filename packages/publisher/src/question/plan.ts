import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/content";
import {
  indexQuestionChoices,
  type QuestionSource,
} from "@nakafa/aksara-corpus/question-bank/source";
import { Effect, Schema, type Stream } from "effect";
import { planFamilyPublication } from "#publisher/family/plan";
import {
  PreparedContentTransitionSchema,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";
import {
  compileQuestionDocument,
  inspectQuestionDocument,
} from "#publisher/question/document";

/** One delta transition, desired result head, or both from one question row. */
export const QuestionPublicationPlanSchema = Schema.Struct({
  record: Schema.optional(PreparedContentTransitionSchema),
  result: Schema.optional(QuestionHeadSchema),
}).pipe(
  Schema.filter(
    (plan) => plan.record !== undefined || plan.result !== undefined
  )
);
export type QuestionPublicationPlan = typeof QuestionPublicationPlanSchema.Type;

type PlanQuestionPublicationError =
  | Effect.Effect.Error<ReturnType<typeof compileQuestionDocument>>
  | Effect.Effect.Error<ReturnType<typeof inspectQuestionDocument>>;

type PlanQuestionPublicationContext =
  | Effect.Effect.Context<ReturnType<typeof compileQuestionDocument>>
  | Effect.Effect.Context<ReturnType<typeof inspectQuestionDocument>>;

/** A question body cannot join its canonical source-owned choices. */
export class QuestionChoiceJoinError extends Schema.TaggedError<QuestionChoiceJoinError>()(
  "QuestionChoiceJoinError",
  { sourceRoot: CorpusSourcePathSchema }
) {}

/** Derives one complete question head from a newly compiled upsert. */
function makeQuestionHead(record: PreparedContentUpsert): QuestionHead {
  const { change, payload, projection } = record;
  return QuestionHeadSchema.make({
    artifactHash: change.artifactHash,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "question",
    locale: change.locale,
    projectionHash: hashContentProjection(projection),
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
}

/** Preserves one existing question head for authenticated rollback. */
function priorQuestion(head: QuestionHead): RollbackSnapshotState {
  return { head, state: "question" };
}

/** Proves one newly authored question head had no prior active state. */
function absentQuestion(entry: QuestionEntry): RollbackSnapshotState {
  return {
    contentKey: entry.contentKey,
    family: "question",
    locale: entry.locale,
    state: "absent",
  };
}

/** Joins one body entry with the choices owned by its physical source. */
const inspectQuestionEntry = Effect.fn("AksaraPublisher.inspectQuestionEntry")(
  function* (
    checkoutRoot: string,
    rendererManifest: RendererManifestEnvelope,
    entry: QuestionEntry,
    choicesByRoot: ReturnType<typeof indexQuestionChoices>
  ) {
    const choices = choicesByRoot.get(entry.sourceRoot);
    if (choices === undefined) {
      return yield* new QuestionChoiceJoinError({
        sourceRoot: entry.sourceRoot,
      });
    }
    return yield* inspectQuestionDocument(
      checkoutRoot,
      rendererManifest,
      entry,
      choices
    );
  }
);

/** Streams complete result heads and only question delta transitions. */
export function planQuestionPublication<E, R>(input: {
  readonly checkoutRoot: string;
  readonly entries: readonly QuestionEntry[];
  readonly published: Stream.Stream<QuestionHead, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly sources: readonly QuestionSource[];
}): Stream.Stream<
  QuestionPublicationPlan,
  E | PlanQuestionPublicationError | QuestionChoiceJoinError,
  R | PlanQuestionPublicationContext
> {
  const choicesByRoot = indexQuestionChoices(input.sources);
  return planFamilyPublication({
    adapter: {
      absent: absentQuestion,
      compile: compileQuestionDocument,
      head: makeQuestionHead,
      identity: (entry) => entry,
      inspect: (checkoutRoot, rendererManifest, entry) =>
        inspectQuestionEntry(
          checkoutRoot,
          rendererManifest,
          entry,
          choicesByRoot
        ),
      prior: priorQuestion,
      publicPath: () => undefined,
    },
    ...input,
  });
}
