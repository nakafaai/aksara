import { Schema } from "effect";

import { HistoricalSignedContentArtifactSchema } from "#contracts/history/artifact-spec";
import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import { HistoricalRendererManifestSchema } from "#contracts/history/renderer";
import { HistoricalTryoutRowSchema } from "#contracts/history/tryout-row";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
  TryoutRuntimeAdoptionReceiptSchema,
  TryoutRuntimeAdoptionSourceSchema,
} from "#contracts/migration/tryout/history/adoption/spec";
import {
  SignedTryoutHistoryMigrationReceiptSchema,
  TryoutHistoryMigrationCompletionSchema,
  TryoutHistoryMigrationSourceEvidenceSchema,
} from "#contracts/migration/tryout/history/spec";

const NonNegativeCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
const StageCounts = {
  created: NonNegativeCountSchema,
  unchanged: NonNegativeCountSchema,
};
const ResponseIdentityFields = { migrationId: ReleaseIdSchema };

/** One authenticated old release exposed without any attempt identity. */
export const TryoutHistoryMigrationSourceReleaseSchema = Schema.Struct({
  attemptCount: NonNegativeCountSchema,
  release: HistoricalSignedContentReleaseSchema,
});

/** Complete source material required for an offline lossless conversion. */
export const TryoutHistoryMigrationSourceSchema = Schema.Struct({
  adoptions: Schema.Array(TryoutRuntimeAdoptionSourceSchema),
  evidence: TryoutHistoryMigrationSourceEvidenceSchema,
  releases: Schema.NonEmptyArray(TryoutHistoryMigrationSourceReleaseSchema),
  rendererManifest: HistoricalRendererManifestSchema,
});
export type TryoutHistoryMigrationSource =
  typeof TryoutHistoryMigrationSourceSchema.Type;

const MigrationStatusFields = {
  artifactMapCount: NonNegativeCountSchema,
  catalogMapCount: NonNegativeCountSchema,
  migrationId: ReleaseIdSchema,
  placementMapCount: NonNegativeCountSchema,
  sourceSnapshotId: Sha256HashSchema,
};
const MigrationAuthorizationFields = {
  planHash: Sha256HashSchema,
  targetBundleHash: Sha256HashSchema,
  targetSnapshotId: Sha256HashSchema,
};

/** Staging exposes only identities that are already complete and coherent. */
export const TryoutHistoryMigrationStagingStatusSchema = Schema.Struct({
  ...MigrationStatusFields,
  phase: Schema.Literal("staging"),
});

/** Bounded staging cleanup that no longer accepts target writes. */
export const TryoutHistoryMigrationAbortingStatusSchema = Schema.Struct({
  ...MigrationStatusFields,
  deleted: NonNegativeCountSchema,
  phase: Schema.Literal("aborting"),
});

/** Complete signed authorization awaiting or undergoing mutation. */
export const TryoutHistoryMigrationReadyStatusSchema = Schema.Struct({
  ...MigrationStatusFields,
  ...MigrationAuthorizationFields,
  phase: Schema.Literal("ready"),
});
export const TryoutHistoryMigrationRunningStatusSchema = Schema.Struct({
  ...MigrationStatusFields,
  ...MigrationAuthorizationFields,
  phase: Schema.Literal("running"),
});
export const TryoutHistoryMigrationRunnableStatusSchema = Schema.Union([
  TryoutHistoryMigrationReadyStatusSchema,
  TryoutHistoryMigrationRunningStatusSchema,
]);

/** Terminal database evidence awaiting a publisher-signed receipt. */
export const TryoutHistoryMigrationCompletedStatusSchema = Schema.Struct({
  ...MigrationStatusFields,
  ...MigrationAuthorizationFields,
  completion: TryoutHistoryMigrationCompletionSchema,
  phase: Schema.Literal("completed"),
});

/** Persisted terminal receipt that now authorizes bounded legacy cleanup. */
export const TryoutHistoryMigrationSealedStatusSchema = Schema.Struct({
  ...MigrationStatusFields,
  ...MigrationAuthorizationFields,
  completion: TryoutHistoryMigrationCompletionSchema,
  phase: Schema.Literal("sealed"),
  receipt: SignedTryoutHistoryMigrationReceiptSchema,
});

/** Permanent receipt after the temporary root and every legacy row are gone. */
export const TryoutHistoryMigrationCleanedStatusSchema = Schema.Struct({
  migrationId: ReleaseIdSchema,
  phase: Schema.Literal("cleaned"),
  receipt: SignedTryoutHistoryMigrationReceiptSchema,
});

/** Every valid migration phase as a state-specific contract. */
export const TryoutHistoryMigrationStatusSchema = Schema.Union([
  TryoutHistoryMigrationStagingStatusSchema,
  TryoutHistoryMigrationAbortingStatusSchema,
  TryoutHistoryMigrationRunnableStatusSchema,
  TryoutHistoryMigrationCompletedStatusSchema,
  TryoutHistoryMigrationSealedStatusSchema,
  TryoutHistoryMigrationCleanedStatusSchema,
]);
export type TryoutHistoryMigrationStatus =
  typeof TryoutHistoryMigrationStatusSchema.Type;

const SourceValueSchema = Schema.Struct({
  command: Schema.Literal("source"),
  ...ResponseIdentityFields,
  source: TryoutHistoryMigrationSourceSchema,
});
const InitializeValueSchema = Schema.Struct({
  command: Schema.Literal("initialize"),
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});
const AbortValueSchema = Schema.Struct({
  command: Schema.Literal("abort"),
  deleted: NonNegativeCountSchema,
  done: Schema.Boolean,
  ...ResponseIdentityFields,
});
const HistoricalRowEntrySchema = Schema.Struct({
  index: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  row: HistoricalTryoutRowSchema,
});
const RowPageValueSchema = Schema.Struct({
  command: Schema.Literal("rowPage"),
  isDone: Schema.Boolean,
  nextIndex: Schema.NullOr(Schema.Int),
  ...ResponseIdentityFields,
  rowKind: Schema.Literals(["catalog", "placement"]),
  rows: Schema.Array(HistoricalRowEntrySchema),
});
const ArtifactBatchValueSchema = Schema.Struct({
  artifacts: Schema.Array(HistoricalSignedContentArtifactSchema),
  command: Schema.Literal("artifactBatch"),
  ...ResponseIdentityFields,
});
const StageArtifactsValueSchema = Schema.Struct({
  ...StageCounts,
  command: Schema.Literal("stageArtifacts"),
  ...ResponseIdentityFields,
});
const StageRowsValueSchema = Schema.Struct({
  ...StageCounts,
  command: Schema.Literal("stageRows"),
  ...ResponseIdentityFields,
});
const StageSnapshotValueSchema = Schema.Struct({
  ...StageCounts,
  command: Schema.Literal("stageSnapshot"),
  ...ResponseIdentityFields,
  snapshotId: Sha256HashSchema,
});
const StageBundleValueSchema = Schema.Struct({
  ...StageCounts,
  bundleHash: Sha256HashSchema,
  command: Schema.Literal("stageBundle"),
  ...ResponseIdentityFields,
  rendererManifestHash: Sha256HashSchema,
  snapshotId: Sha256HashSchema,
});
const AdoptBundleValueSchema = Schema.Struct({
  command: Schema.Literal("adoptBundle"),
  ...ResponseIdentityFields,
  receipt: TryoutRuntimeAdoptionReceiptSchema,
});
const StagePlanValueSchema = Schema.Struct({
  command: Schema.Literal("stagePlan"),
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});
const RunValueSchema = Schema.Struct({
  command: Schema.Literal("run"),
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});
const SealValueSchema = Schema.Struct({
  command: Schema.Literal("seal"),
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});
const CleanupValueSchema = Schema.Struct({
  command: Schema.Literal("cleanup"),
  deleted: NonNegativeCountSchema,
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});
const StatusValueSchema = Schema.Struct({
  command: Schema.Literal("status"),
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});

/** Command-specific value returned by the temporary migration operation. */
export const TryoutHistoryMigrationValueSchema = Schema.Union([
  SourceValueSchema,
  InitializeValueSchema,
  AbortValueSchema,
  AdoptBundleValueSchema,
  RowPageValueSchema,
  ArtifactBatchValueSchema,
  StageArtifactsValueSchema,
  StageRowsValueSchema,
  StageSnapshotValueSchema,
  StageBundleValueSchema,
  StagePlanValueSchema,
  RunValueSchema,
  SealValueSchema,
  CleanupValueSchema,
  StatusValueSchema,
]);
export type TryoutHistoryMigrationValue =
  typeof TryoutHistoryMigrationValueSchema.Type;

/** Successful response for one authenticated temporary migration command. */
export const TryoutHistoryMigrationSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("migrateTryoutHistory"),
  value: TryoutHistoryMigrationValueSchema,
});
