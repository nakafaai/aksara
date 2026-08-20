import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type PageHead,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback/spec";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { PageEntry } from "@nakafa/aksara-corpus/pages/registry";
import { type Effect, Schema, type Stream } from "effect";
import { planFamilyPublication } from "#publisher/family/plan";
import type { PublicationScopeIdentityError } from "#publisher/family/scope";
import {
  compilePageDocument,
  inspectPageDocument,
} from "#publisher/page/document";
import {
  PreparedContentTransitionSchema,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";

/** One delta transition, desired result head, or both from one page row. */
export const PagePublicationPlanSchema = Schema.Struct({
  record: Schema.optional(PreparedContentTransitionSchema),
  result: Schema.optional(PageHeadSchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(
      (plan) => plan.record !== undefined || plan.result !== undefined
    )
  )
);
export type PagePublicationPlan = typeof PagePublicationPlanSchema.Type;

type PlanPagePublicationError =
  | Effect.Error<ReturnType<typeof compilePageDocument>>
  | Effect.Error<ReturnType<typeof inspectPageDocument>>
  | PublicationScopeIdentityError;

type PlanPagePublicationContext =
  | Effect.Services<ReturnType<typeof compilePageDocument>>
  | Effect.Services<ReturnType<typeof inspectPageDocument>>;

/** Derives one complete page head from a newly compiled upsert. */
function makePageHead(record: PreparedContentUpsert): PageHead {
  const { change, payload, projection } = record;
  return PageHeadSchema.make({
    artifactHash: change.artifactHash,
    artifactLocale: change.artifactLocale,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "page",
    projectionHash: hashContentProjection(projection),
    publicPath: projectionPublicPath(projection),
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
}

/** Preserves one existing public page head for authenticated rollback. */
function priorPage(head: PageHead): RollbackSnapshotState {
  return { head, state: "page" };
}

/** Proves one newly authored public page head had no prior active state. */
function absentPage(entry: PageEntry): RollbackSnapshotState {
  return {
    artifactLocale: entry.route.artifactLocale,
    contentKey: entry.route.contentKey,
    family: "page",
    state: "absent",
  };
}

/** Streams complete result heads and only public page delta transitions. */
export function planPagePublication<E, R>(input: {
  readonly checkoutRoot: string;
  readonly entries: readonly PageEntry[];
  readonly published: Stream.Stream<PageHead, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly scope?: PublicationScope | undefined;
}): Stream.Stream<
  PagePublicationPlan,
  E | PlanPagePublicationError,
  R | PlanPagePublicationContext
> {
  return planFamilyPublication({
    adapter: {
      absent: absentPage,
      compile: compilePageDocument,
      head: makePageHead,
      identity: (entry) => entry.route,
      inspect: inspectPageDocument,
      prior: priorPage,
      publicPath: (entry) => entry.route.publicPath,
    },
    family: "page",
    ...input,
  });
}
