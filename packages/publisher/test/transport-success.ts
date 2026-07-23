import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import {
  type PublicationSuccess,
  PublicationSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Match, Schema } from "effect";
import { headSuccess } from "#test/head";
import { releaseReceipt } from "#test/lifecycle-state";
import { transportRelease, transportRenderer } from "#test/transport";

/** Builds exact success evidence for one transport protocol request. */
export function transportSuccess(
  request: PublicationRequest
): PublicationSuccess {
  const success = Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      abort: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          complete: true,
          processedItems: transportRelease.manifest.itemCount,
          releaseId: value.releaseId,
          totalItems: transportRelease.manifest.itemCount,
        },
      }),
      accept: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          complete: true,
          processedItems: transportRelease.manifest.itemCount,
          releaseId: value.recoveryId,
          totalItems: transportRelease.manifest.itemCount,
        },
      }),
      activate: (value) => ({
        ok: true,
        operation: value.operation,
        value: releaseReceipt(value.release),
      }),
      activateRecovery: (value) => ({
        ok: true,
        operation: value.operation,
        value: releaseReceipt(value.release),
      }),
      cleanup: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          complete: true,
          deletedArtifacts: 0,
          releaseId: value.releaseId,
        },
      }),
      current: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          active: null,
          candidate: {
            phase: "staging",
            release: transportRelease,
            rendererManifest: transportRenderer,
          },
          recovery: null,
        },
      }),
      headPage: headSuccess,
      recovery: (value) => ({
        ok: true,
        operation: value.operation,
        value: { kind: "missing" },
      }),
      rollbackPage: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: value.rollbackOf,
          rollbackOfManifestHash: value.rollbackOfManifestHash,
          total: 0,
        },
      }),
      routePage: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: value.rollbackOf,
          rollbackOfManifestHash: value.rollbackOfManifestHash,
          total: 0,
        },
      }),
      stageArtifactBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.artifacts.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      stageItemBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.items.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      stageProjectionBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.projections.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      stageRecovery: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          manifestHash: value.release.manifestHash,
          phase: "staging",
          releaseId: value.release.manifest.releaseId,
        },
      }),
      stageRelease: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          manifestHash: value.release.manifestHash,
          phase: "staging",
          releaseId: value.release.manifest.releaseId,
        },
      }),
      stageRouteBatch: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          batchIndex: value.batchIndex,
          created: value.routes.length,
          releaseId: value.releaseId,
          unchanged: 0,
        },
      }),
      status: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          manifestHash: value.manifestHash,
          phase: "staging",
          releaseId: value.releaseId,
        },
      }),
      verify: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          baseManifestHash: value.release.manifest.baseManifestHash,
          baseReleaseId: value.release.manifest.baseReleaseId,
          baseResultCount: value.release.manifest.baseResultCount,
          baseResultDigest: value.release.manifest.baseResultDigest,
          deleteHeads: 1,
          itemCount: value.release.manifest.itemCount,
          itemsDigest: value.release.manifest.itemsDigest,
          manifestHash: value.release.manifestHash,
          projectionCount: 1,
          projectionDigest: transportRelease.manifest.projectionDigest,
          releaseId: value.release.manifest.releaseId,
          rendererContractVersion: "1.0.0",
          rendererManifestHash: transportRenderer.hash,
          resultCount: value.release.manifest.resultCount,
          resultDigest: value.release.manifest.resultDigest,
          rollbackCount: value.release.manifest.rollbackCount,
          rollbackDigest: value.release.manifest.rollbackDigest,
          routeCount: value.release.manifest.routeCount,
          routeDigest: value.release.manifest.routeDigest,
          stagedArtifacts: 1,
          stagedRoutes: value.release.manifest.routeCount,
          upsertHeads: 1,
        },
      }),
    })
  );
  return Schema.decodeUnknownSync(PublicationSuccessSchema)(success);
}
