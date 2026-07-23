import type {
  ContentReleaseManifest,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type {
  ActiveContentRelease,
  StagedContentRelease,
  StagedRollbackContentRelease,
} from "@nakafa/aksara-contracts/release/current";
import { ActiveRollbackContentReleaseSchema } from "@nakafa/aksara-contracts/release/current";
import type {
  ContentReleaseBundle,
  RollbackContentReleaseBundle,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  createLifecycleRows,
  releaseEvidence,
  releaseReceipt,
} from "#test/lifecycle-state";

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
    Effect.sync(() =>
      rows.forRelease(batch.releaseId).artifacts.push(...batch.artifacts)
    )
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
  const stageRouteBatch = vi.fn((batch) =>
    Effect.sync(() =>
      rows.forRelease(batch.releaseId).routes.push(...batch.routes)
    )
  );
  const verify = vi.fn(
    (
      signed: SignedContentRelease
    ): ReturnType<typeof PublicationTarget.Service.verify> =>
      Effect.sync(() => {
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
        return releaseEvidence(signed);
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
  const current = vi.fn(() => Effect.succeed({ active, candidate, recovery }));

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
    current,
    headPage: (request) => {
      const heads = rows
        .forRelease(request.activeReleaseId)
        .items.map(rows.materialHead)
        .filter((head) => head !== null);
      return Effect.succeed({
        ...request,
        done: true,
        heads,
        nextCursor: null,
      });
    },
    recovery: ({ recoveryId }) => {
      const value = completed.get(recoveryId);
      if (!value) {
        return Effect.succeed({ kind: "missing" as const });
      }
      return Effect.sync(() => ({
        kind: "completed" as const,
        value: Schema.decodeUnknownSync(ActiveRollbackContentReleaseSchema)(
          value
        ),
      }));
    },
    rollbackPage: (request) => {
      const staged = rows.forRelease(request.rollbackOf);
      const records = staged.items.map((item) => {
        const { change } = item;
        const head = rows.materialHead(item);
        if (!(head && change.operation === "upsert")) {
          throw new TypeError("Expected one staged upsert rollback record.");
        }
        const artifact = staged.artifacts.find(
          (value) => value.artifactHash === change.artifactHash
        );
        const projection = staged.projections.find(
          (value) =>
            value.contentKey === change.contentKey &&
            value.locale === change.locale
        );
        if (!(artifact && projection)) {
          throw new TypeError("Expected complete staged rollback state.");
        }
        return {
          current: { artifact, change, projection },
          index: item.index,
          prior: {
            change: {
              contentKey: change.contentKey,
              locale: change.locale,
              operation: "delete" as const,
            },
          },
        };
      });
      return Effect.succeed({
        done: true,
        nextIndex: records.length - 1,
        records,
        rollbackOf: request.rollbackOf,
        rollbackOfManifestHash: request.rollbackOfManifestHash,
        total: records.length,
      });
    },
    routePage: (request) => {
      const records = rows
        .forRelease(request.rollbackOf)
        .routes.map((route) => ({ current: route, priorContentKey: null }));
      return Effect.succeed({
        done: true,
        nextIndex: records.length - 1,
        records,
        rollbackOf: request.rollbackOf,
        rollbackOfManifestHash: request.rollbackOfManifestHash,
        total: records.length,
      });
    },
    stageArtifactBatch,
    stageItemBatch,
    stageProjectionBatch,
    stageRecovery,
    stageRelease,
    stageRouteBatch,
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
    snapshot: () => ({ active, candidate, recovery }),
    stageArtifactBatch,
    stageItemBatch,
    stageProjectionBatch,
    stageRecovery,
    stageRelease,
    stageRouteBatch,
    target,
    verify,
  };
}
