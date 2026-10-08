import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Layer,
  Path,
  Record as Rec,
} from "effect";
import { effectReport, effectViolations } from "#scripts/check/effect";

const originalExitCode = process.exitCode;
const RAW_TRY_SOURCE =
  "export function read() {\n  try {\n    h();\n  } catch {\n    return null;\n  }\n}\n";

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
});

/** Reads one in-memory source, treating an unknown name as empty text. */
function sourceReader(sources: Readonly<Record<string, string>>) {
  return (file: string) => Effect.succeed(sources[file] ?? "");
}

layer(Layer.merge(TypeScriptParser.layer, NodeServices.layer))(
  "effect policy",
  (it) => {
    it.effect("reports raw try/catch and typeof-object narrowing", () =>
      Effect.gen(function* () {
        const sources: Readonly<Record<string, string>> = {
          "broken.ts":
            'export function read(value: unknown) {\n  try {\n    h();\n  } catch {\n    return null;\n  }\n  return typeof value === "object";\n}',
        };

        expect(
          yield* effectViolations(Rec.keys(sources), sourceReader(sources))
        ).toEqual([
          "broken.ts: model failure with Effect instead of a raw try/catch statement.",
          "broken.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
        ]);
      })
    );

    it.effect("allows Effect-native failure, narrowing, and cleanup", () =>
      Effect.gen(function* () {
        const sources: Readonly<Record<string, string>> = {
          "clean.ts":
            'import { Effect, Predicate } from "effect";\nexport const read = Effect.fn("read")(function* (value: unknown) {\n  return Predicate.isObject(value);\n});',
          "cleanup.ts":
            "export async function clean() {\n  try {\n    await write();\n  } finally {\n    await erase();\n  }\n}",
        };

        expect(
          yield* effectViolations(Rec.keys(sources), sourceReader(sources))
        ).toEqual([]);
      })
    );

    it.effect("matches every typeof-object comparison form", () =>
      Effect.gen(function* () {
        const sources: Readonly<Record<string, string>> = {
          "shapes.ts": Arr.join(
            [
              'export const a = typeof value === "object";',
              'export const b = "object" === typeof value;',
              'export const c = typeof value === "string";',
              "export const d = typeof value === other;",
              "export const e = value === 5;",
              "export const f = value;",
              'export const g = typeof value !== "object";',
              'export const h = typeof value == "object";',
              'export const i = typeof value != "object";',
            ],
            "\n"
          ),
        };

        expect(
          yield* effectViolations(Rec.keys(sources), sourceReader(sources))
        ).toEqual([
          "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
          "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
          "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
          "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
          "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
        ]);
      })
    );

    it.effect("reports only product modules through the effect report", () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-effect-report-",
        });
        yield* fileSystem.makeDirectory(path.join(root, "scripts"));
        yield* fileSystem.makeDirectory(path.join(root, ".agents"));
        yield* fileSystem.writeFileString(
          path.join(root, "scripts/probe.ts"),
          RAW_TRY_SOURCE
        );
        yield* fileSystem.writeFileString(
          path.join(root, ".agents/probe.ts"),
          RAW_TRY_SOURCE
        );
        const write = vi
          .spyOn(process.stderr, "write")
          .mockImplementation(() => true);

        yield* Effect.acquireUseRelease(
          Effect.sync(() => {
            const previous = process.cwd();
            process.chdir(root);
            return previous;
          }),
          () => effectReport(["scripts/probe.ts", ".agents/probe.ts"]),
          (previous) => Effect.sync(() => process.chdir(previous))
        );

        expect(write).toHaveBeenCalledTimes(1);
        expect(write).toHaveBeenCalledWith(
          "Authored modules must model failure and unknown input natively:\nscripts/probe.ts: model failure with Effect instead of a raw try/catch statement.\n"
        );
        expect(process.exitCode).toBe(1);
      })
    );

    it.effect("preserves source-reader failures", () =>
      Effect.gen(function* () {
        const cause = new Error("test source is unreadable");
        const failure = yield* effectViolations(["unreadable.ts"], () =>
          Effect.fail(cause)
        ).pipe(Effect.flip);

        expect(failure).toEqual(
          new TypeScriptSourceError({ cause, fileName: "unreadable.ts" })
        );
      })
    );
  }
);
