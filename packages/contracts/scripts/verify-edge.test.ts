import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { runtimeImports, verifyEdgeEntry } from "#scripts/verify-edge";

/** Writes one emitted module into a verifier-owned temporary dist tree. */
function writeModule(root: string, path: string, source: string) {
  const file = join(root, `${path}.js`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, source);
}

describe("Edge contract verification", () => {
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
    writeModule(root, "private", 'import "effect";');
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
});
