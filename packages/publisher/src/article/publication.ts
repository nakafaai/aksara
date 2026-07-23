import type { FileSystem, Path } from "@effect/platform";
import type { CompileContentError } from "@nakafa/aksara-compiler/compile";
import type { ContentSourceInspectionError } from "@nakafa/aksara-compiler/inspect";
import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import type { ArticleHead } from "@nakafa/aksara-contracts/release/head";
import type { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { validateRendererManifestHash as validateRenderer } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { Effect, Option, Schema, type Scope, Stream, Tuple } from "effect";
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

const ArticleFamilyFieldSchema = Schema.Literal(
  "contentKey",
  "locale",
  "publicPath",
  "rendererDomain",
  "sourcePath"
);

/** A target returned the same article identity more than once. */
export class ArticleHeadDuplicateError extends Schema.TaggedError<ArticleHeadDuplicateError>()(
  "ArticleHeadDuplicateError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** A target returned article heads outside canonical content-head order. */
export class ArticleHeadOrderError extends Schema.TaggedError<ArticleHeadOrderError>()(
  "ArticleHeadOrderError",
  { contentKey: ContentKeySchema, locale: ContentLocaleSchema }
) {}

/** An article-head page contained a route or source owned by another family. */
export class ArticleHeadFamilyError extends Schema.TaggedError<ArticleHeadFamilyError>()(
  "ArticleHeadFamilyError",
  {
    contentKey: ContentKeySchema,
    field: ArticleFamilyFieldSchema,
    locale: ContentLocaleSchema,
  }
) {}

interface HeadOrderState {
  readonly previous: ArticleHead | undefined;
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
  readonly records: () => Stream.Stream<
    PreparedContentTransition,
    ReplaySpoolError
  >;
  /** Replays the complete desired article head catalog in canonical order. */
  readonly result: () => Stream.Stream<ArticleHead, ReplaySpoolError>;
  /** Replays route ownership independently from article body transitions. */
  readonly routes: () => Stream.Stream<RouteTransition, ReplaySpoolError>;
}

/** Fresh-CI inputs pinned to one checkout, renderer, and article-head stream. */
export interface ArticlePublicationInput<E, R> {
  readonly checkoutRoot: string;
  readonly published: Stream.Stream<ArticleHead, E, R>;
  readonly rendererManifest: unknown;
}

type RendererManifestError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;

/** Every failure possible before the replayable article plan is constructed. */
export type PrepareArticlePublicationError<E> =
  | E
  | ArticlePublicationStreamError<never>
  | ReplaySpoolError
  | RendererManifestError;

/** Finds the first field proving a head does not own its article source. */
function mismatchedFamilyField(
  head: ArticleHead
): typeof ArticleFamilyFieldSchema.Type | undefined {
  const keyPrefix = "articles/politics/";
  if (!head.contentKey.startsWith(keyPrefix)) {
    return "contentKey";
  }
  if (String(head.publicPath) !== String(head.contentKey)) {
    return "publicPath";
  }
  if (head.rendererDomain !== "politics") {
    return "rendererDomain";
  }

  const sourcePrefix = "packages/corpus/articles/politics/";
  const sourceSuffix = `/${head.locale}.mdx`;
  if (!head.sourcePath.startsWith(sourcePrefix)) {
    return "sourcePath";
  }
  if (!head.sourcePath.endsWith(sourceSuffix)) {
    return "locale";
  }
  const slug = head.contentKey.slice(keyPrefix.length);
  const sourceRoot = head.sourcePath.slice(
    sourcePrefix.length,
    -sourceSuffix.length
  );
  const segments = sourceRoot.split("/");
  if (segments.length !== 2 || segments.join("-") !== slug) {
    return "sourcePath";
  }
}

/** Validates family ownership and strict ordering before diffing one head. */
function validatePublishedHead(
  state: HeadOrderState,
  head: ArticleHead
): Effect.Effect<
  readonly [HeadOrderState, ArticleHead],
  ArticleHeadDuplicateError | ArticleHeadFamilyError | ArticleHeadOrderError
> {
  const field = mismatchedFamilyField(head);
  if (field !== undefined) {
    return Effect.fail(
      new ArticleHeadFamilyError({
        contentKey: head.contentKey,
        field,
        locale: head.locale,
      })
    );
  }

  const { previous } = state;
  if (previous !== undefined) {
    const comparison = compareContentHeads(previous, head);
    if (comparison === 0) {
      return Effect.fail(
        new ArticleHeadDuplicateError({
          contentKey: head.contentKey,
          locale: head.locale,
        })
      );
    }
    if (comparison > 0) {
      return Effect.fail(
        new ArticleHeadOrderError({
          contentKey: head.contentKey,
          locale: head.locale,
        })
      );
    }
  }
  return Effect.succeed(Tuple.make({ previous: head }, head));
}

/** Proves every published article head before the constant-space merge. */
function validatePublishedHeads<E, R>(
  published: Stream.Stream<ArticleHead, E, R>
) {
  const initial: HeadOrderState = { previous: undefined };
  return published.pipe(Stream.mapAccumEffect(initial, validatePublishedHead));
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
  const plans = planArticlePublication({
    checkoutRoot: input.checkoutRoot,
    entries,
    published: validatePublishedHeads(input.published),
    rendererManifest,
  });
  const spool = yield* createReplaySpool({
    prefix: "aksara-article-",
    schema: ArticlePublicationPlanSchema,
    stream: plans,
  });
  /** Replays canonical article transitions from the sealed spool. */
  const records = () =>
    spool
      .replay()
      .pipe(Stream.filterMap((plan) => Option.fromNullable(plan.record)));
  /** Replays the complete canonical article catalog from the sealed spool. */
  const result = () =>
    spool
      .replay()
      .pipe(Stream.filterMap((plan) => Option.fromNullable(plan.result)));
  /** Replays public-route changes derived from article transitions. */
  const routes = () => records().pipe(Stream.map(routeTransitionForContent));
  return { records, result, routes };
});
