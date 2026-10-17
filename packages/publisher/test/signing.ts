import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
  CompileDocumentSourceSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import {
  type ContentChange,
  ContentChangeSchema,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
} from "@nakafa/aksara-contracts/release";
import { digestItems } from "@nakafa/aksara-contracts/release/digest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
  type TryoutRuntimeBundlePayload,
} from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Array as Arr, Effect, Order, Schema, Stream } from "effect";
import { Base64, Base64Url } from "effect/encoding";

import { testRendererDomains } from "#test/renderer";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: ["BlockMath"],
    domains: testRendererDomains({
      chemistry: ["AtomShellLab"],
      mathematics: ["FunctionMachine"],
    }),
    publishedDomains: ["mathematics"],
  })
);

const source = Schema.decodeSync(CompileDocumentSourceSchema)({
  artifactLocale: "en",
  contentKey: "test:signing",
  rawMdx:
    'export const metadata = {}\n\nPelajaran é ✓ 数学\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: "packages/corpus/test/signing/en.mdx",
});

/** Compiled payload used by publication signer tests. */
export const signingPayload = (
  await Effect.runPromise(compileContent({ ...source, rendererManifest }))
).payload;

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release");

/** Builds canonically ordered release items for signing fixtures. */
function makeItems(release: ReleaseId, changes: readonly ContentChange[]) {
  return Arr.map(
    Arr.sort(changes, Order.make(compareContentHeads)),
    (change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId: release })
  );
}

const signingArtifactHash = await Effect.runPromise(
  hashCompiledContentPayload(signingPayload)
);
const items = makeItems(
  releaseId,
  Schema.decodeSync(Schema.Array(ContentChangeSchema))([
    {
      artifactHash: signingArtifactHash,
      artifactLocale: signingPayload.artifactLocale,
      contentKey: signingPayload.contentKey,
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  ])
);

const itemSummary = await Effect.runPromise(
  digestItems(releaseId, Stream.fromIterable(items))
);

/** Current release manifest used by publication signer tests. */
export const signingManifest = Schema.decodeSync(ContentReleaseManifestSchema)({
  activeAppLocales: ["en", "id"],
  baseActiveAppLocales: null,
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: 0,
  format: "localized-content-release",
  itemCount: items.length,
  itemsDigest: itemSummary.digest,
  origin: { kind: "git", sha: "d".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId,
  rendererManifestHash: rendererManifest.hash,
  resultCount: 1,
  resultDigest: `sha256:${"e".repeat(64)}`,
  rollbackCount: items.length,
  rollbackDigest: `sha256:${"f".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"0".repeat(64)}`,
  scope: { families: ["material"], snapshots: [] },
  snapshots: inheritContentSnapshots(null),
  upsertCount: items.length,
});

/** Builds the try-out runtime bundle payload that signing tests pin. */
export const signingRuntimeBundle = Effect.fn(
  "PublisherTest.signingRuntimeBundle"
)(function* (release: SignedContentRelease, sourceGitSha: GitCommitSha) {
  return {
    format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
    rendererManifestHash: signingManifest.rendererManifestHash,
    snapshot: yield* makeTryoutSnapshot({
      activeAppLocales: signingManifest.activeAppLocales,
      catalogDigest: signingManifest.itemsDigest,
      counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
      placementCount: 1,
      placementDigest: signingManifest.resultDigest,
      routeCount: 1,
    }),
    sourceGitSha,
    sourceManifestHash: release.manifestHash,
    sourceReleaseId: signingManifest.releaseId,
  } satisfies TryoutRuntimeBundlePayload;
});

/** Test-only Ed25519 public key that verifies every recorded publication signature below. */
export const TEST_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAXtJyj4s/gMRtHHkNahJdbPSs7MoLMSFkstouKPMeLKw=
-----END PUBLIC KEY-----
`;
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
export const TEST_ARTIFACT_SIGNATURE =
  "BMT-wVEC3LO2o3K9R8xGdnCmfKb_PRwGc1QFa8CWVOFvEZwlzSGkku8-58nGutHQYxMHvAL7Hpc29G-gkTVoDA";
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
export const TEST_RELEASE_SIGNATURE =
  "ahRX-gZia7IMZiSQmxZTN5BbnpYfbCMSJziXjeA3sy6PFSAFp0RHAdffne7bXkvyFG8uEKmUQa3u-a-pyZNLAQ";
// Record again: create a key, sign the same input, and replace the public key and signature literals below.
export const TEST_RUNTIME_BUNDLE_SIGNATURE =
  "-Rb6vFnC-1vsq5t5AxnYn7txzUVjsA6wbWX14X7p_Sk4Jc5PCWnv0IX1dgZ9TwCLzOgagmaKLDwJz9mVeBYyBg";

/** Imports one Ed25519 SPKI public key from its PEM text for Web Crypto verification. */
export const importEd25519PublicKeyPem = Effect.fn(
  "PublisherTest.importEd25519PublicKeyPem"
)(function* (publicKeyPem: string) {
  const der = yield* Effect.fromResult(
    Base64.decode(publicKeyPem.replace(/-----[^-]+-----|\s/gu, ""))
  );
  return yield* Effect.promise(() =>
    globalThis.crypto.subtle.importKey(
      "spki",
      der,
      { name: "Ed25519" },
      false,
      ["verify"]
    )
  );
});

/** Verifies one unpadded base64url Ed25519 signature over the UTF-8 bytes of one exact input. */
export const verifyWithPublicKeyPem = Effect.fn(
  "PublisherTest.verifyWithPublicKeyPem"
)(function* (publicKeyPem: string, input: string, signature: string) {
  const publicKey = yield* importEd25519PublicKeyPem(publicKeyPem);
  const signatureBytes = yield* Effect.fromResult(Base64Url.decode(signature));
  return yield* Effect.promise(() =>
    globalThis.crypto.subtle.verify(
      "Ed25519",
      publicKey,
      signatureBytes,
      new TextEncoder().encode(input)
    )
  );
});

/** Verifies one recorded signature over exact canonical bytes with the recorded public key. */
export const verifyRecorded = Effect.fn("PublisherTest.verifyRecorded")(
  function* (input: string, signature: string) {
    return yield* verifyWithPublicKeyPem(TEST_PUBLIC_KEY_PEM, input, signature);
  }
);

/** Generates one RSA private key as PKCS#8 PEM, a key kind that the Ed25519 signer must refuse. */
export const generateRsaPrivateKeyPem = Effect.fn(
  "PublisherTest.generateRsaPrivateKeyPem"
)(function* () {
  const pair = yield* Effect.promise(() =>
    globalThis.crypto.subtle.generateKey(
      {
        hash: "SHA-256",
        modulusLength: 2048,
        name: "RSASSA-PKCS1-v1_5",
        publicExponent: Uint8Array.of(1, 0, 1),
      },
      true,
      ["sign", "verify"]
    )
  );
  const der = yield* Effect.promise(() =>
    globalThis.crypto.subtle.exportKey("pkcs8", pair.privateKey)
  );
  return `-----BEGIN PRIVATE KEY-----\n${Base64.encode(new Uint8Array(der))}\n-----END PRIVATE KEY-----\n`;
});

/** Changes one ASCII byte in the domain prefix of a canonical signing input. */
export function changeOneByte(input: string) {
  return input.replace("aksara", "aksarb");
}
