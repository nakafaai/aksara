import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { vi } from "vitest";

import { runTryoutCleanupCommand } from "#cli/migration/cleanup";
import { migrationId, migrationProof, migrationReceipt } from "#test/migration";

const calls = vi.hoisted(() => ({
  cleaned: false,
  endpoint: undefined as string | undefined,
  failCleanup: false,
  failReceipt: false,
  failTarget: false,
  receiptPath: undefined as string | undefined,
  releaseId: undefined as string | undefined,
}));

vi.mock("#cli/migration/receipt", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { migrationReceipt: receipt } = await import("#test/migration");
  return {
    readMigrationReceipt: (receiptPath: string, releaseId: string) => {
      calls.receiptPath = receiptPath;
      calls.releaseId = releaseId;
      return calls.failReceipt
        ? TestEffect.fail({ _tag: "TestReceiptError" as const })
        : TestEffect.succeed(receipt);
    },
  };
});

vi.mock("@nakafa/aksara-publisher/migration/tryout/program", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    cleanupRetainedTryoutHistory: () => {
      calls.cleaned = true;
      return calls.failCleanup
        ? TestEffect.fail({ _tag: "TestCleanupError" as const })
        : TestEffect.succeed(migrationReceipt);
    },
  };
});

vi.mock("@nakafa/aksara-publisher/target/http", async () => {
  const { Effect: TestEffect } = await import("effect");
  const { makeProductionTarget } = await import("#test/target");
  return {
    makeHttpPublicationTarget: (config: { readonly endpoint: URL }) => {
      calls.endpoint = config.endpoint.href;
      return calls.failTarget
        ? TestEffect.fail({ _tag: "TestTargetError" as const })
        : TestEffect.succeed(makeProductionTarget(() => ({})));
    },
  };
});

vi.mock("#cli/environment/read", async () => {
  const { Effect: TestEffect, Redacted } = await import("effect");
  return {
    readPublicationEnvironment: () =>
      TestEffect.succeed({
        publicationEndpoint: new URL("https://content.example.test/publish"),
        publicationToken: Redacted.make("publication-token"),
      }),
  };
});

/** Resets mutable cleanup observations around one command. */
function reset() {
  calls.cleaned = false;
  calls.endpoint = undefined;
  calls.failCleanup = false;
  calls.failReceipt = false;
  calls.failTarget = false;
  calls.receiptPath = undefined;
  calls.releaseId = undefined;
}

layer(Layer.merge(NodeServices.layer, NodeHttpClient.layerNodeHttp))(
  "try-out history migration cleanup",
  (it) => {
    it.effect("cleans only from the selected external receipt", () =>
      Effect.gen(function* () {
        reset();
        yield* runTryoutCleanupCommand({
          command: "cleanup-tryout-history",
          proof: migrationProof,
          receiptPath: "/tmp/receipt.json",
          releaseId: migrationId,
        });

        assert.strictEqual(calls.cleaned, true);
        assert.strictEqual(calls.receiptPath, "/tmp/receipt.json");
        assert.strictEqual(calls.releaseId, migrationId);
        assert.strictEqual(
          calls.endpoint,
          "https://content.example.test/publish"
        );
      })
    );

    it.effect("fails before cleanup when receipt or target proof fails", () =>
      Effect.gen(function* () {
        reset();
        calls.failReceipt = true;
        const receiptFailure = yield* runTryoutCleanupCommand({
          command: "cleanup-tryout-history",
          proof: migrationProof,
          receiptPath: "/tmp/receipt.json",
          releaseId: migrationId,
        }).pipe(Effect.flip);
        assert.strictEqual(calls.cleaned, false);

        reset();
        calls.failTarget = true;
        const targetFailure = yield* runTryoutCleanupCommand({
          command: "cleanup-tryout-history",
          proof: migrationProof,
          receiptPath: "/tmp/receipt.json",
          releaseId: migrationId,
        }).pipe(Effect.flip);

        assert.strictEqual(receiptFailure.failure, "TestReceiptError");
        assert.strictEqual(receiptFailure.stage, "migration");
        assert.strictEqual(targetFailure.failure, "TestTargetError");
        assert.strictEqual(targetFailure.stage, "target");
        assert.strictEqual(calls.cleaned, false);
      })
    );

    it.effect("maps a cleanup failure after external proof", () =>
      Effect.gen(function* () {
        reset();
        calls.failCleanup = true;
        const failure = yield* runTryoutCleanupCommand({
          command: "cleanup-tryout-history",
          proof: migrationProof,
          receiptPath: "/tmp/receipt.json",
          releaseId: migrationId,
        }).pipe(Effect.flip);

        assert.strictEqual(failure.failure, "TestCleanupError");
        assert.strictEqual(failure.stage, "migration");
        assert.strictEqual(calls.cleaned, true);
      })
    );
  }
);
