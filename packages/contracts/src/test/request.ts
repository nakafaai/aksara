import { Effect, Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import { ContentRouteItemSchema } from "#contracts/release/route/spec";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "#contracts/release/snapshot/data";
import {
  inheritContentSnapshots,
  invertContentSnapshots,
  replaceContentSnapshot,
} from "#contracts/release/snapshot/spec";
import {
  CONTENT_RELEASE_FORMAT,
  ContentReleaseItemSchema,
  RollbackSignedContentReleaseSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { materialGraph } from "#contracts/test/graph";
import { testRendererDomains } from "#contracts/test/renderer";
import { makeTestRuntimeBundle } from "#contracts/test/runtime-bundle";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import { StageOperationSchema } from "#contracts/transport/group";

export const releaseId = "test-transport";
export const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const manifestHash = `sha256:${"b".repeat(64)}`;
const signature = `${"A".repeat(85)}A`;

/** One coherent structured-state replacement used for signature tampering. */
export const replacementSnapshots = {
  ...inheritContentSnapshots(null),
  program: replaceContentSnapshot({
    baseSnapshotId: null,
    resultSnapshotId: hash,
    rowCount: 1,
    rowDigest: hash,
  }),
};

export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

export const release = Schema.decodeSync(SignedContentReleaseSchema)({
  keyId: "test-transport-key",
  manifest: {
    activeAppLocales: ACTIVE_APP_LOCALES,
    baseActiveAppLocales: null,
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    deleteCount: 1,
    format: CONTENT_RELEASE_FORMAT,
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
    scope: {
      families: ["material"],
      snapshots: ["program"],
    },
    snapshots: inheritContentSnapshots(null),
    upsertCount: 1,
  },
  manifestHash,
  signature,
});

export const recoveryId = "test-recovery";

/** Signed inverse fixture that restores the forward release's exact base. */
export const recoveryRelease = Schema.decodeSync(
  RollbackSignedContentReleaseSchema
)({
  ...release,
  manifest: {
    ...release.manifest,
    baseActiveAppLocales: release.manifest.activeAppLocales,
    baseManifestHash: release.manifestHash,
    baseReleaseId: release.manifest.releaseId,
    baseResultCount: release.manifest.resultCount,
    baseResultDigest: release.manifest.resultDigest,
    origin: { kind: "rollback", releaseId: release.manifest.releaseId },
    releaseId: recoveryId,
    resultCount: release.manifest.baseResultCount,
    resultDigest: release.manifest.baseResultDigest,
    snapshots: invertContentSnapshots(release.manifest.snapshots),
  },
  manifestHash: `sha256:${"c".repeat(64)}`,
});

export const items = Schema.decodeSync(
  Schema.NonEmptyArray(ContentReleaseItemSchema)
)([
  {
    change: {
      artifactHash: hash,
      artifactLocale: "en",
      contentKey: "test:transport",
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: "mathematics",
      sourcePath: "packages/corpus/test/transport/en.mdx",
    },
    index: 0,
    releaseId,
  },
  {
    change: {
      artifactLocale: "id",
      contentKey: "test:transport",
      family: "material",
      operation: "delete",
    },
    index: 1,
    releaseId,
  },
]);

export const artifact = Schema.decodeSync(SignedContentArtifactSchema)({
  artifactHash: hash,
  keyId: "test-transport-key",
  payload: {
    artifactLocale: "en",
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: hash,
    compilerVersion: "0.1.0",
    contentKey: "test:transport",
    format: "mdx-function-body",
    mdxCompilerVersion: "3.1.1",
    plainText: "Test protocol",
    rawMdx: "x",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: hash,
  },
  signature,
});

export const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "test:transport",
  graph: materialGraph("en", "test", "transport", "test-transport"),
  kind: "subject-lesson",
  materialKey: "lesson.test.transport",
  metadata: {
    authors: [],
    datePublished: "2026-01-01",
    title: "Test protocol",
  },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/transport",
  sectionKey: "test-transport",
  sitemap: true,
  topicTitle: "Test Transport Topic",
});

export const route = Schema.decodeSync(ContentRouteItemSchema)({
  change: {
    appLocale: "en",
    contentKey: "test:transport",
    operation: "bind",
    publicPath: projection.publicPath,
  },
  index: 0,
  releaseId,
});

const snapshotData = await Effect.runPromise(makeSnapshotTestData());

/** One current try-out manifest used only by transport contract tests. */
export const snapshotManifest = Schema.decodeUnknownSync(
  ContentSnapshotManifestSchema
)(snapshotData.manifests.find(({ family }) => family === "tryout"));

/** One current hierarchy row used only by transport contract tests. */
export const snapshotRow = Schema.decodeUnknownSync(ContentSnapshotRowSchema)(
  snapshotData.rows.find(
    (row) => row.family === "tryout" && row.rowKind === "catalog"
  )
);
export const tryoutRuntimeBundle = makeTestRuntimeBundle({
  release,
  rendererManifest,
  snapshot: snapshotManifest.manifest,
  sourceGitSha: "a".repeat(40),
});

const stageOperations = Schema.decodeSync(
  Schema.NonEmptyArray(StageOperationSchema)
)([
  {
    bundle: tryoutRuntimeBundle,
    operation: "stageTryoutRuntimeBundle",
    releaseId,
  },
  { operation: "stageSnapshot", releaseId, snapshot: snapshotManifest },
  {
    batchIndex: 0,
    family: "tryout",
    operation: "stageSnapshotBatch",
    releaseId,
    rows: [snapshotRow],
    snapshotId: hash,
  },
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
]);

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
  ...stageOperations,
  { operation: "stageGroup", releaseId, requests: stageOperations },
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
