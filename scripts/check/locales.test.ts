import { afterEach, expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";

import { localePolicyViolations } from "#scripts/check/locales";

afterEach(() => {
  vi.doUnmock("#scripts/check/files");
  vi.resetModules();
});

layer(TypeScriptParser.layer)("locale source policy", (it) => {
  it.effect("allows the canonical locale contract and derived consumers", () =>
    Effect.gen(function* () {
      expect(
        yield* localePolicyViolations(
          "packages/contracts/src/locale.ts",
          'const Current = Schema.Literals(["en", "id", "de"]);\nconst Historical = Schema.Literals(["en", "id"]);'
        )
      ).toEqual([]);
      expect(
        yield* localePolicyViolations(
          "packages/contracts/src/content.ts",
          'import { HistoricalAppLocaleSchema } from "#contracts/locale";\nconst ContentLocaleSchema = HistoricalAppLocaleSchema;'
        )
      ).toEqual([]);
      expect(
        yield* localePolicyViolations(
          "packages/corpus/locale/source.ts",
          "const Localized = Schema.Record(AppLocaleCodeSchema, Schema.optional(Schema.String));"
        )
      ).toEqual([]);
    })
  );

  it.effect(
    "rejects a Schema.keyof object that bypasses the locale contract",
    () =>
      Effect.gen(function* () {
        const file = "packages/example/src/source.ts";
        const source =
          "const Embedded = Schema.keyof(Schema.Struct({ en: Schema.Void, id: Schema.Void }));";

        expect(yield* localePolicyViolations(file, source)).toEqual([
          `${file}:1: locale vocabulary must derive from the locale contract`,
        ]);
        expect(
          yield* localePolicyViolations(
            "packages/corpus/locale/source.ts",
            source
          )
        ).toEqual([
          "packages/corpus/locale/source.ts:1: locale vocabulary must derive from the locale contract",
        ]);
      })
  );

  it.effect(
    "ignores malformed keyof shapes that do not declare locale fields",
    () =>
      Effect.gen(function* () {
        const file = "packages/example/src/source.ts";
        const source = [
          'const literal = Schema.keyof(Schema.Literals(["en", "id"]));',
          "const empty = Schema.keyof(Schema.Struct());",
          "const spread = Schema.keyof(Schema.Struct({ ...base }));",
          'const computed = Schema.keyof(Schema.Struct({ ["en"]: Schema.Void, id: Schema.Void }));',
          "const unrelated = Schema.keyof(Schema.Struct({ en: Schema.Void, other: Schema.Void }));",
          "const emptyUnion = Schema.Union();",
        ].join("\n");

        expect(yield* localePolicyViolations(file, source)).toEqual([
          `${file}:1: locale vocabulary must derive from the locale contract`,
        ]);
      })
  );

  it.effect("rejects duplicated schema and TypeScript locale unions", () =>
    Effect.gen(function* () {
      const file = "packages/example/src/locale.ts";
      const source = [
        'const Locale = Schema.Literals(["en", "id", "de"]);',
        'const Union = Schema.Union([Schema.Literal("en"), Schema.Literal("id")]);',
        'type LocaleCode = "en" | "id";',
      ].join("\n");

      expect(yield* localePolicyViolations(file, source)).toEqual([
        `${file}:1: locale vocabulary must derive from the locale contract`,
        `${file}:2: locale vocabulary must derive from the locale contract`,
        `${file}:3: locale vocabulary must derive from the locale contract`,
      ]);
    })
  );

  it.effect("rejects hardcoded multi-locale arrays and tuples", () =>
    Effect.gen(function* () {
      const file = "packages/example/src/config.ts";
      const source = [
        'const locales = ["en", "id"] as const;',
        'type Locales = readonly ["en", "id", "de"];',
      ].join("\n");

      expect(yield* localePolicyViolations(file, source)).toEqual([
        `${file}:1: locale lists must derive from the locale contract`,
        `${file}:2: locale lists must derive from the locale contract`,
      ]);
    })
  );

  it.effect(
    "checks test helper types while allowing concrete fixture lists",
    () =>
      Effect.gen(function* () {
        const file = "packages/example/src/source.test.ts";
        const source = [
          'type LocaleCode = "en" | "id";',
          'const localeSamples = ["en", "id"] as const;',
        ].join("\n");

        expect(yield* localePolicyViolations(file, source)).toEqual([
          `${file}:1: locale vocabulary must derive from the locale contract`,
        ]);
      })
  );
  it.effect("fails when a tracked source disappears", () =>
    Effect.gen(function* () {
      vi.resetModules();
      vi.doMock("#scripts/check/files", () => ({
        typescriptFiles: () => ["test-missing-source.ts"],
      }));
      const failure = yield* Effect.tryPromise(
        () => import("#scripts/check/locales")
      ).pipe(Effect.flip);
      expect(failure.cause).toMatchObject({
        _tag: "TypeScriptSourceError",
        fileName: "test-missing-source.ts",
      });
    })
  );
});
