// @vitest-environment node

import { createHash, generateKeyPairSync } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
} from "@nakafa/aksara-contracts/release";
import {
  inheritContentSnapshots,
  invertContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Stream } from "effect";
import { makeRollbackArtifacts } from "#publisher/publication/artifacts";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { testRendererDomains } from "#test/renderer";

const rawMdx = "Protocol body";
const sourceHash = Sha256HashSchema.make(
  `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
);
const payload = CompiledContentPayloadSchema.make({
  artifactLocale: ArtifactLocaleSchema.make("en"),
  byteLength: 1,
  compiledCode: "x",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: ContentKeySchema.make("test:rollback-artifact"),
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: rawMdx,
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash,
});
const rollbackOf = ReleaseIdSchema.make("test-active-release");
const releaseId = ReleaseIdSchema.make("test-rollback-release");

/** Builds one signed rollback artifact fixture and trusted key resolver. */
const makeFixture = Effect.fn("RollbackArtifactTest.makeFixture")(function* () {
  const rendererManifest = yield* createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
  });
  const { privateKey, publicKey } = yield* Effect.sync(() =>
    generateKeyPairSync("ed25519")
  );
  const signer = yield* makeEd25519PublicationSigner({
    keyId: "test-rollback-key",
    privateKeyPem: privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  });
  const artifact = yield* signer.signArtifact(payload);
  const item = ContentReleaseItemSchema.make({
    change: {
      artifactHash: artifact.artifactHash,
      artifactLocale: payload.artifactLocale,
      contentKey: payload.contentKey,
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: payload.rendererDomain,
      sourcePath: CorpusSourcePathSchema.make(
        "packages/corpus/test/rollback/en.mdx"
      ),
    },
    index: 0,
    releaseId,
  });
  const manifest = ContentReleaseManifestSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    baseActiveAppLocales: ACTIVE_APP_LOCALES,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"d".repeat(64)}`),
    baseReleaseId: rollbackOf,
    baseResultCount: 1,
    baseResultDigest: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
    deleteCount: 0,
    format: "localized-content-release",
    itemCount: 1,
    itemsDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    origin: { kind: "rollback", releaseId: rollbackOf },
    projectionCount: 1,
    projectionDigest: Sha256HashSchema.make(`sha256:${"c".repeat(64)}`),
    releaseId,
    rendererContractVersion: rendererManifest.rendererContractVersion,
    rendererManifestHash: rendererManifest.hash,
    resultCount: 1,
    resultDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    rollbackCount: 1,
    rollbackDigest: Sha256HashSchema.make(`sha256:${"0".repeat(64)}`),
    routeCount: 0,
    routeDigest: Sha256HashSchema.make(`sha256:${"1".repeat(64)}`),
    scope: {
      content: [
        {
          artifactLocale: item.change.artifactLocale,
          contentKey: item.change.contentKey,
          family: item.change.family,
        },
      ],
      families: [],
      snapshots: [],
    },
    snapshots: invertContentSnapshots(inheritContentSnapshots(null)),
    upsertCount: 1,
  });
  const resolver = ContentVerificationKeyResolver.of({
    resolve: () =>
      Effect.succeed(
        publicKey.export({ format: "pem", type: "spki" }).toString()
      ),
  });
  return { artifact, item, manifest, rendererManifest, resolver };
});

type Fixture = Effect.Success<ReturnType<typeof makeFixture>>;

/** Runs one rollback artifact stream with the trusted test public key. */
const collect = Effect.fn("RollbackArtifactTest.collect")(
  (
    fixture: Fixture,
    input: {
      readonly artifacts: Stream.Stream<Fixture["artifact"]>;
      readonly items: Stream.Stream<Fixture["item"]>;
    }
  ) =>
    makeRollbackArtifacts({
      ...input,
      manifest: fixture.manifest,
      rendererManifest: fixture.rendererManifest,
    }).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk]),
      Effect.provideService(ContentVerificationKeyResolver, fixture.resolver)
    )
);

/** Returns the typed failure from one invalid rollback artifact stream. */
const collectFailure = Effect.fn("RollbackArtifactTest.collectFailure")(
  (
    fixture: Fixture,
    input: {
      readonly artifacts: Stream.Stream<Fixture["artifact"]>;
      readonly items: Stream.Stream<Fixture["item"]>;
    }
  ) =>
    makeRollbackArtifacts({
      ...input,
      manifest: fixture.manifest,
      rendererManifest: fixture.rendererManifest,
    }).pipe(
      Stream.runDrain,
      Effect.flip,
      Effect.provideService(ContentVerificationKeyResolver, fixture.resolver)
    )
);

describe("rollback artifact pairing", () => {
  it.effect("returns an unchanged valid signed artifact", () =>
    Effect.gen(function* () {
      const fixture = yield* makeFixture();
      const result = yield* collect(fixture, {
        artifacts: Stream.make(fixture.artifact),
        items: Stream.make(fixture.item),
      });
      expect(result).toEqual([fixture.artifact]);
    })
  );

  it.effect("rejects an upsert without its prior signed artifact", () =>
    Effect.gen(function* () {
      const fixture = yield* makeFixture();
      const error = yield* collectFailure(fixture, {
        artifacts: Stream.empty,
        items: Stream.make(fixture.item),
      });
      expect(error).toMatchObject({
        _tag: "ReleaseArtifactMismatchError",
        message: "Rollback item 0 has no signed artifact.",
      });
    })
  );

  it.effect("rejects an artifact without its authenticated upsert", () =>
    Effect.gen(function* () {
      const fixture = yield* makeFixture();
      const error = yield* collectFailure(fixture, {
        artifacts: Stream.make(fixture.artifact),
        items: Stream.empty,
      });
      expect(error).toMatchObject({
        _tag: "ReleaseArtifactMismatchError",
        message: "A rollback artifact has no authenticated upsert item.",
      });
    })
  );
});
