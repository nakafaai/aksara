import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Either, Schema } from "effect";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  PublicPathSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  ArticleCategorySchema,
  ArticleProjectionSchema,
  ArticleSlugSchema,
} from "#contracts/projection/article";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "#contracts/release/signing";
import { replaceContentSnapshot } from "#contracts/release/snapshot/spec";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { verifyContentRuntimeExchange } from "#contracts/runtime/verify";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { articleGraph } from "#contracts/test/graph";
import { testRendererDomains } from "#contracts/test/renderer";
import {
  hash,
  projection,
  rendererManifest,
  artifact as unsignedArtifact,
  release as unsignedRelease,
} from "#contracts/test/request";

export const request = {
  delivery: "public",
  locale: "en",
  publicPath: "subjects/test/transport",
} as const;

const runtimeContentKey = ContentKeySchema.make(
  "material/lesson/test/transport"
);
const runtimeProjection = MaterialLessonProjectionSchema.make({
  ...projection,
  contentKey: runtimeContentKey,
});
const keyId = SigningKeyIdSchema.make("test-runtime-key");
const signingKeys = generateKeyPairSync("ed25519");
const publicKeyPem = signingKeys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();

/** Hashes one canonical runtime fixture value with the production algorithm. */
function hashRuntimeValue(value: string) {
  const digest = createHash("sha256").update(value).digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}

/** Signs one canonical runtime fixture value with the fixture identity. */
function signRuntimeValue(value: string) {
  const payload = Buffer.from(value, "utf8");
  const signature = signBytes(null, payload, signingKeys.privateKey);
  return Ed25519SignatureSchema.make(signature.toString("base64url"));
}

/** Produces one canonical, signed runtime artifact for one exact content key. */
function createSignedArtifact(
  contentKey: typeof runtimeContentKey,
  requiredComponents: CompiledContentPayload["requiredComponents"] = [
    { name: "BlockMath", version: 1 },
  ]
) {
  const payload = CompiledContentPayloadSchema.make({
    ...unsignedArtifact.payload,
    contentKey,
    requiredComponents,
    sourceHash: hashRuntimeValue(unsignedArtifact.payload.rawMdx),
  });
  const artifactHash = hashRuntimeValue(
    canonicalizeCompiledContentPayload(payload)
  );
  const signature = signRuntimeValue(
    canonicalizeContentArtifactSigningInput(artifactHash, payload)
  );
  return SignedContentArtifactSchema.make({
    artifactHash,
    keyId,
    payload,
    signature,
  });
}

export const artifact = createSignedArtifact(runtimeContentKey);
export const protectedSnapshotId = Sha256HashSchema.make(
  `sha256:${"9".repeat(64)}`
);
const runtimeManifest = {
  ...unsignedRelease.manifest,
  scope: {
    ...unsignedRelease.manifest.scope,
    snapshots: ["program", "tryout"],
  },
  snapshots: {
    ...unsignedRelease.manifest.snapshots,
    tryout: replaceContentSnapshot({
      baseSnapshotId: null,
      resultSnapshotId: protectedSnapshotId,
      rowCount: 1,
      rowDigest: hash,
    }),
  },
} as const;
const manifestHash = await Effect.runPromise(
  hashContentReleaseManifest(runtimeManifest)
);
export const release = SignedContentReleaseSchema.make({
  keyId,
  manifest: runtimeManifest,
  manifestHash,
  signature: signRuntimeValue(
    canonicalizeContentReleaseSigningInput(manifestHash, runtimeManifest)
  ),
});

const trustedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the runtime fixture's exact signing key. */
  resolve: (requestedKeyId) =>
    requestedKeyId === keyId
      ? Effect.succeed(publicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

export const incompatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

const compatibleComponents = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
] as const;
export const compatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: compatibleComponents,
      supportedComponents: compatibleComponents,
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

export const found = {
  activeManifestHash: release.manifestHash,
  activeReleaseId: release.manifest.releaseId,
  artifact,
  delivery: "public",
  kind: "found",
  projection: runtimeProjection,
  projectionHash: hashContentProjection(runtimeProjection),
  release,
  rendererManifest,
  sourcePath: CorpusSourcePathSchema.make(
    `packages/corpus/${runtimeContentKey}/en.mdx`
  ),
} as const;

const articleContentKey = ContentKeySchema.make(
  "articles/politics/dynastic-politics-asian-values"
);
const articleProjection = ArticleProjectionSchema.make({
  articleSlug: ArticleSlugSchema.make("dynastic-politics-asian-values"),
  category: ArticleCategorySchema.make("politics"),
  categoryTitle: "Politics",
  contentKey: articleContentKey,
  graph: articleGraph("en", "politics", "dynastic-politics-asian-values"),
  kind: "article",
  locale: "en",
  metadata: {
    authors: [{ name: "Nabil Fatih" }],
    date: "2024-02-14",
    title: "Dynastic Politics and Asian Values",
  },
  official: true,
  parentPath: PublicPathSchema.make("articles/politics"),
  publicPath: PublicPathSchema.make(
    "articles/politics/dynastic-politics-asian-values"
  ),
  references: [],
  sitemap: true,
});
export const articleArtifact = createSignedArtifact(articleContentKey);
export const articleRequest = {
  delivery: "public",
  locale: "en",
  publicPath: articleProjection.publicPath,
} as const;
export const articleFound = {
  ...found,
  artifact: articleArtifact,
  projection: articleProjection,
  projectionHash: hashContentProjection(articleProjection),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx"
  ),
} as const;

const protectedQuestionKey =
  "question-bank/tryout/test/runtime/protected/set-1/question-1";
export const protectedContentKey = ContentKeySchema.make(
  `${protectedQuestionKey}/question`
);
export const protectedArtifact = createSignedArtifact(protectedContentKey);
export const protectedExpandedArtifact = createSignedArtifact(
  protectedContentKey,
  [{ name: "InlineMath", version: 1 }]
);
export const protectedRequest = {
  artifactHash: protectedArtifact.artifactHash,
  contentKey: protectedContentKey,
  delivery: "authenticated",
  locale: "en",
  snapshotId: protectedSnapshotId,
  snapshotReleaseId: release.manifest.releaseId,
} as const;
export const protectedAnswerRequest = {
  ...protectedRequest,
  contentKey: ContentKeySchema.make(`${protectedQuestionKey}/answer`),
  delivery: "entitled",
} as const;
export const protectedFound = {
  artifact: protectedArtifact,
  delivery: "authenticated",
  kind: "found",
  release,
  rendererManifest,
  snapshotId: protectedSnapshotId,
  snapshotManifestHash: release.manifestHash,
  snapshotReleaseId: release.manifest.releaseId,
  sourcePath: CorpusSourcePathSchema.make(
    `packages/corpus/${protectedQuestionKey}/question.en.mdx`
  ),
} as const;

/** Builds one runtime exchange with the fixture's trusted verification key. */
function exchangeProgram(input: {
  readonly rendererManifest?: unknown;
  readonly request?: unknown;
  readonly response: unknown;
}) {
  return verifyContentRuntimeExchange({
    rendererManifest: input.rendererManifest ?? rendererManifest,
    request: input.request ?? request,
    response: input.response,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}

/** Runs one runtime exchange expected to authenticate successfully. */
export function verifyExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input));
}

/** Runs one runtime exchange while preserving typed success and failure values. */
export function verifyExchangeEither(
  input: Parameters<typeof exchangeProgram>[0]
) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.either));
}

/** Runs one runtime exchange expected to return a typed verification failure. */
export function rejectExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.flip));
}

/** Alters one valid signature while preserving its exact wire shape. */
export function tamperSignature(signature: string) {
  const first = signature.startsWith("A") ? "B" : "A";
  return `${first}${signature.slice(1)}`;
}

/** Strictly tests one runtime contract without allowing extra properties. */
export function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}
