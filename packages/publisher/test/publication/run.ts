import { generateKeyPairSync } from "node:crypto";
import { Path } from "@effect/platform";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  RollbackSignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { invertContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Redacted, Schema, Stream } from "effect";
import {
  makePreparedRollbackRelease,
  type PreparedGitRelease,
  type PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import {
  publishGitRelease,
  publishRollbackRelease,
} from "#publisher/publication";
import {
  PublicationActivation,
  PublicationRecoveryId,
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import { testFileLayer } from "#test/files";
import {
  makeRelease,
  publicationPayload,
  publicationSource,
  rendererManifest,
} from "#test/publication";
import { emptySnapshotSources } from "#test/snapshot";

const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const signingKey = PublicationSigningKey.of({
  keyId: "test-signing-key",
  privateKeyPem: Redacted.make(
    privateKey.export({ format: "pem", type: "pkcs8" }).toString()
  ),
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
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
      privateKeyPem: privateKey
        .export({ format: "pem", type: "pkcs8" })
        .toString(),
    })
  );
}

/** Reuses one exact signed artifact in a valid forward rollback release. */
export async function makeRollbackRelease(releaseId: string) {
  const git = await makeRelease(releaseId);
  const rollbackOf = ReleaseIdSchema.make("test-active-release");
  const manifest = ContentReleaseManifestSchema.make({
    ...git.manifest,
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
    artifacts: () => Stream.make(artifact),
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
      .pipe(Effect.flatMap(Schema.decode(RollbackSignedContentReleaseSchema)))
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

/** Runs one prepared release with an explicitly supplied exact-Git source. */
export function publishFromSource<E, R>(
  prepared: PreparedGitRelease<E, R>,
  target: typeof PublicationTarget.Service,
  source: typeof PublicationSource.Service,
  currentKeyId = signingKey.keyId,
  recoveryId = ReleaseIdSchema.make(`${prepared.manifest.releaseId}-recovery`),
  activationService = activation
) {
  return publishGitRelease(prepared).pipe(
    Effect.provide(testFileLayer(new Map())),
    Effect.provide(Path.layer),
    Effect.provideService(
      PublicationSigningKey,
      PublicationSigningKey.of({ ...signingKey, keyId: currentKeyId })
    ),
    Effect.provideService(PublicationRecoveryId, recoveryId),
    Effect.provideService(PublicationSource, source),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationActivation, activationService),
    Effect.provideService(PublicationTarget, target)
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
    recoveryId,
    activationService
  );
}

/** Runs one rollback release without constructing an unrelated Git source. */
export function publishRollbackPrepared<E, R>(
  prepared: PreparedRollbackRelease<E, R>,
  target: typeof PublicationTarget.Service,
  recoveryId = ReleaseIdSchema.make(`${prepared.manifest.releaseId}-recovery`),
  activationService = activation
) {
  return publishRollbackRelease(prepared).pipe(
    Effect.provide(testFileLayer(new Map())),
    Effect.provide(Path.layer),
    Effect.provideService(PublicationRecoveryId, recoveryId),
    Effect.provideService(PublicationSigningKey, signingKey),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationActivation, activationService),
    Effect.provideService(PublicationTarget, target)
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
