import type { KeyObject } from "node:crypto";

import type { SigningKeyId } from "@nakafa/aksara-contracts/ids";
import {
  canonicalizeTryoutHistoryMigrationPlanSigningInput,
  canonicalizeTryoutHistoryMigrationReceiptSigningInput,
} from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import {
  hashTryoutHistoryMigrationPlan,
  hashTryoutHistoryMigrationReceipt,
  type TryoutHistoryMigrationHashError,
} from "@nakafa/aksara-contracts/migration/tryout/history/hash";
import {
  type SignedTryoutHistoryMigrationPlan,
  SignedTryoutHistoryMigrationPlanSchema,
  type SignedTryoutHistoryMigrationReceipt,
  SignedTryoutHistoryMigrationReceiptSchema,
  type TryoutHistoryMigrationPlanPayload,
  type TryoutHistoryMigrationReceiptPayload,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { Effect } from "effect";

import { signCanonicalInput } from "#publisher/signing/canonical";
import type { ContentSigningError } from "#publisher/signing/error";

/** Signing capability owned by the retained-history migration domain. */
export interface TryoutHistoryMigrationSigner {
  /** Signs one exact lossless retained-history migration plan. */
  readonly signTryoutHistoryMigrationPlan: (
    payload: TryoutHistoryMigrationPlanPayload
  ) => Effect.Effect<
    SignedTryoutHistoryMigrationPlan,
    ContentSigningError | TryoutHistoryMigrationHashError
  >;
  /** Signs one public-safe terminal migration receipt. */
  readonly signTryoutHistoryMigrationReceipt: (
    payload: TryoutHistoryMigrationReceiptPayload
  ) => Effect.Effect<
    SignedTryoutHistoryMigrationReceipt,
    ContentSigningError | TryoutHistoryMigrationHashError
  >;
}

/** Hashes and signs one exact retained-history migration plan. */
function signPlan(
  keyId: SigningKeyId,
  privateKey: KeyObject,
  payload: TryoutHistoryMigrationPlanPayload
) {
  return hashTryoutHistoryMigrationPlan(payload).pipe(
    Effect.flatMap((planHash) =>
      signCanonicalInput(
        privateKey,
        canonicalizeTryoutHistoryMigrationPlanSigningInput(planHash, payload),
        "tryout-history-migration-plan"
      ).pipe(
        Effect.map((signature) =>
          SignedTryoutHistoryMigrationPlanSchema.make({
            keyId,
            payload,
            planHash,
            signature,
          })
        )
      )
    )
  );
}

/** Hashes and signs one public-safe terminal migration receipt. */
function signReceipt(
  keyId: SigningKeyId,
  privateKey: KeyObject,
  payload: TryoutHistoryMigrationReceiptPayload
) {
  return hashTryoutHistoryMigrationReceipt(payload).pipe(
    Effect.flatMap((receiptHash) =>
      signCanonicalInput(
        privateKey,
        canonicalizeTryoutHistoryMigrationReceiptSigningInput(
          receiptHash,
          payload
        ),
        "tryout-history-migration-receipt"
      ).pipe(
        Effect.map((signature) =>
          SignedTryoutHistoryMigrationReceiptSchema.make({
            keyId,
            payload,
            receiptHash,
            signature,
          })
        )
      )
    )
  );
}

/** Builds migration signing operations from one validated Ed25519 key. */
export function makeTryoutHistoryMigrationSigner(
  keyId: SigningKeyId,
  privateKey: KeyObject
): TryoutHistoryMigrationSigner {
  return {
    /** Signs one exact lossless retained-history migration plan. */
    signTryoutHistoryMigrationPlan: Effect.fn(
      "AksaraPublisher.signTryoutHistoryMigrationPlan"
    )((payload) => signPlan(keyId, privateKey, payload)),
    /** Signs one public-safe terminal migration receipt. */
    signTryoutHistoryMigrationReceipt: Effect.fn(
      "AksaraPublisher.signTryoutHistoryMigrationReceipt"
    )((payload) => signReceipt(keyId, privateKey, payload)),
  };
}
