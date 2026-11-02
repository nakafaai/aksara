import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  ContentKeySchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, Stream } from "effect";
import { validateCatalogResult } from "#publisher/catalog/result";
import { head } from "#test/publication";

const sibling = {
  ...head,
  contentKey: ContentKeySchema.make("test:publication:b"),
  publicPath: PublicPathSchema.make("subjects/test/publication-b"),
};
const expectedHeads = [
  {
    artifactLocale: ArtifactLocaleSchema.make("en"),
    contentKey: head.contentKey,
    family: "material" as const,
  },
  {
    artifactLocale: ArtifactLocaleSchema.make("en"),
    contentKey: sibling.contentKey,
    family: "material" as const,
  },
];

layer(NodeServices.layer)("catalog result validation", (it) => {
  it.effect(
    "pins one result catalog digest for the same heads in two chunkings",
    () =>
      Effect.gen(function* () {
        /** Validates the same heads in one stream chunking and returns the result digest. */
        const digestFor = Effect.fn("CatalogResultTest.digestFor")(function* (
          chunk: number
        ) {
          const evidence = yield* Effect.scoped(
            validateCatalogResult({
              expectedHeads,
              result: Stream.make(head, sibling).pipe(Stream.rechunk(chunk)),
            })
          );
          return evidence.digest;
        });
        expect(yield* digestFor(1)).toMatchInlineSnapshot(
          `"sha256:58d0f145c98e0829ffb2c2bbba0c6c3ad21b231e67873b19ed3cd75ecf3cd60e"`
        );
        expect(yield* digestFor(2)).toMatchInlineSnapshot(
          `"sha256:58d0f145c98e0829ffb2c2bbba0c6c3ad21b231e67873b19ed3cd75ecf3cd60e"`
        );
      })
  );
});
