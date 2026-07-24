import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  auditProjectDeprecations,
  projectConfigPaths,
  readScriptSnapshot,
  uncoveredTypeScriptViolations,
} from "#scripts/check-deprecations";

const temporaryRoots: string[] = [];

/** Creates one isolated TypeScript project for diagnostic behavior tests. */
function createProject(source: string, config = "{}") {
  const root = mkdtempSync(join(tmpdir(), "aksara-deprecations-"));
  temporaryRoots.push(root);
  writeFileSync(join(root, "source.ts"), source);
  writeFileSync(join(root, "tsconfig.json"), config);
  return root;
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { force: true, recursive: true });
  }
});

describe("deprecated API policy", () => {
  it("discovers only root and direct workspace projects", () => {
    expect(
      projectConfigPaths([
        "packages/corpus/tsconfig.build.json",
        "apps/cli/tsconfig.json",
        "tsconfig.json",
        "packages/contracts/tsconfig.json",
        "docs/tsconfig.json",
      ])
    ).toEqual([
      "apps/cli/tsconfig.json",
      "packages/contracts/tsconfig.json",
      "tsconfig.json",
    ]);
  });

  it("reports authored usage of a deprecated declaration", () => {
    const root = createProject(`
/** @deprecated Use currentApi instead. */
declare function oldApi(): void;
oldApi();
`);

    expect(
      auditProjectDeprecations(join(root, "tsconfig.json"), root)
    ).toMatchObject({
      violations: [
        "source.ts:4:1 TS6387 The signature '(): void' of 'oldApi' is deprecated.",
      ],
    });
  });

  it("accepts current declarations and reports missing projects", () => {
    const currentRoot = createProject(`
declare function currentApi(): void;
currentApi();
`);
    expect(
      auditProjectDeprecations(join(currentRoot, "tsconfig.json"), currentRoot)
    ).toMatchObject({ violations: [] });
    expect(
      auditProjectDeprecations(join(currentRoot, "missing.json"), currentRoot)
    ).toMatchObject({
      fileNames: [],
      violations: [expect.stringContaining("TS5083 Cannot read file")],
    });
  });

  it("reports invalid project options before creating a program", () => {
    const root = createProject(
      "",
      '{"compilerOptions":{"target":"unsupported"}}'
    );

    expect(
      auditProjectDeprecations(join(root, "tsconfig.json"), root)
    ).toMatchObject({
      violations: [
        expect.stringContaining("TS6046 Argument for '--target' option"),
      ],
    });
  });

  it("preserves missing source files while reading script snapshots", () => {
    const root = createProject("export const value = 1;");
    const sourcePath = join(root, "source.ts");

    expect(readScriptSnapshot(sourcePath)?.getText(0, 23)).toBe(
      "export const value = 1;"
    );
    expect(readScriptSnapshot(join(root, "missing.ts"))).toBeUndefined();
  });

  it("reports authored TypeScript absent from every audited project", () => {
    expect(
      uncoveredTypeScriptViolations(
        ["scripts/covered.ts", "apps/cli/missing.ts"],
        ["/repo/scripts/covered.ts"],
        "/repo"
      )
    ).toEqual([
      "apps/cli/missing.ts: not included by an audited tsconfig.json",
    ]);
  });
});
