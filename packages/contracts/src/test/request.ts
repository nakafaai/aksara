import { Effect, Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import { ContentRouteItemSchema } from "#contracts/release/route";
import {
  emptyContentSnapshots,
  invertContentSnapshots,
  replaceContentSnapshot,
} from "#contracts/release/snapshot";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "#contracts/release/snapshot-data";
import {
  ContentReleaseItemSchema,
  RollbackSignedContentReleaseSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { rendererDomains } from "#contracts/renderer/contract";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { materialGraph } from "#contracts/test/graph";

export const releaseId = "test-transport";
export const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const manifestHash = `sha256:${"b".repeat(64)}`;
const signature = `${"A".repeat(85)}A`;

/** One coherent structured-state replacement used for signature tampering. */
export const replacementSnapshots = {
  ...emptyContentSnapshots(),
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
    snapshots: emptyContentSnapshots(),
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
    snapshots: invertContentSnapshots(release.manifest.snapshots),
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
      family: "material",
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
      family: "material",
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
  graph: materialGraph("en", "test", "transport", "test-transport"),
  kind: "subject-lesson",
  locale: "en",
  materialKey: "lesson.test.transport",
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

/** One test-owned try-out manifest used only by transport protocol tests. */
export const snapshotManifest = Schema.decodeUnknownSync(
  ContentSnapshotManifestSchema
)({
  family: "tryout",
  manifest: {
    catalogDigest: hash,
    counts: { country: 1, exam: 0, section: 0, set: 0, track: 0 },
    format: "tryout-v1",
    locales: ["en", "id"],
    placementCount: 0,
    placementDigest: hash,
    routeCount: 1,
    snapshotId: hash,
  },
});

/** One test-owned hierarchy row used only by transport protocol tests. */
export const snapshotRow = Schema.decodeUnknownSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      countryCode: "TS",
      countryKey: "test-country",
      graph: materialGraph("en", "test", "transport", "snapshot"),
      kind: "country",
      locale: "en",
      publicPath: "try-out/test-country",
      sourceRevision: "test-transport-v1",
      title: "Test Country",
    },
    rowHash: hash,
  },
  rowKind: "catalog",
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
