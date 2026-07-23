import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ArticleHeadSchema,
  canonicalizeContentHead,
  HeadPageRequestSchema,
  HeadPageSchema,
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "#contracts/release/head";
import { MAX_HEAD_PAGE_COUNT } from "#contracts/transport/limits";

const hash = `sha256:${"a".repeat(64)}`;
const manifestHash = `sha256:${"b".repeat(64)}`;
const releaseId = "test-active";

/** Builds one strict material-head sample at a deterministic identity. */
function materialHead(contentKey: string, locale: "en" | "id" = "en") {
  return Schema.decodeUnknownSync(MaterialHeadSchema)({
    artifactHash: hash,
    compilerConfigHash: hash,
    contentKey,
    delivery: "public",
    family: "material",
    locale,
    projectionHash: hash,
    publicPath: `subjects/test/${contentKey.replace(":", "-")}`,
    rendererDomain: "mathematics",
    sourceHash: hash,
    sourcePath: `packages/corpus/test/${contentKey.replace(":", "-")}/${locale}.mdx`,
  });
}

/** Builds one strict article-head sample at a deterministic identity. */
function articleHead(contentKey: string, locale: "en" | "id" = "en") {
  return Schema.decodeUnknownSync(ArticleHeadSchema)({
    artifactHash: hash,
    compilerConfigHash: hash,
    contentKey,
    delivery: "public",
    family: "article",
    locale,
    projectionHash: hash,
    publicPath: contentKey,
    rendererDomain: "politics",
    sourceHash: hash,
    sourcePath: `packages/corpus/${contentKey}/${locale}.mdx`,
  });
}

/** Builds one strict route-free question-head sample. */
function questionHead(contentKey: string, locale: "en" | "id" = "en") {
  return Schema.decodeUnknownSync(QuestionHeadSchema)({
    artifactHash: hash,
    compilerConfigHash: hash,
    contentKey,
    delivery: "authenticated",
    family: "question",
    locale,
    projectionHash: hash,
    rendererDomain: "snbt-general",
    sourceHash: hash,
    sourcePath: `packages/corpus/${contentKey}/${locale}.mdx`,
  });
}

/** Strictly checks one schema without accepting unknown wire fields. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("content head pages", () => {
  it("canonically serializes routed and route-free heads", () => {
    const routed = materialHead("test:routed");
    const routeFree = Schema.decodeUnknownSync(MaterialHeadSchema)({
      ...routed,
      publicPath: undefined,
    });

    expect(JSON.parse(canonicalizeContentHead(routed))).toEqual(routed);
    expect(JSON.parse(canonicalizeContentHead(routeFree))).toEqual(routeFree);
    const article = articleHead("articles/politics/test");
    expect(JSON.parse(canonicalizeContentHead(article))).toEqual(article);
    const question = questionHead("question-bank/test/question");
    expect(JSON.parse(canonicalizeContentHead(question))).toEqual(question);
  });

  it("accepts bounded requests and canonical terminal pages", () => {
    const request = {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      limit: 1,
    };
    for (const family of ["article", "material", "question"]) {
      expect(accepts(HeadPageRequestSchema, { ...request, family })).toBe(true);
    }
    expect(
      accepts(HeadPageRequestSchema, {
        ...request,
        family: "material",
        limit: MAX_HEAD_PAGE_COUNT,
      })
    ).toBe(true);
    expect(
      accepts(HeadPageSchema, {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: "page-one",
        done: true,
        family: "material",
        heads: [materialHead("test:a"), materialHead("test:a", "id")],
        nextCursor: null,
      })
    ).toBe(true);
  });

  it("accepts non-terminal pages only with real cursor progress", () => {
    expect(
      accepts(HeadPageSchema, {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: null,
        done: false,
        family: "material",
        heads: [materialHead("test:a")],
        nextCursor: "page-two",
      })
    ).toBe(true);
    expect(
      accepts(HeadPageSchema, {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: "page-one",
        done: false,
        family: "material",
        heads: [],
        nextCursor: "page-two",
      })
    ).toBe(true);
  });

  it("rejects invalid request scope, cursors, and limits", () => {
    const valid = {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      family: "material",
      limit: 1,
    };
    for (const request of [
      { ...valid, cursor: " " },
      { ...valid, limit: 0 },
      { ...valid, limit: MAX_HEAD_PAGE_COUNT + 1 },
      {
        activeReleaseId: releaseId,
        cursor: null,
        family: "material",
        limit: 1,
      },
    ]) {
      expect(accepts(HeadPageRequestSchema, request)).toBe(false);
    }
  });

  it("keeps each page correlated to its requested family", () => {
    const base = {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      done: true,
      nextCursor: null,
    };
    expect(
      accepts(HeadPageSchema, {
        ...base,
        family: "article",
        heads: [articleHead("articles/politics/test")],
      })
    ).toBe(true);
    expect(
      accepts(HeadPageSchema, {
        ...base,
        family: "article",
        heads: [materialHead("test:a")],
      })
    ).toBe(false);
    expect(
      accepts(HeadPageSchema, {
        ...base,
        family: "question",
        heads: [questionHead("question-bank/test/question")],
      })
    ).toBe(true);
    expect(
      accepts(HeadPageSchema, {
        ...base,
        family: "question",
        heads: [articleHead("articles/politics/test")],
      })
    ).toBe(false);
    expect(
      accepts(HeadPageSchema, {
        ...base,
        family: "material",
        heads: [articleHead("articles/politics/test")],
      })
    ).toBe(false);
    const unordered = Schema.decodeUnknownEither(HeadPageSchema)({
      ...base,
      family: "article",
      heads: [
        articleHead("articles/politics/z"),
        articleHead("articles/politics/a"),
      ],
    });
    expect(Either.isLeft(unordered)).toBe(true);
    expect(Either.isLeft(unordered) ? String(unordered.left) : "").toContain(
      "Expected canonical article heads with coherent cursor progress."
    );
  });

  it("rejects unordered, duplicate, and oversized head inventories", () => {
    const page = {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      done: true,
      family: "material",
      nextCursor: null,
    };
    expect(
      accepts(HeadPageSchema, {
        ...page,
        heads: [materialHead("test:b"), materialHead("test:a")],
      })
    ).toBe(false);
    const error = Schema.decodeUnknownEither(HeadPageSchema)({
      ...page,
      heads: [materialHead("test:b"), materialHead("test:a")],
    });
    expect(Either.isLeft(error) ? String(error.left) : "").toContain(
      "Expected canonical material heads with coherent cursor progress."
    );
    expect(
      accepts(HeadPageSchema, {
        ...page,
        heads: [materialHead("test:a"), materialHead("test:a")],
      })
    ).toBe(false);
    expect(
      accepts(HeadPageSchema, {
        ...page,
        heads: Array.from({ length: MAX_HEAD_PAGE_COUNT + 1 }, (_, index) =>
          materialHead(`test:${index.toString().padStart(3, "0")}`)
        ),
      })
    ).toBe(false);
  });

  it("rejects terminal and progressing cursor contradictions", () => {
    const page = {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: "page-one",
      family: "material",
      heads: [materialHead("test:a")],
    };
    for (const contradiction of [
      { ...page, done: true, nextCursor: "page-two" },
      { ...page, done: false, nextCursor: null },
      { ...page, done: false, nextCursor: "page-one" },
    ]) {
      expect(accepts(HeadPageSchema, contradiction)).toBe(false);
    }
  });

  it("rejects public routes on question heads", () => {
    const routeError = Schema.decodeUnknownEither(QuestionHeadSchema)({
      ...questionHead("question-bank/test/question"),
      publicPath: "questions/test",
    });
    expect(Either.isLeft(routeError) ? String(routeError.left) : "").toContain(
      "Expected question heads to remain route-free."
    );
    const pageError = Schema.decodeUnknownEither(HeadPageSchema)({
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      done: false,
      family: "question",
      heads: [],
      nextCursor: null,
    });
    expect(Either.isLeft(pageError) ? String(pageError.left) : "").toContain(
      "Expected canonical question heads with coherent cursor progress."
    );
  });
});
