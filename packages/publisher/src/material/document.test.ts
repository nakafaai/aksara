import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Path } from "effect";
import {
  loadMaterialDocument,
  makeMaterialProjection,
} from "#publisher/material/document";
import { testFileLayer } from "#test/files";
import { checkoutRoot, englishPath, sourceByPath } from "#test/material/spec";

const englishEntry = await Effect.runPromise(
  decodeMaterialRegistry().pipe(
    Effect.flatMap((entries) => {
      const entry = entries.find(
        ({ sourcePath }) => sourcePath === englishPath
      );
      return entry === undefined
        ? Effect.die(new Error("Expected the real English material entry."))
        : Effect.succeed(entry);
    })
  )
);

describe("material document", () => {
  it("maps a missing registry-owned source to its typed checkout error", async () => {
    const error = await Effect.runPromise(
      loadMaterialDocument(checkoutRoot, englishEntry).pipe(
        Effect.provide([testFileLayer(new Map()), Path.layer]),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialSourceError",
      checkoutRoot,
    });
  });

  it("rejects malformed authored metadata with the exact source path", async () => {
    const error = await Effect.runPromise(
      Effect.gen(function* () {
        const source = yield* loadMaterialDocument(checkoutRoot, englishEntry);
        return yield* makeMaterialProjection(source, {}).pipe(Effect.flip);
      }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
    );

    expect(error).toMatchObject({
      _tag: "MaterialMetadataError",
      sourcePath: englishEntry.sourcePath,
    });
  });

  it("rejects non-chronological material dates through the typed metadata error", async () => {
    const error = await Effect.runPromise(
      Effect.gen(function* () {
        const source = yield* loadMaterialDocument(checkoutRoot, englishEntry);
        return yield* makeMaterialProjection(source, {
          authors: [{ name: "Nabil Akbarazzima Fatih" }],
          dateModified: "2025-04-27",
          datePublished: "2025-04-27",
          title: "Invalid material dates",
        }).pipe(Effect.flip);
      }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
    );

    expect(error).toMatchObject({
      _tag: "MaterialMetadataError",
      sourcePath: englishEntry.sourcePath,
    });
  });
});
