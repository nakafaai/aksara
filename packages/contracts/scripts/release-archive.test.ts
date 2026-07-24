import { execFileSync } from "node:child_process";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { verifyArchive, writeOutputs } from "#scripts/release-archive";
import {
  type ContractReleaseError,
  parseVersion,
} from "#scripts/release-identity";

/** Runs one Node-backed archive operation at the test boundary. */
function run<A, E, R>(effect: Effect.Effect<A, E, R>) {
  return Effect.runPromise(
    effect.pipe(
      Effect.provide(NodeContext.layer),
      Effect.scoped
    ) as Effect.Effect<A, E>
  );
}

/** Exposes one expected archive failure at the test boundary. */
function reject<A, R>(effect: Effect.Effect<A, ContractReleaseError, R>) {
  return run(effect.pipe(Effect.flip));
}

/** Creates one minimal contract package archive for boundary tests. */
function createArchive(root: string) {
  const stage = join(root, "current", "package");
  const archive = join(root, "current.tgz");
  mkdirSync(stage, { recursive: true });
  writeFileSync(
    join(stage, "package.json"),
    '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}'
  );
  execFileSync("tar", [
    "-czf",
    archive,
    "-C",
    join(root, "current"),
    "package",
  ]);
  return archive;
}

/** Creates one quiet command that exits unsuccessfully for platform mapping. */
function createFailingTool(root: string) {
  const tool = join(root, "fail.ts");
  writeFileSync(tool, "#!/usr/bin/env node\nprocess.exitCode = 1;\n");
  chmodSync(tool, 0o700);
  return tool;
}

describe("contract release archive", () => {
  it("verifies exact embedded archive identity", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-archive-"));
    const archive = createArchive(root);
    const identity = await run(parseVersion("0.1.0"));

    await expect(run(verifyArchive(archive, identity))).resolves.toBeInstanceOf(
      Uint8Array
    );
    const wrongVersion = await reject(
      verifyArchive(archive, await run(parseVersion("0.2.0")))
    );
    expect(wrongVersion.reason).toBe("archive");
    const missing = await reject(
      verifyArchive(
        join(root, "missing.tgz"),
        identity,
        createFailingTool(root)
      )
    );
    expect(missing.reason).toBe("platform");
  });

  it("appends only single-line workflow output values", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-output-"));
    const output = join(root, "output.txt");
    await run(writeOutputs(output, { safe: "value" }));
    expect(readFileSync(output, "utf8")).toBe("safe=value\n");

    const multiline = await reject(
      writeOutputs(output, { unsafe: "one\ntwo" })
    );
    expect(multiline.reason).toBe("argument");
  });
});
