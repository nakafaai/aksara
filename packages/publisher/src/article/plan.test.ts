import { beforeEach, expect, layer } from "@effect/vitest";
import {
  type ArticleHead,
  ArticleHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Context, Effect, Layer, Schema } from "effect";
import {
  ArticleTestFixtures,
  articleTestLayer,
  collectArticlePublication,
  publishedArticleHeads,
} from "#test/article";

const compilerState = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: unknown) => {
      compilerState.calls += 1;
      return original.compileContent(input);
    },
  };
});

const contentKey = "articles/politics/dynastic-politics-asian-values";
const fingerprintCases = [
  ["compiler config", { compilerConfigHash: `sha256:${"1".repeat(64)}` }],
  ["delivery", { delivery: "authenticated" }],
  ["projection", { projectionHash: `sha256:${"2".repeat(64)}` }],
  ["source", { sourceHash: `sha256:${"3".repeat(64)}` }],
] as const;

/** Decodes a modified article head without bypassing the wire contract. */
const modifyHead = Effect.fn("ArticlePlanTest.modifyHead")((input: unknown) =>
  Schema.decodeUnknownEffect(ArticleHeadSchema)(input, {
    onExcessProperty: "error",
  })
);

/** Replaces one canonical head while preserving complete catalog order. */
function replaceHead(
  publishedHeads: readonly ArticleHead[],
  replacement: ArticleHead
) {
  return publishedHeads.map((head) =>
    head.contentKey === replacement.contentKey &&
    head.artifactLocale === replacement.artifactLocale
      ? replacement
      : head
  );
}

/** Loads the shared publication heads before per-test compiler accounting. */
const makePlanTestFixtures = Effect.fn("ArticlePlanTest.makeFixtures")(() =>
  Effect.gen(function* () {
    const article = yield* ArticleTestFixtures;
    const publishedHeads = yield* publishedArticleHeads();
    const englishEntry = yield* Effect.fromNullishOr(
      article.entries.find(
        ({ route }) =>
          route.contentKey === contentKey && route.artifactLocale === "en"
      )
    );
    const englishHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey: key, artifactLocale }) =>
          key === englishEntry.route.contentKey && artifactLocale === "en"
      )
    );

    return { ...article, englishEntry, englishHead, publishedHeads };
  })
);

class ArticlePlanTestFixtures extends Context.Service<
  ArticlePlanTestFixtures,
  Effect.Success<ReturnType<typeof makePlanTestFixtures>>
>()("AksaraPublisherArticlePlanTestFixtures") {}

const planFixtureLayer = Layer.effect(
  ArticlePlanTestFixtures,
  makePlanTestFixtures()
).pipe(Layer.provide(articleTestLayer));
const planTestLayer = Layer.merge(articleTestLayer, planFixtureLayer);

beforeEach(() => {
  compilerState.calls = 0;
});

layer(planTestLayer)("article plan", (it) => {
  it.effect(
    "emits no records and performs no compilation for matching heads",
    () =>
      Effect.gen(function* () {
        const { publishedHeads } = yield* ArticlePlanTestFixtures;
        const records = yield* collectArticlePublication({
          heads: publishedHeads,
        });

        expect(records).toEqual([]);
        expect(compilerState.calls).toBe(0);
      })
  );

  it.effect("compiles only the real article whose source changed", () =>
    Effect.gen(function* () {
      const fixture = yield* ArticlePlanTestFixtures;
      const sources = new Map(fixture.sources);
      const absolutePath = yield* Effect.fromNullishOr(
        fixture.absolutePaths.get(fixture.englishEntry.sourcePath)
      );
      const english = yield* Effect.fromNullishOr(sources.get(absolutePath));
      sources.set(absolutePath, `${english}\n`);

      const records = yield* collectArticlePublication({
        heads: fixture.publishedHeads,
        sources,
      });

      expect(records).toHaveLength(1);
      expect(records[0]?.record.change).toMatchObject({
        artifactLocale: "en",
        operation: "upsert",
      });
      expect(compilerState.calls).toBe(1);
    })
  );

  it.effect.each(fingerprintCases)(
    "compiles only a head whose %s fingerprint changed",
    ([, changed]) =>
      Effect.gen(function* () {
        const fixture = yield* ArticlePlanTestFixtures;
        const head = yield* modifyHead({
          ...fixture.englishHead,
          ...changed,
        });
        const records = yield* collectArticlePublication({
          heads: replaceHead(fixture.publishedHeads, head),
        });

        expect(records).toHaveLength(1);
        expect(compilerState.calls).toBe(1);
      })
  );

  it.effect("emits one tombstone without compiling an absent source", () =>
    Effect.gen(function* () {
      const fixture = yield* ArticlePlanTestFixtures;
      const stale = yield* modifyHead({
        ...fixture.englishHead,
        contentKey: "articles/politics/zz-removed-article",
        publicPath: "articles/politics/zz-removed-article",
        sourcePath:
          "packages/corpus/articles/politics/zz-removed/article/en.mdx",
      });
      const records = yield* collectArticlePublication({
        heads: [...fixture.publishedHeads, stale],
      });

      expect(records).toContainEqual({
        prior: { head: stale, state: "article" },
        record: {
          change: {
            artifactLocale: "en",
            contentKey: stale.contentKey,
            family: "article",
            operation: "delete",
          },
        },
      });
      expect(compilerState.calls).toBe(0);
    })
  );

  it.effect("compiles every canonical source for the first release", () =>
    Effect.gen(function* () {
      const records = yield* collectArticlePublication({ heads: [] });

      expect(records).toHaveLength(21);
      expect(
        records.every(({ record }) => record.change.operation === "upsert")
      ).toBe(true);
      expect(compilerState.calls).toBe(21);
    })
  );
});
