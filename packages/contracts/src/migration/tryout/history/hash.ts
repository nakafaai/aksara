import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  canonicalizeTryoutHistoryMigrationPlanPayload,
  canonicalizeTryoutHistoryMigrationReceiptPayload,
} from "#contracts/migration/tryout/history/canonical";
import type {
  TryoutHistoryMigrationPlanPayload,
  TryoutHistoryMigrationReceiptPayload,
} from "#contracts/migration/tryout/history/spec";

/** SHA-256 failed while identifying one signed migration object. */
export class TryoutHistoryMigrationHashError extends Schema.TaggedError<TryoutHistoryMigrationHashError>()(
  "TryoutHistoryMigrationHashError",
  {
    migrationId: ReleaseIdSchema,
    subject: Schema.Literals(["plan", "receipt"]),
  }
) {}

/** Computes the immutable identity of one migration authorization plan. */
export const hashTryoutHistoryMigrationPlan = Effect.fn(
  "AksaraContracts.hashTryoutHistoryMigrationPlan"
)((payload: TryoutHistoryMigrationPlanPayload) =>
  hashText(canonicalizeTryoutHistoryMigrationPlanPayload(payload)).pipe(
    Effect.mapError(
      () =>
        new TryoutHistoryMigrationHashError({
          migrationId: payload.migrationId,
          subject: "plan",
        })
    )
  )
);

/** Computes the immutable identity of one terminal migration receipt. */
export const hashTryoutHistoryMigrationReceipt = Effect.fn(
  "AksaraContracts.hashTryoutHistoryMigrationReceipt"
)((payload: TryoutHistoryMigrationReceiptPayload) =>
  hashText(canonicalizeTryoutHistoryMigrationReceiptPayload(payload)).pipe(
    Effect.mapError(
      () =>
        new TryoutHistoryMigrationHashError({
          migrationId: payload.migrationId,
          subject: "receipt",
        })
    )
  )
);
