import { describe, expect, it } from "@effect/vitest";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect, Path } from "effect";
import {
  loadMaterialDocument,
  makeMaterialProjection,
} from "#publisher/material/document";
import { testFileLayer } from "#test/files";
import { checkoutRoot, englishPath, sourceByPath } from "#test/material/spec";

const requireEnglishEntry = Effect.fn(
  "MaterialDocumentTest.requireEnglishEntry"
)(function* () {
  const entries = yield* decodeMaterialRegistry();
  return yield* Effect.fromNullishOr(
    entries.find(({ sourcePath }) => sourcePath === englishPath)
  );
});

describe("material document", () => {
  it.effect(
    "maps a missing registry-owned source to its typed checkout error",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* loadMaterialDocument(checkoutRoot, entry).pipe(
          Effect.provide([testFileLayer(new Map()), Path.layer]),
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "MaterialSourceError",
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
          const source = yield* loadMaterialDocument(checkoutRoot, entry);
          return yield* makeMaterialProjection(source, {}).pipe(Effect.flip);
        }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]));

        expect(error).toMatchObject({
          _tag: "MaterialMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );

  it.effect(
    "rejects non-chronological material dates through the typed metadata error",
    () =>
      Effect.gen(function* () {
        const entry = yield* requireEnglishEntry();
        const error = yield* Effect.gen(function* () {
          const source = yield* loadMaterialDocument(checkoutRoot, entry);
          return yield* makeMaterialProjection(source, {
            authors: [{ name: "Nabil Akbarazzima Fatih" }],
            dateModified: "2025-04-27",
            datePublished: "2025-04-27",
            title: "Invalid material dates",
          }).pipe(Effect.flip);
        }).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]));

        expect(error).toMatchObject({
          _tag: "MaterialMetadataError",
          sourcePath: entry.sourcePath,
        });
      })
  );
});
