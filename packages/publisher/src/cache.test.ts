import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  inheritContentSnapshots,
  restoreContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";
import {
  allContentCacheChanges,
  contentSnapshotCacheChanges,
} from "#publisher/cache";

describe("allContentCacheChanges", () => {
  it.effect(
    "replays one invalidation for every mutable publication dependency",
    () =>
      Effect.gen(function* () {
        const changes = yield* allContentCacheChanges.pipe(Stream.runCollect);

        expect([...changes]).toEqual([
          { scope: "article" },
          { scope: "material" },
          { scope: "page" },
          { scope: "question" },
          { scope: "program" },
          { scope: "quran" },
          { scope: "tryout" },
        ]);
      })
  );

  it.effect(
    "retains each changed snapshot dependency without unrelated body families",
    () =>
      Effect.gen(function* () {
        const empty = inheritContentSnapshots(null);
        const oldId = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
        const newId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
        const changes = yield* contentSnapshotCacheChanges({
          ...empty,
          program: restoreContentSnapshot(oldId, newId),
          quran: restoreContentSnapshot(oldId, newId),
          tryout: restoreContentSnapshot(oldId, newId),
        }).pipe(Stream.runCollect);

        expect([...changes]).toEqual([
          { scope: "program" },
          { scope: "quran" },
          { scope: "tryout" },
        ]);
        expect(
          yield* contentSnapshotCacheChanges(empty).pipe(Stream.runCount)
        ).toBe(0);
      })
  );
});
