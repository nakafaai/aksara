import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { createRendererManifest } from "#contracts/renderer/manifest";
import {
  ContentRuntimeRequestSchema,
  ContentRuntimeResponseSchema,
  decodeContentRuntimeRequest,
  decodeContentRuntimeResponse,
  MAX_RUNTIME_REQUEST_BYTES,
  MAX_RUNTIME_RESPONSE_BYTES,
  verifyContentRuntimeExchange,
} from "#contracts/runtime/spec";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { rendererDomains } from "#contracts/test/renderer";
import {
  hash,
  projection,
  releaseId,
  rendererManifest,
  artifact as unsignedArtifact,
} from "#contracts/test/request";

const request = {
  delivery: "public",
  locale: "en",
  publicPath: "subjects/test/transport",
};

const keyId = SigningKeyIdSchema.make("test-runtime-key");
const signingKeys = generateKeyPairSync("ed25519");
const publicKeyPem = signingKeys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();

/** Produces one canonical, signed runtime artifact from the protocol fixture. */
function createSignedArtifact() {
  const payload = CompiledContentPayloadSchema.make({
    ...unsignedArtifact.payload,
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

const artifact = createSignedArtifact();
const trustedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the runtime fixture's exact signing key. */
  resolve: (requestedKeyId) =>
    requestedKeyId === keyId
      ? Effect.succeed(publicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});
const incompatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: rendererDomains({}),
  })
);

const found = {
  activeManifestHash: hash,
  activeReleaseId: releaseId,
  artifact,
  delivery: "public",
  kind: "found",
  projection,
  projectionHash: hash,
  rendererContractVersion: "1.0.0",
};

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
function verifyExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input));
}

/** Runs one runtime exchange expected to return a typed verification failure. */
function rejectExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.flip));
}

/** Alters one valid signature while preserving its exact wire shape. */
function tamperSignature(signature: string) {
  const first = signature.startsWith("A") ? "B" : "A";
  return `${first}${signature.slice(1)}`;
}

/** Strictly tests one runtime contract without allowing extra properties. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("content runtime contract", () => {
  it("decodes the exact bounded route request", async () => {
    expect(MAX_RUNTIME_REQUEST_BYTES).toBe(4096);
    expect(MAX_RUNTIME_RESPONSE_BYTES).toBe(1024 * 1024);
    expect(accepts(ContentRuntimeRequestSchema, request)).toBe(true);
    await expect(
      Effect.runPromise(decodeContentRuntimeRequest(request))
    ).resolves.toEqual(request);

    for (const invalid of [
      { ...request, delivery: "private" },
      { ...request, locale: "de" },
      { ...request, publicPath: "/subjects/test/transport" },
      { ...request, extra: true },
    ]) {
      expect(accepts(ContentRuntimeRequestSchema, invalid)).toBe(false);
    }
  });

  it("accepts found, missing, and sanitized failure responses", async () => {
    for (const response of [
      found,
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      { code: "CONTENT_RUNTIME_FORBIDDEN", kind: "failure" },
      { code: "CONTENT_RUNTIME_INVALID", kind: "failure" },
      { code: "CONTENT_RUNTIME_INTERNAL", kind: "failure" },
    ]) {
      expect(accepts(ContentRuntimeResponseSchema, response)).toBe(true);
    }
    await expect(
      Effect.runPromise(decodeContentRuntimeResponse(found))
    ).resolves.toEqual(found);
  });

  it("rejects mismatched identities and uncontracted response fields", () => {
    const mismatch = Schema.decodeUnknownEither(ContentRuntimeResponseSchema)({
      ...found,
      projection: { ...projection, contentKey: "test:other" },
    });
    expect(Either.isLeft(mismatch)).toBe(true);
    if (Either.isLeft(mismatch)) {
      expect(String(mismatch.left)).toContain(
        "Expected the runtime artifact and projection to share one identity."
      );
    }
    expect(
      accepts(ContentRuntimeResponseSchema, {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, locale: "id" },
        },
      })
    ).toBe(false);
    expect(
      accepts(ContentRuntimeResponseSchema, { kind: "missing", reason: "x" })
    ).toBe(false);
  });

  it("binds a found response to its exact request", async () => {
    await expect(verifyExchange({ response: found })).resolves.toEqual(found);
    const responses = [
      { ...found, delivery: "entitled" },
      {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, locale: "id" },
        },
        projection: { ...projection, locale: "id" },
      },
      {
        ...found,
        projection: { ...projection, publicPath: "subjects/test/other" },
      },
    ];
    const outcomes = await Promise.all(
      responses.map((response) =>
        Effect.runPromise(
          verifyContentRuntimeExchange({
            rendererManifest,
            request,
            response,
          }).pipe(
            Effect.either,
            Effect.provideService(
              ContentVerificationKeyResolver,
              trustedResolver
            )
          )
        )
      )
    );
    expect(
      outcomes.map((outcome) =>
        Either.isLeft(outcome) &&
        outcome.left._tag === "ContentRuntimeMismatchError"
          ? outcome.left.reason
          : "none"
      )
    ).toEqual(["delivery", "locale", "publicPath"]);
  });

  it("authenticates artifacts and renderer compatibility before success", async () => {
    const tamperedArtifact = {
      ...artifact,
      signature: tamperSignature(artifact.signature),
    };
    const [signatureError, rendererError] = await Promise.all([
      rejectExchange({
        response: { ...found, artifact: tamperedArtifact },
      }),
      rejectExchange({
        rendererManifest: incompatibleManifest,
        response: found,
      }),
    ]);
    expect(signatureError).toMatchObject({ _tag: "SignatureInvalidError" });
    expect(rendererError).toMatchObject({
      _tag: "ArtifactRendererComponentMissingError",
    });
  });

  it("preserves request-bound missing and failure responses", async () => {
    const responses = [
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_FORBIDDEN", kind: "failure" },
    ];
    await Promise.all(
      responses.map((response) =>
        expect(verifyExchange({ response })).resolves.toEqual(response)
      )
    );
  });
});
