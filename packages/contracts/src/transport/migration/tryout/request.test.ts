import { assert, describe, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  SignedTryoutHistoryMigrationReceiptSchema,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
} from "#contracts/migration/tryout/history/spec";
import {
  TRYOUT_HISTORY_MIGRATION_REMOVAL_GATE,
  TryoutHistoryMigrationRequestSchema,
} from "#contracts/transport/migration/tryout/request";

const artifactHash = `sha256:${"a".repeat(64)}`;
const sourceSnapshotId = `sha256:${"b".repeat(64)}`;
const proofFailure = /proof/;
const uniqueHashFailure = /unique historical artifact hashes/;

describe("try-out history migration requests", () => {
  it("tracks the exact condition that deletes the temporary protocol", () => {
    assert.strictEqual(
      TRYOUT_HISTORY_MIGRATION_REMOVAL_GATE,
      "external-receipt-cleaned-server-zero-legacy-or-temporary-rows"
    );
  });

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

        assert.strictEqual(accepted.command, "artifactBatch");
        if (accepted.command !== "artifactBatch") {
          return yield* Effect.die("Expected the artifact batch variant.");
        }
        assert.strictEqual(accepted.artifactHashes.length, 1);
        assert.strictEqual(accepted.artifactHashes[0], artifactHash);
        assert.strictEqual(accepted.sourceSnapshotId, sourceSnapshotId);
        assert.match(String(rejected), uniqueHashFailure);
      })
  );

  it.effect("accepts the same signed receipt for sealing and cleanup", () =>
    Effect.gen(function* () {
      const hash = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
      const releaseId = ReleaseIdSchema.make("retained-history-v1");
      const receipt = SignedTryoutHistoryMigrationReceiptSchema.make({
        keyId: SigningKeyIdSchema.make("content-2026-08-27"),
        payload: {
          completion: {
            cleanupLimit: 19,
            completedAt: 1,
            migratedAttempts: 2,
            migratedScaleItems: 3,
            migratedScaleRuns: 4,
            migratedScaleVersions: 5,
            remainingMarkers: 0,
          },
          format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
          migrationId: releaseId,
          planHash: hash,
          sourceSnapshotId: hash,
          targetBundleHash: hash,
          targetSnapshotId: hash,
        },
        receiptHash: hash,
        signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
      });
      const commandNames: ReadonlyArray<"cleanup" | "seal"> = [
        "seal",
        "cleanup",
      ];
      const commands = yield* Effect.forEach(commandNames, (command) =>
        Schema.decodeUnknownEffect(TryoutHistoryMigrationRequestSchema)({
          command,
          operation: "migrateTryoutHistory",
          ...(command === "cleanup"
            ? {
                proof: {
                  assetHash: hash,
                  sourceSha: GitCommitShaSchema.make("a".repeat(40)),
                },
              }
            : {}),
          receipt,
          releaseId,
        })
      );

      assert.deepStrictEqual(
        commands.map(({ command }) => command),
        ["seal", "cleanup"]
      );

      const missingProof = yield* Schema.decodeUnknownEffect(
        TryoutHistoryMigrationRequestSchema
      )({
        command: "cleanup",
        operation: "migrateTryoutHistory",
        receipt,
        releaseId,
      }).pipe(Effect.flip);

      assert.match(String(missingProof), proofFailure);
    })
  );
});
