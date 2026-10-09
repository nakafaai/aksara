import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Number as Num, Order, Schema } from "effect";
import {
  CompiledContentPayloadSchema,
  type ContentHeadIdentity,
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
import {
  ContentKeySchema,
  PublicPathSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { AppLocaleSchema, ArtifactLocaleSchema } from "#contracts/locale";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";

const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;

const TEST_HEADING = "Protocol Test Heading";

const nonAsciiPayload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "id",
  byteLength: 45,
  compiledCode: 'return {title: "Pecahan Ñandú café 😀"};',
  compilerConfigHash: `sha256:${"d".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "articles/science/cell-biology",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: "Pecahan Ñandú café 😀",
  rawMdx: "## Pecahan Ñandú café 😀",
  rendererDomain: "mathematics",
  requiredComponents: ["BlockMath", "FunctionMachine", "InlineMath"],
  sourceHash:
    "sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115",
});

const validRequest = {
  artifactLocale: "en",
  contentKey: "test:content",
  rawMdx: `## ${TEST_HEADING}`,
  rendererDomain: "mathematics",
  rendererManifest: {
    base: ["BlockMath"],
    domains: Arr.map(RENDERER_DOMAINS, (name) => ({ components: [], name })),
    format: "nakafa-mdx-renderer",
    hash: `sha256:${"a".repeat(64)}`,
    publishedDomains: ["mathematics"],
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

  it.effect("decodes a strict compile request", () =>
    Effect.gen(function* () {
      const request = yield* decodeCompileDocumentRequest(validRequest);
      expect(request.contentKey).toBe("test:content");
    })
  );

  it.effect("returns a typed contract error for extra wire fields", () =>
    Effect.gen(function* () {
      const error = yield* decodeCompileDocumentRequest({
        ...validRequest,
        unexpected: true,
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");
    })
  );

  it.effect("rejects a compile request with incomplete current domains", () =>
    Effect.gen(function* () {
      const error = yield* decodeCompileDocumentRequest({
        ...validRequest,
        rendererDomain: "chemistry",
        rendererManifest: {
          ...validRequest.rendererManifest,
          domains: Arr.filter(
            validRequest.rendererManifest.domains,
            ({ name }) => name !== "chemistry"
          ),
        },
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ContractDecodeError");
      expect(error.message).toContain(
        "Expected every renderer domain exactly once in canonical order."
      );
    })
  );

  it.effect(
    "does not accept caller-provided compiled code as authored source",
    () =>
      Effect.gen(function* () {
        const { rendererManifest: _, ...source } = validRequest;
        const error = yield* decodeCompileDocumentSource({
          ...source,
          compiledCode: "return {default: () => process.env};",
        }).pipe(Effect.flip);

        expect(error._tag).toBe("ContractDecodeError");
      })
  );

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
      requiredComponents: ["BlockMath", "FunctionMachine"],
      sourceHash:
        "sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb",
    });
    const canonicalPayload =
      '{"artifactLocale":"en","byteLength":10,"compiledCode":"return {};","compilerConfigHash":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","compilerVersion":"0.1.0","contentKey":"test:content","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Protocol Test Heading","rawMdx":"## Protocol Test Heading","rendererDomain":"mathematics","requiredComponents":["BlockMath","FunctionMachine"],"sourceHash":"sha256:3e120676aefeef90d7793be97a39688e44fc03950deba0f4d825894afc031ecb"}';
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

  it("pins canonical payload bytes for non-ASCII content and a component list", () => {
    expect(canonicalizeCompiledContentPayload(nonAsciiPayload)).toBe(
      '{"artifactLocale":"id","byteLength":45,"compiledCode":"return {title: \\"Pecahan Ñandú café 😀\\"};","compilerConfigHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","compilerVersion":"0.1.0","contentKey":"articles/science/cell-biology","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café 😀","rawMdx":"## Pecahan Ñandú café 😀","rendererDomain":"mathematics","requiredComponents":["BlockMath","FunctionMachine","InlineMath"],"sourceHash":"sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115"}'
    );
  });

  it("pins the domain-separated signing input and wire envelope for non-ASCII content", () => {
    const artifactHash = Sha256HashSchema.make(
      "sha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5"
    );
    const artifact = Schema.decodeSync(SignedContentArtifactSchema)({
      artifactHash,
      keyId: "fixture-key",
      payload: nonAsciiPayload,
      signature: "A".repeat(86),
    });

    expect(
      canonicalizeContentArtifactSigningInput(artifactHash, nonAsciiPayload)
    ).toBe(
      'nakafa.aksara.content-artifact\nsha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5\n{"artifactLocale":"id","byteLength":45,"compiledCode":"return {title: \\"Pecahan Ñandú café 😀\\"};","compilerConfigHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","compilerVersion":"0.1.0","contentKey":"articles/science/cell-biology","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café 😀","rawMdx":"## Pecahan Ñandú café 😀","rendererDomain":"mathematics","requiredComponents":["BlockMath","FunctionMachine","InlineMath"],"sourceHash":"sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115"}'
    );
    expect(canonicalizeSignedContentArtifact(artifact)).toBe(
      '{"artifactHash":"sha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5","keyId":"fixture-key","payload":{"artifactLocale":"id","byteLength":45,"compiledCode":"return {title: \\"Pecahan Ñandú café 😀\\"};","compilerConfigHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","compilerVersion":"0.1.0","contentKey":"articles/science/cell-biology","format":"mdx-function-body","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café 😀","rawMdx":"## Pecahan Ñandú café 😀","rendererDomain":"mathematics","requiredComponents":["BlockMath","FunctionMachine","InlineMath"],"sourceHash":"sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115"},"signature":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}'
    );
  });

  it("pins one head order for unsorted input in both caller orders", () => {
    const heads = [
      {
        artifactLocale: ArtifactLocaleSchema.make("en"),
        contentKey: ContentKeySchema.make("test:b"),
      },
      {
        artifactLocale: ArtifactLocaleSchema.make("id"),
        contentKey: ContentKeySchema.make("test:a"),
      },
      {
        artifactLocale: ArtifactLocaleSchema.make("en"),
        contentKey: ContentKeySchema.make("test:a"),
      },
      {
        artifactLocale: ArtifactLocaleSchema.make("de"),
        contentKey: ContentKeySchema.make("articles:z"),
      },
    ];
    const pinned = [
      { artifactLocale: "de", contentKey: "articles:z" },
      { artifactLocale: "en", contentKey: "test:a" },
      { artifactLocale: "id", contentKey: "test:a" },
      { artifactLocale: "en", contentKey: "test:b" },
    ];

    const contentHeadOrder = Order.make<ContentHeadIdentity>((left, right) =>
      Num.sign(compareContentHeads(left, right))
    );
    expect(Arr.sort(heads, contentHeadOrder)).toEqual(pinned);
    expect(Arr.sort(Arr.reverse(heads), contentHeadOrder)).toEqual(pinned);
  });
});
