import { SignedContentReleaseSchema } from "@nakafa/aksara-contracts/release";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  type PublicationRequest,
  PublicationRequestSchema,
} from "@nakafa/aksara-contracts/transport/request";
import {
  PublicationResponseSchema,
  type PublicationSuccess,
  PublicationSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Effect, Match, Schema } from "effect";
import {
  transportArtifactHash,
  transportContent,
  transportReleaseId,
  transportSignature,
} from "#test/content";
import { headRequest, headSuccess } from "#test/head";
import { rendererDomains } from "#test/renderer";

const manifestHash = `sha256:${"b".repeat(64)}`;
const projectionDigest = `sha256:${"c".repeat(64)}`;
export const transportRenderer = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({}),
  })
);

export const transportRelease = Schema.decodeUnknownSync(
  SignedContentReleaseSchema
)({
  keyId: "test-http-key",
  manifest: {
    baseReleaseId: null,
    deleteCount: 1,
    itemCount: 2,
    itemsDigest: transportArtifactHash,
    origin: { kind: "git", sha: "a".repeat(40) },
    projectionCount: 1,
    projectionDigest,
    releaseId: transportReleaseId,
    rendererContractVersion: "1.0.0",
    rendererManifestHash: transportRenderer.hash,
    upsertCount: 1,
  },
  manifestHash,
  signature: transportSignature,
});

export const transportRequests = Schema.decodeUnknownSync(
  Schema.Array(PublicationRequestSchema)
)([
  { operation: "current" },
  { operation: "abort", releaseId: transportReleaseId },
  headRequest,
  {
    operation: "stageRelease",
    release: transportRelease,
    rendererManifest: transportRenderer,
  },
  {
    batchIndex: 0,
    items: transportContent.items,
    operation: "stageItemBatch",
    releaseId: transportReleaseId,
  },
  {
    batchIndex: 0,
    operation: "stageProjectionBatch",
    projections: [transportContent.projection],
    releaseId: transportReleaseId,
  },
  {
    artifacts: [transportContent.artifact],
    batchIndex: 0,
    operation: "stageArtifactBatch",
    releaseId: transportReleaseId,
  },
  { manifestHash, operation: "status", releaseId: transportReleaseId },
  { operation: "verify", release: transportRelease },
  { operation: "activate", release: transportRelease },
  { afterIndex: -1, operation: "finalize", release: transportRelease },
  {
    afterIndex: -1,
    limit: 8,
    operation: "rollbackPage",
    rollbackOf: transportReleaseId,
  },
  { operation: "cleanup", releaseId: transportReleaseId },
]);

const publicationReceipt = {
  activatedHeads: 1,
  deletedHeads: 1,
  projectionDigest,
  releaseId: transportRelease.manifest.releaseId,
  stagedArtifacts: 1,
  stagedItems: 2,
  stagedProjections: 1,
};

/** Decodes a deliberately modified response into the public wire contract. */
export function transportResponse(input: unknown) {
  return Schema.decodeUnknownSync(PublicationResponseSchema)(input);
}

/** Builds exact success evidence for one transport protocol request. */
export function transportSuccess(
  request: PublicationRequest,
  pendingFinalize = false
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
      activate: (value) => ({
        ok: true,
        operation: value.operation,
        value: publicationReceipt,
      }),
      cleanup: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          complete: true,
          deletedArtifacts: 0,
          deletedItems: 0,
          releaseId: value.releaseId,
        },
      }),
      current: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          activeReleaseId: null,
          completed: null,
          pending: {
            phase: "staging",
            release: transportRelease,
            rendererManifest: transportRenderer,
          },
        },
      }),
      finalize: (value) => {
        const nextIndex = value.release.manifest.itemCount - 1;
        if (pendingFinalize) {
          return {
            ok: true,
            operation: value.operation,
            releaseId: value.release.manifest.releaseId,
            value: { done: false, nextIndex: 0, processed: 1 },
          };
        }
        return {
          ok: true,
          operation: value.operation,
          releaseId: value.release.manifest.releaseId,
          value: {
            done: true,
            nextIndex,
            processed: nextIndex - value.afterIndex,
            receipt: publicationReceipt,
          },
        };
      },
      headPage: headSuccess,
      rollbackPage: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          done: true,
          nextIndex: -1,
          records: [],
          rollbackOf: value.rollbackOf,
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
      stageRelease: (value) => ({
        ok: true,
        operation: value.operation,
        value: {
          manifestHash: value.release.manifestHash,
          phase: "staging",
          releaseId: value.release.manifest.releaseId,
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
          baseReleaseId: value.release.manifest.baseReleaseId,
          deleteHeads: 1,
          itemCount: value.release.manifest.itemCount,
          itemsDigest: value.release.manifest.itemsDigest,
          manifestHash: value.release.manifestHash,
          projectionCount: 1,
          projectionDigest,
          releaseId: value.release.manifest.releaseId,
          rendererContractVersion: "1.0.0",
          rendererManifestHash: transportRenderer.hash,
          stagedArtifacts: 1,
          upsertHeads: 1,
        },
      }),
    })
  );
  return Schema.decodeUnknownSync(PublicationSuccessSchema)(success);
}
