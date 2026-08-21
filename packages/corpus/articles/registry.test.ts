import { globSync } from "node:fs";
import { resolve } from "node:path";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { decodeArticlePreviewEntry } from "#corpus/articles/preview";
import { decodeArticleRegistry } from "#corpus/articles/registry";
import { articleSource } from "#corpus/test/article";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const embeddedAppLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
  AppLocaleSchema.make("id"),
]);

/** Decodes injected sources for one explicit publication locale subset. */
function decodeEmbeddedRegistry(input: unknown) {
  return decodeArticleRegistry(input, embeddedAppLocales);
}

/** Returns one typed registry failure at the Vitest runner boundary. */
function rejectRegistry(input: unknown) {
  return Effect.runPromise(decodeEmbeddedRegistry(input).pipe(Effect.flip));
}

describe("article registry", () => {
  it("projects exactly twenty-one real locale bodies with flattened routes", async () => {
    const entries = await Effect.runPromise(decodeArticleRegistry());
    const authoredPaths = globSync("packages/corpus/articles/**/*.mdx", {
      cwd: corpusRoot,
    })
      .filter((sourcePath) =>
        ACTIVE_APP_LOCALES.some((locale) =>
          sourcePath.endsWith(`/${locale}.mdx`)
        )
      )
      .sort();

    expect(entries).toHaveLength(21);
    expect(
      entries.filter(({ route }) => route.appLocale === "en")
    ).toHaveLength(7);
    expect(
      entries.filter(({ route }) => route.appLocale === "id")
    ).toHaveLength(7);
    expect(
      entries.filter(({ route }) => route.appLocale === "de")
    ).toHaveLength(7);
    expect(entries.map(({ sourcePath }) => sourcePath).sort()).toEqual(
      authoredPaths
    );
    expect(entries.find(({ route }) => route.appLocale === "en")).toMatchObject(
      {
        delivery: "public",
        rendererDomain: "politics",
      }
    );

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
  });

  it("derives both locales from one pair-grouped source", async () => {
    const entries = await Effect.runPromise(
      decodeEmbeddedRegistry([articleSource()])
    );

    expect(entries.map(({ route }) => route.appLocale)).toEqual(["en", "id"]);
    expect(new Set(entries.map(({ route }) => route.contentKey)).size).toBe(1);
    expect(entries.map(({ route }) => route.publicPath)).toEqual([
      "articles/politics/dynastic-politics-asian-values",
      "articles/politik/politik-dinasti-dan-nilai-asia",
    ]);
    expect(entries.every(({ references }) => references.length === 1)).toBe(
      true
    );
  });

  it("projects German metadata from the same source-owned locale maps", async () => {
    const entries = await Effect.runPromise(
      decodeArticleRegistry(
        [articleSource()],
        ActiveAppLocaleListSchema.make([AppLocaleSchema.make("de")])
      )
    );

    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      categoryTitle: "Politik",
      route: {
        appLocale: "de",
        publicPath: "articles/politik/dynastische-politik-und-asiatische-werte",
      },
    });
  });

  it("expands a second test category with its source-owned renderer", async () => {
    const entries = await Effect.runPromise(
      decodeEmbeddedRegistry([
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
      ])
    );
    const testEntries = entries.filter(
      ({ route }) => route.category === "test-category"
    );

    expect(testEntries).toHaveLength(2);
    expect(
      testEntries.every(({ rendererDomain }) => rendererDomain === "physics")
    ).toBe(true);
    expect(testEntries.map(({ categoryTitle }) => categoryTitle)).toEqual([
      "Test category",
      "Kategori uji",
    ]);
  });

  it("maps malformed catalogs and invalid projected paths to typed failures", async () => {
    const malformed = await rejectRegistry(null);
    const invalidSource = {
      ...articleSource(),
      slug: `${"a".repeat(300)}-${"b".repeat(300)}`,
      sourceRoot: `articles/politics/${"a".repeat(300)}/${"b".repeat(300)}`,
    };
    const [invalidPath, invalidPreview] = await Promise.all([
      rejectRegistry([invalidSource]),
      Effect.runPromise(
        decodeArticlePreviewEntry(
          CorpusSourcePathSchema.make(
            `packages/corpus/${invalidSource.sourceRoot}/en.mdx`
          ),
          [invalidSource]
        ).pipe(Effect.flip)
      ),
    ]);

    expect(malformed._tag).toBe("ArticleCatalogError");
    expect(invalidPath._tag).toBe("ArticleRegistryError");
    expect(invalidPreview._tag).toBe("ArticleRegistryError");
  });

  it("rejects duplicate canonical slugs across distinct pair groupings", async () => {
    const duplicateSlug = await rejectRegistry([
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
  });

  it("rejects conflicting renderers within one category", async () => {
    const error = await rejectRegistry([
      articleSource(),
      {
        ...articleSource(),
        category: {
          ...articleSource().category,
          rendererDomain: "physics",
        },
        slug: "second-test-article",
        sourceRoot: "articles/politics/second-test/article",
      },
    ]);

    expect(error).toMatchObject({
      _tag: "ArticleRendererError",
      actual: "physics",
      category: "politics",
      expected: "politics",
    });
  });

  it("rejects conflicting localized titles within one category", async () => {
    const error = await rejectRegistry([
      articleSource(),
      {
        ...articleSource(),
        category: {
          ...articleSource().category,
          titles: { en: "Politics changed", id: "Politik" },
        },
        slug: "second-test-article",
        sourceRoot: "articles/politics/second-test/article",
      },
    ]);

    expect(error).toMatchObject({
      _tag: "ArticleTitleError",
      actual: "Politics changed",
      appLocale: "en",
      category: "politics",
      expected: "Politics",
    });
  });

  it("rejects conflicting localized category routes", async () => {
    const error = await rejectRegistry([
      articleSource(),
      {
        ...articleSource(),
        category: {
          ...articleSource().category,
          routeSlugs: { en: "government", id: "politik" },
        },
        routeSlugs: { en: "second-article", id: "artikel-kedua" },
        slug: "second-test-article",
        sourceRoot: "articles/politics/second-test/article",
      },
    ]);

    expect(error).toMatchObject({
      _tag: "ArticleCategoryRouteError",
      actual: "government",
      appLocale: "en",
      category: "politics",
      expected: "politics",
    });
  });

  it("rejects locale route collisions across stable article identities", async () => {
    const active = await rejectRegistry([
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
      conflictingContentKey: "articles/politics/dynastic-politics-asian-values",
      contentKey: "articles/politics/second-test-article",
      publicPath: "articles/politics/dynastic-politics-asian-values",
    });
  });

  it("allows an empty source catalog without inventing entries", async () => {
    await expect(
      Effect.runPromise(decodeEmbeddedRegistry([]))
    ).resolves.toEqual([]);
  });
});
