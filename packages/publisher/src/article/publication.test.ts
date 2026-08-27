import { expect, layer } from "@effect/vitest";
import { ArticleHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Schema } from "effect";
import {
  articleTestLayer,
  collectArticleRoutes,
  publishedArticleHeads,
  rejectArticlePublication,
} from "#test/article";

const contentKey = "articles/politics/dynastic-politics-asian-values";
const familyCases = [
  ["contentKey", { contentKey: "material/lesson/test" }],
  ["publicPath", { publicPath: "articles/politics/other-article" }],
  ["publicPath", { publicPath: "articles/politics" }],
  ["publicPath", { publicPath: undefined }],
  ["rendererDomain", { rendererDomain: "mathematics" }],
  ["sourcePath", { sourcePath: "packages/corpus/material/lesson/test/en.mdx" }],
  [
    "artifactLocale",
    {
      sourcePath:
        "packages/corpus/articles/politics/dynastic-politics/asian-values/id.mdx",
    },
  ],
  [
    "sourcePath",
    { sourcePath: "packages/corpus/articles/politics/flat/en.mdx" },
  ],
  [
    "sourcePath",
    {
      sourcePath: "packages/corpus/articles/politics/other/article/en.mdx",
    },
  ],
] as const;

/** Decodes a modified article head without bypassing the wire contract. */
const modifyHead = Effect.fn("ArticlePublicationTest.modifyHead")(
  (input: unknown) =>
    Schema.decodeUnknownEffect(ArticleHeadSchema)(input, {
      onExcessProperty: "error",
    })
);

/** Loads both real locale heads once for the complete publication suite. */
const makePublicationTestFixtures = Effect.fn(
  "ArticlePublicationTest.makeFixtures"
)(() =>
  Effect.gen(function* () {
    const publishedHeads = yield* publishedArticleHeads();
    const englishHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        (head) => head.contentKey === contentKey && head.artifactLocale === "en"
      )
    );
    const indonesianHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        (head) => head.contentKey === contentKey && head.artifactLocale === "id"
      )
    );

    return { englishHead, indonesianHead, publishedHeads };
  })
);

class ArticlePublicationTestFixtures extends Context.Service<
  ArticlePublicationTestFixtures,
  Effect.Success<ReturnType<typeof makePublicationTestFixtures>>
>()("AksaraPublisherArticlePublicationTestFixtures") {}

const publicationFixtureLayer = Layer.effect(
  ArticlePublicationTestFixtures,
  makePublicationTestFixtures()
).pipe(Layer.provide(articleTestLayer));
const publicationTestLayer = Layer.merge(
  articleTestLayer,
  publicationFixtureLayer
);

layer(publicationTestLayer)("article publication", (it) => {
  it.effect(
    "removes a deleted category without requiring its former registry entry",
    () =>
      Effect.gen(function* () {
        const fixture = yield* ArticlePublicationTestFixtures;
        const stale = yield* modifyHead({
          ...fixture.englishHead,
          contentKey: "articles/retired-test/removed-article",
          publicPath: "articles/retired-test/removed-article",
          rendererDomain: "physics",
          sourcePath:
            "packages/corpus/articles/retired-test/removed/article/en.mdx",
        });
        const routes = yield* collectArticleRoutes({
          heads: [...fixture.publishedHeads, stale],
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
      })
  );

  it.effect("accepts the registry-owned localized public path", () =>
    Effect.gen(function* () {
      const fixture = yield* ArticlePublicationTestFixtures;
      expect(fixture.englishHead.publicPath).toBe(
        "articles/politics/dynastic-politics-asian-values"
      );
      expect(fixture.indonesianHead.publicPath).toBe(
        "articles/politics/dynastic-politics-asian-values"
      );
      const localized = yield* modifyHead({
        ...fixture.indonesianHead,
        publicPath: "articles/politik/politik-dinasti-dan-nilai-asia",
      });
      const error = yield* rejectArticlePublication([localized]);

      expect(error).toMatchObject({
        _tag: "ArticleHeadFamilyError",
        field: "publicPath",
      });
    })
  );

  it.effect(
    "rejects duplicate and noncanonical published heads as typed failures",
    () =>
      Effect.gen(function* () {
        const { englishHead, indonesianHead } =
          yield* ArticlePublicationTestFixtures;
        const duplicate = yield* rejectArticlePublication([
          englishHead,
          englishHead,
        ]);
        const noncanonical = yield* rejectArticlePublication([
          indonesianHead,
          englishHead,
        ]);

        expect(duplicate).toMatchObject({
          _tag: "ArticleHeadDuplicateError",
        });
        expect(noncanonical).toMatchObject({ _tag: "ArticleHeadOrderError" });
      })
  );

  it.effect.each(familyCases)(
    "rejects an article-head %s contradiction",
    ([field, changes]) =>
      Effect.gen(function* () {
        const { englishHead } = yield* ArticlePublicationTestFixtures;
        const head = yield* modifyHead({ ...englishHead, ...changes });
        const error = yield* rejectArticlePublication([head]);

        expect(error).toMatchObject({
          _tag: "ArticleHeadFamilyError",
          field,
        });
      })
  );
});
