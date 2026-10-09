import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  MutableList,
  Option,
  Path,
  Record as Rec,
  Schema,
} from "effect";
import { parseInstalledManifest } from "#scripts/manifest";

const NODE_IMPORT_CONDITIONS = HashSet.fromIterable([
  "node",
  "import",
  "default",
]);

/** One installed-package contract or operating-system read could not be verified. */
export class InstallVerificationError extends Schema.TaggedError<InstallVerificationError>()(
  "InstallVerificationError",
  {
    cause: Schema.Unknown,
    message: Schema.String,
  }
) {}

/** The request that one consumer inspection receives: specifiers to import, and public specifiers to resolve. */
const InstallInspectionSchema = Schema.Struct({
  imports: Schema.Array(Schema.String),
  resolutions: Schema.Array(Schema.String),
});

/** The request that one consumer inspection receives. */
export type InstallInspection = typeof InstallInspectionSchema.Type;

/** One public specifier whose Node resolution must select the expected target. */
const ExpectedResolutionSchema = Schema.Struct({
  expectedTarget: Schema.String,
  publicSpecifier: Schema.String,
});

type ExpectedResolution = typeof ExpectedResolutionSchema.Type;

/** Effect dependencies used to verify one isolated package installation. */
export interface InstallVerificationInput<E, R> {
  readonly consumerRoot: string;
  /**
   * Imports every listed specifier or file URL, and resolves every listed public
   * specifier, from inside the consumer. It answers with the resolved URL of each
   * resolved specifier.
   */
  readonly inspect: (
    inspection: InstallInspection
  ) => Effect.Effect<Readonly<Record<string, URL>>, E, R>;
  readonly packageName: string;
  /** Emits the final human-readable installation receipt. */
  readonly write: (message: string) => Effect.Effect<void, E, R>;
}

/** Reports whether a relative path stays inside the isolated node_modules root. */
export function isInstalledPath(
  path: Path.Path,
  relativePath: string
): boolean {
  return (
    relativePath.length > 0 &&
    !relativePath.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relativePath)
  );
}

/** Maps one platform, parse, or resolution failure to the verifier's typed failure. */
function verificationFailure(message: string) {
  return (cause: unknown) => new InstallVerificationError({ cause, message });
}

/** Requires one expected installation invariant through the typed error channel. */
function requireVerification(condition: boolean, message: string) {
  return condition
    ? Effect.void
    : Effect.fail(new InstallVerificationError({ cause: message, message }));
}

/** Resolves the real directory of the installed package inside the isolated node_modules. */
const locatePackageRoot = Effect.fn("AksaraContracts.locatePackageRoot")(
  function* (consumerRoot: string, packageName: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const nodeModulesRoot = yield* fileSystem
      .realPath(path.join(consumerRoot, "node_modules"))
      .pipe(
        Effect.mapError(
          verificationFailure(
            "Unable to resolve the isolated node_modules directory."
          )
        )
      );
    const packageRoot = yield* fileSystem
      .realPath(path.join(nodeModulesRoot, ...packageName.split("/")))
      .pipe(
        Effect.mapError(
          verificationFailure(
            `Unable to resolve the installed ${packageName} directory.`
          )
        )
      );
    yield* requireVerification(
      isInstalledPath(path, path.relative(nodeModulesRoot, packageRoot)),
      `${packageName} must resolve inside the isolated consumer's node_modules`
    );
    return packageRoot;
  }
);

/** Reads the installed manifest, and requires it to name the packed package. */
const readInstalledManifest = Effect.fn(
  "AksaraContracts.readInstalledManifest"
)(function* (packageRoot: string, packageName: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const manifestFile = path.join(packageRoot, "package.json");
  const manifest = yield* fileSystem.readFileString(manifestFile, "utf8").pipe(
    Effect.flatMap((source) =>
      Effect.try(() => parseInstalledManifest(source))
    ),
    Effect.mapError(
      verificationFailure(
        `Unable to read the installed manifest ${manifestFile}.`
      )
    )
  );
  yield* requireVerification(
    manifest.name === packageName,
    "The packed package name changed"
  );
  return manifest;
});

/**
 * Checks every exact export statically, then lists what the consumer must import
 * and resolve: the file URL of each Node-importable target, and each public specifier.
 */
const planExports = Effect.fn("AksaraContracts.planExports")(function* (
  packageRoot: string,
  packageName: string,
  exports: Readonly<Record<string, Readonly<Record<string, string>>>>
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const fileUrls = MutableList.make<string>();
  const resolutions = MutableList.make<ExpectedResolution>();
  for (const [subpath, descriptor] of Rec.toEntries(exports)) {
    yield* requireVerification(
      subpath === "." || (subpath.startsWith("./") && !subpath.includes("*")),
      `Only exact package exports are supported: ${subpath}`
    );
    const conditionEntries = Rec.toEntries(descriptor);
    const typesTarget = Arr.findFirst(
      conditionEntries,
      ([condition]) => condition === "types"
    );
    const importTargets = Arr.filter(conditionEntries, ([condition]) =>
      HashSet.has(NODE_IMPORT_CONDITIONS, condition)
    );
    yield* requireVerification(
      Option.isSome(typesTarget),
      `Export ${subpath} must declare a types condition`
    );
    const [firstImportTarget] = importTargets;
    if (!firstImportTarget) {
      return yield* new InstallVerificationError({
        cause: subpath,
        message: `Export ${subpath} must declare a Node-importable condition`,
      });
    }

    for (const [condition, target] of conditionEntries) {
      yield* requireVerification(
        target.startsWith("./dist/"),
        `Export ${subpath} condition ${condition} must target dist`
      );
      const targetExists = yield* fileSystem
        .exists(path.join(packageRoot, target))
        .pipe(
          Effect.mapError(
            verificationFailure(
              `Unable to inspect export ${subpath} condition ${condition}.`
            )
          )
        );
      yield* requireVerification(
        targetExists,
        `Export ${subpath} condition ${condition} is missing ${target}`
      );
    }
    for (const [, target] of importTargets) {
      // The package root comes from realPath, so every target path is absolute,
      // and Path.toFileUrl cannot fail for an absolute path.
      const fileUrl = yield* path
        .toFileUrl(path.join(packageRoot, target))
        .pipe(Effect.orDie);
      MutableList.append(fileUrls, fileUrl.href);
    }

    const [, expectedTarget] = firstImportTarget;
    MutableList.append(resolutions, {
      expectedTarget,
      publicSpecifier:
        subpath === "." ? packageName : `${packageName}/${subpath.slice(2)}`,
    });
  }
  return {
    fileUrls: MutableList.toArray(fileUrls),
    resolutions: MutableList.toArray(resolutions),
  };
});

/** Proves that the consumer resolved one public specifier to the file that the package declares. */
const verifyResolution = Effect.fn("AksaraContracts.verifyResolution")(
  function* (
    packageRoot: string,
    resolved: Readonly<Record<string, URL>>,
    resolution: ExpectedResolution
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const { expectedTarget, publicSpecifier } = resolution;
    const resolvedUrl = yield* Effect.fromOption(
      Rec.get(resolved, publicSpecifier)
    ).pipe(
      Effect.mapError(
        verificationFailure(
          `Unable to inspect Node resolution for ${publicSpecifier}.`
        )
      )
    );
    const [resolvedPath, expectedPath] = yield* Effect.all([
      path.fromFileUrl(resolvedUrl).pipe(
        Effect.flatMap((file) => fileSystem.realPath(file)),
        Effect.mapError(
          verificationFailure(
            `Unable to inspect Node resolution for ${publicSpecifier}.`
          )
        )
      ),
      fileSystem
        .realPath(path.join(packageRoot, expectedTarget))
        .pipe(
          Effect.mapError(
            verificationFailure(
              `Unable to inspect the expected target for ${publicSpecifier}.`
            )
          )
        ),
    ]);
    yield* requireVerification(
      resolvedPath === expectedPath,
      `Node selected the wrong condition for ${publicSpecifier}`
    );
  }
);

/** Verifies exact exports, files, imports, and resolution from one installation. */
export const verifyInstalledPackage = Effect.fn(
  "AksaraContracts.verifyInstalledPackage"
)(function* <E, R>({
  consumerRoot,
  inspect,
  packageName,
  write,
}: InstallVerificationInput<E, R>) {
  const packageRoot = yield* locatePackageRoot(consumerRoot, packageName);
  const manifest = yield* readInstalledManifest(packageRoot, packageName);
  const plan = yield* planExports(packageRoot, packageName, manifest.exports);
  const publicSpecifiers = Arr.map(
    plan.resolutions,
    (resolution) => resolution.publicSpecifier
  );
  const resolved = yield* inspect({
    imports: Arr.appendAll(plan.fileUrls, publicSpecifiers),
    resolutions: publicSpecifiers,
  });
  yield* Effect.forEach(
    plan.resolutions,
    (resolution) => verifyResolution(packageRoot, resolved, resolution),
    { discard: true }
  );
  yield* write(
    `Verified ${Rec.keys(manifest.exports).length} exact exports and ${plan.fileUrls.length} Node-importable conditions from the installed tarball.\n`
  );
});
