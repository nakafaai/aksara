import { existsSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Effect, Schema } from "effect";
import { parseInstalledManifest } from "#scripts/manifest";

const NODE_IMPORT_CONDITIONS = new Set(["node", "import", "default"]);

/** One installed-package contract or operating-system read could not be verified. */
export class InstallVerificationError extends Schema.TaggedError<InstallVerificationError>()(
  "InstallVerificationError",
  {
    cause: Schema.Unknown,
    message: Schema.String,
  }
) {}

/** Effect dependencies used to verify one isolated package installation. */
export interface InstallVerificationInput<E, R> {
  readonly consumerRoot: string;
  /** Imports one file URL or public package specifier from the consumer. */
  readonly importModule: (specifier: string) => Effect.Effect<unknown, E, R>;
  readonly packageName: string;
  /** Resolves one public package specifier from the consumer. */
  readonly resolveSpecifier: (specifier: string) => Effect.Effect<string, E, R>;
  /** Emits the final human-readable installation receipt. */
  readonly write: (message: string) => Effect.Effect<void, E, R>;
}

/** Reports whether a real path remains inside the isolated node_modules root. */
export function isInstalledPath(relativePath: string): boolean {
  return (
    relativePath.length > 0 &&
    !relativePath.startsWith(`..${sep}`) &&
    !isAbsolute(relativePath)
  );
}

/** Converts an unknown synchronous failure into the verifier's typed channel. */
function verificationError(cause: unknown, fallback: string) {
  return new InstallVerificationError({ cause, message: fallback });
}

/** Runs one synchronous Node operation without leaking an exception boundary. */
function tryVerification<A>(fallback: string, evaluate: () => A) {
  return Effect.try({
    catch: (cause) => verificationError(cause, fallback),
    try: evaluate,
  });
}

/** Requires one expected installation invariant through the typed error channel. */
function requireVerification(condition: boolean, message: string) {
  return condition
    ? Effect.void
    : Effect.fail(new InstallVerificationError({ cause: message, message }));
}

/** Verifies exact exports, files, imports, and resolution from one installation. */
export const verifyInstalledPackage = Effect.fn(
  "AksaraContracts.verifyInstalledPackage"
)(function* <E, R>({
  consumerRoot,
  importModule,
  packageName,
  resolveSpecifier,
  write,
}: InstallVerificationInput<E, R>) {
  const nodeModulesRoot = yield* tryVerification(
    "Unable to resolve the isolated node_modules directory.",
    () => realpathSync(join(consumerRoot, "node_modules"))
  );
  const packageRoot = yield* tryVerification(
    `Unable to resolve the installed ${packageName} directory.`,
    () => realpathSync(join(nodeModulesRoot, ...packageName.split("/")))
  );
  yield* requireVerification(
    isInstalledPath(relative(nodeModulesRoot, packageRoot)),
    `${packageName} must resolve inside the isolated consumer's node_modules`
  );

  const manifest = yield* tryVerification(
    `Unable to read the installed ${packageName} manifest.`,
    () =>
      parseInstalledManifest(
        readFileSync(join(packageRoot, "package.json"), "utf8")
      )
  );
  yield* requireVerification(
    manifest.name === packageName,
    "The packed package name changed"
  );

  let importedConditionCount = 0;
  const moduleSpecifiers: string[] = [];
  for (const [subpath, descriptor] of Object.entries(manifest.exports)) {
    yield* requireVerification(
      subpath === "." || (subpath.startsWith("./") && !subpath.includes("*")),
      `Only exact package exports are supported: ${subpath}`
    );
    const conditionEntries = Object.entries(descriptor);
    const typesTarget = conditionEntries.find(
      ([condition]) => condition === "types"
    );
    const importTargets = conditionEntries.filter(([condition]) =>
      NODE_IMPORT_CONDITIONS.has(condition)
    );
    yield* requireVerification(
      typesTarget !== undefined,
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
      const targetExists = yield* tryVerification(
        `Unable to inspect export ${subpath} condition ${condition}.`,
        () => existsSync(join(packageRoot, target))
      );
      yield* requireVerification(
        targetExists,
        `Export ${subpath} condition ${condition} is missing ${target}`
      );
    }
    for (const [, target] of importTargets) {
      moduleSpecifiers.push(pathToFileURL(join(packageRoot, target)).href);
      importedConditionCount += 1;
    }

    const publicSpecifier =
      subpath === "." ? packageName : `${packageName}/${subpath.slice(2)}`;
    const [, expectedTarget] = firstImportTarget;
    const resolvedSpecifier = yield* resolveSpecifier(publicSpecifier);
    const [resolvedPath, expectedPath] = yield* Effect.all([
      tryVerification(
        `Unable to inspect Node resolution for ${publicSpecifier}.`,
        () => realpathSync(fileURLToPath(resolvedSpecifier))
      ),
      tryVerification(
        `Unable to inspect the expected target for ${publicSpecifier}.`,
        () => realpathSync(join(packageRoot, expectedTarget))
      ),
    ]);
    yield* requireVerification(
      resolvedPath === expectedPath,
      `Node selected the wrong condition for ${publicSpecifier}`
    );
    moduleSpecifiers.push(publicSpecifier);
  }

  yield* Effect.forEach(moduleSpecifiers, importModule, {
    concurrency: "unbounded",
    discard: true,
  });
  yield* write(
    `Verified ${Object.keys(manifest.exports).length} exact exports and ${importedConditionCount} Node-importable conditions from the installed tarball.\n`
  );
});
