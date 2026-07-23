import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type RollbackSignedContentRelease,
  RollbackSignedContentReleaseSchema,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { ContentRouteItemSchema } from "@nakafa/aksara-contracts/release/route";
import { emptyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "@nakafa/aksara-contracts/release/snapshot-data";
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
const snapshotId = `sha256:${"e".repeat(64)}`;
const snapshotRowDigest = `sha256:${"1".repeat(64)}`;
const snapshotRowHash = `sha256:${"2".repeat(64)}`;
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

/** Test-only structured manifest used to prove exact HTTP staging. */
export const transportSnapshot = Schema.decodeUnknownSync(
  ContentSnapshotManifestSchema
)({
  family: "program",
  manifest: {
    format: "program-v1",
    locales: ["en", "id"],
    rowCount: 6,
    rowDigest: snapshotRowDigest,
    slugCount: 12,
    snapshotId,
  },
});

/** Test-only structured row carried by one bounded HTTP batch. */
export const transportSnapshotRow = Schema.decodeUnknownSync(
  ContentSnapshotRowSchema
)({
  family: "program",
  record: {
    row: {
      defaultCoverageStatus: "planned",
      displayOrder: 1,
      iconKey: "school",
      key: "test-http-program",
      kind: "school-curriculum",
      navigation: {
        levels: ["stage", "subject"],
        model: "curriculum-tree",
      },
      provider: { kind: "nakafa", name: "Nakafa test suite" },
      sources: [
        {
          label: "Test-only publisher transport source",
          retrievedAt: "2026-01-01",
          type: "nakafa-editorial",
          url: "https://example.test/publisher-transport",
        },
      ],
      translations: {
        en: { publicSlug: "test-http-program", title: "Test HTTP Program" },
        id: { publicSlug: "program-http-uji", title: "Program HTTP Uji" },
      },
      version: { label: "Test-only version" },
    },
    rowHash: snapshotRowHash,
  },
});

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
    snapshots: emptyContentSnapshots(),
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
      operation: "stageSnapshot",
      releaseId: transportReleaseId,
      snapshot: transportSnapshot,
    },
    {
      batchIndex: 0,
      family: transportSnapshot.family,
      operation: "stageSnapshotBatch",
      releaseId: transportReleaseId,
      rows: [transportSnapshotRow],
      snapshotId: transportSnapshot.manifest.snapshotId,
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

/** Decodes a deliberately modified response into the public wire contract. */
export function transportResponse(input: unknown): PublicationResponse {
  return Schema.decodeUnknownSync(PublicationResponseSchema)(input);
}
