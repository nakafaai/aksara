// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { verifyTryoutHistoryMigrationSource } from "#contracts/migration/tryout/history/source";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  migrationRelease,
  migrationResolver,
  migrationSource,
  migrationSourceFrom,
} from "#contracts/test/migration";

/** Runs source verification with the exact retained test key. */
function verify(input: typeof migrationSource) {
  return verifyTryoutHistoryMigrationSource(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, migrationResolver)
  );
}

describe("try-out history migration source", () => {
  it.effect("authenticates every retained source identity", () =>
    Effect.gen(function* () {
      expect(yield* verify(migrationSource)).toEqual(migrationSource);
    })
  );

  it.effect(
    "rejects renderer, release, and snapshot authentication failures",
    () =>
      Effect.gen(function* () {
        const foreignHash = `sha256:${"f".repeat(64)}`;
        const failures = yield* Effect.all([
          verify(
            migrationSourceFrom({
              ...migrationSource,
              rendererManifest: {
                ...migrationSource.rendererManifest,
                hash: foreignHash,
              },
            })
          ).pipe(Effect.flip),
          verify(
            migrationSourceFrom({
              ...migrationSource,
              releases: [
                {
                  ...migrationSource.releases[0],
                  release: { ...migrationRelease, manifestHash: foreignHash },
                },
              ],
            })
          ).pipe(Effect.flip),
          verify(
            migrationSourceFrom({
              ...migrationSource,
              evidence: {
                ...migrationSource.evidence,
                snapshot: {
                  ...migrationSource.evidence.snapshot,
                  snapshotId: foreignHash,
                },
              },
            })
          ).pipe(Effect.flip),
        ]);

        expect(failures.map(({ _tag }) => _tag)).toEqual([
          "StoredRendererHashMismatchError",
          "StoredReleaseHashMismatchError",
          "StoredTryoutSnapshotHashMismatchError",
        ]);
      })
  );

  it.effect("rejects every contradictory public evidence relation", () =>
    Effect.gen(function* () {
      const foreignHash = `sha256:${"e".repeat(64)}`;
      const foreignReleaseId = "retained-foreign-release";
      const cases = [
        {
          ...migrationSource,
          evidence: {
            ...migrationSource.evidence,
            rendererManifestHash: foreignHash,
          },
        },
        {
          ...migrationSource,
          evidence: {
            ...migrationSource.evidence,
            releases: [
              migrationSource.evidence.releases[0],
              migrationSource.evidence.releases[0],
            ],
          },
        },
        {
          ...migrationSource,
          evidence: {
            ...migrationSource.evidence,
            releases: [
              {
                ...migrationSource.evidence.releases[0],
                releaseId: foreignReleaseId,
              },
            ],
          },
        },
        {
          ...migrationSource,
          evidence: {
            ...migrationSource.evidence,
            attempts: {
              ...migrationSource.evidence.attempts,
              attemptCount: 3,
            },
          },
        },
        {
          ...migrationSource,
          evidence: {
            ...migrationSource.evidence,
            creatingReleaseId: foreignReleaseId,
          },
        },
        {
          ...migrationSource,
          evidence: { ...migrationSource.evidence, catalogRowCount: 2 },
        },
        {
          ...migrationSource,
          evidence: { ...migrationSource.evidence, placementRowCount: 2 },
        },
      ].map(migrationSourceFrom);
      const failures = yield* Effect.forEach(cases, (source) =>
        verify(source).pipe(Effect.flip)
      );

      expect(
        failures.map((failure) =>
          failure._tag === "TryoutHistoryMigrationSourceError"
            ? failure.reason
            : failure._tag
        )
      ).toEqual([
        "renderer",
        "release-evidence",
        "release-evidence",
        "attempt-count",
        "creating-release",
        "inventory",
        "inventory",
      ]);
    })
  );

  it.effect("rejects duplicate signed release identities", () =>
    Effect.gen(function* () {
      const duplicate = migrationSourceFrom({
        ...migrationSource,
        evidence: {
          ...migrationSource.evidence,
          attempts: {
            ...migrationSource.evidence.attempts,
            attemptCount: 4,
          },
          releases: [
            migrationSource.evidence.releases[0],
            migrationSource.evidence.releases[0],
          ],
        },
        releases: [migrationSource.releases[0], migrationSource.releases[0]],
      });
      const failure = yield* verify(duplicate).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "TryoutHistoryMigrationSourceError",
        reason: "release-evidence",
      });
    })
  );
});
