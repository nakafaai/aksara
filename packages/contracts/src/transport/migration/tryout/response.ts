import { Schema } from "effect";

import { HistoricalSignedContentArtifactSchema } from "#contracts/history/artifact-spec";
import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import { HistoricalRendererManifestSchema } from "#contracts/history/renderer";
import { HistoricalTryoutRowSchema } from "#contracts/history/tryout-row";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
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
  evidence: TryoutHistoryMigrationSourceEvidenceSchema,
  releases: Schema.NonEmptyArray(TryoutHistoryMigrationSourceReleaseSchema),
  rendererManifest: HistoricalRendererManifestSchema,
});
export type TryoutHistoryMigrationSource =
  typeof TryoutHistoryMigrationSourceSchema.Type;

/** Aggregate durable phase for one temporary migration ledger. */
export const TryoutHistoryMigrationStatusSchema = Schema.Struct({
  artifactMapCount: NonNegativeCountSchema,
  catalogMapCount: NonNegativeCountSchema,
  completion: Schema.NullOr(TryoutHistoryMigrationCompletionSchema),
  migrationId: ReleaseIdSchema,
  phase: Schema.Literals(["staging", "ready", "running", "completed"]),
  placementMapCount: NonNegativeCountSchema,
  planHash: Schema.NullOr(Sha256HashSchema),
  sourceSnapshotId: Sha256HashSchema,
  targetBundleHash: Schema.NullOr(Sha256HashSchema),
  targetSnapshotId: Schema.NullOr(Sha256HashSchema),
});
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
const StatusValueSchema = Schema.Struct({
  command: Schema.Literal("status"),
  ...ResponseIdentityFields,
  status: TryoutHistoryMigrationStatusSchema,
});

/** Command-specific value returned by the temporary migration operation. */
export const TryoutHistoryMigrationValueSchema = Schema.Union([
  SourceValueSchema,
  InitializeValueSchema,
  RowPageValueSchema,
  ArtifactBatchValueSchema,
  StageArtifactsValueSchema,
  StageRowsValueSchema,
  StageSnapshotValueSchema,
  StageBundleValueSchema,
  StagePlanValueSchema,
  RunValueSchema,
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
