import { afterEach, expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import {
  createWorkspaceIdentityResolver,
  importViolations,
} from "#scripts/imports/check";

/** Creates one manifest reader for import-boundary policy tests. */
function createManifestReader(manifests: Readonly<Record<string, unknown>>) {
  return (path: string) => JSON.stringify(manifests[path]);
}

afterEach(() => {
  vi.doUnmock("#scripts/check/files");
  vi.resetModules();
});

layer(TypeScriptParser.layer)("import boundaries", (it) => {
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

  it.effect("finds every static import form that crosses a boundary", () =>
    Effect.gen(function* () {
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
        (yield* importViolations(
          "packages/compiler/src/source.ts",
          source,
          resolveIdentity
        )).map((diagnostic) => diagnostic.split(": ").at(-1))
      ).toEqual([
        "private alias owned by another workspace",
        "self-import through public package export",
        "workspace dependency violates the architecture graph",
        "relative or filesystem module import",
        "relative or filesystem module import",
      ]);
    })
  );

  it.effect(
    "requires allowed workspace packages to be runtime dependencies",
    () =>
      Effect.gen(function* () {
        const resolveIdentity = createWorkspaceIdentityResolver(
          createManifestReader({
            "packages/corpus/package.json": {
              dependencies: "invalid",
              name: "@nakafa/aksara-corpus",
            },
          })
        );

        expect(
          yield* importViolations(
            "packages/corpus/src/source.ts",
            'import "@nakafa/aksara-contracts";',
            resolveIdentity
          )
        ).toEqual([
          "packages/corpus/src/source.ts:1 @nakafa/aksara-contracts: workspace dependency is absent from package dependencies",
        ]);
      })
  );

  it.effect("keeps declared development tools outside runtime modules", () =>
    Effect.gen(function* () {
      const resolveIdentity = createWorkspaceIdentityResolver(
        createManifestReader({
          "packages/compiler/package.json": {
            devDependencies: {
              "@nakafa/aksara-utilities": "workspace:*",
              "@nakafa/testing": "workspace:*",
            },
            name: "@nakafa/aksara-compiler",
          },
        })
      );

      for (const [file, dependency] of [
        ["packages/compiler/vitest.config.ts", "@nakafa/testing"],
        ["packages/compiler/src/compile.test.ts", "@nakafa/testing"],
        ["packages/compiler/scripts/check.ts", "@nakafa/aksara-utilities"],
      ] as const) {
        expect(
          yield* importViolations(
            file,
            `import "${dependency}";`,
            resolveIdentity
          )
        ).toEqual([]);
      }
      for (const dependency of [
        "@nakafa/testing",
        "@nakafa/aksara-utilities",
      ]) {
        const file = "packages/compiler/src/source.ts";
        expect(
          yield* importViolations(
            file,
            `import "${dependency}";`,
            resolveIdentity
          )
        ).toEqual([
          `${file}:1 ${dependency}: workspace dependency violates the architecture graph`,
        ]);
      }

      const missingDependency = createWorkspaceIdentityResolver(
        createManifestReader({
          "packages/compiler/package.json": {
            name: "@nakafa/aksara-compiler",
          },
        })
      );
      expect(
        yield* importViolations(
          "packages/compiler/vitest.config.ts",
          'import config from "@nakafa/testing";',
          missingDependency
        )
      ).toEqual([
        "packages/compiler/vitest.config.ts:1 @nakafa/testing: test dependency is absent from package devDependencies",
      ]);
    })
  );

  it.effect("does not impose workspace policy on root tooling", () =>
    Effect.gen(function* () {
      const resolveIdentity = createWorkspaceIdentityResolver(() => {
        throw new Error("Root tooling must not read a workspace manifest");
      });

      expect(
        yield* importViolations(
          "scripts/imports/check.ts",
          'import "node:fs";',
          resolveIdentity
        )
      ).toEqual([]);
    })
  );

  it.effect("rejects raw Vitest APIs in every supported import form", () =>
    Effect.gen(function* () {
      const resolveIdentity = createWorkspaceIdentityResolver(() => {
        throw new Error("Raw Vitest imports must fail before manifest lookup");
      });

      const cases = [
        ['import { it } from "vitest";', "vitest"],
        ['export { it } from "vitest";', "vitest"],
        ['import type { TestContext } from "vitest";', "vitest"],
        ['import Vitest = require("vitest");', "vitest"],
        ['const vitest = import("vitest");', "vitest"],
        ['const vitest = import("vitest", { with: {} });', "vitest"],
        ['const vitest = require("vitest");', "vitest"],
        ['import { it } from "vitest/suite";', "vitest/suite"],
      ] as const;

      for (const [source, specifier] of cases) {
        expect(
          yield* importViolations(
            "packages/compiler/src/compile.test.ts",
            source,
            resolveIdentity
          )
        ).toEqual([
          `packages/compiler/src/compile.test.ts:1 ${specifier}: test APIs must come from @effect/vitest`,
        ]);
      }

      for (const source of [
        'import { vi as mockVi } from "@effect/vitest";',
        'import * as effectVitest from "@effect/vitest";',
        'export { vi } from "@effect/vitest";',
        'export { vi as mockVi } from "@effect/vitest";',
        'export * from "@effect/vitest";',
        'export * as effectVitest from "@effect/vitest";',
        'import EffectVitest = require("@effect/vitest");',
        'const { vi } = await import("@effect/vitest");',
        'const effectVitest = await import("@effect/vitest");',
        'const effectVitest = require("@effect/vitest");',
        'type Mock = import("@effect/vitest").vi;',
      ]) {
        expect(
          yield* importViolations(
            "scripts/imports/check.test.ts",
            source,
            resolveIdentity
          )
        ).toEqual([
          "scripts/imports/check.test.ts:1 @effect/vitest#vi: use the configured global vi for mocks",
        ]);
      }
      for (const source of [
        'import "@effect/vitest";',
        'import { it } from "@effect/vitest";',
        'export { it } from "@effect/vitest";',
        'type Context = import("@effect/vitest").TestContext;',
      ]) {
        expect(
          yield* importViolations(
            "scripts/imports/check.test.ts",
            source,
            () => undefined
          )
        ).toEqual([]);
      }
      expect(
        yield* importViolations(
          "packages/compiler/vitest.config.ts",
          'import { defineConfig } from "vitest/config";',
          () => undefined
        )
      ).toEqual([]);
    })
  );
  it.effect("fails when a tracked source disappears", () =>
    Effect.gen(function* () {
      vi.resetModules();
      vi.doMock("#scripts/check/files", () => ({
        typescriptFiles: () => ["test-missing-source.ts"],
      }));
      const failure = yield* Effect.tryPromise(
        () => import("#scripts/imports/check")
      ).pipe(Effect.flip);
      expect(failure.cause).toMatchObject({
        _tag: "TypeScriptSourceError",
        fileName: "test-missing-source.ts",
      });
    })
  );
});
