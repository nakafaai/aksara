import { describe, expect, it } from "@nakafa/testing/effect";
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
if (englishEntry === undefined) {
  throw new Error("Expected the English privacy page entry.");
}

describe("page document", () => {
  it("maps a missing registry-owned source to its typed checkout error", async () => {
    const error = await Effect.runPromise(
      loadPageDocument(checkoutRoot, englishEntry).pipe(
        Effect.provide([testFileLayer(new Map()), Path.layer]),
        Effect.flip
      )
    );

    expect(error).toMatchObject({ _tag: "PageSourceError", checkoutRoot });
  });

  it("rejects malformed authored metadata with the exact source path", async () => {
    const error = await Effect.runPromise(
      Effect.gen(function* () {
        const source = yield* loadPageDocument(checkoutRoot, englishEntry);
        return yield* makePageProjectionFromSource(source, {}).pipe(
          Effect.flip
        );
      }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
    );

    expect(error).toMatchObject({
      _tag: "PageMetadataError",
      sourcePath: englishEntry.sourcePath,
    });
  });
});
