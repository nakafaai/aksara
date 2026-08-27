import { Effect, Schema } from "effect";
import { hashText } from "#contracts/hash/text";
import {
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "#contracts/migration/tryout/history/canonical";
import type { SignedTryoutHistoryMigrationReceipt } from "#contracts/migration/tryout/history/spec";

/** Public repository that permanently owns the migration receipt. */
export const TRYOUT_HISTORY_MIGRATION_REPOSITORY = "nakafaai/aksara";

/** Sole canonical asset name retained by the immutable migration release. */
export const TRYOUT_HISTORY_MIGRATION_RECEIPT_ASSET = "receipt.json";

/** Externally authenticated identity required before destructive cleanup. */
export const TryoutHistoryMigrationProofSchema = Schema.Struct({
  assetHash: Sha256HashSchema,
  sourceSha: GitCommitShaSchema,
});
export type TryoutHistoryMigrationProof =
  typeof TryoutHistoryMigrationProofSchema.Type;

/** The canonical receipt asset could not be content-addressed. */
export class TryoutHistoryMigrationProofHashError extends Schema.TaggedError<TryoutHistoryMigrationProofHashError>()(
  "TryoutHistoryMigrationProofHashError",
  { migrationId: ReleaseIdSchema }
) {}

/** External proof does not identify the exact signed receipt asset. */
export class TryoutHistoryMigrationProofIdentityError extends Schema.TaggedError<TryoutHistoryMigrationProofIdentityError>()(
  "TryoutHistoryMigrationProofIdentityError",
  { migrationId: ReleaseIdSchema }
) {}

/** Derives the sole immutable GitHub release tag for one migration. */
export function tryoutHistoryMigrationReleaseTag(migrationId: ReleaseId) {
  return `migration-${migrationId}`;
}

/** Hashes the exact newline-terminated bytes published as the release asset. */
export const hashTryoutHistoryMigrationReceiptAsset = Effect.fn(
  "AksaraContracts.hashTryoutHistoryMigrationReceiptAsset"
)((receipt: SignedTryoutHistoryMigrationReceipt) =>
  hashText(
    `${canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)}\n`
  ).pipe(
    Effect.mapError(
      () =>
        new TryoutHistoryMigrationProofHashError({
          migrationId: receipt.payload.migrationId,
        })
    )
  )
);

/** Requires external proof to address the exact canonical receipt bytes. */
export const verifyTryoutHistoryMigrationProof = Effect.fn(
  "AksaraContracts.verifyTryoutHistoryMigrationProof"
)(function* (
  receipt: SignedTryoutHistoryMigrationReceipt,
  proof: TryoutHistoryMigrationProof
) {
  const assetHash = yield* hashTryoutHistoryMigrationReceiptAsset(receipt);
  if (assetHash !== proof.assetHash) {
    return yield* new TryoutHistoryMigrationProofIdentityError({
      migrationId: receipt.payload.migrationId,
    });
  }
  return proof;
});
