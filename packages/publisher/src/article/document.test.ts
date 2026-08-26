import { describe, expect, it } from "@effect/vitest";
import { Effect, Path } from "effect";
import {
  loadArticleDocument,
  makeArticleProjectionFromSource,
} from "#publisher/article/document";
import { articleEntries, checkoutRoot, sourceByPath } from "#test/article";
import { testFileLayer } from "#test/files";

const englishEntry = articleEntries.find(
  ({ route }) =>
    route.articleSlug === "dynastic-politics-asian-values" &&
    route.artifactLocale === "en"
);

const requireEnglishEntry = Effect.fn(
  "ArticleDocumentTest.requireEnglishEntry"
)(() => Effect.fromNullishOr(englishEntry));

describe("article document", () => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* loadArticleDocument(checkoutRoot, entry).pipe(
          Effect.provide([testFileLayer(new Map()), Path.layer]),
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "ArticleSourceError",
          checkoutRoot,
        });
      })
  );

  it.effect(
    "rejects malformed authored metadata with the exact source path",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadArticleDocument(checkoutRoot, entry);
          return yield* makeArticleProjectionFromSource(source, {}).pipe(
            Effect.flip
          );
        }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]));

        expect(error).toMatchObject({
          _tag: "ArticleMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );

  it.effect(
    "rejects non-chronological article dates through the typed metadata error",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadArticleDocument(checkoutRoot, entry);
          return yield* makeArticleProjectionFromSource(source, {
            authors: [{ name: "Shifna Zihdatal Haq" }],
            dateModified: "2024-08-08",
            datePublished: "2024-08-08",
            title: "Invalid article dates",
          }).pipe(Effect.flip);
        }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]));

        expect(error).toMatchObject({
          _tag: "ArticleMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );

  it.effect(
    "derives official status only from the real Nakafa team registry",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const [official, independent] = yield* Effect.gen(function* () {
          const source = yield* loadArticleDocument(checkoutRoot, entry);
          const shared = {
            datePublished: "2024-08-08",
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
        }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]));

        expect(official.official).toBe(true);
        expect(independent.official).toBe(false);
      })
  );
});
