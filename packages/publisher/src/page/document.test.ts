import { expect, layer } from "@effect/vitest";
import { Effect, Path } from "effect";
import {
  loadPageDocument,
  makePageProjectionFromSource,
} from "#publisher/page/document";
import { testFileLayer } from "#test/files";
import { PageTestFixtures, pageTestLayer } from "#test/page/spec";

/** Requires the reviewed English page registry fixture. */
const requireEnglishEntry = Effect.fn("PageDocumentTest.requireEnglishEntry")(
  () =>
    Effect.gen(function* () {
      const fixture = yield* PageTestFixtures;
      const entry = yield* Effect.fromNullishOr(
        fixture.entries.find(
          ({ route }) =>
            route.pageKey === "privacy-policy" && route.artifactLocale === "en"
        )
      );
      return { entry, fixture };
    })
);

layer(pageTestLayer)("page document", (it) => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const { entry, fixture } = yield* requireEnglishEntry();
        const error = yield* loadPageDocument(fixture.checkoutRoot, entry).pipe(
          Effect.provide([testFileLayer(new Map()), Path.layer]),
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "PageSourceError",
          checkoutRoot: fixture.checkoutRoot,
        });
      })
  );

  it.effect(
    "rejects missing or obsolete metadata with the exact source path",
    () =>
      Effect.gen(function* () {
        const { entry, fixture } = yield* requireEnglishEntry();
        const errors = yield* Effect.gen(function* () {
          const source = yield* loadPageDocument(fixture.checkoutRoot, entry);
          return yield* Effect.forEach(
            [
              {},
              {
                date: "2026-01-01",
                datePublished: "2026-01-01",
                description: "Protocol-only description.",
                title: "Rejected legacy date",
              },
            ],
            (metadata) =>
              makePageProjectionFromSource(source, metadata).pipe(Effect.flip)
          );
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        for (const error of errors) {
          expect(error).toMatchObject({
            _tag: "PageMetadataError",
            sourcePath: entry.sourcePath,
          });
        }
      })
  );
});
