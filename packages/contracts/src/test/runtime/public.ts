import { Effect, Schema } from "effect";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
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
  verifyContentRuntimeEvidenceExchange,
  verifyContentRuntimeExchange,
} from "#contracts/runtime/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { articleGraph } from "#contracts/test/graph";
import { projection, rendererManifest } from "#contracts/test/request";
import {
  createSignedArtifact,
  release,
  trustedResolver,
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
export const artifact = createSignedArtifact(runtimeContentKey);

export const found = {
  activeManifestHash: release.manifestHash,
  activeReleaseId: release.manifest.releaseId,
  artifact,
  delivery: "public",
  kind: "found",
  projection: runtimeProjection,
  projectionHash: hashContentProjection(runtimeProjection),
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
    date: "2024-02-14",
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
export const articleArtifact = createSignedArtifact(articleContentKey);
export const articleRequest = {
  appLocale: "en",
  delivery: "public",
  publicPath: articleProjection.publicPath,
} as const;
export const articleFound = {
  ...found,
  artifact: articleArtifact,
  projection: articleProjection,
  projectionHash: hashContentProjection(articleProjection),
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
    description: "Reviewed public terms.",
    lastModified: "2026-08-20",
    title: "Terms of Service",
  },
  pageKey: "terms-of-service",
  publicPath: "terms-of-service",
  sitemap: true,
});
export const pageArtifact = createSignedArtifact(pageContentKey);
export const pageRequest = {
  appLocale: "en",
  delivery: "public",
  publicPath: pageProjection.publicPath,
} as const;
export const pageFound = {
  ...found,
  artifact: pageArtifact,
  projection: pageProjection,
  projectionHash: hashContentProjection(pageProjection),
  sourcePath: CorpusSourcePathSchema.make("packages/corpus/pages/terms/en.mdx"),
} as const;

/** Builds one public runtime exchange with the fixture verification key. */
function exchangeProgram(input: {
  readonly rendererManifest?: unknown;
  readonly request?: unknown;
  readonly response: unknown;
}) {
  return verifyContentRuntimeExchange({
    rendererManifest: input.rendererManifest ?? rendererManifest,
    request: input.request ?? request,
    response: input.response,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}

/** Builds one non-rendering evidence exchange with the fixture verification key. */
function evidenceExchangeProgram(input: {
  readonly request?: unknown;
  readonly response: unknown;
}) {
  return verifyContentRuntimeEvidenceExchange({
    request: input.request ?? request,
    response: input.response,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}

/** Runs one public runtime exchange expected to authenticate successfully. */
export function verifyExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input));
}

/** Runs one public exchange while preserving typed success and failure values. */
export function verifyExchangeResult(
  input: Parameters<typeof exchangeProgram>[0]
) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.result));
}

/** Runs one public runtime exchange expected to return a typed failure. */
export function rejectExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.flip));
}

/** Runs one non-rendering evidence exchange expected to authenticate. */
export function verifyEvidenceExchange(
  input: Parameters<typeof evidenceExchangeProgram>[0]
) {
  return Effect.runPromise(evidenceExchangeProgram(input));
}
