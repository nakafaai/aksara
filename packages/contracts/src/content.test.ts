import { createHash } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";
import {
  CompiledContentPayloadSchema,
  ContentPublicationIdentitySchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  canonicalizeSignedContentArtifact,
  compareContentHeads,
  comparePublicationIdentities,
  decodeCompileDocumentRequest,
  decodeCompileDocumentSource,
  headIdentity,
  routeIdentity,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";
import { AppLocaleSchema, ArtifactLocaleSchema } from "#contracts/locale";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

const TEST_HEADING = "Protocol Test Heading";

const validRequest = {
  artifactLocale: "en",
  contentKey: "test:content",
  rawMdx: `## ${TEST_HEADING}`,
  rendererDomain: "mathematics",
  rendererManifest: {
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: RENDERER_DOMAINS.map((name) => ({
      authoringComponents: [],
      name,
      supportedComponents: [],
    })),
    format: "nakafa-mdx-renderer-v1",
    hash: `sha256:${"a".repeat(64)}`,
    publishedDomains: ["mathematics"],
    rendererContractVersion: "1.0.0",
  },
  sourcePath: "packages/corpus/test/content/en.mdx",
} as const;

describe("content", () => {
  it("orders stable content identity before locale", () => {
    const englishArtifactLocale = ArtifactLocaleSchema.make("en");
    const indonesianArtifactLocale = ArtifactLocaleSchema.make("id");
    const english = {
      artifactLocale: englishArtifactLocale,
      contentKey: ContentKeySchema.make("test:a"),
    } as const;
    const indonesian = {
      ...english,
      artifactLocale: indonesianArtifactLocale,
    } as const;
    const next = {
      ...english,
      contentKey: ContentKeySchema.make("test:b"),
    } as const;

    expect(compareContentHeads(english, next)).toBe(-1);
    expect(compareContentHeads(next, english)).toBe(1);
    expect(compareContentHeads(english, indonesian)).toBe(-1);
    expect(compareContentHeads(indonesian, english)).toBe(1);
    expect(compareContentHeads(english, english)).toBe(0);
    expect(
      comparePublicationIdentities(
        { ...english, family: "article" },
        { ...english, family: "material" }
      )
    ).toBe(-1);
    expect(
      Schema.decodeSync(ContentPublicationIdentitySchema)({
        ...english,
        family: "material",
      })
    ).toEqual({ ...english, family: "material" });
  });

  it("owns unambiguous content-head and public-route identities", () => {
    const content = Schema.decodeSync(
      CompiledContentPayloadSchema.fields.contentKey
    )("test:content");
    const publicPath = Schema.decodeSync(PublicPathSchema)(
      "subjects/mathematics"
    );

    expect(
      headIdentity({
        artifactLocale: ArtifactLocaleSchema.make("en"),
        contentKey: content,
      })
    ).toBe("test:content\0en");
    expect(
      routeIdentity({
        appLocale: AppLocaleSchema.make("en"),
        publicPath,
      })
    ).toBe("en\0subjects/mathematics");
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

  it("rejects a compile request without its selected domain capability", async () => {
    const error = await Effect.runPromise(
      decodeCompileDocumentRequest({
        ...validRequest,
        rendererDomain: "chemistry",
        rendererManifest: {
          ...validRequest.rendererManifest,
          domains: validRequest.rendererManifest.domains.filter(
            ({ name }) => name !== "chemistry"
          ),
        },
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ContractDecodeError");
    expect(error.message).toContain(
      "Expected the selected renderer domain to have a capability."
    );
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
    const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
      artifactLocale: "en",
      byteLength: 10,
      compiledCode: "return {};",
      compilerConfigHash: `sha256:${"c".repeat(64)}`,
      compilerVersion: "0.1.0",
      contentKey: "test:content",
      format: "mdx-function-body",
      mdxCompilerVersion: "3.1.1",
      plainText: TEST_HEADING,
      rawMdx: `## ${TEST_HEADING}`,
      rendererDomain: "mathematics",
      requiredComponents: [
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 2 },
      ],
      sourceHash:
        "sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb",
    });
    const canonicalPayload =
      '{"artifactLocale":"en","byteLength":10,"compiledCode":"return {};","compilerConfigHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","compilerVersion":"0.1.0","contentKey":"test:content","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Protocol Test Heading","rawMdx":"## Protocol Test Heading","rendererDomain":"mathematics","requiredComponents":[{"name":"BlockMath","version":1},{"name":"FunctionMachine","version":2}],"sourceHash":"sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb"}';
    const artifactHash = `sha256:${createHash("sha256")
      .update(canonicalPayload)
      .digest("hex")}`;
    const artifact = Schema.decodeSync(SignedContentArtifactSchema)({
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
      `nakafa.aksara.content-artifact\n${artifactHash}\n${canonicalPayload}`
    );
    expect(canonicalizeSignedContentArtifact(artifact)).toBe(canonicalArtifact);
    expect(
      `sha256:${createHash("sha256").update(canonicalArtifact).digest("hex")}`
    ).toMatch(SHA256_PATTERN);
  });
});
