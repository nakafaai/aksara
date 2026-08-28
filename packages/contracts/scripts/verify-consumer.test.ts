import { inspect } from "node:util";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, Schedule } from "effect";
import { TestClock } from "effect/testing";
import {
  preserveTarball,
  publicSpecifier,
  verifyConsumer,
} from "#scripts/consumer-verifier";

/** Supplies the exact live boundary inputs for direct program verification. */
const input = (args: readonly string[] = []) => ({
  args,
  environment: process.env,
  executable: process.execPath,
  platform: process.platform,
});

/** Imports the CLI with exact arguments and always restores process state. */
const runConsumerCommand = Effect.fn(
  "ContractConsumerCommandTest.runConsumerCommand"
)((args: readonly string[]) =>
  Effect.acquireUseRelease(
    Effect.sync(() => {
      const original = process.argv;
      process.argv = [process.execPath, "verify-consumer.ts", ...args];
      return original;
    }),
    () => Effect.promise(() => import("#scripts/verify-consumer")),
    (original) =>
      Effect.sync(() => {
        process.argv = original;
      })
  )
);

describe("consumer package specifiers", () => {
  it("maps root and nested exports without an Effect runtime", () => {
    expect(publicSpecifier("@nakafa/aksara-contracts", ".")).toBe(
      "@nakafa/aksara-contracts"
    );
    expect(
      publicSpecifier("@nakafa/aksara-contracts", "./renderer/manifest")
    ).toBe("@nakafa/aksara-contracts/renderer/manifest");
  });
});

layer(NodeServices.layer)("consumer verification", (effectIt) => {
  effectIt.effect(
    "proves the real tarball through the Node runtime boundary",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-consumer-command-",
        });
        const output = path.join(root, "verified.tgz");
        yield* runConsumerCommand(["--output", output]);
        const archive = yield* fileSystem.readFile(output).pipe(
          Effect.catchIf(
            (error) => error.reason._tag === "NotFound",
            () => Effect.succeed(new Uint8Array())
          ),
          Effect.repeat({
            schedule: Schedule.spaced("50 millis"),
            while: (bytes) => bytes.byteLength === 0,
          }),
          Effect.timeout("120 seconds"),
          TestClock.withLive
        );
        expect(archive.byteLength).toBeGreaterThan(0);
      }),
    125_000
  );

  effectIt.effect("returns typed boundary and platform failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-consumer-failure-",
      });
      const workspace = path.join(root, "workspace");
      yield* fileSystem.makeDirectory(workspace);
      const argumentError = yield* verifyConsumer(input(["--unknown"])).pipe(
        Effect.scoped,
        Effect.flip
      );
      expect(argumentError).toMatchObject({ reason: "argument" });
      expect(argumentError.detail).toContain(
        "Consumer verification arguments are malformed"
      );
      expect(argumentError.detail).toContain("Unknown option '--unknown'");
      expect(argumentError.cause).toBeInstanceOf(TypeError);

      const processError = yield* verifyConsumer({
        ...input(),
        temporaryDirectory: workspace,
        tools: { pnpm: process.execPath },
      }).pipe(Effect.scoped, Effect.flip);
      expect(processError).toMatchObject({ reason: "process" });
      expect(processError.detail).toContain("Contract package creation");
      expect(processError.detail).toContain("code 1");
      expect(processError.cause).toEqual({ exitCode: 1 });
      expect(yield* fileSystem.readDirectory(workspace)).toEqual([]);

      const credential = "must-not-appear-in-consumer-errors";
      const startError = yield* verifyConsumer({
        ...input(),
        environment: { ...process.env, NPM_TOKEN: credential },
        temporaryDirectory: workspace,
        tools: { pnpm: path.join(root, "missing-command") },
      }).pipe(Effect.scoped, Effect.flip);
      expect(startError).toMatchObject({ reason: "process" });
      expect(startError.detail).toContain("Contract package creation");
      expect(startError.detail).toContain("missing-command");
      expect(startError.detail).not.toContain(credential);
      expect(startError.cause).toMatchObject({
        _tag: "PlatformError",
        reason: { _tag: "NotFound" },
      });
      expect(inspect(startError.cause, { depth: null })).not.toContain(
        credential
      );
      expect(yield* fileSystem.readDirectory(workspace)).toEqual([]);

      const file = path.join(root, "not-a-directory");
      yield* fileSystem.writeFileString(file, "occupied");
      const fileError = yield* verifyConsumer({
        ...input(),
        temporaryDirectory: file,
      }).pipe(Effect.scoped, Effect.flip);
      expect(fileError).toMatchObject({ reason: "filesystem" });
      expect(fileError.detail).toContain("Temporary directory creation failed");
      expect(fileError.detail).toContain("not-a-directory");
      expect(fileError.cause).toMatchObject({ _tag: "PlatformError" });
    })
  );

  effectIt.effect(
    "preserves an archive through Effect filesystem services",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-preserve-test-",
        });
        const source = path.join(root, "source.tgz");
        const output = path.join(root, "nested", "output.tgz");
        yield* fileSystem.writeFileString(source, "verified");
        yield* preserveTarball(undefined, "unused");
        yield* preserveTarball(output, source);
        expect(yield* fileSystem.readFileString(output, "utf8")).toBe(
          "verified"
        );
        const error = yield* preserveTarball(
          path.join(root, "missing", "output.tgz"),
          path.join(root, "missing.tgz")
        ).pipe(Effect.flip);
        expect(error).toMatchObject({ reason: "filesystem" });
      })
  );
});
