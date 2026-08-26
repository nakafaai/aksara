import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import { ChildProcess } from "effect/unstable/process";
import { verifyArchive, writeOutputs } from "#scripts/release-archive";
import { parseVersion } from "#scripts/release-identity";

/** Creates one minimal contract package archive for boundary tests. */
const createArchive = Effect.fn("ContractReleaseArchiveTest.createArchive")(
  function* (root: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const current = path.join(root, "current");
    const stage = path.join(current, "package");
    const archive = path.join(root, "current.tgz");
    yield* fileSystem.makeDirectory(stage, { recursive: true });
    yield* fileSystem.writeFileString(
      path.join(stage, "package.json"),
      '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}'
    );
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

/** Creates one quiet executable that exits unsuccessfully. */
const createFailingTool = Effect.fn(
  "ContractReleaseArchiveTest.createFailingTool"
)(function* (root: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const tool = path.join(root, "fail.sh");
  yield* fileSystem.writeFileString(tool, "#!/bin/sh\nexit 1\n");
  yield* fileSystem.chmod(tool, 0o700);
  return tool;
});

layer(NodeServices.layer)("contract release archive", (it) => {
  it.effect("verifies exact embedded archive identity", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-archive-",
      });
      const archive = yield* createArchive(root);
      const identity = yield* parseVersion("0.1.0");

      expect(yield* verifyArchive(archive, identity)).toBeInstanceOf(
        Uint8Array
      );
      const wrongVersion = yield* verifyArchive(
        archive,
        yield* parseVersion("0.2.0")
      ).pipe(Effect.flip);
      expect(wrongVersion.reason).toBe("archive");
      const missing = yield* verifyArchive(
        path.join(root, "missing.tgz"),
        identity,
        yield* createFailingTool(root)
      ).pipe(Effect.flip);
      expect(missing.reason).toBe("platform");
    })
  );

  it.effect("appends only single-line workflow output values", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-output-",
      });
      const output = path.join(root, "output.txt");
      yield* writeOutputs(output, { safe: "value" });
      expect(yield* fileSystem.readFileString(output, "utf8")).toBe(
        "safe=value\n"
      );

      const multiline = yield* writeOutputs(output, {
        unsafe: "one\ntwo",
      }).pipe(Effect.flip);
      expect(multiline.reason).toBe("argument");
    })
  );
});
