import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  type AppLocale,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  PageKeySchema,
  PublicPageRouteSchema,
} from "@nakafa/aksara-contracts/projection/page";
import { Effect, Schema } from "effect";
import { appLocaleCode, requireSourceLocale } from "#corpus/locale/source";
import { PageRootSchema, type PageSource } from "#corpus/pages/schema";
import { decodePageSources } from "#corpus/pages/source";

export const PageEntrySchema = Schema.Struct({
  delivery: Schema.Literal("public"),
  rendererDomain: Schema.Literal("site"),
  route: PublicPageRouteSchema,
  sourcePath: CorpusSourcePathSchema,
  sourceRoot: PageRootSchema,
});
export type PageEntry = typeof PageEntrySchema.Type;

/** A decoded public page catalog repeats one stable page identity. */
export class PageKeyDuplicateError extends Schema.TaggedError<PageKeyDuplicateError>()(
  "PageKeyDuplicateError",
  { pageKey: PageKeySchema }
) {}

/** Two stable page identities resolve to the same authored source root. */
export class PageRootDuplicateError extends Schema.TaggedError<PageRootDuplicateError>()(
  "PageRootDuplicateError",
  { sourceRoot: PageRootSchema }
) {}

/** Two stable page identities project to the same locale-owned public path. */
export class PageRouteCollisionError extends Schema.TaggedError<PageRouteCollisionError>()(
  "PageRouteCollisionError",
  {
    appLocale: AppLocaleSchema,
    conflictingContentKey: ContentKeySchema,
    contentKey: ContentKeySchema,
    publicPath: PublicPathSchema,
  }
) {}

/** A projected public page registry failed strict entry decoding. */
export class PageRegistryError extends Schema.TaggedError<PageRegistryError>()(
  "PageRegistryError",
  { cause: Schema.Unknown }
) {}

/** Projects one reviewed source into one exact locale-specific public page. */
export const projectPage = Effect.fn("AksaraCorpus.projectPage")(function* (
  source: PageSource,
  appLocale: AppLocale
) {
  const localeCode = appLocaleCode(appLocale);
  const publicPath = yield* requireSourceLocale(
    source.publicPaths,
    appLocale,
    `${source.sourceRoot}:${localeCode}`
  );
  return {
    delivery: "public",
    rendererDomain: "site",
    route: {
      appLocale,
      artifactLocale: appLocale,
      contentKey: `pages/${source.pageKey}`,
      pageKey: source.pageKey,
      publicPath,
    },
    sourcePath: `packages/corpus/${source.sourceRoot}/${localeCode}.mdx`,
    sourceRoot: source.sourceRoot,
  };
});

/** Expands one reviewed source into its active locale-specific page bodies. */
const expandPage = Effect.fn("AksaraCorpus.expandPage")(function* (
  source: PageSource,
  appLocales: ActiveAppLocaleList
) {
  return yield* Effect.forEach(appLocales, (appLocale) =>
    projectPage(source, appLocale)
  );
});

/** Rejects duplicate stable identities and authored roots before projection. */
export const validatePageSources = Effect.fn(
  "AksaraCorpus.validatePageSources"
)(function* (sources: readonly PageSource[]) {
  const pageKeys = new Set<string>();
  const sourceRoots = new Set<string>();
  for (const source of sources) {
    if (pageKeys.has(source.pageKey)) {
      return yield* new PageKeyDuplicateError({ pageKey: source.pageKey });
    }
    if (sourceRoots.has(source.sourceRoot)) {
      return yield* new PageRootDuplicateError({
        sourceRoot: source.sourceRoot,
      });
    }
    pageKeys.add(source.pageKey);
    sourceRoots.add(source.sourceRoot);
  }
  return sources;
});

/** Rejects locale route collisions across distinct stable page identities. */
export const validatePageRoutes = Effect.fn("AksaraCorpus.validatePageRoutes")(
  function* (entries: readonly PageEntry[]) {
    const contentKeyByRoute = new Map<
      string,
      PageEntry["route"]["contentKey"]
    >();
    for (const { route } of entries) {
      const identity = `${route.appLocale}\0${route.publicPath}`;
      const existing = contentKeyByRoute.get(identity);
      if (existing !== undefined && existing !== route.contentKey) {
        return yield* new PageRouteCollisionError({
          appLocale: route.appLocale,
          conflictingContentKey: existing,
          contentKey: route.contentKey,
          publicPath: route.publicPath,
        });
      }
      contentKeyByRoute.set(identity, route.contentKey);
    }
    return entries;
  }
);

/** Returns every canonical locale body from the reviewed public page catalog. */
export const decodePageRegistry = Effect.fn("AksaraCorpus.decodePageRegistry")(
  function* (
    input?: unknown,
    appLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
  ) {
    const sources = yield* decodePageSources(input);
    yield* validatePageSources(sources);
    const expanded = yield* Effect.forEach(sources, (source) =>
      expandPage(source, appLocales)
    );
    const entries = yield* Schema.decodeUnknownEffect(
      Schema.Array(PageEntrySchema)
    )(expanded.flat(), { onExcessProperty: "error" }).pipe(
      Effect.mapError((cause) => new PageRegistryError({ cause }))
    );
    yield* validatePageRoutes(entries);
    return [...entries].sort((left, right) =>
      compareContentHeads(left.route, right.route)
    );
  }
);
