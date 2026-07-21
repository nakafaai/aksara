// @vitest-environment node

import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { verifySignedContentArtifact } from "#contracts/artifact/verify.js";
import {
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content.js";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids.js";
import {
  MAX_COMPILED_CODE_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits.js";
import { createRendererManifest } from "#contracts/renderer/manifest.js";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec.js";

const TEST_HEADING = "Protocol Test Heading";

const keyId = SigningKeyIdSchema.make("test-signing-key");
const signingKeys = generateKeyPairSync("ed25519");
const trustedPublicKey = signingKeys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    authoringComponents: [
      { name: "BlockMath", version: 1 },
      { name: "TestWidget", version: 1 },
    ],
    supportedComponents: [
      { name: "BlockMath", version: 1 },
      { name: "TestWidget", version: 1 },
    ],
  })
);

const basePayload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: "test:content",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: TEST_HEADING,
  rawMdx: `## ${TEST_HEADING}`,
  requiredComponents: [{ name: "BlockMath", version: 1 }],
  sourceHash: Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(`## ${TEST_HEADING}`).digest("hex")}`
  ),
});

function signArtifact(payload = basePayload, artifactKeyId = keyId) {
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
    keyId: artifactKeyId,
    payload,
    signature,
  });
}

const trustedResolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) => {
    if (requestedKeyId === keyId) {
      return Effect.succeed(trustedPublicKey);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});

function request(
  artifact: unknown = signArtifact(),
  manifest: unknown = rendererManifest,
  rendererContractVersion = "1.0.0"
) {
  return { artifact, rendererContractVersion, rendererManifest: manifest };
}

function verify(input: unknown, resolver = trustedResolver) {
  return Effect.runPromise(
    verifySignedContentArtifact(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver)
    )
  );
}

function reject(input: unknown, resolver = trustedResolver) {
  return Effect.runPromise(
    verifySignedContentArtifact(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}

function tamperSignature(artifact: SignedContentArtifact) {
  const replacement = artifact.signature.startsWith("A") ? "B" : "A";
  return `${replacement}${artifact.signature.slice(1)}`;
}

describe("server-only artifact verification", () => {
  it("authenticates canonical content across a renderer expansion", async () => {
    const artifact = signArtifact();
    const expandedManifest = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [
          { name: "BlockMath", version: 1 },
          { name: "TestWidget", version: 2 },
        ],
        supportedComponents: [
          { name: "BlockMath", version: 1 },
          { name: "TestWidget", version: 1 },
          { name: "TestWidget", version: 2 },
        ],
      })
    );

    await expect(verify(request(artifact))).resolves.toEqual(artifact);
    await expect(verify(request(artifact, expandedManifest))).resolves.toEqual(
      artifact
    );
  });

  it("rejects tampered payload, source, and artifact hash values", async () => {
    const artifact = signArtifact();
    const tamperedCode = CompiledContentPayloadSchema.make({
      ...artifact.payload,
      compiledCode: "return { changed: true };",
    });
    const tamperedPayload = CompiledContentPayloadSchema.make({
      ...artifact.payload,
      plainText: "tampered",
    });
    const invalidSource = CompiledContentPayloadSchema.make({
      ...basePayload,
      sourceHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    });
    const codeError = await reject(
      request({ ...artifact, payload: tamperedCode })
    );
    const payloadError = await reject(
      request({ ...artifact, payload: tamperedPayload })
    );
    const hashError = await reject(
      request({ ...artifact, artifactHash: `sha256:${"f".repeat(64)}` })
    );
    const rehashed = signArtifact(tamperedPayload);
    const signatureError = await reject(
      request({ ...rehashed, signature: artifact.signature })
    );
    const sourceError = await reject(request(signArtifact(invalidSource)));

    expect(codeError._tag).toBe("ArtifactHashMismatchError");
    expect(payloadError._tag).toBe("ArtifactHashMismatchError");
    expect(hashError._tag).toBe("ArtifactHashMismatchError");
    expect(signatureError._tag).toBe("SignatureInvalidError");
    expect(sourceError._tag).toBe("ArtifactSourceHashMismatchError");
  });

  it("rejects signatures before exposing renderer semantics", async () => {
    const artifact = signArtifact();
    const tampered = { ...artifact, signature: tamperSignature(artifact) };
    const [validRendererError, invalidRendererError] = await Promise.all([
      reject(request(tampered)),
      reject(
        request(tampered, {
          ...rendererManifest,
          hash: `sha256:${"f".repeat(64)}`,
        })
      ),
    ]);

    expect(validRendererError._tag).toBe("SignatureInvalidError");
    expect(invalidRendererError._tag).toBe("SignatureInvalidError");
  });

  it("fails closed across renderer and component incompatibilities", async () => {
    const artifact = signArtifact();
    const missing = CompiledContentPayloadSchema.make({
      ...basePayload,
      requiredComponents: [{ name: "Mermaid", version: 1 }],
    });
    const unsupported = CompiledContentPayloadSchema.make({
      ...basePayload,
      requiredComponents: [{ name: "TestWidget", version: 2 }],
    });
    const cases = [
      [
        request(artifact, {
          ...rendererManifest,
          hash: `sha256:${"f".repeat(64)}`,
        }),
        "RendererManifestHashMismatchError",
      ],
      [request(signArtifact(missing)), "ArtifactRendererComponentMissingError"],
      [
        request(signArtifact(unsupported)),
        "ArtifactRendererVersionUnsupportedError",
      ],
      [
        request({
          ...artifact,
          payload: {
            ...artifact.payload,
            requiredComponents: [{ name: "BlockMath" }],
          },
        }),
        "ArtifactVerificationDecodeError",
      ],
      [
        request(artifact, rendererManifest, "2.0.0"),
        "RendererContractVersionMismatchError",
      ],
    ] as const;

    const errors = await Promise.all(cases.map(([input]) => reject(input)));
    expect(errors.map((error) => error._tag)).toEqual(
      cases.map(([, expectedTag]) => expectedTag)
    );
  });

  it("enforces signed-wire and authenticated payload byte integrity", async () => {
    const oversizedWirePayload = CompiledContentPayloadSchema.make({
      ...basePayload,
      byteLength: MAX_SIGNED_ARTIFACT_BYTES,
      compiledCode: "x".repeat(MAX_SIGNED_ARTIFACT_BYTES),
    });
    const fieldLimitPayload = CompiledContentPayloadSchema.make({
      ...basePayload,
      byteLength: MAX_COMPILED_CODE_BYTES + 1,
      compiledCode: "x".repeat(MAX_COMPILED_CODE_BYTES + 1),
    });
    const byteLengthPayload = CompiledContentPayloadSchema.make({
      ...basePayload,
      byteLength: 9,
    });
    const wireError = await reject(request(signArtifact(oversizedWirePayload)));
    const fieldError = await reject(request(signArtifact(fieldLimitPayload)));
    const mismatchError = await reject(
      request(signArtifact(byteLengthPayload))
    );

    expect(wireError._tag).toBe("ArtifactVerificationByteLimitError");
    expect(fieldError._tag).toBe("ArtifactPayloadFieldByteLimitError");
    expect(mismatchError._tag).toBe("ArtifactCompiledByteLengthMismatchError");
  });

  it("rejects excess top-level and nested wire properties", async () => {
    const privateSourceMarker = "must-not-appear-in-decode-errors";
    const topLevel = await reject({ ...request(), unexpected: true });
    const nested = await reject(
      request({
        ...signArtifact(),
        payload: { ...basePayload, rawMdx: privateSourceMarker },
        unexpected: true,
      })
    );

    expect(topLevel._tag).toBe("ArtifactVerificationDecodeError");
    expect(nested._tag).toBe("ArtifactVerificationDecodeError");
    expect(JSON.stringify(nested)).not.toContain(privateSourceMarker);
  });
});
