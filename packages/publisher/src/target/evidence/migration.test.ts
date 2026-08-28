import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { hasBoundMigration } from "#publisher/target/evidence/migration";
import { hasBoundPublicationSuccess } from "#publisher/target/evidence/response";
import { historicalArtifacts } from "#test/migration/artifact";
import {
  migrationProtocol,
  migrationRequest,
  migrationResponse,
  otherHash,
  otherId,
} from "#test/migration/protocol";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus, readyMigrationStatus } from "#test/migration/status";
import { makeMigrationTarget } from "#test/migration/target";

describe("migration HTTP evidence", () => {
  it.effect("accepts every exact command-specific response", () =>
    Effect.gen(function* () {
      const exchanges = yield* migrationProtocol();
      assert.strictEqual(
        Object.values(exchanges).every((exchange) =>
          hasBoundMigration(exchange.request, exchange.response)
        ),
        true
      );
      if (
        exchanges.bundle.request.command !== "stageBundle" ||
        exchanges.bundle.response.value.command !== "stageBundle"
      ) {
        return yield* Effect.die("Expected bundle exchange fixture.");
      }
      assert.strictEqual(
        hasBoundMigration(
          exchanges.bundle.request,
          migrationResponse({
            ...exchanges.bundle.response.value,
            bundleHash: otherHash,
            created: 0,
            unchanged: 1,
          })
        ),
        true
      );
      assert.strictEqual(
        hasBoundPublicationSuccess(
          exchanges.source.request,
          exchanges.source.response
        ),
        true
      );
      if (exchanges.cleanup.request.command !== "cleanup") {
        return yield* Effect.die("Expected cleanup exchange fixture.");
      }
      assert.strictEqual(
        hasBoundMigration(
          exchanges.cleanup.request,
          migrationResponse({
            command: "cleanup",
            deleted: 0,
            migrationId,
            status: {
              migrationId,
              phase: "cleaned",
              receipt: exchanges.cleanup.request.receipt,
            },
          })
        ),
        true
      );
    })
  );

  it.effect(
    "rejects command, migration, count, and immutable identity drift",
    () =>
      Effect.gen(function* () {
        const exchanges = yield* migrationProtocol();
        if (
          exchanges.plan.request.command !== "stagePlan" ||
          exchanges.plan.response.value.command !== "stagePlan" ||
          exchanges.plan.response.value.status.phase !== "ready" ||
          exchanges.seal.request.command !== "seal" ||
          exchanges.seal.response.value.command !== "seal" ||
          exchanges.seal.response.value.status.phase !== "sealed"
        ) {
          return yield* Effect.die("Expected signed plan exchange fixture.");
        }
        const invalid = [
          {
            request: exchanges.abort.request,
            response: migrationResponse({
              command: "status",
              migrationId,
              status: migrationStatus(),
            }),
          },
          {
            request: exchanges.source.request,
            response: migrationResponse({
              command: "status",
              migrationId,
              status: migrationStatus(),
            }),
          },
          {
            request: exchanges.source.request,
            response: migrationResponse({
              command: "source",
              migrationId: otherId,
              source: historicalSource,
            }),
          },
          {
            request: exchanges.initialize.request,
            response: migrationResponse({
              command: "initialize",
              migrationId,
              status: migrationStatus({ sourceSnapshotId: otherHash }),
            }),
          },
          {
            request: exchanges.artifact.request,
            response: migrationResponse({
              artifacts: [...historicalArtifacts].reverse(),
              command: "artifactBatch",
              migrationId,
            }),
          },
          {
            request: exchanges.stageArtifacts.request,
            response: migrationResponse({
              command: "stageArtifacts",
              created: 1,
              migrationId,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.stageRows.request,
            response: migrationResponse({
              command: "stageRows",
              created: 0,
              migrationId,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.snapshot.request,
            response: migrationResponse({
              command: "stageSnapshot",
              created: 1,
              migrationId,
              snapshotId: otherHash,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.bundle.request,
            response: migrationResponse({
              bundleHash: otherHash,
              command: "stageBundle",
              created: 1,
              migrationId,
              rendererManifestHash: otherHash,
              snapshotId: otherHash,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.plan.request,
            response: migrationResponse({
              command: "stagePlan",
              migrationId,
              status: readyMigrationStatus({
                ...exchanges.plan.response.value.status,
                artifactMapCount:
                  exchanges.plan.response.value.status.artifactMapCount + 1,
              }),
            }),
          },
          {
            request: exchanges.seal.request,
            response: migrationResponse({
              ...exchanges.seal.response.value,
              status: {
                ...exchanges.seal.response.value.status,
                receipt: {
                  ...exchanges.seal.response.value.status.receipt,
                  receiptHash: otherHash,
                },
              },
            }),
          },
        ];

        assert.deepStrictEqual(
          invalid.map((exchange) =>
            hasBoundMigration(exchange.request, exchange.response)
          ),
          Array.from({ length: invalid.length }, () => false)
        );
      })
  );

  it.effect("binds permanent adoption to exact signed runtime identities", () =>
    Effect.gen(function* () {
      const { prepared } = yield* makeMigrationTarget();
      const request = migrationRequest({
        bundle: prepared.bundle,
        command: "adoptBundle",
        inventoryHash: otherHash,
        operation: "migrateTryoutHistory",
        releaseId: migrationId,
        rendererManifest: prepared.rendererManifest,
      });
      const receipt = {
        adopted: 1,
        alreadyAdopted: 0,
        attemptCount: 1,
        bundleCreated: 1,
        bundleHash: prepared.bundle.bundleHash,
        bundleUnchanged: 0,
        inventoryHash: otherHash,
        snapshotId: prepared.bundle.payload.snapshot.snapshotId,
        sourceReleaseId: prepared.bundle.payload.sourceReleaseId,
      };

      assert.strictEqual(
        hasBoundMigration(
          request,
          migrationResponse({
            command: "adoptBundle",
            migrationId,
            receipt,
          })
        ),
        true
      );
      assert.strictEqual(
        hasBoundMigration(
          request,
          migrationResponse({
            command: "adoptBundle",
            migrationId,
            receipt: { ...receipt, bundleHash: otherHash },
          })
        ),
        false
      );
      assert.strictEqual(
        hasBoundMigration(
          request,
          migrationResponse({
            command: "adoptBundle",
            migrationId,
            receipt: { ...receipt, inventoryHash: prepared.bundle.bundleHash },
          })
        ),
        false
      );
    })
  );
});
