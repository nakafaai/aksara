import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
  type ArticleSourceInput,
  defineArticleSource,
} from "#corpus/articles/schema";

/** Builds one real-shaped source so tests vary one contract field at a time. */
function source(values: Partial<ArticleSourceInput> = {}): ArticleSourceInput {
  return {
    category: "politics",
    references: [
      {
        authors: "Reviewed Author",
        title: "Reviewed Source",
        year: 2024,
      },
    ],
    rendererDomain: "politics",
    slug: "reviewed-article",
    sourceRoot: "articles/politics/reviewed/article",
    ...values,
  };
}

describe("article source", () => {
  it("decodes exact article identity and reviewed references", async () => {
    await expect(
      Effect.runPromise(defineArticleSource(source()))
    ).resolves.toEqual(source());
  });

  it("accepts a generic test category with its source-owned renderer", async () => {
    const generic = source({
      category: "test-category",
      rendererDomain: "physics",
      slug: "test-group-test-article",
      sourceRoot: "articles/test-category/test-group/test-article",
    });

    await expect(
      Effect.runPromise(defineArticleSource(generic))
    ).resolves.toEqual(generic);
  });

  it("maps one malformed source root to a typed source failure", async () => {
    const root = await Effect.runPromise(
      defineArticleSource(
        source({ sourceRoot: "articles/politics/flat" })
      ).pipe(Effect.flip)
    );

    expect(root).toMatchObject({
      _tag: "ArticleSourceError",
      sourceRoot: "articles/politics/flat",
    });
    expect(String(root.cause)).toContain("Invalid article source root.");
  });

  it.each([
    "materials/politics/reviewed/article",
    "articles/Politics/reviewed/article",
  ])("rejects an invalid source-root grammar: %s", async (sourceRoot) => {
    const error = await Effect.runPromise(
      defineArticleSource(source({ sourceRoot })).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "ArticleSourceError",
      sourceRoot,
    });
    expect(String(error.cause)).toContain("Invalid article source root.");
  });

  it("rejects a physical source root that flattens to another slug", async () => {
    const identity = await Effect.runPromise(
      defineArticleSource(source({ slug: "different-article" })).pipe(
        Effect.flip
      )
    );

    expect(identity).toMatchObject({
      _tag: "ArticleSourceError",
      sourceRoot: "articles/politics/reviewed/article",
    });
    expect(String(identity.cause)).toContain(
      "Expected the pair-grouped article source root to flatten to its slug."
    );
  });
});
