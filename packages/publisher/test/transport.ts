import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type RollbackSignedContentRelease,
  RollbackSignedContentReleaseSchema,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { ContentRouteItemSchema } from "@nakafa/aksara-contracts/release/route";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  type PublicationRequest,
  PublicationRequestSchema,
} from "@nakafa/aksara-contracts/transport/request";
import {
  type PublicationResponse,
  PublicationResponseSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Effect, Schema } from "effect";
import {
  transportArtifactHash,
  transportContent,
  transportReleaseId,
  transportSignature,
} from "#test/content";
import { headRequest } from "#test/head";

const manifestHash = `sha256:${"b".repeat(64)}`;
const projectionDigest = `sha256:${"c".repeat(64)}`;
const recoveryId = ReleaseIdSchema.make("test-http-recovery");
export const transportRenderer = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({}),
  })
);

export const transportRelease: SignedContentRelease = Schema.decodeUnknownSync(
  SignedContentReleaseSchema
)({
  keyId: "test-http-key",
  manifest: {
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    deleteCount: 1,
    itemCount: 2,
    itemsDigest: transportArtifactHash,
    origin: { kind: "git", sha: "a".repeat(40) },
    projectionCount: 1,
    projectionDigest,
    releaseId: transportReleaseId,
    rendererContractVersion: "1.0.0",
    rendererManifestHash: transportRenderer.hash,
    resultCount: 1,
    resultDigest: transportArtifactHash,
    rollbackCount: 2,
    rollbackDigest: manifestHash,
    routeCount: 0,
    routeDigest: manifestHash,
    upsertCount: 1,
  },
  manifestHash,
  signature: transportSignature,
});

/** Exact signed inverse accepted by recovery-only transport operations. */
export const transportRecovery: RollbackSignedContentRelease =
  Schema.decodeUnknownSync(RollbackSignedContentReleaseSchema)({
    ...transportRelease,
    manifest: {
      ...transportRelease.manifest,
      baseManifestHash: transportRelease.manifestHash,
      baseReleaseId: transportRelease.manifest.releaseId,
      baseResultCount: transportRelease.manifest.resultCount,
      baseResultDigest: transportRelease.manifest.resultDigest,
      origin: {
        kind: "rollback",
        releaseId: transportRelease.manifest.releaseId,
      },
      releaseId: recoveryId,
      resultCount: transportRelease.manifest.baseResultCount,
      resultDigest: transportRelease.manifest.baseResultDigest,
    },
    manifestHash: `sha256:${"d".repeat(64)}`,
  });
const transportRoute = ContentRouteItemSchema.make({
  change: {
    contentKey: transportContent.projection.contentKey,
    locale: transportContent.projection.locale,
    operation: "bind",
    publicPath: transportContent.projection.publicPath,
  },
  index: 0,
  releaseId: transportRelease.manifest.releaseId,
});

export const transportRequests: readonly PublicationRequest[] =
  Schema.decodeUnknownSync(Schema.Array(PublicationRequestSchema))([
    { operation: "current" },
    { operation: "accept", recoveryId, releaseId: transportReleaseId },
    { operation: "abort", releaseId: transportReleaseId },
    { operation: "recovery", recoveryId, releaseId: transportReleaseId },
    headRequest,
    {
      operation: "stageRelease",
      release: transportRelease,
      rendererManifest: transportRenderer,
    },
    {
      operation: "stageRecovery",
      release: transportRecovery,
      rendererManifest: transportRenderer,
    },
    {
      batchIndex: 0,
      operation: "stageRouteBatch",
      releaseId: transportReleaseId,
      routes: [transportRoute],
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
    { operation: "activateRecovery", release: transportRecovery },
    {
      afterIndex: -1,
      limit: 8,
      operation: "rollbackPage",
      rollbackOf: transportReleaseId,
      rollbackOfManifestHash: manifestHash,
    },
    {
      afterIndex: -1,
      limit: 8,
      operation: "routePage",
      rollbackOf: transportReleaseId,
      rollbackOfManifestHash: manifestHash,
    },
    { operation: "cleanup", releaseId: transportReleaseId },
  ]);

export const transportReceipt = {
  activatedHeads: 1,
  deletedHeads: 1,
  manifestHash,
  projectionDigest,
  releaseId: transportRelease.manifest.releaseId,
  resultCount: transportRelease.manifest.resultCount,
  resultDigest: transportRelease.manifest.resultDigest,
  routeDigest: transportRelease.manifest.routeDigest,
  stagedArtifacts: 1,
  stagedItems: 2,
  stagedProjections: 1,
  stagedRoutes: 0,
};

/** Decodes a deliberately modified response into the public wire contract. */
export function transportResponse(input: unknown): PublicationResponse {
  return Schema.decodeUnknownSync(PublicationResponseSchema)(input);
}
