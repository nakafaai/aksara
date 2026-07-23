import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { allContentCacheChanges } from "#publisher/cache";

describe("allContentCacheChanges", () => {
  it("replays one family-wide invalidation for every supported family", async () => {
    const changes = await Effect.runPromise(
      allContentCacheChanges().pipe(Stream.runCollect)
    );

    expect([...changes]).toEqual([
      { family: "article" },
      { family: "material" },
      { family: "question" },
    ]);
  });
});
