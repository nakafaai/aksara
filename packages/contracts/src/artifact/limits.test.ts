import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { validateArtifactByteIntegrity } from "#contracts/artifact/limits";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  MAX_CONTENT_TREE_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits";
import type { ContentTreeElement } from "#contracts/tree";

/** Builds a fragment whose one text child holds the given text. */
function treeWithText(text: string): ContentTreeElement {
  return {
    $node: "element",
    children: [text],
    name: "fragment",
    props: {},
  };
}

const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  compilerConfigHash: `sha256:${"b".repeat(64)}`,
  compilerVersion: "0.2.0",
  contentKey: "test:limits",
  contentTree: treeWithText("Limits"),
  format: "content-tree",
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
  it.effect("accepts a payload within every byte ceiling", () =>
    Effect.gen(function* () {
      expect(yield* validateArtifactByteIntegrity(artifact())).toBeUndefined();
    })
  );

  it.effect.each([
    {
      overrides: {
        contentTree: treeWithText("x".repeat(MAX_SIGNED_ARTIFACT_BYTES)),
      },
      tag: "ArtifactVerificationByteLimitError",
    },
    {
      overrides: {
        contentTree: treeWithText("x".repeat(MAX_CONTENT_TREE_BYTES)),
      },
      tag: "ArtifactPayloadFieldByteLimitError",
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
