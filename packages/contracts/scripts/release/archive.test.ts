import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import { ChildProcess } from "effect/process";
import { verifyArchive, writeOutputs } from "#scripts/release/archive";
import { parseVersion } from "#scripts/release/identity";

/** One exact tar.gz whose package/package.json declares version 0.1.0. */
const PINNED_ARCHIVE_BASE64 =
  "H4sIAAVVx2oAA+2V3UrDMBiGq4e7AI9DT9UsSZN0EwZOca64g2lB8PCzy1xd/2jrHIi35n14Lx5Yf4pM54bYOnB9Tj4S8vMm4X3Th2lXwUDF9QicMVwprXgIIaYQ6LXKt5qRV0IYJYgKJqkUjBOBCBWSSA1NS9DyhZskhTiTEsCl6w0hdUfzx92OlPIWrDN7KFSG1DIwCPJT11ctajYp5w2DCWyY3JSMmbImTNSzDtpnh13r/AhPIU1j7IQ+hijyFI7icKICCBzVap9abXvgHduGvd2Z3NZ4E9nZpN7Fokkbm5r12DlJH7aeaqu+h3Xl3fX1MvdY5v+Xxqz/DZNm/hdlispZc//n79///A/g6yQMitkjuw/J+Q/ynxHKq/z/E77J/wbPfuBmlf//ntz/xbv+g2X+J1nnbP5LRoSGSNFC5rHm/r/TA/CVvqfvBzCGIdRhnEAMu04YpDE4aaLv6BMVJ24YZIMIppjo96sWXVFRUVHxa54BpPKwtgASAAA=";

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
  it.effect("pins the exact bytes and identity of one embedded archive", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const root = yield* fileSystem.makeTempDirectoryScoped({
        prefix: "aksara-archive-",
      });
      const archive = path.join(root, "current.tgz");
      yield* fileSystem.writeFile(
        archive,
        Buffer.from(PINNED_ARCHIVE_BASE64, "base64")
      );
      const identity = yield* parseVersion("0.1.0");

      const bytes = yield* verifyArchive(archive, identity);
      expect(bytes.byteLength).toBe(383);
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(
        "d5a82a8990560cd5015657ebfa51032b272546852c9360062eee5069608306b1"
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

  it.effect(
    "writes pinned output lines in insertion order with UTF-8 text, booleans, and non-integer numbers",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-output-pinned-",
        });
        const output = path.join(root, "output.txt");
        yield* writeOutputs(
          output,
          Object.fromEntries<string | number | boolean>([
            ["zeta", "1"],
            ["alpha", "Ñandú café"],
            ["has_latest", true],
            ["size", 0.5],
          ])
        );

        expect(yield* fileSystem.readFileString(output, "utf8")).toBe(
          "zeta=1\nalpha=Ñandú café\nhas_latest=true\nsize=0.5\n"
        );
      })
  );
});
