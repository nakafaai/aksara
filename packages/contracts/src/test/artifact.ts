import { Buffer } from "node:buffer";
import { verify as verifyBytes } from "node:crypto";
import { Effect, Schema } from "effect";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
} from "#contracts/content";
import { SigningKeyIdSchema } from "#contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";

/** Test-only Ed25519 key identity that signed the pinned artifact below. */
const pinnedKeyId = SigningKeyIdSchema.make("test-signing-key");

/** Public SPKI of the test-only key that signed the pinned artifact below. */
export const pinnedPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEA8uawKEJcm5XFi/ETWgO48DOTyG7ot9Re75SGqHkBg8A=\n-----END PUBLIC KEY-----\n";

export const pinnedArtifact = JSON.parse(
  // Record again: create a key, sign the same input, and replace the public key and signature literals.
  '{"artifactHash":"sha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5","keyId":"test-signing-key","payload":{"artifactLocale":"id","byteLength":45,"compiledCode":"return {title: \\"Pecahan Ñandú café 😀\\"};","compilerConfigHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","compilerVersion":"0.1.0","contentKey":"articles/science/cell-biology","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café 😀","rawMdx":"## Pecahan Ñandú café 😀","rendererDomain":"mathematics","requiredComponents":["BlockMath","FunctionMachine","InlineMath"],"sourceHash":"sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115"},"signature":"iBgfctwTZXN_Y1LoxsP2QyUSvpgdUEiJDRW6RHIy-m-oqcdA-PT-bE725Pccr1ACRVKA2uiKczNzWaGFmw15BQ"}'
);

export const pinnedManifest = JSON.parse(
  '{"base": ["BlockMath", "InlineMath"], "domains": [{"components": [], "name": "ai-ds"}, {"components": [], "name": "biology"}, {"components": [], "name": "chemistry"}, {"components": ["FunctionMachine"], "name": "mathematics"}, {"components": [], "name": "physics"}, {"components": [], "name": "politics"}, {"components": [], "name": "site"}, {"components": [], "name": "snbt-general"}, {"components": [], "name": "snbt-math"}, {"components": [], "name": "snbt-plain"}, {"components": [], "name": "snbt-quant"}, {"components": [], "name": "tka-math"}], "format": "nakafa-mdx-renderer", "hash": "sha256:7e0a422cba5f309bf9d484b44cc1d4633b1704c9813d66b08ba6c5b0460797a6", "publishedDomains": ["mathematics"]}'
);

export const pinnedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the recorded public key for the pinned artifact. */
  resolve: (requestedKeyId) =>
    requestedKeyId === pinnedKeyId
      ? Effect.succeed(pinnedPublicKey)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

/** Verifies the pinned signature over its exact canonical bytes, then over the same bytes with one changed byte. */
export function verifyPinnedSignature() {
  const payload = Schema.decodeSync(CompiledContentPayloadSchema)(
    pinnedArtifact.payload
  );
  const input = canonicalizeContentArtifactSigningInput(
    hashCompiledContentPayload(payload),
    payload
  );
  return [input, input.replace("aksara", "aksarb")].map((text) =>
    verifyBytes(
      null,
      Buffer.from(text, "utf8"),
      pinnedPublicKey,
      Buffer.from(pinnedArtifact.signature, "base64url")
    )
  );
}
