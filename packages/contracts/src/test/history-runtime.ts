// @vitest-environment node
import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";

import { Effect, Schema } from "effect";

import {
  canonicalizeHistoricalContentPayload,
  historicalArtifactSigningInput,
} from "#contracts/history/artifact";
import {
  type HistoricalCompiledContentPayload,
  HistoricalCompiledContentPayloadSchema,
  HistoricalSignedContentArtifactSchema,
} from "#contracts/history/artifact-spec";
import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import {
  StoredProtectedRuntimeFoundSchema,
  StoredProtectedRuntimeItemSchema,
  StoredProtectedRuntimeRequestSchema,
  StoredProtectedRuntimeSelectorSchema,
} from "#contracts/history/protected";
import {
  HistoricalContentReleaseManifestSchema,
  HistoricalSignedContentReleaseSchema,
} from "#contracts/history/release";
import {
  canonicalizeHistoricalContentReleaseManifest,
  historicalReleaseSigningInput,
} from "#contracts/history/release-bytes";
import { verifyStoredProtectedContentRuntimeExchange } from "#contracts/history/runtime";
import type { RendererComponentRequirement } from "#contracts/renderer/component";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { retainedRelease } from "#contracts/test/history";
import { testRendererDomains } from "#contracts/test/renderer";

const keys = generateKeyPairSync("ed25519");
const publicKey = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();

/** Hashes test-only canonical bytes through an independent implementation. */
function hash(value: string) {
  return HistoricalSha256HashSchema.make(
    `sha256:${createHash("sha256").update(value).digest("hex")}`
  );
}

/** Signs test-only canonical bytes through an independent implementation. */
function sign(value: string) {
  return signBytes(null, Buffer.from(value, "utf8"), keys.privateKey).toString(
    "base64url"
  );
}

/** Creates one complete renderer for retained runtime verification tests. */
export function createHistoricalRenderer(input?: {
  readonly components?: readonly RendererComponentRequirement[];
  readonly publishedDomain?: "mathematics" | "snbt-general";
}) {
  const components = input?.components ?? [{ name: "BlockMath", version: 1 }];
  return Effect.runPromise(
    createRendererManifest({
      base: {
        authoringComponents: components,
        supportedComponents: components,
      },
      domains: testRendererDomains({}),
      publishedDomains: [input?.publishedDomain ?? "snbt-general"],
    })
  );
}

export const historicalRenderer = await createHistoricalRenderer();
export const historicalUnpublishedRenderer = await createHistoricalRenderer({
  publishedDomain: "mathematics",
});
export const historicalMissingRenderer = await createHistoricalRenderer({
  components: [{ name: "InlineMath", version: 1 }],
});
export const historicalUnsupportedRenderer = await createHistoricalRenderer({
  components: [{ name: "BlockMath", version: 2 }],
});

const questionRoot =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const defaultRawMdx = "# Retained question";
const defaultCompiledCode = "return { default: () => null };";

/** Creates and signs one exact old artifact with optional test-only changes. */
export function createHistoricalArtifact(
  overrides: Partial<HistoricalCompiledContentPayload> = {}
) {
  const rawMdx = overrides.rawMdx ?? defaultRawMdx;
  const compiledCode = overrides.compiledCode ?? defaultCompiledCode;
  const payload = Schema.decodeUnknownSync(
    HistoricalCompiledContentPayloadSchema
  )({
    byteLength:
      overrides.byteLength ?? new TextEncoder().encode(compiledCode).byteLength,
    compiledCode,
    compilerConfigHash: `sha256:${"1".repeat(64)}`,
    compilerVersion: "0.1.0",
    contentKey: `${questionRoot}/question`,
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "Retained question",
    rawMdx,
    rendererDomain: "snbt-general",
    requiredComponents: [{ name: "BlockMath", version: 1 }],
    sourceHash: overrides.sourceHash ?? hash(rawMdx),
    ...overrides,
  });
  const artifactHash = hash(canonicalizeHistoricalContentPayload(payload));
  return Schema.decodeUnknownSync(HistoricalSignedContentArtifactSchema)({
    artifactHash,
    keyId: "retained-runtime-key",
    payload,
    signature: sign(historicalArtifactSigningInput(artifactHash, payload)),
  });
}

export const historicalArtifact = createHistoricalArtifact();
export const historicalSnapshotId = HistoricalSha256HashSchema.make(
  `sha256:${"6".repeat(64)}`
);
const manifest = Schema.decodeUnknownSync(
  HistoricalContentReleaseManifestSchema
)({
  ...retainedRelease.manifest,
  releaseId: "retained-runtime-release",
  rendererManifestHash: historicalRenderer.hash,
  snapshots: {
    ...retainedRelease.manifest.snapshots,
    tryout: {
      ...retainedRelease.manifest.snapshots.tryout,
      resultSnapshotId: historicalSnapshotId,
    },
  },
});
const manifestHash = hash(
  canonicalizeHistoricalContentReleaseManifest(manifest)
);
export const historicalRelease = Schema.decodeUnknownSync(
  HistoricalSignedContentReleaseSchema
)({
  keyId: "retained-runtime-key",
  manifest,
  manifestHash,
  signature: sign(historicalReleaseSigningInput(manifestHash, manifest)),
});

export const historicalSelector = Schema.decodeUnknownSync(
  StoredProtectedRuntimeSelectorSchema
)({
  artifactHash: historicalArtifact.artifactHash,
  artifactLocale: historicalArtifact.payload.locale,
  contentKey: historicalArtifact.payload.contentKey,
  delivery: "authenticated",
});

export const historicalItem = Schema.decodeUnknownSync(
  StoredProtectedRuntimeItemSchema
)({
  artifact: historicalArtifact,
  delivery: "authenticated",
  sourcePath: `packages/corpus/${questionRoot}/question.en.mdx`,
});

export const historicalRequest = Schema.decodeUnknownSync(
  StoredProtectedRuntimeRequestSchema
)({
  appLocale: "en",
  attemptId: "retained-attempt",
  selectors: [historicalSelector],
  snapshotId: historicalSnapshotId,
  snapshotReleaseId: historicalRelease.manifest.releaseId,
});

export const historicalFound = Schema.decodeUnknownSync(
  StoredProtectedRuntimeFoundSchema
)({
  appLocale: historicalRequest.appLocale,
  attemptId: historicalRequest.attemptId,
  items: [historicalItem],
  kind: "found",
  release: historicalRelease,
  rendererManifest: historicalRenderer,
  snapshotId: historicalSnapshotId,
  snapshotManifestHash: historicalRelease.manifestHash,
  snapshotReleaseId: historicalRelease.manifest.releaseId,
});

export const historicalResolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed(publicKey),
});

/** Builds one test-only retained exchange with its exact trusted key. */
export function verifyHistoricalExchange(input?: {
  readonly rendererManifest?: unknown;
  readonly request?: unknown;
  readonly response?: unknown;
}) {
  return verifyStoredProtectedContentRuntimeExchange({
    rendererManifest: input?.rendererManifest ?? historicalRenderer,
    request: input?.request ?? historicalRequest,
    response: input?.response ?? historicalFound,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, historicalResolver)
  );
}
