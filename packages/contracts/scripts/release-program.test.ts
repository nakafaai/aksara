import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import { ChildProcess } from "effect/unstable/process";
import { makeReleaseCommand } from "#scripts/release-program";

/** Creates one archive carrying the exact package identity. */
const createArchive = Effect.fn("ContractReleaseProgramTest.createArchive")(
  function* (root: string, marker: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const current = path.join(root, marker);
    const stage = path.join(current, "package");
    const archive = path.join(root, `${marker}.tgz`);
    yield* fileSystem.makeDirectory(stage, { recursive: true });
    yield* fileSystem.writeFileString(
      path.join(stage, "package.json"),
      '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}'
    );
    yield* fileSystem.writeFileString(path.join(stage, "marker.txt"), marker);
    const process = yield* ChildProcess.make("tar", [
      "-czf",
      archive,
      "-C",
      current,
      "package",
    ]);
    expect(yield* process.exitCode).toBe(0);
    return archive;
  }
);

/** Creates exact package, tags, and output paths for one command. */
const commandPaths = Effect.fn("ContractReleaseProgramTest.commandPaths")(
  function* (root: string, tags = "") {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const packagePath = path.join(root, "package.json");
    const tagsPath = path.join(root, "tags.txt");
    const outputPath = path.join(root, "output.txt");
    yield* fileSystem.writeFileString(
      packagePath,
      '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}'
    );
    yield* fileSystem.writeFileString(tagsPath, tags);
    return { outputPath, packagePath, tagsPath };
  }
);

layer(NodeServices.layer)("contract release program", (it) => {
  it.effect("describes first and existing immutable release identities", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-release-describe-",
      });
      const first = yield* commandPaths(root);
      yield* makeReleaseCommand([
        "describe",
        "--package",
        first.packagePath,
        "--tags",
        first.tagsPath,
        "--output",
        first.outputPath,
      ]);
      expect(
        yield* fileSystem.readFileString(first.outputPath, "utf8")
      ).toContain("has_latest=false");

      const existing = yield* commandPaths(root, "contracts-v0.1.0\n");
      yield* fileSystem.writeFileString(existing.outputPath, "");
      yield* makeReleaseCommand([
        "describe",
        "--package",
        existing.packagePath,
        "--tags",
        existing.tagsPath,
        "--output",
        existing.outputPath,
      ]);
      expect(
        yield* fileSystem.readFileString(existing.outputPath, "utf8")
      ).toContain("latest_tag=contracts-v0.1.0");
    })
  );

  it.effect("decides first and unchanged exact archives", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-release-decide-",
      });
      const first = yield* commandPaths(root);
      const archive = yield* createArchive(root, "current");
      yield* makeReleaseCommand([
        "decide",
        "--package",
        first.packagePath,
        "--tags",
        first.tagsPath,
        "--archive",
        archive,
        "--output",
        first.outputPath,
      ]);
      expect(
        yield* fileSystem.readFileString(first.outputPath, "utf8")
      ).toContain("mode=create");

      yield* fileSystem.writeFileString(first.tagsPath, "contracts-v0.1.0\n");
      yield* fileSystem.writeFileString(first.outputPath, "");
      yield* makeReleaseCommand([
        "decide",
        "--package",
        first.packagePath,
        "--tags",
        first.tagsPath,
        "--archive",
        archive,
        "--previous",
        archive,
        "--output",
        first.outputPath,
      ]);
      expect(
        yield* fileSystem.readFileString(first.outputPath, "utf8")
      ).toContain("mode=unchanged");
    })
  );

  it.effect("rejects malformed commands and every missing owned argument", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-release-arguments-",
      });
      const paths = yield* commandPaths(root);
      const cases = [
        ["--unknown"],
        ["unknown"],
        ["describe", "extra"],
        ["describe", "--tags", paths.tagsPath],
        ["describe", "--output", paths.outputPath],
        [
          "decide",
          "--package",
          paths.packagePath,
          "--tags",
          paths.tagsPath,
          "--output",
          paths.outputPath,
        ],
        ["prove"],
        ["prove", "--archive", "archive"],
        ["prove", "--archive", "archive", "--repository", "nakafaai/aksara"],
      ] as const;
      const errors = yield* Effect.all(
        cases.map((args) => makeReleaseCommand(args).pipe(Effect.flip)),
        { concurrency: "unbounded" }
      );
      for (const error of errors) {
        expect(error.reason).toBe("argument");
      }
    })
  );

  it.effect(
    "maps file failures and reaches the remote proof boundary safely",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-release-files-",
        });
        const paths = yield* commandPaths(root);
        const packageError = yield* makeReleaseCommand([
          "describe",
          "--package",
          path.join(root, "missing.json"),
          "--tags",
          paths.tagsPath,
          "--output",
          paths.outputPath,
        ]).pipe(Effect.flip);
        expect(packageError).toMatchObject({ reason: "platform" });
        const tagsError = yield* makeReleaseCommand([
          "describe",
          "--package",
          paths.packagePath,
          "--tags",
          path.join(root, "missing.txt"),
          "--output",
          paths.outputPath,
        ]).pipe(Effect.flip);
        expect(tagsError).toMatchObject({ reason: "platform" });
        const proofError = yield* makeReleaseCommand([
          "prove",
          "--package",
          paths.packagePath,
          "--archive",
          "archive",
          "--repository",
          "invalid",
          "--source-sha",
          "invalid",
        ]).pipe(Effect.flip);
        expect(proofError).toMatchObject({ reason: "argument" });
      })
  );
});
