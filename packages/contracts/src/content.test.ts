import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  canonicalizeSignedContentArtifact,
  compareContentHeads,
  decodeCompileDocumentRequest,
  decodeCompileDocumentSource,
  headIdentity,
  routeIdentity,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

const TEST_HEADING = "Protocol Test Heading";

const validRequest = {
  contentKey: "test:content",
  locale: "en",
  rawMdx: `## ${TEST_HEADING}`,
  rendererDomain: "material-mathematics",
  rendererManifest: {
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: [
      {
        authoringComponents: [{ name: "AtomShellLab", version: 1 }],
        name: "material-chemistry",
        supportedComponents: [{ name: "AtomShellLab", version: 1 }],
      },
      {
        authoringComponents: [{ name: "FunctionMachine", version: 1 }],
        name: "material-mathematics",
        supportedComponents: [{ name: "FunctionMachine", version: 1 }],
      },
    ],
    format: "nakafa-mdx-renderer-v2",
    hash: `sha256:${"a".repeat(64)}`,
    rendererContractVersion: "2.0.0",
  },
  sourcePath: "packages/corpus/test/content/en.mdx",
} as const;

describe("content", () => {
  it("orders stable content identity before locale", () => {
    const english = {
      contentKey: ContentKeySchema.make("test:a"),
      locale: "en",
    } as const;
    const indonesian = { ...english, locale: "id" } as const;
    const next = {
      ...english,
      contentKey: ContentKeySchema.make("test:b"),
    } as const;

    expect(compareContentHeads(english, next)).toBe(-1);
    expect(compareContentHeads(next, english)).toBe(1);
    expect(compareContentHeads(english, indonesian)).toBe(-1);
    expect(compareContentHeads(indonesian, english)).toBe(1);
    expect(compareContentHeads(english, english)).toBe(0);
  });

  it("owns unambiguous content-head and public-route identities", () => {
    const content = Schema.decodeUnknownSync(
      CompiledContentPayloadSchema.fields.contentKey
    )("test:content");
    const publicPath = Schema.decodeUnknownSync(PublicPathSchema)(
      "subjects/mathematics"
    );

    expect(headIdentity({ contentKey: content, locale: "en" })).toBe(
      "test:content\0en"
    );
    expect(routeIdentity({ locale: "en", publicPath })).toBe(
      "en\0subjects/mathematics"
    );
  });

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
      rendererDomain: "material-mathematics",
      requiredComponents: [
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 2 },
      ],
      sourceHash:
        "sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb",
    });
    const canonicalPayload =
      '{"byteLength":10,"compiledCode":"return {};","compilerConfigHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","compilerVersion":"0.1.0","contentKey":"test:content","format":"mdx-function-body-v1","locale":"en","mdxCompilerVersion":"3.1.1","plainText":"Protocol Test Heading","rawMdx":"## Protocol Test Heading","rendererDomain":"material-mathematics","requiredComponents":[{"name":"BlockMath","version":1},{"name":"FunctionMachine","version":2}],"sourceHash":"sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb"}';
    const artifactHash = `sha256:${createHash("sha256")
      .update(canonicalPayload)
      .digest("hex")}`;
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
    ).toMatch(SHA256_PATTERN);
  });
});
