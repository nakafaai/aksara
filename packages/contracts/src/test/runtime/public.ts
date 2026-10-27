import { Effect, Schema } from "effect";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { AppLocaleSchema, ArtifactLocaleSchema } from "#contracts/locale";
import {
  ArticleCategorySchema,
  ArticleProjectionSchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "#contracts/projection/article";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { PublicPageProjectionSchema } from "#contracts/projection/page";
import {
  PublicContentRuntimeFoundSchema,
  PublicContentRuntimeRequestSchema,
} from "#contracts/runtime/spec";
import { articleGraph, materialGraph } from "#contracts/test/graph";
import { hash, projection, rendererManifest } from "#contracts/test/request";
import {
  createSignedArtifact,
  release,
  tamperSignature,
} from "#contracts/test/runtime/fixture";

export const request = {
  appLocale: AppLocaleSchema.make("en"),
  delivery: "public",
  publicPath: "subjects/test/transport",
} as const;

const runtimeContentKey = ContentKeySchema.make(
  "material/lesson/test/transport"
);
const runtimeProjection = MaterialLessonProjectionSchema.make({
  ...projection,
  appLocale: AppLocaleSchema.make("en"),
  artifactLocale: ArtifactLocaleSchema.make("en"),
  contentKey: runtimeContentKey,
});
export const artifact = await Effect.runPromise(
  createSignedArtifact(runtimeContentKey)
);

export const found = {
  activeManifestHash: release.manifestHash,
  activeReleaseId: release.manifest.releaseId,
  artifact,
  delivery: "public",
  kind: "found",
  projection: runtimeProjection,
  projectionHash: await Effect.runPromise(
    hashContentProjection(runtimeProjection)
  ),
  release,
  rendererManifest,
  sourcePath: CorpusSourcePathSchema.make(
    `packages/corpus/${runtimeContentKey}/en.mdx`
  ),
} as const;

const articleContentKey = ContentKeySchema.make(
  "articles/politics/dynastic-politics-asian-values"
);
const articleProjection = ArticleProjectionSchema.make({
  appLocale: AppLocaleSchema.make("en"),
  articleRouteSlug: ArticleRouteSlugSchema.make(
    "dynastic-politics-asian-values"
  ),
  articleSlug: ArticleSlugSchema.make("dynastic-politics-asian-values"),
  artifactLocale: ArtifactLocaleSchema.make("en"),
  category: ArticleCategorySchema.make("politics"),
  categoryRouteSlug: ArticleRouteSlugSchema.make("politics"),
  categoryTitle: "Politics",
  contentKey: articleContentKey,
  graph: articleGraph("en", "politics", "dynastic-politics-asian-values"),
  kind: "article",
  metadata: {
    authors: [{ name: "Nabil Fatih" }],
    datePublished: "2024-02-14",
    title: "Dynastic Politics and Asian Values",
  },
  official: true,
  parentPath: PublicPathSchema.make("articles/politics"),
  publicPath: PublicPathSchema.make(
    "articles/politics/dynastic-politics-asian-values"
  ),
  references: [],
  sitemap: true,
});
export const articleArtifact = await Effect.runPromise(
  createSignedArtifact(articleContentKey)
);
export const articleRequest = {
  appLocale: "en",
  delivery: "public",
  publicPath: articleProjection.publicPath,
} as const;
export const articleFound = {
  ...found,
  artifact: articleArtifact,
  projection: articleProjection,
  projectionHash: await Effect.runPromise(
    hashContentProjection(articleProjection)
  ),
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx"
  ),
} as const;

const pageContentKey = ContentKeySchema.make("pages/terms-of-service");
const pageProjection = Schema.decodeSync(PublicPageProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: pageContentKey,
  kind: "public-page",
  metadata: {
    datePublished: "2026-08-20",
    description: "Reviewed public terms.",
    title: "Terms of Service",
  },
  pageKey: "terms-of-service",
  publicPath: "terms-of-service",
  sitemap: true,
  sourcePath: "packages/corpus/pages/terms/en.mdx",
});
export const pageArtifact = await Effect.runPromise(
  createSignedArtifact(pageContentKey)
);
export const pageRequest = {
  appLocale: "en",
  delivery: "public",
  publicPath: pageProjection.publicPath,
} as const;
export const pageFound = {
  ...found,
  artifact: pageArtifact,
  projection: pageProjection,
  projectionHash: await Effect.runPromise(
    hashContentProjection(pageProjection)
  ),
  sourcePath: CorpusSourcePathSchema.make("packages/corpus/pages/terms/en.mdx"),
} as const;

/** Found responses that each change exactly one request-bound identity. */
export const mismatchedFoundResponses = [
  {
    ...found,
    artifact: {
      ...artifact,
      payload: { ...artifact.payload, artifactLocale: "id" },
    },
    projection: {
      ...found.projection,
      appLocale: "id",
      artifactLocale: "id",
      graph: materialGraph("id", "test", "transport", "test-transport"),
      parentPath: "materi/test",
      publicPath: "materi/test/transport",
    },
  },
  {
    ...found,
    projection: {
      ...found.projection,
      publicPath: "subjects/test/other",
    },
  },
  {
    ...found,
    sourcePath: "packages/corpus/article/test/other/en.mdx",
  },
  {
    ...found,
    sourcePath: "packages/corpus/material/lesson/test/transport/id.mdx",
  },
  { ...found, activeReleaseId: "test-other-release" },
  { ...found, activeManifestHash: hash },
  { ...found, projectionHash: hash },
];

/** Routed physical source paths that must not authenticate one response. */
export const routedSourceCases = [
  {
    invalidSources: [
      "packages/corpus/articles/politics/dynastic-politics-asian-values/en.mdx",
      "packages/corpus/articles/politics/dynastic-politics/asian-values/id.mdx",
      "packages/corpus/articles/politics/flawed-legal/geopolitics/en.mdx",
      "packages/corpus/material/lesson/politics/dynastic-politics-asian-values/en.mdx",
    ],
    request: articleRequest,
    response: articleFound,
  },
  {
    invalidSources: [
      "packages/corpus/pages/terms/id.mdx",
      "packages/corpus/pages/legal/terms/en.mdx",
      "packages/corpus/pages/terms.old/en.mdx",
      "packages/corpus/pages/privacy-policy/en.mdx",
      "packages/corpus/articles/terms/en.mdx",
    ],
    request: pageRequest,
    response: pageFound,
  },
];

/** Found responses whose artifact or release signature has one changed character. */
export const tamperedFoundResponses = [
  {
    ...found,
    artifact: {
      ...artifact,
      signature: tamperSignature(artifact.signature),
    },
  },
  {
    ...found,
    artifact: {
      ...artifact,
      keyId: SigningKeyIdSchema.make("test-runtime-unknown"),
    },
  },
  {
    ...found,
    release: {
      ...release,
      signature: tamperSignature(release.signature),
    },
  },
];

export const pinnedPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAaas3EQBfT/NrQS+IgTL/EvXGKji7eIMgEIkQhf9CZjA=\n-----END PUBLIC KEY-----\n";

/** Decodes the recorded runtime request through its wire contract. */
const decodePinnedRequest = Schema.decodeUnknownSync(
  Schema.fromJsonString(PublicContentRuntimeRequestSchema)
);

/** Decodes the recorded found runtime response through its wire contract. */
const decodePinnedResponse = Schema.decodeUnknownSync(
  Schema.fromJsonString(PublicContentRuntimeFoundSchema)
);

export const pinnedRequest = decodePinnedRequest(
  '{"appLocale":"en","delivery":"public","publicPath":"subjects/test/transport"}'
);

export const pinnedResponse = decodePinnedResponse(
  // Record again: create a key, sign the same input, and replace the public key and signature literals.
  '{"activeManifestHash":"sha256:9f9837c2a5edf4d20a65b24729ba4e61ea9f6b6c80fd32d9e182aaeda91a421b","activeReleaseId":"test-transport","artifact":{"artifactHash":"sha256:02b27d24709abae2a71021b8a8082556ca0b76f3843a1da1b454b898a0ab4933","keyId":"test-runtime-key","payload":{"artifactLocale":"en","compilerConfigHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","compilerVersion":"0.2.0","contentKey":"material/lesson/test/transport","contentTree":{"$node":"element","name":"fragment","props":{},"children":[]},"format":"content-tree","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café","rawMdx":"x","rendererDomain":"mathematics","requiredComponents":["BlockMath"],"sourceHash":"sha256:2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881"},"signature":"fb6QQgNa8cv_LI2laqdVEXee0VyBNAz_Z-SVg-oHnBfpFtTlVk5zHm-3tSyruT7_xsiVfje8y-7W0W0zs6rUBQ"},"delivery":"public","kind":"found","projection":{"appLocale":"en","artifactLocale":"en","contentKey":"material/lesson/test/transport","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:transport:test-transport","assetId":"asset:en:material:lesson:test:material-section:test:transport:test-transport","conceptId":"concept:material:lesson:test:transport","learningObjectId":"lo:material-section:test:transport:test-transport","lensId":"lens:material:lesson:test"},"materialKey":"lesson.test.transport","order":1,"publicPath":"subjects/test/transport","sectionKey":"test-transport","kind":"subject-lesson","metadata":{"authors":[],"title":"Test protocol","datePublished":"2026-01-01"},"parentPath":"subjects/test","sitemap":true,"topicTitle":"Test Transport Topic"},"projectionHash":"sha256:d1634d167425c61b00afee9690888872fc66b9896f4c82d22c4155145d2c7f31","release":{"keyId":"test-runtime-key","manifest":{"activeAppLocales":["en","id","de"],"baseActiveAppLocales":null,"baseManifestHash":null,"baseReleaseId":null,"baseResultCount":0,"baseResultDigest":"sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd","deleteCount":1,"itemCount":2,"itemsDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","origin":{"kind":"git","sha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"projectionCount":1,"projectionDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","releaseId":"test-transport","rendererManifestHash":"sha256:92672cbd7915b85fc78ad2b8ed7f1b415fd9bac5a9bc4b204a561200f9bf26a3","resultCount":1,"resultDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","rollbackCount":2,"rollbackDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","routeCount":0,"routeDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","scope":{"families":["material"],"snapshots":["assessment","program"]},"snapshots":{"assessment":{"baseSnapshotId":null,"mode":"replace","resultSnapshotId":"sha256:29440470fba79dbcf9c4b642213e59e55b9be8dddf5bd1c5c155a908edafa182","rowCount":1,"rowDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"program":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"quran":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"}},"upsertCount":1,"format":"localized-content-release"},"manifestHash":"sha256:9f9837c2a5edf4d20a65b24729ba4e61ea9f6b6c80fd32d9e182aaeda91a421b","signature":"QxX3qRpCIw4-S31P8MbCQgmm6UDQG-sZLjINx_ixRJA0SVAXKJw-EnLwaWsYTmWPCTs4y1aruIOLtclzJcE0Dw"},"rendererManifest":{"base":["BlockMath"],"domains":[{"components":[],"name":"ai-ds"},{"components":[],"name":"biology"},{"components":[],"name":"chemistry"},{"components":[],"name":"mathematics"},{"components":[],"name":"physics"},{"components":[],"name":"politics"},{"components":[],"name":"site"},{"components":[],"name":"snbt-general"},{"components":[],"name":"snbt-math"},{"components":[],"name":"snbt-plain"},{"components":[],"name":"snbt-quant"},{"components":[],"name":"tka-math"}],"format":"nakafa-mdx-renderer","hash":"sha256:92672cbd7915b85fc78ad2b8ed7f1b415fd9bac5a9bc4b204a561200f9bf26a3","publishedDomains":["mathematics"]},"sourcePath":"packages/corpus/material/lesson/test/transport/en.mdx"}'
);

export const pinnedArtifactMessage =
  'nakafa.aksara.content-artifact\nsha256:02b27d24709abae2a71021b8a8082556ca0b76f3843a1da1b454b898a0ab4933\n{"artifactLocale":"en","compilerConfigHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","compilerVersion":"0.2.0","contentKey":"material/lesson/test/transport","contentTree":{"$node":"element","name":"fragment","props":{},"children":[]},"format":"content-tree","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café","rawMdx":"x","rendererDomain":"mathematics","requiredComponents":["BlockMath"],"sourceHash":"sha256:2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881"}';

export const pinnedReleaseMessage =
  'nakafa.aksara.localized-content-release\nsha256:9f9837c2a5edf4d20a65b24729ba4e61ea9f6b6c80fd32d9e182aaeda91a421b\n{"activeAppLocales":["en","id","de"],"baseActiveAppLocales":null,"baseManifestHash":null,"baseReleaseId":null,"baseResultCount":0,"baseResultDigest":"sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd","deleteCount":1,"format":"localized-content-release","itemCount":2,"itemsDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","origin":{"kind":"git","sha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"projectionCount":1,"projectionDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","releaseId":"test-transport","rendererManifestHash":"sha256:92672cbd7915b85fc78ad2b8ed7f1b415fd9bac5a9bc4b204a561200f9bf26a3","resultCount":1,"resultDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","rollbackCount":2,"rollbackDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","routeCount":0,"routeDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","scope":{"families":["material"],"snapshots":["assessment","program"]},"snapshots":{"assessment":{"baseSnapshotId":null,"mode":"replace","resultSnapshotId":"sha256:29440470fba79dbcf9c4b642213e59e55b9be8dddf5bd1c5c155a908edafa182","rowCount":1,"rowDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"program":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"quran":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"}},"upsertCount":1}';
