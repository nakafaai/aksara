import { ArticleSlugSchema } from "@nakafa/aksara-contracts/projection/article";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import {
  composeArticleLocaleSource,
  decodeArticleLocaleCatalog,
  requireArticleLocaleSource,
  validateArticleLocaleCatalog,
} from "#corpus/articles/locale";
import { decodeArticleSources } from "#corpus/articles/source";
import { articleSource, germanArticleCatalog } from "#corpus/test/article";

/** Resolves the representative active article through its real source decoder. */
async function activeArticle() {
  const [source] = await Effect.runPromise(
    decodeArticleSources([articleSource()])
  );
  if (source === undefined) {
    throw new Error("Expected one decoded article source.");
  }
  return source;
}

describe("candidate article metadata", () => {
  it("decodes strict overlays and composes exact German route ownership", async () => {
    const active = await activeArticle();
    const catalog = await Effect.runPromise(
      decodeArticleLocaleCatalog(germanArticleCatalog())
    );
    const composed = await Effect.runPromise(
      requireArticleLocaleSource(active, catalog, "de")
    );

    expect(composed).toMatchObject({
      category: {
        routeSlugs: { de: "politik" },
        titles: { de: "Politik" },
      },
      overlayAppLocale: "de",
      routeSlugs: { de: "dynastische-politik-und-asiatische-werte" },
    });
    await expect(
      Effect.runPromise(decodeArticleLocaleCatalog())
    ).resolves.toMatchObject({
      articles: expect.arrayContaining([
        expect.objectContaining({ articleSlug: "kim-plus-empty-box" }),
      ]),
      categories: expect.arrayContaining([
        expect.objectContaining({ category: "politics" }),
      ]),
    });
  });

  it("fails typed for malformed, missing, duplicate, and foreign ownership", async () => {
    const active = await activeArticle();
    const valid = await Effect.runPromise(
      decodeArticleLocaleCatalog(germanArticleCatalog())
    );
    const [category] = valid.categories;
    const [article] = valid.articles;
    if (category === undefined || article === undefined) {
      throw new Error("Expected one decoded German article overlay.");
    }
    const malformed = await Effect.runPromise(
      decodeArticleLocaleCatalog(null).pipe(Effect.flip)
    );
    const missing = await Effect.runPromise(
      requireArticleLocaleSource(
        active,
        { articles: [], categories: [] },
        "de"
      ).pipe(Effect.flip)
    );
    const duplicate = await Effect.runPromise(
      requireArticleLocaleSource(
        active,
        {
          articles: [...valid.articles, ...valid.articles],
          categories: [...valid.categories, ...valid.categories],
        },
        "de"
      ).pipe(Effect.flip)
    );
    const foreign = await Effect.runPromise(
      composeArticleLocaleSource(active, category, {
        ...article,
        articleSlug: ArticleSlugSchema.make("foreign-article"),
      }).pipe(Effect.flip)
    );

    expect(malformed._tag).toBe("ArticleLocaleCatalogError");
    expect([missing, duplicate, foreign]).toEqual([
      expect.objectContaining({ _tag: "ArticleLocaleOwnershipError" }),
      expect.objectContaining({ _tag: "ArticleLocaleOwnershipError" }),
      expect.objectContaining({ _tag: "ArticleLocaleOwnershipError" }),
    ]);
  });

  it("rejects duplicate and orphan rows across the complete locale catalog", async () => {
    const active = await activeArticle();
    const catalog = await Effect.runPromise(
      decodeArticleLocaleCatalog(germanArticleCatalog())
    );
    const [article] = catalog.articles;
    const [category] = catalog.categories;
    if (article === undefined || category === undefined) {
      throw new Error("Expected one German article overlay pair.");
    }
    const duplicate = await Effect.runPromise(
      validateArticleLocaleCatalog([active], {
        ...catalog,
        categories: [...catalog.categories, ...catalog.categories],
      }).pipe(Effect.flip)
    );
    const orphan = await Effect.runPromise(
      validateArticleLocaleCatalog([active], {
        ...catalog,
        articles: [
          {
            ...article,
            articleSlug: ArticleSlugSchema.make("unowned-article"),
          },
        ],
      }).pipe(Effect.flip)
    );
    const orphanCategory = await Effect.runPromise(
      validateArticleLocaleCatalog([], {
        articles: [],
        categories: [category],
      }).pipe(Effect.flip)
    );
    const duplicateArticle = await Effect.runPromise(
      validateArticleLocaleCatalog([active], {
        articles: [article, article],
        categories: [category],
      }).pipe(Effect.flip)
    );

    expect(duplicate).toMatchObject({
      _tag: "ArticleLocaleCatalogOwnershipError",
      reason: "duplicate",
      scope: "category",
    });
    expect(orphan).toMatchObject({
      _tag: "ArticleLocaleCatalogOwnershipError",
      reason: "orphan",
      scope: "article",
    });
    expect(orphanCategory).toMatchObject({
      reason: "orphan",
      scope: "category",
    });
    expect(duplicateArticle).toMatchObject({
      reason: "duplicate",
      scope: "article",
    });
  });
});
