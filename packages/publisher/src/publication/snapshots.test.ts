import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { invertContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot";
import { Effect, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";

import { prepareContentRelease } from "#publisher/preparation";
import {
  makePreparedRollbackRelease,
  type PreparedGitRelease,
} from "#publisher/preparation/spec";
import {
  stagePublicationSnapshots,
  verifyPublicationSnapshots,
} from "#publisher/publication/snapshots";
import type { PublicationTarget } from "#publisher/publication/spec";
import {
  contentRecord,
  head,
  projection,
  record,
  rendererManifest,
} from "#test/publication";
import {
  emptySnapshotSources,
  makeProgramSnapshotFixture,
} from "#test/snapshot";
import { makePublicationTarget } from "#test/target";

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
      snapshotManifests: snapshot.snapshotManifests,
      snapshotRows: snapshot.snapshotRows,
    })
  );
  return { prepared, snapshot };
}

/** Builds the zero-copy inverse of one structured Git release. */
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

describe("publication snapshots", () => {
  it("verifies exact Git replacement sources and zero-copy rollback", async () => {
    const { prepared, snapshot } = await prepareProgramRelease();
    const gitSummary = await Effect.runPromise(
      verifyPublicationSnapshots(prepared)
    );
    const rollback = prepareSnapshotRollback(prepared);
    const rollbackSummary = await Effect.runPromise(
      verifyPublicationSnapshots(rollback)
    );

    expect(gitSummary).toEqual({
      snapshots: snapshot.snapshots,
      stagedRows: 6,
    });
    expect(rollbackSummary).toEqual({
      snapshots: rollback.manifest.snapshots,
      stagedRows: 0,
    });
  });

  it("rejects row-bearing rollback sources", async () => {
    const { prepared, snapshot } = await prepareProgramRelease();
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
    const { prepared, snapshot } = await prepareProgramRelease();
    const calls: string[] = [];
    let stagedRows = 0;
    const stageSnapshot = vi.fn(() =>
      Effect.sync(() => {
        calls.push("manifest");
      })
    );
    const stageSnapshotBatch = vi.fn(
      (
        batch: Parameters<
          (typeof PublicationTarget.Service)["stageSnapshotBatch"]
        >[0]
      ) =>
        Effect.sync(() => {
          calls.push("batch");
          stagedRows = batch.rows.length;
        })
    );
    const target = makePublicationTarget({
      stageSnapshot,
      stageSnapshotBatch,
    });

    await Effect.runPromise(stagePublicationSnapshots(prepared, target));

    expect(calls).toEqual(["manifest", "batch"]);
    expect(stageSnapshot).toHaveBeenCalledWith({
      releaseId: prepared.manifest.releaseId,
      snapshot: snapshot.snapshot,
    });
    expect(stageSnapshotBatch).toHaveBeenCalledWith(
      expect.objectContaining({
        batchIndex: 0,
        family: "program",
        releaseId: prepared.manifest.releaseId,
        rows: expect.arrayContaining([
          expect.objectContaining({ family: "program" }),
        ]),
        snapshotId: snapshot.snapshot.manifest.snapshotId,
      })
    );
    expect(stagedRows).toBe(6);
  });
});
