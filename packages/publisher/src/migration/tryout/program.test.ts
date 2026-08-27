import { generateKeyPairSync } from "node:crypto";

import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer } from "effect";
import { vi } from "vitest";

import { migrateRetainedTryoutHistory } from "#publisher/migration/tryout/program";
import {
  PublicationSigningKey,
  PublicationTarget,
} from "#publisher/publication/spec";
import { failureReason } from "#test/migration/error";
import {
  completedMigrationStatus,
  fullMigrationTarget,
  migrationRejection,
  migrationStatusTarget,
} from "#test/migration/flow";
import { otherHash } from "#test/migration/protocol";
import {
  migrationSigningKey,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus } from "#test/migration/status";
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
const otherKeys = generateKeyPairSync("ed25519");
const wrongResolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      otherKeys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});

/** Runs the public migration program with every explicit infrastructure seam. */
function run(
  target: typeof PublicationTarget.Service,
  resolver = migrationVerificationResolver
) {
  return migrateRetainedTryoutHistory(migrationId).pipe(
    Effect.provideService(PublicationTarget, target),
    Effect.provideService(PublicationSigningKey, migrationSigningKey),
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.provide(nodeLayer)
  );
}

describe("retained try-out history migration program", () => {
  it.effect("returns a receipt immediately for completed state", () =>
    Effect.gen(function* () {
      const exchange = migrationStatusTarget(completedMigrationStatus());
      const receipt = yield* run(exchange.target);

      expect(exchange.commands).toEqual(["status"]);
      expect(receipt.payload.migrationId).toBe(migrationId);
      expect(receipt.payload.completion.remainingMarkers).toBe(0);
    })
  );

  it.effect(
    "resumes an authorized migration without rebuilding target bytes",
    () =>
      Effect.gen(function* () {
        const ready = migrationStatus({
          phase: "ready",
          planHash: historicalSource.evidence.snapshot.snapshotId,
          targetBundleHash: historicalSource.evidence.snapshot.snapshotId,
          targetSnapshotId: historicalSource.evidence.snapshot.snapshotId,
        });
        const exchange = migrationStatusTarget(ready);
        const receipt = yield* run(exchange.target);

        expect(exchange.commands).toEqual(["status", "run"]);
        expect(receipt.payload.targetSnapshotId).toBe(ready.targetSnapshotId);
      })
  );

  it.effect(
    "builds, spools, stages, authorizes, runs, and receipts missing state",
    () =>
      Effect.gen(function* () {
        const exchange = fullMigrationTarget();
        const receipt = yield* run(exchange.target);

        expect(exchange.commands).toEqual([
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
        ]);
        expect(receipt.payload.completion.migratedAttempts).toBe(1);
        expect(receipt.payload.targetBundleHash).not.toBe(
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

      expect(rejection._tag).toBe("PublicationTargetRejectedError");
      expect(failureReason(contradiction)).toBe("command-evidence");
    })
  );

  it.effect("rejects incomplete run and receipt evidence", () =>
    Effect.gen(function* () {
      const ready = migrationStatus({
        phase: "ready",
        planHash: otherHash,
        targetBundleHash: otherHash,
        targetSnapshotId: otherHash,
      });
      const runFailures = yield* Effect.forEach(
        [
          migrationStatus({ phase: "ready" }),
          migrationStatus({ completion: null, phase: "completed" }),
          completedMigrationStatus({
            ...ready,
            targetSnapshotId: historicalSource.evidence.snapshot.snapshotId,
          }),
        ],
        (status) =>
          run(migrationStatusTarget(ready, status).target).pipe(Effect.flip)
      );
      const terminal = completedMigrationStatus();
      const receiptFailures = yield* Effect.forEach(
        [
          migrationStatus({ ...terminal, completion: null }),
          migrationStatus({ ...terminal, planHash: null }),
          migrationStatus({ ...terminal, targetBundleHash: null }),
          migrationStatus({ ...terminal, targetSnapshotId: null }),
        ],
        (status) => run(migrationStatusTarget(status).target).pipe(Effect.flip)
      );

      expect(runFailures.map(failureReason)).toEqual([
        "status-evidence",
        "status-evidence",
        "status-evidence",
      ]);
      expect(receiptFailures.map(failureReason)).toEqual([
        "receipt-evidence",
        "receipt-evidence",
        "receipt-evidence",
        "receipt-evidence",
      ]);
    })
  );

  it.effect("fails closed when the receipt key cannot be authenticated", () =>
    Effect.gen(function* () {
      const exchange = migrationStatusTarget(completedMigrationStatus());
      const failure = yield* run(exchange.target, wrongResolver).pipe(
        Effect.flip
      );

      expect(failureReason(failure)).toBe("receipt-evidence");
    })
  );
});
