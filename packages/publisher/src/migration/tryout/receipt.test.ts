import { assert, layer } from "@effect/vitest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer } from "effect";

import {
  cleanupMigrationReceipt,
  makeMigrationReceipt,
  sealMigrationReceipt,
} from "#publisher/migration/tryout/receipt";
import { failureReason } from "#test/migration/error";
import {
  cleanedMigrationStatus,
  completedMigrationStatus,
  migrationProof,
  sealedMigrationStatus,
} from "#test/migration/flow";
import {
  migrationResponse,
  otherHash,
  otherId,
} from "#test/migration/protocol";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { migrationId } from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

/** Makes one real signed receipt under the test resolver. */
const makeReceipt = () =>
  makeMigrationReceipt(migrationSigner, completedMigrationStatus());

layer(
  Layer.succeed(ContentVerificationKeyResolver, migrationVerificationResolver)
)("try-out history migration receipt lifecycle", (it) => {
  it.effect("seals the exact authenticated completion receipt", () =>
    Effect.gen(function* () {
      const receipt = yield* makeReceipt();
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) =>
          request.command === "seal"
            ? Effect.succeed({
                command: request.command,
                migrationId,
                status: sealedMigrationStatus(
                  request.receipt,
                  completedMigrationStatus()
                ),
              })
            : Effect.die("Expected seal."),
      });

      yield* sealMigrationReceipt(target, receipt);
    })
  );

  it.effect("rejects every drifted seal response identity", () =>
    Effect.gen(function* () {
      const receipt = yield* makeReceipt();
      const exact = sealedMigrationStatus(receipt, completedMigrationStatus());
      const foreignReceipt = { ...receipt, receiptHash: otherHash };
      const invalid = [
        migrationResponse({
          command: "status",
          migrationId,
          status: completedMigrationStatus(),
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: completedMigrationStatus(),
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: { ...exact, receipt: foreignReceipt },
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: { ...exact, migrationId: otherId },
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: { ...exact, planHash: otherHash },
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: { ...exact, sourceSnapshotId: otherHash },
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: { ...exact, targetBundleHash: otherHash },
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: { ...exact, targetSnapshotId: otherHash },
        }).value,
        migrationResponse({
          command: "seal",
          migrationId,
          status: {
            ...exact,
            completion: {
              ...exact.completion,
              migratedAttempts: exact.completion.migratedAttempts + 1,
            },
          },
        }).value,
      ];

      yield* Effect.forEach(invalid, (value) => {
        const target = makePublicationTarget({
          migrateTryoutHistory: () => Effect.succeed(value),
        });
        return sealMigrationReceipt(target, receipt).pipe(
          Effect.flip,
          Effect.map((failure) =>
            assert.strictEqual(failureReason(failure), "receipt-evidence")
          )
        );
      });
    })
  );

  it.effect(
    "repeats progressing bounded pages and returns cleaned evidence",
    () =>
      Effect.gen(function* () {
        const receipt = yield* makeReceipt();
        const proof = yield* migrationProof(receipt);
        let calls = 0;
        const target = makePublicationTarget({
          migrateTryoutHistory: (request) => {
            if (request.command !== "cleanup") {
              return Effect.die("Expected cleanup.");
            }
            calls += 1;
            return Effect.succeed({
              command: request.command,
              deleted: calls === 1 ? 8 : 1,
              migrationId,
              repaired: 0,
              status:
                calls === 1
                  ? sealedMigrationStatus(
                      request.receipt,
                      completedMigrationStatus()
                    )
                  : cleanedMigrationStatus(request.receipt),
            });
          },
        });

        const cleaned = yield* cleanupMigrationReceipt(target, receipt, proof);

        assert.strictEqual(cleaned.receiptHash, receipt.receiptHash);
        assert.strictEqual(calls, 2);
      })
  );

  it.effect("fails closed when a cleanup page makes no progress", () =>
    Effect.gen(function* () {
      const receipt = yield* makeReceipt();
      const proof = yield* migrationProof(receipt);
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) =>
          request.command === "cleanup"
            ? Effect.succeed({
                command: request.command,
                deleted: 0,
                migrationId,
                repaired: 0,
                status: sealedMigrationStatus(
                  request.receipt,
                  completedMigrationStatus()
                ),
              })
            : Effect.die("Expected cleanup."),
      });
      const failure = yield* cleanupMigrationReceipt(
        target,
        receipt,
        proof
      ).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "cleanup-progress");
    })
  );

  it.effect("fails closed when cleanup exceeds its signed limit", () =>
    Effect.gen(function* () {
      const receipt = yield* makeReceipt();
      const proof = yield* migrationProof(receipt);
      let calls = 0;
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) => {
          if (request.command !== "cleanup") {
            return Effect.die("Expected cleanup.");
          }
          calls += 1;
          return Effect.succeed({
            command: request.command,
            deleted: 10,
            migrationId,
            repaired: 0,
            status: sealedMigrationStatus(
              request.receipt,
              completedMigrationStatus()
            ),
          });
        },
      });
      const failure = yield* cleanupMigrationReceipt(
        target,
        receipt,
        proof
      ).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "cleanup-limit");
      assert.strictEqual(calls, 2);
    })
  );

  it.effect("rejects command, phase, and cleaned receipt drift", () =>
    Effect.gen(function* () {
      const receipt = yield* makeReceipt();
      const proof = yield* migrationProof(receipt);
      const cleaned = cleanedMigrationStatus(receipt);
      const invalid = [
        migrationResponse({
          command: "status",
          migrationId,
          status: cleaned,
        }).value,
        migrationResponse({
          command: "cleanup",
          deleted: 1,
          migrationId,
          repaired: 0,
          status: completedMigrationStatus(),
        }).value,
        migrationResponse({
          command: "cleanup",
          deleted: 1,
          migrationId,
          repaired: 0,
          status: { ...cleaned, migrationId: otherId },
        }).value,
      ];

      yield* Effect.forEach(invalid, (value) => {
        const target = makePublicationTarget({
          migrateTryoutHistory: () => Effect.succeed(value),
        });
        return cleanupMigrationReceipt(target, receipt, proof).pipe(
          Effect.flip,
          Effect.map((failure) =>
            assert.strictEqual(failureReason(failure), "receipt-evidence")
          )
        );
      });
    })
  );

  it.effect("rejects proof for any other immutable asset", () =>
    Effect.gen(function* () {
      const receipt = yield* makeReceipt();
      const proof = yield* migrationProof(receipt);
      const target = makePublicationTarget({
        migrateTryoutHistory: () => Effect.die("Cleanup must not start."),
      });
      const failure = yield* cleanupMigrationReceipt(target, receipt, {
        ...proof,
        assetHash: otherHash,
      }).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "receipt-evidence");
    })
  );
});
