import { describe, expect, it } from "vitest";

import { localePolicyViolations } from "#scripts/check-locales";

describe("locale source policy", () => {
  it("allows the canonical locale contract and derived consumers", () => {
    expect(
      localePolicyViolations(
        "packages/contracts/src/locale.ts",
        'const Current = Schema.Literal("en", "id", "de");\nconst Historical = Schema.Literal("en", "id");'
      )
    ).toEqual([]);
    expect(
      localePolicyViolations(
        "packages/contracts/src/history/locale.ts",
        'const Historical = Schema.Literal("en", "id");'
      )
    ).toEqual([]);
    expect(
      localePolicyViolations(
        "packages/contracts/src/content.ts",
        'import { HistoricalAppLocaleSchema } from "#contracts/locale";\nconst ContentLocaleSchema = HistoricalAppLocaleSchema;'
      )
    ).toEqual([]);
  });

  it("rejects duplicated schema and TypeScript locale unions", () => {
    const file = "packages/example/src/locale.ts";
    const source = [
      'const Locale = Schema.Literal("en", "id", "de");',
      'const Union = Schema.Union(Schema.Literal("en"), Schema.Literal("id"));',
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
