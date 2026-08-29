import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { SignedTryoutRuntimeBundleSchema } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect, FileSystem, Path, Schema } from "effect";
import { vi } from "vitest";

import { encodeGenesisBundle } from "#cli/genesis/file";
import { runGenesisCommand } from "#cli/genesis/run";
import {
  GENESIS_RUNTIME_BUNDLE_HASH,
  genesisRuntimePayload,
} from "#cli/genesis/spec";

const expectedBundle = Schema.decodeSync(SignedTryoutRuntimeBundleSchema)({
  bundleHash: GENESIS_RUNTIME_BUNDLE_HASH,
  keyId: "content-2026-07-23",
  payload: genesisRuntimePayload,
  signature: "A".repeat(86),
});

const calls = vi.hoisted(() => ({
  bundle: undefined as typeof expectedBundle | undefined,
  failSigning: false,
  verifiedKey: false,
}));

vi.mock("@nakafa/aksara-publisher/signing/service", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    makeEd25519PublicationSigner: () =>
      TestEffect.succeed({
        signTryoutRuntimeBundle: () =>
          calls.failSigning
            ? TestEffect.fail({ _tag: "TestSigningError" as const })
            : TestEffect.succeed(calls.bundle),
      }),
  };
});

vi.mock("#cli/environment/read", async () => {
  const { Effect: TestEffect, Redacted } = await import("effect");
  return {
    readSigningEnvironment: () =>
      TestEffect.succeed({
        derivedPublicKeyPem: "test-public-key",
        keyId: "content-2026-07-23",
        privateKeyPem: Redacted.make("test-private-key"),
      }),
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

/** Restores one exact successful signing boundary. */
function reset() {
  calls.bundle = expectedBundle;
  calls.failSigning = false;
  calls.verifiedKey = false;
}

layer(NodeServices.layer)("genesis runtime signing", (it) => {
  it.effect("exports only the exact reviewed signed bundle", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-genesis-",
      });
      const bundlePath = path.join(root, "bundle.json");
      reset();

      yield* runGenesisCommand({ bundlePath, command: "genesis" });

      assert.strictEqual(calls.verifiedKey, true);
      assert.strictEqual(
        yield* fileSystem.readFileString(bundlePath, "utf8"),
        encodeGenesisBundle(expectedBundle)
      );
    })
  );

  it.effect("rejects signing drift and maps signer or storage failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-genesis-",
      });
      const bundlePath = path.join(root, "bundle.json");
      reset();
      calls.bundle = {
        ...expectedBundle,
        bundleHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      };
      const identity = yield* runGenesisCommand({
        bundlePath,
        command: "genesis",
      }).pipe(Effect.flip);
      reset();
      calls.failSigning = true;
      const signing = yield* runGenesisCommand({
        bundlePath,
        command: "genesis",
      }).pipe(Effect.flip);
      reset();
      yield* fileSystem.writeFileString(bundlePath, "conflict\n");
      const storage = yield* runGenesisCommand({
        bundlePath,
        command: "genesis",
      }).pipe(Effect.flip);

      assert.deepStrictEqual(
        [identity.failure, signing.failure, storage.failure],
        [
          "GenesisBundleIdentityError",
          "TestSigningError",
          "GenesisBundleWriteError",
        ]
      );
      assert.deepStrictEqual(
        [identity.stage, signing.stage, storage.stage],
        ["migration", "migration", "migration"]
      );
    })
  );
});
