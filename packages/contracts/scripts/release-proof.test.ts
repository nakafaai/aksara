import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import type { ContractReleaseError } from "#scripts/release-identity";
import {
  type ContractProofInput,
  proveContractRelease,
} from "#scripts/release-proof";

const SOURCE_SHA = "b".repeat(40);
const RELEASE_SHA = "a".repeat(40);
const VERSION = "0.1.0";
let toolSequence = 0;

/** Runs one Node-backed release proof at the test boundary. */
function run<A, E, R>(effect: Effect.Effect<A, E, R>) {
  return Effect.runPromise(
    effect.pipe(
      Effect.provide(NodeServices.layer),
      Effect.scoped
    ) as Effect.Effect<A, E>
  );
}

/** Exposes one expected proof failure at the test boundary. */
function reject<A, R>(effect: Effect.Effect<A, ContractReleaseError, R>) {
  return run(effect.pipe(Effect.flip));
}

/** Creates one minimal contract archive with distinguishable bytes. */
function createArchive(root: string, marker = "current") {
  const stage = join(root, marker, "package");
  const archive = join(root, `${marker}.tgz`);
  mkdirSync(stage, { recursive: true });
  writeFileSync(
    join(stage, "package.json"),
    `{"name":"@nakafa/aksara-contracts","version":"${VERSION}"}`
  );
  writeFileSync(join(stage, "marker.txt"), marker);
  execFileSync("tar", ["-czf", archive, "-C", join(root, marker), "package"]);
  return archive;
}

interface FakeToolInput {
  readonly archive: string;
  readonly failApi?: boolean;
  readonly failGit?: boolean;
  readonly release: unknown;
  readonly tag: unknown;
}

/** Creates one isolated executable that models the exact gh and git calls. */
function createFakeTool(root: string, input: FakeToolInput) {
  toolSequence += 1;
  const tool = join(root, `tool-${toolSequence}.ts`);
  writeFileSync(
    tool,
    `#!/usr/bin/env node
const { copyFileSync, mkdirSync } = require("node:fs");
const args = process.argv.slice(2);
if (args[0] === "api" && ${String(input.failApi ?? false)}) {
  process.exitCode = 1;
} else if (args[0] === "api") {
  process.stdout.write(args[1].includes("/releases/") ? ${JSON.stringify(
    JSON.stringify(input.release)
  )} : ${JSON.stringify(JSON.stringify(input.tag))});
} else if (args[0] === "release" && args[1] === "download") {
  const root = args[args.indexOf("--dir") + 1];
  const name = args[args.indexOf("--pattern") + 1];
  mkdirSync(root, { recursive: true });
  copyFileSync(${JSON.stringify(input.archive)}, root + "/" + name);
} else if (args[0] === "merge-base" && ${String(input.failGit ?? false)}) {
  process.exitCode = 1;
}
`
  );
  chmodSync(tool, 0o700);
  return tool;
}

/** Builds exact release metadata for one archive. */
function releaseMetadata(archive: string) {
  const bytes = readFileSync(archive);
  return {
    assets: [
      {
        digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
        name: `nakafa-aksara-contracts-${VERSION}.tgz`,
        size: statSync(archive).size,
      },
    ],
    draft: false,
    immutable: true,
    prerelease: false,
    tag_name: `contracts-v${VERSION}`,
    target_commitish: RELEASE_SHA,
  };
}

/** Creates one complete proof input with replaceable remote metadata. */
function proofInput(
  root: string,
  archive: string,
  release: unknown = releaseMetadata(archive),
  tag: unknown = { object: { sha: RELEASE_SHA, type: "commit" } },
  options: {
    readonly failApi?: boolean;
    readonly failGit?: boolean;
    readonly remote?: string;
  } = {}
): ContractProofInput {
  const packagePath = join(root, "package.json");
  writeFileSync(
    packagePath,
    `{"name":"@nakafa/aksara-contracts","version":"${VERSION}"}`
  );
  const tool = createFakeTool(root, {
    archive: options.remote ?? archive,
    ...(options.failApi === undefined ? {} : { failApi: options.failApi }),
    ...(options.failGit === undefined ? {} : { failGit: options.failGit }),
    release,
    tag,
  });
  return {
    archivePath: archive,
    packagePath,
    repository: "nakafaai/aksara",
    sourceSha: SOURCE_SHA,
    tools: { gh: tool, git: tool },
  };
}

describe("immutable contract release proof", () => {
  it("proves exact release bytes, tag, ancestry, and cryptographic commands", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-contract-proof-"));
    const archive = createArchive(root);
    const proof = await run(proveContractRelease(proofInput(root, archive)));

    expect(proof).toMatchObject({
      assetName: `nakafa-aksara-contracts-${VERSION}.tgz`,
      releaseSha: RELEASE_SHA,
      releaseTag: `contracts-v${VERSION}`,
      size: statSync(archive).size,
    });
  });

  it("rejects malformed proof inputs and remote metadata", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-proof-metadata-"));
    const archive = createArchive(root);
    const repository = await reject(
      proveContractRelease({
        ...proofInput(root, archive),
        repository: "invalid",
      })
    );
    expect(repository.reason).toBe("argument");
    const sourceSha = await reject(
      proveContractRelease({
        ...proofInput(root, archive),
        sourceSha: "invalid",
      })
    );
    expect(sourceSha.reason).toBe("argument");
    const release = await reject(
      proveContractRelease(proofInput(root, archive, "invalid"))
    );
    expect(release.reason).toBe("release");
    const command = await reject(
      proveContractRelease(
        proofInput(root, archive, undefined, undefined, { failApi: true })
      )
    );
    expect(command.reason).toBe("platform");
    const tag = await reject(
      proveContractRelease(
        proofInput(root, archive, releaseMetadata(archive), "invalid")
      )
    );
    expect(tag.reason).toBe("release");
  });

  it("rejects mutable, mismatched, or unauthenticated release state", async () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-proof-state-"));
    const archive = createArchive(root);
    const release = releaseMetadata(archive);
    const cases: readonly [unknown, unknown, string][] = [
      [{ ...release, immutable: false }, undefined, "final"],
      [{ ...release, assets: [] }, undefined, "archive and size"],
      [
        {
          ...release,
          assets: [{ ...release.assets[0], digest: "sha256:wrong" }],
        },
        undefined,
        "digest",
      ],
      [
        release,
        { object: { sha: SOURCE_SHA, type: "commit" } },
        "exact source commit",
      ],
    ];
    const errors = await Promise.all(
      cases.map(([candidate, tag]) =>
        reject(
          proveContractRelease(
            proofInput(
              root,
              archive,
              candidate,
              tag ?? { object: { sha: RELEASE_SHA, type: "commit" } }
            )
          )
        )
      )
    );
    for (const [index, error] of errors.entries()) {
      expect(error.detail).toContain(cases[index]?.[2] ?? "");
    }
    const ancestry = await reject(
      proveContractRelease(
        proofInput(root, archive, release, undefined, { failGit: true })
      )
    );
    expect(ancestry.reason).toBe("platform");
    const remote = createArchive(root, "remote");
    const bytes = await reject(
      proveContractRelease(
        proofInput(root, archive, release, undefined, { remote })
      )
    );
    expect(bytes.detail).toContain("differs from the current source build");
  }, 30_000);
});
