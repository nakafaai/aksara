import { assert, layer } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer } from "effect";

import {
  cleanupMigrationReceipt,
  makeMigrationReceipt,
} from "#publisher/migration/tryout/receipt";
import { allowsCleanupRepairPage } from "#publisher/migration/tryout/repair";
import { failureReason } from "#test/migration/error";
import {
  cleanedMigrationStatus,
  completedMigrationStatus,
  migrationProof,
  sealedMigrationStatus,
} from "#test/migration/flow";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { migrationId } from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

const productionId = ReleaseIdSchema.make("retained-tryout-history");

layer(
  Layer.succeed(ContentVerificationKeyResolver, migrationVerificationResolver)
)("try-out history cleanup repair", (it) => {
  it.effect(
    "accepts one repair-only page outside signed deletion accounting",
    () =>
      Effect.gen(function* () {
        const completed = {
          ...completedMigrationStatus(),
          migrationId: productionId,
        };
        const receipt = yield* makeMigrationReceipt(migrationSigner, completed);
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
              deleted: calls === 1 ? 0 : 1,
              migrationId: productionId,
              status:
                calls === 1
                  ? sealedMigrationStatus(request.receipt, completed)
                  : cleanedMigrationStatus(request.receipt),
            });
          },
        });

        yield* cleanupMigrationReceipt(target, receipt, proof);

        assert.strictEqual(allowsCleanupRepairPage(productionId, false), true);
        assert.strictEqual(allowsCleanupRepairPage(productionId, true), false);
        assert.strictEqual(calls, 2);
      })
  );

  it.effect("rejects a repair-only response for every other migration", () =>
    Effect.gen(function* () {
      const completed = completedMigrationStatus();
      const receipt = yield* makeMigrationReceipt(migrationSigner, completed);
      const proof = yield* migrationProof(receipt);
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) =>
          request.command === "cleanup"
            ? Effect.succeed({
                command: request.command,
                deleted: 0,
                migrationId,
                status: sealedMigrationStatus(request.receipt, completed),
              })
            : Effect.die("Expected cleanup."),
      });
      const failure = yield* cleanupMigrationReceipt(
        target,
        receipt,
        proof
      ).pipe(Effect.flip);

      assert.strictEqual(allowsCleanupRepairPage(migrationId, false), false);
      assert.strictEqual(failureReason(failure), "cleanup-progress");
    })
  );

  it.effect("rejects a repeated repair-only response", () =>
    Effect.gen(function* () {
      const completed = {
        ...completedMigrationStatus(),
        migrationId: productionId,
      };
      const receipt = yield* makeMigrationReceipt(migrationSigner, completed);
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
            deleted: 0,
            migrationId: productionId,
            status: sealedMigrationStatus(request.receipt, completed),
          });
        },
      });

      const failure = yield* cleanupMigrationReceipt(
        target,
        receipt,
        proof
      ).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "cleanup-progress");
      assert.strictEqual(calls, 2);
    })
  );
});
