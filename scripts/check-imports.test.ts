import { describe, expect, it, vi } from "vitest";
import {
  createWorkspaceIdentityResolver,
  importViolations,
} from "#scripts/check-imports";

/** Creates one manifest reader for import-boundary policy tests. */
function createManifestReader(manifests: Readonly<Record<string, unknown>>) {
  return (path: string) => JSON.stringify(manifests[path]);
}

describe("import boundaries", () => {
  it("caches valid workspace identities and skips non-source roots", () => {
    const readManifest = vi.fn(
      createManifestReader({
        "packages/compiler/package.json": {
          dependencies: { "@nakafa/aksara-contracts": "workspace:*" },
          imports: { "#compiler/*": "./src/*.ts" },
          name: "@nakafa/aksara-compiler",
        },
      })
    );
    const resolveIdentity = createWorkspaceIdentityResolver(readManifest);

    expect(resolveIdentity("README.md")).toBeUndefined();
    expect(
      resolveIdentity("packages/typescript-config/base.json")
    ).toBeUndefined();
    expect(resolveIdentity("packages/compiler/src/first.ts")).toBeDefined();
    expect(resolveIdentity("packages/compiler/src/second.ts")).toBeDefined();
    expect(readManifest).toHaveBeenCalledTimes(1);
  });

  it("rejects malformed or unowned workspace manifests", () => {
    const missingName = createWorkspaceIdentityResolver(() => "{}");
    const unknown = createWorkspaceIdentityResolver(() =>
      JSON.stringify({ name: "@nakafa/unknown" })
    );

    expect(() => missingName("packages/compiler/src/source.ts")).toThrow(
      "has no package name"
    );
    expect(() => unknown("packages/unknown/src/source.ts")).toThrow(
      "has no import-boundary policy"
    );
  });

  it("finds every static import form that crosses a boundary", () => {
    const resolveIdentity = createWorkspaceIdentityResolver(
      createManifestReader({
        "packages/compiler/package.json": {
          dependencies: { "@nakafa/aksara-contracts": "workspace:*" },
          imports: { "#compiler/*": "./src/*.ts" },
          name: "@nakafa/aksara-compiler",
        },
      })
    );
    const source = `
import "node:fs";
import "#compiler/owned";
import "#publisher/foreign";
import "@nakafa/aksara-compiler";
import "@nakafa/aksara-publisher";
import "@nakafa/aksara-contracts";
import "./relative";
export * from "packages/contracts";
export { local };
type Contract = import("@nakafa/aksara-contracts").Contract;
import ContractAlias = require("@nakafa/aksara-contracts");
const dynamic = import("@nakafa/aksara-contracts");
const required = require("@nakafa/aksara-contracts");
const ignored = load("@nakafa/aksara-publisher");
const unknown = require(variable);
const empty = require();
const multiple = require("first", "second");
`;

    expect(
      importViolations(
        "packages/compiler/src/source.ts",
        source,
        resolveIdentity
      ).map((diagnostic) => diagnostic.split(": ").at(-1))
    ).toEqual([
      "private alias owned by another workspace",
      "self-import through public package export",
      "workspace dependency violates the architecture graph",
      "relative or filesystem module import",
      "relative or filesystem module import",
    ]);
  });

  it("requires allowed workspace packages to be runtime dependencies", () => {
    const resolveIdentity = createWorkspaceIdentityResolver(
      createManifestReader({
        "packages/corpus/package.json": {
          dependencies: "invalid",
          name: "@nakafa/aksara-corpus",
        },
      })
    );

    expect(
      importViolations(
        "packages/corpus/src/source.ts",
        'import "@nakafa/aksara-contracts";',
        resolveIdentity
      )
    ).toEqual([
      "packages/corpus/src/source.ts:1 @nakafa/aksara-contracts: workspace dependency is absent from package dependencies",
    ]);
  });

  it("does not impose workspace policy on root tooling", () => {
    const resolveIdentity = createWorkspaceIdentityResolver(() => {
      throw new Error("Root tooling must not read a workspace manifest");
    });

    expect(
      importViolations(
        "scripts/check-imports.ts",
        'import "node:fs";',
        resolveIdentity
      )
    ).toEqual([]);
  });
});
