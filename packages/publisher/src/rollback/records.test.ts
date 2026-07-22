import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import { MaterialLessonProjectionSchema } from "@nakafaai/aksara-contracts/projection/material";
import {
  RollbackDeleteSchema,
  type RollbackRecord,
  RollbackUpsertSchema,
} from "@nakafaai/aksara-contracts/release/rollback";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafaai/aksara-contracts/signature/spec";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  deriveRollbackRecords,
  isDerivedRollbackUpsert,
} from "#publisher/rollback/records";

const rawMdx = "## Test protocol";
const compiledCode = "return {};";
const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-rollback-key");
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "TestBase", version: 1 }],
      supportedComponents: [{ name: "TestBase", version: 1 }],
    },
    domains: [
      {
        authoringComponents: [{ name: "TestChemistry", version: 1 }],
        name: "material-chemistry",
        supportedComponents: [{ name: "TestChemistry", version: 1 }],
      },
      {
        authoringComponents: [{ name: "TestMathematics", version: 1 }],
        name: "material-mathematics",
        supportedComponents: [{ name: "TestMathematics", version: 1 }],
      },
    ],
  })
);
const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: Buffer.byteLength(compiledCode, "utf8"),
  compiledCode,
  compilerConfigHash: `sha256:${"a".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:rollback-record",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: "Test protocol",
  rawMdx,
  rendererDomain: "material-mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
});
const artifactHash = hashCompiledContentPayload(payload);
const signature = Ed25519SignatureSchema.make(
  signBytes(
    null,
    Buffer.from(
      canonicalizeContentArtifactSigningInput(artifactHash, payload),
      "utf8"
    ),
    keys.privateKey
  ).toString("base64url")
);
const artifact = SignedContentArtifactSchema.make({
  artifactHash,
  keyId,
  payload,
  signature,
});
const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: payload.contentKey,
  kind: "subject-lesson",
  locale: payload.locale,
  materialKey: "test.rollback",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test/rollback",
  publicPath: "subjects/test/rollback/record",
  sectionKey: "test-record",
  sitemap: true,
});
const upsert = RollbackUpsertSchema.make({
  artifact,
  change: {
    artifactHash,
    contentKey: payload.contentKey,
    delivery: "public",
    locale: payload.locale,
    operation: "upsert",
    publicPath: projection.publicPath,
    rendererDomain: payload.rendererDomain,
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test/rollback/record.mdx"
    ),
  },
  index: 0,
  projection,
});
const deletion = RollbackDeleteSchema.make({
  change: {
    contentKey: ContentKeySchema.make("test:rollback-delete"),
    locale: "en",
    operation: "delete",
  },
  index: 1,
});
const releaseId = ReleaseIdSchema.make("test-rollback-new");
const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});

/** Collects derived records through the real signature trust seam. */
function collect(records: Stream.Stream<RollbackRecord>) {
  return Effect.runPromise(
    deriveRollbackRecords({ records, releaseId, rendererManifest }).pipe(
      Stream.runCollect,
      Effect.provideService(ContentVerificationKeyResolver, resolver)
    )
  );
}

/** Returns one expected typed failure from record authentication. */
function reject(records: Stream.Stream<RollbackRecord>) {
  return Effect.runPromise(
    deriveRollbackRecords({ records, releaseId, rendererManifest }).pipe(
      Stream.runCollect,
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}

/** Changes one signature character while preserving its wire shape. */
function tamperSignature(value: typeof signature) {
  const replacement = value.startsWith("A") ? "B" : "A";
  return Ed25519SignatureSchema.make(`${replacement}${value.slice(1)}`);
}

describe("deriveRollbackRecords", () => {
  it("authenticates upserts and preserves body-free deletes", async () => {
    const records = await collect(Stream.make(upsert, deletion));
    const [derivedUpsert, derivedDelete] = records;

    expect(derivedUpsert).toMatchObject({
      artifact,
      item: { change: upsert.change, index: 0, releaseId },
      kind: "upsert",
      projection,
    });
    expect(derivedDelete).toEqual({
      item: { change: deletion.change, index: 1, releaseId },
      kind: "delete",
    });
    expect(derivedUpsert && isDerivedRollbackUpsert(derivedUpsert)).toBe(true);
    expect(derivedDelete && isDerivedRollbackUpsert(derivedDelete)).toBe(false);
  });

  it("rejects a signature that no longer authenticates the old envelope", async () => {
    const tampered = RollbackUpsertSchema.make({
      ...upsert,
      artifact: {
        ...artifact,
        signature: tamperSignature(artifact.signature),
      },
    });
    const error = await reject(Stream.make(tampered));
    expect(error._tag).toBe("SignatureInvalidError");
  });

  it("rejects an authenticated artifact paired with another item hash", async () => {
    const mismatched = {
      ...upsert,
      change: {
        ...upsert.change,
        artifactHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      },
    };
    const error = await reject(Stream.make(mismatched));
    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });
});
