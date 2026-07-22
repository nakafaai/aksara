// @vitest-environment node

import { createHash, generateKeyPairSync } from "node:crypto";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
} from "@nakafa/aksara-contracts/release";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { makeRollbackArtifacts } from "#publisher/publication/artifacts";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import { rendererDomains } from "#test/renderer";

const rawMdx = "Protocol body";
const sourceHash = Sha256HashSchema.make(
  `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
);
const payload = CompiledContentPayloadSchema.make({
  byteLength: 1,
  compiledCode: "x",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: ContentKeySchema.make("test:rollback-artifact"),
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: rawMdx,
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash,
});
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: { name: "AtomShellLab", version: 1 },
      mathematics: { name: "FunctionMachine", version: 1 },
    }),
  })
);
const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const signer = await Effect.runPromise(
  makeEd25519PublicationSigner({
    keyId: "test-rollback-key",
    privateKeyPem: privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  })
);
const artifact = await Effect.runPromise(signer.signArtifact(payload));
const rollbackOf = ReleaseIdSchema.make("test-active-release");
const releaseId = ReleaseIdSchema.make("test-rollback-release");
const item = ContentReleaseItemSchema.make({
  change: {
    artifactHash: artifact.artifactHash,
    contentKey: payload.contentKey,
    delivery: "public",
    locale: payload.locale,
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
  baseManifestHash: Sha256HashSchema.make(`sha256:${"d".repeat(64)}`),
  baseReleaseId: rollbackOf,
  baseResultCount: 1,
  baseResultDigest: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
  deleteCount: 0,
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
  upsertCount: 1,
});
const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});

/** Runs one rollback artifact stream with the trusted test public key. */
function collect(input: {
  readonly artifacts: Stream.Stream<typeof artifact>;
  readonly items: Stream.Stream<typeof item>;
}) {
  return makeRollbackArtifacts({ ...input, manifest, rendererManifest }).pipe(
    Stream.runCollect,
    Effect.map((chunk) => [...chunk]),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.runPromise
  );
}

/** Returns the typed failure from one invalid rollback artifact stream. */
function collectFailure(input: {
  readonly artifacts: Stream.Stream<typeof artifact>;
  readonly items: Stream.Stream<typeof item>;
}) {
  return makeRollbackArtifacts({ ...input, manifest, rendererManifest }).pipe(
    Stream.runDrain,
    Effect.flip,
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.runPromise
  );
}

describe("rollback artifact pairing", () => {
  it("returns an unchanged valid signed artifact", async () => {
    await expect(
      collect({ artifacts: Stream.make(artifact), items: Stream.make(item) })
    ).resolves.toEqual([artifact]);
  });

  it("rejects an upsert without its prior signed artifact", async () => {
    const error = await collectFailure({
      artifacts: Stream.empty,
      items: Stream.make(item),
    });
    expect(error).toMatchObject({
      _tag: "ReleaseArtifactMismatchError",
      message: "Rollback item 0 has no signed artifact.",
    });
  });

  it("rejects an artifact without its authenticated upsert", async () => {
    const error = await collectFailure({
      artifacts: Stream.make(artifact),
      items: Stream.empty,
    });
    expect(error).toMatchObject({
      _tag: "ReleaseArtifactMismatchError",
      message: "A rollback artifact has no authenticated upsert item.",
    });
  });
});
