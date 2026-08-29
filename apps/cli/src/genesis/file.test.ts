import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { SignedTryoutRuntimeBundleSchema } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect, FileSystem, Path, Schema } from "effect";

import {
  encodeGenesisBundle,
  GenesisBundleWriteError,
  writeGenesisBundle,
} from "#cli/genesis/file";
import {
  GENESIS_RUNTIME_BUNDLE_HASH,
  genesisRuntimePayload,
} from "#cli/genesis/spec";

const bundle = Schema.decodeSync(SignedTryoutRuntimeBundleSchema)({
  bundleHash: GENESIS_RUNTIME_BUNDLE_HASH,
  keyId: "content-2026-07-23",
  payload: genesisRuntimePayload,
  signature: "A".repeat(86),
});

layer(NodeServices.layer)("genesis bundle storage", (it) => {
  it.effect("writes one exclusive canonical bundle idempotently", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-genesis-",
      });
      const bundlePath = path.join(root, "bundle.json");

      yield* writeGenesisBundle(bundlePath, bundle);
      yield* writeGenesisBundle(bundlePath, bundle);

      assert.strictEqual(
        yield* fileSystem.readFileString(bundlePath, "utf8"),
        encodeGenesisBundle(bundle)
      );
      assert.strictEqual(
        (yield* fileSystem.stat(bundlePath)).mode % 0o1000,
        0o600
      );
      assert.deepStrictEqual(yield* fileSystem.readDirectory(root), [
        "bundle.json",
      ]);
    })
  );

  it.effect("rejects conflicting bytes without overwriting them", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-genesis-",
      });
      const bundlePath = path.join(root, "bundle.json");
      yield* fileSystem.writeFileString(bundlePath, "existing\n");

      const failure = yield* writeGenesisBundle(bundlePath, bundle).pipe(
        Effect.flip
      );

      assert.instanceOf(failure, GenesisBundleWriteError);
      assert.strictEqual(
        yield* fileSystem.readFileString(bundlePath, "utf8"),
        "existing\n"
      );
    })
  );

  it.effect("maps atomic link failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-genesis-",
      });
      const bundlePath = path.join(root, "bundle.json");
      const missingPath = path.join(root, "missing.json");
      const failingFileSystem: FileSystem.FileSystem = {
        ...fileSystem,
        link: () => fileSystem.link(missingPath, bundlePath),
      };

      const failure = yield* writeGenesisBundle(bundlePath, bundle).pipe(
        Effect.provideService(FileSystem.FileSystem, failingFileSystem),
        Effect.flip
      );

      assert.instanceOf(failure, GenesisBundleWriteError);
      assert.deepStrictEqual(yield* fileSystem.readDirectory(root), []);
    })
  );

  it.effect("maps verification read failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-genesis-",
      });
      const bundlePath = path.join(root, "bundle.json");
      const missingPath = path.join(root, "missing.json");
      const failingFileSystem: FileSystem.FileSystem = {
        ...fileSystem,
        readFileString: () => fileSystem.readFileString(missingPath, "utf8"),
      };

      const failure = yield* writeGenesisBundle(bundlePath, bundle).pipe(
        Effect.provideService(FileSystem.FileSystem, failingFileSystem),
        Effect.flip
      );

      assert.instanceOf(failure, GenesisBundleWriteError);
      assert.deepStrictEqual(yield* fileSystem.readDirectory(root), [
        "bundle.json",
      ]);
    })
  );
});
