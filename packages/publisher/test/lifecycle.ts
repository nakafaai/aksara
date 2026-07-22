import type {
  ContentReleaseManifest,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { ContentReleaseStatus } from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect } from "effect";
import { vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";

/** Builds an observable durable target with exact manifest identity binding. */
export function makeTarget(release: {
  readonly manifest: ContentReleaseManifest;
}) {
  const upsertHeads = release.manifest.projectionCount;
  const deleteHeads = release.manifest.itemCount - upsertHeads;
  let phase: ContentReleaseStatus["phase"] = "missing";
  let storedHash: SignedContentRelease["manifestHash"] | undefined;
  let activationTransitions = 0;
  /** Returns the exact durable publication result for this test release. */
  const receipt = () => ({
    activatedHeads: upsertHeads,
    deletedHeads: deleteHeads,
    manifestHash: storedHash ?? release.manifest.resultDigest,
    projectionDigest: release.manifest.projectionDigest,
    releaseId: release.manifest.releaseId,
    resultCount: release.manifest.resultCount,
    resultDigest: release.manifest.resultDigest,
    stagedArtifacts: upsertHeads,
    stagedItems: release.manifest.itemCount,
    stagedProjections: release.manifest.projectionCount,
  });
  /** Returns target-side evidence recomputed from persisted staged rows. */
  const evidence = (manifestHash: SignedContentRelease["manifestHash"]) => ({
    baseManifestHash: release.manifest.baseManifestHash,
    baseReleaseId: release.manifest.baseReleaseId,
    baseResultCount: release.manifest.baseResultCount,
    baseResultDigest: release.manifest.baseResultDigest,
    deleteHeads,
    itemCount: release.manifest.itemCount,
    itemsDigest: release.manifest.itemsDigest,
    manifestHash,
    projectionCount: release.manifest.projectionCount,
    projectionDigest: release.manifest.projectionDigest,
    releaseId: release.manifest.releaseId,
    rendererContractVersion: release.manifest.rendererContractVersion,
    rendererManifestHash: release.manifest.rendererManifestHash,
    resultCount: release.manifest.resultCount,
    resultDigest: release.manifest.resultDigest,
    rollbackCount: release.manifest.rollbackCount,
    rollbackDigest: release.manifest.rollbackDigest,
    stagedArtifacts: upsertHeads,
    upsertHeads,
  });
  const stageRelease = vi.fn(
    (input: { readonly release: SignedContentRelease }) =>
      Effect.sync(() => {
        storedHash = input.release.manifestHash;
        if (phase === "missing") {
          phase = "staging";
        }
      })
  );
  const verify = vi.fn((signed: SignedContentRelease) =>
    Effect.succeed(evidence(signed.manifestHash))
  );
  const activate = vi.fn(() =>
    Effect.sync(() => {
      phase = "active";
      activationTransitions += 1;
      return receipt();
    })
  );
  const finalize = vi.fn(() =>
    Effect.sync(() => {
      phase = "completed";
      return receipt();
    })
  );
  const status = vi.fn(() => {
    if (storedHash === undefined) {
      return Effect.die("The signed release must be staged before status.");
    }
    return Effect.succeed<ContentReleaseStatus>(
      phase === "completed"
        ? {
            manifestHash: storedHash,
            phase,
            receipt: receipt(),
            releaseId: release.manifest.releaseId,
          }
        : {
            manifestHash: storedHash,
            phase,
            releaseId: release.manifest.releaseId,
          }
    );
  });
  const stageArtifactBatch = vi.fn(() => Effect.void);
  const stageItemBatch = vi.fn(() => Effect.void);
  const stageProjectionBatch = vi.fn(() => Effect.void);
  return {
    activate,
    /** Reports how many atomic activation transitions actually occurred. */
    get activationTransitions() {
      return activationTransitions;
    },
    evidence,
    stageArtifactBatch,
    stageItemBatch,
    stageProjectionBatch,
    stageRelease,
    target: PublicationTarget.of({
      abort: () => Effect.die("Abort is outside publication tests."),
      activate,
      cleanup: () => Effect.die("Cleanup is outside publication tests."),
      current: () => Effect.die("Current state is outside publication tests."),
      finalize,
      headPage: () => Effect.die("Head pages are outside publication tests."),
      rollbackPage: () => Effect.die("Rollback is outside publication tests."),
      stageArtifactBatch,
      stageItemBatch,
      stageProjectionBatch,
      stageRelease,
      status,
      verify,
    }),
    verify,
  };
}
