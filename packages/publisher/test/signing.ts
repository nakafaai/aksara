import { Buffer } from "node:buffer";
import { verify } from "node:crypto";
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

const items = makeItems(
  releaseId,
  Schema.decodeSync(Schema.Array(ContentChangeSchema))([
    {
      artifactHash: hashCompiledContentPayload(signingPayload),
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
export function signingRuntimeBundle(
  release: SignedContentRelease,
  sourceGitSha: GitCommitSha
): TryoutRuntimeBundlePayload {
  return {
    format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
    rendererManifestHash: signingManifest.rendererManifestHash,
    snapshot: makeTryoutSnapshot({
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
  };
}

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

/** Verifies one recorded signature over exact canonical bytes with the recorded public key. */
export function verifyRecorded(input: string, signature: string) {
  return verify(
    null,
    Buffer.from(input, "utf8"),
    TEST_PUBLIC_KEY_PEM,
    Buffer.from(signature, "base64url")
  );
}

/** Changes one ASCII byte in the domain prefix of a canonical signing input. */
export function changeOneByte(input: string) {
  return input.replace("aksara", "aksarb");
}
