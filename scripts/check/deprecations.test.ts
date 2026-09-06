import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  auditProjectDeprecations,
  projectConfigPaths,
  TypeScriptProjectError,
  uncoveredTypeScriptViolations,
} from "#scripts/check/deprecations";

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

  it.effect("reports authored usage of a deprecated declaration", () =>
    Effect.gen(function* () {
      const root = createProject(`
/** @deprecated Use currentApi instead. */
declare function oldApi(): void;
oldApi();
`);

      expect(
        yield* auditProjectDeprecations(join(root, "tsconfig.json"), root)
      ).toMatchObject({
        violations: [
          "source.ts:4:1 TS6387 The signature '(): void' of 'oldApi' is deprecated.",
        ],
      });
    })
  );

  it.effect("accepts current declarations and reports missing projects", () =>
    Effect.gen(function* () {
      const currentRoot = createProject(`
declare function currentApi(): void;
currentApi();
`);
      expect(
        yield* auditProjectDeprecations(
          join(currentRoot, "tsconfig.json"),
          currentRoot
        )
      ).toMatchObject({ violations: [] });
      const missing = yield* auditProjectDeprecations(
        join(currentRoot, "missing.json"),
        currentRoot
      ).pipe(Effect.flip);
      expect(missing).toBeInstanceOf(TypeScriptProjectError);
      expect(missing).toMatchObject({
        configPath: join(currentRoot, "missing.json"),
      });
    })
  );

  it.effect("reports invalid project options before creating a program", () =>
    Effect.gen(function* () {
      const root = createProject(
        "",
        '{"compilerOptions":{"target":"unsupported"}}'
      );

      expect(
        yield* auditProjectDeprecations(join(root, "tsconfig.json"), root)
      ).toMatchObject({
        violations: [
          expect.stringContaining("TS6046 Argument for '--target' option"),
        ],
      });
    })
  );

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
  it.effect("preserves global configuration diagnostics", () =>
    Effect.gen(function* () {
      const root = createProject(
        "export {};",
        '{"include":["no-source/**/*.ts"]}'
      );
      const result = yield* auditProjectDeprecations(
        join(root, "tsconfig.json"),
        root
      );
      expect(result).toMatchObject({
        fileNames: [],
        violations: [expect.stringContaining("TS18003 No inputs were found")],
      });
    })
  );
});
