import { createRequire } from "node:module";
import { Effect, FileSystem, Path, Schema } from "effect";
import { runConsumerCommand } from "#scripts/consumer/command";
import { consumerEnvironment } from "#scripts/consumer/environment";
import { validatePackedManifest } from "#scripts/consumer/packed";
import {
  type ConsumerPackageInput,
  consumerFailure as failure,
  selectPackedArchive,
} from "#scripts/consumer/tools";
import {
  createReleaseManifest,
  parsePackageManifest,
  parseWorkspaceManifest,
} from "#scripts/manifest";

const EffectManifest = Schema.fromJsonString(
  Schema.Struct({ version: Schema.String })
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
  const scriptDirectory = path.resolve(path.dirname(scriptPath), "..");
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
    catch: failure(
      "manifest",
      `Contract package manifest ${packageFile("package.json")} is malformed`
    ),
    try: () => parsePackageManifest(sourceManifestSource),
  });
  const rootManifest = yield* Effect.try({
    catch: failure(
      "manifest",
      `Workspace package manifest ${path.join(workspaceRoot, "package.json")} is malformed`
    ),
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
  yield* Effect.forEach(
    [
      packDirectory,
      stageDirectory,
      consumerDirectory,
      inspectionDirectory,
      verifierDirectory,
    ],
    (directory) => fileSystem.makeDirectory(directory, { recursive: true })
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
  const childEnvironment = yield* consumerEnvironment(
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
      failure(
        "manifest",
        `Installed Effect manifest ${effectManifestPath} is malformed`
      )
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
    catch: failure(
      "manifest",
      `Packed package manifest ${path.join(packedRoot, "package.json")} is malformed`
    ),
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
