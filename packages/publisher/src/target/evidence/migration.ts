import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import { MAX_TRYOUT_HISTORY_MIGRATION_ROWS } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import type { TryoutHistoryMigrationValue } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationSuccess } from "@nakafa/aksara-contracts/transport/response";
import { Match } from "effect";

type MigrationRequest = Extract<
  PublicationRequest,
  { readonly operation: "migrateTryoutHistory" }
>;
type MigrationResponse = Extract<
  PublicationSuccess,
  { readonly operation: "migrateTryoutHistory" }
>;

/** Checks a retained row page is ordered, bounded, and cursor-complete. */
function hasBoundRowPage(
  request: Extract<MigrationRequest, { readonly command: "rowPage" }>,
  value: TryoutHistoryMigrationValue
) {
  if (
    value.command !== "rowPage" ||
    value.rowKind !== request.rowKind ||
    value.rows.length > MAX_TRYOUT_HISTORY_MIGRATION_ROWS
  ) {
    return false;
  }
  for (const [offset, entry] of value.rows.entries()) {
    const previous = value.rows[offset - 1];
    const hasBoundIndex =
      offset === 0
        ? entry.index > request.afterIndex
        : previous !== undefined && entry.index === previous.index + 1;
    if (!hasBoundIndex || entry.row.rowKind !== request.rowKind) {
      return false;
    }
  }
  if (value.isDone) {
    return value.nextIndex === null;
  }
  return (
    value.rows.length === MAX_TRYOUT_HISTORY_MIGRATION_ROWS &&
    value.nextIndex === value.rows.at(-1)?.index
  );
}

/** Checks an artifact response preserves the requested hash order exactly. */
function hasBoundArtifactBatch(
  request: Extract<MigrationRequest, { readonly command: "artifactBatch" }>,
  value: TryoutHistoryMigrationValue
) {
  return (
    value.command === "artifactBatch" &&
    value.artifacts.length === request.artifactHashes.length &&
    value.artifacts.every(
      ({ artifactHash }, index) =>
        artifactHash === request.artifactHashes[index]
    )
  );
}

/** Checks a staging response accounts for every exact request item. */
function hasBoundStageCount(
  expectedCount: number,
  value: { readonly created: number; readonly unchanged: number }
) {
  return value.created + value.unchanged === expectedCount;
}

/** Checks signed-plan staging binds every permanent and source identity. */
function hasBoundPlan(
  request: Extract<MigrationRequest, { readonly command: "stagePlan" }>,
  value: TryoutHistoryMigrationValue
) {
  return (
    value.command === "stagePlan" &&
    value.status.phase === "ready" &&
    value.status.migrationId === request.releaseId &&
    value.status.planHash === request.plan.planHash &&
    value.status.sourceSnapshotId ===
      request.plan.payload.source.snapshot.snapshotId &&
    value.status.artifactMapCount ===
      request.plan.payload.target.artifacts.count &&
    value.status.catalogMapCount ===
      request.plan.payload.target.catalog.count &&
    value.status.placementMapCount ===
      request.plan.payload.target.placements.count &&
    value.status.targetBundleHash === request.plan.payload.target.bundleHash &&
    value.status.targetSnapshotId ===
      request.plan.payload.target.snapshot.snapshotId
  );
}

/** Checks receipt lifecycle responses preserve the exact signed bytes. */
function hasBoundReceipt(
  request: Extract<MigrationRequest, { readonly command: "cleanup" | "seal" }>,
  value: TryoutHistoryMigrationValue
) {
  return (
    (value.command === "cleanup" || value.command === "seal") &&
    (value.status.phase === "sealed" || value.status.phase === "cleaned") &&
    canonicalizeSignedTryoutHistoryMigrationReceipt(value.status.receipt) ===
      canonicalizeSignedTryoutHistoryMigrationReceipt(request.receipt)
  );
}

/** Binds temporary migration evidence to its exact command and identities. */
export function hasBoundMigration(
  request: MigrationRequest,
  response: MigrationResponse
) {
  const { value } = response;
  if (
    value.command !== request.command ||
    value.migrationId !== request.releaseId
  ) {
    return false;
  }
  return Match.value(request).pipe(
    Match.discriminatorsExhaustive("command")({
      artifactBatch: (exact) => hasBoundArtifactBatch(exact, value),
      cleanup: (exact) =>
        value.command === "cleanup" && hasBoundReceipt(exact, value),
      initialize: (exact) =>
        value.command === "initialize" &&
        value.status.phase === "staging" &&
        value.status.migrationId === exact.releaseId &&
        value.status.sourceSnapshotId === exact.sourceSnapshotId,
      rowPage: (exact) => hasBoundRowPage(exact, value),
      run: (exact) =>
        value.command === "run" &&
        value.status.phase === "completed" &&
        value.status.migrationId === exact.releaseId,
      seal: (exact) =>
        value.command === "seal" && hasBoundReceipt(exact, value),
      source: () => value.command === "source",
      stageArtifacts: (exact) =>
        value.command === "stageArtifacts" &&
        hasBoundStageCount(exact.mappings.length, value),
      stageBundle: (exact) =>
        value.command === "stageBundle" &&
        value.bundleHash === exact.bundle.bundleHash &&
        hasBoundStageCount(1, value),
      stagePlan: (exact) => hasBoundPlan(exact, value),
      stageRows: (exact) =>
        value.command === "stageRows" &&
        hasBoundStageCount(exact.mappings.length, value),
      stageSnapshot: (exact) =>
        value.command === "stageSnapshot" &&
        value.snapshotId === exact.snapshot.snapshotId &&
        hasBoundStageCount(1, value),
      status: (exact) =>
        value.command === "status" &&
        value.status.migrationId === exact.releaseId,
    })
  );
}
