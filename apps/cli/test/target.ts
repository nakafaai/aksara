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
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Schema } from "effect";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";

const HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const OTHER_HASH = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Signs a structurally valid test manifest with its exact canonical hash. */
const bundleFromManifest = Effect.fn("AksaraCliTest.bundleFromManifest")(
  function* (
    manifest: ContentReleaseManifest,
    keyId = SigningKeyIdSchema.make("content-2026-07-23"),
    rendererManifest: RendererManifestEnvelope = RENDERER_MANIFEST
  ) {
    const manifestHash = yield* hashContentReleaseManifest(manifest).pipe(
      Effect.orDie
    );
    const release = SignedContentReleaseSchema.make({
      keyId,
      manifest,
      manifestHash,
      signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
    });
    return ContentReleaseBundleSchema.make({
      release,
      rendererManifest,
    });
  }
);

/** Creates one contract-owned release identity for production assertions. */
export function releaseId(value: string) {
  return ReleaseIdSchema.make(value);
}

/** Creates one exact Git release bundle for recovery orchestration tests. */
export const gitBundle = Effect.fn("AksaraCliTest.gitBundle")(function* (
  id: string,
  input: {
    readonly baseManifestHash?: typeof Sha256HashSchema.Type;
    readonly baseReleaseId?: ReleaseId | null;
    readonly keyId?: typeof SigningKeyIdSchema.Type;
    readonly projectionDigest?: typeof Sha256HashSchema.Type;
    readonly rendererManifest?: RendererManifestEnvelope;
    readonly scope?: PublicationScope;
    readonly sha?: typeof GitCommitShaSchema.Type;
    readonly assessmentSnapshotId?: typeof Sha256HashSchema.Type;
  } = {}
) {
  const baseReleaseId = input.baseReleaseId ?? null;
  return yield* bundleFromManifest(
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
        assessment: inheritContentSnapshot(input.assessmentSnapshotId ?? null),
      },
      upsertCount: 0,
    }),
    input.keyId,
    input.rendererManifest
  );
});

/** The staged Git release bundle that the cache and activation suites share, hashed once for the process. */
export const STAGED_RELEASE_BUNDLE = await Effect.runPromise(
  gitBundle("release-next")
);

/** Creates the exact verified inverse retained for one candidate or active bundle. */
export const recoveryBundle = Effect.fn("AksaraCliTest.recoveryBundle")(
  function* (id: string, target: ContentReleaseBundle) {
    const targetManifest = target.release.manifest;
    const bundle = yield* bundleFromManifest(
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
    );
    return { ...bundle, phase: "verified" as const };
  }
);

/** Adds terminal receipt evidence to one immutable release bundle. */
export const completedBundle = Effect.fn("AksaraCliTest.completedBundle")(
  function* (bundle: ContentReleaseBundle) {
    const receipt = yield* receiptFor(bundle.release.manifest);
    const completed: ActiveContentRelease = { ...bundle, receipt };
    return completed;
  }
);

/** Creates terminal publication evidence bound to one exact manifest. */
export const receiptFor = Effect.fn("AksaraCliTest.receiptFor")(function* (
  manifest: ContentReleaseManifest
) {
  const manifestHash = yield* hashContentReleaseManifest(manifest).pipe(
    Effect.orDie
  );
  const receipt: PublicationReceipt = {
    activatedHeads: manifest.upsertCount,
    activeAppLocales: manifest.activeAppLocales,
    deletedHeads: manifest.deleteCount,
    manifestHash,
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
  return receipt;
});

/** Decodes authoritative current state through its exact public contract. */
export function currentState(input: {
  readonly active: unknown;
  readonly candidate: unknown;
  readonly recovery: unknown;
}): ContentReleaseCurrent {
  return Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(input);
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
    status: unused,
    verify: unused,
  });
}
