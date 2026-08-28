import { createHash } from "node:crypto";

import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { TryoutRuntimeAdoptionSourceSchema } from "@nakafa/aksara-contracts/migration/tryout/history/adoption";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { TryoutHistoryMigrationSourceSchema } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect, Schema } from "effect";

import { transportSignature } from "#test/content";
import { testRendererDomains } from "#test/renderer";

export const migrationId = ReleaseIdSchema.make("retained-tryout-history-v1");
export const sourceSnapshotId = Sha256HashSchema.make(
  `sha256:${"3".repeat(64)}`
);

const liveRenderer = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["snbt-general"],
  })
);
const domains = liveRenderer.domains.filter(({ name }) => name !== "site");
const rendererHash = `sha256:${createHash("sha256")
  .update(
    canonicalizeRendererManifestContract({
      base: liveRenderer.base,
      domains,
      publishedDomains: liveRenderer.publishedDomains,
    })
  )
  .digest("hex")}`;
const historicalRendererInput = {
  ...liveRenderer,
  domains,
  hash: rendererHash,
};

const manifestHash = `sha256:${"4".repeat(64)}`;
const emptyResultDigest =
  "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd";
const emptySnapshotDigest =
  "sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f";

/** Structurally exact retained source used after authenticator-focused tests. */
export const historicalSource = Schema.decodeUnknownSync(
  TryoutHistoryMigrationSourceSchema
)({
  adoptions: [],
  evidence: {
    artifactCount: 2,
    attempts: {
      attemptCount: 1,
      digest: `sha256:${"5".repeat(64)}`,
      frozenPlacementCount: 1,
      progressCount: 1,
      responseCount: 1,
      scoreCount: 1,
      sectionAttemptCount: 1,
    },
    catalogRowCount: 1,
    creatingReleaseId: "retained-migration-release",
    legacyBundleCount: 1,
    placementRowCount: 1,
    releases: [
      {
        attemptCount: 1,
        manifestHash,
        releaseId: "retained-migration-release",
      },
    ],
    rendererManifestHash: rendererHash,
    runtimeBundleCount: 0,
    scales: {
      digest: `sha256:${"6".repeat(64)}`,
      itemCount: 1,
      runCount: 1,
      versionCount: 1,
    },
    snapshot: {
      catalogDigest: `sha256:${"7".repeat(64)}`,
      counts: { country: 1, exam: 0, section: 0, set: 0, track: 0 },
      format: "tryout-v1",
      locales: ["en", "id"],
      placementCount: 1,
      placementDigest: `sha256:${"8".repeat(64)}`,
      routeCount: 1,
      snapshotId: sourceSnapshotId,
    },
  },
  releases: [
    {
      attemptCount: 1,
      release: {
        keyId: "retained-migration-key",
        manifest: {
          baseManifestHash: null,
          baseReleaseId: null,
          baseResultCount: 0,
          baseResultDigest: emptyResultDigest,
          deleteCount: 0,
          itemCount: 0,
          itemsDigest: `sha256:${"9".repeat(64)}`,
          origin: { kind: "git", sha: "a".repeat(40) },
          projectionCount: 0,
          projectionDigest: `sha256:${"a".repeat(64)}`,
          releaseId: "retained-migration-release",
          rendererContractVersion: "1.0.0",
          rendererManifestHash: rendererHash,
          resultCount: 0,
          resultDigest: emptyResultDigest,
          rollbackCount: 0,
          rollbackDigest: `sha256:${"b".repeat(64)}`,
          routeCount: 0,
          routeDigest: `sha256:${"c".repeat(64)}`,
          scope: { content: [], families: [], snapshots: ["tryout"] },
          snapshots: {
            program: {
              baseSnapshotId: null,
              mode: "inherit",
              resultSnapshotId: null,
              rowCount: 0,
              rowDigest: emptySnapshotDigest,
            },
            quran: {
              baseSnapshotId: null,
              mode: "inherit",
              resultSnapshotId: null,
              rowCount: 0,
              rowDigest: emptySnapshotDigest,
            },
            tryout: {
              baseSnapshotId: null,
              mode: "replace",
              resultSnapshotId: sourceSnapshotId,
              rowCount: 2,
              rowDigest: `sha256:${"d".repeat(64)}`,
            },
          },
          upsertCount: 0,
        },
        manifestHash,
        signature: transportSignature,
      },
    },
  ],
  rendererManifest: historicalRendererInput,
});

export const historicalRenderer = historicalSource.rendererManifest;

const adoptionSnapshot = makeTryoutSnapshot({
  activeAppLocales: [AppLocaleSchema.make("en"), AppLocaleSchema.make("id")],
  catalogDigest: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
  counts: { country: 1, exam: 0, section: 0, set: 0, track: 0 },
  placementCount: 1,
  placementDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
  routeCount: 1,
});

/** Structurally exact terminal runtime source for publisher behavior tests. */
export const adoptionSource = Schema.decodeUnknownSync(
  TryoutRuntimeAdoptionSourceSchema
)({
  attemptCount: 1,
  inventoryHash: `sha256:${"1".repeat(64)}`,
  release: {
    ...historicalSource.releases[0].release,
    manifest: {
      ...historicalSource.releases[0].release.manifest,
      releaseId: "retained-adoption-release",
      snapshots: {
        ...historicalSource.releases[0].release.manifest.snapshots,
        tryout: {
          ...historicalSource.releases[0].release.manifest.snapshots.tryout,
          resultSnapshotId: adoptionSnapshot.snapshotId,
        },
      },
    },
  },
  rendererManifest: historicalRendererInput,
  snapshot: adoptionSnapshot,
});
