import {
  type ContentReleaseManifest,
  ReleaseVerificationCompleteSchema,
  type SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import {
  type ActiveContentRelease,
  ActiveRollbackContentReleaseSchema,
} from "@nakafa/aksara-contracts/release/current/evidence";
import type {
  StagedContentRelease,
  StagedRollbackContentRelease,
} from "@nakafa/aksara-contracts/release/current/state";
import type {
  ContentReleaseBundle,
  RollbackContentReleaseBundle,
} from "@nakafa/aksara-contracts/release/lifecycle";
import type {
  StageGroupInput,
  StageOperation,
} from "@nakafa/aksara-contracts/transport/group";
import type { StageTryoutRuntimeBundleInput } from "@nakafa/aksara-contracts/transport/runtime";
import { Effect, Schema } from "effect";
import { vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";
import { PublicationTargetRejectedError } from "#publisher/target/errors";
import {
  createLifecycleRows,
  releaseEvidence,
  releaseReceipt,
} from "#test/lifecycle/state";

/** Builds an observable durable target with candidate and recovery slots. */
export function makeTarget(release: {
  readonly manifest: ContentReleaseManifest;
}) {
  const bundles = new Map<string, ContentReleaseBundle>();
  const completed = new Map<string, ActiveContentRelease>();
  const phases = new Map<
    string,
    "aborted" | "completed" | "staging" | "verified"
  >();
  const rows = createLifecycleRows();
  let active: ActiveContentRelease | null = null;
  let candidate: StagedContentRelease | null = null;
  let recovery: StagedRollbackContentRelease | null = null;
  let activationTransitions = 0;
  const abortOrder: string[] = [];
  /** Records the durable identity shared by candidate and recovery staging. */
  function recordBundle(bundle: ContentReleaseBundle) {
    const { release: signed } = bundle;
    bundles.set(signed.manifest.releaseId, bundle);
    rows.forRelease(signed.manifest.releaseId);
    if (active?.release.manifest.releaseId === signed.manifest.releaseId) {
      return false;
    }
    phases.set(signed.manifest.releaseId, "staging");
    return true;
  }

  const stageRelease = vi.fn((bundle: ContentReleaseBundle) =>
    Effect.sync(() => {
      if (recordBundle(bundle)) {
        candidate = { ...bundle, phase: "staging" };
      }
    })
  );
  const stageRecovery = vi.fn((bundle: RollbackContentReleaseBundle) =>
    Effect.sync(() => {
      if (recordBundle(bundle)) {
        recovery = { ...bundle, phase: "staging" };
      }
    })
  );
  const stageArtifactBatch = vi.fn((batch) =>
    Effect.sync(() => rows.retainArtifacts(batch.artifacts))
  );
  const stageItemBatch = vi.fn((batch) =>
    Effect.sync(() =>
      rows.forRelease(batch.releaseId).items.push(...batch.items)
    )
  );
  const stageProjectionBatch = vi.fn((batch) =>
    Effect.sync(() =>
      rows.forRelease(batch.releaseId).projections.push(...batch.projections)
    )
  );
  const stageSnapshot = vi.fn((input) =>
    Effect.sync(() =>
      rows.forRelease(input.releaseId).snapshots.push(input.snapshot)
    )
  );
  const stageSnapshotBatch = vi.fn((batch) =>
    Effect.sync(() =>
      rows.forRelease(batch.releaseId).snapshotRows.push(...batch.rows)
    )
  );
  const stageTryoutRuntimeBundle = vi.fn(
    (_request: StageTryoutRuntimeBundleInput) => Effect.void
  );
  const stageRouteBatch = vi.fn((batch) =>
    Effect.sync(() =>
      rows.forRelease(batch.releaseId).routes.push(...batch.routes)
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
    if (request.operation === "stageProjectionBatch") {
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
  /** Applies one authenticated group while preserving child transaction order. */
  const stageGroup = vi.fn(({ requests }: StageGroupInput) =>
    Effect.forEach(requests, stageOperation, { discard: true })
  );
  const verify = vi.fn(
    (
      signed: SignedContentRelease
    ): ReturnType<typeof PublicationTarget.Service.verify> =>
      Effect.gen(function* () {
        if (!rows.hasRetainedArtifacts(signed.manifest.releaseId)) {
          return yield* new PublicationTargetRejectedError({
            rejection: {
              code: "CONTENT_RELEASE_MISSING",
              kind: "rejected",
              operation: "verify",
              releaseId: signed.manifest.releaseId,
            },
          });
        }
        phases.set(signed.manifest.releaseId, "verified");
        if (
          candidate?.release.manifest.releaseId === signed.manifest.releaseId
        ) {
          candidate = { ...candidate, phase: "verified" };
        }
        if (
          recovery?.release.manifest.releaseId === signed.manifest.releaseId
        ) {
          recovery = { ...recovery, phase: "verified" };
        }
        return ReleaseVerificationCompleteSchema.make({
          evidence: releaseEvidence(signed),
          phase: "verified",
        });
      })
  );
  const activate = vi.fn((signed: SignedContentRelease) =>
    Effect.gen(function* () {
      if (active?.release.manifest.releaseId !== signed.manifest.releaseId) {
        activationTransitions += 1;
      }
      const bundle = bundles.get(signed.manifest.releaseId);
      if (!bundle) {
        return yield* Effect.die(
          "Expected the staged bundle before activation."
        );
      }
      const receipt = releaseReceipt(signed);
      active = { ...bundle, receipt };
      completed.set(signed.manifest.releaseId, active);
      if (candidate?.release.manifest.releaseId === signed.manifest.releaseId) {
        candidate = null;
      }
      if (recovery?.release.manifest.releaseId === signed.manifest.releaseId) {
        recovery = null;
      }
      phases.set(signed.manifest.releaseId, "completed");
      return receipt;
    })
  );
  const abort = vi.fn(({ releaseId }) =>
    Effect.sync(() => {
      abortOrder.push(releaseId);
      const bundle = bundles.get(releaseId);
      if (recovery?.release.manifest.releaseId === releaseId) {
        recovery = null;
      }
      if (candidate?.release.manifest.releaseId === releaseId) {
        candidate = null;
      }
      phases.set(releaseId, "aborted");
      const totalItems = bundle?.release.manifest.itemCount ?? 0;
      return {
        complete: true,
        processedItems: totalItems,
        releaseId,
        totalItems,
      };
    })
  );
  const current = vi.fn(() =>
    Effect.succeed({
      active,
      candidate,
      recovery,
      tryoutRuntimeBundle: null,
    })
  );
  const target = PublicationTarget.of({
    abort,
    accept: ({ recoveryId }) =>
      Effect.sync(() => {
        abortOrder.push(recoveryId);
        const bundle = bundles.get(recoveryId);
        recovery = null;
        phases.set(recoveryId, "aborted");
        return {
          complete: true,
          processedItems: bundle?.release.manifest.itemCount ?? 0,
          releaseId: recoveryId,
          totalItems: bundle?.release.manifest.itemCount ?? 0,
        };
      }),
    activate,
    activateRecovery: activate,
    cleanup: ({ releaseId }) =>
      Effect.succeed({ complete: true, deletedArtifacts: 0, releaseId }),
    current: Effect.suspend(current),
    headPage: (request) => Effect.succeed(rows.headPage(request)),
    recovery: ({ recoveryId }) => {
      const value = completed.get(recoveryId);
      if (!value) {
        return Effect.succeed({ kind: "missing" as const });
      }
      return Effect.succeed({
        kind: "completed" as const,
        value: Schema.decodeSync(ActiveRollbackContentReleaseSchema)(value),
      });
    },
    rollbackPage: (request) => Effect.succeed(rows.rollbackPage(request)),
    routePage: (request) => Effect.succeed(rows.routePage(request)),
    stageArtifactBatch,
    stageGroup,
    stageItemBatch,
    stageProjectionBatch,
    stageRecovery,
    stageRelease,
    stageRouteBatch,
    stageSnapshot,
    stageSnapshotBatch,
    stageTryoutRuntimeBundle,
    status: ({ manifestHash, releaseId }) => {
      const phase = phases.get(releaseId) ?? "missing";
      if (phase === "completed") {
        const value = completed.get(releaseId);
        if (!value) {
          return Effect.die("Expected completed release evidence.");
        }
        return Effect.succeed({
          manifestHash,
          phase,
          receipt: value.receipt,
          releaseId,
        });
      }
      return Effect.succeed({ manifestHash, phase, releaseId });
    },
    verify,
  });

  return {
    abort,
    abortOrder,
    activate,
    /** Exposes the exact atomic transition trace for lifecycle assertions. */
    get activationTransitions() {
      return activationTransitions;
    },
    current,
    evidence: (manifestHash: SignedContentRelease["manifestHash"]) => ({
      ...releaseEvidence({ manifest: release.manifest, manifestHash }),
    }),
    retainArtifacts: rows.retainArtifacts,
    snapshot: () => ({ active, candidate, recovery }),
    stageArtifactBatch,
    stageGroup,
    stageItemBatch,
    stageProjectionBatch,
    stageRecovery,
    stageRelease,
    stageRouteBatch,
    stageSnapshot,
    stageSnapshotBatch,
    stageTryoutRuntimeBundle,
    target,
    verify,
  };
}
