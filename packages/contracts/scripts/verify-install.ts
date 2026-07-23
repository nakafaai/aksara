import assert from "node:assert/strict";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseInstalledManifest } from "#scripts/manifest";

const NODE_IMPORT_CONDITIONS = new Set(["node", "import", "default"]);

/** Runtime dependencies used to verify one isolated package installation. */
export interface InstallVerificationInput {
  readonly consumerRoot: string;
  /** Imports one file URL or public package specifier from the consumer. */
  readonly importModule: (specifier: string) => Promise<unknown>;
  readonly packageName: string;
  /** Resolves one public package specifier from the consumer. */
  readonly resolveSpecifier: (specifier: string) => string;
  /** Emits the final human-readable installation receipt. */
  readonly write: (message: string) => void;
}

/** Reports whether a real path remains inside the isolated node_modules root. */
export function isInstalledPath(relativePath: string): boolean {
  return (
    relativePath.length > 0 &&
    !relativePath.startsWith(`..${sep}`) &&
    !isAbsolute(relativePath)
  );
}

/** Verifies exact exports, files, imports, and resolution from one installation. */
export async function verifyInstalledPackage({
  consumerRoot,
  importModule,
  packageName,
  resolveSpecifier,
  write,
}: InstallVerificationInput): Promise<void> {
  const nodeModulesRoot = realpathSync(join(consumerRoot, "node_modules"));
  const packageRoot = realpathSync(
    join(nodeModulesRoot, ...packageName.split("/"))
  );
  assert.ok(
    isInstalledPath(relative(nodeModulesRoot, packageRoot)),
    `${packageName} must resolve inside the isolated consumer's node_modules`
  );

  const manifest = parseInstalledManifest(
    readFileSync(join(packageRoot, "package.json"), "utf8")
  );
  assert.equal(manifest.name, packageName, "The packed package name changed");

  let importedConditionCount = 0;
  const moduleImports: Promise<unknown>[] = [];
  for (const [subpath, descriptor] of Object.entries(manifest.exports)) {
    assert.ok(
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
    assert.ok(typesTarget, `Export ${subpath} must declare a types condition`);
    assert.ok(
      importTargets.length > 0,
      `Export ${subpath} must declare a Node-importable condition`
    );

    for (const [condition, target] of conditionEntries) {
      assert.ok(
        target.startsWith("./dist/"),
        `Export ${subpath} condition ${condition} must target dist`
      );
      assert.ok(
        existsSync(join(packageRoot, target)),
        `Export ${subpath} condition ${condition} is missing ${target}`
      );
    }
    for (const [, target] of importTargets) {
      moduleImports.push(
        importModule(pathToFileURL(join(packageRoot, target)).href)
      );
      importedConditionCount += 1;
    }

    const publicSpecifier =
      subpath === "." ? packageName : `${packageName}/${subpath.slice(2)}`;
    const expectedTarget = importTargets[0]?.[1];
    assert.ok(expectedTarget, `Export ${subpath} must resolve in Node`);
    assert.equal(
      realpathSync(fileURLToPath(resolveSpecifier(publicSpecifier))),
      realpathSync(join(packageRoot, expectedTarget)),
      `Node selected the wrong condition for ${publicSpecifier}`
    );
    moduleImports.push(importModule(publicSpecifier));
  }

  await Promise.all(moduleImports);
  write(
    `Verified ${Object.keys(manifest.exports).length} exact exports and ${importedConditionCount} Node-importable conditions from the installed tarball.\n`
  );
}
