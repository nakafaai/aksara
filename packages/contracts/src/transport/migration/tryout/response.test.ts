import { assert, describe, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  SignedTryoutHistoryMigrationReceiptSchema,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  type TryoutHistoryMigrationCompletion,
} from "#contracts/migration/tryout/history/spec";
import { TryoutHistoryMigrationStatusSchema } from "#contracts/transport/migration/tryout/response";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const migrationId = ReleaseIdSchema.make("retained-history-v1");
const completion: TryoutHistoryMigrationCompletion = {
  cleanupLimit: 19,
  completedAt: 1,
  migratedAttempts: 2,
  migratedScaleItems: 3,
  migratedScaleRuns: 4,
  migratedScaleVersions: 5,
  remainingMarkers: 0,
};
const receipt = SignedTryoutHistoryMigrationReceiptSchema.make({
  keyId: SigningKeyIdSchema.make("content-2026-08-27"),
  payload: {
    completion,
    format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
    migrationId,
    planHash: hash,
    sourceSnapshotId: hash,
    targetBundleHash: hash,
    targetSnapshotId: hash,
  },
  receiptHash: hash,
  signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
});
const counts = {
  artifactMapCount: 1,
  catalogMapCount: 2,
  migrationId,
  placementMapCount: 3,
  sourceSnapshotId: hash,
};
const authorization = {
  planHash: hash,
  targetBundleHash: hash,
  targetSnapshotId: hash,
};

/** Strictly checks a status without allowing fields from another phase. */
function accepts(input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(TryoutHistoryMigrationStatusSchema)(input, {
      onExcessProperty: "error",
    })
  );
}

describe("try-out history migration status", () => {
  it("accepts every coherent phase", () => {
    assert.strictEqual(accepts({ ...counts, phase: "staging" }), true);
    assert.strictEqual(
      accepts({ ...counts, deleted: 4, phase: "aborting" }),
      true
    );
    assert.strictEqual(
      accepts({ ...counts, ...authorization, phase: "ready" }),
      true
    );
    assert.strictEqual(
      accepts({ ...counts, ...authorization, phase: "running" }),
      true
    );
    assert.strictEqual(
      accepts({ ...counts, ...authorization, completion, phase: "completed" }),
      true
    );
    assert.strictEqual(
      accepts({
        ...counts,
        ...authorization,
        completion,
        phase: "sealed",
        receipt,
      }),
      true
    );
    assert.strictEqual(
      accepts({ migrationId, phase: "cleaned", receipt }),
      true
    );
  });

  it("rejects fields and omissions that contradict a phase", () => {
    assert.strictEqual(
      accepts({ ...counts, ...authorization, phase: "staging" }),
      false
    );
    assert.strictEqual(accepts({ ...counts, phase: "aborting" }), false);
    assert.strictEqual(accepts({ ...counts, phase: "ready" }), false);
    assert.strictEqual(
      accepts({ ...counts, ...authorization, phase: "completed" }),
      false
    );
    assert.strictEqual(
      accepts({ ...counts, ...authorization, completion, phase: "sealed" }),
      false
    );
    assert.strictEqual(
      accepts({ ...counts, phase: "cleaned", receipt }),
      false
    );
  });
});
