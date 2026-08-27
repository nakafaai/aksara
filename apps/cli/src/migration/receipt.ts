import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import type { SignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { verifySignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/verify";
import { Effect, FileSystem, Path, Schema } from "effect";

/** The public receipt could not be read and authenticated exactly. */
export class MigrationReceiptReadError extends Schema.TaggedError<MigrationReceiptReadError>()(
  "MigrationReceiptReadError",
  {}
) {}

/** The public receipt could not be written to its exclusive destination. */
export class MigrationReceiptWriteError extends Schema.TaggedError<MigrationReceiptWriteError>()(
  "MigrationReceiptWriteError",
  {}
) {}

/** Returns the one canonical newline-terminated receipt representation. */
function receiptBytes(receipt: SignedTryoutHistoryMigrationReceipt) {
  return `${canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)}\n`;
}

/** Durably writes and rereads one immutable receipt without overwriting it. */
export const writeMigrationReceipt = Effect.fn(
  "AksaraCli.writeMigrationReceipt"
)(function* (
  receiptPath: string,
  receipt: SignedTryoutHistoryMigrationReceipt
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const bytes = receiptBytes(receipt);
  const encoded = new TextEncoder().encode(bytes);
  const directory = path.dirname(receiptPath);
  yield* Effect.scoped(
    Effect.gen(function* () {
      const temporaryPath = yield* fileSystem.makeTempFileScoped({
        directory,
        prefix: ".aksara-receipt-",
      });
      yield* fileSystem.chmod(temporaryPath, 0o600);
      const file = yield* fileSystem.open(temporaryPath, { flag: "w" });
      yield* file.writeAll(encoded);
      yield* file.sync;
      yield* fileSystem
        .link(temporaryPath, receiptPath)
        .pipe(
          Effect.catchTag("PlatformError", (error) =>
            error.reason._tag === "AlreadyExists"
              ? Effect.void
              : Effect.fail(new MigrationReceiptWriteError())
          )
        );
      const parent = yield* fileSystem.open(directory, { flag: "r" });
      yield* parent.sync;
    }).pipe(Effect.mapError(() => new MigrationReceiptWriteError()))
  );
  const persisted = yield* fileSystem
    .readFileString(receiptPath, "utf8")
    .pipe(Effect.mapError(() => new MigrationReceiptWriteError()));
  if (persisted !== bytes) {
    return yield* new MigrationReceiptWriteError();
  }
  return receipt;
});

/** Reads only one canonical authenticated receipt for the expected migration. */
export const readMigrationReceipt = Effect.fn("AksaraCli.readMigrationReceipt")(
  (receiptPath: string, migrationId: ReleaseId) =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const bytes = yield* fileSystem.readFileString(receiptPath, "utf8");
      const input = yield* Effect.try({
        catch: () => new MigrationReceiptReadError(),
        try: (): unknown => JSON.parse(bytes),
      });
      const receipt = yield* verifySignedTryoutHistoryMigrationReceipt(input);
      if (
        receipt.payload.migrationId !== migrationId ||
        receiptBytes(receipt) !== bytes
      ) {
        return yield* new MigrationReceiptReadError();
      }
      return receipt;
    }).pipe(Effect.mapError(() => new MigrationReceiptReadError()))
);
