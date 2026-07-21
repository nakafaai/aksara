import assert from "node:assert/strict";
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
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const NPM_CONFIG_ENVIRONMENT_PATTERN = /^(?:NPM|PNPM)_CONFIG_/i;
const NPM_CREDENTIAL_ENVIRONMENT_PATTERN = /^(?:NODE_AUTH_TOKEN|NPM_TOKEN)$/i;
const WORKSPACE_PROTOCOL_PATTERN = /^(?:catalog:|workspace:)/;
const DEPENDENCY_SECTIONS = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
];
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(scriptDirectory, "..");
const workspaceRoot = resolve(packageRoot, "../..");
const sourceManifest = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf8")
);
const sourceLicense = readFileSync(join(packageRoot, "LICENSE"), "utf8");
const workspaceManifest = JSON.parse(
  readFileSync(join(workspaceRoot, "package.json"), "utf8")
);
const temporaryRoot = mkdtempSync(join(tmpdir(), "aksara-contracts-package-"));
const packDirectory = join(temporaryRoot, "pack");
const consumerDirectory = join(temporaryRoot, "consumer");
const inspectionDirectory = join(temporaryRoot, "inspection");
const emptyGlobalNpmConfig = join(temporaryRoot, "empty-global.npmrc");
const emptyUserNpmConfig = join(temporaryRoot, "empty-user.npmrc");

mkdirSync(packDirectory);
mkdirSync(consumerDirectory);
mkdirSync(inspectionDirectory);
writeFileSync(emptyGlobalNpmConfig, "");
writeFileSync(emptyUserNpmConfig, "registry=https://registry.npmjs.org/\n");

process.on("exit", () => {
  rmSync(temporaryRoot, { force: true, recursive: true });
});

/** Removes registry authentication sources before invoking package tooling. */
function createCredentialFreeEnvironment() {
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
function run(executable, args, options) {
  return execFileSync(
    process.platform === "win32" ? `${executable}.cmd` : executable,
    args,
    options
  );
}

/** Rejects workspace-only dependency protocols in the publishable manifest. */
function assertPortableDependencies(manifest) {
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
const packedManifest = JSON.parse(
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
  packedManifest.engines?.node,
  sourceManifest.engines.node,
  "The tarball must preserve its Node runtime contract"
);
assert.ok(
  packedReadme.trim().length > 0,
  "The tarball README.md must not be empty"
);
assertPortableDependencies(packedManifest);
assert.ok(
  packedManifest.exports && typeof packedManifest.exports === "object",
  "The tarball must preserve exact package exports"
);

writeFileSync(
  join(consumerDirectory, "package.json"),
  `${JSON.stringify(
    {
      dependencies: {
        [sourceManifest.name]: `file:${tarballPath}`,
      },
      name: "aksara-contracts-external-consumer",
      packageManager: workspaceManifest.packageManager,
      private: true,
      type: "module",
    },
    null,
    2
  )}\n`
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
const typeImports = publicSpecifiers.map(
  (specifier, index) =>
    `import type * as Contract${index} from ${JSON.stringify(specifier)};`
);
const typeReferences = publicSpecifiers.map(
  (_specifier, index) => `typeof Contract${index}`
);

writeFileSync(
  join(consumerDirectory, "consumer.ts"),
  `${typeImports.join("\n")}\n\nexport type InstalledContractSurface = [${typeReferences.join(", ")}];\n`
);
writeFileSync(
  join(consumerDirectory, "tsconfig.json"),
  `${JSON.stringify(
    {
      compilerOptions: {
        module: "NodeNext",
        moduleResolution: "NodeNext",
        noEmit: true,
        skipLibCheck: false,
        strict: true,
        target: "ES2022",
      },
      files: ["consumer.ts"],
    },
    null,
    2
  )}\n`
);

run(resolve(packageRoot, "../../node_modules/.bin/tsc"), ["--project", "."], {
  cwd: consumerDirectory,
  env: childEnvironment,
  stdio: "inherit",
});

const installedVerifier = join(consumerDirectory, "verify-install.mjs");
copyFileSync(join(scriptDirectory, "verify-install.mjs"), installedVerifier);
run(process.execPath, [installedVerifier, sourceManifest.name], {
  cwd: consumerDirectory,
  env: childEnvironment,
  stdio: "inherit",
});

console.log(
  `Verified ${sourceManifest.name} as an isolated pnpm tarball consumer.`
);
