import { describe, expect, it } from "@effect/vitest";

import {
  contractLocaleCodes,
  localePolicyViolations,
} from "#scripts/check-locales";

describe("locale source policy", () => {
  it("allows the canonical locale contract and derived consumers", () => {
    expect(
      localePolicyViolations(
        "packages/contracts/src/locale.ts",
        'const Current = Schema.Literals(["en", "id", "de"]);\nconst Historical = Schema.Literals(["en", "id"]);'
      )
    ).toEqual([]);
    expect(
      localePolicyViolations(
        "packages/contracts/src/content.ts",
        'import { HistoricalAppLocaleSchema } from "#contracts/locale";\nconst ContentLocaleSchema = HistoricalAppLocaleSchema;'
      )
    ).toEqual([]);
    expect(
      localePolicyViolations(
        "packages/corpus/locale/source.ts",
        "const Localized = Schema.Record(AppLocaleCodeSchema, Schema.optional(Schema.String));"
      )
    ).toEqual([]);
  });

  it("rejects a Schema.keyof object that bypasses the locale contract", () => {
    const file = "packages/example/src/source.ts";
    const source =
      "const Embedded = Schema.keyof(Schema.Struct({ en: Schema.Void, id: Schema.Void }));";

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: locale vocabulary must derive from the locale contract`,
    ]);
    expect(
      localePolicyViolations("packages/corpus/locale/source.ts", source)
    ).toEqual([
      "packages/corpus/locale/source.ts:1: locale vocabulary must derive from the locale contract",
    ]);
  });

  it("fails closed when the canonical contract declaration is missing", () => {
    expect(() => contractLocaleCodes("const unrelated = true;")).toThrow(
      "The canonical app-locale contract could not be decoded."
    );
    expect(() =>
      contractLocaleCodes("const AppLocaleCodeSchema = Schema.Literal();")
    ).toThrow("The canonical app-locale contract could not be decoded.");
  });

  it("ignores malformed keyof shapes that do not declare locale fields", () => {
    const file = "packages/example/src/source.ts";
    const source = [
      'const literal = Schema.keyof(Schema.Literals(["en", "id"]));',
      "const empty = Schema.keyof(Schema.Struct());",
      "const spread = Schema.keyof(Schema.Struct({ ...base }));",
      'const computed = Schema.keyof(Schema.Struct({ ["en"]: Schema.Void, id: Schema.Void }));',
      "const unrelated = Schema.keyof(Schema.Struct({ en: Schema.Void, other: Schema.Void }));",
      "const emptyUnion = Schema.Union();",
    ].join("\n");

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: locale vocabulary must derive from the locale contract`,
    ]);
  });

  it("rejects duplicated schema and TypeScript locale unions", () => {
    const file = "packages/example/src/locale.ts";
    const source = [
      'const Locale = Schema.Literals(["en", "id", "de"]);',
      'const Union = Schema.Union([Schema.Literal("en"), Schema.Literal("id")]);',
      'type LocaleCode = "en" | "id";',
    ].join("\n");

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: locale vocabulary must derive from the locale contract`,
      `${file}:2: locale vocabulary must derive from the locale contract`,
      `${file}:3: locale vocabulary must derive from the locale contract`,
    ]);
  });

  it("rejects hardcoded multi-locale arrays and tuples", () => {
    const file = "packages/example/src/config.ts";
    const source = [
      'const locales = ["en", "id"] as const;',
      'type Locales = readonly ["en", "id", "de"];',
    ].join("\n");

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: locale lists must derive from the locale contract`,
      `${file}:2: locale lists must derive from the locale contract`,
    ]);
  });

  it("checks test helper types while allowing concrete fixture lists", () => {
    const file = "packages/example/src/source.test.ts";
    const source = [
      'type LocaleCode = "en" | "id";',
      'const localeSamples = ["en", "id"] as const;',
    ].join("\n");

    expect(localePolicyViolations(file, source)).toEqual([
      `${file}:1: locale vocabulary must derive from the locale contract`,
    ]);
  });
});
