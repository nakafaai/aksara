import { Buffer } from "node:buffer";
import { createHash, generateKeyPairSync } from "node:crypto";
import { Path } from "@effect/platform";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
  CompileDocumentSourceSchema,
  CompiledContentPayloadSchema,
} from "@nakafa/aksara-contracts/content";
import {
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { hashMaterialProjection } from "@nakafa/aksara-contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import {
  RollbackDeleteStateSchema,
  RollbackPageSchema,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema, Stream } from "effect";
import { prepareContentRelease } from "#publisher/preparation";
import { PublicationTarget } from "#publisher/publication/spec";
import { prepareRollback } from "#publisher/rollback";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import { testFileLayer } from "#test/files";
import { rendererDomains } from "#test/renderer";

export const rollbackOf = ReleaseIdSchema.make("test-rollback-active");
export const releaseId = ReleaseIdSchema.make("test-rollback-forward");
const rawMdx = "## Test protocol";
const compiledCode = "return {};";
const keys = generateKeyPairSync("ed25519");
export const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "TestBase", version: 1 }],
      supportedComponents: [{ name: "TestBase", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: { name: "TestChemistry", version: 1 },
      mathematics: { name: "TestMathematics", version: 1 },
    }),
  })
);
const sourceRendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [
        { name: "CurrentOnly", version: 1 },
        { name: "TestBase", version: 1 },
      ],
      supportedComponents: [
        { name: "CurrentOnly", version: 1 },
        { name: "TestBase", version: 1 },
      ],
    },
    domains: rendererDomains({
      chemistry: { name: "TestChemistry", version: 1 },
      mathematics: { name: "TestMathematics", version: 1 },
    }),
  })
);
const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/test/rollback/forward.mdx"
);
const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: Buffer.byteLength(compiledCode, "utf8"),
  compiledCode,
  compilerConfigHash: `sha256:${"a".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:rollback-forward",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: "Test protocol",
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [{ name: "CurrentOnly", version: 1 }],
  sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
});
const source = CompileDocumentSourceSchema.make({
  contentKey: payload.contentKey,
  locale: payload.locale,
  rawMdx,
  rendererDomain: payload.rendererDomain,
  sourcePath,
});
const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: payload.contentKey,
  kind: "subject-lesson",
  locale: payload.locale,
  materialKey: "test.rollback",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test/rollback",
  publicPath: "subjects/test/rollback/forward",
  sectionKey: "test-forward",
  sitemap: true,
});
const artifactHash = hashCompiledContentPayload(payload);
const change = {
  artifactHash,
  contentKey: payload.contentKey,
  delivery: "public" as const,
  locale: payload.locale,
  operation: "upsert" as const,
  publicPath: projection.publicPath,
  rendererDomain: payload.rendererDomain,
  sourcePath,
};
const head = MaterialHeadSchema.make({
  artifactHash,
  compilerConfigHash: payload.compilerConfigHash,
  contentKey: payload.contentKey,
  delivery: change.delivery,
  locale: payload.locale,
  projectionHash: hashMaterialProjection(projection),
  publicPath: projection.publicPath,
  rendererDomain: payload.rendererDomain,
  sourceHash: payload.sourceHash,
  sourcePath,
});
export const signer = await Effect.runPromise(
  makeEd25519PublicationSigner({
    keyId: "test-rollback-key",
    privateKeyPem: keys.privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  })
);
const artifact = await Effect.runPromise(signer.signArtifact(payload));
const sourcePrepared = await Effect.runPromise(
  prepareContentRelease({
    aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    records: () =>
      Stream.make({
        prior: {
          contentKey: payload.contentKey,
          locale: payload.locale,
          state: "absent" as const,
        },
        record: { change, payload, projection, source },
      }),
    releaseId: rollbackOf,
    rendererManifest: sourceRendererManifest,
    result: () => Stream.make(head),
  })
);
export const sourceRelease = await Effect.runPromise(
  signer.signRelease(sourcePrepared.manifest)
);
export const proofBundle = {
  release: sourceRelease,
  rendererManifest: sourceRendererManifest,
};
const transition = RollbackRecordSchema.make({
  current: RollbackUpsertStateSchema.make({ artifact, change, projection }),
  index: 0,
  prior: RollbackDeleteStateSchema.make({
    change: {
      contentKey: payload.contentKey,
      locale: payload.locale,
      operation: "delete",
    },
  }),
});
export const rollbackPage = RollbackPageSchema.make({
  done: true,
  nextIndex: 0,
  records: [transition],
  rollbackOf,
  rollbackOfManifestHash: sourceRelease.manifestHash,
  total: 1,
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});

/** Builds the complete target around observable rollback and active-head reads. */
export function rollbackTarget(
  loadPage: (typeof PublicationTarget.Service)["rollbackPage"]
) {
  return PublicationTarget.of({
    abort: () => Effect.die("Unused target abort."),
    activate: () => Effect.die("Unused target activation."),
    cleanup: () => Effect.die("Unused target cleanup."),
    current: () => Effect.die("Unused target current state."),
    finalize: () => Effect.die("Unused target finalization."),
    headPage: (request) =>
      Effect.succeed({
        activeManifestHash: request.activeManifestHash,
        activeReleaseId: request.activeReleaseId,
        cursor: request.cursor,
        done: true,
        family: "material",
        heads: [head],
        nextCursor: null,
      }),
    rollbackPage: loadPage,
    stageArtifactBatch: () => Effect.die("Unused artifact staging."),
    stageItemBatch: () => Effect.die("Unused item staging."),
    stageProjectionBatch: () => Effect.die("Unused projection staging."),
    stageRelease: () => Effect.die("Unused release staging."),
    status: () => Effect.die("Unused target status."),
    verify: () => Effect.die("Unused target verification."),
  });
}

/** Provides the real rollback target, spool filesystem, and signature trust. */
export function prepareRollbackFixture(
  target: typeof PublicationTarget.Service,
  manifest: unknown = rendererManifest,
  requestedReleaseId = releaseId,
  proof: unknown = proofBundle,
  requestedRollbackOf = rollbackOf
) {
  return prepareRollback({
    proofBundle: proof,
    releaseId: requestedReleaseId,
    rendererManifest: manifest,
    rollbackOf: requestedRollbackOf,
  }).pipe(
    Effect.provide(testFileLayer(new Map())),
    Effect.provide(Path.layer),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationTarget, target)
  );
}
