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
    "rejects malformed authored metadata with the exact source path",
    () =>
      Effect.gen(function* () {
        const { entry, fixture } = yield* requireEnglishEntry();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadPageDocument(fixture.checkoutRoot, entry);
          return yield* makePageProjectionFromSource(source, {}).pipe(
            Effect.flip
          );
        }).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));

        expect(error).toMatchObject({
          _tag: "PageMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );
});
