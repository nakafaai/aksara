import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import {
  type TryoutHistoryMigrationProof,
  verifyTryoutHistoryMigrationProof,
} from "@nakafa/aksara-contracts/migration/tryout/history/proof";
import {
  type SignedTryoutHistoryMigrationReceipt,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  type TryoutHistoryMigrationReceiptPayload,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { verifySignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/verify";
import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";

import { migrationFail } from "#publisher/migration/tryout/error";
import type { PublicationTarget } from "#publisher/publication/spec";
import type { PublicationSigner } from "#publisher/signing/service";

type CompletedStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "completed" }
>;
type ReceiptStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "cleaned" | "sealed" }
>;

/** Authenticates a terminal receipt through the configured trusted-key seam. */
export const authenticateMigrationReceipt = Effect.fn(
  "AksaraPublisher.authenticateTryoutMigrationReceipt"
)((receipt: SignedTryoutHistoryMigrationReceipt) =>
  verifySignedTryoutHistoryMigrationReceipt(receipt).pipe(
    Effect.mapError(() => migrationFail("receipt-evidence"))
  )
);

/** Checks a target state is exactly bound to one authenticated receipt. */
function hasReceiptEvidence(
  status: ReceiptStatus,
  receipt: SignedTryoutHistoryMigrationReceipt
) {
  if (
    canonicalizeSignedTryoutHistoryMigrationReceipt(status.receipt) !==
    canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)
  ) {
    return false;
  }
  if (status.phase === "cleaned") {
    return status.migrationId === receipt.payload.migrationId;
  }
  return (
    status.migrationId === receipt.payload.migrationId &&
    status.planHash === receipt.payload.planHash &&
    status.sourceSnapshotId === receipt.payload.sourceSnapshotId &&
    status.targetBundleHash === receipt.payload.targetBundleHash &&
    status.targetSnapshotId === receipt.payload.targetSnapshotId &&
    JSON.stringify(status.completion) ===
      JSON.stringify(receipt.payload.completion)
  );
}

/** Signs and authenticates the exact public-safe terminal completion facts. */
export const makeMigrationReceipt = Effect.fn(
  "AksaraPublisher.makeTryoutMigrationReceipt"
)(function* (signer: PublicationSigner, status: CompletedStatus) {
  const payload: TryoutHistoryMigrationReceiptPayload = {
    completion: status.completion,
    format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
    migrationId: status.migrationId,
    planHash: status.planHash,
    sourceSnapshotId: status.sourceSnapshotId,
    targetBundleHash: status.targetBundleHash,
    targetSnapshotId: status.targetSnapshotId,
  };
  const receipt = yield* signer.signTryoutHistoryMigrationReceipt(payload);
  return yield* authenticateMigrationReceipt(receipt);
});

/** Persists one authenticated receipt before cleanup becomes reachable. */
export const sealMigrationReceipt = Effect.fn(
  "AksaraPublisher.sealTryoutMigrationReceipt"
)(function* (
  target: typeof PublicationTarget.Service,
  receipt: SignedTryoutHistoryMigrationReceipt
) {
  const authenticated = yield* authenticateMigrationReceipt(receipt);
  const value = yield* target.migrateTryoutHistory({
    command: "seal",
    operation: "migrateTryoutHistory",
    receipt: authenticated,
    releaseId: authenticated.payload.migrationId,
  });
  if (
    value.command !== "seal" ||
    (value.status.phase !== "sealed" && value.status.phase !== "cleaned") ||
    !hasReceiptEvidence(value.status, authenticated)
  ) {
    return yield* migrationFail("receipt-evidence");
  }
  return authenticated;
});

/** Repeats only progressing bounded cleanup pages until legacy state is gone. */
export const cleanupMigrationReceipt = Effect.fn(
  "AksaraPublisher.cleanupTryoutMigrationReceipt"
)(function* (
  target: typeof PublicationTarget.Service,
  receipt: SignedTryoutHistoryMigrationReceipt,
  proof: TryoutHistoryMigrationProof
) {
  const authenticated = yield* authenticateMigrationReceipt(receipt);
  yield* verifyTryoutHistoryMigrationProof(authenticated, proof).pipe(
    Effect.mapError(() => migrationFail("receipt-evidence"))
  );
  const {
    payload: {
      completion: { cleanupLimit },
    },
  } = authenticated;
  let deletedRows = 0;
  let isCleaned = false;
  yield* Effect.whileLoop({
    body: () =>
      Effect.gen(function* () {
        const value = yield* target.migrateTryoutHistory({
          command: "cleanup",
          operation: "migrateTryoutHistory",
          proof,
          receipt: authenticated,
          releaseId: authenticated.payload.migrationId,
        });
        if (
          value.command !== "cleanup" ||
          (value.status.phase !== "sealed" &&
            value.status.phase !== "cleaned") ||
          !hasReceiptEvidence(value.status, authenticated)
        ) {
          return yield* migrationFail("receipt-evidence");
        }
        deletedRows += value.deleted;
        if (deletedRows > cleanupLimit) {
          return yield* migrationFail("cleanup-limit");
        }
        if (value.status.phase === "sealed" && value.deleted === 0) {
          return yield* migrationFail("cleanup-progress");
        }
        return value.status.phase === "cleaned";
      }),
    step: (completed) => {
      isCleaned = completed;
    },
    while: () => !isCleaned,
  });
  return authenticated;
});
