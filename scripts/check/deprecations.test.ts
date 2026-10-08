import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Path } from "effect";
import {
  auditProjectDeprecations,
  deprecationReport,
  projectConfigPaths,
  TypeScriptProjectError,
  uncoveredTypeScriptViolations,
} from "#scripts/check/deprecations";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

/** Creates one isolated TypeScript project for diagnostic behavior tests. */
const createProject = Effect.fn("DeprecationTest.createProject")(function* (
  source: string,
  config = "{}"
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const root = yield* fileSystem.makeTempDirectoryScoped({
    prefix: "aksara-deprecations-",
  });
  yield* fileSystem.writeFileString(path.join(root, "source.ts"), source);
  yield* fileSystem.writeFileString(path.join(root, "tsconfig.json"), config);
  return root;
});

layer(NodeServices.layer)("deprecated API policy", (it) => {
  it.effect("discovers only root and direct workspace projects", () =>
    Effect.sync(() => {
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
    })
  );

  it.effect("reports authored usage of a deprecated declaration", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const root = yield* createProject(`
/** @deprecated Use currentApi instead. */
declare function oldApi(): void;
oldApi();
`);

      expect(
        yield* auditProjectDeprecations(path.join(root, "tsconfig.json"), root)
      ).toMatchObject({
        violations: [
          "source.ts:4:1 TS6387 The signature '(): void' of 'oldApi' is deprecated.",
        ],
      });
    })
  );

  it.effect("accepts current declarations and reports missing projects", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const currentRoot = yield* createProject(`
declare function currentApi(): void;
currentApi();
`);
      expect(
        yield* auditProjectDeprecations(
          path.join(currentRoot, "tsconfig.json"),
          currentRoot
        )
      ).toMatchObject({ violations: [] });
      const missing = yield* auditProjectDeprecations(
        path.join(currentRoot, "missing.json"),
        currentRoot
      ).pipe(Effect.flip);
      expect(missing).toBeInstanceOf(TypeScriptProjectError);
      expect(missing).toMatchObject({
        configPath: path.join(currentRoot, "missing.json"),
      });
    })
  );

  it.effect("reports invalid project options before creating a program", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const root = yield* createProject(
        "",
        '{"compilerOptions":{"target":"unsupported"}}'
      );

      expect(
        yield* auditProjectDeprecations(path.join(root, "tsconfig.json"), root)
      ).toMatchObject({
        violations: [
          expect.stringContaining("TS6046 Argument for '--target' option"),
        ],
      });
    })
  );

  it.effect(
    "reports authored TypeScript absent from every audited project",
    () =>
      Effect.gen(function* () {
        expect(
          yield* uncoveredTypeScriptViolations(
            ["scripts/covered.ts", "apps/cli/missing.ts"],
            ["/repo/scripts/covered.ts"],
            "/repo"
          )
        ).toEqual([
          "apps/cli/missing.ts: not included by an audited tsconfig.json",
        ]);
      })
  );

  it.effect("reports deprecated API use through the deprecation report", () =>
    Effect.gen(function* () {
      const root = yield* createProject(`
/** @deprecated Use currentApi instead. */
declare function oldApi(): void;
oldApi();
`);
      const write = vi
        .spyOn(process.stderr, "write")
        .mockImplementation(() => true);

      yield* Effect.acquireUseRelease(
        Effect.sync(() => {
          const previous = process.cwd();
          process.chdir(root);
          return previous;
        }),
        () => deprecationReport(["tsconfig.json", "source.ts"]),
        (previous) => Effect.sync(() => process.chdir(previous))
      );

      expect(write).toHaveBeenCalledWith(
        "TypeScript APIs must not be deprecated:\nsource.ts:4:1 TS6387 The signature '(): void' of 'oldApi' is deprecated.\n"
      );
      expect(process.exitCode).toBe(1);
    })
  );

  it.effect("preserves global configuration diagnostics", () =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const root = yield* createProject(
        "export {};",
        '{"include":["no-source/**/*.ts"]}'
      );
      const result = yield* auditProjectDeprecations(
        path.join(root, "tsconfig.json"),
        root
      );
      expect(result).toMatchObject({
        fileNames: [],
        violations: [expect.stringContaining("TS18003 No inputs were found")],
      });
    })
  );
});
