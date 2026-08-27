import { NodeHttpClient } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Effect } from "effect";
import { vi } from "vitest";

import { runTryoutAbortCommand } from "#cli/migration/abort";
import { migrationId } from "#test/migration";

const calls = vi.hoisted(() => ({
  aborted: false,
  endpoint: undefined as string | undefined,
  failAbort: false,
  failTarget: false,
  releaseId: undefined as string | undefined,
}));

vi.mock("@nakafa/aksara-publisher/migration/tryout/abort", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    abortRetainedTryoutHistory: (releaseId: string) => {
      calls.aborted = true;
      calls.releaseId = releaseId;
      return calls.failAbort
        ? TestEffect.fail({ _tag: "TestAbortError" as const })
        : TestEffect.succeed({ deleted: 7, migrationId: releaseId });
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

/** Resets mutable abort observations around one command. */
function reset() {
  calls.aborted = false;
  calls.endpoint = undefined;
  calls.failAbort = false;
  calls.failTarget = false;
  calls.releaseId = undefined;
}

/** Runs one exact migration abort through the CLI boundary. */
const run = () =>
  runTryoutAbortCommand({
    command: "abort-tryout-history",
    releaseId: migrationId,
  });

layer(NodeHttpClient.layerNodeHttp)("try-out history migration abort", (it) => {
  it.effect("aborts the selected invisible staging root", () =>
    Effect.gen(function* () {
      reset();
      yield* run();

      assert.strictEqual(calls.aborted, true);
      assert.strictEqual(calls.releaseId, migrationId);
      assert.strictEqual(
        calls.endpoint,
        "https://content.example.test/publish"
      );
    })
  );

  it.effect("maps target and abort failures to their owning stages", () =>
    Effect.gen(function* () {
      reset();
      calls.failTarget = true;
      const targetFailure = yield* run().pipe(Effect.flip);

      reset();
      calls.failAbort = true;
      const abortFailure = yield* run().pipe(Effect.flip);

      assert.deepStrictEqual(
        [targetFailure.failure, abortFailure.failure],
        ["TestTargetError", "TestAbortError"]
      );
      assert.strictEqual(targetFailure.stage, "target");
      assert.strictEqual(abortFailure.stage, "migration");
    })
  );
});
