import { Schema } from "effect";

import { SignedContentArtifactSchema } from "#contracts/content";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
  SignedTryoutHistoryMigrationPlanSchema,
  SignedTryoutHistoryMigrationReceiptSchema,
} from "#contracts/migration/tryout/history/spec";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import { TryoutCatalogRecordSchema } from "#contracts/tryout/catalog";
import { TryoutPlacementRecordSchema } from "#contracts/tryout/placement";
import { SignedTryoutRuntimeBundleSchema } from "#contracts/tryout/runtime/spec";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";

const MIGRATION_OPERATION = "migrateTryoutHistory";

/**
 * Deletes this protocol and every caller only after the authenticated receipt
 * is persisted externally, the server reports cleaned, and every legacy or
 * temporary row is proven absent. The contraction then deletes its receipt row.
 */
export const TRYOUT_HISTORY_MIGRATION_REMOVAL_GATE =
  "external-receipt-cleaned-server-zero-legacy-or-temporary-rows";
const NonNegativeIndexSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
const SourcePageIndexSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(-1))
);

/** Maximum historical artifacts transferred in one bounded request. */
export const MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS = 8;

/** Maximum historical or converted rows transferred in one request. */
export const MAX_TRYOUT_HISTORY_MIGRATION_ROWS = 64;

const ArtifactHashListSchema = Schema.NonEmptyArray(Sha256HashSchema).pipe(
  Schema.check(Schema.isMaxLength(MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS)),
  Schema.check(
    Schema.makeFilter((hashes) => new Set(hashes).size === hashes.length, {
      message: "Expected unique historical artifact hashes.",
    })
  )
);

const RequestIdentityFields = {
  operation: Schema.Literal(MIGRATION_OPERATION),
  releaseId: ReleaseIdSchema,
};

/** Reads the authenticated aggregate source inventory without user identity. */
export const TryoutHistoryMigrationSourceRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("source"),
});

/** Creates the invisible staging ledger for one exact source snapshot. */
export const TryoutHistoryMigrationInitializeRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("initialize"),
  sourceSnapshotId: Sha256HashSchema,
});

/** Reads one deterministic bounded page of authenticated retained rows. */
export const TryoutHistoryMigrationRowPageRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  afterIndex: SourcePageIndexSchema,
  command: Schema.Literal("rowPage"),
  rowKind: Schema.Literals(["catalog", "placement"]),
  sourceSnapshotId: Sha256HashSchema,
});

/** Reads exact old artifacts only after their hashes came from retained rows. */
export const TryoutHistoryMigrationArtifactBatchRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  artifactHashes: ArtifactHashListSchema,
  command: Schema.Literal("artifactBatch"),
  sourceSnapshotId: Sha256HashSchema,
});

/** One lossless old-to-current signed-artifact conversion. */
export const TryoutHistoryMigrationArtifactMappingSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  index: NonNegativeIndexSchema,
  oldArtifactHash: Sha256HashSchema,
});
export type TryoutHistoryMigrationArtifactMapping =
  typeof TryoutHistoryMigrationArtifactMappingSchema.Type;

/** Stages a bounded batch of authenticated current artifacts and mappings. */
export const TryoutHistoryMigrationStageArtifactsRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("stageArtifacts"),
  mappings: Schema.NonEmptyArray(
    TryoutHistoryMigrationArtifactMappingSchema
  ).pipe(
    Schema.check(Schema.isMaxLength(MAX_TRYOUT_HISTORY_MIGRATION_ARTIFACTS))
  ),
  sourceSnapshotId: Sha256HashSchema,
});

const CatalogMappingSchema = Schema.Struct({
  index: NonNegativeIndexSchema,
  oldRowHash: Sha256HashSchema,
  record: TryoutCatalogRecordSchema,
  rowKind: Schema.Literal("catalog"),
});
const PlacementMappingSchema = Schema.Struct({
  index: NonNegativeIndexSchema,
  oldRowHash: Sha256HashSchema,
  record: TryoutPlacementRecordSchema,
  rowKind: Schema.Literal("placement"),
});

/** One exact old-row to current-row conversion and target index. */
export const TryoutHistoryMigrationRowMappingSchema = Schema.Union([
  CatalogMappingSchema,
  PlacementMappingSchema,
]);
export type TryoutHistoryMigrationRowMapping =
  typeof TryoutHistoryMigrationRowMappingSchema.Type;

/** Stages a bounded batch of authenticated current snapshot rows. */
export const TryoutHistoryMigrationStageRowsRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("stageRows"),
  mappings: Schema.NonEmptyArray(TryoutHistoryMigrationRowMappingSchema).pipe(
    Schema.check(Schema.isMaxLength(MAX_TRYOUT_HISTORY_MIGRATION_ROWS))
  ),
  sourceSnapshotId: Sha256HashSchema,
  targetSnapshotId: Sha256HashSchema,
});

/** Stages the content-addressed current snapshot before plan authorization. */
export const TryoutHistoryMigrationStageSnapshotRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("stageSnapshot"),
  snapshot: TryoutSnapshotSchema,
  sourceSnapshotId: Sha256HashSchema,
});

/** Stages the active-key bundle that permanently owns the converted bytes. */
export const TryoutHistoryMigrationStageBundleRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  bundle: SignedTryoutRuntimeBundleSchema,
  command: Schema.Literal("stageBundle"),
  rendererManifest: RendererManifestEnvelopeSchema,
  sourceSnapshotId: Sha256HashSchema,
});

/** Sends the signed authorization only after every target byte is staged. */
export const TryoutHistoryMigrationStagePlanRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("stagePlan"),
  plan: SignedTryoutHistoryMigrationPlanSchema,
});

/** Runs or resumes the one-attempt-per-transaction migration to completion. */
export const TryoutHistoryMigrationRunRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("run"),
});

/** Persists the signed terminal receipt before any legacy byte is removed. */
export const TryoutHistoryMigrationSealRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("seal"),
  receipt: SignedTryoutHistoryMigrationReceiptSchema,
});

/** Deletes one bounded legacy page under the persisted signed receipt. */
export const TryoutHistoryMigrationCleanupRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("cleanup"),
  receipt: SignedTryoutHistoryMigrationReceiptSchema,
});

/** Reads aggregate staging or completion evidence without user identity. */
export const TryoutHistoryMigrationStatusRequestSchema = Schema.Struct({
  ...RequestIdentityFields,
  command: Schema.Literal("status"),
});

/** Complete temporary migration request vocabulary. */
export const TryoutHistoryMigrationRequestSchema = Schema.Union([
  TryoutHistoryMigrationSourceRequestSchema,
  TryoutHistoryMigrationInitializeRequestSchema,
  TryoutHistoryMigrationRowPageRequestSchema,
  TryoutHistoryMigrationArtifactBatchRequestSchema,
  TryoutHistoryMigrationStageArtifactsRequestSchema,
  TryoutHistoryMigrationStageRowsRequestSchema,
  TryoutHistoryMigrationStageSnapshotRequestSchema,
  TryoutHistoryMigrationStageBundleRequestSchema,
  TryoutHistoryMigrationStagePlanRequestSchema,
  TryoutHistoryMigrationRunRequestSchema,
  TryoutHistoryMigrationSealRequestSchema,
  TryoutHistoryMigrationCleanupRequestSchema,
  TryoutHistoryMigrationStatusRequestSchema,
]);
export type TryoutHistoryMigrationRequest =
  typeof TryoutHistoryMigrationRequestSchema.Type;
