import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";

import {
  decodeArticleLocaleCatalog,
  requireArticleLocaleSource,
  validateArticleLocaleCatalog,
} from "#corpus/articles/locale";
import {
  ArticleEntrySchema,
  ArticleRegistryError,
  projectArticle,
  validateArticleRoutes,
  validateArticleSources,
} from "#corpus/articles/registry";
import { decodeArticleSources } from "#corpus/articles/source";
import {
  AUTHORING_APP_LOCALES,
  appLocaleCode,
  LOCALE_OVERLAY_APP_LOCALE_CODES,
  localeOverlayAppLocaleCode,
} from "#corpus/locale/source";

/** Projects every physically present candidate body and validates them together. */
export const decodeArticlePreviewEntries = Effect.fn(
  "AksaraCorpus.decodeArticlePreviewEntries"
)(function* (
  sourcePaths: readonly (typeof CorpusSourcePathSchema.Type)[],
  input?: unknown,
  candidateInput?: unknown
) {
  const selected = new Set(sourcePaths);
  const sources = yield* decodeArticleSources(input);
  const needsLocaleOverlays = sourcePaths.some((sourcePath) =>
    LOCALE_OVERLAY_APP_LOCALE_CODES.some((appLocale) =>
      sourcePath.endsWith(`/${appLocale}.mdx`)
    )
  );
  const localeCatalog =
    needsLocaleOverlays || candidateInput !== undefined
      ? yield* decodeArticleLocaleCatalog(candidateInput)
      : { articles: [], categories: [] };
  yield* validateArticleSources(sources);
  yield* validateArticleLocaleCatalog(sources, localeCatalog);
  const projected: unknown[] = [];
  for (const source of sources) {
    for (const appLocale of AUTHORING_APP_LOCALES) {
      const expectedPath = CorpusSourcePathSchema.make(
        `packages/corpus/${source.sourceRoot}/${appLocaleCode(appLocale)}.mdx`
      );
      if (!selected.has(expectedPath)) {
        continue;
      }
      const candidateLocale = localeOverlayAppLocaleCode(appLocale);
      const projectionSource =
        candidateLocale === undefined
          ? source
          : yield* requireArticleLocaleSource(
              source,
              localeCatalog,
              candidateLocale
            );
      projected.push(yield* projectArticle(projectionSource, appLocale));
    }
  }
  const entries = yield* Schema.decodeUnknown(Schema.Array(ArticleEntrySchema))(
    projected,
    { onExcessProperty: "error" }
  ).pipe(Effect.mapError((cause) => new ArticleRegistryError({ cause })));
  return yield* validateArticleRoutes(entries);
});

/** Resolves one active or candidate article solely for real-renderer preview. */
export const decodeArticlePreviewEntry = Effect.fn(
  "AksaraCorpus.decodeArticlePreviewEntry"
)(function* (
  sourcePath: typeof CorpusSourcePathSchema.Type,
  input?: unknown,
  candidateInput?: unknown
) {
  const [entry] = yield* decodeArticlePreviewEntries(
    [sourcePath],
    input,
    candidateInput
  );
  return entry;
});
