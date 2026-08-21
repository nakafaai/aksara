import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

import {
  ArticleEntrySchema,
  ArticleRegistryError,
  projectArticle,
  validateArticleRoutes,
  validateArticleSources,
} from "#corpus/articles/registry";
import { decodeArticleSources } from "#corpus/articles/source";
import { appLocaleCode } from "#corpus/locale/source";

/** Projects every selected body from its source-owned locale metadata. */
export const decodeArticlePreviewEntries = Effect.fn(
  "AksaraCorpus.decodeArticlePreviewEntries"
)(function* (
  sourcePaths: readonly (typeof CorpusSourcePathSchema.Type)[],
  input?: unknown
) {
  const selected = new Set(sourcePaths);
  const sources = yield* decodeArticleSources(input);
  yield* validateArticleSources(sources);
  const projected: unknown[] = [];
  for (const source of sources) {
    for (const appLocale of ACTIVE_APP_LOCALES) {
      const expectedPath = CorpusSourcePathSchema.make(
        `packages/corpus/${source.sourceRoot}/${appLocaleCode(appLocale)}.mdx`
      );
      if (!selected.has(expectedPath)) {
        continue;
      }
      projected.push(yield* projectArticle(source, appLocale));
    }
  }
  const entries = yield* Schema.decodeUnknownEffect(
    Schema.Array(ArticleEntrySchema)
  )(projected, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ArticleRegistryError({ cause }))
  );
  return yield* validateArticleRoutes(entries);
});

/** Resolves one selected article solely for real-renderer preview. */
export const decodeArticlePreviewEntry = Effect.fn(
  "AksaraCorpus.decodeArticlePreviewEntry"
)(function* (sourcePath: typeof CorpusSourcePathSchema.Type, input?: unknown) {
  const [entry] = yield* decodeArticlePreviewEntries([sourcePath], input);
  return entry;
});
