import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  canonicalizeSignedContentArtifact,
  decodeCompileDocumentRequest,
  decodeCompileDocumentSource,
  SignedContentArtifactSchema,
} from "#contracts/content.js";

const TEST_HEADING = "Protocol Test Heading";

const validRequest = {
  contentKey: "test:content",
  locale: "en",
  rawMdx: `## ${TEST_HEADING}`,
  rendererManifest: {
    authoringComponents: [{ name: "BlockMath", version: 1 }],
    format: "nakafa-mdx-renderer-v1",
    hash: `sha256:${"a".repeat(64)}`,
    rendererContractVersion: "1.0.0",
    supportedComponents: [{ name: "BlockMath", version: 1 }],
  },
} as const;

describe("content", () => {
  it("decodes a strict compile request", async () => {
    const request = await Effect.runPromise(
      decodeCompileDocumentRequest(validRequest)
    );
    expect(request.contentKey).toBe("test:content");
  });

  it("returns a typed contract error for extra wire fields", async () => {
    const error = await Effect.runPromise(
      decodeCompileDocumentRequest({ ...validRequest, unexpected: true }).pipe(
        Effect.flip
      )
    );
    expect(error._tag).toBe("ContractDecodeError");
  });

  it("does not accept caller-provided compiled code as authored source", async () => {
    const { rendererManifest: _, ...source } = validRequest;
    const error = await Effect.runPromise(
      decodeCompileDocumentSource({
        ...source,
        compiledCode: "return {default: () => process.env};",
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ContractDecodeError");
  });

  it("matches exact canonical artifact bytes and hashes", () => {
    const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
      byteLength: 10,
      compiledCode: "return {};",
      compilerConfigHash: `sha256:${"c".repeat(64)}`,
      compilerVersion: "0.1.0",
      contentKey: "test:content",
      format: "mdx-function-body-v1",
      locale: "en",
      mdxCompilerVersion: "3.1.1",
      plainText: TEST_HEADING,
      rawMdx: `## ${TEST_HEADING}`,
      requiredComponents: [
        { name: "BlockMath", version: 1 },
        { name: "TestWidget", version: 2 },
      ],
      sourceHash:
        "sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb",
    });
    const canonicalPayload =
      '{"byteLength":10,"compiledCode":"return {};","compilerConfigHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","compilerVersion":"0.1.0","contentKey":"test:content","format":"mdx-function-body-v1","locale":"en","mdxCompilerVersion":"3.1.1","plainText":"Protocol Test Heading","rawMdx":"## Protocol Test Heading","requiredComponents":[{"name":"BlockMath","version":1},{"name":"TestWidget","version":2}],"sourceHash":"sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb"}';
    const artifactHash =
      "sha256:4707616e42057310d59a2194260480d93d47f74af65ba6f40e762a1d2e8f9050";
    const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
      artifactHash,
      keyId: "test-signing-key",
      payload,
      signature: "A".repeat(86),
    });
    const canonicalArtifact = `{"artifactHash":"${artifactHash}","keyId":"test-signing-key","payload":${canonicalPayload},"signature":"${"A".repeat(86)}"}`;

    expect(canonicalizeCompiledContentPayload(payload)).toBe(canonicalPayload);
    expect(
      `sha256:${createHash("sha256").update(canonicalPayload).digest("hex")}`
    ).toBe(artifactHash);
    expect(
      canonicalizeContentArtifactSigningInput(artifact.artifactHash, payload)
    ).toBe(
      `nakafa.aksara.content-artifact.v1\n${artifactHash}\n${canonicalPayload}`
    );
    expect(canonicalizeSignedContentArtifact(artifact)).toBe(canonicalArtifact);
    expect(
      `sha256:${createHash("sha256").update(canonicalArtifact).digest("hex")}`
    ).toBe(
      "sha256:a5c4ccf964b3ca67f65c7b8fd6a49af7f4d42e2b8709a694c9a99b8946ddf646"
    );
  });
});
