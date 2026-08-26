import { describe, expect, it } from "@effect/vitest";
import { Effect, Path } from "effect";
import {
  loadPageDocument,
  makePageProjectionFromSource,
} from "#publisher/page/document";
import { testFileLayer } from "#test/files";
import { checkoutRoot, pageEntries, sourceByPath } from "#test/page";

const englishEntry = pageEntries.find(
  ({ route }) =>
    route.pageKey === "privacy-policy" && route.artifactLocale === "en"
);

const requireEnglishEntry = Effect.fn("PageDocumentTest.requireEnglishEntry")(
  () => Effect.fromNullishOr(englishEntry)
);

describe("page document", () => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* loadPageDocument(checkoutRoot, entry).pipe(
          Effect.provide([testFileLayer(new Map()), Path.layer]),
          Effect.flip
        );

        expect(error).toMatchObject({ _tag: "PageSourceError", checkoutRoot });
      })
  );

  it.effect(
    "rejects malformed authored metadata with the exact source path",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadPageDocument(checkoutRoot, entry);
          return yield* makePageProjectionFromSource(source, {}).pipe(
            Effect.flip
          );
        }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]));

        expect(error).toMatchObject({
          _tag: "PageMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );
});
