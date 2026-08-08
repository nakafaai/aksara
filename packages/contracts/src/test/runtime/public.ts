import { Effect } from "effect";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "#contracts/ids";
import {
  ArticleCategorySchema,
  ArticleProjectionSchema,
  ArticleSlugSchema,
} from "#contracts/projection/article";
import { hashContentProjection } from "#contracts/projection/hash";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { verifyContentRuntimeExchange } from "#contracts/runtime/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { articleGraph } from "#contracts/test/graph";
import { projection, rendererManifest } from "#contracts/test/request";
import {
  createSignedArtifact,
  release,
  trustedResolver,
} from "#contracts/test/runtime/fixture";

export const request = {
  delivery: "public",
  locale: "en",
  publicPath: "subjects/test/transport",
} as const;

const runtimeContentKey = ContentKeySchema.make(
  "material/lesson/test/transport"
);
const runtimeProjection = MaterialLessonProjectionSchema.make({
  ...projection,
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
  articleSlug: ArticleSlugSchema.make("dynastic-politics-asian-values"),
  category: ArticleCategorySchema.make("politics"),
  categoryTitle: "Politics",
  contentKey: articleContentKey,
  graph: articleGraph("en", "politics", "dynastic-politics-asian-values"),
  kind: "article",
  locale: "en",
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
  delivery: "public",
  locale: "en",
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

/** Runs one public runtime exchange expected to authenticate successfully. */
export function verifyExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input));
}

/** Runs one public exchange while preserving typed success and failure values. */
export function verifyExchangeEither(
  input: Parameters<typeof exchangeProgram>[0]
) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.either));
}

/** Runs one public runtime exchange expected to return a typed failure. */
export function rejectExchange(input: Parameters<typeof exchangeProgram>[0]) {
  return Effect.runPromise(exchangeProgram(input).pipe(Effect.flip));
}
