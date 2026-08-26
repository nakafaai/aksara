import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import {
  canonicalizeTryoutHistoryMigrationMap,
  hashTryoutHistoryMigrationMap,
  TryoutHistoryMigrationMapEntrySchema,
} from "#contracts/migration/tryout/history/map";

const SHA256_HASH_PATTERN = /^sha256:[a-f\d]{64}$/u;
const entries = Schema.decodeSync(
  Schema.Array(TryoutHistoryMigrationMapEntrySchema)
)([
  {
    identity: "question-bank/example/question\0en",
    index: 0,
    kind: "artifact",
    newHash: `sha256:${"a".repeat(64)}`,
    oldHash: `sha256:${"b".repeat(64)}`,
  },
  {
    identity: "tryout\0catalog\0en",
    index: 1,
    kind: "catalog",
    newHash: `sha256:${"c".repeat(64)}`,
    oldHash: `sha256:${"d".repeat(64)}`,
  },
]);

describe("try-out history migration maps", () => {
  it.effect("binds every ordered source and target identity", () =>
    Effect.gen(function* () {
      const digest = yield* hashTryoutHistoryMigrationMap(entries);
      const reversed = yield* hashTryoutHistoryMigrationMap(
        [...entries].reverse()
      );

      expect(
        JSON.parse(canonicalizeTryoutHistoryMigrationMap(entries))
      ).toEqual(entries);
      expect(digest).toMatch(SHA256_HASH_PATTERN);
      expect(reversed).not.toBe(digest);
    })
  );
});
