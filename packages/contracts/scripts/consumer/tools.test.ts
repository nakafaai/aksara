import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Effect, FileSystem, Path, Record as Rec, Schema } from "effect";
import { encodeJsonText, JsonTextSchema } from "#contracts/text/json";
import { readConsumerCommand } from "#scripts/consumer/command";
import {
  CONSUMER_INSTALL_ARGUMENTS,
  consumerPackArguments,
  createConsumerManifest,
  createConsumerSource,
  createConsumerTsconfig,
  createInstallRunner,
  selectPackedArchive,
} from "#scripts/consumer/tools";
import type { InstallInspection } from "#scripts/verify/install";

const packageName = "@nakafa/test-package";

const RunnerAnswerSchema = Schema.fromJsonString(
  Schema.Struct({
    resolved: Schema.Record(Schema.String, Schema.URLFromString),
  })
);

describe("consumer tooling", () => {
  it.effect("selects exactly one tarball", () =>
    Effect.gen(function* () {
      expect(yield* selectPackedArchive(["readme.txt", "package.tgz"])).toBe(
        "package.tgz"
      );
      for (const paths of [[], ["one.tgz", "two.tgz"]]) {
        const error = yield* Effect.flip(selectPackedArchive(paths));
        expect(error.message).toBe("Bun must pack exactly one tarball");
      }
    })
  );

  it("serializes an isolated consumer manifest that names no package manager", () => {
    const manifest = Schema.decodeSync(JsonTextSchema)(
      createConsumerManifest({
        effectVersion: "4.0.0-rc.112",
        packageName: "@nakafa/aksara-contracts",
        tarballPath: "/tmp/contracts.tgz",
      })
    );

    expect(manifest).toStrictEqual({
      dependencies: {
        "@nakafa/aksara-contracts": "file:/tmp/contracts.tgz",
        effect: "4.0.0-rc.112",
      },
      name: "aksara-contracts-external-consumer",
      private: true,
      type: "module",
    });
  });

  it("packs and installs with Bun and never runs lifecycle scripts", () => {
    expect(consumerPackArguments("/tmp/pack")).toStrictEqual([
      "pm",
      "pack",
      "--ignore-scripts",
      "--destination",
      "/tmp/pack",
    ]);
    expect(CONSUMER_INSTALL_ARGUMENTS).toStrictEqual([
      "install",
      "--production",
      "--ignore-scripts",
    ]);
  });

  it("serializes all public type imports and renderer proofs", () => {
    const source = createConsumerSource("@nakafa/aksara-contracts", [
      "@nakafa/aksara-contracts/content",
      "@nakafa/aksara-contracts/delivery",
    ]);

    expect(source).toContain(
      'import type * as Contract0 from "@nakafa/aksara-contracts/content";'
    );
    expect(source).toContain(
      'import type * as Contract1 from "@nakafa/aksara-contracts/delivery";'
    );
    expect(source).toContain(
      "export type InstalledContractSurface = [typeof Contract0, typeof Contract1];"
    );
  });

  it("serializes the strict compiler boundary", () => {
    expect(
      Schema.decodeSync(JsonTextSchema)(createConsumerTsconfig())
    ).toMatchObject({
      compilerOptions: {
        lib: ["ES2022", "DOM", "ESNext.Disposable"],
        module: "NodeNext",
        moduleResolution: "NodeNext",
        strict: true,
      },
      files: ["consumer.ts"],
    });
  });
});

/** Creates one consumer with an installed fixture package and the runner that inspects it. */
const createRunnerConsumer = Effect.fn("InstallRunnerTest.createConsumer")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const directory = yield* fileSystem.makeTempDirectoryScoped({
      prefix: "aksara-install-runner-",
    });
    const packageRoot = path.join(
      directory,
      "node_modules",
      "@nakafa",
      "test-package"
    );
    yield* fileSystem.makeDirectory(path.join(packageRoot, "dist"), {
      recursive: true,
    });
    yield* fileSystem.writeFileString(
      path.join(directory, "package.json"),
      encodeJsonText({ name: "aksara-runner-consumer", type: "module" })
    );
    yield* fileSystem.writeFileString(
      path.join(packageRoot, "package.json"),
      encodeJsonText({
        exports: {
          ".": { import: "./dist/index.js", types: "./dist/index.d.ts" },
        },
        name: packageName,
        type: "module",
      })
    );
    yield* fileSystem.writeFileString(
      path.join(packageRoot, "dist", "index.js"),
      "export {};\n"
    );
    yield* fileSystem.writeFileString(
      path.join(packageRoot, "dist", "broken.js"),
      'throw new Error("broken module");\n'
    );
    const runner = path.join(directory, "verify", "run.ts");
    yield* fileSystem.makeDirectory(path.dirname(runner), { recursive: true });
    yield* fileSystem.writeFileString(runner, createInstallRunner());
    return {
      broken: path.join(packageRoot, "dist", "broken.js"),
      directory,
      entry: path.join(packageRoot, "dist", "index.js"),
      runner,
    };
  }
);

/** Runs the install runner in one consumer with one request on standard input. */
const runInstallRunner = (
  consumer: { readonly directory: string; readonly runner: string },
  request: InstallInspection
) =>
  readConsumerCommand({
    args: [consumer.runner],
    cwd: consumer.directory,
    environment: {},
    executable: process.execPath,
    input: encodeJsonText(request),
    platform: process.platform,
    stage: "Install runner probe",
  });

layer(NodeServices.layer)("install runner", (effectIt) => {
  effectIt.effect("resolves each public specifier that the request names", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const consumer = yield* createRunnerConsumer();
      const output = yield* runInstallRunner(consumer, {
        imports: [(yield* path.toFileUrl(consumer.entry)).href],
        resolutions: [packageName],
      });
      const answer = yield* Schema.decodeEffect(RunnerAnswerSchema)(output);
      const entry = yield* fileSystem.realPath(consumer.entry);

      expect(Rec.map(answer.resolved, (url) => url.href)).toEqual({
        [packageName]: (yield* path.toFileUrl(entry)).href,
      });
    })
  );

  effectIt.effect("names the file whose import fails", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const consumer = yield* createRunnerConsumer();
      const specifier = (yield* path.toFileUrl(consumer.broken)).href;
      const error = yield* runInstallRunner(consumer, {
        imports: [specifier],
        resolutions: [],
      }).pipe(Effect.flip);

      expect(error).toMatchObject({ reason: "process" });
      expect(error.detail).toContain(`Unable to import ${specifier}:`);
      expect(error.detail).toContain("broken module");
    })
  );

  effectIt.effect("names the public specifier that does not resolve", () =>
    Effect.gen(function* () {
      const consumer = yield* createRunnerConsumer();
      const error = yield* runInstallRunner(consumer, {
        imports: [],
        resolutions: ["@nakafa/missing"],
      }).pipe(Effect.flip);

      expect(error).toMatchObject({ reason: "process" });
      expect(error.detail).toContain("Unable to resolve @nakafa/missing:");
    })
  );
});
