import { describe, expect, it } from "@effect/vitest";
import {
  TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  type TryoutHistoryMigrationPlanPayload,
  type TryoutHistoryMigrationReceiptPayload,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import {
  verifySignedTryoutHistoryMigrationPlan,
  verifySignedTryoutHistoryMigrationReceipt,
} from "@nakafa/aksara-contracts/migration/tryout/history/verify";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { vi } from "vitest";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { historicalSource, migrationId } from "#test/migration/source";
import { makeMigrationTarget } from "#test/migration/target";

const cryptoFailure = vi.hoisted(() => ({ failNext: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    sign: (...parameters: Parameters<typeof crypto.sign>) => {
      if (cryptoFailure.failNext) {
        cryptoFailure.failNext = false;
        throw new Error("Test-controlled migration signing failure.");
      }
      return crypto.sign(...parameters);
    },
  };
});

/** Builds the exact plan and public-safe receipt payload pair. */
const payloads = Effect.fn("AksaraPublisherTest.migrationPayloads")(
  function* () {
    const { prepared } = yield* makeMigrationTarget();
    const plan: TryoutHistoryMigrationPlanPayload = {
      format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
      migrationId,
      source: historicalSource.evidence,
      target: prepared.evidence,
    };
    const receipt: TryoutHistoryMigrationReceiptPayload = {
      completion: {
        cleanupLimit: 18,
        completedAt: 1,
        migratedAttempts: 1,
        migratedScaleItems: 1,
        migratedScaleRuns: 1,
        migratedScaleVersions: 1,
        remainingMarkers: 0,
      },
      format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
      migrationId,
      planHash: (yield* migrationSigner.signTryoutHistoryMigrationPlan(plan))
        .planHash,
      sourceSnapshotId: historicalSource.evidence.snapshot.snapshotId,
      targetBundleHash: prepared.evidence.bundleHash,
      targetSnapshotId: prepared.evidence.snapshot.snapshotId,
    };
    return { plan, receipt };
  }
);

describe("try-out history migration signing", () => {
  it.effect("signs and authenticates the exact plan and terminal receipt", () =>
    Effect.gen(function* () {
      const { plan, receipt } = yield* payloads();
      const signedPlan =
        yield* migrationSigner.signTryoutHistoryMigrationPlan(plan);
      const signedReceipt =
        yield* migrationSigner.signTryoutHistoryMigrationReceipt(receipt);
      const verified = yield* Effect.all([
        verifySignedTryoutHistoryMigrationPlan(signedPlan),
        verifySignedTryoutHistoryMigrationReceipt(signedReceipt),
      ]).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        )
      );

      expect(verified[0].payload).toEqual(plan);
      expect(verified[1].payload).toEqual(receipt);
      expect(signedPlan.keyId).toBe(signedReceipt.keyId);
    })
  );

  it.effect(
    "maps plan and receipt signing failures to their exact stages",
    () =>
      Effect.gen(function* () {
        const { plan, receipt } = yield* payloads();
        cryptoFailure.failNext = true;
        const planFailure = yield* migrationSigner
          .signTryoutHistoryMigrationPlan(plan)
          .pipe(Effect.flip);
        cryptoFailure.failNext = true;
        const receiptFailure = yield* migrationSigner
          .signTryoutHistoryMigrationReceipt(receipt)
          .pipe(Effect.flip);

        expect(planFailure).toMatchObject({
          _tag: "ContentSigningError",
          stage: "tryout-history-migration-plan",
        });
        expect(receiptFailure).toMatchObject({
          _tag: "ContentSigningError",
          stage: "tryout-history-migration-receipt",
        });
      })
  );
});
