import { generateKeyPairSync } from "node:crypto";
import { Path } from "@effect/platform";
import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { hashMaterialProjection } from "@nakafa/aksara-contracts/projection/hash";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafa/aksara-contracts/projection/material";
import {
  ContentReleaseManifestSchema,
  ContentUpsertSchema,
  RollbackSignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { rendererDomains } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Redacted, Schema, Stream } from "effect";
import { prepareContentRelease } from "#publisher/preparation";
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

export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
  })
);
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("test:publication"),
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/publication/en.mdx"
  ),
});
const { payload } = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);
export const projection = MaterialLessonProjectionSchema.make({
  contentKey: source.contentKey,
  kind: "subject-lesson",
  locale: source.locale,
  materialKey: MaterialKeySchema.make("test.material"),
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: PublicPathSchema.make("subjects/test/material"),
  publicPath: PublicPathSchema.make("subjects/test/material/lesson"),
  sectionKey: MaterialSectionSchema.make("test-lesson"),
  sitemap: true,
});
export const contentRecord = {
  change: ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(payload),
    contentKey: payload.contentKey,
    delivery: "public",
    locale: payload.locale,
    operation: "upsert",
    rendererDomain: payload.rendererDomain,
    sourcePath: source.sourcePath,
  }),
  payload,
  projection,
  source,
};
export const head = MaterialHeadSchema.make({
  artifactHash: contentRecord.change.artifactHash,
  compilerConfigHash: payload.compilerConfigHash,
  contentKey: contentRecord.change.contentKey,
  delivery: contentRecord.change.delivery,
  locale: contentRecord.change.locale,
  projectionHash: hashMaterialProjection(projection),
  publicPath: projection.publicPath,
  rendererDomain: contentRecord.change.rendererDomain,
  sourceHash: payload.sourceHash,
  sourcePath: contentRecord.change.sourcePath,
});
export const record = {
  prior: {
    contentKey: contentRecord.change.contentKey,
    locale: contentRecord.change.locale,
    state: "absent" as const,
  },
  record: contentRecord,
};
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

/** Prepares one real publisher input through the only public constructor. */
export async function makeRelease(
  releaseId: string,
  records: () => Stream.Stream<unknown> = () => Stream.make(record),
  sha = "a".repeat(40)
) {
  const prepared = await Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make(sha),
      baseManifestHash: null,
      baseReleaseId: null,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      records,
      releaseId: ReleaseIdSchema.make(releaseId),
      rendererManifest,
      result: () => Stream.make(head),
      routes: () =>
        Stream.make({
          current: {
            contentKey: contentRecord.change.contentKey,
            locale: contentRecord.change.locale,
          },
          next: {
            contentKey: contentRecord.change.contentKey,
            locale: contentRecord.change.locale,
            publicPath: projection.publicPath,
          },
        }),
    })
  );
  return { manifest: prepared.manifest, prepared };
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
  });
  const signer = await makeTestSigner();
  const artifact = await Effect.runPromise(signer.signArtifact(payload));
  const prepared = makePreparedRollbackRelease({
    artifacts: () => Stream.make(artifact),
    items: git.prepared.items,
    manifest,
    projections: git.prepared.projections,
    rendererManifest,
    routes: git.prepared.routes,
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
  publicationSource: typeof PublicationSource.Service,
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
    Effect.provideService(PublicationSource, publicationSource),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationActivation, activationService),
    Effect.provideService(PublicationTarget, target)
  );
}

/** Runs one prepared release with its default reviewed Git source adapter. */
export function publishPrepared<E, R>(
  prepared: PreparedGitRelease<E, R>,
  target: typeof PublicationTarget.Service,
  rawMdx = source.rawMdx,
  currentKeyId = signingKey.keyId,
  recoveryId = ReleaseIdSchema.make(`${prepared.manifest.releaseId}-recovery`),
  activationService = activation
) {
  return publishFromSource(
    prepared,
    target,
    PublicationSource.of({
      loadExactRevision: () => Stream.make({ ...source, rawMdx }),
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
    source.rawMdx,
    signingKey.keyId,
    recoveryId,
    activationService
  );
}
