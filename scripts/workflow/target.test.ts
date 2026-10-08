import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { manifestPaths, manifestTestTargets } from "#scripts/workflow/target";

const encodeJson = Schema.encodeSync(Schema.fromJsonString(Schema.Unknown));

describe("test target discovery", () => {
  it("lists root test:* tasks and workspaces with a test script", () => {
    expect(
      manifestTestTargets(
        "package.json",
        encodeJson({
          name: "aksara",
          scripts: { test: "turbo run test", "test:root": "vitest run" },
        })
      )
    ).toEqual(["test:root"]);
    expect(
      manifestTestTargets(
        "packages/corpus/package.json",
        encodeJson({
          name: "@nakafa/aksara-corpus",
          scripts: { test: "vitest run" },
        })
      )
    ).toEqual(["@nakafa/aksara-corpus"]);
    expect(
      manifestTestTargets(
        "packages/testing/package.json",
        encodeJson({
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
        encodeJson({ name: "@nakafa/typescript-config" })
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
});

layer(NodeServices.layer)("workspace discovery", (test) => {
  test.effect(
    "finds workspaces under any pnpm glob, not only the default layout",
    () =>
      Effect.gen(function* () {
        const paths = yield* manifestPaths("packages:\n  - tools/*\n", [
          "package.json",
          "apps/www/package.json",
          "tools/lint/package.json",
          "tools/lint/src/package.json",
          "tools/lint/index.ts",
        ]);
        expect(paths).toEqual(["package.json", "tools/lint/package.json"]);
      })
  );

  test.effect("rejects a workspace glob that is not a plain directory", () =>
    Effect.gen(function* () {
      const defect = yield* manifestPaths(
        "packages:\n  - packages/**\n",
        []
      ).pipe(
        Effect.map(() => "no defect"),
        Effect.catchDefect((cause) => Effect.succeed(String(cause)))
      );
      expect(defect).toContain(
        "Workspace glob packages/** must be a plain directory followed by /*, such as apps/*"
      );
    })
  );

  test.effect(
    "rejects a workspace file that is not valid YAML or names no packages",
    () =>
      Effect.gen(function* () {
        const invalid = yield* manifestPaths("packages: [\n", []).pipe(
          Effect.map(() => "no defect"),
          Effect.catchDefect((cause) => Effect.succeed(String(cause)))
        );
        const unnamed = yield* manifestPaths("catalog: {}\n", []).pipe(
          Effect.map(() => "no defect"),
          Effect.catchDefect((cause) => Effect.succeed(String(cause)))
        );
        expect(invalid).toContain("pnpm-workspace.yaml must be valid YAML");
        expect(unnamed).toContain(
          "pnpm-workspace.yaml must declare its packages"
        );
      })
  );
});
