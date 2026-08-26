import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";
import type { ArticleHead } from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import type { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateLiveRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import type { FileSystem, Path } from "effect";
import { Effect, Result, Schema, type Scope, Stream, Tuple } from "effect";
import { constUndefined } from "effect/Function";
import {
  type ArticleMetadataError,
  type ArticleSourceError,
  mapArticleSourceError,
} from "#publisher/article/document";
import {
  ArticlePublicationPlanSchema,
  planArticlePublication,
} from "#publisher/article/plan";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import {
  type RouteTransition,
  routeTransitionForContent,
} from "#publisher/routes";

const ArticleFamilyFieldSchema = Schema.Literals([
  "contentKey",
  "artifactLocale",
  "publicPath",
  "rendererDomain",
  "sourcePath",
]);

/** A target returned the same article identity more than once. */
export class ArticleHeadDuplicateError extends Schema.TaggedError<ArticleHeadDuplicateError>()(
  "ArticleHeadDuplicateError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** A target returned article heads outside canonical content-head order. */
export class ArticleHeadOrderError extends Schema.TaggedError<ArticleHeadOrderError>()(
  "ArticleHeadOrderError",
  { artifactLocale: ArtifactLocaleSchema, contentKey: ContentKeySchema }
) {}

/** An article-head page contained a route or source owned by another family. */
export class ArticleHeadFamilyError extends Schema.TaggedError<ArticleHeadFamilyError>()(
  "ArticleHeadFamilyError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
    field: ArticleFamilyFieldSchema,
  }
) {}

interface HeadOrderState {
  readonly previous: ArticleHead | undefined;
}

interface ArticleHeadOwner {
  readonly publicPath: string;
}

/** Builds the stable key shared by one registry entry and published head. */
function headOwnerKey(input: {
  readonly artifactLocale: string;
  readonly contentKey: string;
}) {
  return `${input.artifactLocale}\0${input.contentKey}`;
}

/** Every failure possible while replaying authoritative article records. */
export type ArticlePublicationStreamError<E> =
  | E
  | ArticleHeadDuplicateError
  | ArticleHeadFamilyError
  | ArticleHeadOrderError
  | ArticleMetadataError
  | ArticleSourceError
  | CompileContentError
  | ContentSourceInspectionError;

/** Authoritative article plan consumed by whole-catalog release composition. */
export interface ArticlePublication {
  /** Replays the exact article delta against supplied active article heads. */
  readonly records: Stream.Stream<PreparedContentTransition, ReplaySpoolError>;
  /** Replays the complete desired article head catalog in canonical order. */
  readonly result: Stream.Stream<ArticleHead, ReplaySpoolError>;
  /** Replays route ownership independently from article body transitions. */
  readonly routes: Stream.Stream<RouteTransition, ReplaySpoolError>;
}

/** Fresh-CI inputs pinned to one checkout, renderer, and article-head stream. */
export interface ArticlePublicationInput<E, R> {
  readonly checkoutRoot: string;
  readonly published: Stream.Stream<ArticleHead, E, R>;
  readonly rendererManifest: unknown;
  readonly scope?: PublicationScope | undefined;
}

type RendererManifestError = Effect.Error<
  ReturnType<typeof validateLiveRendererManifestHash>
>;

/** Every failure possible before the replayable article plan is constructed. */
export type PrepareArticlePublicationError<E> =
  | E
  | ArticlePublicationStreamError<never>
  | ReplaySpoolError
  | RendererManifestError;

/** Finds the first field proving a head does not own its article source. */
function mismatchedFamilyField(
  head: ArticleHead,
  ownerByHead: ReadonlyMap<string, ArticleHeadOwner>,
  rendererByCategory: ReadonlyMap<string, RendererDomain>
): typeof ArticleFamilyFieldSchema.Type | undefined {
  const [family, category, slug, contentRemainder] = head.contentKey.split("/");
  if (
    family !== "articles" ||
    category === undefined ||
    !Schema.is(ArticleCategorySchema)(category) ||
    slug === undefined ||
    !Schema.is(ArticleSlugSchema)(slug) ||
    contentRemainder !== undefined
  ) {
    return "contentKey";
  }
  const [routeFamily, routeCategory, routeSlug, routeRemainder] =
    head.publicPath?.split("/") ?? [];
  if (
    routeFamily !== "articles" ||
    routeCategory === undefined ||
    !Schema.is(ArticleRouteSlugSchema)(routeCategory) ||
    routeSlug === undefined ||
    !Schema.is(ArticleRouteSlugSchema)(routeSlug) ||
    routeRemainder !== undefined
  ) {
    return "publicPath";
  }
  const owner = ownerByHead.get(headOwnerKey(head));
  if (owner !== undefined && head.publicPath !== owner.publicPath) {
    return "publicPath";
  }
  const rendererDomain = rendererByCategory.get(category);
  if (rendererDomain !== undefined && head.rendererDomain !== rendererDomain) {
    return "rendererDomain";
  }

  const [
    packageRoot,
    corpus,
    articleFamily,
    sourceCategory,
    group,
    name,
    fileName,
    sourceRemainder,
  ] = head.sourcePath.split("/");
  if (
    packageRoot !== "packages" ||
    corpus !== "corpus" ||
    articleFamily !== "articles" ||
    sourceCategory !== category ||
    group === undefined ||
    !Schema.is(ArticleSlugSchema)(group) ||
    name === undefined ||
    !Schema.is(ArticleSlugSchema)(name) ||
    fileName === undefined ||
    sourceRemainder !== undefined
  ) {
    return "sourcePath";
  }
  if (fileName !== `${head.artifactLocale}.mdx`) {
    return "artifactLocale";
  }
  if (`${group}-${name}` !== slug) {
    return "sourcePath";
  }
}

/** Validates family ownership and strict ordering before diffing one head. */
function validatePublishedHead(
  state: HeadOrderState,
  head: ArticleHead,
  ownerByHead: ReadonlyMap<string, ArticleHeadOwner>,
  rendererByCategory: ReadonlyMap<string, RendererDomain>
): Effect.Effect<
  readonly [HeadOrderState, readonly ArticleHead[]],
  ArticleHeadDuplicateError | ArticleHeadFamilyError | ArticleHeadOrderError
> {
  const field = mismatchedFamilyField(head, ownerByHead, rendererByCategory);
  if (field !== undefined) {
    return Effect.fail(
      new ArticleHeadFamilyError({
        artifactLocale: head.artifactLocale,
        contentKey: head.contentKey,
        field,
      })
    );
  }

  const { previous } = state;
  if (previous !== undefined) {
    const comparison = compareContentHeads(previous, head);
    if (comparison === 0) {
      return Effect.fail(
        new ArticleHeadDuplicateError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
    if (comparison > 0) {
      return Effect.fail(
        new ArticleHeadOrderError({
          artifactLocale: head.artifactLocale,
          contentKey: head.contentKey,
        })
      );
    }
  }
  return Effect.succeed(Tuple.make({ previous: head }, [head]));
}

/** Proves every published article head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<ArticleHead, E, R>,
  ownerByHead: ReadonlyMap<string, ArticleHeadOwner>,
  rendererByCategory: ReadonlyMap<string, RendererDomain>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(
    Stream.mapAccumEffect(
      () => initial,
      (state, head) =>
        validatePublishedHead(state, head, ownerByHead, rendererByCategory)
    )
  );
}

/**
 * Plans one family-local article delta from exact Git sources and active heads.
 * Global signed-base verification belongs to whole-catalog composition.
 */
export const prepareArticlePublication: <E, R>(
  input: ArticlePublicationInput<E, R>
) => Effect.Effect<
  ArticlePublication,
  PrepareArticlePublicationError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareArticlePublication")(function* <E, R>(
  input: ArticlePublicationInput<E, R>
) {
  const rendererManifest = yield* validateRenderer(input.rendererManifest);
  const entries = yield* decodeArticleRegistry().pipe(
    Effect.mapError(mapArticleSourceError(input.checkoutRoot))
  );
  const rendererByCategory = new Map<string, RendererDomain>();
  const ownerByHead = new Map<string, ArticleHeadOwner>();
  for (const entry of entries) {
    rendererByCategory.set(entry.route.category, entry.rendererDomain);
    ownerByHead.set(headOwnerKey(entry.route), {
      publicPath: entry.route.publicPath,
    });
  }
  const plans = planArticlePublication({
    checkoutRoot: input.checkoutRoot,
    entries,
    published: validatePublishedHeads(
      input.published,
      ownerByHead,
      rendererByCategory
    ),
    rendererManifest,
    scope: input.scope,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-article-",
    schema: ArticlePublicationPlanSchema,
    stream: plans,
  });
  /** Replays canonical article transitions from the sealed spool. */
  const records = spool.replay.pipe(
    Stream.filterMap((plan) =>
      Result.fromNullishOr(plan.record, constUndefined)
    )
  );
  /** Replays the complete canonical article catalog from the sealed spool. */
  const result = spool.replay.pipe(
    Stream.filterMap((plan) =>
      Result.fromNullishOr(plan.result, constUndefined)
    )
  );
  /** Replays public-route changes derived from article transitions. */
  const routes = records.pipe(Stream.map(routeTransitionForContent));
  return { records, result, routes };
});
