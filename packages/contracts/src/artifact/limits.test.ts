import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
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

const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: `sha256:${"b".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:limits",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: "Limits",
  rawMdx: "## Limits",
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${"c".repeat(64)}`,
});

/** Builds one schema-valid signed envelope for byte-policy tests. */
function artifact(overrides: Partial<CompiledContentPayload> = {}) {
  return Schema.decodeSync(SignedContentArtifactSchema)({
    artifactHash: `sha256:${"a".repeat(64)}`,
    keyId: "test-signing-key",
    payload: { ...payload, ...overrides },
    signature: "A".repeat(86),
  });
}

describe("artifact limits", () => {
  it.effect("accepts a payload whose declared and actual bytes agree", () =>
    Effect.gen(function* () {
      expect(yield* validateArtifactByteIntegrity(artifact())).toBeUndefined();
    })
  );

  it.effect.each([
    {
      overrides: {
        byteLength: MAX_SIGNED_ARTIFACT_BYTES,
        compiledCode: "x".repeat(MAX_SIGNED_ARTIFACT_BYTES),
      },
      tag: "ArtifactVerificationByteLimitError",
    },
    {
      overrides: {
        byteLength: MAX_COMPILED_CODE_BYTES + 1,
        compiledCode: "x".repeat(MAX_COMPILED_CODE_BYTES + 1),
      },
      tag: "ArtifactPayloadFieldByteLimitError",
    },
    {
      overrides: { byteLength: 9 },
      tag: "ArtifactCompiledByteLengthMismatchError",
    },
  ])("rejects $tag", ({ overrides, tag }) =>
    Effect.gen(function* () {
      const error = yield* validateArtifactByteIntegrity(
        artifact(overrides)
      ).pipe(Effect.flip);
      expect(error._tag).toBe(tag);
    })
  );
});
