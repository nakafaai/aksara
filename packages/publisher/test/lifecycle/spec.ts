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
import type { StageGroupInput } from "@nakafa/aksara-contracts/transport/group";
import { Effect, MutableHashMap, MutableList, Option, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import { PublicationTargetRejectedError } from "#publisher/target/errors";
import { makeStageWriters } from "#test/lifecycle/stage";
import {
  createLifecycleRows,
  releaseEvidence,
  releaseReceipt,
} from "#test/lifecycle/state";

type LifecyclePhase = "aborted" | "completed" | "staging" | "verified";

/** Builds an observable durable target with candidate and recovery slots. */
export function makeTarget(release: {
  readonly manifest: ContentReleaseManifest;
}) {
  const bundles = MutableHashMap.empty<string, ContentReleaseBundle>();
  const completed = MutableHashMap.empty<string, ActiveContentRelease>();
  const phases = MutableHashMap.empty<string, LifecyclePhase>();
  const rows = createLifecycleRows();
  let active: ActiveContentRelease | null = null;
  let candidate: StagedContentRelease | null = null;
  let recovery: StagedRollbackContentRelease | null = null;
  let activationTransitions = 0;
  const abortOrder = MutableList.make<string>();
  /** Records the durable identity shared by candidate and recovery staging. */
  function recordBundle(bundle: ContentReleaseBundle) {
    const { release: signed } = bundle;
    MutableHashMap.set(bundles, signed.manifest.releaseId, bundle);
    rows.forRelease(signed.manifest.releaseId);
    if (active?.release.manifest.releaseId === signed.manifest.releaseId) {
      return false;
    }
    MutableHashMap.set(phases, signed.manifest.releaseId, "staging");
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
  const {
    stageArtifactBatch,
    stageItemBatch,
    stageOperation,
    stageProjectionBatch,
    stageRouteBatch,
    stageSnapshot,
    stageSnapshotBatch,
    stageTryoutRuntimeBundle,
  } = makeStageWriters(rows);
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
        MutableHashMap.set(phases, signed.manifest.releaseId, "verified");
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
      const bundle = Option.getOrUndefined(
        MutableHashMap.get(bundles, signed.manifest.releaseId)
      );
      if (!bundle) {
        return yield* Effect.die(
          "Expected the staged bundle before activation."
        );
      }
      const receipt = releaseReceipt(signed);
      active = { ...bundle, receipt };
      MutableHashMap.set(completed, signed.manifest.releaseId, active);
      if (candidate?.release.manifest.releaseId === signed.manifest.releaseId) {
        candidate = null;
      }
      if (recovery?.release.manifest.releaseId === signed.manifest.releaseId) {
        recovery = null;
      }
      MutableHashMap.set(phases, signed.manifest.releaseId, "completed");
      return receipt;
    })
  );
  const abort = vi.fn(({ releaseId }) =>
    Effect.sync(() => {
      MutableList.append(abortOrder, releaseId);
      const bundle = Option.getOrUndefined(
        MutableHashMap.get(bundles, releaseId)
      );
      if (recovery?.release.manifest.releaseId === releaseId) {
        recovery = null;
      }
      if (candidate?.release.manifest.releaseId === releaseId) {
        candidate = null;
      }
      MutableHashMap.set(phases, releaseId, "aborted");
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
        MutableList.append(abortOrder, recoveryId);
        const bundle = Option.getOrUndefined(
          MutableHashMap.get(bundles, recoveryId)
        );
        recovery = null;
        MutableHashMap.set(phases, recoveryId, "aborted");
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
      const value = Option.getOrUndefined(
        MutableHashMap.get(completed, recoveryId)
      );
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
      const phase =
        Option.getOrUndefined(MutableHashMap.get(phases, releaseId)) ??
        "missing";
      if (phase === "completed") {
        const value = Option.getOrUndefined(
          MutableHashMap.get(completed, releaseId)
        );
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
