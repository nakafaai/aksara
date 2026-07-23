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
