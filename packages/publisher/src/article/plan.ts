import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type ArticleHead,
  ArticleHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { ArticleEntry } from "@nakafa/aksara-corpus/articles/registry";
import { type Effect, Schema, type Stream } from "effect";
import {
  compileArticleDocument,
  inspectArticleDocument,
} from "#publisher/article/document";
import { planFamilyPublication } from "#publisher/family/plan";
import {
  PreparedContentTransitionSchema,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";

/** One delta transition, desired result head, or both from one article row. */
export const ArticlePublicationPlanSchema = Schema.Struct({
  record: Schema.optional(PreparedContentTransitionSchema),
  result: Schema.optional(ArticleHeadSchema),
}).pipe(
  Schema.filter(
    (plan) => plan.record !== undefined || plan.result !== undefined
  )
);
export type ArticlePublicationPlan = typeof ArticlePublicationPlanSchema.Type;

type PlanArticlePublicationError =
  | Effect.Effect.Error<ReturnType<typeof compileArticleDocument>>
  | Effect.Effect.Error<ReturnType<typeof inspectArticleDocument>>;

type PlanArticlePublicationContext =
  | Effect.Effect.Context<ReturnType<typeof compileArticleDocument>>
  | Effect.Effect.Context<ReturnType<typeof inspectArticleDocument>>;

/** Derives one complete article head from a newly compiled upsert. */
function makeArticleHead(record: PreparedContentUpsert): ArticleHead {
  const { change, payload, projection } = record;
  return ArticleHeadSchema.make({
    artifactHash: change.artifactHash,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "article",
    locale: change.locale,
    projectionHash: hashContentProjection(projection),
    publicPath: projectionPublicPath(projection),
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
}

/** Preserves one existing article head for authenticated rollback. */
function priorArticle(head: ArticleHead): RollbackSnapshotState {
  return { head, state: "article" };
}

/** Proves one newly authored article head had no prior active state. */
function absentArticle(entry: ArticleEntry): RollbackSnapshotState {
  return {
    contentKey: entry.route.contentKey,
    family: "article",
    locale: entry.route.locale,
    state: "absent",
  };
}

/** Streams complete result heads and only article delta transitions. */
export function planArticlePublication<E, R>(input: {
  readonly checkoutRoot: string;
  readonly entries: readonly ArticleEntry[];
  readonly published: Stream.Stream<ArticleHead, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
}): Stream.Stream<
  ArticlePublicationPlan,
  E | PlanArticlePublicationError,
  R | PlanArticlePublicationContext
> {
  return planFamilyPublication({
    adapter: {
      absent: absentArticle,
      compile: compileArticleDocument,
      head: makeArticleHead,
      identity: (entry) => entry.route,
      inspect: inspectArticleDocument,
      prior: priorArticle,
      publicPath: (entry) => entry.route.publicPath,
    },
    ...input,
  });
}
