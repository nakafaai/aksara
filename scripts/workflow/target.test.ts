import { NodeServices } from "@effect/platform-node";
import { describe, expect, it, layer } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { WorkflowError } from "#scripts/workflow/requirement";
import { manifestPaths, manifestTestTargets } from "#scripts/workflow/target";

const encodeJson = Schema.encodeSync(Schema.fromJsonString(Schema.Unknown));

describe("test target discovery", () => {
  it.effect("lists root test:* tasks and workspaces with a test script", () =>
    Effect.gen(function* () {
      expect(
        yield* manifestTestTargets(
          "package.json",
          encodeJson({
            name: "aksara",
            scripts: { test: "turbo run test", "test:root": "vitest run" },
          })
        )
      ).toEqual(["test:root"]);
      expect(
        yield* manifestTestTargets(
          "packages/corpus/package.json",
          encodeJson({
            name: "@nakafa/aksara-corpus",
            scripts: { test: "vitest run" },
          })
        )
      ).toEqual(["@nakafa/aksara-corpus"]);
      expect(
        yield* manifestTestTargets(
          "packages/testing/package.json",
          encodeJson({
            name: "@nakafa/testing",
            scripts: { build: "tsc" },
          })
        )
      ).toEqual([]);
    })
  );

  it.effect("lists nothing for a manifest without scripts", () =>
    Effect.gen(function* () {
      expect(
        yield* manifestTestTargets(
          "packages/typescript-config/package.json",
          encodeJson({ name: "@nakafa/typescript-config" })
        )
      ).toEqual([]);
    })
  );

  it.effect(
    "refuses a file that is not a package manifest with a typed error",
    () =>
      Effect.gen(function* () {
        for (const source of ["{}", "{"]) {
          const refusal = yield* manifestTestTargets(
            "packages/broken/package.json",
            source
          ).pipe(Effect.flip);

          expect(refusal).toBeInstanceOf(WorkflowError);
          expect(refusal.message).toBe(
            "packages/broken/package.json must be a package manifest"
          );
        }
      })
  );
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

  test.effect(
    "refuses a workspace glob that is not a plain directory with a typed error",
    () =>
      Effect.gen(function* () {
        const refusal = yield* manifestPaths(
          "packages:\n  - packages/**\n",
          []
        ).pipe(Effect.flip);

        expect(refusal).toBeInstanceOf(WorkflowError);
        expect(refusal.message).toContain(
          "Workspace glob packages/** must be a plain directory followed by /*, such as apps/*"
        );
      })
  );

  test.effect(
    "refuses a workspace file that is not valid YAML or names no packages with typed errors",
    () =>
      Effect.gen(function* () {
        const invalid = yield* manifestPaths("packages: [\n", []).pipe(
          Effect.flip
        );
        const unnamed = yield* manifestPaths("catalog: {}\n", []).pipe(
          Effect.flip
        );

        expect(invalid).toBeInstanceOf(WorkflowError);
        expect(invalid.message).toContain(
          "pnpm-workspace.yaml must be valid YAML"
        );
        expect(unnamed).toBeInstanceOf(WorkflowError);
        expect(unnamed.message).toContain(
          "pnpm-workspace.yaml must declare its packages"
        );
      })
  );
});
