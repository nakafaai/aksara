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
} from "#scripts/consumer";
import {
  DEPENDENCY_SECTIONS,
  type PackageManifest,
  parsePackageManifest,
  parseWorkspaceManifest,
  textField,
} from "#scripts/manifest";

const NPM_CONFIG_ENVIRONMENT_PATTERN = /^(?:NPM|PNPM)_CONFIG_/i;
const NPM_CREDENTIAL_ENVIRONMENT_PATTERN = /^(?:NODE_AUTH_TOKEN|NPM_TOKEN)$/i;
const WORKSPACE_PROTOCOL_PATTERN = /^(?:catalog:|workspace:)/;
const { values } = parseArgs({
  options: {
    output: {
      type: "string",
    },
  },
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
const temporaryRoot = mkdtempSync(join(tmpdir(), "aksara-contracts-package-"));
const packDirectory = join(temporaryRoot, "pack");
const consumerDirectory = join(temporaryRoot, "consumer");
const inspectionDirectory = join(temporaryRoot, "inspection");
const verifierDirectory = join(consumerDirectory, "verify");
const emptyGlobalNpmConfig = join(temporaryRoot, "empty-global.npmrc");
const emptyUserNpmConfig = join(temporaryRoot, "empty-user.npmrc");

mkdirSync(packDirectory);
mkdirSync(consumerDirectory);
mkdirSync(inspectionDirectory);
mkdirSync(verifierDirectory);
writeFileSync(emptyGlobalNpmConfig, "");
writeFileSync(emptyUserNpmConfig, "registry=https://registry.npmjs.org/\n");

process.on("exit", () => {
  rmSync(temporaryRoot, { force: true, recursive: true });
});

/** Removes registry authentication sources before invoking package tooling. */
function createCredentialFreeEnvironment(): NodeJS.ProcessEnv {
  const environment = Object.fromEntries(
    Object.entries(process.env).filter(([name]) => {
      if (NPM_CREDENTIAL_ENVIRONMENT_PATTERN.test(name)) {
        return false;
      }
      return !NPM_CONFIG_ENVIRONMENT_PATTERN.test(name);
    })
  );

  return {
    ...environment,
    NPM_CONFIG_GLOBALCONFIG: emptyGlobalNpmConfig,
    NPM_CONFIG_USERCONFIG: emptyUserNpmConfig,
  };
}

/** Runs an executable without a shell so package paths cannot become commands. */
function run(
  executable: string,
  args: string[],
  options: ExecFileSyncOptions
): void {
  execFileSync(
    process.platform === "win32" ? `${executable}.cmd` : executable,
    args,
    options
  );
}

/** Rejects workspace-only dependency protocols in the publishable manifest. */
function assertPortableDependencies(manifest: PackageManifest): void {
  for (const section of DEPENDENCY_SECTIONS) {
    for (const version of Object.values(manifest[section] ?? {})) {
      assert.equal(
        typeof version,
        "string",
        `Packed ${section} versions must be strings`
      );
      assert.doesNotMatch(
        version,
        WORKSPACE_PROTOCOL_PATTERN,
        `Packed ${section} must use registry-installable versions`
      );
    }
  }
}

const childEnvironment = createCredentialFreeEnvironment();
run("pnpm", ["pack", "--pack-destination", packDirectory], {
  cwd: packageRoot,
  env: childEnvironment,
  stdio: "inherit",
});
const packedArchives = readdirSync(packDirectory).filter((path) =>
  path.endsWith(".tgz")
);
assert.equal(packedArchives.length, 1, "pnpm must produce exactly one tarball");

const [packedArchive] = packedArchives;
assert.ok(packedArchive, "The packed archive must be present");
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
  {
    env: childEnvironment,
    stdio: "inherit",
  }
);

const packedPackageRoot = join(inspectionDirectory, "package");
const packedManifest = parsePackageManifest(
  readFileSync(join(packedPackageRoot, "package.json"), "utf8")
);
const packedReadme = readFileSync(join(packedPackageRoot, "README.md"), "utf8");
const packedLicense = readFileSync(join(packedPackageRoot, "LICENSE"), "utf8");

assert.equal(
  packedManifest.name,
  sourceManifest.name,
  "The tarball package name changed"
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
  /^\d+\.\d+\.\d+$/u,
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
  {
    cwd: consumerDirectory,
    env: childEnvironment,
    stdio: "inherit",
  }
);

const publicSpecifiers = Object.keys(packedManifest.exports).map((subpath) =>
  subpath === "."
    ? packedManifest.name
    : `${packedManifest.name}/${subpath.slice(2)}`
);

writeFileSync(
  join(consumerDirectory, "consumer.ts"),
  createConsumerSource(sourceManifest.name, publicSpecifiers)
);
writeFileSync(
  join(consumerDirectory, "tsconfig.json"),
  createConsumerTsconfig()
);

run(resolve(packageRoot, "../../node_modules/.bin/tsc"), ["--project", "."], {
  cwd: consumerDirectory,
  env: childEnvironment,
  stdio: "inherit",
});

const installedVerifier = join(verifierDirectory, "verify-install.ts");
copyFileSync(
  join(scriptDirectory, "manifest.ts"),
  join(verifierDirectory, "manifest.ts")
);
copyFileSync(join(scriptDirectory, "verify-install.ts"), installedVerifier);
run(process.execPath, [installedVerifier, sourceManifest.name], {
  cwd: consumerDirectory,
  env: childEnvironment,
  stdio: "inherit",
});

if (values.output) {
  const outputPath = resolve(values.output);
  mkdirSync(dirname(outputPath), { recursive: true });
  copyFileSync(tarballPath, outputPath);
  process.stdout.write(`Preserved the verified tarball at ${outputPath}.\n`);
}

process.stdout.write(
  `Verified ${sourceManifest.name} as an isolated pnpm tarball consumer.\n`
);
