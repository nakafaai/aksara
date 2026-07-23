import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ArticleMetadataSchema,
  ArticleProjectionSchema,
  ArticleRouteSchema,
  canonicalizeArticleProjection,
  makeArticleProjection,
} from "#contracts/projection/article";
import { articleGraph } from "#contracts/test/graph";

const route = Schema.decodeUnknownSync(ArticleRouteSchema)({
  articleSlug: "reviewed-article",
  category: "politics",
  contentKey: "articles/politics/reviewed-article",
  graph: articleGraph("en", "politics", "reviewed-article"),
  locale: "en",
  publicPath: "articles/politics/reviewed-article",
});
const metadata = Schema.decodeUnknownSync(ArticleMetadataSchema)({
  authors: [{ name: "Test Author" }],
  date: "2024-02-29",
  description: "Protocol-only article metadata.",
  title: "Protocol Article",
});
const projection = makeArticleProjection({
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

  it("omits absent optional metadata and reference fields", () => {
    const minimal = makeArticleProjection({
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
        "Expected article identity and public path"
      );
    }
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
