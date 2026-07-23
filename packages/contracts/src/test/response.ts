import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import {
  emptyContentSnapshots,
  snapshotRowCount,
} from "#contracts/release/snapshot";
import type { SignedContentRelease } from "#contracts/release/spec";
import {
  hash as manifestHash,
  release,
  releaseId,
  rendererManifest,
  snapshotManifest,
} from "#contracts/test/request";

const projectionDigest = `sha256:${"b".repeat(64)}`;
const rendererManifestHash = `sha256:${"c".repeat(64)}`;
const snapshots = emptyContentSnapshots();

/** Builds terminal evidence bound exactly to one signed test release. */
export function receiptFor(signedRelease: SignedContentRelease) {
  const { manifest } = signedRelease;
  return {
    activatedHeads: manifest.upsertCount,
    deletedHeads: manifest.deleteCount,
    manifestHash: signedRelease.manifestHash,
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    routeDigest: manifest.routeDigest,
    snapshots: manifest.snapshots,
    stagedArtifacts: manifest.upsertCount,
    stagedItems: manifest.itemCount,
    stagedProjections: manifest.projectionCount,
    stagedRoutes: manifest.routeCount,
    stagedSnapshotRows: snapshotRowCount(manifest.snapshots),
  };
}

export const receipt = {
  activatedHeads: 1,
  deletedHeads: 0,
  manifestHash,
  projectionDigest,
  releaseId,
  resultCount: 1,
  resultDigest: projectionDigest,
  routeDigest: manifestHash,
  snapshots,
  stagedArtifacts: 1,
  stagedItems: 1,
  stagedProjections: 1,
  stagedRoutes: 0,
  stagedSnapshotRows: 0,
};

const status = { manifestHash, phase: "staging", releaseId };

export const evidence = {
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteHeads: 0,
  itemCount: 1,
  itemsDigest: manifestHash,
  manifestHash,
  projectionCount: 1,
  projectionDigest,
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash,
  resultCount: 1,
  resultDigest: projectionDigest,
  rollbackCount: 1,
  rollbackDigest: manifestHash,
  routeCount: 0,
  routeDigest: manifestHash,
  snapshots,
  stagedArtifacts: 1,
  stagedRoutes: 0,
  stagedSnapshotRows: 0,
  upsertHeads: 1,
};

export const successes = [
  {
    ok: true,
    operation: "accept",
    value: {
      complete: true,
      processedItems: 2,
      releaseId: "test-recovery",
      totalItems: 2,
    },
  },
  {
    ok: true,
    operation: "abort",
    value: {
      complete: true,
      processedItems: 2,
      releaseId,
      totalItems: 2,
    },
  },
  {
    ok: true,
    operation: "current",
    value: {
      active: null,
      candidate: { phase: "staging", release, rendererManifest },
      recovery: null,
    },
  },
  {
    ok: true,
    operation: "headPage",
    value: {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      done: true,
      family: "material",
      heads: [
        {
          artifactHash: manifestHash,
          compilerConfigHash: manifestHash,
          contentKey: "test:transport",
          delivery: "public",
          family: "material",
          locale: "en",
          projectionHash: projectionDigest,
          publicPath: "subjects/test/transport",
          rendererDomain: "mathematics",
          sourceHash: manifestHash,
          sourcePath: "packages/corpus/test/transport/en.mdx",
        },
      ],
      nextCursor: null,
    },
  },
  { ok: true, operation: "recovery", value: { kind: "missing" } },
  { ok: true, operation: "stageRelease", value: status },
  { ok: true, operation: "stageRecovery", value: status },
  {
    ok: true,
    operation: "stageSnapshot",
    value: {
      created: 1,
      family: snapshotManifest.family,
      releaseId,
      snapshotId: snapshotManifest.manifest.snapshotId,
      unchanged: 0,
    },
  },
  {
    ok: true,
    operation: "stageSnapshotBatch",
    value: {
      batchIndex: 0,
      created: 1,
      family: snapshotManifest.family,
      releaseId,
      snapshotId: snapshotManifest.manifest.snapshotId,
      unchanged: 0,
    },
  },
  {
    ok: true,
    operation: "stageItemBatch",
    value: { batchIndex: 0, created: 1, releaseId, unchanged: 0 },
  },
  {
    ok: true,
    operation: "stageRouteBatch",
    value: { batchIndex: 0, created: 1, releaseId, unchanged: 0 },
  },
  {
    ok: true,
    operation: "stageProjectionBatch",
    value: { batchIndex: 0, created: 0, releaseId, unchanged: 1 },
  },
  {
    ok: true,
    operation: "stageArtifactBatch",
    value: { batchIndex: 0, created: 1, releaseId, unchanged: 0 },
  },
  { ok: true, operation: "status", value: status },
  { ok: true, operation: "verify", value: evidence },
  { ok: true, operation: "activate", value: receipt },
  { ok: true, operation: "activateRecovery", value: receipt },
  {
    ok: true,
    operation: "rollbackPage",
    value: {
      done: true,
      nextIndex: -1,
      records: [],
      rollbackOf: releaseId,
      rollbackOfManifestHash: manifestHash,
      total: 0,
    },
  },
  {
    ok: true,
    operation: "routePage",
    value: {
      done: true,
      nextIndex: -1,
      records: [],
      rollbackOf: releaseId,
      rollbackOfManifestHash: manifestHash,
      total: 0,
    },
  },
  {
    ok: true,
    operation: "cleanup",
    value: { complete: true, deletedArtifacts: 1, releaseId },
  },
] as const;
