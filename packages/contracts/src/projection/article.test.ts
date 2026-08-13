import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ArticleCategorySchema,
  ArticleMetadataSchema,
  ArticleProjectionSchema,
  ArticleRouteSchema,
  ArticleRouteSlugSchema,
  canonicalizeArticleProjection,
  makeArticleProjection,
} from "#contracts/projection/article";
import { articleGraph } from "#contracts/test/graph";

const route = Schema.decodeUnknownSync(ArticleRouteSchema)({
  appLocale: "en",
  articleRouteSlug: "reviewed-article",
  articleSlug: "reviewed-article",
  artifactLocale: "en",
  category: "politics",
  categoryRouteSlug: "politics",
  contentKey: "articles/politics/reviewed-article",
  graph: articleGraph("en", "politics", "reviewed-article"),
  publicPath: "articles/politics/reviewed-article",
});
const metadata = Schema.decodeUnknownSync(ArticleMetadataSchema)({
  authors: [{ name: "Test Author" }],
  date: "2024-02-29",
  description: "Protocol-only article metadata.",
  title: "Protocol Article",
});
const projection = makeArticleProjection({
  categoryTitle: "Politics",
  metadata,
  official: true,
  references: [
    {
      authors: "Test Author",
      citation: "Test Author (2024)",
      details: "Reviewed details",
      publication: "Test Journal",
      title: "Reviewed Reference",
      url: "https://example.com/reference",
      year: 2024,
    },
  ],
  route,
});

describe("article projection", () => {
  it("canonicalizes exact route, metadata, and reference fields", () => {
    expect(JSON.parse(canonicalizeArticleProjection(projection))).toEqual(
      projection
    );
  });

  it("accepts a second test category through the generic route contract", () => {
    const genericRoute = Schema.decodeUnknownSync(ArticleRouteSchema)({
      appLocale: "en",
      articleRouteSlug: "test-article",
      articleSlug: "test-group-test-article",
      artifactLocale: "en",
      category: "test-category",
      categoryRouteSlug: "test-category",
      contentKey: "articles/test-category/test-group-test-article",
      graph: articleGraph("en", "test-category", "test-group-test-article"),
      publicPath: "articles/test-category/test-article",
    });

    expect(genericRoute.category).toBe("test-category");
  });

  it("rejects article categories outside the stable kebab grammar", () => {
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ArticleCategorySchema)("Test_Category")
      )
    ).toBe(true);
  });

  it("supports a German route without changing stable article identity", () => {
    const german = Schema.decodeUnknownSync(ArticleRouteSchema)({
      ...route,
      appLocale: "de",
      articleRouteSlug: "gepruefter-artikel",
      artifactLocale: "de",
      categoryRouteSlug: "politik",
      graph: articleGraph("de", "politics", "reviewed-article"),
      publicPath: "articles/politik/gepruefter-artikel",
    });

    expect(german.contentKey).toBe(route.contentKey);
    expect(german.publicPath).not.toBe(route.publicPath);
  });

  it("rejects non-ASCII and non-kebab localized route segments", () => {
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ArticleRouteSlugSchema)("geprüft")
      )
    ).toBe(true);
  });

  it("omits absent optional metadata and reference fields", () => {
    const minimal = makeArticleProjection({
      categoryTitle: "Politics",
      metadata: { authors: [], date: "2024-01-01", title: "Minimal" },
      official: false,
      references: [{ authors: "Test Author", title: "Reference", year: 2024 }],
      route,
    });

    const canonical = canonicalizeArticleProjection(minimal);
    expect(canonical).not.toContain("description");
    expect(canonical).not.toContain("citation");
    expect(canonical).not.toContain("details");
    expect(canonical).not.toContain("publication");
    expect(canonical).not.toContain('"url":');
  });

  it("rejects route identities that contradict the category or slug", () => {
    const result = Schema.decodeUnknownEither(ArticleRouteSchema)({
      ...route,
      publicPath: "articles/politics/another-article",
    });

    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected stable article identity and locale-owned public route"
      );
    }
  });

  it("rejects route and projection artifact locale drift", () => {
    const routeResult = Schema.decodeUnknownEither(ArticleRouteSchema)({
      ...route,
      artifactLocale: "id",
    });
    const projectionResult = Schema.decodeUnknownEither(
      ArticleProjectionSchema
    )({ ...projection, artifactLocale: "id" });

    expect(
      Either.isLeft(routeResult) ? String(routeResult.left) : ""
    ).toContain("Expected public article route and artifact locales to match.");
    expect(
      Either.isLeft(projectionResult) ? String(projectionResult.left) : ""
    ).toContain("Expected public article route and artifact locales to match.");
  });

  it("rejects graph identities that contradict the signed source route", () => {
    const result = Schema.decodeUnknownEither(ArticleRouteSchema)({
      ...route,
      graph: articleGraph("en", "politics", "another-article"),
    });

    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain(
        "Expected article graph identities"
      );
    }
  });

  it("rejects unrelated parent routes and impossible dates", () => {
    const parent = Schema.decodeUnknownEither(ArticleProjectionSchema)({
      ...projection,
      parentPath: "articles/another",
    });
    const date = Schema.decodeUnknownEither(ArticleProjectionSchema)({
      ...projection,
      metadata: { ...projection.metadata, date: "2026-02-30" },
    });

    expect(Either.isLeft(parent)).toBe(true);
    expect(Either.isLeft(date)).toBe(true);
    if (Either.isLeft(parent)) {
      expect(String(parent.left)).toContain("Expected the article parent path");
    }
  });
});
