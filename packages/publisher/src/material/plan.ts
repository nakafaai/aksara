import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type MaterialHead,
  MaterialHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { RollbackSnapshotState } from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { MaterialEntry } from "@nakafa/aksara-corpus/material/registry";
import { type Effect, Schema, type Stream } from "effect";
import { planFamilyPublication } from "#publisher/family/plan";
import {
  compileMaterialDocument,
  inspectMaterialDocument,
} from "#publisher/material/document";
import {
  PreparedContentTransitionSchema,
  type PreparedContentUpsert,
} from "#publisher/preparation/spec";

/** One delta transition, desired result head, or both from one material row. */
export const MaterialPublicationPlanSchema = Schema.Struct({
  record: Schema.optional(PreparedContentTransitionSchema),
  result: Schema.optional(MaterialHeadSchema),
}).pipe(
  Schema.filter(
    (plan) => plan.record !== undefined || plan.result !== undefined
  )
);
export type MaterialPublicationPlan = typeof MaterialPublicationPlanSchema.Type;

type PlanMaterialPublicationError =
  | Effect.Effect.Error<ReturnType<typeof compileMaterialDocument>>
  | Effect.Effect.Error<ReturnType<typeof inspectMaterialDocument>>;

type PlanMaterialPublicationContext =
  | Effect.Effect.Context<ReturnType<typeof compileMaterialDocument>>
  | Effect.Effect.Context<ReturnType<typeof inspectMaterialDocument>>;

/** Derives one complete material head from a newly compiled upsert. */
function makeMaterialHead(record: PreparedContentUpsert): MaterialHead {
  const { change, payload, projection } = record;
  return MaterialHeadSchema.make({
    artifactHash: change.artifactHash,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "material",
    locale: change.locale,
    projectionHash: hashContentProjection(projection),
    publicPath: projectionPublicPath(projection),
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
}

/** Preserves one existing material head for authenticated rollback. */
function priorMaterial(head: MaterialHead): RollbackSnapshotState {
  return { head, state: "material" };
}

/** Proves one newly authored material head had no prior active state. */
function absentMaterial(entry: MaterialEntry): RollbackSnapshotState {
  return {
    contentKey: entry.route.contentKey,
    family: "material",
    locale: entry.route.locale,
    state: "absent",
  };
}

/** Streams complete result heads and only material delta transitions. */
export function planMaterialPublication<E, R>(input: {
  readonly checkoutRoot: string;
  readonly entries: readonly MaterialEntry[];
  readonly published: Stream.Stream<MaterialHead, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
}): Stream.Stream<
  MaterialPublicationPlan,
  E | PlanMaterialPublicationError,
  R | PlanMaterialPublicationContext
> {
  return planFamilyPublication({
    adapter: {
      absent: absentMaterial,
      compile: compileMaterialDocument,
      head: makeMaterialHead,
      identity: (entry) => entry.route,
      inspect: inspectMaterialDocument,
      prior: priorMaterial,
      publicPath: (entry) => entry.route.publicPath,
    },
    ...input,
  });
}
