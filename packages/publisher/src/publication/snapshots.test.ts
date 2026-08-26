import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { invertContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";

import { prepareContentRelease } from "#publisher/preparation";
import {
  makePreparedRollbackRelease,
  type PreparedGitRelease,
} from "#publisher/preparation/prepared";
import {
  makeSnapshotRequests,
  verifyPublicationSnapshots,
} from "#publisher/publication/snapshots";
import {
  contentRecord,
  head,
  projection,
  publicationScope,
  record,
  rendererManifest,
} from "#test/publication";
import {
  emptySnapshotSources,
  makeProgramSnapshotFixture,
  snapshotPolicyBase,
} from "#test/snapshot";

/** Prepares one body release that replaces the exact real program catalog. */
const prepareProgramRelease = Effect.fn(
  "AksaraPublisherTest.prepareProgramRelease"
)(function* () {
  const snapshot = yield* makeProgramSnapshotFixture();
  const prepared = yield* prepareContentRelease({
    aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    records: Stream.make(record),
    releaseId: ReleaseIdSchema.make("test-program-snapshot"),
    rendererManifest,
    result: Stream.make(head),
    routes: Stream.make({
      current: {
        appLocale: projection.appLocale,
        contentKey: contentRecord.change.contentKey,
      },
      next: {
        appLocale: projection.appLocale,
        contentKey: contentRecord.change.contentKey,
        publicPath: projection.publicPath,
      },
    }),
    scope: { ...publicationScope, snapshots: ["program"] },
    snapshotManifests: snapshot.snapshotManifests,
    snapshotRows: snapshot.snapshotRows,
    tryoutRuntime: null,
    ...snapshotPolicyBase("test-program-snapshot-base"),
  });
  return { prepared, snapshot };
});

/** Builds the row-free snapshot inverse of one structured Git release. */
function prepareSnapshotRollback(source: PreparedGitRelease<unknown, never>) {
  const baseReleaseId = source.manifest.releaseId;
  const manifest = ContentReleaseManifestSchema.make({
    ...source.manifest,
    baseActiveAppLocales: source.manifest.activeAppLocales,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    baseReleaseId,
    baseResultCount: source.manifest.resultCount,
    baseResultDigest: source.manifest.resultDigest,
    origin: { kind: "rollback", releaseId: baseReleaseId },
    releaseId: ReleaseIdSchema.make("test-program-rollback"),
    snapshots: invertContentSnapshots(source.manifest.snapshots),
  });
  return makePreparedRollbackRelease({
    artifacts: Stream.empty,
    items: source.items,
    manifest,
    projections: source.projections,
    rendererManifest: source.rendererManifest,
    routes: source.routes,
    ...emptySnapshotSources,
  });
}

layer(NodeServices.layer)("publication snapshots", (it) => {
  it.effect(
    "verifies Git snapshot sources and row-free rollback snapshots",
    () =>
      Effect.gen(function* () {
        const { prepared, snapshot } = yield* prepareProgramRelease();
        const gitSummary = yield* verifyPublicationSnapshots(prepared);
        const rollback = prepareSnapshotRollback(prepared);
        const rollbackSummary = yield* verifyPublicationSnapshots(rollback);

        expect(gitSummary).toEqual({
          snapshots: snapshot.snapshots,
          stagedRows: snapshot.snapshot.manifest.rowCount,
        });
        expect(rollbackSummary).toEqual({
          snapshots: rollback.manifest.snapshots,
          stagedRows: 0,
        });
      })
  );

  it.effect("rejects row-bearing rollback sources", () =>
    Effect.gen(function* () {
      const { prepared, snapshot } = yield* prepareProgramRelease();
      const rollback = prepareSnapshotRollback(prepared);
      const invalid = makePreparedRollbackRelease({
        ...rollback,
        snapshotManifests: snapshot.snapshotManifests,
      });
      const error = yield* verifyPublicationSnapshots(invalid).pipe(
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "ReleaseVerificationMismatchError",
        message: "Rollback releases cannot stage replacement snapshot rows.",
      });
    })
  );

  it.effect("stages one manifest before its bounded exact row batch", () =>
    Effect.gen(function* () {
      const { prepared, snapshot } = yield* prepareProgramRelease();
      const requests = yield* makeSnapshotRequests(prepared).pipe(
        Stream.runCollect
      );
      const [manifest, ...batches] = requests;

      expect(manifest).toEqual({
        operation: "stageSnapshot",
        releaseId: prepared.manifest.releaseId,
        snapshot: snapshot.snapshot,
      });
      expect(batches).not.toHaveLength(0);
      expect(
        batches.every((request) => request.operation === "stageSnapshotBatch")
      ).toBe(true);
      expect(batches[0]).toEqual(
        expect.objectContaining({
          batchIndex: 0,
          family: "program",
          operation: "stageSnapshotBatch",
          releaseId: prepared.manifest.releaseId,
          rows: expect.arrayContaining([
            expect.objectContaining({ family: "program" }),
          ]),
          snapshotId: snapshot.snapshot.manifest.snapshotId,
        })
      );
      const stagedRows = batches.reduce(
        (total, request) =>
          request.operation === "stageSnapshotBatch"
            ? total + request.rows.length
            : total,
        0
      );
      expect(stagedRows).toBe(snapshot.snapshot.manifest.rowCount);
    })
  );
});
