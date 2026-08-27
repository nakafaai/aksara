import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import {
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { canonicalizeSignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/canonical";
import {
  type SignedTryoutHistoryMigrationReceipt,
  SignedTryoutHistoryMigrationReceiptSchema,
  TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { Effect, FileSystem, Path } from "effect";
import { vi } from "vitest";

import { runTryoutMigrationCommand } from "#cli/migration/tryout";

interface Calls {
  cleanupBytes: string | undefined;
  cleanupReceiptHash: string | undefined;
  endpoint: string | undefined;
  phases: string[];
  receipt: SignedTryoutHistoryMigrationReceipt | undefined;
  receiptPath: string | undefined;
  releaseId: string | undefined;
  verifiedKey: boolean;
}

const calls = vi.hoisted<Calls>(() => ({
  cleanupBytes: undefined,
  cleanupReceiptHash: undefined,
  endpoint: undefined,
  phases: [],
  receipt: undefined,
  receiptPath: undefined,
  releaseId: undefined,
  verifiedKey: false,
}));

vi.mock("@nakafa/aksara-publisher/migration/tryout/program", async () => {
  const { Effect: TestEffect, FileSystem: TestFileSystem } = await import(
    "effect"
  );
  return {
    /** Proves the durable receipt exists before destructive cleanup. */
    cleanupRetainedTryoutHistory: (
      migrationReceipt: SignedTryoutHistoryMigrationReceipt
    ) =>
      TestEffect.gen(function* () {
        const fileSystem = yield* TestFileSystem.FileSystem;
        if (calls.receiptPath === undefined) {
          return yield* TestEffect.die("Expected one receipt path fixture.");
        }
        calls.cleanupBytes = yield* fileSystem.readFileString(
          calls.receiptPath,
          "utf8"
        );
        calls.cleanupReceiptHash = migrationReceipt.receiptHash;
        calls.phases.push("cleanup");
        return migrationReceipt;
      }),
    /** Returns the exact server-sealed receipt before external persistence. */
    migrateRetainedTryoutHistory: (releaseId: string) => {
      calls.releaseId = releaseId;
      calls.phases.push("seal");
      return calls.receipt === undefined
        ? TestEffect.die("Expected one migration receipt fixture.")
        : TestEffect.succeed(calls.receipt);
    },
  };
});

vi.mock("@nakafa/aksara-publisher/target/http", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { makeProductionTarget } = await import("#test/target");
  return {
    /** Captures target configuration without opening a network connection. */
    makeHttpPublicationTarget: (config: { readonly endpoint: URL }) => {
      calls.endpoint = config.endpoint.href;
      return TestEffect.succeed(makeProductionTarget(() => ({})));
    },
  };
});

vi.mock("#cli/environment/read", async () => {
  const { Effect: TestEffect, Redacted } = await import("effect");
  const publication = {
    publicationEndpoint: new URL("https://content.example.test/publish"),
    publicationToken: Redacted.make("publication-token"),
  };
  return {
    /** Supplies isolated signing material for the migration command. */
    readProductionEnvironment: () =>
      TestEffect.succeed({
        ...publication,
        derivedPublicKeyPem: "test-public-key",
        keyId: "content-2026-08-27",
        privateKeyPem: Redacted.make("test-private-key"),
      }),
    /** Supplies the publication ingress shared by production commands. */
    readPublicationEnvironment: () => TestEffect.succeed(publication),
  };
});

vi.mock("#cli/keys", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records that active signing identity is checked before migration. */
    verifySigningKey: () => {
      calls.verifiedKey = true;
      return TestEffect.void;
    },
  };
});

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const receipt = SignedTryoutHistoryMigrationReceiptSchema.make({
  keyId: SigningKeyIdSchema.make("content-2026-08-27"),
  payload: {
    completion: {
      completedAt: 1,
      migratedAttempts: 2,
      migratedScaleItems: 3,
      migratedScaleRuns: 4,
      migratedScaleVersions: 5,
      remainingMarkers: 0,
    },
    format: TRYOUT_HISTORY_MIGRATION_RECEIPT_FORMAT,
    migrationId: ReleaseIdSchema.make("retained-history-v1"),
    planHash: hash,
    sourceSnapshotId: hash,
    targetBundleHash: hash,
    targetSnapshotId: hash,
  },
  receiptHash: hash,
  signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
});
const receiptBytes = `${canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)}\n`;

/** Resets mutable mock evidence for one command execution. */
function resetCalls(receiptPath: string) {
  calls.cleanupBytes = undefined;
  calls.cleanupReceiptHash = undefined;
  calls.endpoint = undefined;
  calls.phases = [];
  calls.receipt = receipt;
  calls.receiptPath = receiptPath;
  calls.releaseId = undefined;
  calls.verifiedKey = false;
}

layer(NodeServices.layer)("try-out history migration command", (it) => {
  it.effect("writes one exclusive canonical public-safe receipt", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "receipt.json");
      resetCalls(receiptPath);

      yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      });
      const contents = yield* fileSystem.readFileString(receiptPath, "utf8");
      const receiptInfo = yield* fileSystem.stat(receiptPath);

      assert.strictEqual(contents, receiptBytes);
      assert.strictEqual(receiptInfo.mode % 0o1000, 0o600);
      assert.deepStrictEqual(yield* fileSystem.readDirectory(root), [
        "receipt.json",
      ]);
      assert.strictEqual(calls.cleanupBytes, receiptBytes);
      assert.strictEqual(calls.cleanupReceiptHash, receipt.receiptHash);
      assert.deepStrictEqual(calls.phases, ["seal", "cleanup"]);
      assert.strictEqual(calls.releaseId, receipt.payload.migrationId);
      assert.strictEqual(
        calls.endpoint,
        "https://content.example.test/publish"
      );
      assert.strictEqual(calls.verifiedKey, true);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("accepts an exact existing receipt and resumes completion", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "receipt.json");
      resetCalls(receiptPath);
      yield* fileSystem.writeFileString(receiptPath, receiptBytes);

      yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      });

      assert.strictEqual(calls.cleanupBytes, receiptBytes);
      assert.strictEqual(calls.cleanupReceiptHash, receipt.receiptHash);
      assert.deepStrictEqual(calls.phases, ["seal", "cleanup"]);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("rejects a conflicting existing receipt without cleanup", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "receipt.json");
      resetCalls(receiptPath);
      yield* fileSystem.writeFileString(receiptPath, "existing\n");

      const failure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      }).pipe(Effect.flip);

      assert.strictEqual(failure._tag, "ProductionError");
      assert.strictEqual(failure.failure, "MigrationReceiptWriteError");
      assert.strictEqual(failure.stage, "migration");
      assert.strictEqual(
        yield* fileSystem.readFileString(receiptPath, "utf8"),
        "existing\n"
      );
      assert.strictEqual(calls.cleanupBytes, undefined);
      assert.deepStrictEqual(calls.phases, ["seal"]);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("maps a receipt creation failure without cleanup", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "missing", "receipt.json");
      resetCalls(receiptPath);

      const failure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      }).pipe(Effect.flip);

      assert.strictEqual(failure._tag, "ProductionError");
      assert.strictEqual(failure.failure, "MigrationReceiptWriteError");
      assert.strictEqual(failure.stage, "migration");
      assert.strictEqual(calls.cleanupBytes, undefined);
      assert.deepStrictEqual(calls.phases, ["seal"]);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("maps a receipt link failure without cleanup", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "r".repeat(256));
      resetCalls(receiptPath);

      const failure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      }).pipe(Effect.flip);

      assert.strictEqual(failure._tag, "ProductionError");
      assert.strictEqual(failure.failure, "MigrationReceiptWriteError");
      assert.strictEqual(failure.stage, "migration");
      assert.strictEqual(calls.cleanupBytes, undefined);
      assert.deepStrictEqual(calls.phases, ["seal"]);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("maps a receipt readback failure without cleanup", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const receiptPath = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      resetCalls(receiptPath);

      const failure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      }).pipe(Effect.flip);

      assert.strictEqual(failure._tag, "ProductionError");
      assert.strictEqual(failure.failure, "MigrationReceiptWriteError");
      assert.strictEqual(failure.stage, "migration");
      assert.strictEqual(calls.cleanupBytes, undefined);
      assert.deepStrictEqual(calls.phases, ["seal"]);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );
});
