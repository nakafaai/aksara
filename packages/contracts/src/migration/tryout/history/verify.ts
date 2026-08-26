import { Effect, Schema } from "effect";

import {
  canonicalizeTryoutHistoryMigrationPlanSigningInput,
  canonicalizeTryoutHistoryMigrationReceiptSigningInput,
} from "#contracts/migration/tryout/history/canonical";
import {
  hashTryoutHistoryMigrationPlan,
  hashTryoutHistoryMigrationReceipt,
} from "#contracts/migration/tryout/history/hash";
import {
  SignedTryoutHistoryMigrationPlanSchema,
  SignedTryoutHistoryMigrationReceiptSchema,
} from "#contracts/migration/tryout/history/spec";
import { verifyEd25519Signature } from "#contracts/signature/verify";

/** Unknown signed migration input violated its exact wire contract. */
export class TryoutHistoryMigrationDecodeError extends Schema.TaggedError<TryoutHistoryMigrationDecodeError>()(
  "TryoutHistoryMigrationDecodeError",
  { subject: Schema.Literals(["plan", "receipt"]) }
) {}

/** A signed migration object does not identify its canonical payload. */
export class TryoutHistoryMigrationIdentityError extends Schema.TaggedError<TryoutHistoryMigrationIdentityError>()(
  "TryoutHistoryMigrationIdentityError",
  { subject: Schema.Literals(["plan", "receipt"]) }
) {}

/** Strictly authenticates one active-key migration authorization plan. */
export const verifySignedTryoutHistoryMigrationPlan = Effect.fn(
  "AksaraContracts.verifySignedTryoutHistoryMigrationPlan"
)(function* (input: unknown) {
  const plan = yield* Schema.decodeUnknownEffect(
    SignedTryoutHistoryMigrationPlanSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () => new TryoutHistoryMigrationDecodeError({ subject: "plan" })
    )
  );
  const actualHash = yield* hashTryoutHistoryMigrationPlan(plan.payload);
  if (actualHash !== plan.planHash) {
    return yield* new TryoutHistoryMigrationIdentityError({ subject: "plan" });
  }
  yield* verifyEd25519Signature({
    keyId: plan.keyId,
    message: canonicalizeTryoutHistoryMigrationPlanSigningInput(
      plan.planHash,
      plan.payload
    ),
    signature: plan.signature,
    subject: "tryout-history-migration-plan",
  });
  return plan;
});

/** Strictly authenticates one public-safe terminal migration receipt. */
export const verifySignedTryoutHistoryMigrationReceipt = Effect.fn(
  "AksaraContracts.verifySignedTryoutHistoryMigrationReceipt"
)(function* (input: unknown) {
  const receipt = yield* Schema.decodeUnknownEffect(
    SignedTryoutHistoryMigrationReceiptSchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      () => new TryoutHistoryMigrationDecodeError({ subject: "receipt" })
    )
  );
  const actualHash = yield* hashTryoutHistoryMigrationReceipt(receipt.payload);
  if (actualHash !== receipt.receiptHash) {
    return yield* new TryoutHistoryMigrationIdentityError({
      subject: "receipt",
    });
  }
  yield* verifyEd25519Signature({
    keyId: receipt.keyId,
    message: canonicalizeTryoutHistoryMigrationReceiptSigningInput(
      receipt.receiptHash,
      receipt.payload
    ),
    signature: receipt.signature,
    subject: "tryout-history-migration-receipt",
  });
  return receipt;
});
