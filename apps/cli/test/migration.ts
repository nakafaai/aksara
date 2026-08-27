import { Buffer } from "node:buffer";
import { createHash, generateKeyPairSync, sign } from "node:crypto";

import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  canonicalizeSignedTryoutHistoryMigrationReceipt,
  canonicalizeTryoutHistoryMigrationReceiptPayload,
  canonicalizeTryoutHistoryMigrationReceiptSigningInput,
} from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import { TryoutHistoryMigrationProofSchema } from "@nakafa/aksara-contracts/migration/tryout/history/proof";
import {
  SignedTryoutHistoryMigrationReceiptSchema,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
  TryoutHistoryMigrationReceiptPayloadSchema,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";

const keys = generateKeyPairSync("ed25519");
const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
export const migrationId = ReleaseIdSchema.make("retained-history-v1");
const payload = Schema.decodeSync(TryoutHistoryMigrationReceiptPayloadSchema)({
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
});
const receiptHash = Sha256HashSchema.make(
  `sha256:${createHash("sha256")
    .update(canonicalizeTryoutHistoryMigrationReceiptPayload(payload))
    .digest("hex")}`
);

/** Authenticated public-safe migration receipt shared by CLI boundary tests. */
export const migrationReceipt = SignedTryoutHistoryMigrationReceiptSchema.make({
  keyId: SigningKeyIdSchema.make("content-test"),
  payload,
  receiptHash,
  signature: Ed25519SignatureSchema.make(
    sign(
      null,
      Buffer.from(
        canonicalizeTryoutHistoryMigrationReceiptSigningInput(
          receiptHash,
          payload
        ),
        "utf8"
      ),
      keys.privateKey
    ).toString("base64url")
  ),
});

export const migrationReceiptBytes = `${canonicalizeSignedTryoutHistoryMigrationReceipt(migrationReceipt)}\n`;

/** Immutable-release identity paired with the exact receipt fixture bytes. */
export const migrationProof = TryoutHistoryMigrationProofSchema.make({
  assetHash: Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(migrationReceiptBytes).digest("hex")}`
  ),
  sourceSha: GitCommitShaSchema.make("b".repeat(40)),
});

/** Test-only resolver paired with the signed public migration receipt. */
export const migrationResolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      Schema.decodeSync(Schema.String)(
        keys.publicKey.export({ format: "pem", type: "spki" }).toString()
      )
    ),
});
