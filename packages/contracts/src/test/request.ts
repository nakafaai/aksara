import { Effect, Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import { ContentRouteItemSchema } from "#contracts/release/route";
import {
  ContentReleaseItemSchema,
  RollbackSignedContentReleaseSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { rendererDomains } from "#contracts/renderer/contract";
import { createRendererManifest } from "#contracts/renderer/manifest";

export const releaseId = "test-transport";
export const hash = `sha256:${"a".repeat(64)}`;
const manifestHash = `sha256:${"b".repeat(64)}`;
const signature = `${"A".repeat(85)}A`;

export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({}),
  })
);

export const release = Schema.decodeUnknownSync(SignedContentReleaseSchema)({
  keyId: "test-transport-key",
  manifest: {
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    deleteCount: 1,
    itemCount: 2,
    itemsDigest: hash,
    origin: { kind: "git", sha: "a".repeat(40) },
    projectionCount: 1,
    projectionDigest: hash,
    releaseId,
    rendererContractVersion: "1.0.0",
    rendererManifestHash: rendererManifest.hash,
    resultCount: 1,
    resultDigest: hash,
    rollbackCount: 2,
    rollbackDigest: hash,
    routeCount: 0,
    routeDigest: hash,
    upsertCount: 1,
  },
  manifestHash,
  signature,
});

export const recoveryId = "test-recovery";

/** Signed inverse fixture that restores the forward release's exact base. */
export const recoveryRelease = Schema.decodeUnknownSync(
  RollbackSignedContentReleaseSchema
)({
  ...release,
  manifest: {
    ...release.manifest,
    baseManifestHash: release.manifestHash,
    baseReleaseId: release.manifest.releaseId,
    baseResultCount: release.manifest.resultCount,
    baseResultDigest: release.manifest.resultDigest,
    origin: { kind: "rollback", releaseId: release.manifest.releaseId },
    releaseId: recoveryId,
    resultCount: release.manifest.baseResultCount,
    resultDigest: release.manifest.baseResultDigest,
  },
  manifestHash: `sha256:${"c".repeat(64)}`,
});

export const items = Schema.decodeUnknownSync(
  Schema.NonEmptyArray(ContentReleaseItemSchema)
)([
  {
    change: {
      artifactHash: hash,
      contentKey: "test:transport",
      delivery: "public",
      locale: "en",
      operation: "upsert",
      rendererDomain: "mathematics",
      sourcePath: "packages/corpus/test/transport/en.mdx",
    },
    index: 0,
    releaseId,
  },
  {
    change: {
      contentKey: "test:transport",
      locale: "id",
      operation: "delete",
    },
    index: 1,
    releaseId,
  },
]);

export const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
  artifactHash: hash,
  keyId: "test-transport-key",
  payload: {
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: hash,
    compilerVersion: "0.1.0",
    contentKey: "test:transport",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "Test protocol",
    rawMdx: "x",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: hash,
  },
  signature,
});

export const projection = Schema.decodeUnknownSync(
  MaterialLessonProjectionSchema
)({
  contentKey: "test:transport",
  kind: "subject-lesson",
  locale: "en",
  materialKey: "test.transport",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/transport",
  sectionKey: "test-transport",
  sitemap: true,
});

export const route = Schema.decodeUnknownSync(ContentRouteItemSchema)({
  change: {
    contentKey: "test:transport",
    locale: "en",
    operation: "bind",
    publicPath: projection.publicPath,
  },
  index: 0,
  releaseId,
});

/** Exact publication request fixtures shared by one transport contract test. */
export const requests = [
  { operation: "accept", recoveryId, releaseId },
  { operation: "abort", releaseId },
  { operation: "current" },
  {
    activeManifestHash: manifestHash,
    activeReleaseId: releaseId,
    cursor: null,
    family: "material",
    limit: 500,
    operation: "headPage",
  },
  { operation: "recovery", recoveryId, releaseId },
  { operation: "stageRelease", release, rendererManifest },
  { operation: "stageRecovery", release: recoveryRelease, rendererManifest },
  { batchIndex: 0, items, operation: "stageItemBatch", releaseId },
  {
    batchIndex: 0,
    operation: "stageRouteBatch",
    releaseId,
    routes: [route],
  },
  {
    batchIndex: 0,
    operation: "stageProjectionBatch",
    projections: [projection],
    releaseId,
  },
  {
    artifacts: [artifact],
    batchIndex: 0,
    operation: "stageArtifactBatch",
    releaseId,
  },
  { manifestHash, operation: "status", releaseId },
  { operation: "verify", release },
  { operation: "activate", release },
  { operation: "activateRecovery", release: recoveryRelease },
  {
    afterIndex: -1,
    limit: 8,
    operation: "rollbackPage",
    rollbackOf: releaseId,
    rollbackOfManifestHash: manifestHash,
  },
  {
    afterIndex: -1,
    limit: 8,
    operation: "routePage",
    rollbackOf: releaseId,
    rollbackOfManifestHash: manifestHash,
  },
  { operation: "cleanup", releaseId },
];
