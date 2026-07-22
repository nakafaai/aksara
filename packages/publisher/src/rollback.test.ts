import { Buffer } from "node:buffer";
import { createHash, generateKeyPairSync } from "node:crypto";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/verify";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  RollbackDeleteSchema,
  RollbackPageSchema,
  RollbackUpsertSchema,
} from "@nakafa/aksara-contracts/release/rollback";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";
import { prepareRollback } from "#publisher/rollback";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import { rendererDomains } from "#test/renderer";

const rollbackOf = ReleaseIdSchema.make("test-rollback-active");
const releaseId = ReleaseIdSchema.make("test-rollback-forward");
const rawMdx = "## Test protocol";
const compiledCode = "return {};";
const keys = generateKeyPairSync("ed25519");
const rendererManifest = await Effect.runPromise(
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
  requiredComponents: [],
  sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
});
const signer = await Effect.runPromise(
  makeEd25519PublicationSigner({
    keyId: "test-rollback-key",
    privateKeyPem: keys.privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  })
);
const artifact = await Effect.runPromise(signer.signArtifact(payload));
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
const upsert = RollbackUpsertSchema.make({
  artifact,
  change: {
    artifactHash: hashCompiledContentPayload(payload),
    contentKey: payload.contentKey,
    delivery: "public",
    locale: payload.locale,
    operation: "upsert",
    publicPath: projection.publicPath,
    rendererDomain: payload.rendererDomain,
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test/rollback/forward.mdx"
    ),
  },
  index: 0,
  projection,
});
const deletion = RollbackDeleteSchema.make({
  change: {
    contentKey: ContentKeySchema.make("test:rollback-z"),
    locale: "en",
    operation: "delete",
  },
  index: 1,
});
const rollbackPage = RollbackPageSchema.make({
  done: true,
  nextIndex: 1,
  records: [upsert, deletion],
  rollbackOf,
  total: 2,
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});

/** Builds the full target service around one observable page loader. */
function targetWith(
  loadPage: (typeof PublicationTarget.Service)["rollbackPage"]
) {
  return PublicationTarget.of({
    activate: () => Effect.die("Unused target activation."),
    cleanup: () => Effect.die("Unused target cleanup."),
    finalize: () => Effect.die("Unused target finalization."),
    rollbackPage: loadPage,
    stageArtifactBatch: () => Effect.die("Unused artifact staging."),
    stageItemBatch: () => Effect.die("Unused item staging."),
    stageProjectionBatch: () => Effect.die("Unused projection staging."),
    stageRelease: () => Effect.die("Unused release staging."),
    status: () => Effect.die("Unused target status."),
    verify: () => Effect.die("Unused target verification."),
  });
}

/** Provides the real rollback target and artifact trust services. */
function prepare(
  target: typeof PublicationTarget.Service,
  manifest: unknown = rendererManifest,
  requestedReleaseId = releaseId
) {
  return prepareRollback({
    releaseId: requestedReleaseId,
    rendererManifest: manifest,
    rollbackOf,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provideService(PublicationTarget, target)
  );
}

describe("prepareRollback", () => {
  it("prepares a signed-envelope replay as a new forward release", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const prepared = await Effect.runPromise(prepare(targetWith(loadPage)));
    const [artifacts, items, projections] = await Effect.runPromise(
      Effect.all([
        prepared.artifacts().pipe(Stream.runCollect),
        prepared.items().pipe(Stream.runCollect),
        prepared.projections().pipe(Stream.runCollect),
      ]).pipe(
        Effect.provideService(ContentVerificationKeyResolver, resolver),
        Effect.provideService(PublicationTarget, targetWith(loadPage))
      )
    );

    expect(prepared.kind).toBe("rollback");
    expect(prepared.manifest).toMatchObject({
      baseReleaseId: rollbackOf,
      itemCount: 2,
      origin: { kind: "rollback", releaseId: rollbackOf },
      projectionCount: 1,
      releaseId,
    });
    expect([...artifacts]).toEqual([artifact]);
    expect([...items].map(({ change }) => change.operation)).toEqual([
      "upsert",
      "delete",
    ]);
    expect([...projections]).toEqual([projection]);
    expect(loadPage).toHaveBeenCalled();
  });

  it("rejects an unauthenticated renderer before reading rollback state", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const error = await Effect.runPromise(
      prepare(targetWith(loadPage), {
        ...rendererManifest,
        hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("RendererManifestHashMismatchError");
    expect(loadPage).not.toHaveBeenCalled();
  });

  it("rejects reuse of the active release identity before reading state", async () => {
    const loadPage = vi.fn(() => Effect.succeed(rollbackPage));
    const error = await Effect.runPromise(
      prepare(targetWith(loadPage), rendererManifest, rollbackOf).pipe(
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "RollbackIdentityError",
      releaseId: rollbackOf,
      rollbackOf,
    });
    expect(loadPage).not.toHaveBeenCalled();
  });
});
