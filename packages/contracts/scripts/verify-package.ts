import assert from "node:assert/strict";
import type { ExecFileSyncOptions } from "node:child_process";
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { isRecord } from "effect/Predicate";
import {
  createConsumerManifest,
  createConsumerSource,
  createConsumerTsconfig,
  createCredentialFreeEnvironment,
  createInstallRunner,
  executablePath,
  selectPackedArchive,
} from "#scripts/consumer";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  parsePackageManifest,
  parseWorkspaceManifest,
  textField,
} from "#scripts/manifest";

const EXACT_VERSION_PATTERN = /^\d+\.\d+\.\d+$/u;

/** Runs an executable without a shell so package paths cannot become commands. */
function run(
  executable: string,
  args: readonly string[],
  options: ExecFileSyncOptions
): void {
  execFileSync(
    executablePath(executable, process.platform),
    [...args],
    options
  );
}

/** Converts one exact export subpath into its public package specifier. */
export function publicSpecifier(packageName: string, subpath: string): string {
  return subpath === "." ? packageName : `${packageName}/${subpath.slice(2)}`;
}

/** Removes only the verifier-owned temporary package root. */
export function removeVerifierRoot(path: string): void {
  rmSync(path, { force: true, recursive: true });
}

/** Preserves the verified archive only when the caller requests an output path. */
export function preserveTarball(
  output: string | undefined,
  tarballPath: string
): void {
  if (!output) {
    return;
  }
  const outputPath = resolve(output);
  mkdirSync(dirname(outputPath), { recursive: true });
  copyFileSync(tarballPath, outputPath);
  process.stdout.write(`Preserved the verified tarball at ${outputPath}.\n`);
}

/** Builds and verifies one exact contracts tarball in an isolated pnpm consumer. */
export function verifyPackage(args: readonly string[]): void {
  const { values } = parseArgs({
    args: [...args],
    options: { output: { type: "string" } },
    strict: true,
  });
  const scriptDirectory = dirname(fileURLToPath(import.meta.url));
  const packageRoot = resolve(scriptDirectory, "..");
  const workspaceRoot = resolve(packageRoot, "../..");
  const sourceManifest = parsePackageManifest(
    readFileSync(join(packageRoot, "package.json"), "utf8")
  );
  const sourceLicense = readFileSync(join(packageRoot, "LICENSE"), "utf8");
  const rootManifest = parseWorkspaceManifest(
    readFileSync(join(workspaceRoot, "package.json"), "utf8")
  );
  const temporaryRoot = mkdtempSync(
    join(tmpdir(), "aksara-contracts-package-")
  );
  const packDirectory = join(temporaryRoot, "pack");
  const consumerDirectory = join(temporaryRoot, "consumer");
  const inspectionDirectory = join(temporaryRoot, "inspection");
  const verifierDirectory = join(consumerDirectory, "verify");
  const emptyGlobalConfig = join(temporaryRoot, "empty-global.npmrc");
  const emptyUserConfig = join(temporaryRoot, "empty-user.npmrc");

  mkdirSync(packDirectory);
  mkdirSync(consumerDirectory);
  mkdirSync(inspectionDirectory);
  mkdirSync(verifierDirectory);
  writeFileSync(emptyGlobalConfig, "");
  writeFileSync(emptyUserConfig, "registry=https://registry.npmjs.org/\n");
  process.once("exit", removeVerifierRoot.bind(undefined, temporaryRoot));

  const childEnvironment = createCredentialFreeEnvironment(
    process.env,
    emptyGlobalConfig,
    emptyUserConfig
  );
  run(
    "pnpm",
    [
      "pack",
      "--config.ignore-scripts=true",
      "--pack-destination",
      packDirectory,
    ],
    { cwd: packageRoot, env: childEnvironment, stdio: "inherit" }
  );
  const packedArchive = selectPackedArchive(readdirSync(packDirectory));
  const tarballPath = join(packDirectory, packedArchive);

  run(
    "tar",
    [
      "-xzf",
      tarballPath,
      "-C",
      inspectionDirectory,
      "package/package.json",
      "package/README.md",
      "package/LICENSE",
    ],
    { env: childEnvironment, stdio: "inherit" }
  );
  const packedPackageRoot = join(inspectionDirectory, "package");
  const packedManifest = parsePackageManifest(
    readFileSync(join(packedPackageRoot, "package.json"), "utf8")
  );
  const packedReadme = readFileSync(
    join(packedPackageRoot, "README.md"),
    "utf8"
  );
  const packedLicense = readFileSync(
    join(packedPackageRoot, "LICENSE"),
    "utf8"
  );

  assertContractPackageMetadata(sourceManifest);
  assertContractPackageMetadata(packedManifest);
  assert.equal(
    packedManifest.name,
    sourceManifest.name,
    "The tarball package name changed"
  );
  assert.equal(
    packedManifest.description,
    sourceManifest.description,
    "The tarball package description changed"
  );
  assert.equal(
    packedManifest.license,
    "SEE LICENSE IN LICENSE",
    "The tarball must point to its included custom license"
  );
  assert.equal(
    packedLicense,
    sourceLicense,
    "The tarball must preserve the exact approved software license"
  );
  assert.equal(
    packedManifest.engines.node,
    sourceManifest.engines.node,
    "The tarball must preserve its Node runtime contract"
  );
  assert.ok(
    packedReadme.trim().length > 0,
    "The tarball README.md must not be empty"
  );
  assertPortableDependencies(packedManifest);
  assert.deepEqual(
    packedManifest.imports["#contracts/*"],
    {
      default: "./dist/*.js",
      types: ["./src/*.ts", "./dist/*.d.ts"],
    },
    "The packed contract imports must preserve source and declaration resolution"
  );
  const effectVersion = textField(
    packedManifest.peerDependencies?.effect,
    "The packed contract must declare its exact Effect peer runtime"
  );
  assert.match(
    effectVersion,
    EXACT_VERSION_PATTERN,
    "The packed Effect peer must be an exact semantic version"
  );
  assert.equal(
    packedManifest.dependencies?.effect,
    undefined,
    "Effect must not be a nested runtime dependency"
  );
  const require = createRequire(import.meta.url);
  const installedEffectManifest: unknown = JSON.parse(
    readFileSync(require.resolve("effect/package.json"), "utf8")
  );
  assert.ok(
    isRecord(installedEffectManifest),
    "Effect package must be an object"
  );
  assert.equal(
    effectVersion,
    installedEffectManifest.version,
    "Packed and development Effect versions must match"
  );

  writeFileSync(
    join(consumerDirectory, "package.json"),
    createConsumerManifest({
      effectVersion,
      packageManager: rootManifest.packageManager,
      packageName: sourceManifest.name,
      tarballPath,
    })
  );
  run(
    "pnpm",
    ["install", "--ignore-scripts", "--frozen-lockfile=false", "--prod"],
    { cwd: consumerDirectory, env: childEnvironment, stdio: "inherit" }
  );

  const publicSpecifiers = Object.keys(packedManifest.exports).map((subpath) =>
    publicSpecifier(packedManifest.name, subpath)
  );
  writeFileSync(
    join(consumerDirectory, "consumer.ts"),
    createConsumerSource(sourceManifest.name, publicSpecifiers)
  );
  writeFileSync(
    join(consumerDirectory, "tsconfig.json"),
    createConsumerTsconfig()
  );
  run(resolve(workspaceRoot, "node_modules/.bin/tsc"), ["--project", "."], {
    cwd: consumerDirectory,
    env: childEnvironment,
    stdio: "inherit",
  });

  const installedRunner = join(verifierDirectory, "run.ts");
  copyFileSync(
    join(scriptDirectory, "manifest.ts"),
    join(verifierDirectory, "manifest.ts")
  );
  copyFileSync(
    join(scriptDirectory, "verify-install.ts"),
    join(verifierDirectory, "verify-install.ts")
  );
  writeFileSync(installedRunner, createInstallRunner());
  run(process.execPath, [installedRunner, sourceManifest.name], {
    cwd: consumerDirectory,
    env: childEnvironment,
    stdio: "inherit",
  });

  preserveTarball(values.output, tarballPath);
  process.stdout.write(
    `Verified ${sourceManifest.name} as an isolated pnpm tarball consumer.\n`
  );
}

verifyPackage(process.argv.slice(2));
