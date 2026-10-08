import { describe, expect, it } from "@effect/vitest";
import { manifestPaths, manifestTestTargets } from "#scripts/workflow/target";

describe("test target discovery", () => {
  it("lists root test:* tasks and workspaces with a test script", () => {
    expect(
      manifestTestTargets(
        "package.json",
        JSON.stringify({
          name: "aksara",
          scripts: { test: "turbo run test", "test:root": "vitest run" },
        })
      )
    ).toEqual(["test:root"]);
    expect(
      manifestTestTargets(
        "packages/corpus/package.json",
        JSON.stringify({
          name: "@nakafa/aksara-corpus",
          scripts: { test: "vitest run" },
        })
      )
    ).toEqual(["@nakafa/aksara-corpus"]);
    expect(
      manifestTestTargets(
        "packages/testing/package.json",
        JSON.stringify({
          name: "@nakafa/testing",
          scripts: { build: "tsc" },
        })
      )
    ).toEqual([]);
  });

  it("lists nothing for a manifest without scripts", () => {
    expect(
      manifestTestTargets(
        "packages/typescript-config/package.json",
        JSON.stringify({ name: "@nakafa/typescript-config" })
      )
    ).toEqual([]);
  });

  it("rejects a file that is not a package manifest", () => {
    expect(() =>
      manifestTestTargets("packages/broken/package.json", "{}")
    ).toThrow("packages/broken/package.json must be a package manifest");
    expect(() =>
      manifestTestTargets("packages/broken/package.json", "{")
    ).toThrow("packages/broken/package.json must be a package manifest");
  });

  it("finds workspaces under any pnpm glob, not only the default layout", () => {
    expect(
      manifestPaths("packages:\n  - tools/*\n", [
        "package.json",
        "apps/www/package.json",
        "tools/lint/package.json",
        "tools/lint/src/package.json",
        "tools/lint/index.ts",
      ])
    ).toEqual(["package.json", "tools/lint/package.json"]);
  });

  it("rejects a workspace glob that is not a plain directory", () => {
    expect(() => manifestPaths("packages:\n  - packages/**\n", [])).toThrow(
      "Workspace glob packages/** must be a plain directory followed by /*, such as apps/*"
    );
  });

  it("rejects a workspace file that is not valid YAML or names no packages", () => {
    expect(() => manifestPaths("packages: [\n", [])).toThrow(
      "pnpm-workspace.yaml must be valid YAML"
    );
    expect(() => manifestPaths("catalog: {}\n", [])).toThrow(
      "pnpm-workspace.yaml must declare its packages"
    );
  });
});
