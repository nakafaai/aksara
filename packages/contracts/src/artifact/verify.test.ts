// @vitest-environment node
import { Buffer } from "node:buffer";
import {
  type BinaryLike,
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { vi } from "vitest";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import { verifySignedContentArtifact } from "#contracts/artifact/verify";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
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
import { testRendererDomains } from "#contracts/test/renderer";

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
function manifestInput(extraComponent?: RendererComponentRequirement) {
  const components = extraComponent
    ? [...rendererComponents, extraComponent]
    : rendererComponents;
  return {
    base: { authoringComponents: components, supportedComponents: components },
    domains: testRendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
    publishedDomains: ["mathematics"] as const,
  };
}
const rendererManifest = createRendererManifest(manifestInput());
const invalidRendererManifest = rendererManifest.pipe(
  Effect.map((manifest) => ({
    ...manifest,
    hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
  }))
);
const basePayload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: "test:content",
  format: "mdx-function-body",
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
const missingComponentPayload = makePayload({
  requiredComponents: [{ name: "Mermaid", version: 1 }],
});
const unsupportedComponentPayload = makePayload({
  requiredComponents: [{ name: "InlineMath", version: 2 }],
});
/** Produces a valid signed artifact for verification scenarios. */
function signArtifact(payload = basePayload, artifactKeyId = keyId) {
  const artifactHash = hashCompiledContentPayload(payload);
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
  artifact: unknown,
  manifest: unknown,
  rendererContractVersion = "1.0.0"
) {
  return { artifact, rendererContractVersion, rendererManifest: manifest };
}
/** Builds artifact verification with the trusted test resolver. */
function artifactProgram(input: unknown) {
  return verifySignedContentArtifact(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}
/** Returns an expected typed artifact verification failure. */
function reject(input: unknown) {
  return artifactProgram(input).pipe(Effect.flip);
}
/** Rejects an artifact against a renderer-manifest program. */
function rejectArtifact(
  artifact: unknown = signArtifact(),
  manifestProgram = rendererManifest,
  rendererContractVersion = "1.0.0"
) {
  return manifestProgram.pipe(
    Effect.flatMap((manifest) =>
      reject(request(artifact, manifest, rendererContractVersion))
    )
  );
}
/** Changes one signature character without changing its wire shape. */
function tamperSignature(artifact: SignedContentArtifact) {
  const replacement = artifact.signature.startsWith("A") ? "B" : "A";
  return `${replacement}${artifact.signature.slice(1)}`;
}
const validArtifact = signArtifact();
const tamperedArtifact = {
  ...validArtifact,
  signature: tamperSignature(validArtifact),
};
describe("server-only artifact verification", () => {
  it.effect("authenticates canonical content across a renderer expansion", () =>
    Effect.gen(function* () {
      const expandedManifest = yield* createRendererManifest(
        manifestInput({ name: "Mermaid", version: 1 })
      );
      expect(
        yield* artifactProgram(request(signArtifact(), expandedManifest))
      ).toMatchObject({ payload: basePayload });
    })
  );
  it.effect("separates authoring support from deployed route support", () =>
    Effect.gen(function* () {
      const authoringOnly = yield* createRendererManifest({
        ...manifestInput(),
        publishedDomains: ["chemistry"],
      });
      const error = yield* reject(request(signArtifact(), authoringOnly));
      expect(error).toMatchObject({
        _tag: "ArtifactRendererDomainUnpublishedError",
        contentKey: basePayload.contentKey,
        rendererDomain: "mathematics",
      });
    })
  );
  it.effect.each([
    {
      expectedTag: "ArtifactHashMismatchError",
      program: rejectArtifact({
        ...validArtifact,
        payload: makePayload({ compiledCode: "return { changed: true };" }),
      }),
    },
    {
      expectedTag: "ArtifactHashMismatchError",
      program: rejectArtifact({
        ...validArtifact,
        artifactHash: `sha256:${"f".repeat(64)}`,
      }),
    },
    {
      expectedTag: "SignatureInvalidError",
      program: rejectArtifact(tamperedArtifact),
    },
    {
      expectedTag: "SignatureInvalidError",
      program: rejectArtifact(tamperedArtifact, invalidRendererManifest),
    },
    {
      expectedTag: "RendererManifestHashMismatchError",
      program: rejectArtifact(validArtifact, invalidRendererManifest),
    },
    {
      expectedTag: "ArtifactRendererComponentMissingError",
      program: rejectArtifact(signArtifact(missingComponentPayload)),
    },
    {
      expectedTag: "ArtifactRendererVersionUnsupportedError",
      program: rejectArtifact(signArtifact(unsupportedComponentPayload)),
    },
    {
      expectedTag: "RendererContractVersionMismatchError",
      program: rejectArtifact(validArtifact, rendererManifest, "3.0.0"),
    },
    {
      expectedTag: "ArtifactHashComputationError",
      program: rejectArtifact({
        ...validArtifact,
        payload: { ...validArtifact.payload, contentKey: "hash:payload" },
      }),
    },
  ] as const)(
    "rejects invalid artifact state with $expectedTag",
    ({ expectedTag, program }) =>
      program.pipe(Effect.map((error) => expect(error._tag).toBe(expectedTag)))
  );
  it.effect("rejects requirements from a different route-domain registry", () =>
    Effect.gen(function* () {
      const crossDomainManifest = yield* createRendererManifest({
        ...manifestInput(),
        publishedDomains: ["chemistry", "mathematics"],
      });
      const mathematics = makePayload({
        requiredComponents: [{ name: "FunctionMachine", version: 1 }],
      });
      const chemistry = makePayload({
        rendererDomain: "chemistry",
        requiredComponents: [{ name: "FunctionMachine", version: 1 }],
      });
      expect(
        yield* artifactProgram(
          request(signArtifact(mathematics), crossDomainManifest)
        )
      ).toEqual(signArtifact(mathematics));
      const error = yield* reject(
        request(signArtifact(chemistry), crossDomainManifest)
      );
      expect(error._tag).toBe("ArtifactRendererComponentMissingError");
    })
  );
  it.effect("rejects excess top-level and nested wire properties", () =>
    Effect.gen(function* () {
      const privateSourceMarker = "must-not-appear-in-decode-errors";
      const [topLevel, nested] = yield* Effect.all([
        rendererManifest.pipe(
          Effect.map((manifest) => ({
            ...request(signArtifact(), manifest),
            unexpected: true,
          })),
          Effect.flatMap((input) => reject(input))
        ),
        rejectArtifact({
          ...signArtifact(),
          payload: { ...basePayload, rawMdx: privateSourceMarker },
          unexpected: true,
        }),
      ]);
      expect(topLevel._tag).toBe("ArtifactVerificationDecodeError");
      expect(nested._tag).toBe("ArtifactVerificationDecodeError");
      expect(JSON.stringify(nested)).not.toContain(privateSourceMarker);
    })
  );
});
