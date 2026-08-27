import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import type { SignedTryoutHistoryMigrationReceipt } from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import { Effect, FileSystem, Path } from "effect";
import { vi } from "vitest";

import { runTryoutMigrationCommand } from "#cli/migration/seal";
import {
  migrationId,
  migrationReceipt,
  migrationReceiptBytes,
} from "#test/migration";

const calls = vi.hoisted(() => ({
  endpoint: undefined as string | undefined,
  failMigration: false,
  receipt: undefined as SignedTryoutHistoryMigrationReceipt | undefined,
  releaseId: undefined as string | undefined,
  verifiedKey: false,
}));

vi.mock("@nakafa/aksara-publisher/migration/tryout/program", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    migrateRetainedTryoutHistory: (releaseId: string) => {
      calls.releaseId = releaseId;
      return calls.failMigration
        ? TestEffect.fail({ _tag: "TestMigrationError" as const })
        : TestEffect.succeed(calls.receipt);
    },
  };
});

vi.mock("@nakafa/aksara-publisher/target/http", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { makeProductionTarget } = await import("#test/target");
  return {
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
    readProductionEnvironment: () =>
      TestEffect.succeed({
        ...publication,
        derivedPublicKeyPem: "test-public-key",
        keyId: "content-test",
        privateKeyPem: Redacted.make("test-private-key"),
      }),
    readPublicationEnvironment: () => TestEffect.succeed(publication),
  };
});

vi.mock("#cli/keys", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    verifySigningKey: () => {
      calls.verifiedKey = true;
      return TestEffect.void;
    },
  };
});

/** Resets mutable boundary evidence for one sealing command. */
function reset() {
  calls.endpoint = undefined;
  calls.failMigration = false;
  calls.receipt = migrationReceipt;
  calls.releaseId = undefined;
  calls.verifiedKey = false;
}

layer(NodeServices.layer)("try-out history migration sealing", (it) => {
  it.effect("seals and exports without starting destructive cleanup", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-",
      });
      const receiptPath = path.join(root, "receipt.json");
      reset();

      yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: migrationId,
      });

      assert.strictEqual(
        yield* fileSystem.readFileString(receiptPath, "utf8"),
        migrationReceiptBytes
      );
      assert.strictEqual(calls.releaseId, migrationId);
      assert.strictEqual(
        calls.endpoint,
        "https://content.example.test/publish"
      );
      assert.strictEqual(calls.verifiedKey, true);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("maps migration and exclusive receipt failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-",
      });
      const receiptPath = path.join(root, "receipt.json");
      reset();
      calls.failMigration = true;
      const migrationFailure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: migrationId,
      }).pipe(Effect.flip);
      calls.failMigration = false;
      yield* fileSystem.writeFileString(receiptPath, "conflict\n");
      const receiptFailure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: migrationId,
      }).pipe(Effect.flip);

      assert.deepStrictEqual(
        [migrationFailure.failure, receiptFailure.failure],
        ["TestMigrationError", "MigrationReceiptWriteError"]
      );
      assert.strictEqual(migrationFailure.stage, "migration");
      assert.strictEqual(receiptFailure.stage, "migration");
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );
});
