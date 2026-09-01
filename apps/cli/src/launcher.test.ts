import { pathToFileURL } from "node:url";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Console, Effect, FileSystem, Path, Result } from "effect";
import {
  makeLaunchCommand,
  makeLauncherProgram,
  runLauncher,
} from "#cli/launcher";

const runtime = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@effect/platform-node/NodeRuntime", async (importOriginal) => {
  const platform =
    await importOriginal<typeof import("@effect/platform-node/NodeRuntime")>();
  return {
    ...platform,
    runMain: vi.fn(() => {
      runtime.calls += 1;
    }),
  };
});

describe("CLI launcher", () => {
  it.effect("targets the exact source in the nearest Aksara checkout", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-launcher-",
      });
      const nested = path.join(root, "packages", "corpus");
      const main = path.join(root, "apps", "cli", "src", "main.ts");
      yield* fileSystem.makeDirectory(nested, { recursive: true });
      yield* fileSystem.makeDirectory(path.dirname(main), { recursive: true });
      yield* fileSystem.writeFileString(
        path.join(root, "package.json"),
        '{"name":"aksara","private":true}'
      );
      yield* fileSystem.writeFileString(
        main,
        "console.log('checkout source');"
      );
      const realMain = yield* fileSystem.realPath(main);

      const command = yield* makeLaunchCommand({
        args: ["check"],
        cwd: nested,
        executable: "/runtime/node",
      });

      expect(runtime.calls).toBe(1);
      expect(command).toMatchObject({
        args: ["--conditions=aksara-source", realMain, "check"],
        command: "/runtime/node",
        options: {
          cwd: nested,
          stderr: "inherit",
          stdin: "inherit",
          stdout: "inherit",
        },
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("reports a typed failure when the checkout source is missing", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-launcher-missing-",
      });
      yield* fileSystem.writeFileString(
        `${root}/package.json`,
        '{"name":"aksara","private":true}'
      );

      const result = yield* makeLaunchCommand({
        args: [],
        cwd: root,
        executable: "/runtime/node",
      }).pipe(Effect.result);
      const delegated = yield* runLauncher({
        args: [],
        cwd: root,
        executable: "/runtime/node",
      }).pipe(Effect.result);

      expect(Result.isFailure(result) && result.failure).toMatchObject({
        _tag: "CliLaunchError",
        reason: "missing",
      });
      expect(Result.isFailure(delegated) && delegated.failure).toMatchObject({
        _tag: "CliLaunchError",
        reason: "missing",
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect(
    "delegates execution, preserves status, and maps spawn failures",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-cli-process-",
        });
        const main = path.join(root, "apps", "cli", "src", "main.ts");
        yield* fileSystem.makeDirectory(path.dirname(main), {
          recursive: true,
        });
        yield* fileSystem.writeFileString(
          path.join(root, "package.json"),
          '{"name":"aksara","private":true}'
        );
        yield* fileSystem.writeFileString(
          main,
          "process.exitCode = process.argv[2] === 'fail' ? 7 : 0;"
        );

        const success = yield* makeLauncherProgram({
          args: [],
          cwd: root,
          executable: process.execPath,
          packageUrl: new URL("../package.json", import.meta.url),
        });
        const delegatedFailure = yield* runLauncher({
          args: ["fail"],
          cwd: root,
          executable: process.execPath,
        });
        const spawnFailure = yield* runLauncher({
          args: [],
          cwd: root,
          executable: path.join(root, "missing-node"),
        }).pipe(Effect.result);

        expect(success).toBe(0);
        expect(delegatedFailure).toBe(7);
        expect(
          Result.isFailure(spawnFailure) && spawnFailure.failure
        ).toMatchObject({
          _tag: "CliLaunchError",
          path: root,
          reason: "process",
        });
      }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect(
    "handles package information before checkout discovery",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-cli-information-",
        });
        const manifest = path.join(root, "package.json");
        yield* fileSystem.writeFileString(manifest, '{"version":"9.8.7"}');
        const output: string[] = [];
        const errors: string[] = [];
        const testConsole: Console.Console = Object.assign(
          Object.create(console),
          {
            error: (...values: readonly unknown[]) => {
              errors.push(values.join(" "));
            },
            log: (...values: readonly unknown[]) => {
              output.push(values.join(" "));
            },
          }
        );
        const base = {
          cwd: root,
          executable: process.execPath,
          packageUrl: pathToFileURL(manifest),
        };
        /** Runs one launcher invocation with captured output. */
        const run = (input: Parameters<typeof makeLauncherProgram>[0]) =>
          makeLauncherProgram(input).pipe(
            Effect.provideService(Console.Console, testConsole)
          );

        expect(yield* run({ ...base, args: ["--help"] })).toBe(0);
        expect(yield* run({ ...base, args: ["--version"] })).toBe(0);
        expect(
          yield* run({
            ...base,
            args: ["--help", "extra"],
          })
        ).toBe(1);
        expect(
          yield* run({
            ...base,
            args: ["--version"],
            packageUrl: pathToFileURL(path.join(root, "missing.json")),
          })
        ).toBe(1);

        expect(output[0]).toContain("Aksara CLI");
        expect(output[1]).toBe("9.8.7");
        expect(errors).toEqual([
          "The --help and --version options do not accept additional arguments.",
          "The installed Aksara CLI package metadata is unavailable or invalid. Reinstall @nakafa/aksara-cli.",
        ]);
        expect([...output, ...errors].join("\n")).not.toContain("Error:");
      }).pipe(Effect.provide(NodeServices.layer)),
    { timeout: 20_000 }
  );

  it.effect("prints safe checkout, source, and process failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const outside = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-outside-",
      });
      const checkout = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-errors-",
      });
      const source = path.join(checkout, "apps", "cli", "src", "main.ts");
      yield* fileSystem.writeFileString(
        path.join(checkout, "package.json"),
        '{"name":"aksara","private":true}'
      );
      const errors: string[] = [];
      const testConsole: Console.Console = Object.assign(
        Object.create(console),
        {
          error: (...values: readonly unknown[]) => {
            errors.push(values.join(" "));
          },
        }
      );
      const packageUrl = new URL("../package.json", import.meta.url);
      /** Runs one launcher invocation with captured errors. */
      const run = (input: Parameters<typeof makeLauncherProgram>[0]) =>
        makeLauncherProgram(input).pipe(
          Effect.provideService(Console.Console, testConsole)
        );

      yield* run({
        args: ["check"],
        cwd: outside,
        executable: process.execPath,
        packageUrl,
      });
      yield* run({
        args: ["check"],
        cwd: checkout,
        executable: process.execPath,
        packageUrl,
      });
      yield* fileSystem.makeDirectory(path.dirname(source), {
        recursive: true,
      });
      yield* fileSystem.writeFileString(source, "process.exitCode = 0;");
      yield* run({
        args: ["check"],
        cwd: checkout,
        executable: path.join(checkout, "missing-node"),
        packageUrl,
      });

      expect(errors).toHaveLength(3);
      expect(errors[0]).toContain("inside a complete Aksara checkout");
      expect(errors[1]).toContain("Aksara CLI source is missing");
      expect(errors[2]).toContain("Aksara CLI could not start");
      expect(errors.join("\n")).not.toContain("CliLaunchError");
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
