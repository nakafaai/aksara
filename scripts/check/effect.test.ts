import { expect, layer } from "@effect/vitest";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";

import { effectViolations } from "#scripts/check/effect";

layer(TypeScriptParser.layer)("effect policy", (it) => {
  it.effect("reports raw try/catch and typeof-object narrowing", () =>
    Effect.gen(function* () {
      const sources = new Map([
        [
          "broken.ts",
          'export function read(value: unknown) {\n  try {\n    h();\n  } catch {\n    return null;\n  }\n  return typeof value === "object";\n}',
        ],
      ]);

      expect(
        yield* effectViolations(
          [...sources.keys()],
          (file) => sources.get(file) ?? ""
        )
      ).toEqual([
        "broken.ts: model failure with Effect instead of a raw try/catch statement.",
        "broken.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
      ]);
    })
  );

  it.effect("allows Effect-native failure, narrowing, and cleanup", () =>
    Effect.gen(function* () {
      const sources = new Map([
        [
          "clean.ts",
          'import { Effect, Predicate } from "effect";\nexport const read = Effect.fn("read")(function* (value: unknown) {\n  return Predicate.isObject(value);\n});',
        ],
        [
          "cleanup.ts",
          "export async function clean() {\n  try {\n    await write();\n  } finally {\n    await erase();\n  }\n}",
        ],
      ]);

      expect(
        yield* effectViolations(
          [...sources.keys()],
          (file) => sources.get(file) ?? ""
        )
      ).toEqual([]);
    })
  );

  it.effect("matches every typeof-object comparison form", () =>
    Effect.gen(function* () {
      const sources = new Map([
        [
          "shapes.ts",
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
          ].join("\n"),
        ],
      ]);

      expect(
        yield* effectViolations(
          [...sources.keys()],
          (file) => sources.get(file) ?? ""
        )
      ).toEqual([
        "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
        "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
        "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
        "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
        "shapes.ts: narrow unknown input with Predicate or Schema instead of a typeof-object check.",
      ]);
    })
  );

  it.effect("preserves source-reader failures", () =>
    Effect.gen(function* () {
      const cause = new Error("test source is unreadable");
      const failure = yield* effectViolations(["unreadable.ts"], () => {
        throw cause;
      }).pipe(Effect.flip);

      expect(failure).toEqual(
        new TypeScriptSourceError({ cause, fileName: "unreadable.ts" })
      );
    })
  );
});
