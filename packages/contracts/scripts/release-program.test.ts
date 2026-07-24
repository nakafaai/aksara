import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import type { ContractReleaseError } from "#scripts/release-identity";
import { makeReleaseCommand } from "#scripts/release-program";

/** Runs one Node-backed release program at the test boundary. */
function run<A, E, R>(effect: Effect.Effect<A, E, R>) {
  return Effect.runPromise(
    effect.pipe(
      Effect.provide(NodeContext.layer),
      Effect.scoped
    ) as Effect.Effect<A, E>
  );
}

/** Exposes one expected release program failure at the test boundary. */
function reject<A, R>(effect: Effect.Effect<A, ContractReleaseError, R>) {
  return run(effect.pipe(Effect.flip));
}

/** Creates one archive carrying the exact package identity. */
function createArchive(root: string, marker: string) {
  const stage = join(root, marker, "package");
  const archive = join(root, `${marker}.tgz`);
  mkdirSync(stage, { recursive: true });
  writeFileSync(
    join(stage, "package.json"),
    '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}'
  );
  writeFileSync(join(stage, "marker.txt"), marker);
  execFileSync("tar", ["-czf", archive, "-C", join(root, marker), "package"]);
  return archive;
}

/** Creates exact package, tags, and output paths for one command. */
function commandPaths(root: string, tags = "") {
  const packagePath = join(root, "package.json");
  const tagsPath = join(root, "tags.txt");
  const outputPath = join(root, "output.txt");
  writeFileSync(
    packagePath,
    '{"name":"@nakafa/aksara-contracts","version":"0.1.0"}'
  );
  writeFileSync(tagsPath, tags);
  return { outputPath, packagePath, tagsPath };
}

describe("contract release program", () => {
  it("describes first and existing immutable release identities", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-release-describe-"));
    const first = commandPaths(root);
    await run(
      makeReleaseCommand([
        "describe",
        "--package",
        first.packagePath,
        "--tags",
        first.tagsPath,
        "--output",
        first.outputPath,
      ])
    );
    expect(readFileSync(first.outputPath, "utf8")).toContain(
      "has_latest=false"
    );

    const existing = commandPaths(root, "contracts-v0.1.0\n");
    writeFileSync(existing.outputPath, "");
    await run(
      makeReleaseCommand([
        "describe",
        "--package",
        existing.packagePath,
        "--tags",
        existing.tagsPath,
        "--output",
        existing.outputPath,
      ])
    );
    expect(readFileSync(existing.outputPath, "utf8")).toContain(
      "latest_tag=contracts-v0.1.0"
    );
  });

  it("decides first and unchanged exact archives", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-release-decide-"));
    const first = commandPaths(root);
    const archive = createArchive(root, "current");
    await run(
      makeReleaseCommand([
        "decide",
        "--package",
        first.packagePath,
        "--tags",
        first.tagsPath,
        "--archive",
        archive,
        "--output",
        first.outputPath,
      ])
    );
    expect(readFileSync(first.outputPath, "utf8")).toContain("mode=create");

    writeFileSync(first.tagsPath, "contracts-v0.1.0\n");
    writeFileSync(first.outputPath, "");
    await run(
      makeReleaseCommand([
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
      ])
    );
    expect(readFileSync(first.outputPath, "utf8")).toContain("mode=unchanged");
  });

  it("rejects malformed commands and every missing owned argument", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-release-arguments-"));
    const paths = commandPaths(root);
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
    const errors = await Promise.all(
      cases.map((args) => reject(makeReleaseCommand(args)))
    );
    for (const error of errors) {
      expect(error.reason).toBe("argument");
    }
  });

  it("maps file failures and reaches the remote proof boundary safely", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-release-files-"));
    const paths = commandPaths(root);
    await expect(
      reject(
        makeReleaseCommand([
          "describe",
          "--package",
          join(root, "missing.json"),
          "--tags",
          paths.tagsPath,
          "--output",
          paths.outputPath,
        ])
      )
    ).resolves.toMatchObject({ reason: "platform" });
    await expect(
      reject(
        makeReleaseCommand([
          "describe",
          "--package",
          paths.packagePath,
          "--tags",
          join(root, "missing.txt"),
          "--output",
          paths.outputPath,
        ])
      )
    ).resolves.toMatchObject({ reason: "platform" });
    await expect(
      reject(
        makeReleaseCommand([
          "prove",
          "--package",
          paths.packagePath,
          "--archive",
          "archive",
          "--repository",
          "invalid",
          "--source-sha",
          "invalid",
        ])
      )
    ).resolves.toMatchObject({ reason: "argument" });
  });
});
