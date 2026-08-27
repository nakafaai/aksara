import { Schema } from "effect";

import { HistoricalTryoutSnapshotSchema } from "#contracts/history/tryout";
import {
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import { SignedTryoutRuntimeBundleSchema } from "#contracts/tryout/runtime/spec";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";

const NonNegativeCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

/** Stable temporary wire identity for the one retained-history migration. */
export const TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT =
  "signed-tryout-history-migration-plan";

/** Stable wire identity for the public-safe immutable migration receipt. */
export const TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT =
  "signed-tryout-history-migration-receipt";

/** One old signed release whose attempts share the retained snapshot. */
export const TryoutHistoryMigrationReleaseBindingSchema = Schema.Struct({
  attemptCount: NonNegativeCountSchema,
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
});
export type TryoutHistoryMigrationReleaseBinding =
  typeof TryoutHistoryMigrationReleaseBindingSchema.Type;

/** Aggregate attempt evidence that contains no user or attempt identities. */
export const TryoutHistoryMigrationAttemptInventorySchema = Schema.Struct({
  attemptCount: NonNegativeCountSchema,
  digest: Sha256HashSchema,
  frozenPlacementCount: NonNegativeCountSchema,
  progressCount: NonNegativeCountSchema,
  responseCount: NonNegativeCountSchema,
  scoreCount: NonNegativeCountSchema,
  sectionAttemptCount: NonNegativeCountSchema,
});
export type TryoutHistoryMigrationAttemptInventory =
  typeof TryoutHistoryMigrationAttemptInventorySchema.Type;

/** Aggregate IRT evidence without user-linked attempt or score records. */
export const TryoutHistoryMigrationScaleInventorySchema = Schema.Struct({
  digest: Sha256HashSchema,
  itemCount: NonNegativeCountSchema,
  runCount: NonNegativeCountSchema,
  versionCount: NonNegativeCountSchema,
});
export type TryoutHistoryMigrationScaleInventory =
  typeof TryoutHistoryMigrationScaleInventorySchema.Type;

/** Complete authenticated source facts bound by the migration plan. */
export const TryoutHistoryMigrationSourceEvidenceSchema = Schema.Struct({
  artifactCount: NonNegativeCountSchema,
  attempts: TryoutHistoryMigrationAttemptInventorySchema,
  catalogRowCount: NonNegativeCountSchema,
  creatingReleaseId: ReleaseIdSchema,
  placementRowCount: NonNegativeCountSchema,
  releases: Schema.NonEmptyArray(TryoutHistoryMigrationReleaseBindingSchema),
  rendererManifestHash: Sha256HashSchema,
  scales: TryoutHistoryMigrationScaleInventorySchema,
  snapshot: HistoricalTryoutSnapshotSchema,
});
export type TryoutHistoryMigrationSourceEvidence =
  typeof TryoutHistoryMigrationSourceEvidenceSchema.Type;

/** Count and digest for one complete old-to-current identity mapping. */
export const TryoutHistoryMigrationMapEvidenceSchema = Schema.Struct({
  count: NonNegativeCountSchema,
  digest: Sha256HashSchema,
});
export type TryoutHistoryMigrationMapEvidence =
  typeof TryoutHistoryMigrationMapEvidenceSchema.Type;

/** Current immutable content identities produced by the conversion. */
export const TryoutHistoryMigrationTargetEvidenceSchema = Schema.Struct({
  artifacts: TryoutHistoryMigrationMapEvidenceSchema,
  bundleHash: Sha256HashSchema,
  catalog: TryoutHistoryMigrationMapEvidenceSchema,
  placements: TryoutHistoryMigrationMapEvidenceSchema,
  snapshot: TryoutSnapshotSchema,
});
export type TryoutHistoryMigrationTargetEvidence =
  typeof TryoutHistoryMigrationTargetEvidenceSchema.Type;

/** Canonical facts covered by the operator's migration authorization. */
export const TryoutHistoryMigrationPlanPayloadSchema = Schema.Struct({
  format: Schema.Literal(TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT),
  migrationId: ReleaseIdSchema,
  source: TryoutHistoryMigrationSourceEvidenceSchema,
  target: TryoutHistoryMigrationTargetEvidenceSchema,
});
export type TryoutHistoryMigrationPlanPayload =
  typeof TryoutHistoryMigrationPlanPayloadSchema.Type;

/** Active-key signature authorizing one exact lossless history conversion. */
export const SignedTryoutHistoryMigrationPlanSchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  payload: TryoutHistoryMigrationPlanPayloadSchema,
  planHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedTryoutHistoryMigrationPlan =
  typeof SignedTryoutHistoryMigrationPlanSchema.Type;

/** Public-safe terminal counts returned after all markers are removed. */
export const TryoutHistoryMigrationCompletionSchema = Schema.Struct({
  completedAt: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  migratedAttempts: NonNegativeCountSchema,
  migratedScaleItems: NonNegativeCountSchema,
  migratedScaleRuns: NonNegativeCountSchema,
  migratedScaleVersions: NonNegativeCountSchema,
  remainingMarkers: Schema.Literal(0),
});
export type TryoutHistoryMigrationCompletion =
  typeof TryoutHistoryMigrationCompletionSchema.Type;

/** Immutable receipt facts that reveal no user or attempt identity. */
export const TryoutHistoryMigrationReceiptPayloadSchema = Schema.Struct({
  completion: TryoutHistoryMigrationCompletionSchema,
  format: Schema.Literal(TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT),
  migrationId: ReleaseIdSchema,
  planHash: Sha256HashSchema,
  sourceSnapshotId: Sha256HashSchema,
  targetBundleHash: Sha256HashSchema,
  targetSnapshotId: Sha256HashSchema,
});
export type TryoutHistoryMigrationReceiptPayload =
  typeof TryoutHistoryMigrationReceiptPayloadSchema.Type;

/** Active-key signature over the immutable public-safe completion receipt. */
export const SignedTryoutHistoryMigrationReceiptSchema = Schema.Struct({
  keyId: SigningKeyIdSchema,
  payload: TryoutHistoryMigrationReceiptPayloadSchema,
  receiptHash: Sha256HashSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedTryoutHistoryMigrationReceipt =
  typeof SignedTryoutHistoryMigrationReceiptSchema.Type;

/** Permanent bundle and renderer staged for the converted snapshot. */
export const TryoutHistoryMigrationBundleSchema = Schema.Struct({
  bundle: SignedTryoutRuntimeBundleSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
});
export type TryoutHistoryMigrationBundle =
  typeof TryoutHistoryMigrationBundleSchema.Type;
