import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  canonicalizeContentHead,
  HeadPageRequestSchema,
  HeadPageSchema,
  PageHeadSchema,
} from "#contracts/release/head";
import { articleHead, materialHead, pageHead } from "#contracts/test/head";
import { JsonTextSchema } from "#contracts/text/json";
import { MAX_HEAD_PAGE_COUNT } from "#contracts/transport/limits";

const manifestHash = `sha256:${"b".repeat(64)}`;
const releaseId = "test-active";
const decodeJson = Schema.decodeSync(JsonTextSchema);

/** Strictly checks one schema without accepting unknown wire fields. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("content head pages", () => {
  it("pins the canonical bytes of every head, each with its route", () => {
    const routed = materialHead("test:routed");

    expect(decodeJson(canonicalizeContentHead(routed))).toEqual(routed);
    const article = articleHead("articles/politics/test");
    expect(decodeJson(canonicalizeContentHead(article))).toEqual(article);
    const page = pageHead("pages/privacy-policy");
    expect(decodeJson(canonicalizeContentHead(page))).toEqual(page);
    expect(canonicalizeContentHead(routed)).toBe(
      '{"artifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","artifactLocale":"en","compilerConfigHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","contentKey":"test:routed","delivery":"public","family":"material","projectionHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","publicPath":"subjects/test/test-routed","rendererDomain":"mathematics","sourceHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","sourcePath":"packages/corpus/test/test-routed/en.mdx"}'
    );
  });

  it("accepts bounded requests and canonical terminal pages", () => {
    const request = {
      activeManifestHash: manifestHash,
      activeReleaseId: releaseId,
      cursor: null,
      limit: 1,
    };
    for (const family of ["article", "material", "page"]) {
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
        family: "page",
        heads: [pageHead("pages/privacy-policy")],
      })
    ).toBe(true);
    expect(
      accepts(HeadPageSchema, {
        ...base,
        family: "page",
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
    const unordered = Schema.decodeExit(HeadPageSchema)({
      ...base,
      family: "article",
      heads: [
        articleHead("articles/politics/z"),
        articleHead("articles/politics/a"),
      ],
    });
    expect(Exit.isFailure(unordered)).toBe(true);
    expect(Exit.isFailure(unordered) ? String(unordered.cause) : "").toContain(
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
    const error = Schema.decodeUnknownExit(HeadPageSchema)({
      ...page,
      heads: [materialHead("test:b"), materialHead("test:a")],
    });
    expect(Exit.isFailure(error) ? String(error.cause) : "").toContain(
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

  it("requires a public route on every head", () => {
    const { publicPath: _publicPath, ...withoutRoute } = pageHead(
      "pages/privacy-policy"
    );

    expect(
      Exit.isFailure(Schema.decodeUnknownExit(PageHeadSchema)(withoutRoute))
    ).toBe(true);
  });
});
