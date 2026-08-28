import { Effect, Schema } from "effect";

import {
  decodeStoredRelease,
  decodeStoredTryoutSnapshot,
} from "#contracts/history/read";
import { validateHistoricalRendererManifestHash } from "#contracts/history/renderer";
import { verifyTryoutRuntimeAdoptionSource } from "#contracts/migration/tryout/history/adoption/verify";
import type { TryoutHistoryMigrationSource } from "#contracts/transport/migration/tryout/response";

/** One retained-history source identity contradicts its authenticated bytes. */
export class TryoutHistoryMigrationSourceError extends Schema.TaggedError<TryoutHistoryMigrationSourceError>()(
  "TryoutHistoryMigrationSourceError",
  {
    reason: Schema.Literals([
      "attempt-count",
      "creating-release",
      "inventory",
      "release-evidence",
      "renderer",
    ]),
  }
) {}

/** Fails one retained source identity without retaining private source values. */
function sourceFail(reason: TryoutHistoryMigrationSourceError["reason"]) {
  return new TryoutHistoryMigrationSourceError({ reason });
}

/** Authenticates every retained release and its exact public evidence binding. */
const verifyReleases = Effect.fn(
  "AksaraContracts.verifyTryoutHistoryMigrationReleases"
)(function* (source: TryoutHistoryMigrationSource) {
  if (source.releases.length !== source.evidence.releases.length) {
    return yield* sourceFail("release-evidence");
  }
  const releases = yield* Effect.forEach(source.releases, (entry) =>
    decodeStoredRelease(entry.release).pipe(
      Effect.map((release) => ({ attemptCount: entry.attemptCount, release }))
    )
  );
  const releaseIds = releases.map(({ release }) => release.manifest.releaseId);
  if (new Set(releaseIds).size !== releaseIds.length) {
    return yield* sourceFail("release-evidence");
  }
  const hasExactEvidence = releases.every(
    ({ attemptCount, release }, index) => {
      const expected = source.evidence.releases[index];
      return (
        expected !== undefined &&
        attemptCount === expected.attemptCount &&
        release.manifest.releaseId === expected.releaseId &&
        release.manifestHash === expected.manifestHash &&
        release.manifest.rendererManifestHash ===
          source.evidence.rendererManifestHash &&
        release.manifest.snapshots.tryout.resultSnapshotId ===
          source.evidence.snapshot.snapshotId
      );
    }
  );
  if (!hasExactEvidence) {
    return yield* sourceFail("release-evidence");
  }
  const totalAttemptCount = releases.reduce(
    (total, release) => total + release.attemptCount,
    0
  );
  if (totalAttemptCount !== source.evidence.attempts.attemptCount) {
    return yield* sourceFail("attempt-count");
  }
  const creating = releases.filter(
    ({ release }) => release.manifest.snapshots.tryout.mode === "replace"
  );
  const [creatingRelease] = creating;
  if (
    creating.length !== 1 ||
    creatingRelease === undefined ||
    creatingRelease.release.manifest.releaseId !==
      source.evidence.creatingReleaseId ||
    creatingRelease.release.manifest.origin.kind !== "git"
  ) {
    return yield* sourceFail("creating-release");
  }
  return releases;
});

/** Reauthenticates one complete public retained-history source envelope. */
export const verifyTryoutHistoryMigrationSource = Effect.fn(
  "AksaraContracts.verifyTryoutHistoryMigrationSource"
)(function* (source: TryoutHistoryMigrationSource) {
  const rendererManifest = yield* validateHistoricalRendererManifestHash(
    source.rendererManifest
  );
  if (rendererManifest.hash !== source.evidence.rendererManifestHash) {
    return yield* sourceFail("renderer");
  }
  const snapshot = yield* decodeStoredTryoutSnapshot(source.evidence.snapshot);
  const [adoptions, releases] = yield* Effect.all([
    Effect.forEach(source.adoptions, verifyTryoutRuntimeAdoptionSource),
    verifyReleases(source),
  ]);
  const adoptionReleaseIds = adoptions.map(
    ({ release }) => release.manifest.releaseId
  );
  if (new Set(adoptionReleaseIds).size !== adoptionReleaseIds.length) {
    return yield* sourceFail("release-evidence");
  }
  const catalogRowCount = Object.values(snapshot.counts).reduce(
    (total, count) => total + count,
    0
  );
  if (
    source.evidence.catalogRowCount !== catalogRowCount ||
    source.evidence.placementRowCount !== snapshot.placementCount ||
    source.evidence.legacyBundleCount !== source.releases.length ||
    source.evidence.runtimeBundleCount !== adoptions.length
  ) {
    return yield* sourceFail("inventory");
  }
  return { ...source, adoptions, releases, rendererManifest };
});
