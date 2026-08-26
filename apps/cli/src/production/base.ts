import type { ActiveAppLocaleList } from "@nakafa/aksara-contracts/locale";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import {
  baseContentSnapshots,
  type ContentSnapshotSet,
  inheritContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect } from "effect";
import { RecoveryBaseMismatchError } from "#cli/recovery";

/** Immutable active catalog identity required to rebuild one candidate release. */
export interface ProductionBaseIdentity {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly manifestHash: ContentReleaseBundle["release"]["manifestHash"];
  readonly releaseId: ContentReleaseBundle["release"]["manifest"]["releaseId"];
  readonly resultCount: number;
  readonly resultDigest: ContentReleaseBundle["release"]["manifest"]["resultDigest"];
  readonly snapshots: ContentSnapshotSet;
}

/** Selects the authenticated base catalog represented by one source bundle. */
export function selectSourceBase(bundle: null): null;
/** Selects the exact identity from a present authenticated source bundle. */
export function selectSourceBase(
  bundle: ContentReleaseBundle
): ProductionBaseIdentity;
/** Selects a nullable identity when the authenticated source may be absent. */
export function selectSourceBase(
  bundle: ContentReleaseBundle | null
): ProductionBaseIdentity | null;
/** Implements nullable source selection after overload narrowing. */
export function selectSourceBase(bundle: ContentReleaseBundle | null) {
  if (bundle === null) {
    return null;
  }
  return {
    activeAppLocales: bundle.release.manifest.activeAppLocales,
    manifestHash: bundle.release.manifestHash,
    releaseId: bundle.release.manifest.releaseId,
    resultCount: bundle.release.manifest.resultCount,
    resultDigest: bundle.release.manifest.resultDigest,
    snapshots: inheritContentSnapshots(bundle.release.manifest.snapshots),
  } satisfies ProductionBaseIdentity;
}

/** Selects the authenticated base catalog frozen inside a candidate release. */
export function selectRecoveryBase(bundle: ContentReleaseBundle) {
  const { manifest } = bundle.release;
  if (
    manifest.baseActiveAppLocales === null ||
    manifest.baseReleaseId === null ||
    manifest.baseManifestHash === null
  ) {
    return null;
  }
  return {
    activeAppLocales: manifest.baseActiveAppLocales,
    manifestHash: manifest.baseManifestHash,
    releaseId: manifest.baseReleaseId,
    resultCount: manifest.baseResultCount,
    resultDigest: manifest.baseResultDigest,
    snapshots: baseContentSnapshots(manifest.snapshots),
  } satisfies ProductionBaseIdentity;
}

/** Finds the first immutable base field that differs during candidate recovery. */
function recoveryBaseMismatch(
  expected: ProductionBaseIdentity | null,
  actual: ProductionBaseIdentity | null
): RecoveryBaseMismatchError["field"] | undefined {
  if (expected === null || actual === null) {
    return expected === actual ? undefined : "presence";
  }
  if (
    JSON.stringify(expected.activeAppLocales) !==
    JSON.stringify(actual.activeAppLocales)
  ) {
    return "activeAppLocales";
  }
  if (expected.manifestHash !== actual.manifestHash) {
    return "manifestHash";
  }
  if (expected.releaseId !== actual.releaseId) {
    return "releaseId";
  }
  if (
    expected.resultCount !== actual.resultCount ||
    expected.resultDigest !== actual.resultDigest
  ) {
    return "result";
  }
  return JSON.stringify(expected.snapshots) === JSON.stringify(actual.snapshots)
    ? undefined
    : "snapshots";
}

/** Requires active target state to match the candidate's signed base identity. */
export function validateRecoveryBase(
  expected: ProductionBaseIdentity | null,
  actual: ProductionBaseIdentity | null
) {
  const field = recoveryBaseMismatch(expected, actual);
  return field === undefined
    ? Effect.void
    : Effect.fail(new RecoveryBaseMismatchError({ field }));
}
