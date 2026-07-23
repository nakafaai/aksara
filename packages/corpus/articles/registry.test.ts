import { globSync } from "node:fs";
import { resolve } from "node:path";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeArticleRegistry } from "#corpus/articles/registry";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

/** Builds one reviewed source so failure tests vary only one identity. */
function articleSource() {
  return {
    category: "politics",
    references: [
      {
        authors: "Reviewed Author",
        title: "Reviewed Reference",
        year: 2024,
      },
    ],
    slug: "dynastic-politics-asian-values",
    sourceRoot: "articles/politics/dynastic-politics/asian-values",
  };
}

/** Returns one typed registry failure at the Vitest runner boundary. */
function rejectRegistry(input: unknown) {
  return Effect.runPromise(decodeArticleRegistry(input).pipe(Effect.flip));
}

describe("article registry", () => {
  it("projects exactly fourteen real locale bodies with flattened routes", async () => {
    const entries = await Effect.runPromise(decodeArticleRegistry());
    const authoredPaths = globSync("packages/corpus/articles/**/*.mdx", {
      cwd: corpusRoot,
    }).sort();

    expect(entries).toHaveLength(14);
    expect(entries.filter(({ route }) => route.locale === "en")).toHaveLength(
      7
    );
    expect(entries.filter(({ route }) => route.locale === "id")).toHaveLength(
      7
    );
    expect(entries.map(({ sourcePath }) => sourcePath).sort()).toEqual(
      authoredPaths
    );
    expect(entries.find(({ route }) => route.locale === "en")).toMatchObject({
      delivery: "public",
      rendererDomain: "politics",
    });

    const english = entries.find(
      ({ route }) =>
        route.contentKey ===
          "articles/politics/dynastic-politics-asian-values" &&
        route.locale === "en"
    );
    expect(english).toMatchObject({
      route: {
        articleSlug: "dynastic-politics-asian-values",
        category: "politics",
        publicPath: "articles/politics/dynastic-politics-asian-values",
      },
      sourcePath:
        "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx",
    });
  });

  it("derives both locales from one pair-grouped source", async () => {
    const entries = await Effect.runPromise(
      decodeArticleRegistry([articleSource()])
    );

    expect(entries.map(({ route }) => route.locale)).toEqual(["en", "id"]);
    expect(new Set(entries.map(({ route }) => route.contentKey)).size).toBe(1);
    expect(entries.every(({ references }) => references.length === 1)).toBe(
      true
    );
  });

  it("maps malformed catalogs and invalid projected paths to typed failures", async () => {
    const malformed = await rejectRegistry(null);
    const group = "a".repeat(300);
    const name = "b".repeat(300);
    const invalidPath = await rejectRegistry([
      {
        ...articleSource(),
        slug: `${group}-${name}`,
        sourceRoot: `articles/politics/${group}/${name}`,
      },
    ]);

    expect(malformed._tag).toBe("ArticleCatalogError");
    expect(invalidPath._tag).toBe("ArticleRegistryError");
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

  it("allows an empty source catalog without inventing entries", async () => {
    await expect(Effect.runPromise(decodeArticleRegistry([]))).resolves.toEqual(
      []
    );
  });
});
