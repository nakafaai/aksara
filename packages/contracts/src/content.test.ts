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
} from "./content.js";

const validRequest = {
  contentKey: "fixture:function",
  locale: "en",
  rawMdx: "## Function",
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
    expect(request.contentKey).toBe("fixture:function");
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
      contentKey: "fixture:function",
      format: "mdx-function-body-v1",
      locale: "en",
      mdxCompilerVersion: "3.1.1",
      metadata: {
        authors: [{ name: "Nakafa" }],
        date: "2026-07-21",
        description: "Exact oracle",
        subject: "Mathematics",
        title: "Function",
      },
      plainText: "hello",
      rawMdx: "## Hello",
      requiredComponents: [
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 2 },
      ],
      sourceHash:
        "sha256:8547edb146cd803f907b9b2d9bc69dbf132abaef73e99035517dc01663408bf1",
    });
    const canonicalPayload =
      '{"byteLength":10,"compiledCode":"return {};","compilerConfigHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","compilerVersion":"0.1.0","contentKey":"fixture:function","format":"mdx-function-body-v1","locale":"en","mdxCompilerVersion":"3.1.1","metadata":{"authors":[{"name":"Nakafa"}],"date":"2026-07-21","description":"Exact oracle","subject":"Mathematics","title":"Function"},"plainText":"hello","rawMdx":"## Hello","requiredComponents":[{"name":"BlockMath","version":1},{"name":"FunctionMachine","version":2}],"sourceHash":"sha256:8547edb146cd803f907b9b2d9bc69dbf132abaef73e99035517dc01663408bf1"}';
    const artifactHash =
      "sha256:5857141ff2ed209aa5b1419c6a895cc2534f01bb164313890b61b79dcee83242";
    const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
      artifactHash,
      keyId: "content-2026-01",
      payload,
      signature: "A".repeat(86),
    });
    const canonicalArtifact = `{"artifactHash":"${artifactHash}","keyId":"content-2026-01","payload":${canonicalPayload},"signature":"${"A".repeat(86)}"}`;

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
      "sha256:45dfe6ad795bdca5b466f2209ddea40de1384aed40778a33e4f0a4d1c6a4625f"
    );
  });
});
