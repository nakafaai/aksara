import { fileURLToPath, pathToFileURL } from "node:url";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect, FileSystem, Path, Result, Schema, Stream } from "effect";
import { ChildProcess } from "effect/unstable/process";
import {
  isAllowedPackedFile,
  REQUIRED_PACKED_FILES,
  readPackageVersion,
} from "#cli/package";

/** An isolated npm smoke command returned a non-zero exit status. */
class CliTestCommandError extends Schema.TaggedError<CliTestCommandError>()(
  "CliTestCommandError",
  {
    command: Schema.String,
    exitCode: Schema.Finite.pipe(Schema.check(Schema.isInt())),
    stderr: Schema.String,
  }
) {}

const packageRoot = fileURLToPath(new URL("../", import.meta.url));
const distributionRoot = fileURLToPath(
  new URL("../dist/package/", import.meta.url)
);
const PackResultSchema = Schema.fromJsonString(
  Schema.NonEmptyArray(
    Schema.Struct({
      filename: Schema.String,
      files: Schema.Array(Schema.Struct({ path: Schema.String })),
    })
  )
);

/** Collects one isolated command without leaking a child process. */
const readCommand = Effect.fn("AksaraCliTest.readCommand")(function* (
  command: string,
  args: readonly string[],
  cwd: string
) {
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const childProcess = yield* ChildProcess.make(command, args, { cwd });
      const [stdout, stderr, exitCode] = yield* Effect.all(
        [
          Stream.mkString(Stream.decodeText(childProcess.stdout)),
          Stream.mkString(Stream.decodeText(childProcess.stderr)),
          childProcess.exitCode,
        ],
        { concurrency: 3 }
      );
      return { exitCode, stderr, stdout };
    })
  );
});

/** Requires one isolated command to exit successfully. */
const runCommand = Effect.fn("AksaraCliTest.runCommand")(function* (
  command: string,
  args: readonly string[],
  cwd: string
) {
  const result = yield* readCommand(command, args, cwd);
  if (result.exitCode !== 0) {
    return yield* new CliTestCommandError({
      command: [command, ...args].join(" "),
      exitCode: result.exitCode,
      stderr: result.stderr.trim(),
    });
  }
  return result.stdout;
});

describe("Aksara CLI package", () => {
  it("allows only the runtime distribution files", () => {
    for (const file of REQUIRED_PACKED_FILES) {
      expect(isAllowedPackedFile(file)).toBe(true);
    }
    expect(isAllowedPackedFile("src/main.ts")).toBe(false);
    expect(isAllowedPackedFile("vitest.config.ts")).toBe(false);
  });

  it.effect("reads valid package metadata and reports typed failures", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const directory = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-cli-metadata-",
      });
      const validPath = path.join(directory, "valid.json");
      const invalidPath = path.join(directory, "invalid.json");
      yield* fileSystem.writeFileString(validPath, '{"version":"9.8.7"}');
      yield* fileSystem.writeFileString(invalidPath, '{"version":7}');

      const valid = yield* readPackageVersion(pathToFileURL(validPath));
      const invalid = yield* readPackageVersion(
        pathToFileURL(invalidPath)
      ).pipe(Effect.result);
      const missing = yield* readPackageVersion(
        pathToFileURL(path.join(directory, "missing.json"))
      ).pipe(Effect.result);

      expect(valid).toBe("9.8.7");
      expect(Result.isFailure(invalid) && invalid.failure.reason).toBe(
        "invalid"
      );
      expect(Result.isFailure(missing) && missing.failure.reason).toBe(
        "missing"
      );
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect(
    "packs only the allowlist and installs a working executable",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const directory = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-cli-pack-",
        });
        const packageVersion = yield* readPackageVersion(
          new URL("../package.json", import.meta.url)
        );
        const effectVersion = yield* readPackageVersion(
          new URL(import.meta.resolve("effect/package.json"))
        );
        yield* runCommand("pnpm", ["build"], packageRoot);
        const packOutput = yield* runCommand(
          "npm",
          [
            "pack",
            "--ignore-scripts",
            "--json",
            "--pack-destination",
            directory,
          ],
          distributionRoot
        );
        const [pack] = yield* Schema.decodeEffect(PackResultSchema)(packOutput);
        const files = pack.files.map(({ path: file }) => file);
        const tarballPath = path.join(directory, pack.filename);

        yield* fileSystem.writeFileString(
          path.join(directory, "package.json"),
          '{"name":"aksara-cli-smoke","private":true}'
        );
        yield* runCommand(
          "npm",
          [
            "install",
            "--ignore-scripts",
            "--no-audit",
            "--no-fund",
            "--package-lock=false",
            tarballPath,
          ],
          directory
        );

        const installedRoot = path.join(
          directory,
          "node_modules",
          "@nakafa",
          "aksara-cli"
        );
        const binary = path.join(directory, "node_modules", ".bin", "aksara");
        const checkout = path.join(directory, "checkout");
        const nested = path.join(checkout, "packages", "corpus");
        const checkoutMain = path.join(
          checkout,
          "apps",
          "cli",
          "src",
          "main.ts"
        );
        yield* fileSystem.makeDirectory(nested, { recursive: true });
        yield* fileSystem.makeDirectory(path.dirname(checkoutMain), {
          recursive: true,
        });
        yield* fileSystem.writeFileString(
          path.join(checkout, "package.json"),
          '{"name":"aksara","private":true}'
        );
        yield* fileSystem.writeFileString(
          checkoutMain,
          "console.log(JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd() }));"
        );
        const bundle = yield* fileSystem.readFileString(
          path.join(installedRoot, "dist", "main.js")
        );
        const manifest = yield* fileSystem.readFileString(
          path.join(installedRoot, "package.json")
        );
        const notice = yield* fileSystem.readFileString(
          path.join(installedRoot, "NOTICE")
        );
        const delegated = yield* runCommand(binary, ["sentinel"], nested);
        const realNested = yield* fileSystem.realPath(nested);
        const help = yield* runCommand(binary, ["--help"], directory);
        const version = yield* runCommand(binary, ["--version"], directory);

        expect(
          REQUIRED_PACKED_FILES.every((file) => files.includes(file))
        ).toBe(true);
        expect(files.every(isAllowedPackedFile)).toBe(true);
        expect(JSON.parse(delegated)).toEqual({
          args: ["sentinel"],
          cwd: realNested,
        });
        expect(help).toContain("Aksara CLI");
        expect(version).toBe(`${packageVersion}\n`);
        expect(manifest).not.toContain('"dependencies"');
        expect(notice).toContain(`effect ${effectVersion}`);
        expect(notice).toContain("License: MIT");
        expect(bundle).not.toContain("workspace:*");
        expect(bundle).not.toContain("corpus-humanized");
      }).pipe(Effect.provide(NodeServices.layer)),
    { timeout: 60_000 }
  );
});
