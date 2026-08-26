import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
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

const calls = vi.hoisted(() => ({
  endpoint: undefined as string | undefined,
  receipt: undefined as SignedTryoutHistoryMigrationReceipt | undefined,
  releaseId: undefined as string | undefined,
  verifiedKey: false,
}));

vi.mock("@nakafa/aksara-publisher/migration/tryout/program", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Returns one public-safe terminal receipt without running production. */
    migrateRetainedTryoutHistory: (releaseId: string) => {
      calls.releaseId = releaseId;
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

layer(NodeServices.layer)("try-out history migration command", (it) => {
  it.effect("writes one exclusive canonical public-safe receipt", () =>
    Effect.gen(function* () {
      calls.receipt = receipt;
      calls.releaseId = undefined;
      calls.endpoint = undefined;
      calls.verifiedKey = false;
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "receipt.json");

      yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      });
      const contents = yield* fileSystem.readFileString(receiptPath, "utf8");

      expect(contents).toBe(
        `${canonicalizeSignedTryoutHistoryMigrationReceipt(receipt)}\n`
      );
      expect(calls.releaseId).toBe(receipt.payload.migrationId);
      expect(calls.endpoint).toBe("https://content.example.test/publish");
      expect(calls.verifiedKey).toBe(true);
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );

  it.effect("never overwrites an existing receipt destination", () =>
    Effect.gen(function* () {
      calls.receipt = receipt;
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-migration-command-",
      });
      const receiptPath = path.join(root, "receipt.json");
      yield* fileSystem.writeFileString(receiptPath, "existing\n");

      const failure = yield* runTryoutMigrationCommand({
        command: "migrate-tryout-history",
        receiptPath,
        releaseId: receipt.payload.migrationId,
      }).pipe(Effect.flip);

      expect(failure).toMatchObject({
        _tag: "ProductionError",
        failure: "MigrationReceiptWriteError",
        stage: "migration",
      });
      expect(yield* fileSystem.readFileString(receiptPath, "utf8")).toBe(
        "existing\n"
      );
    }).pipe(Effect.provide(NodeHttpClient.layerNodeHttp))
  );
});
