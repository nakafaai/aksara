import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { invertContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";

import { prepareContentRelease } from "#publisher/preparation";
import {
  makePreparedRollbackRelease,
  type PreparedGitRelease,
} from "#publisher/preparation/spec";
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
} from "#test/snapshot";

/** Prepares one body release that replaces the exact real program catalog. */
async function prepareProgramRelease() {
  const snapshot = await makeProgramSnapshotFixture();
  const prepared = await Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
      baseManifestHash: null,
      baseReleaseId: null,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      previousSnapshots: null,
      records: () => Stream.make(record),
      releaseId: ReleaseIdSchema.make("test-program-snapshot"),
      rendererManifest,
      result: () => Stream.make(head),
      routes: () =>
        Stream.make({
          current: {
            contentKey: contentRecord.change.contentKey,
            locale: contentRecord.change.locale,
          },
          next: {
            contentKey: contentRecord.change.contentKey,
            locale: contentRecord.change.locale,
            publicPath: projection.publicPath,
          },
        }),
      scope: { ...publicationScope, snapshots: ["program"] },
      snapshotManifests: snapshot.snapshotManifests,
      snapshotRows: snapshot.snapshotRows,
    })
  );
  return { prepared, snapshot };
}

/** Builds the row-free snapshot inverse of one structured Git release. */
function prepareSnapshotRollback(source: PreparedGitRelease<unknown, never>) {
  const baseReleaseId = source.manifest.releaseId;
  const manifest = ContentReleaseManifestSchema.make({
    ...source.manifest,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    baseReleaseId,
    baseResultCount: source.manifest.resultCount,
    baseResultDigest: source.manifest.resultDigest,
    origin: { kind: "rollback", releaseId: baseReleaseId },
    releaseId: ReleaseIdSchema.make("test-program-rollback"),
    snapshots: invertContentSnapshots(source.manifest.snapshots),
  });
  return makePreparedRollbackRelease({
    artifacts: () => Stream.empty,
    items: source.items,
    manifest,
    projections: source.projections,
    rendererManifest: source.rendererManifest,
    routes: source.routes,
    ...emptySnapshotSources,
  });
}

const programRelease = await prepareProgramRelease();

describe("publication snapshots", () => {
  it("verifies Git snapshot sources and row-free rollback snapshots", async () => {
    const { prepared, snapshot } = programRelease;
    const gitSummary = await Effect.runPromise(
      verifyPublicationSnapshots(prepared)
    );
    const rollback = prepareSnapshotRollback(prepared);
    const rollbackSummary = await Effect.runPromise(
      verifyPublicationSnapshots(rollback)
    );

    expect(gitSummary).toEqual({
      snapshots: snapshot.snapshots,
      stagedRows: snapshot.snapshot.manifest.rowCount,
    });
    expect(rollbackSummary).toEqual({
      snapshots: rollback.manifest.snapshots,
      stagedRows: 0,
    });
  });

  it("rejects row-bearing rollback sources", async () => {
    const { prepared, snapshot } = programRelease;
    const rollback = prepareSnapshotRollback(prepared);
    const invalid = makePreparedRollbackRelease({
      ...rollback,
      snapshotManifests: snapshot.snapshotManifests,
    });
    const error = await Effect.runPromise(
      verifyPublicationSnapshots(invalid).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "ReleaseVerificationMismatchError",
      message: "Rollback releases cannot stage replacement snapshot rows.",
    });
  });

  it("stages one manifest before its bounded exact row batch", async () => {
    const { prepared, snapshot } = programRelease;
    const requests = Chunk.toReadonlyArray(
      await Effect.runPromise(
        makeSnapshotRequests(prepared).pipe(Stream.runCollect)
      )
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
  });
});
