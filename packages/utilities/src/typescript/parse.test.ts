import { afterEach, expect, layer, it as test } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { isJSDoc } from "typescript/unstable/ast";
import {
  API,
  type APIOptions,
  Program,
  Snapshot,
} from "typescript/unstable/sync";
import {
  TypeScriptCompilerError,
  TypeScriptParser,
  TypeScriptSourceError,
} from "#utilities/typescript/parse";

const nativeFailures = vi.hoisted(() => new Map<string, Error>());
const nativeFileSystems = vi.hoisted(
  () => [] as NonNullable<APIOptions["fs"]>[]
);

vi.mock("typescript/unstable/sync", async (importOriginal) => {
  const native =
    await importOriginal<typeof import("typescript/unstable/sync")>();
  return {
    ...native,
    API: class extends native.API {
      /** Injects a startup failure before acquiring a native compiler process. */
      constructor(...args: ConstructorParameters<typeof native.API>) {
        const failure = nativeFailures.get("startup");
        if (failure !== undefined) {
          throw failure;
        }
        const [options] = args;
        if (
          options !== undefined &&
          "fs" in options &&
          options.fs !== undefined
        ) {
          nativeFileSystems.push(options.fs);
        }
        super(...args);
      }
    },
  };
});

afterEach(() => {
  nativeFailures.clear();
  nativeFileSystems.length = 0;
  vi.restoreAllMocks();
});

test.effect("preserves native compiler startup failures", () =>
  Effect.gen(function* () {
    const cause = new Error("test native compiler unavailable");
    nativeFailures.set("startup", cause);
    const failure = yield* Effect.void.pipe(
      Effect.provide(TypeScriptParser.layer),
      Effect.flip
    );
    expect(failure).toEqual(new TypeScriptCompilerError({ cause }));
  })
);

layer(TypeScriptParser.layer)("native TypeScript parsing", (it) => {
  it.effect("distinguishes valid modules from parser errors", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const valid = yield* parser.inspect(
        {
          fileName: "valid.ts",
          source:
            'import type { ReactNode } from "react";\nexport const value: ReactNode = null;',
        },
        ({ diagnostics }) => diagnostics
      );
      const invalid = yield* parser.inspect(
        { fileName: "invalid.ts", source: "export const value = {;" },
        ({ diagnostics }) => diagnostics
      );
      expect(valid).toEqual([]);
      expect(invalid).toEqual([expect.objectContaining({ code: 1136 })]);
    })
  );

  it.effect("refreshes changed source without mixing concurrent requests", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const values = yield* Effect.forEach(
        Array.from({ length: 24 }, (_, index) => index),
        (index) =>
          parser.inspect(
            { fileName: "same.ts", source: `export const value = ${index};` },
            ({ sourceFile }) => sourceFile.getText()
          ),
        { concurrency: 8 }
      );
      expect(values).toEqual(
        Array.from(
          { length: 24 },
          (_, index) => `export const value = ${index};`
        )
      );
    })
  );

  it.effect("preserves source grammar, JSDoc, and Unicode positions", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const source =
        '/** Describes one Unicode café. */\nexport function café() { return "é"; }';
      const result = yield* parser.inspect(
        { fileName: "source.ts", source },
        ({ sourceFile }) => {
          const [declaration] = sourceFile.statements;
          return {
            declaration: declaration?.getText(sourceFile),
            documentation: declaration?.jsDoc
              ?.filter(isJSDoc)
              .map((doc) => doc.getText(sourceFile)),
            line: declaration
              ? sourceFile.getLineAndCharacterOfPosition(declaration.getStart())
                  .line
              : undefined,
          };
        }
      );
      expect(result).toEqual({
        declaration: 'export function café() { return "é"; }',
        documentation: ["/** Describes one Unicode café. */"],
        line: 1,
      });
      const jsx = yield* parser.inspect(
        {
          fileName: "component.tsx",
          source: "export const content = <div />;",
        },
        ({ diagnostics }) => diagnostics
      );
      expect(jsx).toEqual([]);
    })
  );

  it.effect("preserves typed failures from native source inspection", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const cause = new Error("test native request failure");
      const update = vi
        .spyOn(API.prototype, "updateSnapshot")
        .mockImplementationOnce(() => {
          throw cause;
        });
      const error = yield* parser
        .inspect({ fileName: "failure.ts", source: "export {};" }, () => true)
        .pipe(Effect.flip);
      update.mockRestore();
      expect(error).toEqual(
        new TypeScriptSourceError({ cause, fileName: "failure.ts" })
      );
    })
  );
  it.effect("rejects missing native projects and source files", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const input = { fileName: "missing.ts", source: "export {};" };
      vi.spyOn(Snapshot.prototype, "getProject").mockReturnValueOnce(undefined);
      const projectFailure = yield* parser
        .inspect(input, () => true)
        .pipe(Effect.flip);
      vi.spyOn(Program.prototype, "getSourceFile").mockReturnValueOnce(
        undefined
      );
      const sourceFailure = yield* parser
        .inspect(input, () => true)
        .pipe(Effect.flip);
      for (const failure of [projectFailure, sourceFailure]) {
        expect(failure).toEqual(
          new TypeScriptSourceError({
            cause: "The requested native source is missing.",
            fileName: input.fileName,
          })
        );
      }
    })
  );

  it.effect(
    "releases snapshots after callback failures and closes the compiler",
    () =>
      Effect.gen(function* () {
        const dispose = vi.spyOn(Snapshot.prototype, "dispose");
        const close = vi.spyOn(API.prototype, "close");
        const cause = new Error("test inspection callback failed");
        const failure = yield* Effect.gen(function* () {
          const parser = yield* TypeScriptParser;
          return yield* parser.inspect(
            { fileName: "callback.ts", source: "export {};" },
            () => {
              throw cause;
            }
          );
        }).pipe(
          Effect.provide(Layer.fresh(TypeScriptParser.layer)),
          Effect.flip
        );
        expect(failure).toEqual(
          new TypeScriptSourceError({ cause, fileName: "callback.ts" })
        );
        expect(dispose).toHaveBeenCalledTimes(1);
        expect(close).toHaveBeenCalledTimes(1);
      })
  );
  it.effect("keeps source projects isolated from host filesystem reads", () =>
    Effect.gen(function* () {
      yield* Effect.gen(function* () {
        const parser = yield* TypeScriptParser;
        yield* parser.inspect(
          { fileName: "isolated.ts", source: "export {};" },
          () => true
        );
        const fileSystem = nativeFileSystems.at(-1);
        expect(fileSystem?.fileExists?.(import.meta.filename)).toBe(false);
        expect(fileSystem?.readFile?.(import.meta.filename)).toBeNull();
      }).pipe(Effect.provide(Layer.fresh(TypeScriptParser.layer)));
    })
  );
});
