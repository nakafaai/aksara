// @vitest-environment node
import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";

import { Effect, Schema } from "effect";

import {
  canonicalizeHistoricalContentPayload,
  historicalArtifactSigningInput,
} from "#contracts/history/artifact";
import {
  HistoricalCompiledContentPayloadSchema,
  HistoricalSignedContentArtifactSchema,
} from "#contracts/history/artifact-spec";
import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import {
  HistoricalContentReleaseManifestSchema,
  HistoricalSignedContentReleaseSchema,
} from "#contracts/history/release";
import {
  canonicalizeHistoricalContentReleaseManifest,
  historicalReleaseSigningInput,
} from "#contracts/history/release-bytes";
import { HistoricalTryoutSnapshotSchema } from "#contracts/history/tryout";
import type { Sha256HashSchema } from "#contracts/ids";
import { TryoutRuntimeAdoptionSourceSchema } from "#contracts/migration/tryout/history/adoption/spec";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { retainedRelease } from "#contracts/test/history";
import {
  historicalCatalogEnvelope,
  historicalPlacementEnvelope,
  historicalTryoutInventory,
} from "#contracts/test/history-inventory";
import {
  historicalCatalogRows,
  historicalPlacement,
} from "#contracts/test/history-row";
import { historicalRenderer } from "#contracts/test/history-runtime";
import { protectedSnapshot } from "#contracts/test/runtime/fixture";
import { TryoutHistoryMigrationSourceSchema } from "#contracts/transport/migration/tryout/response";

const keys = generateKeyPairSync("ed25519");
export const migrationPublicKey = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();

/** Hashes one test-only retained object through independent Node crypto. */
function hash(value: string) {
  return HistoricalSha256HashSchema.make(
    `sha256:${createHash("sha256").update(value).digest("hex")}`
  );
}

/** Signs one test-only retained object through independent Node crypto. */
function sign(value: string) {
  return signBytes(null, Buffer.from(value, "utf8"), keys.privateKey).toString(
    "base64url"
  );
}

/** Creates one authenticated retained artifact for migration fixtures. */
function createArtifact(input: {
  readonly contentKey: string;
  readonly plainText: string;
  readonly rawMdx: string;
}) {
  const payload = Schema.decodeSync(HistoricalCompiledContentPayloadSchema)({
    byteLength: 31,
    compiledCode: "return { default: () => null };",
    compilerConfigHash: `sha256:${"1".repeat(64)}`,
    compilerVersion: "0.1.0",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    rendererDomain: "snbt-general",
    requiredComponents: [{ name: "BlockMath", version: 1 }],
    sourceHash: hash(input.rawMdx),
    ...input,
  });
  const artifactHash = hash(canonicalizeHistoricalContentPayload(payload));
  return Schema.decodeSync(HistoricalSignedContentArtifactSchema)({
    artifactHash,
    keyId: "retained-migration-key",
    payload,
    signature: sign(historicalArtifactSigningInput(artifactHash, payload)),
  });
}

const questionArtifact = createArtifact({
  contentKey: historicalPlacement.questionContentKey,
  plainText: "Retained question",
  rawMdx: "# Retained question",
});
const answerArtifact = createArtifact({
  contentKey: historicalPlacement.answerContentKey,
  plainText: "Retained answer",
  rawMdx: "# Retained answer",
});
export const migrationArtifacts = [questionArtifact, answerArtifact];
export const migrationInventory = historicalTryoutInventory(
  historicalCatalogRows.slice(0, 1).map(historicalCatalogEnvelope),
  [
    historicalPlacementEnvelope({
      ...historicalPlacement,
      answerArtifactHash: answerArtifact.artifactHash,
      questionArtifactHash: questionArtifact.artifactHash,
    }),
  ]
);
const snapshot = Schema.decodeSync(HistoricalTryoutSnapshotSchema)(
  migrationInventory.snapshot
);

const manifest = Schema.decodeUnknownSync(
  HistoricalContentReleaseManifestSchema
)({
  ...retainedRelease.manifest,
  releaseId: "retained-migration-release",
  rendererManifestHash: historicalRenderer.hash,
  snapshots: {
    ...retainedRelease.manifest.snapshots,
    tryout: {
      ...retainedRelease.manifest.snapshots.tryout,
      resultSnapshotId: snapshot.snapshotId,
    },
  },
});
/** Signs one test-only retained release through the migration key. */
function createRelease(
  releaseManifest: typeof HistoricalContentReleaseManifestSchema.Type
) {
  const releaseManifestHash = hash(
    canonicalizeHistoricalContentReleaseManifest(releaseManifest)
  );
  return Schema.decodeSync(HistoricalSignedContentReleaseSchema)({
    keyId: "retained-migration-key",
    manifest: releaseManifest,
    manifestHash: releaseManifestHash,
    signature: sign(
      historicalReleaseSigningInput(releaseManifestHash, releaseManifest)
    ),
  });
}

export const migrationRelease = createRelease(manifest);

const adoptionManifest = Schema.decodeSync(
  HistoricalContentReleaseManifestSchema
)({
  ...manifest,
  releaseId: "retained-adoption-release",
  snapshots: {
    ...manifest.snapshots,
    tryout: {
      ...manifest.snapshots.tryout,
      resultSnapshotId: protectedSnapshot.snapshotId,
    },
  },
});

/** Creates one authenticated adoption source with deliberate test identities. */
export function adoptionSourceFrom(input: {
  readonly attemptCount?: number;
  readonly inventoryHash?: typeof Sha256HashSchema.Type;
  readonly releaseBaseSnapshotId?: typeof protectedSnapshot.snapshotId;
  readonly releaseSnapshotId?: typeof protectedSnapshot.snapshotId;
  readonly rendererManifestHash?: typeof historicalRenderer.hash;
  readonly snapshot?: typeof protectedSnapshot;
}) {
  const sourceSnapshot = input.snapshot ?? protectedSnapshot;
  const hasRetainedBase = input.releaseBaseSnapshotId !== undefined;
  const sourceManifest = Schema.decodeSync(
    HistoricalContentReleaseManifestSchema
  )({
    ...adoptionManifest,
    baseManifestHash: hasRetainedBase
      ? hash("retained-adoption-parent")
      : adoptionManifest.baseManifestHash,
    baseReleaseId: hasRetainedBase
      ? "retained-adoption-parent"
      : adoptionManifest.baseReleaseId,
    rendererManifestHash:
      input.rendererManifestHash ?? adoptionManifest.rendererManifestHash,
    snapshots: {
      ...adoptionManifest.snapshots,
      tryout: {
        ...adoptionManifest.snapshots.tryout,
        baseSnapshotId:
          input.releaseBaseSnapshotId ??
          adoptionManifest.snapshots.tryout.baseSnapshotId,
        resultSnapshotId: input.releaseSnapshotId ?? sourceSnapshot.snapshotId,
      },
    },
  });
  return Schema.decodeSync(TryoutRuntimeAdoptionSourceSchema)({
    attemptCount: input.attemptCount ?? 1,
    inventoryHash: input.inventoryHash ?? `sha256:${"3".repeat(64)}`,
    release: createRelease(sourceManifest),
    rendererManifest: historicalRenderer,
    snapshot: sourceSnapshot,
  });
}

export const adoptionSource = adoptionSourceFrom({});

/** Complete authenticated source envelope for contract verification tests. */
export const migrationSource = Schema.decodeSync(
  TryoutHistoryMigrationSourceSchema
)({
  adoptions: [
    adoptionSourceFrom({
      attemptCount: 2,
    }),
  ],
  evidence: {
    artifactCount: 2,
    attempts: {
      attemptCount: 2,
      digest: `sha256:${"1".repeat(64)}`,
      frozenPlacementCount: 2,
      progressCount: 2,
      responseCount: 2,
      scoreCount: 2,
      sectionAttemptCount: 2,
    },
    catalogRowCount: 1,
    creatingReleaseId: migrationRelease.manifest.releaseId,
    legacyBundleCount: 1,
    placementRowCount: 1,
    releases: [
      {
        attemptCount: 2,
        manifestHash: migrationRelease.manifestHash,
        releaseId: migrationRelease.manifest.releaseId,
      },
    ],
    rendererManifestHash: historicalRenderer.hash,
    runtimeBundleCount: 1,
    scales: {
      digest: `sha256:${"2".repeat(64)}`,
      itemCount: 1,
      runCount: 1,
      versionCount: 1,
    },
    snapshot,
  },
  releases: [{ attemptCount: 2, release: migrationRelease }],
  rendererManifest: historicalRenderer,
});

/** Strictly decodes one deliberately modified source fixture. */
export function migrationSourceFrom(input: unknown) {
  return Schema.decodeUnknownSync(TryoutHistoryMigrationSourceSchema)(input);
}

/** Trusted public key paired with the retained migration release fixture. */
export const migrationResolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed(migrationPublicKey),
});
