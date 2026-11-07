import { afterEach, expect, layer, it as test } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  Layer,
  MutableHashMap,
  Option,
  Schema,
} from "effect";
import { isJSDoc } from "tsrs/ast";
import { API, Program, Snapshot } from "tsrs/sync";
import {
  TypeScriptCompilerError,
  TypeScriptParser,
  TypeScriptSourceError,
} from "#utilities/typescript/parse";

const nativeFailures = MutableHashMap.empty<string, Error>();

/** The tsrs API methods whose reads these tests count or replace. */
const SpiedMethod = Schema.Literals([
  "close",
  "createSnapshot",
  "dispose",
  "getSourceFile",
]);

/**
 * Spies on the reads of one tsrs API method. tsrs defines each method as a
 * prototype getter that caches the method on its instance at the first read,
 * so a test counts that read, or replaces the method it returns.
 */
function spyOnMethod(
  prototype: { readonly [Name in typeof SpiedMethod.Type]?: unknown },
  method: typeof SpiedMethod.Type
) {
  return vi.spyOn(prototype, method, "get");
}

vi.mock("tsrs/sync", async (importOriginal) => {
  const native = await importOriginal<typeof import("tsrs/sync")>();
  return {
    ...native,
    API: class extends native.API {
      /** Injects a startup failure before acquiring a native compiler process. */
      constructor(...args: ConstructorParameters<typeof native.API>) {
        const failure = MutableHashMap.get(nativeFailures, "startup");
        if (Option.isSome(failure)) {
          throw failure.value;
        }
        super(...args);
      }
    },
  };
});

afterEach(() => {
  MutableHashMap.clear(nativeFailures);
  vi.restoreAllMocks();
});

test.effect("preserves native compiler startup failures", () =>
  Effect.gen(function* () {
    const cause = new Error("test native compiler unavailable");
    MutableHashMap.set(nativeFailures, "startup", cause);
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
            documentation:
              declaration?.jsDoc === undefined
                ? undefined
                : Arr.map(Arr.filter(declaration.jsDoc, isJSDoc), (doc) =>
                    doc.getText(sourceFile)
                  ),
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
      const cause = new Error("test native request failure");
      spyOnMethod(API.prototype, "createSnapshot").mockImplementationOnce(
        () => {
          throw cause;
        }
      );
      const error = yield* Effect.gen(function* () {
        const parser = yield* TypeScriptParser;
        return yield* parser.inspect(
          { fileName: "failure.ts", source: "export {};" },
          () => true
        );
      }).pipe(Effect.provide(Layer.fresh(TypeScriptParser.layer)), Effect.flip);
      expect(error).toEqual(
        new TypeScriptSourceError({ cause, fileName: "failure.ts" })
      );
    })
  );
  it.effect("rejects missing native projects and source files", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const input = { fileName: "missing.ts", source: "export {};" };
      vi.spyOn(Snapshot.prototype, "getConfiguredProject").mockReturnValueOnce(
        undefined
      );
      const projectFailure = yield* parser
        .inspect(input, () => true)
        .pipe(Effect.flip);
      spyOnMethod(Program.prototype, "getSourceFile").mockReturnValueOnce(
        () => undefined
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
        const dispose = spyOnMethod(Snapshot.prototype, "dispose");
        const close = spyOnMethod(API.prototype, "close");
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
});
