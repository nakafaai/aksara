import { Path } from "@effect/platform";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  loadMaterialDocument,
  makeMaterialProjection,
} from "#publisher/material/document";
import { testFileLayer } from "#test/files";
import { checkoutRoot, sourceByPath } from "#test/material";

const englishEntry = await Effect.runPromise(
  decodeMaterialRegistry().pipe(
    Effect.flatMap((entries) => {
      const entry = entries.find(({ route }) => route.locale === "en");
      return entry === undefined
        ? Effect.dieMessage("Expected the real English material entry.")
        : Effect.succeed(entry);
    })
  )
);

describe("material document", () => {
  it("maps a missing registry-owned source to its typed checkout error", async () => {
    const error = await Effect.runPromise(
      loadMaterialDocument(checkoutRoot, englishEntry).pipe(
        Effect.provide(testFileLayer(new Map())),
        Effect.provide(Path.layer),
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
      }).pipe(
        Effect.provide(testFileLayer(sourceByPath)),
        Effect.provide(Path.layer)
      )
    );

    expect(error).toMatchObject({
      _tag: "MaterialMetadataError",
      sourcePath: englishEntry.sourcePath,
    });
  });
});
