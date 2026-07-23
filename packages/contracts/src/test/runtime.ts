import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Either, Schema } from "effect";
import {
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { hashMaterialProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import {
  canonicalizeContentReleaseSigningInput,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { rendererDomains } from "#contracts/renderer/contract";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { verifyContentRuntimeExchange } from "#contracts/runtime/verify";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import {
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

/** Produces one canonical, signed runtime artifact from the protocol fixture. */
function createSignedArtifact() {
  const payload = CompiledContentPayloadSchema.make({
    ...unsignedArtifact.payload,
    contentKey: runtimeContentKey,
    requiredComponents: [{ name: "BlockMath", version: 1 }],
    sourceHash: Sha256HashSchema.make(
      `sha256:${createHash("sha256")
        .update(unsignedArtifact.payload.rawMdx)
        .digest("hex")}`
    ),
  });
  const artifactHash = Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeCompiledContentPayload(payload))
      .digest("hex")}`
  );
  const signature = Ed25519SignatureSchema.make(
    signBytes(
      null,
      Buffer.from(
        canonicalizeContentArtifactSigningInput(artifactHash, payload),
        "utf8"
      ),
      signingKeys.privateKey
    ).toString("base64url")
  );
  return SignedContentArtifactSchema.make({
    artifactHash,
    keyId,
    payload,
    signature,
  });
}

export const artifact = createSignedArtifact();
const manifestHash = await Effect.runPromise(
  hashContentReleaseManifest(unsignedRelease.manifest)
);
export const release = SignedContentReleaseSchema.make({
  keyId,
  manifest: unsignedRelease.manifest,
  manifestHash,
  signature: Ed25519SignatureSchema.make(
    signBytes(
      null,
      Buffer.from(
        canonicalizeContentReleaseSigningInput(
          manifestHash,
          unsignedRelease.manifest
        ),
        "utf8"
      ),
      signingKeys.privateKey
    ).toString("base64url")
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
    domains: rendererDomains({}),
  })
);

export const found = {
  activeManifestHash: release.manifestHash,
  activeReleaseId: release.manifest.releaseId,
  artifact,
  delivery: "public",
  kind: "found",
  projection: runtimeProjection,
  projectionHash: hashMaterialProjection(runtimeProjection),
  release,
  rendererManifest,
  sourcePath: CorpusSourcePathSchema.make(
    `packages/corpus/${runtimeContentKey}/en.mdx`
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
