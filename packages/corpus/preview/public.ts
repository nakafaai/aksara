import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  ArticlePreviewDocument,
  MaterialPreviewDocument,
  PagePreviewDocument,
} from "@nakafa/aksara-contracts/preview/document";
import { Effect } from "effect";
import { decodeArticlePreviewEntry } from "#corpus/articles/preview";
import type { ArticleEntry } from "#corpus/articles/registry";
import { GERMAN_GLOSSARY_SOURCE_PATHS } from "#corpus/locale/german/glossary";
import { localeOverlayAppLocaleCode } from "#corpus/locale/source";
import { decodeMaterialPreviewEntry } from "#corpus/material/preview";
import type { MaterialEntry } from "#corpus/material/registry";
import { decodePagePreviewEntry } from "#corpus/pages/preview";
import type { PageEntry } from "#corpus/pages/registry";
import type { PreviewSelection } from "#corpus/preview/source";
import { PreviewSelectionError } from "#corpus/preview/source";
import {
  makeRestartDependencyLookup,
  type RestartDependencyLookup,
} from "#corpus/preview/topology";

const ARTICLE_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/articles/source.ts"
);
const ARTICLE_CANDIDATE_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/articles/locale.ts"
);
const ARTICLE_CANDIDATE_REGISTRY = CorpusSourcePathSchema.make(
  "packages/corpus/articles/locale-registry.ts"
);
const MATERIAL_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/material/source.ts"
);
const MATERIAL_CANDIDATE_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/material/locale.ts"
);
const MATERIAL_CANDIDATE_REGISTRY = CorpusSourcePathSchema.make(
  "packages/corpus/material/locale-registry.ts"
);
const PAGE_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/pages/source.ts"
);
const PAGE_CANDIDATE_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/pages/locale.ts"
);
const PAGE_CANDIDATE_REGISTRY = CorpusSourcePathSchema.make(
  "packages/corpus/pages/locale-registry.ts"
);
const GERMAN_GLOSSARY_OWNER = CorpusSourcePathSchema.make(
  "packages/corpus/locale/german/glossary.ts"
);
/** Returns exact selected article overlay owners without expanding the registry. */
function articleLocaleDependencies(entry: ArticleEntry) {
  const appLocale = localeOverlayAppLocaleCode(entry.route.appLocale);
  if (appLocale === undefined) {
    return [];
  }
  return [
    { mode: "restart" as const, sourcePath: ARTICLE_CANDIDATE_OWNER },
    { mode: "restart" as const, sourcePath: ARTICLE_CANDIDATE_REGISTRY },
    {
      mode: "restart" as const,
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/articles/${entry.route.category}/locale/${appLocale}.ts`
      ),
    },
    {
      mode: "restart" as const,
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/${entry.sourceRoot}/locale/${appLocale}.ts`
      ),
    },
  ];
}

/** Returns exact selected material overlay owners without expanding the registry. */
function materialLocaleDependencies(entry: MaterialEntry) {
  const appLocale = localeOverlayAppLocaleCode(entry.route.appLocale);
  if (appLocale === undefined) {
    return [];
  }
  return [
    { mode: "restart" as const, sourcePath: MATERIAL_CANDIDATE_OWNER },
    { mode: "restart" as const, sourcePath: MATERIAL_CANDIDATE_REGISTRY },
    { mode: "restart" as const, sourcePath: GERMAN_GLOSSARY_OWNER },
    ...GERMAN_GLOSSARY_SOURCE_PATHS.map((sourcePath) => ({
      mode: "restart" as const,
      sourcePath,
    })),
    {
      mode: "restart" as const,
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/${entry.assetRoot}/locale/${appLocale}.ts`
      ),
    },
  ];
}

/** Returns exact selected page overlay owners without expanding the registry. */
function pageLocaleDependencies(entry: PageEntry) {
  const appLocale = localeOverlayAppLocaleCode(entry.route.appLocale);
  if (appLocale === undefined) {
    return [];
  }
  return [
    { mode: "restart" as const, sourcePath: PAGE_CANDIDATE_OWNER },
    { mode: "restart" as const, sourcePath: PAGE_CANDIDATE_REGISTRY },
  ];
}

/** Requires one source already made unique by its canonical registry. */
const selectOne = Effect.fn("AksaraCorpus.selectPublicPreviewSource")(
  function* <Value>(value: Value | undefined, sourcePath: CorpusSourcePath) {
    if (value === undefined) {
      return yield* new PreviewSelectionError({
        reason: "missing",
        sourcePath,
      });
    }
    return value;
  }
);

/** Builds one public page selection from an already validated registry row. */
export const selectPageEntry = Effect.fn("AksaraCorpus.selectPreviewPageEntry")(
  (entry: PageEntry) => {
    const document = {
      delivery: entry.delivery,
      family: "page",
      rendererDomain: entry.rendererDomain,
      route: entry.route,
      sourcePath: entry.sourcePath,
    } satisfies PagePreviewDocument;
    return Effect.succeed({
      document,
      sources: [
        {
          dependencies: [
            { mode: "restart", sourcePath: PAGE_OWNER },
            ...pageLocaleDependencies(entry),
          ],
          directories: [],
          entry,
          family: "page",
        },
      ],
    } satisfies PreviewSelection);
  }
);

/** Builds a public page batch from already validated registry rows. */
export const selectPageEntries = Effect.fn(
  "AksaraCorpus.selectPreviewPageEntries"
)(function* (entries: readonly PageEntry[]) {
  return yield* Effect.forEach(entries, selectPageEntry, { concurrency: 8 });
});

/** Selects one public page directly from its canonical page registry. */
export const selectPage = Effect.fn("AksaraCorpus.selectPreviewPage")(
  function* (_corpusRoot: string, sourcePath: CorpusSourcePath) {
    const entry = yield* selectOne(
      yield* decodePagePreviewEntry(sourcePath),
      sourcePath
    );
    return yield* selectPageEntry(entry);
  }
);

/** Builds one article selection with an inventory-owned dependency lookup. */
const buildArticleEntry = Effect.fn("AksaraCorpus.buildPreviewArticleEntry")(
  function* (entry: ArticleEntry, dependenciesFor: RestartDependencyLookup) {
    const document = {
      delivery: entry.delivery,
      family: "article",
      rendererDomain: entry.rendererDomain,
      route: entry.route,
      sourcePath: entry.sourcePath,
    } satisfies ArticlePreviewDocument;
    const sourceModule = CorpusSourcePathSchema.make(
      `packages/corpus/${entry.sourceRoot}/source.ts`
    );
    return {
      document,
      sources: [
        {
          dependencies: [
            { mode: "restart", sourcePath: ARTICLE_OWNER },
            ...(yield* dependenciesFor(sourceModule)),
            ...articleLocaleDependencies(entry),
          ],
          directories: [],
          entry,
          family: "article",
        },
      ],
    } satisfies PreviewSelection;
  }
);

/** Builds one public article selection from an already validated registry row. */
export const selectArticleEntry = Effect.fn(
  "AksaraCorpus.selectPreviewArticleEntry"
)(function* (corpusRoot: string, entry: ArticleEntry) {
  const dependenciesFor = yield* makeRestartDependencyLookup(corpusRoot);
  return yield* buildArticleEntry(entry, dependenciesFor);
});

/** Builds a public article batch with one concurrent-safe dependency cache. */
export const selectArticleEntries = Effect.fn(
  "AksaraCorpus.selectPreviewArticleEntries"
)(function* (corpusRoot: string, entries: readonly ArticleEntry[]) {
  const dependenciesFor = yield* makeRestartDependencyLookup(corpusRoot);
  return yield* Effect.forEach(
    entries,
    (entry) => buildArticleEntry(entry, dependenciesFor),
    { concurrency: 8 }
  );
});

/** Selects one public article directly from its canonical source registry. */
export const selectArticle = Effect.fn("AksaraCorpus.selectPreviewArticle")(
  function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
    const entry = yield* selectOne(
      yield* decodeArticlePreviewEntry(sourcePath),
      sourcePath
    );
    return yield* selectArticleEntry(corpusRoot, entry);
  }
);

/** Builds one material selection with an inventory-owned dependency lookup. */
const buildMaterialEntry = Effect.fn("AksaraCorpus.buildPreviewMaterialEntry")(
  function* (entry: MaterialEntry, dependenciesFor: RestartDependencyLookup) {
    const document = {
      delivery: entry.delivery,
      family: "material",
      rendererDomain: entry.rendererDomain,
      route: entry.route,
      sourcePath: entry.sourcePath,
    } satisfies MaterialPreviewDocument;
    const sourceModule = CorpusSourcePathSchema.make(
      `packages/corpus/${entry.assetRoot}/source.ts`
    );
    return {
      document,
      sources: [
        {
          dependencies: [
            { mode: "restart", sourcePath: MATERIAL_OWNER },
            ...(yield* dependenciesFor(sourceModule)),
            ...materialLocaleDependencies(entry),
          ],
          directories: [],
          entry,
          family: "material",
        },
      ],
    } satisfies PreviewSelection;
  }
);

/** Builds one public material selection from an already validated registry row. */
export const selectMaterialEntry = Effect.fn(
  "AksaraCorpus.selectPreviewMaterialEntry"
)(function* (corpusRoot: string, entry: MaterialEntry) {
  const dependenciesFor = yield* makeRestartDependencyLookup(corpusRoot);
  return yield* buildMaterialEntry(entry, dependenciesFor);
});

/** Builds a public material batch with one concurrent-safe dependency cache. */
export const selectMaterialEntries = Effect.fn(
  "AksaraCorpus.selectPreviewMaterialEntries"
)(function* (corpusRoot: string, entries: readonly MaterialEntry[]) {
  const dependenciesFor = yield* makeRestartDependencyLookup(corpusRoot);
  return yield* Effect.forEach(
    entries,
    (entry) => buildMaterialEntry(entry, dependenciesFor),
    { concurrency: 8 }
  );
});

/** Selects one public lesson directly from its canonical material registry. */
export const selectMaterial = Effect.fn("AksaraCorpus.selectPreviewMaterial")(
  function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
    const entry = yield* selectOne(
      yield* decodeMaterialPreviewEntry(sourcePath),
      sourcePath
    );
    return yield* selectMaterialEntry(corpusRoot, entry);
  }
);
