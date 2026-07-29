import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import {
  EDGE_CONTRACT_EXPORTS,
  runEdgeVerification,
  runtimeImports,
  verifyEdgeContracts,
  verifyEdgeEntry,
} from "#scripts/verify-edge";

/** Writes one emitted module into a verifier-owned temporary dist tree. */
function writeModule(root: string, path: string, source: string) {
  const file = join(root, `${path}.js`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, source);
}

/** Writes the exact import conditions required by the Edge verifier. */
function writePackageManifest(
  root: string,
  canonicalCondition: "import" | "node" = "import"
) {
  const exports = Object.fromEntries(
    EDGE_CONTRACT_EXPORTS.map((entry) => [
      `./${entry}`,
      {
        [entry === "release/canonical" ? canonicalCondition : "import"]:
          `./dist/${entry}.js`,
        types: `./dist/${entry}.d.ts`,
      },
    ])
  );
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ exports, name: "@nakafa/aksara-contracts" })
  );
}

describe("Edge contract verification", () => {
  it("runs only for the selected CLI entrypoint", () => {
    const packageRoot = mkdtempSync(join(tmpdir(), "aksara-edge-cli-"));
    writePackageManifest(packageRoot);
    for (const entry of EDGE_CONTRACT_EXPORTS) {
      writeModule(join(packageRoot, "dist"), entry, "export {};");
    }
    const entry = join(packageRoot, "verify-edge.ts");
    const moduleUrl = pathToFileURL(entry).href;

    expect(
      runEdgeVerification({
        entry: undefined,
        moduleUrl,
        packageRoot,
      })
    ).toBe(false);
    expect(
      runEdgeVerification({
        entry: join(packageRoot, "other.ts"),
        moduleUrl,
        packageRoot,
      })
    ).toBe(false);
    expect(runEdgeVerification({ entry, moduleUrl, packageRoot })).toBe(true);
    rmSync(packageRoot, { recursive: true });
  });

  it("traces private, relative, re-exported, and dynamic imports", () => {
    const root = mkdtempSync(join(tmpdir(), "aksara-edge-pass-"));
    writeModule(
      root,
      "entry",
      [
        'import "#contracts/private";',
        'export * from "./relative.js";',
        'export * from "./extensionless";',
        'const loaded = import("#contracts/dynamic");',
      ].join("\n")
    );
    writeModule(root, "private", 'import "./entry.js"; import "effect";');
    writeModule(root, "relative", 'export const value = "safe";');
    writeModule(root, "extensionless", 'export const value = "safe";');
    writeModule(root, "dynamic", 'export const value = "safe";');

    const visited = verifyEdgeEntry(root, "entry");

    expect(visited.size).toBe(5);
    expect(
      runtimeImports(
        "inline.js",
        'import "a"; export * from "b"; import("c"); import(variable);'
      )
    ).toEqual(["a", "b", "c"]);
    rmSync(root, { recursive: true });
  });

  it("rejects Node builtins and missing internal modules", () => {
    const nodeRoot = mkdtempSync(join(tmpdir(), "aksara-edge-node-"));
    writeModule(nodeRoot, "entry", 'import "#contracts/crypto";');
    writeModule(nodeRoot, "crypto", 'import "node:crypto";');

    expect(() => verifyEdgeEntry(nodeRoot, "entry")).toThrow(
      "reaches Node-only import node:crypto"
    );
    rmSync(nodeRoot, { recursive: true });

    const missingRoot = mkdtempSync(join(tmpdir(), "aksara-edge-missing-"));
    writeModule(missingRoot, "entry", 'import "#contracts/missing";');

    expect(() => verifyEdgeEntry(missingRoot, "entry")).toThrow(
      "Edge contract module is missing"
    );
    rmSync(missingRoot, { recursive: true });
  });

  it("rejects Edge entries exposed only through a Node condition", () => {
    const packageRoot = mkdtempSync(join(tmpdir(), "aksara-edge-export-"));
    writePackageManifest(packageRoot, "node");
    for (const entry of EDGE_CONTRACT_EXPORTS) {
      writeModule(join(packageRoot, "dist"), entry, "export {};");
    }

    expect(() => verifyEdgeContracts(packageRoot)).toThrow(
      "Edge contract export must declare an import condition: release/canonical"
    );
    rmSync(packageRoot, { recursive: true });
  });
});
