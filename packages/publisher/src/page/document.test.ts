import { expect, layer } from "@effect/vitest";
import { Effect, Path } from "effect";
import {
  compilePageDocument,
  inspectPageDocument,
  loadPageDocument,
  makePageProjectionFromSource,
} from "#publisher/page/document";
import { testFileLayer } from "#test/files";
import {
  fixedPageEntry,
  fixedPageSource,
  PageTestFixtures,
  pageManifest,
  pageTestLayer,
} from "#test/page/spec";

const fixedCheckoutRoot = "/test/aksara-checkout";

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
          Effect.provide([testFileLayer([]), Path.layer]),
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

  it.effect(
    "pins the projection and artifact digests of a fixed non-ASCII English page source",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const rendererManifest = yield* pageManifest();
        const absolutePath = path.join(
          fixedCheckoutRoot,
          fixedPageEntry.sourcePath
        );
        const inspected = yield* inspectPageDocument(
          fixedCheckoutRoot,
          rendererManifest,
          fixedPageEntry
        ).pipe(
          Effect.provide([
            testFileLayer([[absolutePath, fixedPageSource]]),
            Path.layer,
          ])
        );
        const prepared = yield* compilePageDocument(
          inspected,
          rendererManifest
        );

        expect(inspected.projectionHash).toBe(
          "sha256:94d242cc4eba93c36fddd48ed5e531d70c5b57a5d7a2f2d47305f25e88fdb316"
        );
        expect(prepared.change.artifactHash).toBe(
          "sha256:1cb7e1bb29750da0f4f33ce3b5241397bf396bfda6970fed4c1ce85efea64e0c"
        );
      }).pipe(Effect.provide(Path.layer))
  );
});
