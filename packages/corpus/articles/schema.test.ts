import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  type ArticleSourceInput,
  defineArticleSource,
} from "#corpus/articles/schema";

/** Builds one real-shaped source so tests vary one contract field at a time. */
function source(values: Partial<ArticleSourceInput> = {}): ArticleSourceInput {
  return {
    category: {
      key: "politics",
      rendererDomain: "politics",
      routeSlugs: { de: "politik", en: "politics", id: "politics" },
      titles: { de: "Politik", en: "Politics", id: "Politik" },
    },
    references: [
      {
        authors: "Reviewed Author",
        title: "Reviewed Source",
        year: 2024,
      },
    ],
    routeSlugs: {
      de: "gepruefter-artikel",
      en: "reviewed-article",
      id: "reviewed-article",
    },
    slug: "reviewed-article",
    sourceRoot: "articles/politics/reviewed/article",
    ...values,
  };
}

describe("article source", () => {
  it.effect("decodes exact article identity and reviewed references", () =>
    Effect.gen(function* () {
      expect(yield* defineArticleSource(source())).toEqual(source());
    })
  );

  it.effect(
    "accepts a generic test category with its source-owned renderer",
    () =>
      Effect.gen(function* () {
        const generic = source({
          category: {
            key: "test-category",
            rendererDomain: "physics",
            routeSlugs: {
              de: "test-kategorie",
              en: "test-category",
              id: "kategori-uji",
            },
            titles: {
              de: "Testkategorie",
              en: "Test category",
              id: "Kategori uji",
            },
          },
          slug: "test-group-test-article",
          sourceRoot: "articles/test-category/test-group/test-article",
        });

        expect(yield* defineArticleSource(generic)).toEqual(generic);
      })
  );

  it.effect("maps one malformed source root to a typed source failure", () =>
    Effect.gen(function* () {
      const root = yield* defineArticleSource(
        source({ sourceRoot: "articles/politics/flat" })
      ).pipe(Effect.flip);

      expect(root).toMatchObject({
        _tag: "ArticleSourceError",
        sourceRoot: "articles/politics/flat",
      });
      expect(String(root.cause)).toContain("Invalid article source root.");
    })
  );

  it.effect("requires a non-empty display title for every present locale", () =>
    Effect.gen(function* () {
      const error = yield* defineArticleSource(
        source({
          category: {
            key: "politics",
            rendererDomain: "politics",
            routeSlugs: {
              de: "politik",
              en: "politics",
              id: "politics",
            },
            titles: { de: "Politik", en: "Politics", id: "" },
          },
        })
      ).pipe(Effect.flip);

      expect(error).toMatchObject({ _tag: "ArticleSourceError" });
    })
  );

  it.effect.each([
    "materials/politics/reviewed/article",
    "articles/Politics/reviewed/article",
  ])("rejects an invalid source-root grammar: %s", (sourceRoot) =>
    Effect.gen(function* () {
      const error = yield* defineArticleSource(source({ sourceRoot })).pipe(
        Effect.flip
      );

      expect(error).toMatchObject({
        _tag: "ArticleSourceError",
        sourceRoot,
      });
      expect(String(error.cause)).toContain("Invalid article source root.");
    })
  );

  it.effect(
    "rejects a physical source root that flattens to another slug",
    () =>
      Effect.gen(function* () {
        const identity = yield* defineArticleSource(
          source({ slug: "different-article" })
        ).pipe(Effect.flip);

        expect(identity).toMatchObject({
          _tag: "ArticleSourceError",
          sourceRoot: "articles/politics/reviewed/article",
        });
        expect(String(identity.cause)).toContain(
          "Expected the pair-grouped article source root to flatten to its slug."
        );
      })
  );
});
