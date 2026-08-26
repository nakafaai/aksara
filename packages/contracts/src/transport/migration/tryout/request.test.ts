import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { TryoutHistoryMigrationRequestSchema } from "#contracts/transport/migration/tryout/request";

const artifactHash = `sha256:${"a".repeat(64)}`;
const sourceSnapshotId = `sha256:${"b".repeat(64)}`;

describe("try-out history migration requests", () => {
  it.effect(
    "accepts unique artifact batches and rejects repeated source hashes",
    () =>
      Effect.gen(function* () {
        const request = {
          artifactHashes: [artifactHash],
          command: "artifactBatch",
          operation: "migrateTryoutHistory",
          releaseId: "retained-tryout-history-v1",
          sourceSnapshotId,
        };
        const accepted = yield* Schema.decodeUnknownEffect(
          TryoutHistoryMigrationRequestSchema
        )(request);
        const rejected = yield* Schema.decodeUnknownEffect(
          TryoutHistoryMigrationRequestSchema
        )({ ...request, artifactHashes: [artifactHash, artifactHash] }).pipe(
          Effect.flip
        );

        expect(accepted).toEqual(request);
        expect(String(rejected)).toContain("unique historical artifact hashes");
      })
  );
});
