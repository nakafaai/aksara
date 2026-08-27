import { createHash } from "node:crypto";

import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { vi } from "vitest";

import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "#contracts/migration/tryout/history/canonical";
import {
  hashTryoutHistoryMigrationReceiptAsset,
  TryoutHistoryMigrationProofHashError,
  TryoutHistoryMigrationProofIdentityError,
  tryoutHistoryMigrationReleaseTag,
  verifyTryoutHistoryMigrationProof,
} from "#contracts/migration/tryout/history/proof";
import {
  SignedTryoutHistoryMigrationReceiptSchema,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
} from "#contracts/migration/tryout/history/spec";

const migrationId = ReleaseIdSchema.make("retained-history-v1");
const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const receipt = SignedTryoutHistoryMigrationReceiptSchema.make({
  keyId: SigningKeyIdSchema.make("content-test"),
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
    migrationId,
    planHash: hash,
    sourceSnapshotId: hash,
    targetBundleHash: hash,
    targetSnapshotId: hash,
  },
  receiptHash: hash,
  signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
});
const expectedHash = Sha256HashSchema.make(
  `sha256:${createHash("sha256")
    .update(`${canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)}\n`)
    .digest("hex")}`
);
const proof = {
  assetHash: expectedHash,
  sourceSha: GitCommitShaSchema.make("b".repeat(40)),
};

describe("try-out history migration external proof", () => {
  it.effect("addresses the exact canonical receipt asset", () =>
    Effect.gen(function* () {
      assert.strictEqual(
        yield* hashTryoutHistoryMigrationReceiptAsset(receipt),
        expectedHash
      );
      assert.deepStrictEqual(
        yield* verifyTryoutHistoryMigrationProof(receipt, proof),
        proof
      );
      assert.strictEqual(
        tryoutHistoryMigrationReleaseTag(migrationId),
        "migration-retained-history-v1"
      );
    })
  );

  it.effect("rejects proof for any other asset bytes", () =>
    Effect.gen(function* () {
      const failure = yield* verifyTryoutHistoryMigrationProof(receipt, {
        ...proof,
        assetHash: hash,
      }).pipe(Effect.flip);

      assert.instanceOf(failure, TryoutHistoryMigrationProofIdentityError);
    })
  );

  it.effect("maps receipt hashing failures to the proof domain", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "digest")
            .mockRejectedValueOnce(new TypeError("injected digest failure"))
        ),
        (mock) => Effect.sync(() => mock.mockRestore())
      );

      const failure = yield* hashTryoutHistoryMigrationReceiptAsset(
        receipt
      ).pipe(Effect.flip);

      assert.instanceOf(failure, TryoutHistoryMigrationProofHashError);
    })
  );
});
