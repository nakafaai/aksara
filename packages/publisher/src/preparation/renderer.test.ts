import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { requirePublishedRendererDomain } from "#publisher/preparation/renderer";
import { publicationPayload, rendererManifest } from "#test/publication";

describe("prepared renderer activation", () => {
  it("accepts mathematics published by the deployed renderer", async () => {
    await expect(
      Effect.runPromise(
        requirePublishedRendererDomain(publicationPayload, rendererManifest)
      )
    ).resolves.toBeUndefined();
  });

  it("rejects an authored domain absent from deployed routes", async () => {
    const chemistry = CompiledContentPayloadSchema.make({
      ...publicationPayload,
      rendererDomain: "chemistry",
    });
    const error = await Effect.runPromise(
      requirePublishedRendererDomain(chemistry, rendererManifest).pipe(
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "ArtifactRendererDomainUnpublishedError",
      contentKey: publicationPayload.contentKey,
      rendererDomain: "chemistry",
    });
  });
});
