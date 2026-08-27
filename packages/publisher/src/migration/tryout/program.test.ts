import { generateKeyPairSync } from "node:crypto";

import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer, Redacted } from "effect";
import { vi } from "vitest";

import {
  cleanupRetainedTryoutHistory,
  migrateRetainedTryoutHistory,
} from "#publisher/migration/tryout/program";
import {
  PublicationSigningKey,
  PublicationTarget,
} from "#publisher/publication/spec";
import { failureReason } from "#test/migration/error";
import {
  completedMigrationStatus,
  fullMigrationTarget,
  migrationProof,
  migrationRejection,
  migrationStatusTarget,
  sealedMigrationStatus,
} from "#test/migration/flow";
import { otherHash } from "#test/migration/protocol";
import {
  migrationSigningKey,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus, readyMigrationStatus } from "#test/migration/status";
import { makePublicationTarget } from "#test/target";

vi.mock(
  "@nakafa/aksara-contracts/migration/tryout/history/source",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("@nakafa/aksara-contracts/migration/tryout/history/source")
      >();
    const { Effect: TestEffect } = await import("effect");
    return {
      ...original,
      verifyTryoutHistoryMigrationSource: (source: unknown) =>
        TestEffect.succeed(source),
    };
  }
);

vi.mock("@nakafa/aksara-contracts/history/decode", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-contracts/history/decode")
    >();
  const { Effect: TestEffect } = await import("effect");
  return {
    ...original,
    authenticateHistoricalArtifact: (artifact: unknown) =>
      TestEffect.succeed(artifact),
    verifyStoredTryoutInventory: (inventory: unknown) =>
      TestEffect.succeed(inventory),
  };
});

const nodeLayer = Layer.merge(NodeFileSystem.layer, NodePath.layer);
const migrationLayer = Layer.mergeAll(
  nodeLayer,
  Layer.succeed(ContentVerificationKeyResolver, migrationVerificationResolver),
  Layer.succeed(PublicationSigningKey, migrationSigningKey)
);
const otherKeys = generateKeyPairSync("ed25519");
const wrongResolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      otherKeys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});
const rotatedSigningKey = PublicationSigningKey.of({
  keyId: "rotated-migration-key",
  privateKeyPem: Redacted.make(
    otherKeys.privateKey.export({ format: "pem", type: "pkcs8" }).toString()
  ),
});

/** Runs the public migration program with its dynamic target seam. */
function run(target: typeof PublicationTarget.Service) {
  return migrateRetainedTryoutHistory(migrationId).pipe(
    Effect.provideService(PublicationTarget, target)
  );
}

/** Cleans one externally durable receipt through trusted-key seams. */
function cleanup(
  target: typeof PublicationTarget.Service,
  receipt: Parameters<typeof cleanupRetainedTryoutHistory>[0]
) {
  return Effect.gen(function* () {
    const proof = yield* migrationProof(receipt);
    return yield* cleanupRetainedTryoutHistory(receipt, proof);
  }).pipe(Effect.provideService(PublicationTarget, target));
}

layer(migrationLayer)("retained try-out history migration program", (it) => {
  it.effect("returns a receipt immediately for completed state", () =>
    Effect.gen(function* () {
      const exchange = migrationStatusTarget(completedMigrationStatus());
      const receipt = yield* run(exchange.target);

      assert.deepStrictEqual(exchange.commands, ["status", "seal"]);
      assert.strictEqual(receipt.payload.migrationId, migrationId);
      assert.strictEqual(receipt.payload.completion.remainingMarkers, 0);
    })
  );

  it.effect(
    "seals before returning and cleans only after external durability",
    () =>
      Effect.gen(function* () {
        const exchange = migrationStatusTarget(completedMigrationStatus());
        const receipt = yield* run(exchange.target);

        assert.deepStrictEqual(exchange.commands, ["status", "seal"]);
        const cleaned = yield* cleanup(exchange.target, receipt);

        assert.deepStrictEqual(exchange.commands, [
          "status",
          "seal",
          "cleanup",
        ]);
        assert.strictEqual(cleaned.receiptHash, receipt.receiptHash);
      })
  );

  it.effect(
    "recovers the exact sealed receipt after signing-key rotation",
    () =>
      Effect.gen(function* () {
        const initial = migrationStatusTarget(completedMigrationStatus());
        const receipt = yield* run(initial.target);
        const resumed = migrationStatusTarget(
          sealedMigrationStatus(receipt, completedMigrationStatus())
        );
        const recovered = yield* run(resumed.target).pipe(
          Effect.provideService(PublicationSigningKey, rotatedSigningKey)
        );

        assert.deepStrictEqual(initial.commands, ["status", "seal"]);
        assert.deepStrictEqual(resumed.commands, ["status"]);
        assert.deepStrictEqual(recovered, receipt);
      })
  );

  it.effect(
    "resumes an authorized migration without rebuilding target bytes",
    () =>
      Effect.gen(function* () {
        const ready = readyMigrationStatus({
          planHash: historicalSource.evidence.snapshot.snapshotId,
          targetBundleHash: historicalSource.evidence.snapshot.snapshotId,
          targetSnapshotId: historicalSource.evidence.snapshot.snapshotId,
        });
        const exchange = migrationStatusTarget(ready);
        const receipt = yield* run(exchange.target);

        assert.deepStrictEqual(exchange.commands, ["status", "run", "seal"]);
        assert.strictEqual(
          receipt.payload.targetSnapshotId,
          ready.targetSnapshotId
        );
      })
  );

  it.effect(
    "builds, spools, stages, authorizes, runs, and receipts missing state",
    () =>
      Effect.gen(function* () {
        const exchange = fullMigrationTarget();
        const receipt = yield* run(exchange.target);

        assert.deepStrictEqual(exchange.commands, [
          "status",
          "source",
          "initialize",
          "rowPage",
          "rowPage",
          "artifactBatch",
          "stageBundle",
          "stageArtifacts",
          "stageRows",
          "stageRows",
          "stageSnapshot",
          "stagePlan",
          "run",
          "seal",
        ]);
        assert.strictEqual(receipt.payload.completion.migratedAttempts, 1);
        assert.notStrictEqual(
          receipt.payload.targetBundleHash,
          historicalSource.evidence.snapshot.snapshotId
        );
      })
  );

  it.effect("preserves non-missing target rejection and command drift", () =>
    Effect.gen(function* () {
      const rejected = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.fail(migrationRejection("CONTENT_RELEASE_STATE")),
      });
      const rejection = yield* run(rejected).pipe(Effect.flip);
      const command = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.succeed({
            command: "source",
            migrationId,
            source: historicalSource,
          }),
      });
      const contradiction = yield* run(command).pipe(Effect.flip);

      assert.strictEqual(rejection._tag, "PublicationTargetRejectedError");
      assert.strictEqual(failureReason(contradiction), "command-evidence");
    })
  );

  it.effect("rejects incomplete and contradictory run evidence", () =>
    Effect.gen(function* () {
      const ready = readyMigrationStatus({
        planHash: otherHash,
        targetBundleHash: otherHash,
        targetSnapshotId: otherHash,
      });
      const runFailures = yield* Effect.forEach(
        [
          migrationStatus(),
          ready,
          completedMigrationStatus({
            ...ready,
            targetSnapshotId: historicalSource.evidence.snapshot.snapshotId,
          }),
        ],
        (status) =>
          run(migrationStatusTarget(ready, status).target).pipe(Effect.flip)
      );
      assert.deepStrictEqual(runFailures.map(failureReason), [
        "status-evidence",
        "status-evidence",
        "status-evidence",
      ]);
    })
  );

  it.effect("fails closed when the receipt key cannot be authenticated", () =>
    Effect.gen(function* () {
      const exchange = migrationStatusTarget(completedMigrationStatus());
      const failure = yield* run(exchange.target).pipe(
        Effect.provideService(ContentVerificationKeyResolver, wrongResolver),
        Effect.flip
      );

      assert.strictEqual(failureReason(failure), "receipt-evidence");
    })
  );
});
