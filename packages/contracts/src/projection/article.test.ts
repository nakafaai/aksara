import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
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

const route = Schema.decodeSync(ArticleRouteSchema)({
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
const metadata = Schema.decodeSync(ArticleMetadataSchema)({
  authors: [{ name: "Test Author" }],
  dateModified: "2024-03-01",
  datePublished: "2024-02-29",
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

  it("rejects legacy, ambiguous, or incomplete projection date shapes", () => {
    const decode = Schema.decodeUnknownExit(ArticleProjectionSchema);
    const base = { authors: [], title: "Migration" };
    for (const invalid of [
      base,
      { ...base, date: "2024-01-01" },
      { ...base, date: "2024-01-01", datePublished: "2024-01-01" },
      { ...base, date: undefined },
      {
        ...base,
        dateModified: undefined,
        datePublished: "2024-01-01",
      },
    ]) {
      expect(Exit.isFailure(decode({ ...projection, metadata: invalid }))).toBe(
        true
      );
    }
  });

  it("accepts a second test category through the generic route contract", () => {
    const genericRoute = Schema.decodeSync(ArticleRouteSchema)({
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
      Exit.isFailure(Schema.decodeExit(ArticleCategorySchema)("Test_Category"))
    ).toBe(true);
  });

  it("supports a German route without changing stable article identity", () => {
    const german = Schema.decodeSync(ArticleRouteSchema)({
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
      Exit.isFailure(Schema.decodeExit(ArticleRouteSlugSchema)("geprüft"))
    ).toBe(true);
  });

  it("omits absent optional metadata and reference fields", () => {
    const minimal = makeArticleProjection({
      categoryTitle: "Politics",
      metadata: {
        authors: [],
        datePublished: "2024-01-01",
        title: "Minimal",
      },
      official: false,
      references: [{ authors: "Test Author", title: "Reference", year: 2024 }],
      route,
    });

    const canonical = canonicalizeArticleProjection(minimal);
    expect(canonical).not.toContain("description");
    expect(canonical).not.toContain("dateModified");
    expect(canonical).not.toContain("citation");
    expect(canonical).not.toContain("details");
    expect(canonical).not.toContain("publication");
    expect(canonical).not.toContain('"url":');
  });

  it("accepts an absent modification date and rejects explicit undefined", () => {
    const absent = Schema.decodeExit(ArticleMetadataSchema)({
      authors: [],
      datePublished: "2024-01-01",
      title: "Published",
    });
    const explicitUndefined = Schema.decodeUnknownExit(ArticleMetadataSchema)({
      authors: [],
      dateModified: undefined,
      datePublished: "2024-01-01",
      title: "Undefined",
    });

    expect(Exit.isSuccess(absent)).toBe(true);
    expect(Exit.isFailure(explicitUndefined)).toBe(true);
  });

  it("rejects route identities that contradict the category or slug", () => {
    const result = Schema.decodeExit(ArticleRouteSchema)({
      ...route,
      publicPath: "articles/politics/another-article",
    });

    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(
        "Expected stable article identity and locale-owned public route"
      );
    }
  });

  it("rejects route and projection artifact locale drift", () => {
    const routeResult = Schema.decodeExit(ArticleRouteSchema)({
      ...route,
      artifactLocale: "id",
    });
    const projectionResult = Schema.decodeExit(ArticleProjectionSchema)({
      ...projection,
      artifactLocale: "id",
    });

    expect(
      Exit.isFailure(routeResult) ? String(routeResult.cause) : ""
    ).toContain("Expected public article route and artifact locales to match.");
    expect(
      Exit.isFailure(projectionResult) ? String(projectionResult.cause) : ""
    ).toContain("Expected public article route and artifact locales to match.");
  });

  it("rejects graph identities that contradict the signed source route", () => {
    const result = Schema.decodeExit(ArticleRouteSchema)({
      ...route,
      graph: articleGraph("en", "politics", "another-article"),
    });

    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain(
        "Expected article graph identities"
      );
    }
  });

  it("rejects unrelated parent routes and impossible publication dates", () => {
    const parent = Schema.decodeExit(ArticleProjectionSchema)({
      ...projection,
      parentPath: "articles/another",
    });
    const datePublished = Schema.decodeExit(ArticleProjectionSchema)({
      ...projection,
      metadata: { ...metadata, datePublished: "2026-02-30" },
    });

    expect(Exit.isFailure(parent)).toBe(true);
    expect(Exit.isFailure(datePublished)).toBe(true);
    if (Exit.isFailure(parent)) {
      expect(String(parent.cause)).toContain(
        "Expected the article parent path"
      );
    }
  });

  it("rejects the legacy date field and non-later modification dates", () => {
    const legacy = Schema.decodeUnknownExit(ArticleMetadataSchema)({
      authors: [],
      date: "2024-01-01",
      title: "Legacy",
    });
    const equal = Schema.decodeExit(ArticleMetadataSchema)({
      authors: [],
      dateModified: "2024-01-01",
      datePublished: "2024-01-01",
      title: "Equal",
    });
    const earlier = Schema.decodeExit(ArticleMetadataSchema)({
      authors: [],
      dateModified: "2023-12-31",
      datePublished: "2024-01-01",
      title: "Earlier",
    });

    expect([legacy, equal, earlier].every(Exit.isFailure)).toBe(true);
    if (Exit.isFailure(equal)) {
      expect(String(equal.cause)).toContain(
        "Expected dateModified to be later than datePublished."
      );
    }
  });
});
