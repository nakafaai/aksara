import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, FileSystem, Path, Record as Rec } from "effect";
import { inDirectory, makeRepository } from "#scripts/check/fixture";
import { checkRepository } from "#scripts/imports/check";

const CONDITION_CONFIG =
  '{"compilerOptions":{"customConditions":["aksara-source"]}}\n';
const COMPILER_MANIFEST =
  '{"name":"@nakafa/aksara-compiler","imports":{"#compiler/*":"./src/*.ts"}}\n';

/** Writes each repository file under root, creating its folders first. */
const writeRepository = Effect.fn("ImportCheckTest.writeRepository")(function* (
  root: string,
  files: Readonly<Record<string, string>>
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  for (const [file, text] of Rec.toEntries(files)) {
    yield* fileSystem.makeDirectory(path.dirname(path.join(root, file)), {
      recursive: true,
    });
    yield* fileSystem.writeFileString(path.join(root, file), text);
  }
});

/** Restores the process exit code after an effect, however the effect ends. */
const keepExitCode = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
  Effect.acquireUseRelease(
    Effect.sync(() => process.exitCode),
    () => effect,
    (exitCode) =>
      Effect.sync(() => {
        process.exitCode = exitCode;
      })
  );

/** Imports a fresh check module, so the mocks of one test apply to the program it exports. */
const importCheck = Effect.fn("ImportCheckTest.importCheck")(function* () {
  vi.resetModules();
  return yield* Effect.tryPromise(() => import("#scripts/imports/check"));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.doUnmock("#scripts/check/files");
  vi.resetModules();
});

layer(TypeScriptParser.layer)("import boundaries", (it) => {
  it.effect(
    "reports nothing for one clean module and keeps the exit code",
    () =>
      Effect.gen(function* () {
        const root = yield* makeRepository();
        yield* writeRepository(root, {
          "packages/compiler/package.json": COMPILER_MANIFEST,
          "packages/compiler/src/owned.ts": 'import "#compiler/other";\n',
          "packages/typescript-config/base.json": CONDITION_CONFIG,
          "scripts/clean.ts": "export const value = 1;\n",
        });
        const stderr = vi.spyOn(process.stderr, "write");
        const before = process.exitCode;

        const after = yield* keepExitCode(
          inDirectory(root, checkRepository).pipe(
            Effect.map(() => process.exitCode)
          )
        );

        expect(stderr).not.toHaveBeenCalled();
        expect(after).toBe(before);
      }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("reports each planted boundary violation and exits 1", () =>
    Effect.gen(function* () {
      const root = yield* makeRepository();
      yield* writeRepository(root, {
        "packages/typescript-config/base.json": CONDITION_CONFIG,
        "scripts/planted.ts":
          'import "./relative";\nimport { it } from "vitest";\n',
      });
      const stderr = vi
        .spyOn(process.stderr, "write")
        .mockImplementation(() => true);

      const exitCode = yield* keepExitCode(
        inDirectory(root, checkRepository).pipe(
          Effect.map(() => process.exitCode)
        )
      );

      expect(stderr).toHaveBeenCalledTimes(1);
      expect(stderr).toHaveBeenCalledWith(
        "TypeScript imports must respect workspace aliases:\nscripts/planted.ts:1 ./relative: relative or filesystem module import\nscripts/planted.ts:2 vitest: test APIs must come from @effect/vitest\n"
      );
      expect(exitCode).toBe(1);
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("fails when a workspace source has no tracked manifest", () =>
    Effect.gen(function* () {
      const root = yield* makeRepository();
      yield* writeRepository(root, {
        "packages/typescript-config/base.json": CONDITION_CONFIG,
        "packages/unknown/src/source.ts": 'import "effect";\n',
      });

      const failure = yield* keepExitCode(
        inDirectory(root, checkRepository).pipe(Effect.flip)
      );

      expect(failure).toMatchObject({
        _tag: "WorkspaceIdentityError",
        message:
          "packages/unknown/package.json is not a tracked workspace manifest.",
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("fails when a tracked source disappears", () =>
    Effect.gen(function* () {
      vi.doMock("#scripts/check/files", () => ({
        trackedFiles: () => Effect.succeed([]),
        typescriptFiles: () => ["test-missing-source.ts"],
      }));
      const freshCheck = yield* importCheck();
      const failure = yield* freshCheck.checkRepository.pipe(
        Effect.flip,
        Effect.provide(NodeServices.layer)
      );
      expect(failure).toMatchObject({
        _tag: "TypeScriptSourceError",
        fileName: "test-missing-source.ts",
      });
    })
  );
});
