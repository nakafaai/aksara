import {
  canonicalizeSignedContentArtifact as canonicalizeRetainedSignedContentArtifact,
  SignedContentArtifactSchema as RetainedSignedContentArtifactSchema,
} from "@nakafa/aksara-retained/content";
import {
  ReleaseVerificationEvidenceSchema as RetainedReleaseVerificationEvidenceSchema,
  ReleaseVerificationStatusSchema as RetainedReleaseVerificationStatusSchema,
  SignedContentReleaseSchema as RetainedSignedContentReleaseSchema,
} from "@nakafa/aksara-retained/release";
import {
  ActiveContentReleaseSchema as RetainedActiveContentReleaseSchema,
  ActiveRollbackContentReleaseSchema as RetainedActiveRollbackContentReleaseSchema,
  RecoveryLookupSchema as RetainedRecoveryLookupSchema,
} from "@nakafa/aksara-retained/release/current/evidence";
import {
  StagedContentReleaseSchema as RetainedStagedContentReleaseSchema,
  StagedRollbackContentReleaseSchema as RetainedStagedRollbackContentReleaseSchema,
} from "@nakafa/aksara-retained/release/current/state";
import { ContentReleaseBundleSchema as RetainedContentReleaseBundleSchema } from "@nakafa/aksara-retained/release/lifecycle";
import { RendererManifestEnvelopeSchema as RetainedRendererManifestEnvelopeSchema } from "@nakafa/aksara-retained/renderer/contract";
import { Schema } from "effect";
import {
  SignedContentArtifactSchema as CurrentSignedContentArtifactSchema,
  canonicalizeSignedContentArtifact as canonicalizeCurrentSignedContentArtifact,
} from "#contracts/content";
import { ContentKeySchema } from "#contracts/ids";
import { canonicalizeContentProjection } from "#contracts/projection/spec";
import { canonicalizeContentChange } from "#contracts/release/canonical";
import {
  ActiveContentReleaseSchema as CurrentActiveContentReleaseSchema,
  ActiveRollbackContentReleaseSchema as CurrentActiveRollbackContentReleaseSchema,
  RecoveryLookupSchema as CurrentRecoveryLookupSchema,
} from "#contracts/release/current/evidence";
import {
  ContentReleaseCurrentSchema as CurrentContentReleaseCurrentSchema,
  StagedContentReleaseSchema as CurrentStagedContentReleaseSchema,
  StagedRollbackContentReleaseSchema as CurrentStagedRollbackContentReleaseSchema,
} from "#contracts/release/current/state";
import { ContentReleaseBundleSchema as CurrentContentReleaseBundleSchema } from "#contracts/release/lifecycle";
import {
  RollbackDeleteStateSchema as CurrentRollbackDeleteStateSchema,
  RollbackPageSchema as CurrentRollbackPageSchema,
  RollbackRecordSchema as CurrentRollbackRecordSchema,
  RollbackUpsertStateSchema as CurrentRollbackUpsertStateSchema,
  MAX_ROLLBACK_PAGE_RECORDS,
} from "#contracts/release/rollback/spec";
import {
  ReleaseVerificationEvidenceSchema as CurrentReleaseVerificationEvidenceSchema,
  ReleaseVerificationStatusSchema as CurrentReleaseVerificationStatusSchema,
  SignedContentReleaseSchema as CurrentSignedContentReleaseSchema,
} from "#contracts/release/spec";
import { RendererComponentNameSchema } from "#contracts/renderer/component";
import { RendererManifestEnvelopeSchema as CurrentRendererManifestEnvelopeSchema } from "#contracts/renderer/contract";

/** Temporary exact signed schemas for the bounded renderer adoption. */
export const SignedContentArtifactSchema = Schema.Union([
  CurrentSignedContentArtifactSchema,
  RetainedSignedContentArtifactSchema,
]);
export type SignedContentArtifact = typeof SignedContentArtifactSchema.Type;
export const SignedContentReleaseSchema = Schema.Union([
  CurrentSignedContentReleaseSchema,
  RetainedSignedContentReleaseSchema,
]);
export type SignedContentRelease = typeof SignedContentReleaseSchema.Type;
export const RendererManifestEnvelopeSchema = Schema.Union([
  CurrentRendererManifestEnvelopeSchema,
  RetainedRendererManifestEnvelopeSchema,
]);
export type RendererManifestEnvelope =
  typeof RendererManifestEnvelopeSchema.Type;
export const ReleaseVerificationEvidenceSchema = Schema.Union([
  CurrentReleaseVerificationEvidenceSchema,
  RetainedReleaseVerificationEvidenceSchema,
]);
export type ReleaseVerificationEvidence =
  typeof ReleaseVerificationEvidenceSchema.Type;
export const ReleaseVerificationStatusSchema = Schema.Union([
  CurrentReleaseVerificationStatusSchema,
  RetainedReleaseVerificationStatusSchema,
]);
export type ReleaseVerificationStatus =
  typeof ReleaseVerificationStatusSchema.Type;

/** Original retained bundles and new bundles keep their published exact shape. */
export const ContentReleaseBundleSchema = Schema.Union([
  CurrentContentReleaseBundleSchema,
  RetainedContentReleaseBundleSchema,
]);
export type ContentReleaseBundle = typeof ContentReleaseBundleSchema.Type;
export const ActiveContentReleaseSchema = Schema.Union([
  CurrentActiveContentReleaseSchema,
  RetainedActiveContentReleaseSchema,
]);
export type ActiveContentRelease = typeof ActiveContentReleaseSchema.Type;
export const ActiveRollbackContentReleaseSchema = Schema.Union([
  CurrentActiveRollbackContentReleaseSchema,
  RetainedActiveRollbackContentReleaseSchema,
]);
export type ActiveRollbackContentRelease =
  typeof ActiveRollbackContentReleaseSchema.Type;
export const StagedContentReleaseSchema = Schema.Union([
  CurrentStagedContentReleaseSchema,
  RetainedStagedContentReleaseSchema,
]);
export type StagedContentRelease = typeof StagedContentReleaseSchema.Type;
export const StagedRollbackContentReleaseSchema = Schema.Union([
  CurrentStagedRollbackContentReleaseSchema,
  RetainedStagedRollbackContentReleaseSchema,
]);
export type StagedRollbackContentRelease =
  typeof StagedRollbackContentReleaseSchema.Type;
export const RecoveryLookupSchema = Schema.Union([
  CurrentRecoveryLookupSchema,
  RetainedRecoveryLookupSchema,
]);
export type RecoveryLookup = typeof RecoveryLookupSchema.Type;

/** Reuses the authoritative identity checks across independently signed slots. */
export const ContentReleaseCurrentSchema =
  CurrentContentReleaseCurrentSchema.mapFields(
    (fields) => ({
      ...fields,
      active: Schema.NullOr(ActiveContentReleaseSchema),
      candidate: Schema.NullOr(StagedContentReleaseSchema),
      recovery: Schema.NullOr(StagedRollbackContentReleaseSchema),
    }),
    { unsafePreserveChecks: true }
  );
export type ContentReleaseCurrent = typeof ContentReleaseCurrentSchema.Type;

/** An inverse carries the original artifact, never a re-signed projection. */
export const RollbackUpsertStateSchema =
  CurrentRollbackUpsertStateSchema.mapFields(
    (fields) => ({ ...fields, artifact: SignedContentArtifactSchema }),
    { unsafePreserveChecks: true }
  );
export type RollbackUpsertState = typeof RollbackUpsertStateSchema.Type;
export const RollbackStateSchema = Schema.Union([
  RollbackUpsertStateSchema,
  CurrentRollbackDeleteStateSchema,
]);
export type RollbackState = typeof RollbackStateSchema.Type;
export const RollbackRecordSchema = CurrentRollbackRecordSchema.mapFields(
  (fields) => ({
    ...fields,
    current: RollbackStateSchema,
    prior: RollbackStateSchema,
  }),
  { unsafePreserveChecks: true }
);
export type RollbackRecord = typeof RollbackRecordSchema.Type;
export const RollbackPageSchema = CurrentRollbackPageSchema.mapFields(
  (fields) => ({
    ...fields,
    records: Schema.Array(RollbackRecordSchema).check(
      Schema.isMaxLength(MAX_ROLLBACK_PAGE_RECORDS)
    ),
  }),
  { unsafePreserveChecks: true }
);
export type RollbackPage = typeof RollbackPageSchema.Type;

/** Selects the exact published canonicalizer without altering signed fields. */
export function canonicalizeSignedContentArtifact(
  artifact: SignedContentArtifact
) {
  if (Schema.is(CurrentSignedContentArtifactSchema)(artifact)) {
    return canonicalizeCurrentSignedContentArtifact(artifact);
  }
  return canonicalizeRetainedSignedContentArtifact(artifact);
}

/** Narrows one complete retained inverse state to its immutable signed body. */
export function isRollbackUpsert(
  state: RollbackState
): state is RollbackUpsertState {
  return "artifact" in state;
}

/** Preserves the original artifact serializer inside the unchanged page wire. */
function canonicalizeRollbackState(state: RollbackState) {
  const change = JSON.stringify(canonicalizeContentChange(state.change));
  if (!isRollbackUpsert(state)) {
    return `{"change":${change}}`;
  }
  return `{"artifact":${canonicalizeSignedContentArtifact(state.artifact)},"change":${change},"projection":${canonicalizeContentProjection(state.projection)}}`;
}

/** Serializes both independently retained sides of an exact inverse record. */
export function canonicalizeRollbackRecord(record: RollbackRecord) {
  return `{"current":${canonicalizeRollbackState(record.current)},"index":${record.index},"prior":${canonicalizeRollbackState(record.prior)}}`;
}

/** Keeps the existing rollback byte ceiling applicable to mixed signed bodies. */
export function canonicalizeRollbackPage(page: RollbackPage) {
  return `{"done":${page.done},"nextIndex":${page.nextIndex},"records":[${page.records.map(canonicalizeRollbackRecord).join(",")}],"rollbackOfManifestHash":${JSON.stringify(page.rollbackOfManifestHash)},"rollbackOf":${JSON.stringify(page.rollbackOf)},"total":${page.total}}`;
}

/** Authenticated retained code requests an unsupported internal capability. */
export class RetainedRendererComponentUnsupportedError extends Schema.TaggedError<RetainedRendererComponentUnsupportedError>()(
  "RetainedRendererComponentUnsupportedError",
  {
    componentName: RendererComponentNameSchema,
    contentKey: ContentKeySchema,
    version: Schema.Finite,
  }
) {}
