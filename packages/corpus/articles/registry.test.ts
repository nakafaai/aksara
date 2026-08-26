import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, FileSystem } from "effect";
import { decodeArticlePreviewEntry } from "#corpus/articles/preview";
import { decodeArticleRegistry } from "#corpus/articles/registry";
import { articleSource } from "#corpus/test/article";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const englishIndonesianLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
  AppLocaleSchema.make("id"),
]);

/** Decodes injected sources for one explicit publication locale subset. */
function decodeEmbeddedRegistry(input: unknown) {
  return decodeArticleRegistry(input, englishIndonesianLocales);
}

/** Returns one typed registry failure for native Effect test composition. */
function rejectRegistry(input: unknown) {
  return decodeEmbeddedRegistry(input).pipe(Effect.flip);
}

/** Builds a distinct article whose category varies one conflict at a time. */
function articleWithCategory(
  category: Partial<ReturnType<typeof articleSource>["category"]>
) {
  const input = articleSource();
  return {
    ...input,
    category: { ...input.category, ...category },
    slug: "second-test-article",
    sourceRoot: "articles/politics/second-test/article",
  };
}

layer(NodeServices.layer)("article registry", (it) => {
  it.effect(
    "projects exactly twenty-one real locale bodies with flattened routes",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const entries = yield* decodeArticleRegistry();
        const authoredPaths = (yield* fileSystem.glob(
          "packages/corpus/articles/**/*.mdx",
          {
            root: corpusRoot,
          }
        ))
          .filter((sourcePath) =>
            ACTIVE_APP_LOCALES.some((locale) =>
              sourcePath.endsWith(`/${locale}.mdx`)
            )
          )
          .sort();

        expect(entries).toHaveLength(21);
        for (const locale of ACTIVE_APP_LOCALES) {
          expect(
            entries.filter(({ route }) => route.appLocale === locale)
          ).toHaveLength(7);
        }
        expect(entries.map(({ sourcePath }) => sourcePath).sort()).toEqual(
          authoredPaths
        );
        expect(
          entries.find(({ route }) => route.appLocale === "en")
        ).toMatchObject({
          delivery: "public",
          rendererDomain: "politics",
        });

        const english = entries.find(
          ({ route }) =>
            route.contentKey ===
              "articles/politics/dynastic-politics-asian-values" &&
            route.appLocale === "en"
        );
        expect(english).toMatchObject({
          route: {
            articleSlug: "dynastic-politics-asian-values",
            category: "politics",
            publicPath: "articles/politics/dynastic-politics-asian-values",
          },
          sourcePath:
            "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx",
          sourceRoot: "articles/politics/dynastic-politics/asian-values",
        });
      })
  );

  it.effect("derives both locales from one pair-grouped source", () =>
    Effect.gen(function* () {
      const entries = yield* decodeEmbeddedRegistry([articleSource()]);

      expect(entries.map(({ route }) => route.appLocale)).toEqual(["en", "id"]);
      expect(new Set(entries.map(({ route }) => route.contentKey)).size).toBe(
        1
      );
      expect(entries.map(({ route }) => route.publicPath)).toEqual([
        "articles/politics/dynastic-politics-asian-values",
        "articles/politik/politik-dinasti-dan-nilai-asia",
      ]);
      expect(entries.every(({ references }) => references.length === 1)).toBe(
        true
      );
    })
  );

  it.effect(
    "projects German metadata from the same source-owned locale maps",
    () =>
      Effect.gen(function* () {
        const entries = yield* decodeArticleRegistry(
          [articleSource()],
          ActiveAppLocaleListSchema.make([AppLocaleSchema.make("de")])
        );

        expect(entries).toHaveLength(1);
        expect(entries[0]).toMatchObject({
          categoryTitle: "Politik",
          route: {
            appLocale: "de",
            publicPath:
              "articles/politik/dynastische-politik-und-asiatische-werte",
          },
        });
      })
  );

  it.effect(
    "expands a second test category with its source-owned renderer",
    () =>
      Effect.gen(function* () {
        const entries = yield* decodeEmbeddedRegistry([
          articleSource(),
          {
            ...articleSource(),
            category: {
              key: "test-category",
              rendererDomain: "physics",
              routeSlugs: { en: "test-category", id: "kategori-uji" },
              titles: { en: "Test category", id: "Kategori uji" },
            },
            routeSlugs: { en: "test-article", id: "artikel-uji" },
            slug: "test-group-test-article",
            sourceRoot: "articles/test-category/test-group/test-article",
          },
        ]);
        const testEntries = entries.filter(
          ({ route }) => route.category === "test-category"
        );

        expect(testEntries).toHaveLength(2);
        expect(
          testEntries.every(
            ({ rendererDomain }) => rendererDomain === "physics"
          )
        ).toBe(true);
        expect(testEntries.map(({ categoryTitle }) => categoryTitle)).toEqual([
          "Test category",
          "Kategori uji",
        ]);
      })
  );

  it.effect(
    "maps malformed catalogs and invalid projected paths to typed failures",
    () =>
      Effect.gen(function* () {
        const malformed = yield* rejectRegistry(null);
        const invalidSource = {
          ...articleSource(),
          slug: `${"a".repeat(300)}-${"b".repeat(300)}`,
          sourceRoot: `articles/politics/${"a".repeat(300)}/${"b".repeat(300)}`,
        };
        const [invalidPath, invalidPreview] = yield* Effect.all([
          rejectRegistry([invalidSource]),
          decodeArticlePreviewEntry(
            CorpusSourcePathSchema.make(
              `packages/corpus/${invalidSource.sourceRoot}/en.mdx`
            ),
            [invalidSource]
          ).pipe(Effect.flip),
        ]);

        expect(malformed._tag).toBe("ArticleCatalogError");
        expect(invalidPath._tag).toBe("ArticleRegistryError");
        expect(invalidPreview._tag).toBe("ArticleRegistryError");
      })
  );

  it.effect(
    "rejects duplicate canonical slugs across distinct pair groupings",
    () =>
      Effect.gen(function* () {
        const duplicateSlug = yield* rejectRegistry([
          articleSource(),
          {
            ...articleSource(),
            sourceRoot: "articles/politics/dynastic/politics-asian-values",
          },
        ]);

        expect(duplicateSlug).toMatchObject({
          _tag: "ArticleSlugError",
          slug: "dynastic-politics-asian-values",
        });
      })
  );

  it.effect("rejects conflicting renderers within one category", () =>
    Effect.gen(function* () {
      const error = yield* rejectRegistry([
        articleSource(),
        articleWithCategory({ rendererDomain: "physics" }),
      ]);

      expect(error).toMatchObject({
        _tag: "ArticleRendererError",
        actual: "physics",
        category: "politics",
        expected: "politics",
      });
    })
  );

  it.effect("rejects conflicting localized titles within one category", () =>
    Effect.gen(function* () {
      const error = yield* rejectRegistry([
        articleSource(),
        articleWithCategory({
          titles: { de: "Politik", en: "Politics changed", id: "Politik" },
        }),
      ]);

      expect(error).toMatchObject({
        _tag: "ArticleTitleError",
        actual: "Politics changed",
        appLocale: "en",
        category: "politics",
        expected: "Politics",
      });
    })
  );

  it.effect("rejects conflicting localized category routes", () =>
    Effect.gen(function* () {
      const error = yield* rejectRegistry([
        articleSource(),
        articleWithCategory({
          routeSlugs: { de: "politik", en: "government", id: "politik" },
        }),
      ]);

      expect(error).toMatchObject({
        _tag: "ArticleCategoryRouteError",
        actual: "government",
        appLocale: "en",
        category: "politics",
        expected: "politics",
      });
    })
  );

  it.effect(
    "rejects locale route collisions across stable article identities",
    () =>
      Effect.gen(function* () {
        const active = yield* rejectRegistry([
          articleSource(),
          {
            ...articleSource(),
            routeSlugs: articleSource().routeSlugs,
            slug: "second-test-article",
            sourceRoot: "articles/politics/second-test/article",
          },
        ]);
        expect(active).toMatchObject({
          _tag: "ArticleRouteCollisionError",
          appLocale: "en",
          conflictingContentKey:
            "articles/politics/dynastic-politics-asian-values",
          contentKey: "articles/politics/second-test-article",
          publicPath: "articles/politics/dynastic-politics-asian-values",
        });
      })
  );

  it.effect("allows an empty source catalog without inventing entries", () =>
    Effect.gen(function* () {
      expect(yield* decodeEmbeddedRegistry([])).toEqual([]);
    })
  );
});
