import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  type PublicationReceipt,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import type { ActiveContentRelease } from "@nakafa/aksara-contracts/release/current/evidence";
import {
  type ContentReleaseCurrent,
  ContentReleaseCurrentSchema,
} from "@nakafa/aksara-contracts/release/current/state";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import {
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  inheritContentSnapshot,
  inheritContentSnapshots,
  invertContentSnapshots,
  snapshotRowCount,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  SignedTryoutRuntimeBundleSchema,
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
} from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { TRYOUT_SNAPSHOT_FORMAT } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Schema } from "effect";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";

const HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const OTHER_HASH = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Signs a structurally valid test manifest with its exact canonical hash. */
function bundleFromManifest(
  manifest: ContentReleaseManifest,
  keyId = SigningKeyIdSchema.make("content-2026-07-23"),
  rendererManifest: RendererManifestEnvelope = RENDERER_MANIFEST
): ContentReleaseBundle {
  const release = SignedContentReleaseSchema.make({
    keyId,
    manifest,
    manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
    signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
  });
  return ContentReleaseBundleSchema.make({
    release,
    rendererManifest,
  });
}

/** Creates one contract-owned release identity for production assertions. */
export function releaseId(value: string) {
  return ReleaseIdSchema.make(value);
}

/** Creates one exact Git release bundle for recovery orchestration tests. */
export function gitBundle(
  id: string,
  input: {
    readonly baseManifestHash?: typeof Sha256HashSchema.Type;
    readonly baseReleaseId?: ReleaseId | null;
    readonly keyId?: typeof SigningKeyIdSchema.Type;
    readonly projectionDigest?: typeof Sha256HashSchema.Type;
    readonly rendererManifest?: RendererManifestEnvelope;
    readonly scope?: PublicationScope;
    readonly sha?: typeof GitCommitShaSchema.Type;
    readonly tryoutSnapshotId?: typeof Sha256HashSchema.Type;
  } = {}
) {
  const baseReleaseId = input.baseReleaseId ?? null;
  return bundleFromManifest(
    ContentReleaseManifestSchema.make({
      activeAppLocales: ACTIVE_APP_LOCALES,
      baseActiveAppLocales: baseReleaseId === null ? null : ACTIVE_APP_LOCALES,
      baseManifestHash:
        baseReleaseId === null ? null : (input.baseManifestHash ?? HASH),
      baseReleaseId,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      format: "localized-content-release",
      itemCount: 0,
      itemsDigest: HASH,
      origin: {
        kind: "git",
        sha: input.sha ?? GitCommitShaSchema.make("a".repeat(40)),
      },
      projectionCount: 0,
      projectionDigest: input.projectionDigest ?? OTHER_HASH,
      releaseId: releaseId(id),
      rendererContractVersion:
        input.rendererManifest?.rendererContractVersion ??
        RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash:
        input.rendererManifest?.hash ?? RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: HASH,
      routeCount: 0,
      routeDigest: HASH,
      scope: input.scope ?? FUNCTION_SCOPE,
      snapshots: {
        ...inheritContentSnapshots(null),
        tryout: inheritContentSnapshot(input.tryoutSnapshotId ?? null),
      },
      upsertCount: 0,
    }),
    input.keyId,
    input.rendererManifest
  );
}

/** Creates one exact forward-rollback bundle for recovery tests. */
export function rollbackBundle(
  id: string,
  rollbackOf: ReleaseId,
  baseManifestHash = HASH
) {
  return bundleFromManifest(
    ContentReleaseManifestSchema.make({
      activeAppLocales: ACTIVE_APP_LOCALES,
      baseActiveAppLocales: ACTIVE_APP_LOCALES,
      baseManifestHash,
      baseReleaseId: rollbackOf,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      format: "localized-content-release",
      itemCount: 0,
      itemsDigest: HASH,
      origin: { kind: "rollback", releaseId: rollbackOf },
      projectionCount: 0,
      projectionDigest: OTHER_HASH,
      releaseId: releaseId(id),
      rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: HASH,
      routeCount: 0,
      routeDigest: HASH,
      scope: FUNCTION_SCOPE,
      snapshots: inheritContentSnapshots(null),
      upsertCount: 0,
    })
  );
}

/** Creates the exact verified inverse retained for one candidate or active bundle. */
export function recoveryBundle(id: string, target: ContentReleaseBundle) {
  const targetManifest = target.release.manifest;
  return {
    ...bundleFromManifest(
      ContentReleaseManifestSchema.make({
        activeAppLocales:
          targetManifest.baseActiveAppLocales ?? ACTIVE_APP_LOCALES,
        baseActiveAppLocales: targetManifest.activeAppLocales,
        baseManifestHash: target.release.manifestHash,
        baseReleaseId: targetManifest.releaseId,
        baseResultCount: targetManifest.resultCount,
        baseResultDigest: targetManifest.resultDigest,
        deleteCount: 0,
        format: "localized-content-release",
        itemCount: 0,
        itemsDigest: HASH,
        origin: { kind: "rollback", releaseId: targetManifest.releaseId },
        projectionCount: 0,
        projectionDigest: OTHER_HASH,
        releaseId: releaseId(id),
        rendererContractVersion:
          target.rendererManifest.rendererContractVersion,
        rendererManifestHash: target.rendererManifest.hash,
        resultCount: targetManifest.baseResultCount,
        resultDigest: targetManifest.baseResultDigest,
        rollbackCount: 0,
        rollbackDigest: HASH,
        routeCount: 0,
        routeDigest: HASH,
        scope: targetManifest.scope,
        snapshots: invertContentSnapshots(targetManifest.snapshots),
        upsertCount: 0,
      })
    ),
    phase: "verified" as const,
  };
}

/** Adds terminal receipt evidence to one immutable release bundle. */
export function completedBundle(
  bundle: ContentReleaseBundle
): ActiveContentRelease {
  return { ...bundle, receipt: receiptFor(bundle.release.manifest) };
}

/** Creates one structurally valid permanent runtime bundle for CLI state tests. */
export function runtimeBundleFor(
  bundle: ContentReleaseBundle,
  snapshotId: typeof Sha256HashSchema.Type
) {
  return SignedTryoutRuntimeBundleSchema.make({
    bundleHash: HASH,
    keyId: bundle.release.keyId,
    payload: {
      format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
      rendererManifestHash: bundle.rendererManifest.hash,
      snapshot: {
        activeAppLocales: ACTIVE_APP_LOCALES,
        catalogDigest: HASH,
        counts: { country: 0, exam: 0, section: 0, set: 0, track: 0 },
        format: TRYOUT_SNAPSHOT_FORMAT,
        placementCount: 0,
        placementDigest: HASH,
        routeCount: 0,
        snapshotId,
      },
      sourceGitSha: GitCommitShaSchema.make("a".repeat(40)),
      sourceManifestHash: bundle.release.manifestHash,
      sourceReleaseId: bundle.release.manifest.releaseId,
    },
    signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
  });
}

/** Creates terminal publication evidence bound to one exact manifest. */
export function receiptFor(
  manifest: ContentReleaseManifest
): PublicationReceipt {
  return {
    activatedHeads: manifest.upsertCount,
    activeAppLocales: manifest.activeAppLocales,
    deletedHeads: manifest.deleteCount,
    manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
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

/** Decodes authoritative current state through its exact public contract. */
export function currentState(input: {
  readonly active: unknown;
  readonly candidate: unknown;
  readonly recovery: unknown;
  readonly tryoutRuntimeBundle?: unknown;
}): ContentReleaseCurrent {
  return Schema.decodeUnknownSync(ContentReleaseCurrentSchema)({
    ...input,
    tryoutRuntimeBundle: input.tryoutRuntimeBundle ?? null,
  });
}

/** Creates a complete target whose unrelated operations fail immediately. */
export function makeProductionTarget(
  current: () => unknown
): typeof PublicationTarget.Service {
  /** Makes unrequested operations fail the test immediately. */
  const unused = () => Effect.die("Unused target operation.");
  return PublicationTarget.of({
    abort: unused,
    accept: unused,
    activate: unused,
    activateRecovery: unused,
    cleanup: unused,
    current: Effect.suspend(() =>
      Schema.decodeUnknownEffect(ContentReleaseCurrentSchema)(current()).pipe(
        Effect.orDie
      )
    ),
    headPage: unused,
    recovery: unused,
    rollbackPage: unused,
    routePage: unused,
    stageArtifactBatch: unused,
    stageGroup: unused,
    stageItemBatch: unused,
    stageProjectionBatch: unused,
    stageRecovery: unused,
    stageRelease: unused,
    stageRouteBatch: unused,
    stageSnapshot: unused,
    stageSnapshotBatch: unused,
    stageTryoutRuntimeBundle: unused,
    status: unused,
    verify: unused,
  });
}
