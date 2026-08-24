import { Buffer } from "node:buffer";
import { createHash, generateKeyPairSync } from "node:crypto";
import { NodeServices } from "@effect/platform-node";
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
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import { ContentReleaseManifestSchema } from "@nakafa/aksara-contracts/release";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import {
  RollbackDeleteStateSchema,
  RollbackPageSchema,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer, Path, Schema, Stream } from "effect";
import { prepareContentRelease } from "#publisher/preparation";
import { PublicationTarget } from "#publisher/publication/spec";
import { prepareRollback } from "#publisher/rollback";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { testFileLayer } from "#test/files";
import { materialGraph } from "#test/graph";
import { testRendererDomains } from "#test/renderer";
import { emptySnapshotSources, snapshotPolicyBase } from "#test/snapshot";
import { makePublicationTarget } from "#test/target";

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
    domains: testRendererDomains({
      chemistry: [{ name: "TestChemistry", version: 1 }],
      mathematics: [{ name: "TestMathematics", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
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
    domains: testRendererDomains({
      chemistry: [{ name: "TestChemistry", version: 1 }],
      mathematics: [{ name: "TestMathematics", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
  })
);
const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/test/rollback/forward.mdx"
);
const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  byteLength: Buffer.byteLength(compiledCode, "utf8"),
  compiledCode,
  compilerConfigHash: `sha256:${"a".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:rollback-forward",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: "Test protocol",
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [{ name: "CurrentOnly", version: 1 }],
  sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
});
const rollbackAppLocale = AppLocaleSchema.make("en");
const source = CompileDocumentSourceSchema.make({
  artifactLocale: payload.artifactLocale,
  contentKey: payload.contentKey,
  rawMdx,
  rendererDomain: payload.rendererDomain,
  sourcePath,
});
const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: rollbackAppLocale,
  artifactLocale: payload.artifactLocale,
  contentKey: payload.contentKey,
  graph: materialGraph(rollbackAppLocale, "rollback", "test-forward"),
  kind: "subject-lesson",
  materialKey: "lesson.test.rollback",
  metadata: {
    authors: [],
    datePublished: "2026-01-01",
    title: "Test protocol",
  },
  order: 1,
  parentPath: "subjects/test/rollback",
  publicPath: "subjects/test/rollback/forward",
  sectionKey: "test-forward",
  sitemap: true,
  topicTitle: "Test Rollback Topic",
});
const artifactHash = hashCompiledContentPayload(payload);
const change = {
  artifactHash,
  artifactLocale: payload.artifactLocale,
  contentKey: payload.contentKey,
  delivery: "public" as const,
  family: "material" as const,
  operation: "upsert" as const,
  rendererDomain: payload.rendererDomain,
  sourcePath,
};
const head = MaterialHeadSchema.make({
  artifactHash,
  artifactLocale: payload.artifactLocale,
  compilerConfigHash: payload.compilerConfigHash,
  contentKey: payload.contentKey,
  delivery: change.delivery,
  family: "material",
  projectionHash: hashContentProjection(projection),
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
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    records: Stream.make({
      prior: {
        artifactLocale: payload.artifactLocale,
        contentKey: payload.contentKey,
        family: "material",
        state: "absent" as const,
      },
      record: { change, payload, projection, source },
    }),
    releaseId: rollbackOf,
    rendererManifest: sourceRendererManifest,
    result: Stream.make(head),
    routes: Stream.empty,
    scope: {
      content: [
        {
          artifactLocale: change.artifactLocale,
          contentKey: change.contentKey,
          family: change.family,
        },
      ],
      families: [],
      snapshots: [],
    },
    ...snapshotPolicyBase("test-rollback-source-base"),
    ...emptySnapshotSources,
  }).pipe(Effect.provide(NodeServices.layer))
);
const sourceManifest = ContentReleaseManifestSchema.make({
  ...sourcePrepared.manifest,
  baseActiveAppLocales: null,
  baseManifestHash: null,
  baseReleaseId: null,
});
export const sourceRelease = await Effect.runPromise(
  signer.signRelease(sourceManifest)
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
      artifactLocale: payload.artifactLocale,
      contentKey: payload.contentKey,
      family: "material",
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
  return makePublicationTarget({
    headPage: (request) => {
      const common = {
        activeManifestHash: request.activeManifestHash,
        activeReleaseId: request.activeReleaseId,
        cursor: request.cursor,
        done: true as const,
        nextCursor: null,
      };
      if (request.family === "article") {
        return Effect.succeed({
          ...common,
          family: "article" as const,
          heads: [],
        });
      }
      if (request.family === "page") {
        return Effect.succeed({
          ...common,
          family: "page" as const,
          heads: [],
        });
      }
      if (request.family === "question") {
        return Effect.succeed({
          ...common,
          family: "question" as const,
          heads: [],
        });
      }
      return Effect.succeed({
        ...common,
        family: "material" as const,
        heads: [head],
      });
    },
    rollbackPage: loadPage,
    routePage: (request) =>
      Effect.succeed({
        done: true,
        nextIndex: -1,
        records: [],
        rollbackOf: request.rollbackOf,
        rollbackOfManifestHash: request.rollbackOfManifestHash,
        total: 0,
      }),
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
    Effect.provide([
      testFileLayer(new Map()),
      Path.layer,
      Layer.succeed(ContentVerificationKeyResolver, resolver),
      Layer.succeed(PublicationTarget, target),
    ])
  );
}
