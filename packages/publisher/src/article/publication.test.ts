import { ArticleHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  collectArticleRoutes,
  publishedArticleHeads,
  rejectArticlePublication,
} from "#test/article";

const publishedHeads = await publishedArticleHeads();
const contentKey = "articles/politics/dynastic-politics-asian-values";
const [englishHead, indonesianHead] = await Effect.runPromise(
  Effect.gen(function* () {
    const english = publishedHeads.find(
      (head) => head.contentKey === contentKey && head.locale === "en"
    );
    const indonesian = publishedHeads.find(
      (head) => head.contentKey === contentKey && head.locale === "id"
    );
    if (!(english && indonesian)) {
      return yield* Effect.dieMessage("Expected both real article locales.");
    }
    return [english, indonesian] as const;
  })
);
const familyCases = [
  ["contentKey", { ...englishHead, contentKey: "material/lesson/test" }],
  [
    "publicPath",
    { ...englishHead, publicPath: "articles/politics/other-article" },
  ],
  ["rendererDomain", { ...englishHead, rendererDomain: "mathematics" }],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath: "packages/corpus/material/lesson/test/en.mdx",
    },
  ],
  [
    "locale",
    {
      ...englishHead,
      sourcePath:
        "packages/corpus/articles/politics/dynastic-politics/asian-values/id.mdx",
    },
  ],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath: "packages/corpus/articles/politics/flat/en.mdx",
    },
  ],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath: "packages/corpus/articles/politics/other/article/en.mdx",
    },
  ],
] as const;

/** Decodes a modified article head without bypassing the wire contract. */
function modifyHead(input: unknown) {
  return Schema.decodeUnknownSync(ArticleHeadSchema)(input, {
    onExcessProperty: "error",
  });
}

describe("article publication", () => {
  it("removes the route owned by one deleted published article", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "articles/politics/zz-removed-article",
      publicPath: "articles/politics/zz-removed-article",
      sourcePath: "packages/corpus/articles/politics/zz-removed/article/en.mdx",
    });
    const routes = await collectArticleRoutes({
      heads: [...publishedHeads, stale],
    });

    expect(routes).toEqual([
      {
        current: stale,
        next: {
          contentKey: stale.contentKey,
          locale: stale.locale,
        },
      },
    ]);
  });

  it("rejects duplicate and noncanonical published heads as typed failures", async () => {
    await expect(
      rejectArticlePublication([englishHead, englishHead])
    ).resolves.toMatchObject({
      _tag: "ArticleHeadDuplicateError",
    });
    await expect(
      rejectArticlePublication([indonesianHead, englishHead])
    ).resolves.toMatchObject({ _tag: "ArticleHeadOrderError" });
  });

  it.each(familyCases)(
    "rejects an article-head %s contradiction",
    async (field, head) => {
      await expect(
        rejectArticlePublication([modifyHead(head)])
      ).resolves.toMatchObject({
        _tag: "ArticleHeadFamilyError",
        field,
      });
    }
  );
});
