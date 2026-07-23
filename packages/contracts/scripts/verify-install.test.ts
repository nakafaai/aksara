import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isInstalledPath,
  verifyInstalledPackage,
} from "#scripts/verify-install";

const temporaryRoots: string[] = [];
const packageName = "@nakafa/test-package";

interface InstallFixture {
  readonly consumerRoot: string;
  readonly packageRoot: string;
}

/** Creates one isolated installed package tree with exact export files. */
function createInstallFixture(
  exports: Readonly<Record<string, unknown>> = {
    ".": {
      browser: "./dist/index.js",
      import: "./dist/index.js",
      types: "./dist/index.d.ts",
    },
    "./feature": {
      node: "./dist/feature.js",
      types: "./dist/feature.d.ts",
    },
  },
  installedName = packageName
): InstallFixture {
  const consumerRoot = mkdtempSync(join(tmpdir(), "aksara-install-test-"));
  const packageRoot = join(
    consumerRoot,
    "node_modules",
    "@nakafa",
    "test-package"
  );
  temporaryRoots.push(consumerRoot);
  mkdirSync(join(packageRoot, "dist"), { recursive: true });
  writeFileSync(
    join(packageRoot, "package.json"),
    JSON.stringify({ exports, name: installedName })
  );
  for (const file of ["index.js", "index.d.ts", "feature.js", "feature.d.ts"]) {
    writeFileSync(join(packageRoot, "dist", file), "export {};\n");
  }
  return { consumerRoot, packageRoot };
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe("installed package verification", () => {
  it("recognizes only paths inside node_modules", () => {
    expect(isInstalledPath("")).toBe(false);
    expect(isInstalledPath("../outside")).toBe(false);
    expect(isInstalledPath("/absolute")).toBe(false);
    expect(isInstalledPath("@nakafa/test-package")).toBe(true);
  });

  it("imports every Node condition and public export", async () => {
    const { consumerRoot, packageRoot } = createInstallFixture();
    const imported: string[] = [];
    const write = vi.fn();

    await verifyInstalledPackage({
      consumerRoot,
      importModule: (specifier) => {
        imported.push(specifier);
        return Promise.resolve();
      },
      packageName,
      resolveSpecifier: (specifier) =>
        pathToFileURL(
          specifier === packageName
            ? join(packageRoot, "dist/index.js")
            : join(packageRoot, "dist/feature.js")
        ).href,
      write,
    });

    expect(imported).toHaveLength(4);
    expect(imported).toContain(packageName);
    expect(imported).toContain(`${packageName}/feature`);
    expect(write).toHaveBeenCalledWith(
      "Verified 2 exact exports and 2 Node-importable conditions from the installed tarball.\n"
    );
  });

  it("rejects wildcard exports and missing required conditions", async () => {
    const wildcard = createInstallFixture({
      "./*": {
        import: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
    });
    const missingTypes = createInstallFixture({
      ".": { import: "./dist/index.js" },
    });
    const missingNode = createInstallFixture({
      ".": {
        browser: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
    });

    await expect(
      verifyInstalledPackage({
        consumerRoot: wildcard.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(wildcard.packageRoot, "dist/index.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("Only exact package exports are supported");
    await expect(
      verifyInstalledPackage({
        consumerRoot: missingTypes.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(missingTypes.packageRoot, "dist/index.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("must declare a types condition");
    await expect(
      verifyInstalledPackage({
        consumerRoot: missingNode.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(missingNode.packageRoot, "dist/index.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("must declare a Node-importable condition");
  });

  it("rejects targets outside dist or absent from the tarball", async () => {
    const outside = createInstallFixture({
      ".": {
        import: "./dist/index.js",
        types: "./src/index.d.ts",
      },
    });
    const missing = createInstallFixture({
      ".": {
        import: "./dist/missing.js",
        types: "./dist/index.d.ts",
      },
    });

    await expect(
      verifyInstalledPackage({
        consumerRoot: outside.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(outside.packageRoot, "dist/index.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("must target dist");
    await expect(
      verifyInstalledPackage({
        consumerRoot: missing.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(missing.packageRoot, "dist/missing.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("is missing ./dist/missing.js");
  });

  it("rejects changed identity and wrong public resolution", async () => {
    const changed = createInstallFixture(undefined, "@nakafa/changed");
    const wrong = createInstallFixture();

    await expect(
      verifyInstalledPackage({
        consumerRoot: changed.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(changed.packageRoot, "dist/index.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("The packed package name changed");
    await expect(
      verifyInstalledPackage({
        consumerRoot: wrong.consumerRoot,
        importModule: async () => undefined,
        packageName,
        resolveSpecifier: () =>
          pathToFileURL(join(wrong.packageRoot, "dist/feature.js")).href,
        write: () => undefined,
      })
    ).rejects.toThrow("Node selected the wrong condition");
  });
});
