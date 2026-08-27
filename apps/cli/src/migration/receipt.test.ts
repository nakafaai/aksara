import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, FileSystem, Layer, Path } from "effect";

import {
  MigrationReceiptReadError,
  MigrationReceiptWriteError,
  readMigrationReceipt,
  writeMigrationReceipt,
} from "#cli/migration/receipt";
import {
  migrationId,
  migrationReceipt,
  migrationReceiptBytes,
  migrationResolver,
} from "#test/migration";

layer(
  Layer.merge(
    NodeServices.layer,
    Layer.succeed(ContentVerificationKeyResolver, migrationResolver)
  )
)("try-out migration receipt storage", (it) => {
  it.effect("writes and rereads one exclusive canonical receipt", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-receipt-",
      });
      const receiptPath = path.join(root, "receipt.json");

      yield* writeMigrationReceipt(receiptPath, migrationReceipt);
      yield* writeMigrationReceipt(receiptPath, migrationReceipt);

      assert.deepStrictEqual(
        yield* readMigrationReceipt(receiptPath, migrationId),
        migrationReceipt
      );
      assert.strictEqual(
        yield* fileSystem.readFileString(receiptPath, "utf8"),
        migrationReceiptBytes
      );
      assert.strictEqual(
        (yield* fileSystem.stat(receiptPath)).mode % 0o1000,
        0o600
      );
      assert.deepStrictEqual(yield* fileSystem.readDirectory(root), [
        "receipt.json",
      ]);
    })
  );

  it.effect("rejects conflicting receipt bytes without overwriting them", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-receipt-",
      });
      const receiptPath = path.join(root, "receipt.json");
      yield* fileSystem.writeFileString(receiptPath, "existing\n");

      const failure = yield* writeMigrationReceipt(
        receiptPath,
        migrationReceipt
      ).pipe(Effect.flip);

      assert.instanceOf(failure, MigrationReceiptWriteError);
      assert.strictEqual(
        yield* fileSystem.readFileString(receiptPath, "utf8"),
        "existing\n"
      );
    })
  );

  it.effect("maps creation, linking, and readback failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-receipt-",
      });
      const paths = [
        path.join(root, "missing", "receipt.json"),
        path.join(root, "r".repeat(256)),
        yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-receipt-directory-",
        }),
      ];
      const failures = yield* Effect.forEach(paths, (receiptPath) =>
        writeMigrationReceipt(receiptPath, migrationReceipt).pipe(Effect.flip)
      );

      for (const failure of failures) {
        assert.instanceOf(failure, MigrationReceiptWriteError);
      }
    })
  );

  it.effect(
    "rejects missing, malformed, unauthenticated, and drifted receipts",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-receipt-",
        });
        const paths = {
          malformed: path.join(root, "malformed.json"),
          noncanonical: path.join(root, "noncanonical.json"),
          unauthenticated: path.join(root, "unauthenticated.json"),
          valid: path.join(root, "valid.json"),
        };
        yield* Effect.all([
          fileSystem.writeFileString(paths.malformed, "not-json\n"),
          fileSystem.writeFileString(
            paths.noncanonical,
            `${migrationReceiptBytes.trimEnd()} \n`
          ),
          fileSystem.writeFileString(
            paths.unauthenticated,
            `${JSON.stringify({
              ...migrationReceipt,
              receiptHash: `sha256:${"f".repeat(64)}`,
            })}\n`
          ),
          fileSystem.writeFileString(paths.valid, migrationReceiptBytes),
        ]);
        const effects = [
          readMigrationReceipt(path.join(root, "missing.json"), migrationId),
          readMigrationReceipt(paths.malformed, migrationId),
          readMigrationReceipt(paths.noncanonical, migrationId),
          readMigrationReceipt(paths.unauthenticated, migrationId),
          readMigrationReceipt(
            paths.valid,
            ReleaseIdSchema.make("another-migration")
          ),
        ];
        const failures = yield* Effect.forEach(effects, (effect) =>
          effect.pipe(Effect.flip)
        );

        for (const failure of failures) {
          assert.instanceOf(failure, MigrationReceiptReadError);
        }
      })
  );
});
