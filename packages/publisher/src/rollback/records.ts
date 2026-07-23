import { verifySignedContentArtifactIntegrity } from "@nakafa/aksara-contracts/artifact/integrity";
import { verifySignedContentArtifact } from "@nakafa/aksara-contracts/artifact/verify";
import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  ContentProjectionSchema,
  projectionPublicPath,
} from "@nakafa/aksara-contracts/projection/spec";
import {
  ContentDeleteSchema,
  ContentReleaseItemSchema,
  ContentUpsertSchema,
} from "@nakafa/aksara-contracts/release";
import {
  isRollbackUpsert,
  type RollbackRecord,
  type RollbackSnapshotState,
} from "@nakafa/aksara-contracts/release/rollback";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Schema, Stream } from "effect";
import {
  type ReleaseArtifactMismatchError,
  validateArtifactForItem,
} from "#publisher/release-validation";

type ArtifactVerificationError = Effect.Effect.Error<
  | ReturnType<typeof verifySignedContentArtifact>
  | ReturnType<typeof verifySignedContentArtifactIntegrity>
>;

type ArtifactVerificationContext = Effect.Effect.Context<
  | ReturnType<typeof verifySignedContentArtifact>
  | ReturnType<typeof verifySignedContentArtifactIntegrity>
>;

/** Explicit authentication policy for one side of a rollback transition. */
export type RollbackArtifactPolicy =
  | { readonly kind: "integrity" }
  | {
      readonly kind: "compatible";
      readonly rendererManifest: RendererManifestEnvelope;
    };

const DerivedRollbackDeleteItemSchema = Schema.Struct({
  change: ContentDeleteSchema,
  index: ContentReleaseItemSchema.fields.index,
  releaseId: ContentReleaseItemSchema.fields.releaseId,
});

const DerivedRollbackUpsertItemSchema = Schema.Struct({
  change: ContentUpsertSchema,
  index: ContentReleaseItemSchema.fields.index,
  releaseId: ContentReleaseItemSchema.fields.releaseId,
});

/** Strict disk-replay contract for one authenticated rollback state. */
export const DerivedRollbackStateSchema = Schema.Union(
  Schema.Struct({
    item: DerivedRollbackDeleteItemSchema,
    kind: Schema.Literal("delete"),
  }),
  Schema.Struct({
    artifact: SignedContentArtifactSchema,
    item: DerivedRollbackUpsertItemSchema,
    kind: Schema.Literal("upsert"),
    projection: ContentProjectionSchema,
  })
);
export type DerivedRollbackState = typeof DerivedRollbackStateSchema.Type;

/** Current and prior full states derived from one target transition. */
export const DerivedRollbackRecordSchema = Schema.Struct({
  current: DerivedRollbackStateSchema,
  prior: DerivedRollbackStateSchema,
});
export type DerivedRollbackRecord = typeof DerivedRollbackRecordSchema.Type;

/** Authenticates one full state and binds it to its indexed release item. */
function deriveState(
  state: RollbackRecord["current"],
  index: number,
  releaseId: ReleaseId,
  policy: RollbackArtifactPolicy
) {
  if (!isRollbackUpsert(state)) {
    const item = DerivedRollbackDeleteItemSchema.make({
      change: state.change,
      index,
      releaseId,
    });
    return Effect.succeed<DerivedRollbackState>({ item, kind: "delete" });
  }
  const item = DerivedRollbackUpsertItemSchema.make({
    change: state.change,
    index,
    releaseId,
  });
  const verification =
    policy.kind === "integrity"
      ? verifySignedContentArtifactIntegrity(state.artifact)
      : verifySignedContentArtifact({
          artifact: state.artifact,
          rendererContractVersion:
            policy.rendererManifest.rendererContractVersion,
          rendererManifest: policy.rendererManifest,
        });
  return verification.pipe(
    Effect.tap((artifact) => validateArtifactForItem(item, artifact)),
    Effect.map(
      (artifact): DerivedRollbackState => ({
        artifact,
        item,
        kind: "upsert",
        projection: state.projection,
      })
    )
  );
}

/** Authenticates both sides of one target-supplied rollback transition. */
function deriveRecord(
  record: RollbackRecord,
  currentReleaseId: ReleaseId,
  priorReleaseId: ReleaseId,
  currentPolicy: RollbackArtifactPolicy,
  priorPolicy: RollbackArtifactPolicy
) {
  return Effect.all({
    current: deriveState(
      record.current,
      record.index,
      currentReleaseId,
      currentPolicy
    ),
    prior: deriveState(record.prior, record.index, priorReleaseId, priorPolicy),
  });
}

/** Replays verified state transitions without collecting artifact bodies. */
export function deriveRollbackRecords<E, R>(input: {
  readonly currentPolicy: RollbackArtifactPolicy;
  readonly currentReleaseId: ReleaseId;
  readonly priorPolicy: RollbackArtifactPolicy;
  readonly priorReleaseId: ReleaseId;
  readonly records: Stream.Stream<RollbackRecord, E, R>;
}): Stream.Stream<
  DerivedRollbackRecord,
  E | ArtifactVerificationError | ReleaseArtifactMismatchError,
  R | ArtifactVerificationContext
> {
  return input.records.pipe(
    Stream.mapEffect((record) =>
      deriveRecord(
        record,
        input.currentReleaseId,
        input.priorReleaseId,
        input.currentPolicy,
        input.priorPolicy
      )
    )
  );
}

/** Narrows one derived full state to an authenticated material upsert. */
export function isDerivedRollbackUpsert(
  state: DerivedRollbackState
): state is Extract<DerivedRollbackState, { readonly kind: "upsert" }> {
  return state.kind === "upsert";
}

/** Reconstructs the exact compact state protected by a rollback digest. */
export function snapshotRollbackState(
  state: DerivedRollbackState
): RollbackSnapshotState {
  if (!isDerivedRollbackUpsert(state)) {
    const { change } = state.item;
    return {
      contentKey: change.contentKey,
      family: change.family,
      locale: change.locale,
      state: "absent",
    };
  }
  const { change } = state.item;
  const { payload } = state.artifact;
  const head = {
    artifactHash: change.artifactHash,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    locale: change.locale,
    projectionHash: hashContentProjection(state.projection),
    publicPath: projectionPublicPath(state.projection),
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  };
  if (change.family === "article") {
    return { head: { ...head, family: "article" }, state: "article" };
  }
  if (change.family === "material") {
    return { head: { ...head, family: "material" }, state: "material" };
  }
  return { head: { ...head, family: "question" }, state: "question" };
}
