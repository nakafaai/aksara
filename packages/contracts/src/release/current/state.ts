import { Schema } from "effect";

import {
  type ActiveContentRelease,
  ActiveContentReleaseSchema,
  hasSameAppLocales,
} from "#contracts/release/current/evidence";
import { hasCurrentTryoutRuntimeBundle } from "#contracts/release/current/runtime";
import {
  ContentReleaseBundleSchema,
  type RollbackContentReleaseBundle,
} from "#contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import {
  hasSameContentSnapshots,
  invertContentSnapshots,
} from "#contracts/release/snapshot/spec";
import { SignedTryoutRuntimeBundleSchema } from "#contracts/tryout/runtime/spec";

const TryoutRuntimeBundleSchema = Schema.NullOr(
  SignedTryoutRuntimeBundleSchema
);

const StagedReleasePhaseSchema = Schema.Literals([
  "staging",
  "verifying",
  "verified",
  "aborting",
]);

/** Exact durable release bundle currently owning one invisible slot. */
export const StagedContentReleaseSchema = ContentReleaseBundleSchema.mapFields(
  (fields) => ({ ...fields, phase: StagedReleasePhaseSchema }),
  { unsafePreserveChecks: true }
);
export type StagedContentRelease = typeof StagedContentReleaseSchema.Type;

/** Invisible staged release known to carry rollback provenance. */
export type StagedRollbackContentRelease = StagedContentRelease &
  RollbackContentReleaseBundle;

/** Candidate recovery slot accepted only when it contains a rollback. */
export const StagedRollbackContentReleaseSchema =
  StagedContentReleaseSchema.pipe(
    Schema.refine(
      (release): release is StagedRollbackContentRelease =>
        release.release.manifest.origin.kind === "rollback",
      { message: "Expected a staged rollback release." }
    )
  );

/** Checks one candidate against its exact active base or genesis identity. */
function hasCoherentCandidate(
  active: ActiveContentRelease | null,
  candidate: StagedContentRelease | null
) {
  if (candidate === null) {
    return true;
  }
  const { manifest } = candidate.release;
  if (active === null) {
    return (
      manifest.baseReleaseId === null &&
      manifest.baseManifestHash === null &&
      manifest.baseActiveAppLocales === null &&
      manifest.baseResultCount === 0 &&
      manifest.baseResultDigest === EMPTY_RESULT_CATALOG_DIGEST
    );
  }
  const activeManifest = active.release.manifest;
  return (
    activeManifest.releaseId === manifest.baseReleaseId &&
    active.release.manifestHash === manifest.baseManifestHash &&
    activeManifest.resultCount === manifest.baseResultCount &&
    activeManifest.resultDigest === manifest.baseResultDigest &&
    manifest.baseActiveAppLocales !== null &&
    hasSameAppLocales(
      activeManifest.activeAppLocales,
      manifest.baseActiveAppLocales
    )
  );
}

/** Checks one retained inverse against the candidate or active target it restores. */
function hasCoherentRecovery(input: {
  readonly active: ActiveContentRelease | null;
  readonly candidate: StagedContentRelease | null;
  readonly recovery: StagedRollbackContentRelease | null;
}) {
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
  const restoredActiveAppLocales =
    targetManifest.baseActiveAppLocales ?? targetManifest.activeAppLocales;
  return (
    manifest.origin.releaseId === targetManifest.releaseId &&
    manifest.baseReleaseId === targetManifest.releaseId &&
    manifest.baseManifestHash === target.release.manifestHash &&
    manifest.baseResultCount === targetManifest.resultCount &&
    manifest.baseResultDigest === targetManifest.resultDigest &&
    manifest.baseActiveAppLocales !== null &&
    hasSameAppLocales(
      manifest.baseActiveAppLocales,
      targetManifest.activeAppLocales
    ) &&
    manifest.resultCount === targetManifest.baseResultCount &&
    manifest.resultDigest === targetManifest.baseResultDigest &&
    hasSameAppLocales(manifest.activeAppLocales, restoredActiveAppLocales) &&
    manifest.releaseId !== input.active?.release.manifest.releaseId &&
    hasSameContentSnapshots(
      manifest.snapshots,
      invertContentSnapshots(targetManifest.snapshots)
    ) &&
    input.recovery.rendererManifest.hash === target.rendererManifest.hash
  );
}

/** Checks the candidate and retained inverse against their exact bases. */
function hasCoherentCurrentState(input: {
  readonly active: ActiveContentRelease | null;
  readonly candidate: StagedContentRelease | null;
  readonly recovery: StagedRollbackContentRelease | null;
  readonly tryoutRuntimeBundle:
    | typeof SignedTryoutRuntimeBundleSchema.Type
    | null;
}) {
  return (
    hasCoherentCandidate(input.active, input.candidate) &&
    hasCoherentRecovery(input) &&
    hasCurrentTryoutRuntimeBundle(input.active, input.tryoutRuntimeBundle)
  );
}

/** Authoritative singleton publication state used before release preparation. */
export const ContentReleaseCurrentSchema = Schema.Struct({
  active: Schema.NullOr(ActiveContentReleaseSchema),
  candidate: Schema.NullOr(StagedContentReleaseSchema),
  recovery: Schema.NullOr(StagedRollbackContentReleaseSchema),
  tryoutRuntimeBundle: TryoutRuntimeBundleSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentCurrentState, {
      message:
        "Expected active, candidate, and recovery identities to be coherent.",
    })
  )
);
export type ContentReleaseCurrent = typeof ContentReleaseCurrentSchema.Type;
