import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeMaterialHead,
  HeadPageRequestSchema,
  HeadPageSchema,
  MaterialHeadSchema,
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
    locale,
    projectionHash: hash,
    publicPath: `subjects/test/${contentKey.replace(":", "-")}`,
    rendererDomain: "mathematics",
    sourceHash: hash,
    sourcePath: `packages/corpus/test/${contentKey.replace(":", "-")}/${locale}.mdx`,
  });
}

/** Strictly checks one schema without accepting unknown wire fields. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("material head pages", () => {
  it("canonically serializes routed and route-free heads", () => {
    const routed = materialHead("test:routed");
    const routeFree = Schema.decodeUnknownSync(MaterialHeadSchema)({
      ...routed,
      publicPath: undefined,
    });

    expect(JSON.parse(canonicalizeMaterialHead(routed))).toEqual(routed);
    expect(JSON.parse(canonicalizeMaterialHead(routeFree))).toEqual(routeFree);
  });

  it("accepts bounded requests and canonical terminal pages", () => {
    expect(
      accepts(HeadPageRequestSchema, {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: null,
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
    for (const request of [
      {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: null,
        family: "article",
        limit: 1,
      },
      {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: " ",
        family: "material",
        limit: 1,
      },
      {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: null,
        family: "material",
        limit: 0,
      },
      {
        activeManifestHash: manifestHash,
        activeReleaseId: releaseId,
        cursor: null,
        family: "material",
        limit: MAX_HEAD_PAGE_COUNT + 1,
      },
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
});
