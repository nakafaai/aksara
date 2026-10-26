import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  RollbackSignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { invertContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer, Path, Redacted, Schema, Stream } from "effect";
import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
  type PreparedGitRelease,
  type PreparedRollbackRelease,
} from "#publisher/preparation/prepared";
import { publishGitRelease } from "#publisher/publication";
import { preparePublicationPlan } from "#publisher/publication/plan";
import {
  PublicationActivation,
  PublicationRetention,
  type PublicationRetentionDecision,
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { testFileLayer } from "#test/files";
import { testSigningKeyPair } from "#test/keys";
import {
  makeRelease,
  publicationPayload,
  publicationSource,
  rendererManifest,
} from "#test/publication";
import { emptySnapshotSources } from "#test/snapshot";

const signingKey = PublicationSigningKey.of({
  keyId: "test-signing-key",
  privateKeyPem: Redacted.make(testSigningKeyPair.privateKeyPem),
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed(testSigningKeyPair.publicKeyPem),
});
const activation = PublicationActivation.of({
  invalidate: () => Effect.void,
  verify: () => Effect.void,
});

/** Public-key resolver paired with the private test publication signer. */
export const testVerificationResolver = resolver;

/** Creates the signer paired with the exported test verification resolver. */
function makeTestSigner() {
  return Effect.runPromise(
    makeEd25519PublicationSigner({
      keyId: signingKey.keyId,
      privateKeyPem: testSigningKeyPair.privateKeyPem,
    })
  );
}

/** Builds one internal recovery candidate from an authenticated active release. */
export async function makeRollbackRelease(releaseId: string) {
  const git = await makeRelease(releaseId);
  const rollbackOf = ReleaseIdSchema.make("test-active-release");
  const manifest = ContentReleaseManifestSchema.make({
    ...git.manifest,
    baseActiveAppLocales: git.manifest.activeAppLocales,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
    baseReleaseId: rollbackOf,
    baseResultCount: git.manifest.resultCount,
    baseResultDigest: git.manifest.resultDigest,
    origin: { kind: "rollback", releaseId: rollbackOf },
    snapshots: invertContentSnapshots(git.manifest.snapshots),
  });
  const signer = await makeTestSigner();
  const artifact = await Effect.runPromise(
    signer.signArtifact(publicationPayload)
  );
  const prepared = makePreparedRollbackRelease({
    artifacts: Stream.make(artifact),
    items: git.prepared.items,
    manifest,
    projections: git.prepared.projections,
    rendererManifest,
    routes: git.prepared.routes,
    ...emptySnapshotSources,
  });
  const release = await Effect.runPromise(
    signer
      .signRelease(manifest)
      .pipe(
        Effect.flatMap(Schema.decodeEffect(RollbackSignedContentReleaseSchema))
      )
  );
  return { manifest, prepared, release };
}

/** Signs one real prepared release for crash-recovery assertions. */
export async function makeSignedBundle(releaseId: string) {
  const prepared = await makeRelease(releaseId);
  const signer = await makeTestSigner();
  const release = await Effect.runPromise(
    signer.signRelease(prepared.manifest)
  );
  return { release, rendererManifest };
}

/** Try-out snapshot that a base names, which a bootstrap must not keep. */

/**
 * Prepares one exact-Git release over a declared base. Unless some base heads
 * survive, every result is one of its own upserts, so it replaces the base.
 */
export async function makeBootstrapRelease(
  releaseId: string,
  baseReleaseId: string,
  survivingHeads = 0
) {
  const git = await makeRelease(releaseId);
  const manifest = ContentReleaseManifestSchema.make({
    ...git.manifest,
    baseActiveAppLocales: git.manifest.activeAppLocales,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    baseReleaseId: ReleaseIdSchema.make(baseReleaseId),
    resultCount: git.manifest.resultCount + survivingHeads,
  });
  return {
    manifest,
    prepared: makePreparedGitRelease({ ...git.prepared, manifest }),
  };
}

/** Runs one prepared release with an explicitly supplied exact-Git source. */
export function publishFromSource<E, R>(
  prepared: PreparedGitRelease<E, R>,
  target: typeof PublicationTarget.Service,
  source: typeof PublicationSource.Service,
  currentKeyId = signingKey.keyId,
  retention: PublicationRetentionDecision = {
    kind: "inverse",
    recoveryId: ReleaseIdSchema.make(`${prepared.manifest.releaseId}-recovery`),
  },
  activationService = activation
) {
  return publishGitRelease(prepared).pipe(
    Effect.provide([
      testFileLayer([]),
      Path.layer,
      Layer.succeed(
        PublicationSigningKey,
        PublicationSigningKey.of({ ...signingKey, keyId: currentKeyId })
      ),
      Layer.succeed(PublicationRetention, retention),
      Layer.succeed(PublicationSource, source),
      Layer.succeed(ContentVerificationKeyResolver, resolver),
      Layer.succeed(PublicationActivation, activationService),
      Layer.succeed(PublicationTarget, target),
    ])
  );
}

/** Runs one prepared release with its default reviewed Git source adapter. */
export function publishPrepared<E, R>(
  prepared: PreparedGitRelease<E, R>,
  target: typeof PublicationTarget.Service,
  rawMdx = publicationSource.rawMdx,
  currentKeyId = signingKey.keyId,
  recoveryId = ReleaseIdSchema.make(`${prepared.manifest.releaseId}-recovery`),
  activationService = activation
) {
  return publishFromSource(
    prepared,
    target,
    PublicationSource.of({
      loadExactRevision: () => Stream.make({ ...publicationSource, rawMdx }),
    }),
    currentKeyId,
    { kind: "inverse", recoveryId },
    activationService
  );
}

/** Runs one prepared release as a bootstrap that declares its retired base. */
export function publishBootstrap<E, R>(
  prepared: PreparedGitRelease<E, R>,
  target: typeof PublicationTarget.Service,
  baseReleaseId: string,
  activationService = activation
) {
  return publishFromSource(
    prepared,
    target,
    PublicationSource.of({
      loadExactRevision: () => Stream.make(publicationSource),
    }),
    signingKey.keyId,
    { baseReleaseId: ReleaseIdSchema.make(baseReleaseId), kind: "bootstrap" },
    activationService
  );
}

/** Prepares one internal retained recovery without exposing operator rollback. */
export function prepareRecoveryPlan<E, R>(
  prepared: PreparedRollbackRelease<E, R>,
  target: typeof PublicationTarget.Service
) {
  return preparePublicationPlan({ input: prepared, kind: "rollback" }).pipe(
    Effect.provide([
      testFileLayer([]),
      Path.layer,
      Layer.succeed(PublicationSigningKey, signingKey),
      Layer.succeed(ContentVerificationKeyResolver, resolver),
      Layer.succeed(PublicationTarget, target),
    ])
  );
}

/** Publishes one test release through its exact prepared domain value. */
export function publish(
  release: Awaited<ReturnType<typeof makeRelease>>,
  target: typeof PublicationTarget.Service,
  recoveryId = ReleaseIdSchema.make(`${release.manifest.releaseId}-recovery`),
  activationService = activation
) {
  return publishPrepared(
    release.prepared,
    target,
    publicationSource.rawMdx,
    signingKey.keyId,
    recoveryId,
    activationService
  );
}
