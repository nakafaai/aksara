// @vitest-environment node

import { Buffer } from "node:buffer";
import {
  type BinaryLike,
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import type { RendererComponentRequirement } from "#contracts/renderer/component";
import { createRendererManifest } from "#contracts/renderer/manifest";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { rendererDomains } from "#contracts/test/renderer";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic payload and source hashing failures. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real Hash methods while intercepting failure markers. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              const value = String(data);
              if (value.includes("hash:payload")) {
                throw new TypeError("injected artifact hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const TEST_HEADING = "Protocol Test Heading";
const keyId = SigningKeyIdSchema.make("test-signing-key");
const signingKeys = generateKeyPairSync("ed25519");
const trustedPublicKey = signingKeys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const rendererComponents = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
] as const;

/** Builds one exact base plus real route-domain renderer contract. */
function manifestInput(
  authoringComponents: readonly RendererComponentRequirement[] = rendererComponents,
  supportedComponents: readonly RendererComponentRequirement[] = rendererComponents
) {
  return {
    base: { authoringComponents, supportedComponents },
    domains: rendererDomains({
      chemistry: { name: "AtomShellLab", version: 1 },
      mathematics: { name: "FunctionMachine", version: 1 },
    }),
  };
}
const rendererManifest = await Effect.runPromise(
  createRendererManifest(manifestInput())
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
  rendererDomain: "mathematics",
  requiredComponents: [{ name: "BlockMath", version: 1 }],
  sourceHash: Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(`## ${TEST_HEADING}`).digest("hex")}`
  ),
});
/** Applies valid overrides to the shared compiled payload fixture. */
function makePayload(values: Partial<CompiledContentPayload>) {
  return CompiledContentPayloadSchema.make({ ...basePayload, ...values });
}
/** Produces a valid signed artifact for verification scenarios. */
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
  /** Resolves the trusted test key or fails with the production error shape. */
  resolve: (requestedKeyId) => {
    if (requestedKeyId === keyId) {
      return Effect.succeed(trustedPublicKey);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});
/** Builds one artifact verification request with overridable boundaries. */
function request(
  artifact: unknown = signArtifact(),
  manifest: unknown = rendererManifest,
  rendererContractVersion = "1.0.0"
) {
  return { artifact, rendererContractVersion, rendererManifest: manifest };
}
/** Builds artifact verification with the supplied trust resolver. */
function artifactProgram(input: unknown, resolver = trustedResolver) {
  return verifySignedContentArtifact(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}
/** Runs artifact verification with the trusted test resolver. */
function verify(input: unknown) {
  return Effect.runPromise(artifactProgram(input));
}
/** Runs artifact verification and returns its expected typed failure. */
function reject(input: unknown, resolver = trustedResolver) {
  return Effect.runPromise(artifactProgram(input, resolver).pipe(Effect.flip));
}
/** Changes one signature character without changing its wire shape. */
function tamperSignature(artifact: SignedContentArtifact) {
  const replacement = artifact.signature.startsWith("A") ? "B" : "A";
  return `${replacement}${artifact.signature.slice(1)}`;
}
describe("server-only artifact verification", () => {
  it("authenticates canonical content across a renderer expansion", async () => {
    const artifact = signArtifact();
    const expandedManifest = await Effect.runPromise(
      createRendererManifest(
        manifestInput(
          [
            { name: "BlockMath", version: 1 },
            { name: "InlineMath", version: 2 },
          ],
          [
            { name: "BlockMath", version: 1 },
            { name: "InlineMath", version: 1 },
            { name: "InlineMath", version: 2 },
          ]
        )
      )
    );
    await expect(verify(request(artifact))).resolves.toEqual(artifact);
    await expect(verify(request(artifact, expandedManifest))).resolves.toEqual(
      artifact
    );
  });
  it("rejects tampered payload, source, and artifact hash values", async () => {
    const artifact = signArtifact();
    const errors = await Promise.all([
      reject(
        request({
          ...artifact,
          payload: makePayload({ compiledCode: "return { changed: true };" }),
        })
      ),
      reject(
        request({ ...artifact, artifactHash: `sha256:${"f".repeat(64)}` })
      ),
    ]);
    expect(errors.map((error) => error._tag)).toEqual([
      "ArtifactHashMismatchError",
      "ArtifactHashMismatchError",
    ]);
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
    const missing = makePayload({
      requiredComponents: [{ name: "Mermaid", version: 1 }],
    });
    const unsupported = makePayload({
      requiredComponents: [{ name: "InlineMath", version: 2 }],
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
        request(artifact, rendererManifest, "3.0.0"),
        "RendererContractVersionMismatchError",
      ],
    ] as const;
    const errors = await Promise.all(cases.map(([input]) => reject(input)));
    expect(errors.map((error) => error._tag)).toEqual(
      cases.map(([, expectedTag]) => expectedTag)
    );
  });
  it("rejects requirements from a different route-domain registry", async () => {
    const mathematics = makePayload({
      requiredComponents: [{ name: "FunctionMachine", version: 1 }],
    });
    const chemistry = makePayload({
      rendererDomain: "chemistry",
      requiredComponents: [{ name: "FunctionMachine", version: 1 }],
    });

    await expect(verify(request(signArtifact(mathematics)))).resolves.toEqual(
      signArtifact(mathematics)
    );
    const error = await reject(request(signArtifact(chemistry)));
    expect(error._tag).toBe("ArtifactRendererComponentMissingError");
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
  it("maps payload hashing failures to a typed artifact error", async () => {
    const artifact = signArtifact();
    const payloadError = await reject(
      request({
        ...artifact,
        payload: { ...artifact.payload, contentKey: "hash:payload" },
      })
    );
    expect(payloadError._tag).toBe("ArtifactHashComputationError");
  });
});
