import { describe, expect, it } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  type TryoutHistoryMigrationSource,
  TryoutHistoryMigrationSourceSchema,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import { Effect, Schema } from "effect";

import { makeArtifactRequirements } from "#publisher/migration/tryout/artifact";
import { convertTryoutRows } from "#publisher/migration/tryout/row";
import {
  convertHistoricalRenderer,
  migrationSourceEvidence,
  prepareTryoutMigrationTarget,
} from "#publisher/migration/tryout/target";
import { convertedArtifacts } from "#test/migration/converted";
import {
  convertedArtifactMaps,
  convertedArtifactSpool,
  historicalRows,
} from "#test/migration/rows";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { historicalRenderer, historicalSource } from "#test/migration/source";
import {
  makeInternalTarget,
  makeMigrationTarget,
} from "#test/migration/target";

const otherHash = Sha256HashSchema.make(`sha256:${"0".repeat(64)}`);

/** Strictly decodes one structurally valid but cross-inconsistent source. */
function decodeSource(input: unknown) {
  return Schema.decodeUnknownSync(TryoutHistoryMigrationSourceSchema)(input, {
    onExcessProperty: "error",
  });
}

/** Returns the migration reason without hiding an unexpected failure tag. */
function failureReason(failure: { readonly _tag: string }) {
  return failure._tag === "TryoutHistoryMigrationError" && "reason" in failure
    ? failure.reason
    : failure._tag;
}

describe("try-out history migration target", () => {
  it.effect("recomputes and signs exact permanent target evidence", () =>
    Effect.gen(function* () {
      const { prepared, source } = yield* makeMigrationTarget();
      const verified = yield* verifySignedTryoutRuntimeBundle({
        bundle: prepared.bundle,
        rendererManifest: prepared.rendererManifest,
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      expect(prepared.evidence).toMatchObject({
        artifacts: { count: 2 },
        bundleHash: verified.bundleHash,
        catalog: { count: 1 },
        placements: { count: 1 },
        snapshot: {
          counts: { country: 1, exam: 0, section: 0, set: 0, track: 0 },
          placementCount: 1,
          routeCount: 1,
        },
      });
      expect(verified.payload).toMatchObject({
        rendererManifestHash: prepared.rendererManifest.hash,
        sourceGitSha: "a".repeat(40),
        sourceManifestHash: source.releases[0]?.release.manifestHash,
        sourceReleaseId: "retained-migration-release",
      });
      expect(migrationSourceEvidence(source)).toBe(source.evidence);
    })
  );

  it.effect(
    "excludes internal hierarchy nodes from public route evidence",
    () =>
      Effect.gen(function* () {
        const prepared = yield* makeInternalTarget(otherHash);

        expect(prepared.evidence.snapshot.counts.section).toBe(1);
        expect(prepared.evidence.snapshot.routeCount).toBe(1);
      })
  );

  it.effect(
    "rejects a retained renderer outside the current exact schema",
    () =>
      convertHistoricalRenderer({
        ...historicalRenderer,
        hash: otherHash,
      }).pipe(
        Effect.flip,
        Effect.map((failure) =>
          expect(failureReason(failure)).toBe("renderer-conversion")
        )
      )
  );

  it.effect("rejects target map, count, and route drift", () =>
    Effect.gen(function* () {
      const requirements = yield* makeArtifactRequirements(
        historicalRows,
        convertedArtifacts.length
      );
      const rows = yield* convertTryoutRows(
        historicalRows,
        requirements,
        convertedArtifactSpool()
      );
      const rendererManifest =
        yield* convertHistoricalRenderer(historicalRenderer);
      /** Prepares one drifted source against otherwise canonical target facts. */
      const prepare = (
        source: TryoutHistoryMigrationSource,
        artifacts = convertedArtifactMaps
      ) =>
        prepareTryoutMigrationTarget({
          artifacts,
          rendererManifest,
          rows,
          signer: migrationSigner,
          source,
        });
      const sources = [
        decodeSource({
          ...historicalSource,
          evidence: {
            ...historicalSource.evidence,
            snapshot: {
              ...historicalSource.evidence.snapshot,
              counts: {
                ...historicalSource.evidence.snapshot.counts,
                country: 2,
              },
            },
          },
        }),
        decodeSource({
          ...historicalSource,
          evidence: {
            ...historicalSource.evidence,
            snapshot: {
              ...historicalSource.evidence.snapshot,
              placementCount: 2,
            },
          },
        }),
        decodeSource({
          ...historicalSource,
          evidence: {
            ...historicalSource.evidence,
            snapshot: {
              ...historicalSource.evidence.snapshot,
              routeCount: 2,
            },
          },
        }),
      ];
      const failures = yield* Effect.forEach(sources, (source) =>
        prepare(source).pipe(Effect.flip)
      );
      const map = yield* prepare(
        historicalSource,
        convertedArtifactMaps.map((artifact) => ({
          ...artifact,
          index: -1,
        }))
      ).pipe(Effect.flip);

      expect(failures.map(failureReason)).toEqual([
        "target-evidence",
        "target-evidence",
        "target-evidence",
      ]);
      expect(failureReason(map)).toBe("target-evidence");
    })
  );

  it.effect("rejects every creating-release provenance mismatch", () =>
    Effect.gen(function* () {
      const retained = historicalSource.releases.at(0);
      const binding = historicalSource.evidence.releases.at(0);
      if (retained === undefined || binding === undefined) {
        return yield* Effect.die("Expected retained release provenance.");
      }
      const otherReleaseId = ReleaseIdSchema.make("other-release");
      const sources = [
        decodeSource({
          ...historicalSource,
          releases: [
            {
              ...retained,
              release: {
                ...retained.release,
                manifest: {
                  ...retained.release.manifest,
                  releaseId: otherReleaseId,
                },
              },
            },
          ],
        }),
        decodeSource({
          ...historicalSource,
          evidence: {
            ...historicalSource.evidence,
            releases: [{ ...binding, releaseId: otherReleaseId }],
          },
        }),
        decodeSource({
          ...historicalSource,
          releases: [{ ...retained, attemptCount: 2 }],
        }),
        decodeSource({
          ...historicalSource,
          releases: [
            {
              ...retained,
              release: { ...retained.release, manifestHash: otherHash },
            },
          ],
        }),
        decodeSource({
          ...historicalSource,
          evidence: {
            ...historicalSource.evidence,
            rendererManifestHash: otherHash,
          },
        }),
        decodeSource({
          ...historicalSource,
          releases: [
            {
              ...retained,
              release: {
                ...retained.release,
                manifest: {
                  ...retained.release.manifest,
                  rendererManifestHash: otherHash,
                },
              },
            },
          ],
        }),
        decodeSource({
          ...historicalSource,
          releases: [
            {
              ...retained,
              release: {
                ...retained.release,
                manifest: {
                  ...retained.release.manifest,
                  snapshots: {
                    ...retained.release.manifest.snapshots,
                    tryout: {
                      ...retained.release.manifest.snapshots.tryout,
                      resultSnapshotId: otherHash,
                    },
                  },
                },
              },
            },
          ],
        }),
      ];
      const failures = yield* Effect.forEach(sources, (source) =>
        makeMigrationTarget(source).pipe(Effect.flip)
      );

      expect(failures.map(failureReason)).toEqual(
        Array.from({ length: sources.length }, () => "provenance")
      );
    })
  );
});
