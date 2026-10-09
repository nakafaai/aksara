import type { StageOperation } from "@nakafa/aksara-contracts/transport/group";
import type { StageTryoutRuntimeBundleInput } from "@nakafa/aksara-contracts/transport/runtime";
import { Effect, MutableList } from "effect";
import type { createLifecycleRows } from "#test/lifecycle/state";

/** Builds the observable staging writers of the durable target mock over its rows. */
export function makeStageWriters(rows: ReturnType<typeof createLifecycleRows>) {
  const stageArtifactBatch = vi.fn((batch) =>
    Effect.sync(() => rows.retainArtifacts(batch.artifacts))
  );
  const stageItemBatch = vi.fn((batch) =>
    Effect.sync(() =>
      MutableList.appendAll(rows.forRelease(batch.releaseId).items, batch.items)
    )
  );
  const stageProjectionBatch = vi.fn((batch) =>
    Effect.sync(() =>
      MutableList.appendAll(
        rows.forRelease(batch.releaseId).projections,
        batch.projections
      )
    )
  );
  const stageSnapshot = vi.fn((input) =>
    Effect.sync(() =>
      MutableList.append(
        rows.forRelease(input.releaseId).snapshots,
        input.snapshot
      )
    )
  );
  const stageSnapshotBatch = vi.fn((batch) =>
    Effect.sync(() =>
      MutableList.appendAll(
        rows.forRelease(batch.releaseId).snapshotRows,
        batch.rows
      )
    )
  );
  const stageTryoutRuntimeBundle = vi.fn(
    (_request: StageTryoutRuntimeBundleInput) => Effect.void
  );
  const stageRouteBatch = vi.fn((batch) =>
    Effect.sync(() =>
      MutableList.appendAll(
        rows.forRelease(batch.releaseId).routes,
        batch.routes
      )
    )
  );
  /** Applies one grouped operation to the observable transaction mock. */
  function stageOperation(request: StageOperation) {
    if (request.operation === "stageArtifactBatch") {
      return stageArtifactBatch(request);
    }
    if (request.operation === "stageItemBatch") {
      return stageItemBatch(request);
    }
    if ("projections" in request) {
      return stageProjectionBatch(request);
    }
    if (request.operation === "stageRouteBatch") {
      return stageRouteBatch(request);
    }
    if (request.operation === "stageSnapshot") {
      return stageSnapshot(request);
    }
    if (request.operation === "stageSnapshotBatch") {
      return stageSnapshotBatch(request);
    }
    return stageTryoutRuntimeBundle(request);
  }
  return {
    stageArtifactBatch,
    stageItemBatch,
    stageOperation,
    stageProjectionBatch,
    stageRouteBatch,
    stageSnapshot,
    stageSnapshotBatch,
    stageTryoutRuntimeBundle,
  };
}
