import { Schema } from "effect";
import {
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
  type RollbackContentReleaseBundle,
} from "#contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import {
  hasSameContentSnapshots,
  invertContentSnapshots,
  snapshotRowCount,
} from "#contracts/release/snapshot";
import { PublicationReceiptSchema } from "#contracts/release/spec";

/** Checks terminal receipt counts against its signed immutable manifest. */
function hasBoundCompletedReceipt(input: {
  readonly receipt: typeof PublicationReceiptSchema.Type;
  readonly release: ContentReleaseBundle["release"];
}) {
  const { manifest } = input.release;
  const { receipt } = input;
  return (
    receipt.releaseId === manifest.releaseId &&
    receipt.manifestHash === input.release.manifestHash &&
    receipt.stagedArtifacts === manifest.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount &&
    receipt.projectionDigest === manifest.projectionDigest &&
    receipt.resultCount === manifest.resultCount &&
    receipt.resultDigest === manifest.resultDigest &&
    receipt.routeDigest === manifest.routeDigest &&
    receipt.stagedRoutes === manifest.routeCount &&
    hasSameContentSnapshots(receipt.snapshots, manifest.snapshots) &&
    receipt.stagedSnapshotRows === snapshotRowCount(manifest.snapshots)
  );
}

/** Exact active release retained for base selection and crash recovery. */
export const ActiveContentReleaseSchema = Schema.extend(
  ContentReleaseBundleSchema,
  Schema.Struct({ receipt: PublicationReceiptSchema })
).pipe(
  Schema.filter(hasBoundCompletedReceipt, {
    message: () =>
      "Expected the active receipt to match its signed release manifest.",
  })
);
export type ActiveContentRelease = typeof ActiveContentReleaseSchema.Type;

/** Completed active release known to carry rollback provenance. */
export type ActiveRollbackContentRelease = ActiveContentRelease &
  RollbackContentReleaseBundle;

/** Historical terminal release accepted only when it is a rollback. */
export const ActiveRollbackContentReleaseSchema =
  ActiveContentReleaseSchema.pipe(
    Schema.filter(
      (release): release is ActiveRollbackContentRelease =>
        release.release.manifest.origin.kind === "rollback",
      { message: () => "Expected a completed rollback release." }
    )
  );

const StagedReleasePhaseSchema = Schema.Literal(
  "staging",
  "verifying",
  "verified",
  "aborting"
);

/** Exact durable release bundle currently owning one invisible slot. */
export const StagedContentReleaseSchema = Schema.extend(
  ContentReleaseBundleSchema,
  Schema.Struct({ phase: StagedReleasePhaseSchema })
);
export type StagedContentRelease = typeof StagedContentReleaseSchema.Type;

/** Invisible staged release known to carry rollback provenance. */
export type StagedRollbackContentRelease = StagedContentRelease &
  RollbackContentReleaseBundle;

/** Candidate recovery slot accepted only when it contains a rollback. */
export const StagedRollbackContentReleaseSchema =
  StagedContentReleaseSchema.pipe(
    Schema.filter(
      (release): release is StagedRollbackContentRelease =>
        release.release.manifest.origin.kind === "rollback",
      { message: () => "Expected a staged rollback release." }
    )
  );

/** Checks the candidate and retained inverse against their exact bases. */
function hasCoherentCurrentState(input: {
  readonly active: ActiveContentRelease | null;
  readonly candidate: StagedContentRelease | null;
  readonly recovery: StagedRollbackContentRelease | null;
}) {
  const activeReleaseId = input.active?.release.manifest.releaseId ?? null;
  const activeManifestHash = input.active?.release.manifestHash ?? null;
  const activeResultCount = input.active?.release.manifest.resultCount ?? 0;
  const activeResultDigest =
    input.active?.release.manifest.resultDigest ?? EMPTY_RESULT_CATALOG_DIGEST;
  if (input.candidate !== null) {
    const { manifest } = input.candidate.release;
    if (
      activeReleaseId !== manifest.baseReleaseId ||
      activeManifestHash !== manifest.baseManifestHash ||
      activeResultCount !== manifest.baseResultCount ||
      activeResultDigest !== manifest.baseResultDigest
    ) {
      return false;
    }
  }
  if (input.recovery === null) {
    return true;
  }
  const target = input.candidate ?? input.active;
  if (target === null) {
    return false;
  }
  const pairedCandidate = input.candidate !== null;
  if (
    pairedCandidate &&
    (input.candidate.phase !== "verified" ||
      input.recovery.phase === "aborting")
  ) {
    return false;
  }
  if (
    !pairedCandidate &&
    input.recovery.phase !== "verified" &&
    input.recovery.phase !== "aborting"
  ) {
    return false;
  }
  const { manifest } = input.recovery.release;
  const targetManifest = target.release.manifest;
  return (
    manifest.origin.releaseId === targetManifest.releaseId &&
    manifest.baseReleaseId === targetManifest.releaseId &&
    manifest.baseManifestHash === target.release.manifestHash &&
    manifest.baseResultCount === targetManifest.resultCount &&
    manifest.baseResultDigest === targetManifest.resultDigest &&
    manifest.resultCount === targetManifest.baseResultCount &&
    manifest.resultDigest === targetManifest.baseResultDigest &&
    manifest.releaseId !== activeReleaseId &&
    hasSameContentSnapshots(
      manifest.snapshots,
      invertContentSnapshots(targetManifest.snapshots)
    ) &&
    input.recovery.rendererManifest.hash === target.rendererManifest.hash
  );
}

/** Authoritative singleton publication state used before release preparation. */
export const ContentReleaseCurrentSchema = Schema.Struct({
  active: Schema.NullOr(ActiveContentReleaseSchema),
  candidate: Schema.NullOr(StagedContentReleaseSchema),
  recovery: Schema.NullOr(StagedRollbackContentReleaseSchema),
}).pipe(
  Schema.filter(hasCoherentCurrentState, {
    message: () =>
      "Expected active, candidate, and recovery identities to be coherent.",
  })
);
export type ContentReleaseCurrent = typeof ContentReleaseCurrentSchema.Type;

/** Historical recovery lookup used for crash-safe terminal replay. */
export const RecoveryLookupSchema = Schema.Union(
  Schema.Struct({ kind: Schema.Literal("missing") }),
  Schema.Struct({
    kind: Schema.Literal("completed"),
    value: ActiveRollbackContentReleaseSchema,
  })
);
export type RecoveryLookup = typeof RecoveryLookupSchema.Type;
