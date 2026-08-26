import { describe, expect, it } from "@effect/vitest";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import { Effect } from "effect";
import { requirePublishedRendererDomain } from "#publisher/preparation/renderer";
import { publicationPayload, rendererManifest } from "#test/publication";

describe("prepared renderer activation", () => {
  it.effect("accepts mathematics published by the deployed renderer", () =>
    Effect.gen(function* () {
      const result = yield* requirePublishedRendererDomain(
        publicationPayload,
        rendererManifest
      );
      expect(result).toBeUndefined();
    })
  );

  it.effect("rejects an authored domain absent from deployed routes", () =>
    Effect.gen(function* () {
      const chemistry = CompiledContentPayloadSchema.make({
        ...publicationPayload,
        rendererDomain: "chemistry",
      });
      const error = yield* requirePublishedRendererDomain(
        chemistry,
        rendererManifest
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "ArtifactRendererDomainUnpublishedError",
        contentKey: publicationPayload.contentKey,
        rendererDomain: "chemistry",
      });
    })
  );
});
