import { generateKeyPairSync } from "node:crypto";
import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import { CompileDocumentSourceSchema } from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  ReleaseIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import {
  MaterialKeySchema,
  MaterialLessonProjectionSchema,
  MaterialSectionSchema,
} from "@nakafaai/aksara-contracts/projection/material";
import {
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  ContentUpsertSchema,
  type SignedContentRelease,
} from "@nakafaai/aksara-contracts/release";
import type { ContentReleaseStatus } from "@nakafaai/aksara-contracts/release/lifecycle";
import type { RendererDomain } from "@nakafaai/aksara-contracts/renderer/domain";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafaai/aksara-contracts/signature/spec";
import { Effect, Redacted, Stream } from "effect";
import { vi } from "vitest";
import { prepareContentRelease } from "#publisher/preparation";
import {
  makePreparedRollbackRelease,
  type PreparedContentRelease,
} from "#publisher/preparation/spec";
import { publishContentRelease } from "#publisher/publication";
import {
  PublicationSigningKey,
  PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import { makeEd25519PublicationSigner } from "#publisher/signing";

/** Builds one domain capability from one explicit test component. */
function rendererDomain(name: RendererDomain, componentName: string) {
  const components = [{ name: componentName, version: 1 }];
  return {
    authoringComponents: components,
    name,
    supportedComponents: components,
  };
}

export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: [
      rendererDomain("material-chemistry", "AtomShellLab"),
      rendererDomain("material-mathematics", "FunctionMachine"),
    ],
  })
);
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("test:publication"),
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "material-mathematics",
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
export const record = {
  change: ContentUpsertSchema.make({
    artifactHash: hashCompiledContentPayload(payload),
    contentKey: payload.contentKey,
    delivery: "public",
    locale: payload.locale,
    operation: "upsert",
    publicPath: projection.publicPath,
    rendererDomain: payload.rendererDomain,
    sourcePath: source.sourcePath,
  }),
  payload,
  projection,
  source,
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

/** Prepares one real publisher input through the only public constructor. */
export async function makeRelease(
  releaseId: string,
  records: () => Stream.Stream<unknown> = () => Stream.make(record),
  sha = "a".repeat(40)
) {
  const prepared = await Effect.runPromise(
    prepareContentRelease({
      aksaraSha: GitCommitShaSchema.make(sha),
      baseReleaseId: null,
      records,
      releaseId: ReleaseIdSchema.make(releaseId),
      rendererManifest,
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
    baseReleaseId: rollbackOf,
    origin: { kind: "rollback", releaseId: rollbackOf },
  });
  const signer = await Effect.runPromise(
    makeEd25519PublicationSigner({
      keyId: signingKey.keyId,
      privateKeyPem: privateKey
        .export({ format: "pem", type: "pkcs8" })
        .toString(),
    })
  );
  const artifact = await Effect.runPromise(signer.signArtifact(payload));
  const prepared = makePreparedRollbackRelease({
    artifacts: () => Stream.make(artifact),
    items: git.prepared.items,
    manifest,
    projections: git.prepared.projections,
    rendererManifest,
  });
  return { manifest, prepared };
}

/** Builds an observable durable target with exact manifest identity binding. */
export function makeTarget(release: {
  readonly manifest: ContentReleaseManifest;
}) {
  let phase: ContentReleaseStatus["phase"] = "missing";
  let storedHash: SignedContentRelease["manifestHash"] | undefined;
  let activationTransitions = 0;
  /** Returns the exact durable publication result for this test release. */
  const receipt = () => ({
    activatedHeads: 1,
    deletedHeads: 0,
    projectionDigest: release.manifest.projectionDigest,
    releaseId: release.manifest.releaseId,
    stagedArtifacts: 1,
    stagedItems: release.manifest.itemCount,
    stagedProjections: release.manifest.projectionCount,
  });
  /** Returns target-side evidence recomputed from persisted staged rows. */
  const evidence = () => ({
    baseReleaseId: release.manifest.baseReleaseId,
    deleteHeads: 0,
    itemCount: release.manifest.itemCount,
    itemsDigest: release.manifest.itemsDigest,
    projectionCount: release.manifest.projectionCount,
    projectionDigest: release.manifest.projectionDigest,
    releaseId: release.manifest.releaseId,
    rendererContractVersion: release.manifest.rendererContractVersion,
    rendererManifestHash: release.manifest.rendererManifestHash,
    stagedArtifacts: 1,
    upsertHeads: 1,
  });
  const stageRelease = vi.fn((signed: SignedContentRelease) =>
    Effect.sync(() => {
      storedHash = signed.manifestHash;
      if (phase === "missing") {
        phase = "staging";
      }
    })
  );
  const verify = vi.fn(() => Effect.succeed(evidence()));
  const activate = vi.fn(() =>
    Effect.sync(() => {
      phase = "active";
      activationTransitions += 1;
      return receipt();
    })
  );
  const finalize = vi.fn(() =>
    Effect.sync(() => {
      phase = "completed";
      return receipt();
    })
  );
  const status = vi.fn(() => {
    if (storedHash === undefined) {
      return Effect.die("The signed release must be staged before status.");
    }
    return Effect.succeed<ContentReleaseStatus>(
      phase === "completed"
        ? {
            manifestHash: storedHash,
            phase,
            receipt: receipt(),
            releaseId: release.manifest.releaseId,
          }
        : {
            manifestHash: storedHash,
            phase,
            releaseId: release.manifest.releaseId,
          }
    );
  });
  const stageArtifactBatch = vi.fn(() => Effect.void);
  const stageItemBatch = vi.fn(() => Effect.void);
  const stageProjectionBatch = vi.fn(() => Effect.void);
  return {
    activate,
    /** Reports how many atomic activation transitions actually occurred. */
    get activationTransitions() {
      return activationTransitions;
    },
    evidence,
    stageArtifactBatch,
    stageItemBatch,
    stageProjectionBatch,
    stageRelease,
    target: PublicationTarget.of({
      activate,
      cleanup: () => Effect.die("Cleanup is outside publication tests."),
      finalize,
      rollbackPage: () => Effect.die("Rollback is outside publication tests."),
      stageArtifactBatch,
      stageItemBatch,
      stageProjectionBatch,
      stageRelease,
      status,
      verify,
    }),
    verify,
  };
}

/** Runs one prepared release with its exact reviewed Git source adapter. */
export function publishPrepared<E, R>(
  prepared: PreparedContentRelease<E, R>,
  target: typeof PublicationTarget.Service,
  rawMdx = source.rawMdx
) {
  return publishContentRelease(prepared).pipe(
    Effect.provideService(PublicationSigningKey, signingKey),
    Effect.provideService(
      PublicationSource,
      PublicationSource.of({
        loadExactRevision: () => Stream.make({ ...source, rawMdx }),
      })
    ),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationTarget, target)
  );
}

/** Publishes one test release through its exact prepared domain value. */
export function publish(
  release: Awaited<ReturnType<typeof makeRelease>>,
  target: typeof PublicationTarget.Service
) {
  return publishPrepared(release.prepared, target);
}
