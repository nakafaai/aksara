import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  type PublicationReceipt,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import {
  type ActiveContentRelease,
  type ContentReleaseCurrent,
  ContentReleaseCurrentSchema,
} from "@nakafa/aksara-contracts/release/current";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import {
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Schema } from "effect";
import { RENDERER_MANIFEST } from "#test/real";

const HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const OTHER_HASH = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Signs a structurally valid test manifest with its exact canonical hash. */
function bundleFromManifest(
  manifest: ContentReleaseManifest,
  keyId = SigningKeyIdSchema.make("content-2026-07")
): ContentReleaseBundle {
  const release = SignedContentReleaseSchema.make({
    keyId,
    manifest,
    manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
    signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
  });
  return ContentReleaseBundleSchema.make({
    release,
    rendererManifest: RENDERER_MANIFEST,
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
    readonly sha?: typeof GitCommitShaSchema.Type;
  } = {}
) {
  const baseReleaseId = input.baseReleaseId ?? null;
  return bundleFromManifest(
    ContentReleaseManifestSchema.make({
      baseManifestHash:
        baseReleaseId === null ? null : (input.baseManifestHash ?? HASH),
      baseReleaseId,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      itemCount: 0,
      itemsDigest: HASH,
      origin: {
        kind: "git",
        sha: input.sha ?? GitCommitShaSchema.make("a".repeat(40)),
      },
      projectionCount: 0,
      projectionDigest: input.projectionDigest ?? OTHER_HASH,
      releaseId: releaseId(id),
      rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: HASH,
      routeCount: 0,
      routeDigest: HASH,
      upsertCount: 0,
    }),
    input.keyId
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
      baseManifestHash,
      baseReleaseId: rollbackOf,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
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
        baseManifestHash: target.release.manifestHash,
        baseReleaseId: targetManifest.releaseId,
        baseResultCount: targetManifest.resultCount,
        baseResultDigest: targetManifest.resultDigest,
        deleteCount: 0,
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

/** Creates terminal publication evidence bound to one exact manifest. */
export function receiptFor(
  manifest: ContentReleaseManifest
): PublicationReceipt {
  return {
    activatedHeads: manifest.upsertCount,
    deletedHeads: manifest.deleteCount,
    manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    routeDigest: manifest.routeDigest,
    stagedArtifacts: manifest.upsertCount,
    stagedItems: manifest.itemCount,
    stagedProjections: manifest.projectionCount,
    stagedRoutes: manifest.routeCount,
  };
}

/** Decodes authoritative current state through its exact public contract. */
export function currentState(input: unknown): ContentReleaseCurrent {
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
    current: () =>
      Schema.decodeUnknown(ContentReleaseCurrentSchema)(current()).pipe(
        Effect.orDie
      ),
    headPage: unused,
    recovery: unused,
    rollbackPage: unused,
    routePage: unused,
    stageArtifactBatch: unused,
    stageItemBatch: unused,
    stageProjectionBatch: unused,
    stageRecovery: unused,
    stageRelease: unused,
    stageRouteBatch: unused,
    status: unused,
    verify: unused,
  });
}
