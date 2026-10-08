import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect, FileSystem, Layer, Path, Record as Rec } from "effect";
import {
  countModuleLines,
  lineReport,
  lineViolations,
} from "#scripts/check/lines";

const originalExitCode = process.exitCode;

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

layer(Layer.merge(TypeScriptParser.layer, NodeServices.layer))(
  "line policy",
  (it) => {
    it.effect(
      "excludes JSDoc-only lines while retaining mixed source lines",
      () =>
        Effect.gen(function* () {
          const source = `/**
 * Explains one callable clearly.
 */
export function documented() {}
/** Inline prose. */ export const value = 1;
`;

          expect(yield* countModuleLines("source.ts", source)).toBe(2);
        })
    );

    it.effect("handles empty and unterminated source text", () =>
      Effect.gen(function* () {
        expect(yield* countModuleLines("empty.ts", "")).toBe(0);
        expect(yield* countModuleLines("source.ts", "const value = 1;")).toBe(
          1
        );
      })
    );

    it.effect("reports only modules above the 300-line limit", () =>
      Effect.gen(function* () {
        const sources: Readonly<Record<string, string>> = {
          "allowed.ts": "value;\n".repeat(300),
          "large.ts": "value;\n".repeat(301),
        };

        expect(
          yield* lineViolations(Rec.keys(sources), (file) =>
            Effect.succeed(sources[file] ?? "")
          )
        ).toEqual(["large.ts: 301 lines"]);
      })
    );

    it.effect("reports oversized files through the line report", () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-lines-",
        });
        const allowed = path.join(root, "allowed.ts");
        const large = path.join(root, "large.ts");
        yield* fileSystem.writeFileString(allowed, "value;\n".repeat(300));
        yield* fileSystem.writeFileString(large, "value;\n".repeat(301));
        const write = vi
          .spyOn(process.stderr, "write")
          .mockImplementation(() => true);

        yield* lineReport([allowed, large]);

        expect(write).toHaveBeenCalledWith(
          `TypeScript modules may contain at most 300 non-JSDoc lines:\n${large}: 301 lines\n`
        );
        expect(process.exitCode).toBe(1);
      })
    );

    it.effect("preserves source-reader failures", () =>
      Effect.gen(function* () {
        const cause = new Error("test source is unreadable");
        const failure = yield* lineViolations(["unreadable.ts"], () =>
          Effect.fail(cause)
        ).pipe(Effect.flip);
        expect(failure).toEqual(
          new TypeScriptSourceError({ cause, fileName: "unreadable.ts" })
        );
      })
    );
  }
);
