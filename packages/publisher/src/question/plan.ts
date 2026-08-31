import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback/spec";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/content";
import type { QuestionSource } from "@nakafa/aksara-corpus/question-bank/source";
import { indexQuestionItems } from "@nakafa/aksara-corpus/question-bank/source";
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
  Schema.check(
    Schema.makeFilter(
      (plan) => plan.record !== undefined || plan.result !== undefined
    )
  )
);
export type QuestionPublicationPlan = typeof QuestionPublicationPlanSchema.Type;

type PlanQuestionPublicationError =
  | Effect.Error<ReturnType<typeof compileQuestionDocument>>
  | Effect.Error<ReturnType<typeof inspectQuestionDocument>>;

type PlanQuestionPublicationContext =
  | Effect.Services<ReturnType<typeof compileQuestionDocument>>
  | Effect.Services<ReturnType<typeof inspectQuestionDocument>>;

/** A question body cannot join its canonical source-owned item. */
export class QuestionItemJoinError extends Schema.TaggedError<QuestionItemJoinError>()(
  "QuestionItemJoinError",
  { sourceRoot: CorpusSourcePathSchema }
) {}

/** Derives one complete question head from a newly compiled upsert. */
function makeQuestionHead(record: PreparedContentUpsert): QuestionHead {
  const { change, payload, projection } = record;
  return QuestionHeadSchema.make({
    artifactHash: change.artifactHash,
    artifactLocale: change.artifactLocale,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "question",
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
    artifactLocale: entry.artifactLocale,
    contentKey: entry.contentKey,
    family: "question",
    state: "absent",
  };
}

/** Joins one body entry with the item owned by its physical source. */
const inspectQuestionEntry = Effect.fn("AksaraPublisher.inspectQuestionEntry")(
  function* (
    checkoutRoot: string,
    rendererManifest: RendererManifestEnvelope,
    entry: QuestionEntry,
    itemsByRoot: ReturnType<typeof indexQuestionItems>
  ) {
    const item = itemsByRoot.get(entry.sourceRoot);
    if (item === undefined) {
      return yield* new QuestionItemJoinError({
        sourceRoot: entry.sourceRoot,
      });
    }
    return yield* inspectQuestionDocument(
      checkoutRoot,
      rendererManifest,
      entry,
      item
    );
  }
);

/** Streams complete result heads and only question delta transitions. */
export function planQuestionPublication<E, R>(input: {
  readonly checkoutRoot: string;
  readonly entries: readonly QuestionEntry[];
  readonly published: Stream.Stream<QuestionHead, E, R>;
  readonly rebuild?: boolean | undefined;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly scope?: PublicationScope | undefined;
  readonly sources: readonly QuestionSource[];
}): Stream.Stream<
  QuestionPublicationPlan,
  E | PlanQuestionPublicationError | QuestionItemJoinError,
  R | PlanQuestionPublicationContext
> {
  const itemsByRoot = indexQuestionItems(input.sources);
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
          itemsByRoot
        ),
      prior: priorQuestion,
      publicPath: () => undefined,
    },
    family: "question",
    ...input,
  });
}
