import { Path } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  loadArticleDocument,
  makeArticleProjectionFromSource,
} from "#publisher/article/document";
import { articleEntries, checkoutRoot, sourceByPath } from "#test/article";
import { testFileLayer } from "#test/files";

const englishEntry = articleEntries.find(
  ({ route }) =>
    route.articleSlug === "dynastic-politics-asian-values" &&
    route.locale === "en"
);
if (englishEntry === undefined) {
  throw new Error("Expected the real English politics article entry.");
}

describe("article document", () => {
  it("maps a missing registry-owned source to its typed checkout error", async () => {
    const error = await Effect.runPromise(
      loadArticleDocument(checkoutRoot, englishEntry).pipe(
        Effect.provide(testFileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "ArticleSourceError",
      checkoutRoot,
    });
  });

  it("rejects malformed authored metadata with the exact source path", async () => {
    const error = await Effect.runPromise(
      Effect.gen(function* () {
        const source = yield* loadArticleDocument(checkoutRoot, englishEntry);
        return yield* makeArticleProjectionFromSource(source, {}).pipe(
          Effect.flip
        );
      }).pipe(
        Effect.provide(testFileLayer(sourceByPath)),
        Effect.provide(Path.layer)
      )
    );

    expect(error).toMatchObject({
      _tag: "ArticleMetadataError",
      sourcePath: englishEntry.sourcePath,
    });
  });

  it("derives official status only from the real Nakafa team registry", async () => {
    const [official, independent] = await Effect.runPromise(
      Effect.gen(function* () {
        const source = yield* loadArticleDocument(checkoutRoot, englishEntry);
        const shared = {
          date: "2024-08-08",
          title: "Reviewed article",
        };
        const officialProjection = yield* makeArticleProjectionFromSource(
          source,
          {
            ...shared,
            authors: [{ name: "Shifna Zihdatal Haq" }],
          }
        );
        const independentProjection = yield* makeArticleProjectionFromSource(
          source,
          {
            ...shared,
            authors: [{ name: "Independent Author" }],
          }
        );
        return [officialProjection, independentProjection] as const;
      }).pipe(
        Effect.provide(testFileLayer(sourceByPath)),
        Effect.provide(Path.layer)
      )
    );

    expect(official.official).toBe(true);
    expect(independent.official).toBe(false);
  });
});
