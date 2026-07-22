import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { validateArtifactByteIntegrity } from "#contracts/artifact/limits";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  MAX_COMPILED_CODE_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits";

const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: `sha256:${"b".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:limits",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: "Limits",
  rawMdx: "## Limits",
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${"c".repeat(64)}`,
});

/** Builds one schema-valid signed envelope for byte-policy tests. */
function artifact(overrides: Partial<CompiledContentPayload> = {}) {
  return Schema.decodeUnknownSync(SignedContentArtifactSchema)({
    artifactHash: `sha256:${"a".repeat(64)}`,
    keyId: "test-signing-key",
    payload: { ...payload, ...overrides },
    signature: "A".repeat(86),
  });
}

describe("artifact limits", () => {
  it("accepts a payload whose declared and actual bytes agree", async () => {
    await expect(
      Effect.runPromise(validateArtifactByteIntegrity(artifact()))
    ).resolves.toBeUndefined();
  });

  it.each([
    [
      "ArtifactVerificationByteLimitError",
      {
        byteLength: MAX_SIGNED_ARTIFACT_BYTES,
        compiledCode: "x".repeat(MAX_SIGNED_ARTIFACT_BYTES),
      },
    ],
    [
      "ArtifactPayloadFieldByteLimitError",
      {
        byteLength: MAX_COMPILED_CODE_BYTES + 1,
        compiledCode: "x".repeat(MAX_COMPILED_CODE_BYTES + 1),
      },
    ],
    ["ArtifactCompiledByteLengthMismatchError", { byteLength: 9 }],
  ])("rejects %s", async (tag, overrides) => {
    const error = await Effect.runPromise(
      validateArtifactByteIntegrity(artifact(overrides)).pipe(Effect.flip)
    );
    expect(error._tag).toBe(tag);
  });
});
