import { describe, expect, it } from "@effect/vitest";
import { ArticleHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Effect, Schema } from "effect";
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
      (head) => head.contentKey === contentKey && head.artifactLocale === "en"
    );
    const indonesian = publishedHeads.find(
      (head) => head.contentKey === contentKey && head.artifactLocale === "id"
    );
    if (!(english && indonesian)) {
      return yield* Effect.die(
        new Error("Expected both real article locales.")
      );
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
  ["publicPath", { ...englishHead, publicPath: "articles/politics" }],
  ["publicPath", { ...englishHead, publicPath: undefined }],
  ["rendererDomain", { ...englishHead, rendererDomain: "mathematics" }],
  [
    "sourcePath",
    {
      ...englishHead,
      sourcePath: "packages/corpus/material/lesson/test/en.mdx",
    },
  ],
  [
    "artifactLocale",
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
  it("removes a deleted category without requiring its former registry entry", async () => {
    const stale = modifyHead({
      ...englishHead,
      contentKey: "articles/retired-test/removed-article",
      publicPath: "articles/retired-test/removed-article",
      rendererDomain: "physics",
      sourcePath:
        "packages/corpus/articles/retired-test/removed/article/en.mdx",
    });
    const routes = await collectArticleRoutes({
      heads: [...publishedHeads, stale],
    });

    expect(routes).toEqual([
      {
        current: {
          appLocale: stale.artifactLocale,
          contentKey: stale.contentKey,
          publicPath: stale.publicPath,
        },
        next: {
          appLocale: stale.artifactLocale,
          contentKey: stale.contentKey,
        },
      },
    ]);
  });

  it("accepts the registry-owned localized public path", async () => {
    expect(englishHead.publicPath).toBe(
      "articles/politics/dynastic-politics-asian-values"
    );
    expect(indonesianHead.publicPath).toBe(
      "articles/politics/dynastic-politics-asian-values"
    );
    await expect(
      rejectArticlePublication([
        modifyHead({
          ...indonesianHead,
          publicPath: "articles/politik/politik-dinasti-dan-nilai-asia",
        }),
      ])
    ).resolves.toMatchObject({
      _tag: "ArticleHeadFamilyError",
      field: "publicPath",
    });
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
