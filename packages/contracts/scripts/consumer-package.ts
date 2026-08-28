import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { Effect, FileSystem, Path, Schema } from "effect";
import {
  type ConsumerPackageInput,
  createCredentialFreeEnvironment,
  consumerFailure as failure,
  runConsumerCommand,
  selectPackedArchive,
} from "#scripts/consumer";
import {
  assertContractPackageMetadata,
  assertPortableDependencies,
  createReleaseManifest,
  type PackageManifest,
  parsePackageManifest,
  parseWorkspaceManifest,
  textField,
} from "#scripts/manifest";

const EXACT_VERSION_PATTERN =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)*)?$/u;
const EffectManifest = Schema.fromJsonString(
  Schema.Struct({ version: Schema.String })
);

interface PackedManifestInput {
  readonly effectVersion: string;
  readonly packedLicense: string;
  readonly packedManifest: PackageManifest;
  readonly packedReadme: string;
  readonly sourceLicense: string;
  readonly sourceManifest: PackageManifest;
}

/** Validates archive metadata while converting assertion throws to typed data. */
const validatePackedManifest = Effect.fn(
  "AksaraContracts.validatePackedConsumerManifest"
)(
  ({
    effectVersion,
    packedLicense,
    packedManifest,
    packedReadme,
    sourceLicense,
    sourceManifest,
  }: PackedManifestInput) =>
    Effect.try({
      catch: failure(
        "manifest",
        "Packed contract metadata verification failed"
      ),
      try: () => {
        const p = packedManifest;
        const s = sourceManifest;
        assertContractPackageMetadata(s);
        assertContractPackageMetadata(p);
        assert.equal(p.name, s.name, "The tarball package name changed");
        assert.equal(
          p.description,
          s.description,
          "The tarball package description changed"
        );
        assert.equal(
          p.license,
          "SEE LICENSE IN LICENSE",
          "The tarball must point to its included custom license"
        );
        assert.equal(
          packedLicense,
          sourceLicense,
          "The tarball must preserve the exact approved software license"
        );
        assert.equal(
          p.engines.node,
          s.engines.node,
          "The tarball must preserve its Node runtime contract"
        );
        assert.ok(
          packedReadme.trim().length > 0,
          "The tarball README.md must not be empty"
        );
        assertPortableDependencies(p);
        assert.deepEqual(
          p.imports["#contracts/*"],
          {
            default: "./dist/*.js",
            types: "./dist/*.d.ts",
          },
          "The released contract imports must resolve only archive files"
        );
        const packedEffectVersion = textField(
          p.peerDependencies?.effect,
          "The packed contract must declare its exact Effect peer runtime"
        );
        assert.match(
          packedEffectVersion,
          EXACT_VERSION_PATTERN,
          "The packed Effect peer must be an exact semantic version"
        );
        assert.equal(
          p.dependencies?.effect,
          undefined,
          "Effect must not be a nested runtime dependency"
        );
        assert.equal(
          packedEffectVersion,
          effectVersion,
          "Packed and development Effect versions must match"
        );
        return packedEffectVersion;
      },
    })
);

/** Builds and validates one exact release archive in a scoped workspace. */
export const stageConsumerPackage = Effect.fn(
  "AksaraContracts.stageConsumerPackage"
)(function* (input: ConsumerPackageInput) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const scriptPath = yield* path
    .fromFileUrl(new URL(import.meta.url))
    .pipe(
      Effect.mapError(failure("filesystem", "Script path resolution failed"))
    );
  const scriptDirectory = path.dirname(scriptPath);
  const packageRoot = path.resolve(scriptDirectory, "..");
  const workspaceRoot = path.resolve(packageRoot, "../..");
  /** Resolves one source-package file. */
  const packageFile = (name: string) => path.join(packageRoot, name);
  /** Reads one owned UTF-8 input through the platform service. */
  const read = (file: string) =>
    fileSystem
      .readFileString(file, "utf8")
      .pipe(Effect.mapError(failure("filesystem", `Unable to read ${file}`)));
  const [sourceManifestSource, sourceLicense, rootManifestSource] =
    yield* Effect.all([
      read(packageFile("package.json")),
      read(packageFile("LICENSE")),
      read(path.join(workspaceRoot, "package.json")),
    ]);
  const sourceManifest = yield* Effect.try({
    catch: failure("manifest", "Contract package manifest is malformed"),
    try: () => parsePackageManifest(sourceManifestSource),
  });
  const rootManifest = yield* Effect.try({
    catch: failure("manifest", "Workspace package manifest is malformed"),
    try: () => parseWorkspaceManifest(rootManifestSource),
  });
  const temporaryRoot = yield* fileSystem
    .makeTempDirectoryScoped({
      ...(input.temporaryDirectory === undefined
        ? {}
        : { directory: input.temporaryDirectory }),
      prefix: "aksara-contracts-package-",
    })
    .pipe(
      Effect.mapError(
        failure("filesystem", "Temporary directory creation failed")
      )
    );
  const packDirectory = path.join(temporaryRoot, "pack");
  const stageDirectory = path.join(temporaryRoot, "stage");
  /** Resolves one staged package file. */
  const stageFile = (name: string) => path.join(stageDirectory, name);
  const consumerDirectory = path.join(temporaryRoot, "consumer");
  const inspectionDirectory = path.join(temporaryRoot, "inspection");
  const verifierDirectory = path.join(consumerDirectory, "verify");
  const emptyGlobalConfig = path.join(temporaryRoot, "empty-global.npmrc");
  const emptyUserConfig = path.join(temporaryRoot, "empty-user.npmrc");
  yield* Effect.all(
    [
      packDirectory,
      stageDirectory,
      consumerDirectory,
      inspectionDirectory,
      verifierDirectory,
    ].map((directory) =>
      fileSystem.makeDirectory(directory, { recursive: true })
    )
  ).pipe(Effect.mapError(failure("filesystem", "Workspace staging failed")));
  yield* Effect.all([
    fileSystem.writeFileString(emptyGlobalConfig, ""),
    fileSystem.writeFileString(
      emptyUserConfig,
      "registry=https://registry.npmjs.org/\n"
    ),
  ]).pipe(
    Effect.mapError(failure("filesystem", "npm configuration staging failed"))
  );
  const childEnvironment = createCredentialFreeEnvironment(
    input.environment,
    emptyGlobalConfig,
    emptyUserConfig
  );
  const effectManifestPath = yield* Effect.try({
    catch: failure("filesystem", "Installed Effect manifest resolution failed"),
    try: () => createRequire(import.meta.url).resolve("effect/package.json"),
  });
  const effectManifestSource = yield* read(effectManifestPath);
  const effectManifest = yield* Schema.decodeEffect(EffectManifest)(
    effectManifestSource,
    { onExcessProperty: "ignore" }
  ).pipe(
    Effect.mapError(
      failure("manifest", "Installed Effect manifest is malformed")
    )
  );
  const releaseManifest = yield* Effect.try({
    catch: failure("manifest", "Release manifest creation failed"),
    try: () =>
      createReleaseManifest(sourceManifestSource, effectManifest.version),
  });
  yield* Effect.all([
    fileSystem.copyFile(packageFile("LICENSE"), stageFile("LICENSE")),
    fileSystem.copyFile(packageFile("README.md"), stageFile("README.md")),
    fileSystem.copy(packageFile("dist"), stageFile("dist")),
    fileSystem.writeFileString(stageFile("package.json"), releaseManifest),
  ]).pipe(
    Effect.mapError(failure("filesystem", "Contract package staging failed"))
  );
  const tools = { pnpm: "pnpm", tar: "tar", ...input.tools };
  yield* runConsumerCommand(
    tools.pnpm,
    [
      "pack",
      "--config.ignore-scripts=true",
      "--pack-destination",
      packDirectory,
    ],
    childEnvironment,
    input.platform,
    "Contract package creation",
    stageDirectory
  );
  const packedArchive = yield* fileSystem.readDirectory(packDirectory).pipe(
    Effect.mapError(failure("filesystem", "Packed archive listing failed")),
    Effect.flatMap((entries) =>
      Effect.try({
        catch: failure("manifest", "Packed archive selection failed"),
        try: () => selectPackedArchive(entries),
      })
    )
  );
  const tarballPath = path.join(packDirectory, packedArchive);
  yield* runConsumerCommand(
    tools.tar,
    [
      "-xzf",
      tarballPath,
      "-C",
      inspectionDirectory,
      "package/package.json",
      "package/README.md",
      "package/LICENSE",
    ],
    childEnvironment,
    input.platform,
    "Contract package inspection"
  );
  const packedRoot = path.join(inspectionDirectory, "package");
  const [packedManifestSource, packedReadme, packedLicense] = yield* Effect.all(
    [
      read(path.join(packedRoot, "package.json")),
      read(path.join(packedRoot, "README.md")),
      read(path.join(packedRoot, "LICENSE")),
    ]
  );
  const packedManifest = yield* Effect.try({
    catch: failure("manifest", "Packed package manifest is malformed"),
    try: () => parsePackageManifest(packedManifestSource),
  });
  const effectVersion = yield* validatePackedManifest({
    effectVersion: effectManifest.version,
    packedLicense,
    packedManifest,
    packedReadme,
    sourceLicense,
    sourceManifest,
  });
  return {
    childEnvironment,
    consumerDirectory,
    effectVersion,
    packageManager: rootManifest.packageManager,
    packageName: sourceManifest.name,
    packedManifest,
    pnpm: tools.pnpm,
    scriptDirectory,
    tarballPath,
    verifierDirectory,
    workspaceRoot,
  };
});
