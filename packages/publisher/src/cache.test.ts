import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  emptyContentSnapshots,
  restoreContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  allContentCacheChanges,
  contentSnapshotCacheChanges,
} from "#publisher/cache";

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

  it("maps changed structured snapshots to their runtime content families", async () => {
    const empty = emptyContentSnapshots();
    const oldId = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
    const newId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
    const changes = await Effect.runPromise(
      contentSnapshotCacheChanges({
        ...empty,
        program: restoreContentSnapshot(oldId, newId),
        quran: restoreContentSnapshot(oldId, newId),
        tryout: restoreContentSnapshot(oldId, newId),
      }).pipe(Stream.runCollect)
    );

    expect([...changes]).toEqual([
      { family: "material" },
      { family: "question" },
    ]);
    expect(
      await Effect.runPromise(
        contentSnapshotCacheChanges(empty).pipe(Stream.runCount)
      )
    ).toBe(0);
  });
});
