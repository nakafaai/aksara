import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { inspectHistoricalContentSource } from "@nakafa/aksara-compiler/inspect";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { Array as Arr, Effect, Option, Path } from "effect";
import {
  loadArticleDocument,
  makeArticleProjectionFromSource,
} from "#publisher/article/document";
import { ArticleTestFixtures, articleTestLayer } from "#test/article";
import { testFileLayer } from "#test/files";
import { authoredCheckoutRoot, metadataExport } from "#test/metadata";

/** Requires the reviewed English article registry fixture. */
const articleDocumentFixture = Effect.fn(
  "ArticleDocumentTest.requireEnglishFixture"
)(() =>
  Effect.gen(function* () {
    const fixture = yield* ArticleTestFixtures;
    const entry = yield* Effect.fromOption(
      Arr.findFirst(
        fixture.entries,
        ({ route }) =>
          route.articleSlug === "dynastic-politics-asian-values" &&
          route.artifactLocale === "en"
      )
    );
    return { ...fixture, entry };
  })
);

layer(articleTestLayer)("article document", (it) => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const fixture = yield* articleDocumentFixture();
        const error = yield* loadArticleDocument(
          fixture.checkoutRoot,
          fixture.entry
        ).pipe(Effect.provide([testFileLayer([]), Path.layer]), Effect.flip);

        expect(error).toMatchObject({
          _tag: "ArticleSourceError",
          checkoutRoot: fixture.checkoutRoot,
        });
      })
  );

  it.effect(
    "rejects missing or obsolete metadata with the exact source path",
    () =>
      Effect.gen(function* () {
        const fixture = yield* articleDocumentFixture();
        const errors = yield* Effect.gen(function* () {
          const source = yield* loadArticleDocument(
            fixture.checkoutRoot,
            fixture.entry
          );
          return yield* Effect.forEach(
            [
              {},
              {
                authors: [],
                date: "2026-01-01",
                datePublished: "2026-01-01",
                title: "Rejected legacy date",
              },
            ],
            (metadata) =>
              makeArticleProjectionFromSource(source, metadata).pipe(
                Effect.flip
              )
          );
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        for (const error of errors) {
          expect(error).toMatchObject({
            _tag: "ArticleMetadataError",
            sourcePath: fixture.entry.sourcePath,
          });
        }
      })
  );

  it.effect(
    "rejects non-chronological article dates through the typed metadata error",
    () =>
      Effect.gen(function* () {
        const fixture = yield* articleDocumentFixture();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadArticleDocument(
            fixture.checkoutRoot,
            fixture.entry
          );
          return yield* makeArticleProjectionFromSource(source, {
            authors: [{ name: "Shifna Zihdatal Haq" }],
            dateModified: "2024-08-08",
            datePublished: "2024-08-08",
            title: "Invalid article dates",
          }).pipe(Effect.flip);
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        expect(error).toMatchObject({
          _tag: "ArticleMetadataError",
          sourcePath: fixture.entry.sourcePath,
        });
      })
  );

  it.effect(
    "derives official status only from the real Nakafa team registry",
    () =>
      Effect.gen(function* () {
        const fixture = yield* articleDocumentFixture();
        const [official, independent] = yield* Effect.gen(function* () {
          const source = yield* loadArticleDocument(
            fixture.checkoutRoot,
            fixture.entry
          );
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
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        expect(official.official).toBe(true);
        expect(independent.official).toBe(false);
      })
  );
});

layer(NodeServices.layer)("authored article metadata", (it) => {
  it.effect(
    "decodes every registry article's metadata, publication dates included",
    () =>
      Effect.gen(function* () {
        const checkoutRoot = yield* authoredCheckoutRoot;
        const entries = yield* decodeArticleRegistry();
        const rejected = yield* Effect.forEach(
          entries,
          (entry) =>
            Effect.gen(function* () {
              const source = yield* loadArticleDocument(checkoutRoot, entry);
              const { metadata } = yield* inspectHistoricalContentSource({
                contentKey: source.route.contentKey,
                rawMdx: metadataExport(source.rawMdx),
              });
              return yield* makeArticleProjectionFromSource(
                source,
                metadata
              ).pipe(
                Effect.as(Option.none<string>()),
                Effect.catchTag("ArticleMetadataError", ({ sourcePath }) =>
                  Effect.succeedSome(sourcePath)
                )
              );
            }),
          { concurrency: 16 }
        );

        expect(Arr.getSomes(rejected)).toEqual([]);
      })
  );
});
