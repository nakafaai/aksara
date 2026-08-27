import type { Sha256Hash } from "#contracts/ids";
import type {
  SignedTryoutHistoryMigrationPlan,
  SignedTryoutHistoryMigrationReceipt,
  TryoutHistoryMigrationPlanPayload,
  TryoutHistoryMigrationReceiptPayload,
  TryoutHistoryMigrationSourceEvidence,
  TryoutHistoryMigrationTargetEvidence,
} from "#contracts/migration/tryout/history/spec";
import {
  TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
} from "#contracts/migration/tryout/history/spec";

/** Signature domain separating migration plans from all publication objects. */
export const TRYOUT_HISTORY_MIGRATION_PLAN_SIGNATURE_DOMAIN =
  "nakafa.aksara.tryout-history-migration-plan";

/** Signature domain separating migration receipts from authorization plans. */
export const TRYOUT_HISTORY_MIGRATION_RECEIPT_SIGNATURE_DOMAIN =
  "nakafa.aksara.tryout-history-migration-receipt";

/** Serializes one exact retained-history source inventory. */
function migrationSourceFacts(source: TryoutHistoryMigrationSourceEvidence) {
  return {
    artifactCount: source.artifactCount,
    attempts: {
      attemptCount: source.attempts.attemptCount,
      digest: source.attempts.digest,
      frozenPlacementCount: source.attempts.frozenPlacementCount,
      progressCount: source.attempts.progressCount,
      responseCount: source.attempts.responseCount,
      scoreCount: source.attempts.scoreCount,
      sectionAttemptCount: source.attempts.sectionAttemptCount,
    },
    catalogRowCount: source.catalogRowCount,
    creatingReleaseId: source.creatingReleaseId,
    legacyBundleCount: source.legacyBundleCount,
    placementRowCount: source.placementRowCount,
    releases: source.releases.map(
      ({ attemptCount, manifestHash, releaseId }) => ({
        attemptCount,
        manifestHash,
        releaseId,
      })
    ),
    rendererManifestHash: source.rendererManifestHash,
    runtimeBundleCount: source.runtimeBundleCount,
    scales: {
      digest: source.scales.digest,
      itemCount: source.scales.itemCount,
      runCount: source.scales.runCount,
      versionCount: source.scales.versionCount,
    },
    snapshot: {
      catalogDigest: source.snapshot.catalogDigest,
      counts: source.snapshot.counts,
      format: source.snapshot.format,
      locales: source.snapshot.locales,
      placementCount: source.snapshot.placementCount,
      placementDigest: source.snapshot.placementDigest,
      routeCount: source.snapshot.routeCount,
      snapshotId: source.snapshot.snapshotId,
    },
  };
}

/** Serializes one exact retained-history source inventory. */
export function canonicalizeTryoutHistoryMigrationSourceEvidence(
  source: TryoutHistoryMigrationSourceEvidence
) {
  return JSON.stringify(migrationSourceFacts(source));
}

/** Serializes one current target with exact map and bundle identities. */
function migrationTargetFacts(target: TryoutHistoryMigrationTargetEvidence) {
  return {
    artifacts: target.artifacts,
    bundleHash: target.bundleHash,
    catalog: target.catalog,
    placements: target.placements,
    snapshot: {
      activeAppLocales: target.snapshot.activeAppLocales,
      catalogDigest: target.snapshot.catalogDigest,
      counts: target.snapshot.counts,
      format: target.snapshot.format,
      placementCount: target.snapshot.placementCount,
      placementDigest: target.snapshot.placementDigest,
      routeCount: target.snapshot.routeCount,
      snapshotId: target.snapshot.snapshotId,
    },
  };
}

/** Serializes one exact converted target and all map evidence. */
export function canonicalizeTryoutHistoryMigrationTargetEvidence(
  target: TryoutHistoryMigrationTargetEvidence
) {
  return JSON.stringify(migrationTargetFacts(target));
}

/** Serializes every plan fact in one stable field order. */
export function canonicalizeTryoutHistoryMigrationPlanPayload(
  payload: TryoutHistoryMigrationPlanPayload
) {
  return JSON.stringify({
    format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
    migrationId: payload.migrationId,
    source: migrationSourceFacts(payload.source),
    target: migrationTargetFacts(payload.target),
  });
}

/** Returns the domain-separated plan bytes covered by Ed25519. */
export function canonicalizeTryoutHistoryMigrationPlanSigningInput(
  planHash: Sha256Hash,
  payload: TryoutHistoryMigrationPlanPayload
) {
  return `${TRYOUT_HISTORY_MIGRATION_PLAN_SIGNATURE_DOMAIN}\n${planHash}\n${canonicalizeTryoutHistoryMigrationPlanPayload(payload)}`;
}

/** Serializes one complete signed migration plan in stable wire order. */
export function canonicalizeSignedTryoutHistoryMigrationPlan(
  plan: SignedTryoutHistoryMigrationPlan
) {
  return JSON.stringify({
    keyId: plan.keyId,
    payload: {
      format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
      migrationId: plan.payload.migrationId,
      source: migrationSourceFacts(plan.payload.source),
      target: migrationTargetFacts(plan.payload.target),
    },
    planHash: plan.planHash,
    signature: plan.signature,
  });
}

/** Serializes every public-safe completion fact in stable field order. */
export function canonicalizeTryoutHistoryMigrationReceiptPayload(
  payload: TryoutHistoryMigrationReceiptPayload
) {
  return JSON.stringify({
    completion: {
      cleanupLimit: payload.completion.cleanupLimit,
      completedAt: payload.completion.completedAt,
      migratedAttempts: payload.completion.migratedAttempts,
      migratedScaleItems: payload.completion.migratedScaleItems,
      migratedScaleRuns: payload.completion.migratedScaleRuns,
      migratedScaleVersions: payload.completion.migratedScaleVersions,
      remainingMarkers: payload.completion.remainingMarkers,
    },
    format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
    migrationId: payload.migrationId,
    planHash: payload.planHash,
    sourceSnapshotId: payload.sourceSnapshotId,
    targetBundleHash: payload.targetBundleHash,
    targetSnapshotId: payload.targetSnapshotId,
  });
}

/** Returns the domain-separated receipt bytes covered by Ed25519. */
export function canonicalizeTryoutHistoryMigrationReceiptSigningInput(
  receiptHash: Sha256Hash,
  payload: TryoutHistoryMigrationReceiptPayload
) {
  return `${TRYOUT_HISTORY_MIGRATION_RECEIPT_SIGNATURE_DOMAIN}\n${receiptHash}\n${canonicalizeTryoutHistoryMigrationReceiptPayload(payload)}`;
}

/** Serializes one complete signed terminal receipt in stable wire order. */
export function canonicalizeSignedTryoutHistoryMigrationReceipt(
  receipt: SignedTryoutHistoryMigrationReceipt
) {
  return JSON.stringify({
    keyId: receipt.keyId,
    payload: {
      completion: {
        cleanupLimit: receipt.payload.completion.cleanupLimit,
        completedAt: receipt.payload.completion.completedAt,
        migratedAttempts: receipt.payload.completion.migratedAttempts,
        migratedScaleItems: receipt.payload.completion.migratedScaleItems,
        migratedScaleRuns: receipt.payload.completion.migratedScaleRuns,
        migratedScaleVersions: receipt.payload.completion.migratedScaleVersions,
        remainingMarkers: receipt.payload.completion.remainingMarkers,
      },
      format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
      migrationId: receipt.payload.migrationId,
      planHash: receipt.payload.planHash,
      sourceSnapshotId: receipt.payload.sourceSnapshotId,
      targetBundleHash: receipt.payload.targetBundleHash,
      targetSnapshotId: receipt.payload.targetSnapshotId,
    },
    receiptHash: receipt.receiptHash,
    signature: receipt.signature,
  });
}
